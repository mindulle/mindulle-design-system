import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/* ------------------------------------------------------------------ *
 * Plane filing (MDS-61)
 *
 * Dedup state lives in Plane itself: every issue created here carries
 * external_source="design-audit" and external_id=<dedup hash>, so no
 * database is needed. A closed issue is reopened instead of duplicated.
 * ------------------------------------------------------------------ */

const PLANE = {
  host: process.env.PLANE_API_HOST_URL || 'https://api.plane.so',
  workspace: process.env.PLANE_WORKSPACE_SLUG || 'mindulle',
  project: process.env.PLANE_PROJECT_ID || '44d40559-d900-4ee6-9908-fc068f3b7e69',
  source: 'design-audit',
};

function planeApiKey() {
  if (process.env.PLANE_API_KEY) return process.env.PLANE_API_KEY.trim();
  const file = path.join(os.homedir(), '.secrets', 'plane-token');
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8').trim();
  return null;
}

function planeV1() {
  return `${PLANE.host}/api/v1/workspaces/${PLANE.workspace}/projects/${PLANE.project}`;
}

function planeV2(issueId) {
  return `${PLANE.host}/api/v2/workspaces/${PLANE.workspace}/projects/${PLANE.project}/work-items/${issueId}/attachments/`;
}

async function planeJson(url, { method = 'GET', body, apiKey } = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      'X-Api-Key': apiKey,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${method} ${url} -> ${response.status}: ${text.slice(0, 200)}`);
  }
  return text ? JSON.parse(text) : null;
}

async function ensurePlaneLabel(name, color, apiKey) {
  const labels = await planeJson(`${planeV1()}/labels/`, { apiKey });
  const existing = (labels.results ?? []).find((label) => label.name === name);
  if (existing) return existing;
  return planeJson(`${planeV1()}/labels/`, {
    method: 'POST',
    apiKey,
    body: { name, color },
  });
}

async function listPlaneIssues(apiKey) {
  const issues = [];
  let cursor = null;
  for (let page = 0; page < 10; page++) {
    const url = `${planeV1()}/issues/?per_page=100${cursor ? `&cursor=${cursor}` : ''}`;
    const data = await planeJson(url, { apiKey });
    issues.push(...(data.results ?? []));
    if (!data.next_page_results || !data.next_cursor) break;
    cursor = data.next_cursor;
  }
  return issues;
}

async function planeStateGroups(apiKey) {
  const data = await planeJson(`${planeV1()}/states/`, { apiKey });
  return new Map((data.results ?? []).map((state) => [state.id, state.group]));
}

async function planeTodoState(apiKey) {
  const data = await planeJson(`${planeV1()}/states/`, { apiKey });
  const states = data.results ?? [];
  return states.find((state) => state.group === 'unstarted') ?? states.find((state) => state.group === 'backlog') ?? states[0];
}

/** Three-step v2 attachment upload: credentials -> storage -> confirm. */
async function attachEvidence(issueId, filePath, apiKey) {
  if (!filePath || !fs.existsSync(filePath)) return null;
  const data = fs.readFileSync(filePath);
  const name = path.basename(filePath);
  const endpoint = planeV2(issueId);

  const started = await planeJson(endpoint, {
    method: 'POST',
    apiKey,
    body: { name, size: data.length, type: 'image/png' },
  });

  const form = new FormData();
  for (const [key, value] of Object.entries(started.upload_data.fields)) form.append(key, value);
  form.append('file', new Blob([data], { type: 'image/png' }), name);
  const upload = await fetch(started.upload_data.url, { method: 'POST', body: form });
  if (!upload.ok) throw new Error(`asset upload -> ${upload.status}`);

  await planeJson(`${endpoint}${started.asset_id}/`, {
    method: 'PATCH',
    apiKey,
    body: { is_uploaded: true },
  });
  return started.asset_id;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function groupFindings(findings) {
  const groups = new Map();
  for (const finding of findings) {
    const key = finding.dedup_hash;
    if (!groups.has(key)) {
      groups.set(key, {
        hash: key,
        rule: finding.rule,
        route: finding.route,
        theme: finding.theme,
        viewports: new Set(),
        problems: [],
        items: [],
        message: finding.evidence?.message ?? '',
        screenshots: new Set(),
      });
    }
    const group = groups.get(key);
    group.viewports.add(finding.viewport);
    for (const problem of finding.evidence?.problems ?? []) group.problems.push(problem);
    for (const item of finding.evidence?.items ?? []) {
      group.items.push({
        viewport: finding.viewport,
        path: item.path,
        value: item.boxShadow ?? item.color ?? item.text ?? '',
      });
    }
    if (finding.screenshot) group.screenshots.add(finding.screenshot);
  }
  return [...groups.values()];
}

function findingName(group) {
  return `[design-audit] ${group.rule} ${group.route} ${group.theme}`;
}

function findingHtml(group, runId, commit) {
  const problems = group.problems.length
    ? `<ul>${[...new Set(group.problems)].map((problem) => `<li>${escapeHtml(problem)}</li>`).join('')}</ul>`
    : `<p>${escapeHtml(group.message)}</p>`;

  const evidence = group.items.length
    ? `<details><summary>computed evidence (${group.items.length})</summary><pre>${escapeHtml(
        JSON.stringify(group.items.slice(0, 20), null, 2),
      )}</pre></details>`
    : '';

  return [
    `<p><strong>${escapeHtml(group.rule)}</strong> <code>${escapeHtml(group.route)}</code> ${escapeHtml(group.theme)}</p>`,
    `<p>viewport: ${escapeHtml([...group.viewports].join(', '))}</p>`,
    `<p>run <code>${escapeHtml(runId)}</code> · commit <code>${escapeHtml(commit)}</code></p>`,
    problems,
    evidence,
    '<p>룰브릭: <code>docs/audit-rubric.md</code></p>',
  ].join('\n');
}

async function commentRepeat(issueId, group, runId, commit, apiKey) {
  return planeJson(`${planeV1()}/issues/${issueId}/comments/`, {
    method: 'POST',
    apiKey,
    body: {
      comment_html: `<p>재발 감지 — run <code>${escapeHtml(runId)}</code> · commit <code>${escapeHtml(
        commit,
      )}</code> · viewport ${escapeHtml([...group.viewports].join(', '))}</p>`,
    },
  });
}

export async function fileFindings(findings, runDir, report, { dryRun = false } = {}) {
  const summary = {
    enabled: true,
    dry_run: dryRun,
    groups: 0,
    created: 0,
    commented: 0,
    reopened: 0,
    attachments: 0,
    errors: [],
  };

  if (findings.length === 0) return summary;

  const groups = groupFindings(findings);
  summary.groups = groups.length;

  if (dryRun) {
    summary.plan = groups.map((group) => ({
      name: findingName(group),
      hash: group.hash,
      viewports: [...group.viewports],
      attachments: [...group.screenshots],
    }));
    return summary;
  }

  const apiKey = planeApiKey();
  if (!apiKey) {
    return { ...summary, enabled: false, reason: 'PLANE_API_KEY is not set' };
  }

  try {
    const auditLabel = await ensurePlaneLabel('design-audit', '#6b7280', apiKey);
    const regressionLabel = await ensurePlaneLabel('regression', '#ef4444', apiKey);
    const issues = await listPlaneIssues(apiKey);
    const stateGroups = await planeStateGroups(apiKey);
    const todo = await planeTodoState(apiKey);

    for (const group of groups) {
      try {
        const matches = issues.filter(
          (issue) => issue.external_source === PLANE.source && issue.external_id === group.hash,
        );
        const open = matches.find((issue) => !['completed', 'cancelled'].includes(stateGroups.get(issue.state)));
        const closed = matches.find((issue) => ['completed', 'cancelled'].includes(stateGroups.get(issue.state)));

        if (open) {
          await commentRepeat(open.id, group, report.run_id, report.commit, apiKey);
          summary.commented++;
          continue;
        }

        if (closed) {
          const labels = [...new Set([...(closed.labels ?? []), auditLabel.id, regressionLabel.id])];
          await planeJson(`${planeV1()}/issues/${closed.id}/`, {
            method: 'PATCH',
            apiKey,
            body: { state: todo.id, labels, priority: 'high' },
          });
          await commentRepeat(closed.id, group, report.run_id, report.commit, apiKey);
          for (const file of group.screenshots) {
            try {
              if (await attachEvidence(closed.id, path.join(runDir, file), apiKey)) summary.attachments++;
            } catch (error) {
              summary.errors.push(`attach ${file}: ${error.message}`);
            }
          }
          summary.reopened++;
          continue;
        }

        const created = await planeJson(`${planeV1()}/issues/`, {
          method: 'POST',
          apiKey,
          body: {
            name: findingName(group),
            description_html: findingHtml(group, report.run_id, report.commit),
            priority: group.rule === 'R1' || group.rule === 'R3' ? 'medium' : 'low',
            labels: [auditLabel.id],
            external_source: PLANE.source,
            external_id: group.hash,
          },
        });
        for (const file of group.screenshots) {
          try {
            if (await attachEvidence(created.id, path.join(runDir, file), apiKey)) summary.attachments++;
          } catch (error) {
            summary.errors.push(`attach ${file}: ${error.message}`);
          }
        }
        summary.created++;
      } catch (error) {
        summary.errors.push(`${group.hash}: ${error.message}`);
      }
    }
  } catch (error) {
    summary.errors.push(`plane setup: ${error.message}`);
  }

  return summary;
}

