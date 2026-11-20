#!/usr/bin/env node
/**
 * MDS #61 — deterministic design audit (v1).
 *
 * Captures the same 8 routes as the visual gate at 2 viewports × 2 themes and
 * evaluates the numeric constants frozen in docs/audit-rubric.md. Rules R1–R4
 * are deterministic and run here; R5–R7 need DOM contracts and are not wired
 * yet. VLM judging is deliberately out of scope.
 *
 * This script is advisory: it exits 0 unless --fail-on-violations is passed.
 * Plane issue creation and artifact upload are not implemented (storage and
 * CDN credentials are still undecided).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  chromiumLaunchOptions,
  findChromiumExecutable,
  loadPlaywright,
  startStaticServer,
} from './lib/static-preview.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.resolve(__dirname, '..');
const REPO_DIR = path.resolve(DOCS_DIR, '../..');
const OUT_DIR = path.join(DOCS_DIR, 'out');
const RUBRIC_PATH = path.join(REPO_DIR, 'docs/audit-rubric.md');
const DEFAULT_OUT = path.join(DOCS_DIR, 'tests', 'audit-runs');

const TARGETS = [
  { name: 'specimen-cover', route: '/', archetype: 'specimen' },
  { name: 'specimen-rules', route: '/rules', archetype: 'specimen' },
  { name: 'specimen-plates', route: '/plates', archetype: 'specimen' },
  { name: 'specimen-errata', route: '/errata', archetype: 'specimen' },
  { name: 'archetype-a-landing', route: '/docs', archetype: 'A' },
  { name: 'archetype-b-component-button', route: '/docs/components/button', archetype: 'B' },
  { name: 'archetype-c-foundation-colors', route: '/docs/foundations/colors', archetype: 'C' },
  { name: 'archetype-d-guide-brand', route: '/docs/brand', archetype: 'D' },
];

function parseArgs(argv) {
  const out = { outDir: DEFAULT_OUT, failOnViolations: false, skipShots: false };
  for (const arg of argv.slice(2)) {
    if (arg === '--') continue;
    if (arg === '--fail-on-violations') out.failOnViolations = true;
    else if (arg === '--skip-shots') out.skipShots = true;
    else if (arg.startsWith('--out=')) out.outDir = path.resolve(arg.slice(6));
    else {
      console.error(`Unknown argument: ${arg}`);
      process.exit(64);
    }
  }
  return out;
}

function loadConstants() {
  const markdown = fs.readFileSync(RUBRIC_PATH, 'utf8');
  const block = markdown.match(/```json\n([\s\S]*?)\n```/);
  if (!block) {
    throw new Error(`No machine-readable constants block in ${RUBRIC_PATH}`);
  }
  return JSON.parse(block[1]);
}

function sha1(value) {
  return crypto.createHash('sha1').update(value).digest('hex');
}

function currentCommit() {
  try {
    return execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: REPO_DIR })
      .toString()
      .trim();
  } catch {
    return 'unknown';
  }
}

/** Parse a computed box-shadow into layered segments. Returns null if unparsed. */
function parseShadow(value) {
  if (!value || value === 'none') return [];
  const layerPattern =
    /(?:(rgba?\([^)]*\)|oklab\([^)]*\)|oklch\([^)]*\)|color\([^)]*\))\s*)?(inset\s+)?(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px/g;
  const layers = [];
  let match;
  while ((match = layerPattern.exec(value)) !== null) {
    const color = match[1] ?? '';
    const alphaMatch =
      /rgba?\([^)]*,\s*([\d.]+)\s*\)/.exec(color) ?? /\/\s*([\d.]+)\s*\)/.exec(color);
    layers.push({
      alpha: alphaMatch ? Number.parseFloat(alphaMatch[1]) : 1,
      offsetX: Number.parseFloat(match[3]),
      offsetY: Number.parseFloat(match[4]),
      blur: Number.parseFloat(match[5]),
      spread: Number.parseFloat(match[6]),
    });
  }
  return layers.length > 0 ? layers : null;
}

function shadowAllowed(value, constants) {
  const layers = parseShadow(value);
  // Unknown serialization: do not silently pass a possible violation.
  if (layers === null) return false;
  if (layers.length === 0) return true;
  const maxSpread = constants.shadow?.allowed?.maxSpreadPx ?? 3;
  return layers.every(
    (layer) =>
      layer.alpha === 0 ||
      (layer.blur === 0 &&
        layer.offsetX === 0 &&
        layer.offsetY === 0 &&
        Math.abs(layer.spread) <= maxSpread)
  );
}

/**
 * Runs inside the page. Collects computed-style evidence for R1, R3, R4 and
 * resolves the active theme's token values for the palette allowlist.
 */
function collectDomEvidence() {
  const rootStyle = getComputedStyle(document.documentElement);

  const cssVar = (name) => rootStyle.getPropertyValue(name).trim();
  const expandHex = (value) => {
    const v = value.toLowerCase();
    if (/^#[0-9a-f]{3}$/.test(v)) return `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`;
    if (/^#[0-9a-f]{4}$/.test(v)) return `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`;
    return v;
  };
  const toColor = (color) => {
    const value = String(color).trim();
    const match = value.match(/rgba?\(([^)]+)\)/);
    if (match) {
      const [r, g, b] = match[1].split(',').map((part) => Number.parseFloat(part));
      return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
    }
    return expandHex(value);
  };
  const alphaOf = (color) => {
    const match = color.match(/rgba?\(([^)]+)\)/);
    if (!match) return 1;
    const parts = match[1].split(',');
    return parts.length === 4 ? Number.parseFloat(parts[3]) : 1;
  };

  const describe = (el) => {
    const id = el.id ? `#${el.id}` : '';
    const classes =
      typeof el.className === 'string'
        ? el.className
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 4)
            .map((c) => `.${c}`)
            .join('')
        : '';
    const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    const tag = el.tagName.toLowerCase();
    return { path: `${tag}${id}${classes}`, text, tag };
  };

  const rectOf = (el) => {
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(r.x),
      y: Math.round(r.y),
      width: Math.round(r.width),
      height: Math.round(r.height),
    };
  };

  const SHELL_SELECTOR = '#nd-sidebar, #nd-nav, #nd-toc, header, nav, aside, [data-fd-ignore]';
  const isShell = (el) =>
    Boolean(el.closest(SHELL_SELECTOR)) ||
    Array.from(el.classList || []).some((name) => /(^|-)fd-/.test(name));
  const surfaceContext = (el) =>
    el.closest('[data-surface]')?.getAttribute('data-surface') || 'default';

  // The palette is every resolved custom property that looks like a color.
  // Hardcoding a list goes stale the moment a token is added.
  const palette = new Set();
  for (const [name, value] of document.documentElement.computedStyleMap()) {
    if (!name.startsWith('--mds-') && !name.startsWith('--color-fd-')) continue;
    const raw = String(value).trim().toLowerCase();
    if (/^(#[0-9a-f]{3,8}|rgba?\(|oklab\(|oklch\()/.test(raw)) {
      palette.add(toColor(raw));
    }
  }
  // L-011: this primitive exists but is not a brand token.
  palette.delete('#d97706');

  const layers = {
    base: toColor(cssVar('--mds-color-background-base')),
    surface: toColor(cssVar('--mds-color-background-surface')),
    elevated: toColor(cssVar('--mds-color-background-elevated')),
  };
  const shadows = [];
  const backgroundDeviations = [];
  const legacyHits = [];
  const legacyText = /S\s*O\s*N\s*A\s*G\s*I/i;
  const legacyColor = '#1991b9';

  let painted = 0;
  let shellShadows = 0;
  for (const el of document.querySelectorAll('body *')) {
    const style = getComputedStyle(el);
    const rect = rectOf(el);
    if (rect.width <= 0 || rect.height <= 0) continue;

    const shell = isShell(el);
    if (style.boxShadow && style.boxShadow !== 'none') {
      if (shell) shellShadows++;
      else shadows.push({ ...describe(el), boxShadow: style.boxShadow, rect });
    }

    const background = style.backgroundColor;
    const area = rect.width * rect.height;
    if (!shell && alphaOf(background) >= 0.99 && area >= 2500) {
      painted++;
      const hex = toColor(background);
      if (!palette.has(hex)) {
        backgroundDeviations.push({
          ...describe(el),
          color: hex,
          surface: surfaceContext(el),
          rect,
          area,
        });
      }
    }

    for (const [kind, value] of [
      ['text', style.color],
      ['background', background],
      ['border', style.borderTopColor],
    ]) {
      if (toColor(value) === legacyColor) {
        legacyHits.push({ type: 'color', kind, ...describe(el), value: legacyColor });
      }
    }
  }

  for (const heading of document.querySelectorAll('h1, h2, h3, header *, [role="banner"] *')) {
    const text = (heading.textContent || '').trim();
    if (legacyText.test(text)) {
      legacyHits.push({ type: 'text', ...describe(heading), text: text.slice(0, 120) });
    }
  }

  // R5-R7: every docs page declares its archetype on a wrapper and marks
  // structural blocks, so the audit never depends on CSS class names.
  const archetypeMeta = document.querySelector('meta[name="mds-archetype"]');
  // Scope to the MDX prose container so Fumadocs pagination and chrome never
  // satisfy an archetype rule on the author's behalf.
  const scope =
    document.querySelector('article .prose') ??
    document.querySelector('article') ??
    document.body;
  const offsetTop = (el) => el.getBoundingClientRect().top + window.scrollY;
  const previewEls = [...scope.querySelectorAll('[data-audit-block="preview"]')];
  const structure = {
    archetype: archetypeMeta?.getAttribute('content') ?? null,
    previews: previewEls.length,
    previewImages: previewEls.reduce((count, el) => count + el.querySelectorAll('img').length, 0),
    previewTop: previewEls.length > 0 ? offsetTop(previewEls[0]) : null,
    specimens: scope.querySelectorAll('[data-audit-block="specimen"]').length,
    orderedLists: scope.querySelectorAll('ol').length,
    docsLinks: scope.querySelectorAll('a[href^="/docs"]').length,
    headings: [...scope.querySelectorAll('h2, h3')].map((heading) => ({
      text: (heading.textContent || '').trim().slice(0, 80),
      top: offsetTop(heading),
    })),
    tables: [...scope.querySelectorAll('table')].map((table) => ({
      headers: [...table.querySelectorAll('thead th')].map((cell) =>
        (cell.textContent || '').trim().toLowerCase()
      ),
      top: offsetTop(table),
    })),
  };

  return {
    layers,
    paletteSize: palette.size,
    shadows,
    backgroundDeviations,
    legacyHits,
    structure,
    stats: { painted, shellShadows },
  };
}

/** Accent-area ratio (R2) computed from the rendered screenshot. */
async function accentRatio(page, screenshotBuffer) {
  return page.evaluate(async (base64) => {
    const blob = await (await fetch(`data:image/png;base64,${base64}`)).blob();
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(bitmap, 0, 0);
    const data = context.getImageData(0, 0, bitmap.width, bitmap.height).data;

    let accent = 0;
    let total = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 250) continue;
      total++;
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const lightness = (max + min) / 2;
      const delta = max - min;
      if (delta === 0) continue;
      const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      let hue;
      if (max === r) hue = ((g - b) / delta) % 6;
      else if (max === g) hue = (b - r) / delta + 2;
      else hue = (r - g) / delta + 4;
      hue *= 60;
      if (hue < 0) hue += 360;
      // Gold / coral family only. Warm paper tones are excluded by lightness.
      const isGold = hue >= 25 && hue <= 60;
      const isCoral = hue >= 5 && hue < 25;
      if ((isGold || isCoral) && saturation >= 0.3 && lightness >= 0.12 && lightness <= 0.9) {
        accent++;
      }
    }

    return { ratio: total ? accent / total : 0, accentPixels: accent, totalPixels: total };
  }, screenshotBuffer.toString('base64'));
}

async function main() {
  const args = parseArgs(process.argv);
  const constants = loadConstants();

  if (!fs.existsSync(OUT_DIR)) {
    console.error(
      `Missing static build at ${OUT_DIR}. Run "pnpm --filter @mindulle/docs build" first.`
    );
    process.exit(1);
  }

  const runId = new Date().toISOString().replace(/[:.]/g, '-');
  const runDir = path.join(args.outDir, runId);
  fs.mkdirSync(runDir, { recursive: true });

  const { chromium } = loadPlaywright(DOCS_DIR);
  const { server, baseUrl } = await startStaticServer(OUT_DIR);
  const executablePath = findChromiumExecutable(chromium);
  const browser = await chromium.launch(chromiumLaunchOptions(executablePath));

  const findings = [];
  const captures = [];
  const accentByTarget = [];
  const ruleCounts = { R1: 0, R2: 0, R3: 0, R4: 0, R5: 0, R6: 0, R7: 0 };
  let violationCount = 0;

  const record = (rule, target, viewport, theme, evidence) => {
    violationCount++;
    ruleCounts[rule]++;
    findings.push({
      rule,
      status: 'FAIL',
      route: target.route,
      archetype: target.archetype,
      theme,
      viewport,
      dedup_hash: sha1(`${target.route}|${rule}|${theme}`),
      evidence,
    });
  };

  try {
    for (const viewport of Object.entries(constants.capture.viewports)) {
      const [viewportName, size] = viewport;
      const context = await browser.newContext({
        viewport: { width: size.width, height: size.height },
        deviceScaleFactor: constants.capture.deviceScaleFactor ?? 1,
      });
      const page = await context.newPage();

      for (const target of TARGETS) {
        for (const theme of constants.capture.themes) {
          await page.addInitScript((value) => {
            localStorage.setItem('theme', value);
          }, theme);

          await page.goto(`${baseUrl}${target.route}`, { waitUntil: 'networkidle' });
          await page.evaluate(async (value) => {
            document.documentElement.classList.toggle('dark', value === 'dark');
            document.documentElement.classList.toggle('light', value === 'light');
            document.documentElement.dataset.theme = value;
            document.documentElement.style.colorScheme = value;
            await document.fonts.ready;
          }, theme);

          const file = `${target.name}-${viewportName}-${theme}.png`;
          let screenshotBuffer = null;
          if (!args.skipShots) {
            screenshotBuffer = await page.screenshot({
              fullPage: true,
              animations: 'disabled',
              caret: 'hide',
              scale: 'css',
            });
            fs.writeFileSync(path.join(runDir, file), screenshotBuffer);
          }

          const dom = await page.evaluate(collectDomEvidence);
          const capture = {
            file,
            route: target.route,
            archetype: target.archetype,
            viewport: viewportName,
            theme,
            elements_with_shadow: dom.shadows.length,
            painted_backgrounds: dom.stats.painted,
            background_deviations: dom.backgroundDeviations.length,
            legacy_hits: dom.legacyHits.length,
          };

          // R1 — soft shadow ban.
          const badShadows = dom.shadows.filter(
            (item) => !shadowAllowed(item.boxShadow, constants)
          );
          if (badShadows.length > 0) {
            record('R1', target, viewportName, theme, {
              message: 'box-shadow with blur or excess spread',
              items: badShadows.slice(0, 20),
              count: badShadows.length,
            });
          }

          // R2 — accent area ≤ 15%.
          if (screenshotBuffer) {
            const accent = await accentRatio(page, screenshotBuffer);
            accentByTarget.push({ route: target.route, viewport: viewportName, theme, ...accent });
            if (accent.ratio > constants.accentAreaMax) {
              record('R2', target, viewportName, theme, {
                message: 'accent area above limit',
                ratio: Number(accent.ratio.toFixed(4)),
                max: constants.accentAreaMax,
              });
            }
          }

          // R3 — legacy brand remnants.
          if (dom.legacyHits.length > 0) {
            record('R3', target, viewportName, theme, {
              message: 'legacy SONAGI text or teal accent',
              items: dom.legacyHits.slice(0, 20),
              count: dom.legacyHits.length,
            });
          }

          // R4 — theme hierarchy. Base and surface must differ; every painted
          // background must resolve to a value in the active token palette.
          const layersComplete = Object.values(dom.layers).every(Boolean);
          const layersCollapsed = layersComplete && dom.layers.base === dom.layers.surface;
          if (layersCollapsed || dom.backgroundDeviations.length > 0) {
            record('R4', target, viewportName, theme, {
              message: layersCollapsed
                ? 'base and surface resolve to the same color'
                : 'painted background outside the active token set',
              layers: dom.layers,
              items: dom.backgroundDeviations.slice(0, 20),
              count: dom.backgroundDeviations.length,
            });
          }

          // R5-R7 — archetype structure contracts.
          const structure = dom.structure;
          let structureFailures = 0;
          const propsTable = structure.tables.find(
            (table) => table.headers.includes('prop') && table.headers.includes('type')
          );
          const tokenTable = structure.tables.find(
            (table) =>
              (table.headers.includes('토큰') && table.headers.includes('값')) ||
              (table.headers.includes('token') && table.headers.includes('value'))
          );
          const headingTop = (pattern) =>
            structure.headings.find((heading) => pattern.test(heading.text))?.top ?? null;
          const sectionTops = [
            headingTop(/^props\b/i),
            headingTop(/사용\s*규칙|do\s*\/?\s*don/i),
            headingTop(/접근성|accessibility/i),
            headingTop(/변경\s*이력|changelog/i),
          ].filter((value) => value !== null);
          const sectionOrdered = sectionTops.every(
            (top, index) => index === 0 || top > sectionTops[index - 1]
          );
          const numberedHeadings = structure.headings.filter((heading) =>
            /^\d+[.)]\s/.test(heading.text)
          ).length;
          const hasSteps = structure.orderedLists > 0 || numberedHeadings >= 2;
          const structureEvidence = {
            archetype: structure.archetype,
            previews: structure.previews,
            preview_images: structure.previewImages,
            specimens: structure.specimens,
            ordered_lists: structure.orderedLists,
            numbered_headings: numberedHeadings,
            docs_links: structure.docsLinks,
            props_table: Boolean(propsTable),
            token_table: Boolean(tokenTable),
            section_ordered: sectionOrdered,
          };

          if (structure.archetype === 'landing') {
            const problems = [];
            if (structure.previews > 0) problems.push('preview block is forbidden on landing');
            if (propsTable) problems.push('props table is forbidden on landing');
            if (!hasSteps) problems.push('missing step list (ol or numbered h2 headings)');
            if (structure.docsLinks === 0) problems.push('missing next-step docs link');
            if (problems.length > 0) {
              structureFailures++;
              record('R5', target, viewportName, theme, { problems, ...structureEvidence });
            }
          }

          if (structure.archetype === 'component') {
            const problems = [];
            if (structure.previews === 0) problems.push('missing live preview');
            if (!propsTable) problems.push('missing props table');
            if (structure.previews > 0 && propsTable && structure.previewTop > propsTable.top) {
              problems.push('props table precedes the preview');
            }
            if (structure.previewImages > 0) problems.push('preview replaced by an image');
            if (!sectionOrdered)
              problems.push('section order broken (props → rules → a11y → history)');
            if (problems.length > 0) {
              structureFailures++;
              record('R6', target, viewportName, theme, { problems, ...structureEvidence });
            }
          }

          if (structure.archetype === 'foundation' || structure.archetype === 'guide') {
            const problems = [];
            if (structure.archetype === 'foundation' && structure.specimens === 0) {
              problems.push('missing visual specimen');
            }
            if (structure.archetype === 'guide' && propsTable) {
              problems.push('props table belongs on a component page');
            }
            if (structure.archetype === 'guide' && tokenTable) {
              problems.push('token spec table belongs on a foundation page');
            }
            if (problems.length > 0) {
              structureFailures++;
              record('R7', target, viewportName, theme, { problems, ...structureEvidence });
            }
          }

          captures.push(capture);
          const marks = [
            badShadows.length ? `R1:${badShadows.length}` : '',
            dom.legacyHits.length ? `R3:${dom.legacyHits.length}` : '',
            dom.backgroundDeviations.length || layersCollapsed
              ? `R4:${dom.backgroundDeviations.length}${layersCollapsed ? '/collapsed' : ''}`
              : '',
            structureFailures > 0 ? `R5-7:${structureFailures}` : '',
          ].filter(Boolean);
          console.log(
            `[${marks.length ? 'FAIL' : 'PASS'}] ${file}${marks.length ? ` — ${marks.join(' ')}` : ''}`
          );
        }
      }

      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  const worstAccent = accentByTarget.reduce(
    (worst, item) => (!worst || item.ratio > worst.ratio ? item : worst),
    null
  );

  const report = {
    run_id: runId,
    commit: currentCommit(),
    constants_version: constants.version,
    generated_at: new Date().toISOString(),
    advisory: !args.failOnViolations,
    summary: {
      captures: captures.length,
      violations: violationCount,
      by_rule: ruleCounts,
      max_accent_ratio: worstAccent
        ? {
            route: worstAccent.route,
            viewport: worstAccent.viewport,
            theme: worstAccent.theme,
            ratio: Number(worstAccent.ratio.toFixed(4)),
          }
        : null,
    },
    findings,
    captures,
    accent_samples: accentByTarget,
  };

  const reportPath = path.join(runDir, 'report.json');
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log('');
  console.log(`captures: ${captures.length}`);
  console.log(
    `violations: ${violationCount} (${Object.entries(ruleCounts)
      .map(([rule, count]) => `${rule} ${count}`)
      .join(' / ')})`
  );
  if (worstAccent) {
    console.log(
      `max accent ratio: ${(worstAccent.ratio * 100).toFixed(2)}% (${worstAccent.route} ${worstAccent.viewport} ${worstAccent.theme})`
    );
  }
  console.log(`report: ${reportPath}`);

  if (args.failOnViolations && violationCount > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
