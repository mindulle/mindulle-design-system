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

  // Existing published/local components are the icon SSOT. Add a registry
  // entry here when extending the core set; do not redraw SVGs in this script.
  const CORE_ICONS = [
    ['add', '325:32'], ['arrow-right', '325:13'], ['check', '325:35'],
    ['close', '325:20'], ['document', '325:24'], ['home', '325:16'],
    ['menu', '325:40'], ['search', '325:28'], ['user', '325:9'],
  ];

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
    const search = await figma.getNodeByIdAsync('325:28');
    if (!search || search.type !== 'COMPONENT') throw new Error('Search component 325:28 not found');
    const variants = wrapper.children.filter((node) => node.type === 'COMPONENT');
    for (const variant of variants) {
      const old = variant.findChildren(
        (node) => node.name === 'Icon Placeholder' || node.type === 'ELLIPSE'
      );
      old.forEach((node) => node.remove());
      const icon = search.createInstance();
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
  for (const [index, [name, componentId]] of CORE_ICONS.entries()) {
    const tile = figma.createFrame();
    tile.name = `Icon / Mds${name[0].toUpperCase()}${name.slice(1)}Icon`;
    tile.resize(tileSize, 112);
    tile.x = 16 + index * (tileSize + gap);
    tile.y = 16;
    tile.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    tile.cornerRadius = 8;

    const component = await figma.getNodeByIdAsync(componentId);
    if (!component || component.type !== 'COMPONENT') throw new Error(`Missing icon component: ${componentId}`);
    const icon = component.createInstance();
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
  }
  resolve({ wrapperId: WRAPPER_ID, gridId: grid.id, icons: CORE_ICONS.length });
});
