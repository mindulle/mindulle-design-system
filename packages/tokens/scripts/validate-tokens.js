const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TOKENS_DIR = path.join(ROOT, 'tokens');
const PRIMITIVES_SRC = path.join(TOKENS_DIR, 'primitives.json');
const SEMANTICS_SRC = path.join(TOKENS_DIR, 'semantics.json');
const MIN_WCAG_AA_RATIO = 4.5;

function validateW3CSpec(filePath, isSemantic = false) {
  console.log(`🔍 Validating ${path.basename(filePath)}...`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let issueCount = 0;

  function traverse(node, currentPath = []) {
    for (const [key, val] of Object.entries(node)) {
      if (key.startsWith('$') || key === 'meta') continue;
      const pathStr = [...currentPath, key].join('.');

      if (val && typeof val === 'object' && ('$value' in val || 'value' in val)) {
        const value = val.$value || val.value;
        const type = val.$type || val.type;

        if (!type && !isSemantic) {
          console.warn(`  ⚠️ [Missing $type] at ${pathStr}`);
          issueCount++;
        }

        if (type === 'color' && typeof value === 'string' && value.startsWith('#')) {
          if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value)) {
            console.error(`  ❌ [Invalid Color Hex] ${value} at ${pathStr}`);
            issueCount++;
          }
        }

        if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
          const alias = value.slice(1, -1);
          if (!alias || alias.split('.').length < 2) {
            console.error(`  ❌ [Malformed Alias Reference] ${value} at ${pathStr}`);
            issueCount++;
          }
        }
      } else if (val && typeof val === 'object') {
        traverse(val, [...currentPath, key]);
      }
    }
  }

  traverse(data);

  if (issueCount === 0) {
    console.log(`✅ ${path.basename(filePath)} is 100% valid!`);
  } else {
    console.error(`❌ Found ${issueCount} issues in ${path.basename(filePath)}.`);
    process.exit(1);
  }
}

function getByPath(obj, dotPath) {
  let cur = obj;
  for (const seg of dotPath.split('.')) {
    if (!cur || typeof cur !== 'object' || !(seg in cur)) return null;
    cur = cur[seg];
  }
  return cur && typeof cur === 'object' && '$value' in cur ? cur.$value : cur;
}

function resolveColor(val, primitives) {
  if (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
    const resolved = getByPath(primitives, val.slice(1, -1));
    return resolveColor(resolved, primitives);
  }
  return val;
}

function relativeLuminance(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(hexA, hexB) {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function validateContrastPairs() {
  console.log(`🔍 Checking WCAG AA (>= ${MIN_WCAG_AA_RATIO}:1) contrast pairs...`);
  const primitives = JSON.parse(fs.readFileSync(PRIMITIVES_SRC, 'utf8'));
  const semantics = JSON.parse(fs.readFileSync(SEMANTICS_SRC, 'utf8'));
  const semRoot = semantics.semantic || semantics;

  const pairs = [
    ['state.info', 'state.info-bg'],
    ['state.success', 'state.success-bg'],
    ['state.warning', 'state.warning-bg'],
    ['state.danger', 'state.danger-bg'],
    ['text.primary', 'background.base'],
    ['text.primary', 'background.surface'],
  ];

  let failures = 0;
  for (const mode of ['light', 'dark']) {
    const colorRoot = semRoot[mode]?.color;
    if (!colorRoot) continue;
    for (const [fgPath, bgPath] of pairs) {
      const fg = resolveColor(getByPath(colorRoot, fgPath), primitives);
      const bg = resolveColor(getByPath(colorRoot, bgPath), primitives);
      if (typeof fg !== 'string' || typeof bg !== 'string' || !fg.startsWith('#') || !bg.startsWith('#')) {
        console.error(`  ❌ [${mode}] Could not resolve ${fgPath} (${fg}) / ${bgPath} (${bg})`);
        failures++;
        continue;
      }
      const ratio = contrastRatio(fg, bg);
      if (ratio < MIN_WCAG_AA_RATIO) {
        console.error(`  ❌ [${mode}] ${fgPath} (${fg}) on ${bgPath} (${bg}) = ${ratio.toFixed(2)}:1 (< ${MIN_WCAG_AA_RATIO}:1)`);
        failures++;
      }
    }
  }

  if (failures > 0) {
    console.error(`❌ Contrast validation failed (${failures} pair(s) below WCAG AA).`);
    process.exit(1);
  }
  console.log('✅ All 12 light/dark semantic contrast pairs pass WCAG AA!');
}

validateW3CSpec(PRIMITIVES_SRC, false);
validateW3CSpec(SEMANTICS_SRC, true);
validateContrastPairs();
