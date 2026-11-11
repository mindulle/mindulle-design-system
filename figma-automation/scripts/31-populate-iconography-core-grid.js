/**
 * MDS Iconography: populate the Icon Wrapper and create the scalable Core 9 grid.
 *
 * Run in the Mindulle Design System Figma file with the Desktop Bridge/plugin
 * connected. The script is intentionally data-driven: adding an icon means
 * adding one entry to CORE_ICONS, not changing the layout algorithm.
 *
 * Targets:
 * - Existing Icon Wrapper component set: 177:764
 * - Existing Foundations board: 198:2974
 *
 * The Icon Wrapper remains the component contract. The Core 9 grid is a
 * specimen/registration board, not a second source of truth. Extended icons
 * can be appended to CORE_ICONS while preserving the same 24px grid, 2px
 * stroke, naming, and spacing rules.
 */

return new Promise(async (resolve, reject) => {
  const WRAPPER_ID = '177:764';
  const FOUNDATIONS_ID = '198:2974';
  const GRID_NAME = 'Foundations / Iconography / Core 9';

  const CORE_ICONS = [
    ['add', '<line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/>'],
    ['arrow-right', '<line x1="4" y1="12" x2="20" y2="12"/><polyline points="13 5 20 12 13 19"/>'],
    ['check', '<polyline points="19 7 9 17 5 13"/>'],
    ['close', '<line x1="19" y1="5" x2="5" y2="19"/><line x1="5" y1="5" x2="19" y2="19"/>'],
    ['document', '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>'],
    ['home', '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'],
    ['menu', '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>'],
    ['search', '<circle cx="10" cy="10" r="7"/><line x1="15" y1="15" x2="21" y2="21"/>'],
    ['user', '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.42 3.58-8 8-8s8 3.58 8 8"/>'],
  ];

  const svgFor = (name, body) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="#1c1514" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${body}
    </svg>`;

  const wrapper = figma.getNodeById(WRAPPER_ID);
  const foundations = figma.getNodeById(FOUNDATIONS_ID);
  if (!wrapper || !foundations) {
    reject(new Error(`Missing target node: wrapper=${!!wrapper}, foundations=${!!foundations}`));
    return;
  }

  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  // Populate each wrapper variant with a representative Search icon.
  // The actual icon remains swappable through the component property.
  if (wrapper.type === 'COMPONENT_SET') {
    const variants = wrapper.children.filter((node) => node.type === 'COMPONENT');
    for (const variant of variants) {
      const old = variant.findChildren(
        (node) => node.name === 'Icon Placeholder' || node.type === 'ELLIPSE'
      );
      old.forEach((node) => node.remove());
      const icon = figma.createNodeFromSvg(svgFor('search', CORE_ICONS.find(([name]) => name === 'search')[1]));
      icon.name = 'Icon / MdsSearchIcon / 24px';
      icon.resize(24, 24);
      icon.x = (variant.width - 24) / 2;
      icon.y = (variant.height - 24) / 2;
      variant.appendChild(icon);
    }
  }

  // Idempotent specimen grid: reuse an existing grid if present.
  let grid = foundations.findChild((node) => node.name === GRID_NAME);
  if (!grid) {
    grid = figma.createFrame();
    grid.name = GRID_NAME;
    grid.resize(736, 180);
    grid.x = 80;
    grid.y = foundations.height + 80;
    grid.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.97, b: 0.95 } }];
    grid.cornerRadius = 12;
    foundations.appendChild(grid);
  }

  // Clear only generated specimen children; do not touch unrelated content.
  grid.children.slice().forEach((node) => node.remove());
  const tileSize = 64;
  const gap = 16;
  CORE_ICONS.forEach(([name, body], index) => {
    const tile = figma.createFrame();
    tile.name = `Icon / Mds${name[0].toUpperCase()}${name.slice(1)}Icon`;
    tile.resize(tileSize, 112);
    tile.x = 16 + index * (tileSize + gap);
    tile.y = 16;
    tile.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    tile.cornerRadius = 8;

    const icon = figma.createNodeFromSvg(svgFor(name, body));
    icon.name = `Mds${name[0].toUpperCase()}${name.slice(1)}Icon / 24px / 2px`;
    icon.resize(24, 24);
    icon.x = 20;
    icon.y = 16;
    tile.appendChild(icon);

    const label = figma.createText();
    label.name = 'Name';
    label.characters = `Mds${name[0].toUpperCase()}${name.slice(1)}Icon`;
    label.fontSize = 8;
    label.fills = [{ type: 'SOLID', color: { r: 0.11, g: 0.08, b: 0.08 } }];
    label.x = 4;
    label.y = 76;
    tile.appendChild(label);
    grid.appendChild(tile);
  });

  figma.currentPage.selection = [grid];
  figma.viewport.scrollAndZoomIntoView([grid]);
  resolve({ wrapperId: WRAPPER_ID, gridId: grid.id, icons: CORE_ICONS.length });
});
