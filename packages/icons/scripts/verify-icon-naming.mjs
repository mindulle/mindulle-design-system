import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'icon-manifest.json'), 'utf8'));
const index = readFileSync(resolve(root, 'src/index.ts'), 'utf8');
const gallery = readFileSync(resolve(root, '../../apps/docs/components/tokens/IconGalleryViewer.tsx'), 'utf8');
const docs = readFileSync(resolve(root, '../../apps/docs/content/docs/foundations/iconography.mdx'), 'utf8');
const errors = [];

if (manifest.length !== 9) errors.push(`expected 9 manifest entries, found ${manifest.length}`);
const seenKeys = new Set();
for (const icon of manifest) {
  if (seenKeys.has(icon.key)) errors.push(`duplicate key: ${icon.key}`);
  seenKeys.add(icon.key);

  const canonicalFile = resolve(root, 'src/components', `${icon.codeName}.tsx`);
  const legacyFile = resolve(root, 'src/components', `${icon.legacyName}.tsx`);
  if (!existsSync(canonicalFile)) errors.push(`${icon.codeName}: canonical file missing`);
  if (!existsSync(legacyFile)) errors.push(`${icon.legacyName}: legacy alias file missing`);
  if (!index.includes(`export * from "./components/${icon.codeName}"`)) errors.push(`${icon.codeName}: missing canonical index export`);
  if (!index.includes(`export { ${icon.codeName} as ${icon.legacyName} }`)) errors.push(`${icon.legacyName}: missing index alias export`);
  if (!gallery.includes(`name: '${icon.codeName}'`)) errors.push(`${icon.codeName}: missing docs gallery entry`);
  if (!gallery.includes(`legacy: '${icon.legacyName}'`)) errors.push(`${icon.legacyName}: missing docs gallery alias`);
  if (!gallery.includes(`desc: '${icon.description}'`)) errors.push(`${icon.codeName}: description mismatch`);
  if (!docs.includes(`\`${icon.codeName}\``)) errors.push(`${icon.codeName}: missing iconography docs reference`);
  if (!icon.figmaInstanceName.includes(icon.codeName)) errors.push(`${icon.codeName}: Figma instance naming mismatch`);
}

if (errors.length) {
  console.error(`Icon naming parity failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Icon naming parity passed: ${manifest.length} Figma / Code / Docs entries verified.`);
}
