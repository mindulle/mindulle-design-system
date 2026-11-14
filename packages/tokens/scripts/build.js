const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TOKENS_DIR = path.join(ROOT, 'tokens');
const THEMES_DIR = path.join(TOKENS_DIR, 'themes');
const DIST_DIR = path.join(ROOT, 'dist');

const PRIMITIVES_SRC = path.join(TOKENS_DIR, 'primitives.json');
const SEMANTICS_SRC = path.join(TOKENS_DIR, 'semantics.json');
const BREAKPOINTS_SRC = path.join(TOKENS_DIR, 'breakpoints.json');
const COMPONENTS_SRC = path.join(TOKENS_DIR, 'components.json');
const SURFACES_SRC = path.join(TOKENS_DIR, 'surfaces.json');
const SPACE_SRC = path.join(TOKENS_DIR, 'space.json');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}


function resolveAliases(value) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{([^}]+)\}/g, (match, pathStr) => {
    const parts = pathStr.split('.');
    return 'var(' + getCssVarName(parts) + ')';
  });
}

function getCssVarName(pathArray) {
  let parts = [...pathArray];
  if (parts[0] === 'tokens') {
     parts = parts.slice(1);
  }
  
  if (['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'].includes(parts[0])) {
     parts = ['typography', ...parts];
  }
  
  if (parts[0] === 'primitive') { /* keep as primitive */ } else if (parts[0] === 'semantic') {
     parts = parts.slice(2);
  } else if (parts[0] === 'shadow' && parts[1]) {
     parts = [parts[0], ...parts.slice(2)];
  } else if (parts[0] === 'typography') {
     if (parts[1] === 'fontFamily') parts = ['font', parts[2]];
     else if (parts[1] === 'fontSize') parts = ['font-size', parts[2]];
     else if (parts[1] === 'fontWeight') parts = ['font-weight', parts[2]];
     else if (parts[1] === 'lineHeight') parts = ['line-height', parts[2]];
     else if (parts[1] === 'letterSpacing') parts = ['letter-spacing', parts[2]];
  } else if (parts[0] === 'borderRadius') {
     parts = ['radius', parts[1]];
  } else if (parts[0] === 'borderWidth') {
     parts = ['border', parts[1]];
  } else if (parts[0] === 'transition') {
     if (parts[1] === 'duration') parts = ['duration', parts[2]];
     else if (parts[1] === 'easing') parts = ['ease', parts[2]];
  } else if (parts[0] === 'zIndex') {
     parts = ['z', parts[1]];
  } else if (parts[0] === 'breakpoints') {
     parts = ['breakpoint', ...parts.slice(1)];
  } else if (parts[0] === 'touch') {
     parts = ['touch', ...parts.slice(1)];
  }
  return `--mds-${parts.join('-')}`;
}

function extractTokens(node, pathArray = [], result = {}) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith('$') || key === 'meta') continue;
    
    const newPath = [...pathArray, key];
    if (val && typeof val === 'object' && ('$value' in val || 'value' in val)) {
      const rawVal = val.$value || val.value;
      if (typeof rawVal === 'object') {
        for (const [subKey, subVal] of Object.entries(rawVal)) {
           const camelToKebab = subKey.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
           const cssVar = getCssVarName([...newPath, camelToKebab]);
           result[cssVar] = resolveAliases(subVal);
        }
      } else {
        const cssVar = getCssVarName(newPath);
        result[cssVar] = resolveAliases(rawVal);
      }
    } else if (val && typeof val === 'object') {
      extractTokens(val, newPath, result);
    }
  }
  return result;
}

const legacyAliasKeys = new Set();

function generateCssBlock(selector, tokensDict) {
  if (Object.keys(tokensDict).length === 0) return '';
  let css = `${selector} {\n`;
  for (const [key, val] of Object.entries(tokensDict)) {
    css += `  ${key}: ${val};\n`;
    if (key.startsWith('--mds-')) legacyAliasKeys.add(key);
  }
  css += `}\n\n`;
  return css;
}

function build() {
  const pkgJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const version = pkgJson.version;
  ensureDir(DIST_DIR);
  
  let cssOutput = `/**\n * Mindulle Design System — CSS Custom Properties\n * Generated automatically from JSON tokens v${version}\n * DO NOT EDIT — regenerate with: pnpm --filter @mindulle/tokens build\n * 2-Tier architecture (primitives -> semantics); Light/Dark branch inside semantics.\n * See decisions/0010-delivery-consolidation-github-packages.md\n */\n\n`;
  
  let flatTokens = {};
  let lightTokens = {};
  let darkTokens = {};
  let typoAndLayoutTokens = {};
  let themesTokens = {};

  if (fs.existsSync(PRIMITIVES_SRC)) {
    const primData = JSON.parse(fs.readFileSync(PRIMITIVES_SRC, 'utf8'));
    const primTokens = extractTokens(primData);
    Object.assign(flatTokens, primTokens);
    cssOutput += `/* --- Primitive Tokens --- */\n`;
    cssOutput += generateCssBlock(':root', primTokens);
  }

  if (fs.existsSync(BREAKPOINTS_SRC)) {
    const bpData = JSON.parse(fs.readFileSync(BREAKPOINTS_SRC, 'utf8'));
    const bpTokens = extractTokens(bpData);
    Object.assign(flatTokens, bpTokens);
    cssOutput += `/* --- Responsive Breakpoints & Touch Target Tokens --- */\n`;
    cssOutput += generateCssBlock(':root', bpTokens);
  }
  
  if (fs.existsSync(SPACE_SRC)) {
    const spaceData = JSON.parse(fs.readFileSync(SPACE_SRC, 'utf8'));
    const spaceTokens = extractTokens(spaceData);
    Object.assign(flatTokens, spaceTokens);
    cssOutput += `/* --- Semantic Spacing --- */\n`;
    cssOutput += generateCssBlock(':root', spaceTokens);
  }

  if (fs.existsSync(SEMANTICS_SRC)) {
    const semData = JSON.parse(fs.readFileSync(SEMANTICS_SRC, 'utf8'));
    lightTokens = extractTokens({ semantic: { light: semData.semantic?.light || {} }, shadow: { light: semData.shadow?.light || {} }});
    darkTokens = extractTokens({ semantic: { dark: semData.semantic?.dark || {} }, shadow: { dark: semData.shadow?.dark || {} }});
    typoAndLayoutTokens = extractTokens({ typography: semData.typography || {}, layout: semData.layout || {}, elevation: semData.elevation || {} });
    Object.assign(flatTokens, lightTokens, typoAndLayoutTokens); 
    
    cssOutput += `/* --- Core Typography, Layout & Elevation --- */\n`;
    cssOutput += generateCssBlock(':root', typoAndLayoutTokens);

    cssOutput += `/* --- Semantic Tokens (MDS Core) --- */\n`;
    cssOutput += generateCssBlock(':root, [data-theme="light"], [data-theme="sonagi-core"], [data-theme="mindulle"], [data-theme="mds"]', lightTokens);
    cssOutput += generateCssBlock('[data-theme="dark"]', darkTokens);
    cssOutput += `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n`;
    for (const [key, val] of Object.entries(darkTokens)) {
      cssOutput += `    ${key}: ${val};\n`;
      if (key.startsWith('--mds-')) legacyAliasKeys.add(key);
    }
    cssOutput += `  }\n}\n\n`;
  }
  
  if (fs.existsSync(COMPONENTS_SRC)) {
    const compData = JSON.parse(fs.readFileSync(COMPONENTS_SRC, 'utf8'));
    const compTokens = extractTokens(compData);
    Object.assign(flatTokens, compTokens);
    cssOutput += `/* --- Component Tokens (Tier 3) --- */\n`;
    cssOutput += generateCssBlock(':root', compTokens);
  }

  if (fs.existsSync(SURFACES_SRC)) {
    const surfData = JSON.parse(fs.readFileSync(SURFACES_SRC, 'utf8'));
    for (const [name, cfg] of Object.entries(surfData.surface || {})) {
      if (cfg.light) {
        const lt = extractTokens({ semantic: { light: cfg.light } });
        cssOutput += `/* --- Surface Scope: ${name} (light) --- */\n`;
        cssOutput += generateCssBlock(`[data-surface="${name}"]`, lt);
      }
      if (cfg.dark) {
        const dt = extractTokens({ semantic: { dark: cfg.dark } });
        cssOutput += `/* --- Surface Scope: ${name} (dark) --- */\n`;
        cssOutput += generateCssBlock(`[data-theme="dark"] [data-surface="${name}"], [data-theme="dark"][data-surface="${name}"]`, dt);
        cssOutput += `@media (prefers-color-scheme: dark) {\n  [data-surface="${name}"]:not([data-theme="light"]) {\n`;
        for (const [k, v] of Object.entries(dt)) {
          cssOutput += `    ${k}: ${v};\n`;
          if (k.startsWith('--mds-')) legacyAliasKeys.add(k);
        }
        cssOutput += `  }\n}\n\n`;
      }
    }
  }

  if (fs.existsSync(THEMES_DIR)) {
    const themeFiles = fs.readdirSync(THEMES_DIR).filter(f => f.endsWith('.json'));
    cssOutput += `/* --- Theme Overrides --- */\n`;
    
    for (const file of themeFiles) {
      const themeData = JSON.parse(fs.readFileSync(path.join(THEMES_DIR, file), 'utf8'));
      const themeName = file.replace('.json', '').replace('theme-', '');
      const tokens = extractTokens(themeData);
      themesTokens[themeName] = tokens;
      Object.assign(flatTokens, tokens);
      cssOutput += `/* Theme: ${themeData.name || themeName} */\n`;
      cssOutput += generateCssBlock(`[data-theme="${themeName}"]`, tokens);
    }
  }
  
  if (legacyAliasKeys.size > 0) {
    cssOutput += `/* --- Legacy aliases (deprecated: use --mds-*) --- */\n:root {\n`;
    for (const key of [...legacyAliasKeys].sort()) {
      cssOutput += `  ${key.replace('--mds-', '--sng-')}: var(${key});\n`;
    }
    cssOutput += `}\n\n`;
  }

  fs.writeFileSync(path.join(DIST_DIR, 'variables.css'), cssOutput);
  fs.writeFileSync(path.join(TOKENS_DIR, 'variables.css'), cssOutput);
  console.log(`✅  Generated variables.css in both dist/ and tokens/`);
  
  // ---------------------------------------------------------
  // Generate Lightweight HTML Showcase
  // ---------------------------------------------------------
  const generateColorSwatches = (tokensDict) => {
    return Object.entries(tokensDict)
      .filter(([k]) => k.includes('color'))
      .map(([k, v]) => `
        <div class="card">
          <div class="swatch" style="background-color: var(${k});"></div>
          <div class="info">
            <strong>${k}</strong>
            <code>${v}</code>
          </div>
        </div>
      `).join('');
  };

  const htmlOutput = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mindulle Design System - v${version}</title>
  <link rel="stylesheet" href="variables.css">
  <style>
    body { font-family: var(--mds-font-sans); background: var(--mds-color-bg-base); color: var(--mds-color-text-primary); margin: 0; padding: 2rem; transition: background 0.3s, color 0.3s; }
    h1, h2 { border-bottom: 1px solid var(--mds-color-border-default); padding-bottom: 0.5rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .card { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--mds-color-bg-surface); border: 1px solid var(--mds-color-border-subtle); border-radius: var(--mds-radius-lg); box-shadow: var(--mds-shadow-sm); }
    .swatch { width: 48px; height: 48px; border-radius: var(--mds-radius-md); border: 1px solid var(--mds-color-border-default); flex-shrink: 0; }
    .info { display: flex; flex-direction: column; gap: 0.25rem; }
    code { font-family: var(--mds-font-mono); font-size: var(--mds-font-size-sm); color: var(--mds-color-text-muted); }
    .theme-selector { margin-bottom: 2rem; padding: 1rem; background: var(--mds-color-bg-elevated); border-radius: var(--mds-radius-md); border: 1px solid var(--mds-color-border-default); }
    select { padding: 0.5rem; font-family: var(--mds-font-sans); border-radius: var(--mds-radius-sm); border: 1px solid var(--mds-color-border-strong); }
  </style>
</head>
<body data-theme="light">
  <h1>🎨 Mindulle Design System <small>v${version}</small></h1>
  <p>이 페이지는 빌드된 디자인 토큰을 확인하기 위한 프리뷰입니다. UI 컴포넌트 가이드와 시각적 요소는 공식 Storybook을 참조해 주세요.</p>
  <p><a href="https://main--6a74ac58510f8ede8dcbbdbd.chromatic.com/" target="_blank" style="color: var(--mds-color-accent); font-weight: bold; text-decoration: none;">👉 Mindulle UI Storybook 바로가기</a></p>
  <div style="margin: 1rem 0; padding: 1rem; background: var(--mds-color-bg-elevated); border-radius: var(--mds-radius-md); border: 1px solid var(--mds-color-border-subtle);">
    <strong>패키지 설치 및 사용법:</strong>
    <code style="display: block; margin-top: 0.5rem;">pnpm install @mindulle/tokens</code>
    <code style="display: block; margin-top: 0.5rem;">import '@mindulle/tokens/css';</code>
  </div>

  <div class="theme-selector">
    <label for="theme-select"><strong>미리보기 테마 변경: </strong></label>
    <select id="theme-select" onchange="document.body.setAttribute('data-theme', this.value)">
      <option value="light">Light (Default)</option>
      <option value="dark">Dark</option>
      ${Object.keys(themesTokens).map(t => `<option value="${t}">${t} (Override)</option>`).join('')}
    </select>
  </div>

  <h2>Semantic Colors</h2>
  <div class="grid">
    ${generateColorSwatches(lightTokens)}
  </div>

  ${Object.entries(themesTokens).map(([themeName, themeDict]) => `
  <h2>Theme Overrides (${themeName})</h2>
  <div class="grid">
    ${generateColorSwatches(themeDict)}
  </div>
  `).join('')}
</body>
</html>`;

  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), htmlOutput);
  console.log(`✅  Generated index.html (Showcase)`);

  
  const allTokens = { ...flatTokens };
  for (const [k, v] of Object.entries(flatTokens)) {
    if (k.startsWith('--mds-')) {
      allTokens[k.replace('--mds-', '--sng-')] = v; // deprecated alias
    }
  }

  const tokenEntries = Object.entries(allTokens)
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`)
    .join(',\n');

  const cjsContent = `/**\n * @mindulle/tokens v${version}\n * Auto-generated.\n */\n'use strict';\n\nconst tokens = {\n${tokenEntries}\n};\n\nmodule.exports = { tokens };\n`;
  const esmContent = `/**\n * @mindulle/tokens v${version}\n * Auto-generated.\n */\nexport const tokens = {\n${tokenEntries}\n};\n`;
  const dts = `/**\n * @mindulle/tokens v${version}\n */\nexport declare const tokens: Record<string, string>;\n`;

  fs.writeFileSync(path.join(DIST_DIR, 'index.js'), cjsContent);
  fs.writeFileSync(path.join(DIST_DIR, 'index.mjs'), esmContent);
  fs.writeFileSync(path.join(DIST_DIR, 'index.d.ts'), dts);
  console.log(`✅  Generated JS/TS exports`);
}

build();
