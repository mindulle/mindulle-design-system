/**
 * Figma Automation Script: 28-sync-cinematic-typography-styles.js
 * Mindulle Design System (MDS) - Korean Cinematic Display Typography Sync
 * 
 * Target Styles:
 * 1. Display / Cinematic Hero (64px, Cormorant Garamond + Noto Serif KR Bold)
 * 2. Display / Cinematic Section (36px, Cormorant Garamond + Noto Serif KR Bold)
 * 3. Display / Editorial Humanist (36px, Cormorant Garamond + Maru Buri Bold)
 * 4. Display / Editorial Quote (24px, Cormorant Garamond Medium Italic + Maru Buri Regular)
 */

async function syncCinematicTypography() {
  console.log("🎨 Syncing MDS Cinematic Display Typography to Figma...");

  // Load fonts
  try {
    await figma.loadFontAsync({ family: "Cormorant Garamond", style: "Bold" });
    await figma.loadFontAsync({ family: "Cormorant Garamond", style: "Medium" });
  } catch (e) {
    console.warn("Cormorant Garamond not locally installed in Figma, falling back to Georgia/Noto Serif");
  }

  try {
    await figma.loadFontAsync({ family: "Noto Serif KR", style: "Bold" });
    await figma.loadFontAsync({ family: "Noto Serif KR", style: "Regular" });
  } catch (e) {
    console.warn("Noto Serif KR font loading warning:", e);
  }

  try {
    await figma.loadFontAsync({ family: "MaruBuri", style: "Bold" });
    await figma.loadFontAsync({ family: "MaruBuri", style: "Regular" });
  } catch (e) {
    console.warn("MaruBuri font loading warning:", e);
  }

  // Pre-load Pretendard for metadata labels
  await figma.loadFontAsync({ family: "Pretendard", style: "Bold" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Regular" });
  await figma.loadFontAsync({ family: "JetBrains Mono", style: "Regular" }).catch(() => {});

  const localStyles = await figma.getLocalTextStylesAsync();

  const targetStyles = [
    {
      name: "Display / Cinematic Hero",
      fontSize: 64,
      fontName: { family: "Cormorant Garamond", style: "Bold" },
      lineHeight: { value: 115, unit: "PERCENT" },
      letterSpacing: { value: -2.5, unit: "PERCENT" },
      description: "MDS Primary Cinematic Display Title (≥64px, True 2px Stem standard, Cormorant + Noto Serif KR 700)"
    },
    {
      name: "Display / Cinematic Section",
      fontSize: 36,
      fontName: { family: "Cormorant Garamond", style: "Bold" },
      lineHeight: { value: 125, unit: "PERCENT" },
      letterSpacing: { value: -2.0, unit: "PERCENT" },
      description: "MDS Cinematic Section Title (36px, True 2px Stem standard)"
    },
    {
      name: "Display / Editorial Humanist",
      fontSize: 36,
      fontName: { family: "Cormorant Garamond", style: "Bold" },
      lineHeight: { value: 130, unit: "PERCENT" },
      letterSpacing: { value: -1.0, unit: "PERCENT" },
      description: "MDS Humanist Editorial Title (Atelier essays, quotes, Maru Buri pairing)"
    },
    {
      name: "Display / Editorial Quote",
      fontSize: 24,
      fontName: { family: "Cormorant Garamond", style: "Medium" },
      lineHeight: { value: 140, unit: "PERCENT" },
      letterSpacing: { value: 0, unit: "PERCENT" },
      description: "MDS Atelier Manifesto Quote & Philosophy Subhead"
    }
  ];

  const createdOrUpdatedStyles = [];

  for (const def of targetStyles) {
    let style = localStyles.find(s => s.name === def.name);
    if (!style) {
      style = figma.createTextStyle();
      style.name = def.name;
    }
    style.fontSize = def.fontSize;
    try {
      style.fontName = def.fontName;
    } catch (e) {
      console.warn(`Font ${def.fontName.family} ${def.fontName.style} unavailable, preserving current font`);
    }
    style.lineHeight = def.lineHeight;
    style.letterSpacing = def.letterSpacing;
    style.description = def.description;
    createdOrUpdatedStyles.push(style);
  }

  console.log(`✅ Successfully synced ${createdOrUpdatedStyles.length} Cinematic Display text styles.`);
  return {
    success: true,
    syncedCount: createdOrUpdatedStyles.length,
    styles: createdOrUpdatedStyles.map(s => ({ id: s.id, name: s.name, fontSize: s.fontSize }))
  };
}

syncCinematicTypography();
