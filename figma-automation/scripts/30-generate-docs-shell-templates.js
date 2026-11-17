/**
 * Figma Automation Script: 30-generate-docs-shell-templates.js
 * Mindulle Design System (MDS v0.1.0) - Docs Shell Templates Generator
 *
 * ADR 0014 SSOT Implementation:
 * - 대표 템플릿(Docs Shell) 2장 한정 시안화 원칙:
 *   1. Screen 01: Docs Landing Home (1440 × 1320)
 *   2. Screen 02: Docs Viewer Shell Layout (1440 × 1200, 3-Column FumaDocs Architecture)
 * - The True 2px Stem (2px Border / Line Standard)
 * - 4px Weathered Radius (Modular Curvature, bound to radius/sm)
 * - No Soft Shadows (Crisp Surface Hierarchy)
 * - Semantic Color Variables (Colors collection, Dark mode) — Zero hardcoded HEX
 * - AutoLayout Hug/Stretch Factory Helpers (sonagi-ui-ops Rule 6 & Rule 8)
 */

return new Promise(async (resolve) => {
  let createdPage = null;
  let createdSection = null;
  let succeeded = false;
  try {
    console.log("🚀 [MDS] Starting Docs Shell Templates generation (ADR 0014 SSOT, Variable-bound)...");

    // 1. Parallel Font Loading
    const fonts = [
      { family: "Inter", style: "Regular" },
      { family: "Inter", style: "Bold" },
      { family: "Pretendard", style: "Regular" },
      { family: "Pretendard", style: "Bold" },
      { family: "Pretendard", style: "SemiBold" },
      { family: "JetBrains Mono", style: "Regular" },
      { family: "Noto Serif KR", style: "Bold" },
      { family: "Cormorant Garamond", style: "Bold" },
    ];
    await Promise.allSettled(fonts.map((f) => figma.loadFontAsync(f)));

    const F = {
      display: { family: "Noto Serif KR", style: "Bold" },
      serif: { family: "Cormorant Garamond", style: "Bold" },
      uiBold: { family: "Pretendard", style: "Bold" },
      uiSemi: { family: "Pretendard", style: "SemiBold" },
      uiReg: { family: "Pretendard", style: "Regular" },
      mono: { family: "JetBrains Mono", style: "Regular" },
    };

    // 2. Resolve Local Variables (Colors, Radius)
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const localVars = await figma.variables.getLocalVariablesAsync();

    const colorCollection = collections.find((c) => c.name === "Colors");
    const radiusCollection = collections.find((c) => c.name === "Radius");

    const varByName = new Map();
    for (const v of localVars) {
      varByName.set(v.name, v);
    }

    const reqVar = (name) => {
      const v = varByName.get(name);
      if (!v) throw new Error(`Missing required Figma variable: ${name}`);
      return v;
    };

    const V = {
      bgBase: reqVar("background/base"),
      bgSurface: reqVar("background/surface"),
      bgElevated: reqVar("background/elevated"),
      borderSubtle: reqVar("border/subtle"),
      borderDefault: reqVar("border/default"),
      borderStrong: reqVar("border/strong"),
      textPrimary: reqVar("text/primary"),
      textSecondary: reqVar("text/secondary"),
      textMuted: reqVar("text/muted"),
      textInverse: reqVar("text/inverse"),
      brandPrimary: reqVar("brand/primary"),
      brandAccent: reqVar("brand/accent"),
      stateSuccess: reqVar("state/success"),
      stateSuccessBg: reqVar("state/success-bg"),
      stateWarningBg: reqVar("state/warning-bg"),
      radiusSm: radiusCollection ? varByName.get("radius/sm") : null,
      radiusFull: radiusCollection ? varByName.get("radius/full") : null,
    };

    const bindPaint = (variable, opacity = 1) => {
      const base = { type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity };
      return [figma.variables.setBoundVariableForPaint(base, "color", variable)];
    };

    const bindRadius = (node, radiusVar, fallbackPx) => {
      node.cornerRadius = fallbackPx;
      if (radiusVar) {
        ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"].forEach((prop) => {
          node.setBoundVariable(prop, radiusVar);
        });
      }
    };

    // 3. AutoLayout Factory Helpers (sonagi-ui-ops Rule 8)
    function createHugRow(itemSpacing = 8, alignItems = "CENTER", justify = "MIN") {
      const row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.primaryAxisSizingMode = justify === "SPACE_BETWEEN" ? "FIXED" : "AUTO";
      row.counterAxisSizingMode = "AUTO";
      row.counterAxisAlignItems = alignItems;
      row.primaryAxisAlignItems = justify;
      if (justify === "SPACE_BETWEEN") {
        row.layoutAlign = "STRETCH";
      }
      row.itemSpacing = itemSpacing;
      row.fills = [];
      return row;
    }

    function createHugCol(itemSpacing = 8, alignItems = "MIN") {
      const col = figma.createFrame();
      col.layoutMode = "VERTICAL";
      col.primaryAxisSizingMode = "AUTO";
      col.counterAxisSizingMode = "AUTO";
      col.counterAxisAlignItems = alignItems;
      col.itemSpacing = itemSpacing;
      col.fills = [];
      return col;
    }

    // 4. Page & Section Setup (Dark Mode Enforced)
    await figma.loadAllPagesAsync();
    let page = figma.root.children.find((p) => p.name === "📖 Docs Shell Templates");
    if (!page) {
      page = figma.createPage();
      page.name = "📖 Docs Shell Templates";
      createdPage = page;
    }
    await figma.setCurrentPageAsync(page);

    let section = page.findOne((n) => n.type === "SECTION" && n.name === "MDS Docs Shell Templates (ADR 0014 SSOT)");
    if (section) {
      section.remove();
    }
    section = figma.createSection();
    createdSection = section;
    section.name = "MDS Docs Shell Templates (ADR 0014 SSOT)";
    section.x = 0;
    section.y = 0;

    if (colorCollection) {
      const darkMode = colorCollection.modes.find((m) => m.name === "Dark");
      if (darkMode) {
        section.setExplicitVariableModeForCollection(colorCollection, darkMode.modeId);
      }
    }

    function bindSvgColorsToVariables(rootNode) {
      const nodes = [rootNode, ...rootNode.findAll(() => true)];
      const hexMatch = (c, r, g, b) =>
        Math.abs(c.r - r / 255) < 0.02 && Math.abs(c.g - g / 255) < 0.02 && Math.abs(c.b - b / 255) < 0.02;

      const mapColorVar = (c) => {
        if (hexMatch(c, 255, 209, 102)) return V.brandPrimary;
        if (hexMatch(c, 245, 158, 11)) return V.brandAccent;
        if (hexMatch(c, 255, 255, 255)) return V.textPrimary;
        return null;
      };

      for (const n of nodes) {
        if ("fills" in n && Array.isArray(n.fills) && n.fills.length > 0) {
          n.fills = n.fills.map((p) => {
            if (p.type !== "SOLID") return p;
            const targetVar = mapColorVar(p.color);
            return targetVar ? figma.variables.setBoundVariableForPaint(p, "color", targetVar) : p;
          });
        }
        if ("strokes" in n && Array.isArray(n.strokes) && n.strokes.length > 0) {
          n.strokes = n.strokes.map((p) => {
            if (p.type !== "SOLID") return p;
            const targetVar = mapColorVar(p.color);
            return targetVar ? figma.variables.setBoundVariableForPaint(p, "color", targetVar) : p;
          });
        }
      }
    }

    function createMindulleLogoNode(size = 24) {
      const svgCode =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none">' +
        '<path d="M 11.5,17.2 C 9.6,17.5 8.6,19 9.8,21.5 C 10.6,22.2 11.6,22.4 12.4,21.8 C 13.8,19.4 13,17.6 11.5,17.2 Z" fill="#ffd166" stroke="#f59e0b" stroke-width="1.0" />' +
        '<circle cx="11.5" cy="19.4" r="0.65" fill="#ffffff" />' +
        '<path d="M 11.5,17.2 C 12.6,12.8 13.8,8.2 13.5,3.6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />' +
        '<path d="M 12.2,14.6 C 8.2,13.2 4.6,11.2 3.6,7.6 C 6.2,7.4 9.2,8 13.2,8.4 Z" stroke="#ffffff" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" fill="#ffffff" fill-opacity="0.1" />' +
        '<path d="M 11.4,13.6 C 8.6,12.3 6.6,11 5.2,8.6" stroke="#ffd166" stroke-width="1.4" stroke-linecap="round" />' +
        '<path d="M 13,8 C 9.8,6.6 7.8,5.2 7.2,3.2 C 9.2,3.1 11.2,3.6 13.4,4.2 Z" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" fill="#ffffff" fill-opacity="0.1" />' +
        '<path d="M 13.5,3.6 C 16.8,5.2 19.2,8.4 20.4,13" stroke="#ffd166" stroke-width="1.25" stroke-linecap="round" stroke-dasharray="2 1.5" opacity="0.85" />' +
        '<circle cx="13.5" cy="3.6" r="1.4" fill="#ffd166" />' +
        '<circle cx="13.1" cy="3.2" r="0.5" fill="#ffffff" />' +
        "</svg>";
      try {
        const node = figma.createNodeFromSvg(svgCode);
        node.name = "MindulleLogo (True 2px Stem)";
        bindSvgColorsToVariables(node);
        return node;
      } catch (err) {
        const frame = figma.createFrame();
        frame.name = "MindulleLogo (Fallback)";
        frame.resize(size, size);
        frame.fills = bindPaint(V.brandPrimary);
        bindRadius(frame, V.radiusSm, 4);
        return frame;
      }
    }

    function createPillBadge(text, variant = "gold") {
      const badge = createHugRow(6, "CENTER", "MIN");
      badge.name = `Badge / ${text}`;
      badge.paddingTop = 4;
      badge.paddingBottom = 4;
      badge.paddingLeft = 10;
      badge.paddingRight = 10;
      bindRadius(badge, V.radiusFull, 999);

      const txt = figma.createText();
      txt.textAutoResize = "WIDTH_AND_HEIGHT";
      if (variant === "gold") {
        badge.fills = bindPaint(V.stateWarningBg);
        badge.strokes = bindPaint(V.brandAccent);
        badge.strokeWeight = 1;
        txt.fontName = F.uiSemi;
        txt.characters = text;
        txt.fontSize = 11;
        txt.fills = bindPaint(V.brandPrimary);
      } else if (variant === "green") {
        badge.fills = bindPaint(V.stateSuccessBg);
        badge.strokes = bindPaint(V.stateSuccess);
        badge.strokeWeight = 1;
        txt.fontName = F.mono;
        txt.characters = text;
        txt.fontSize = 11;
        txt.fills = bindPaint(V.stateSuccess);
      } else {
        badge.fills = bindPaint(V.bgElevated);
        badge.strokes = bindPaint(V.borderSubtle);
        badge.strokeWeight = 1;
        txt.fontName = F.mono;
        txt.characters = text;
        txt.fontSize = 11;
        txt.fills = bindPaint(V.textSecondary);
      }
      badge.appendChild(txt);
      return badge;
    }

    // =========================================================================
    // 1. SCREEN 01: Docs Landing Home (1440 × 1320)
    // =========================================================================
    const landingFrame = figma.createFrame();
    landingFrame.name = "MDS Docs Shell • 01 Landing Home";
    landingFrame.resize(1440, 1320);
    landingFrame.x = 40;
    landingFrame.y = 40;
    landingFrame.fills = bindPaint(V.bgBase);
    landingFrame.layoutMode = "VERTICAL";
    landingFrame.primaryAxisSizingMode = "FIXED";
    landingFrame.counterAxisSizingMode = "FIXED";
    landingFrame.itemSpacing = 24;
    section.appendChild(landingFrame);

    // GNB Header (1440 x 64)
    const gnb = createHugRow(16, "CENTER", "SPACE_BETWEEN");
    gnb.name = "GNB / Global Header";
    gnb.resize(1440, 64);
    gnb.counterAxisSizingMode = "FIXED";
    gnb.paddingLeft = 48;
    gnb.paddingRight = 48;
    gnb.paddingTop = 14;
    gnb.paddingBottom = 14;
    gnb.fills = bindPaint(V.bgBase, 0.95);
    gnb.strokes = bindPaint(V.borderSubtle);
    gnb.strokeWeight = 2; // True 2px Stem boundary
    gnb.strokeAlign = "INSIDE";
    landingFrame.appendChild(gnb);
    gnb.layoutAlign = "STRETCH";

    const gnbBrand = createHugRow(10, "CENTER", "MIN");
    gnbBrand.name = "GNB Brand";
    gnbBrand.appendChild(createMindulleLogoNode(22));

    const brandTitle = figma.createText();
    brandTitle.fontName = F.uiBold;
    brandTitle.characters = "민들레 디자인 시스템";
    brandTitle.fontSize = 14;
    brandTitle.textAutoResize = "WIDTH_AND_HEIGHT";
    brandTitle.fills = bindPaint(V.textPrimary);
    gnbBrand.appendChild(brandTitle);
    gnbBrand.appendChild(createPillBadge("v0.1.0", "gold"));
    gnb.appendChild(gnbBrand);

    const gnbRight = createHugRow(24, "CENTER", "MIN");
    gnbRight.name = "GNB Navigation";

    const searchTrigger = createHugRow(18, "CENTER", "MIN");
    searchTrigger.name = "Search Trigger";
    searchTrigger.paddingLeft = 14;
    searchTrigger.paddingRight = 14;
    searchTrigger.paddingTop = 8;
    searchTrigger.paddingBottom = 8;
    bindRadius(searchTrigger, V.radiusSm, 4);
    searchTrigger.fills = bindPaint(V.bgSurface);
    searchTrigger.strokes = bindPaint(V.borderSubtle);
    searchTrigger.strokeWeight = 1;
    const sTxt = figma.createText();
    sTxt.fontName = F.uiReg;
    sTxt.characters = "문서 및 컴포넌트 검색...";
    sTxt.fontSize = 12;
    sTxt.textAutoResize = "WIDTH_AND_HEIGHT";
    sTxt.fills = bindPaint(V.textSecondary);
    searchTrigger.appendChild(sTxt);
    const kbd = figma.createText();
    kbd.fontName = F.mono;
    kbd.characters = "⌘K";
    kbd.fontSize = 11;
    kbd.textAutoResize = "WIDTH_AND_HEIGHT";
    kbd.fills = bindPaint(V.brandPrimary);
    searchTrigger.appendChild(kbd);
    gnbRight.appendChild(searchTrigger);

    ["문서", "파운데이션", "컴포넌트", "3D 쇼룸"].forEach((label) => {
      const link = figma.createText();
      link.fontName = F.uiSemi;
      link.characters = label;
      link.fontSize = 13;
      link.textAutoResize = "WIDTH_AND_HEIGHT";
      link.fills = bindPaint(label === "문서" ? V.textPrimary : V.textSecondary);
      gnbRight.appendChild(link);
    });
    gnb.appendChild(gnbRight);

    // Hero Section
    const heroSection = createHugCol(20, "CENTER");
    heroSection.name = "Hero Section";
    heroSection.primaryAxisAlignItems = "CENTER";
    heroSection.paddingTop = 56;
    heroSection.paddingBottom = 32;
    heroSection.paddingLeft = 48;
    heroSection.paddingRight = 48;
    landingFrame.appendChild(heroSection);
    heroSection.layoutAlign = "STRETCH";

    const heroPill = createHugRow(8, "CENTER", "MIN");
    heroPill.name = "Hero Announcement Pill";
    heroPill.paddingLeft = 14;
    heroPill.paddingRight = 14;
    heroPill.paddingTop = 6;
    heroPill.paddingBottom = 6;
    bindRadius(heroPill, V.radiusFull, 999);
    heroPill.fills = bindPaint(V.stateWarningBg);
    heroPill.strokes = bindPaint(V.brandAccent);
    heroPill.strokeWeight = 1;
    const hpTxt = figma.createText();
    hpTxt.fontName = F.uiBold;
    hpTxt.characters = "겨울 끝, 민들레.  |  MDS v0.1.0";
    hpTxt.fontSize = 12;
    hpTxt.textAutoResize = "WIDTH_AND_HEIGHT";
    hpTxt.fills = bindPaint(V.brandPrimary);
    heroPill.appendChild(hpTxt);
    heroSection.appendChild(heroPill);

    const heroTitle = figma.createText();
    heroTitle.fontName = F.display;
    heroTitle.characters = "실무를 위한 단단하고 정갈한\n민들레 디자인 시스템";
    heroTitle.fontSize = 52;
    heroTitle.lineHeight = { value: 118, unit: "PERCENT" };
    heroTitle.letterSpacing = { value: -2.5, unit: "PERCENT" };
    heroTitle.textAlignHorizontal = "CENTER";
    heroTitle.fills = bindPaint(V.textPrimary);
    heroSection.appendChild(heroTitle);
    heroTitle.layoutAlign = "STRETCH";
    heroTitle.textAutoResize = "HEIGHT";

    const heroSub = figma.createText();
    heroSub.fontName = F.uiReg;
    heroSub.characters = "16종 인터랙티브 컴포넌트와 W3C 시맨틱 토큰 매트릭스.\n비바람에도 꺾이지 않는 The True 2px Stem과 4px 모듈러 곡률 조형 헌법.";
    heroSub.fontSize = 17;
    heroSub.lineHeight = { value: 150, unit: "PERCENT" };
    heroSub.textAlignHorizontal = "CENTER";
    heroSub.fills = bindPaint(V.textSecondary);
    heroSection.appendChild(heroSub);
    heroSub.layoutAlign = "STRETCH";
    heroSub.textAutoResize = "HEIGHT";

    const ctaRow = createHugRow(14, "CENTER", "MIN");
    ctaRow.name = "Hero CTA Row";

    const btnPri = createHugRow(8, "CENTER", "MIN");
    btnPri.name = "Primary CTA";
    btnPri.paddingLeft = 24;
    btnPri.paddingRight = 24;
    btnPri.paddingTop = 13;
    btnPri.paddingBottom = 13;
    bindRadius(btnPri, V.radiusSm, 4);
    btnPri.fills = bindPaint(V.brandPrimary);
    const btnPriTxt = figma.createText();
    btnPriTxt.fontName = F.uiBold;
    btnPriTxt.characters = "공식 문서 둘러보기  →";
    btnPriTxt.fontSize = 14;
    btnPriTxt.textAutoResize = "WIDTH_AND_HEIGHT";
    btnPriTxt.fills = bindPaint(V.bgBase);
    btnPri.appendChild(btnPriTxt);
    ctaRow.appendChild(btnPri);

    const btnSec = createHugRow(8, "CENTER", "MIN");
    btnSec.name = "Secondary CTA";
    btnSec.paddingLeft = 22;
    btnSec.paddingRight = 22;
    btnSec.paddingTop = 12;
    btnSec.paddingBottom = 12;
    bindRadius(btnSec, V.radiusSm, 4);
    btnSec.fills = bindPaint(V.bgSurface);
    btnSec.strokes = bindPaint(V.borderDefault);
    btnSec.strokeWeight = 2; // True 2px Stem
    const btnSecTxt = figma.createText();
    btnSecTxt.fontName = F.uiSemi;
    btnSecTxt.characters = "GitHub 레포지토리";
    btnSecTxt.fontSize = 14;
    btnSecTxt.textAutoResize = "WIDTH_AND_HEIGHT";
    btnSecTxt.fills = bindPaint(V.textPrimary);
    btnSec.appendChild(btnSecTxt);
    ctaRow.appendChild(btnSec);

    const codePill = createHugRow(8, "CENTER", "MIN");
    codePill.name = "Install Command Pill";
    codePill.paddingLeft = 16;
    codePill.paddingRight = 16;
    codePill.paddingTop = 12;
    codePill.paddingBottom = 12;
    bindRadius(codePill, V.radiusSm, 4);
    codePill.fills = bindPaint(V.bgElevated);
    codePill.strokes = bindPaint(V.borderSubtle);
    codePill.strokeWeight = 1;
    const cpTxt = figma.createText();
    cpTxt.fontName = F.mono;
    cpTxt.characters = "pnpm add @mindulle/tokens @mindulle/ui";
    cpTxt.fontSize = 12;
    cpTxt.textAutoResize = "WIDTH_AND_HEIGHT";
    cpTxt.fills = bindPaint(V.brandPrimary);
    codePill.appendChild(cpTxt);
    ctaRow.appendChild(codePill);

    heroSection.appendChild(ctaRow);

    // Constitution Section
    const constSection = createHugCol(24, "MIN");
    constSection.name = "Design Constitution Grid";
    constSection.paddingLeft = 80;
    constSection.paddingRight = 80;
    constSection.paddingTop = 20;
    constSection.paddingBottom = 40;
    landingFrame.appendChild(constSection);
    constSection.layoutAlign = "STRETCH";

    const constHeader = createHugCol(4, "MIN");
    constHeader.name = "Constitution Header";
    constSection.appendChild(constHeader);
    constHeader.layoutAlign = "STRETCH";

    const constEyebrow = figma.createText();
    constEyebrow.fontName = F.mono;
    constEyebrow.characters = "DESIGN CONSTITUTION • 조형 헌법";
    constEyebrow.fontSize = 11;
    constEyebrow.fills = bindPaint(V.brandPrimary);
    const constTitle = figma.createText();
    constTitle.fontName = F.display;
    constTitle.characters = "민들레 3대 조형 헌법 (The Trinity Principles)";
    constTitle.fontSize = 24;
    constTitle.fills = bindPaint(V.textPrimary);
    constHeader.appendChild(constEyebrow);
    constHeader.appendChild(constTitle);
    constEyebrow.layoutAlign = "STRETCH";
    constEyebrow.textAutoResize = "HEIGHT";
    constTitle.layoutAlign = "STRETCH";
    constTitle.textAutoResize = "HEIGHT";

    const gridRow = createHugRow(24, "MIN", "MIN");
    gridRow.name = "Trinity Cards Row";
    gridRow.primaryAxisSizingMode = "FIXED";
    constSection.appendChild(gridRow);
    gridRow.layoutAlign = "STRETCH";

    const cardsData = [
      {
        tag: "BORDER: 2PX SOLID",
        title: "The True 2px Stem",
        ko: "꺾이지 않는 2px 단단한 줄기선",
        desc: "흐리멍텅한 안티앨리어싱을 배제하고 모든 컴포넌트의 경계와 자아를 선명한 2px 스트로크로 수호합니다.",
      },
      {
        tag: "RADIUS: 4PX MODULAR",
        title: "4px Weathered Radius",
        ko: "자연스럽게 마모된 4px 곡률",
        desc: "인위적인 과도한 둥글림 대신, 척박한 비바람에 부드럽게 마모된 바위와 로제트 잎을 닮은 4px 모듈러 곡률을 적용합니다.",
      },
      {
        tag: "SHADOW: HARD / NONE",
        title: "No Soft Shadows",
        ko: "안개와 기만을 배제한 평면 위계",
        desc: "소프트 섀도우라는 시각적 기만을 배제하고, 순수한 층위(Elevated Layer)와 고명도 대비로 단단한 공간감을 만듭니다.",
      },
    ];

    // 1440 - 160 (padding) - 48 (2 gaps) = 1232 / 3 = 410.67
    const cardWidth = Math.floor((1440 - 160 - 24 * 2) / 3);
    cardsData.forEach((c) => {
      const card = createHugCol(14, "MIN");
      card.name = `Card / ${c.title}`;
      card.resize(cardWidth, 240);
      card.paddingLeft = 24;
      card.paddingRight = 24;
      card.paddingTop = 24;
      card.paddingBottom = 24;
      bindRadius(card, V.radiusSm, 4);
      card.fills = bindPaint(V.bgSurface);
      card.strokes = bindPaint(V.borderDefault);
      card.strokeWeight = 2; // True 2px Stem

      card.appendChild(createPillBadge(c.tag, "neutral"));

      const cHead = figma.createText();
      cHead.fontName = F.serif;
      cHead.characters = c.title;
      cHead.fontSize = 20;
      cHead.fills = bindPaint(V.textPrimary);
      card.appendChild(cHead);
      cHead.layoutAlign = "STRETCH";
      cHead.textAutoResize = "HEIGHT";

      const cKo = figma.createText();
      cKo.fontName = F.uiBold;
      cKo.characters = c.ko;
      cKo.fontSize = 14;
      cKo.fills = bindPaint(V.brandPrimary);
      card.appendChild(cKo);
      cKo.layoutAlign = "STRETCH";
      cKo.textAutoResize = "HEIGHT";

      const cDesc = figma.createText();
      cDesc.fontName = F.uiReg;
      cDesc.characters = c.desc;
      cDesc.fontSize = 13;
      cDesc.lineHeight = { value: 150, unit: "PERCENT" };
      cDesc.fills = bindPaint(V.textSecondary);
      card.appendChild(cDesc);
      cDesc.layoutAlign = "STRETCH";
      cDesc.textAutoResize = "HEIGHT";

      gridRow.appendChild(card);
      card.layoutGrow = 1;
      card.layoutAlign = "STRETCH";
    });

    // =========================================================================
    // 2. SCREEN 02: Docs Documentation Viewer Shell Layout (1440 × 1200)
    // =========================================================================
    const viewerFrame = figma.createFrame();
    viewerFrame.name = "MDS Docs Shell • 02 Documentation Viewer";
    viewerFrame.resize(1440, 1200);
    viewerFrame.x = 1520;
    viewerFrame.y = 40;
    viewerFrame.fills = bindPaint(V.bgBase);
    viewerFrame.layoutMode = "VERTICAL";
    viewerFrame.primaryAxisSizingMode = "FIXED";
    viewerFrame.counterAxisSizingMode = "FIXED";
    viewerFrame.itemSpacing = 0;
    section.appendChild(viewerFrame);

    // Viewer GNB (1440 x 56)
    const vGnb = createHugRow(16, "CENTER", "SPACE_BETWEEN");
    vGnb.name = "Viewer Header & Breadcrumbs";
    vGnb.resize(1440, 56);
    vGnb.counterAxisSizingMode = "FIXED";
    vGnb.paddingLeft = 32;
    vGnb.paddingRight = 32;
    vGnb.paddingTop = 12;
    vGnb.paddingBottom = 12;
    vGnb.fills = bindPaint(V.bgBase, 0.98);
    vGnb.strokes = bindPaint(V.borderSubtle);
    vGnb.strokeWeight = 2; // True 2px Stem boundary
    viewerFrame.appendChild(vGnb);
    vGnb.layoutAlign = "STRETCH";

    const vLeft = createHugRow(12, "CENTER", "MIN");
    vLeft.name = "Viewer Breadcrumbs";
    vLeft.appendChild(createMindulleLogoNode(20));

    const vBread = figma.createText();
    vBread.fontName = F.uiSemi;
    vBread.characters = "문서  /  파운데이션  /  타이포그래피";
    vBread.fontSize = 13;
    vBread.textAutoResize = "WIDTH_AND_HEIGHT";
    vBread.fills = bindPaint(V.textPrimary);
    vLeft.appendChild(vBread);
    vGnb.appendChild(vLeft);

    const vRight = createHugRow(16, "CENTER", "MIN");
    vRight.name = "Viewer Header Meta";
    vRight.appendChild(createPillBadge("SSOT Live Sync", "green"));
    const vGh = figma.createText();
    vGh.fontName = F.uiSemi;
    vGh.characters = "GitHub";
    vGh.fontSize = 12;
    vGh.textAutoResize = "WIDTH_AND_HEIGHT";
    vGh.fills = bindPaint(V.textSecondary);
    vRight.appendChild(vGh);
    vGnb.appendChild(vRight);

    // 3-Column Documentation Body (1440 x 1144)
    const vBody = figma.createFrame();
    vBody.name = "3-Column Docs Shell (Sidebar + Article + TOC)";
    vBody.resize(1440, 1144);
    vBody.layoutMode = "HORIZONTAL";
    vBody.primaryAxisSizingMode = "FIXED";
    vBody.counterAxisSizingMode = "FIXED";
    vBody.itemSpacing = 0;
    vBody.fills = [];
    viewerFrame.appendChild(vBody);
    vBody.layoutAlign = "STRETCH";
    vBody.layoutGrow = 1;

    // Col 1: Left Navigation Sidebar (260px)
    const sidebar = createHugCol(24, "MIN");
    sidebar.name = "Left Navigation Sidebar";
    sidebar.resize(260, 1144);
    sidebar.primaryAxisSizingMode = "FIXED";
    sidebar.counterAxisSizingMode = "FIXED";
    sidebar.paddingLeft = 24;
    sidebar.paddingRight = 20;
    sidebar.paddingTop = 32;
    sidebar.paddingBottom = 32;
    sidebar.fills = bindPaint(V.bgBase);
    sidebar.strokes = bindPaint(V.borderSubtle);
    sidebar.strokeWeight = 2; // True 2px Stem column divider
    sidebar.strokeAlign = "INSIDE";
    vBody.appendChild(sidebar);
    sidebar.layoutAlign = "STRETCH";

    const sidebarSections = [
      {
        header: "개요 (OVERVIEW)",
        items: ["빠른 시작 (Quickstart)", "리브랜딩 선언 (ADR 0013)"],
        activeItem: null,
      },
      {
        header: "파운데이션 (FOUNDATIONS)",
        items: ["색상 토큰 (Colors & Tokens)", "타이포그래피 (Typography)"],
        activeItem: "타이포그래피 (Typography)",
      },
      {
        header: "컴포넌트 (COMPONENTS)",
        items: ["민들레 로고 (MindulleLogo)", "버튼 (Button)", "카드 (Card)", "아코디언 (Accordion)", "배지 (Badge)", "인풋 (Input)"],
        activeItem: null,
      },
    ];

    sidebarSections.forEach((s) => {
      const sGroup = createHugCol(6, "MIN");
      sGroup.name = `Sidebar Group / ${s.header}`;
      sidebar.appendChild(sGroup);
      sGroup.layoutAlign = "STRETCH";

      const sHead = figma.createText();
      sHead.fontName = F.mono;
      sHead.characters = s.header;
      sHead.fontSize = 11;
      sHead.fills = bindPaint(V.brandPrimary);
      sGroup.appendChild(sHead);
      sHead.layoutAlign = "STRETCH";
      sHead.textAutoResize = "HEIGHT";

      s.items.forEach((item) => {
        const itemRow = createHugRow(8, "CENTER", "MIN");
        itemRow.primaryAxisSizingMode = "FIXED";
        itemRow.paddingTop = 6;
        itemRow.paddingBottom = 6;
        itemRow.paddingLeft = 10;
        itemRow.paddingRight = 10;
        bindRadius(itemRow, V.radiusSm, 4);

        const isActive = s.activeItem === item;
        if (isActive) {
          itemRow.fills = bindPaint(V.bgElevated);
          itemRow.strokes = bindPaint(V.brandPrimary);
          itemRow.strokeWeight = 2;
        } else {
          itemRow.fills = [];
        }

        const itemTxt = figma.createText();
        itemTxt.fontName = isActive ? F.uiBold : F.uiReg;
        itemTxt.characters = item;
        itemTxt.fontSize = 13;
        itemTxt.fills = bindPaint(isActive ? V.brandPrimary : V.textSecondary);
        itemRow.appendChild(itemTxt);
        itemTxt.layoutGrow = 1;
        itemTxt.textAutoResize = "HEIGHT";

        sGroup.appendChild(itemRow);
        itemRow.layoutAlign = "STRETCH";
      });
    });

    // Col 2: Center Article Pane (880px)
    const articlePane = createHugCol(28, "MIN");
    articlePane.name = "Article Main Content Pane";
    articlePane.resize(880, 1144);
    articlePane.primaryAxisSizingMode = "FIXED";
    articlePane.counterAxisSizingMode = "FIXED";
    articlePane.paddingLeft = 48;
    articlePane.paddingRight = 48;
    articlePane.paddingTop = 40;
    articlePane.paddingBottom = 40;
    articlePane.fills = bindPaint(V.bgBase);
    vBody.appendChild(articlePane);
    articlePane.layoutAlign = "STRETCH";
    articlePane.layoutGrow = 1;

    const artHead = createHugCol(8, "MIN");
    artHead.name = "Article Header";
    articlePane.appendChild(artHead);
    artHead.layoutAlign = "STRETCH";

    const artEyebrow = figma.createText();
    artEyebrow.fontName = F.mono;
    artEyebrow.characters = "FOUNDATIONS  /  TYPOGRAPHY & DISPLAY";
    artEyebrow.fontSize = 12;
    artEyebrow.fills = bindPaint(V.brandPrimary);
    artHead.appendChild(artEyebrow);
    artEyebrow.layoutAlign = "STRETCH";
    artEyebrow.textAutoResize = "HEIGHT";

    const artTitle = figma.createText();
    artTitle.fontName = F.display;
    artTitle.characters = "타이포그래피 (Typography & Display)";
    artTitle.fontSize = 38;
    artTitle.fills = bindPaint(V.textPrimary);
    artHead.appendChild(artTitle);
    artTitle.layoutAlign = "STRETCH";
    artTitle.textAutoResize = "HEIGHT";

    const artLead = figma.createText();
    artLead.fontName = F.uiReg;
    artLead.characters = "민들레 디자인 시스템은 정갈한 분석(Analytics)과 시적 에디토리얼(Editorial)의 만남을 지향합니다. 본문에는 고해상도 Pretendard/Inter를, 전시 및 헤드라인에는 한국어 시네마틱 디스플레이 서체 헌법을 강제합니다.";
    artLead.fontSize = 15;
    artLead.lineHeight = { value: 160, unit: "PERCENT" };
    artLead.fills = bindPaint(V.textSecondary);
    artHead.appendChild(artLead);
    artLead.layoutAlign = "STRETCH";
    artLead.textAutoResize = "HEIGHT";

    // Shield Callout Banner
    const verifBanner = createHugRow(16, "CENTER", "SPACE_BETWEEN");
    verifBanner.name = "Visual Consistency Callout";
    verifBanner.paddingLeft = 20;
    verifBanner.paddingRight = 20;
    verifBanner.paddingTop = 14;
    verifBanner.paddingBottom = 14;
    bindRadius(verifBanner, V.radiusSm, 4);
    verifBanner.fills = bindPaint(V.bgSurface);
    verifBanner.strokes = bindPaint(V.brandAccent, 0.6);
    verifBanner.strokeWeight = 2; // True 2px Stem
    articlePane.appendChild(verifBanner);
    verifBanner.layoutAlign = "STRETCH";

    const vbLeft = createHugCol(2, "MIN");
    vbLeft.name = "Banner Copy";
    const vbTitle = figma.createText();
    vbTitle.fontName = F.uiBold;
    vbTitle.characters = "🛡️ Visual Consistency Graph 검증 통과 (SCORE 97/100 PASS)";
    vbTitle.fontSize = 13;
    vbTitle.fills = bindPaint(V.textPrimary);
    const vbDesc = figma.createText();
    vbDesc.fontName = F.uiReg;
    vbDesc.characters = "Cormorant Garamond 700 ↔ Noto Serif KR 700 광학 일치도 96% & 2px True Stem 헌법 준수";
    vbDesc.fontSize = 12;
    vbDesc.fills = bindPaint(V.textSecondary);
    vbLeft.appendChild(vbTitle);
    vbLeft.appendChild(vbDesc);
    vbTitle.layoutAlign = "STRETCH";
    vbTitle.textAutoResize = "HEIGHT";
    vbDesc.layoutAlign = "STRETCH";
    vbDesc.textAutoResize = "HEIGHT";
    verifBanner.appendChild(vbLeft);
    vbLeft.layoutGrow = 1;
    verifBanner.appendChild(createPillBadge("Figma Local Styles 4종 SSOT", "gold"));

    // Specimen Card 1
    const specCard1 = createHugCol(12, "MIN");
    specCard1.name = "Specimen Card";
    specCard1.paddingLeft = 28;
    specCard1.paddingRight = 28;
    specCard1.paddingTop = 24;
    specCard1.paddingBottom = 24;
    bindRadius(specCard1, V.radiusSm, 4);
    specCard1.fills = bindPaint(V.bgSurface);
    specCard1.strokes = bindPaint(V.borderDefault);
    specCard1.strokeWeight = 2; // True 2px Stem
    articlePane.appendChild(specCard1);
    specCard1.layoutAlign = "STRETCH";

    const sc1Meta = createHugRow(12, "CENTER", "MIN");
    const sc1Title = figma.createText();
    sc1Title.fontName = F.mono;
    sc1Title.characters = "Display / Cinematic Hero";
    sc1Title.fontSize = 12;
    sc1Title.textAutoResize = "WIDTH_AND_HEIGHT";
    sc1Title.fills = bindPaint(V.brandPrimary);
    sc1Meta.appendChild(sc1Title);
    sc1Meta.appendChild(createPillBadge("64px • 2.8px Stem (≥2px 합격)", "neutral"));
    specCard1.appendChild(sc1Meta);

    const sc1Text = figma.createText();
    sc1Text.fontName = F.display;
    sc1Text.characters = "겨울 끝, 민들레의 비상";
    sc1Text.fontSize = 42;
    sc1Text.fills = bindPaint(V.textPrimary);
    specCard1.appendChild(sc1Text);
    sc1Text.layoutAlign = "STRETCH";
    sc1Text.textAutoResize = "HEIGHT";

    const sc1En = figma.createText();
    sc1En.fontName = F.serif;
    sc1En.characters = "SOVEREIGN CINEMATIC ARCHITECTURE • TRUE 2PX STEM";
    sc1En.fontSize = 13;
    sc1En.letterSpacing = { value: 15, unit: "PERCENT" };
    sc1En.fills = bindPaint(V.textSecondary);
    specCard1.appendChild(sc1En);
    sc1En.layoutAlign = "STRETCH";
    sc1En.textAutoResize = "HEIGHT";

    // Code Box
    const codeBox = createHugCol(6, "MIN");
    codeBox.name = "Code Block";
    codeBox.paddingLeft = 20;
    codeBox.paddingRight = 20;
    codeBox.paddingTop = 16;
    codeBox.paddingBottom = 16;
    bindRadius(codeBox, V.radiusSm, 4);
    codeBox.fills = bindPaint(V.bgElevated);
    codeBox.strokes = bindPaint(V.borderSubtle);
    codeBox.strokeWeight = 1;
    articlePane.appendChild(codeBox);
    codeBox.layoutAlign = "STRETCH";

    const cbTitle = figma.createText();
    cbTitle.fontName = F.mono;
    cbTitle.characters = "/* CSS 변수 직접 호출 예시 */";
    cbTitle.fontSize = 11;
    cbTitle.fills = bindPaint(V.textSecondary);
    const cbCode = figma.createText();
    cbCode.fontName = F.mono;
    cbCode.characters = "font-family: var(--mds-font-cinematic-display), 'Cormorant Garamond', 'Noto Serif KR', Georgia, serif;\nfont-weight: 700;\nletter-spacing: -0.025em;";
    cbCode.fontSize = 12;
    cbCode.lineHeight = { value: 150, unit: "PERCENT" };
    cbCode.fills = bindPaint(V.brandPrimary);
    codeBox.appendChild(cbTitle);
    codeBox.appendChild(cbCode);
    cbTitle.layoutAlign = "STRETCH";
    cbTitle.textAutoResize = "HEIGHT";
    cbCode.layoutAlign = "STRETCH";
    cbCode.textAutoResize = "HEIGHT";

    // Col 3: Right Table of Contents
    const toc = createHugCol(16, "MIN");
    toc.name = "Right Table of Contents (TOC)";
    toc.resize(300, 1144);
    toc.primaryAxisSizingMode = "FIXED";
    toc.counterAxisSizingMode = "FIXED";
    toc.paddingLeft = 24;
    toc.paddingRight = 24;
    toc.paddingTop = 40;
    toc.paddingBottom = 40;
    toc.fills = bindPaint(V.bgBase);
    toc.strokes = bindPaint(V.borderSubtle);
    toc.strokeWeight = 1;
    toc.strokeAlign = "INSIDE";
    vBody.appendChild(toc);
    toc.layoutAlign = "STRETCH";

    const tocHeader = figma.createText();
    tocHeader.fontName = F.mono;
    tocHeader.characters = "ON THIS PAGE";
    tocHeader.fontSize = 11;
    tocHeader.fills = bindPaint(V.textSecondary);
    toc.appendChild(tocHeader);
    tocHeader.layoutAlign = "STRETCH";
    tocHeader.textAutoResize = "HEIGHT";

    const tocItems = [
      { label: "디스플레이 서체 헌법", active: true },
      { label: "4대 디스플레이 스케일 표본", active: false },
      { label: "서체 패밀리 스택 정의", active: false },
      { label: "Tailwind & CSS 사용법", active: false },
      { label: "Figma SSOT 동기화 현황", active: false },
    ];

    tocItems.forEach((t) => {
      const tRow = createHugRow(8, "CENTER", "MIN");
      tRow.primaryAxisSizingMode = "FIXED";

      const dot = figma.createFrame();
      dot.name = "TOC Indicator Dot";
      dot.resize(4, 4);
      dot.cornerRadius = 2;
      dot.fills = bindPaint(t.active ? V.brandPrimary : V.borderStrong);
      tRow.appendChild(dot);

      const tTxt = figma.createText();
      tTxt.fontName = t.active ? F.uiBold : F.uiReg;
      tTxt.characters = t.label;
      tTxt.fontSize = 12;
      tTxt.fills = bindPaint(t.active ? V.brandPrimary : V.textSecondary);
      tRow.appendChild(tTxt);
      tTxt.layoutGrow = 1;
      tTxt.textAutoResize = "HEIGHT";

      toc.appendChild(tRow);
      tRow.layoutAlign = "STRETCH";
    });

    section.resizeWithoutConstraints(3000, 1400);
    figma.viewport.scrollAndZoomIntoView([section]);

    // 5. Self-Sanity Check (100x100 squishing, text clipping, variable binding)
    const allNodes = section.findAll(() => true);
    let unboundFills = 0;
    let unboundStrokes = 0;
    const squished = [];

    for (const n of allNodes) {
      if (n.type === "FRAME" && n.name !== "TOC Indicator Dot") {
        if (Math.round(n.width) === 100 && Math.round(n.height) === 100) {
          squished.push({ id: n.id, name: n.name, w: n.width, h: n.height });
        }
      }
      if ("fills" in n && Array.isArray(n.fills)) {
        for (const p of n.fills) {
          if (p.type === "SOLID" && (!p.boundVariables || !p.boundVariables.color)) {
            unboundFills++;
          }
        }
      }
      if ("strokes" in n && Array.isArray(n.strokes)) {
        for (const p of n.strokes) {
          if (p.type === "SOLID" && (!p.boundVariables || !p.boundVariables.color)) {
            unboundStrokes++;
          }
        }
      }
    }

    for (const card of gridRow.children) {
      if (card.width < 120) throw new Error(`[Sanity Failed] 카드 너비가 ${card.width}px로 찌그러졌습니다!`);
      if (card.height > 1200) throw new Error(`[Sanity Failed] 카드 높이가 ${card.height}px로 비정상 폭주했습니다!`);
    }

    succeeded = true;
    console.log("✅ [MDS] Successfully generated Docs Shell 2-Screen Templates!");
    resolve({
      status: "SUCCESS",
      pageId: page.id,
      pageName: page.name,
      sectionId: section.id,
      landingFrameId: landingFrame.id,
      viewerFrameId: viewerFrame.id,
      screens: [landingFrame.name, viewerFrame.name],
      sanity: {
        totalNodes: allNodes.length,
        squished100x100: squished,
        unboundFills,
        unboundStrokes,
      },
    });
  } catch (err) {
    console.error("❌ Error generating Docs Shell Templates:", err);
    resolve({ status: "ERROR", error: String(err) });
  } finally {
    if (!succeeded) {
      if (createdSection) {
        try {
          createdSection.remove();
        } catch (_) {}
      }
      if (createdPage) {
        try {
          createdPage.remove();
        } catch (_) {}
      }
    }
  }
});
