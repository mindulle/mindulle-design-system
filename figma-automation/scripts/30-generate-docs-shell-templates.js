/**
 * Figma Automation Script: 30-generate-docs-shell-templates.js
 * Mindulle Design System (MDS v0.1.0) - Docs Shell Templates Generator
 * 
 * ADR 0014 SSOT Implementation:
 * - 대표 템플릿(Docs Shell) 2장 한정 시안화 원칙:
 *   1. Screen 01: Docs Landing Home (1440 × 1320)
 *   2. Screen 02: Docs Viewer Shell Layout (1440 × 1200, 3-Column FumaDocs Architecture)
 * - The True 2px Stem (2px Border / Line Standard)
 * - 4px Weathered Radius (Modular Curvature)
 * - No Soft Shadows (Crisp Surface Hierarchy)
 * - Obsidian Dark (#060911) & Surface (#0f1422) + Amber Gold (#ffd166)
 * - Korean Cinematic Display Typography (Cormorant Garamond + Noto Serif KR / Maru Buri)
 */

return new Promise(async (resolve) => {
  try {
    console.log("🚀 [MDS] Starting Docs Shell Templates generation (ADR 0014 SSOT)...");

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

    const C = {
      bgBase: { r: 6 / 255, g: 9 / 255, b: 17 / 255 },       // #060911
      bgSurface: { r: 15 / 255, g: 20 / 255, b: 34 / 255 },   // #0f1422
      bgElevated: { r: 22 / 255, g: 27 / 255, b: 43 / 255 },  // #161b2b
      borderSubtle: { r: 30 / 255, g: 36 / 255, b: 48 / 255 },// #1e2430
      borderStrong: { r: 48 / 255, g: 54 / 255, b: 61 / 255 },// #30363d
      textPrimary: { r: 255 / 255, g: 255 / 255, b: 255 / 255 }, // #ffffff
      textMuted: { r: 148 / 255, g: 163 / 255, b: 184 / 255 },   // #94a3b8
      goldAccent: { r: 255 / 255, g: 209 / 255, b: 102 / 255 },  // #ffd166
      goldSub: { r: 245 / 255, g: 158 / 255, b: 11 / 255 },      // #f59e0b
      goldSoftBg: { r: 245 / 255, g: 158 / 255, b: 11 / 255 },   // alpha applied separately
      greenAccent: { r: 16 / 255, g: 185 / 255, b: 129 / 255 },  // #10b981
    };

    const paint = (color, opacity = 1) => [{ type: "SOLID", color, opacity }];

    await figma.loadAllPagesAsync();
    let page = figma.root.children.find((p) => p.name === "📖 Docs Shell Templates");
    if (!page) {
      page = figma.createPage();
      page.name = "📖 Docs Shell Templates";
    }
    await figma.setCurrentPageAsync(page);

    let section = page.findOne((n) => n.type === "SECTION" && n.name === "MDS Docs Shell Templates (ADR 0014 SSOT)");
    if (section) {
      section.remove();
    }
    section = figma.createSection();
    section.name = "MDS Docs Shell Templates (ADR 0014 SSOT)";
    section.x = 0;
    section.y = 0;

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
        return node;
      } catch (err) {
        const frame = figma.createFrame();
        frame.name = "MindulleLogo (Fallback)";
        frame.resize(size, size);
        frame.fills = paint(C.goldAccent);
        frame.cornerRadius = 4;
        return frame;
      }
    }

    function createPillBadge(text, variant = "gold") {
      const badge = figma.createFrame();
      badge.layoutMode = "HORIZONTAL";
      badge.primaryAxisSizingMode = "AUTO";
      badge.counterAxisSizingMode = "AUTO";
      badge.paddingTop = 4; badge.paddingBottom = 4;
      badge.paddingLeft = 10; badge.paddingRight = 10;
      badge.cornerRadius = 999;

      const txt = figma.createText();
      if (variant === "gold") {
        badge.fills = paint(C.goldSoftBg, 0.12);
        badge.strokes = paint(C.goldSub, 0.3);
        badge.strokeWeight = 1;
        txt.fontName = F.uiSemi;
        txt.characters = text;
        txt.fontSize = 11;
        txt.fills = paint(C.goldAccent);
      } else if (variant === "green") {
        badge.fills = paint(C.greenAccent, 0.12);
        badge.strokes = paint(C.greenAccent, 0.3);
        badge.strokeWeight = 1;
        txt.fontName = F.mono;
        txt.characters = text;
        txt.fontSize = 11;
        txt.fills = paint(C.greenAccent);
      } else {
        badge.fills = paint(C.bgElevated);
        badge.strokes = paint(C.borderSubtle);
        badge.strokeWeight = 1;
        txt.fontName = F.mono;
        txt.characters = text;
        txt.fontSize = 11;
        txt.fills = paint(C.textMuted);
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
    landingFrame.fills = paint(C.bgBase);
    landingFrame.layoutMode = "VERTICAL";
    landingFrame.itemSpacing = 24;
    section.appendChild(landingFrame);

    // GNB Header (1440 x 64)
    const gnb = figma.createFrame();
    gnb.name = "GNB / Global Header";
    gnb.resize(1440, 64);
    gnb.layoutMode = "HORIZONTAL";
    gnb.primaryAxisAlignItems = "SPACE_BETWEEN";
    gnb.counterAxisAlignItems = "CENTER";
    gnb.paddingLeft = 48; gnb.paddingRight = 48;
    gnb.paddingTop = 14; gnb.paddingBottom = 14;
    gnb.fills = paint(C.bgBase, 0.95);
    gnb.strokes = paint(C.borderSubtle);
    gnb.strokeWeight = 2; // True 2px Stem boundary
    gnb.strokeAlign = "INSIDE";
    landingFrame.appendChild(gnb);
    gnb.layoutAlign = "STRETCH";

    const gnbBrand = figma.createFrame();
    gnbBrand.layoutMode = "HORIZONTAL";
    gnbBrand.counterAxisAlignItems = "CENTER";
    gnbBrand.itemSpacing = 10;
    gnbBrand.fills = [];
    gnbBrand.appendChild(createMindulleLogoNode(22));

    const brandTitle = figma.createText();
    brandTitle.fontName = F.uiBold;
    brandTitle.characters = "민들레 디자인 시스템";
    brandTitle.fontSize = 14;
    brandTitle.fills = paint(C.textPrimary);
    gnbBrand.appendChild(brandTitle);
    gnbBrand.appendChild(createPillBadge("v0.1.0", "gold"));
    gnb.appendChild(gnbBrand);

    const gnbRight = figma.createFrame();
    gnbRight.layoutMode = "HORIZONTAL";
    gnbRight.counterAxisAlignItems = "CENTER";
    gnbRight.itemSpacing = 24;
    gnbRight.fills = [];

    const searchTrigger = figma.createFrame();
    searchTrigger.layoutMode = "HORIZONTAL";
    searchTrigger.counterAxisAlignItems = "CENTER";
    searchTrigger.paddingLeft = 14; searchTrigger.paddingRight = 14;
    searchTrigger.paddingTop = 8; searchTrigger.paddingBottom = 8;
    searchTrigger.cornerRadius = 4;
    searchTrigger.fills = paint(C.bgSurface);
    searchTrigger.strokes = paint(C.borderSubtle);
    searchTrigger.strokeWeight = 1;
    searchTrigger.itemSpacing = 18;
    const sTxt = figma.createText();
    sTxt.fontName = F.uiReg;
    sTxt.characters = "문서 및 컴포넌트 검색...";
    sTxt.fontSize = 12;
    sTxt.fills = paint(C.textMuted);
    searchTrigger.appendChild(sTxt);
    const kbd = figma.createText();
    kbd.fontName = F.mono;
    kbd.characters = "⌘K";
    kbd.fontSize = 11;
    kbd.fills = paint(C.goldAccent);
    searchTrigger.appendChild(kbd);
    gnbRight.appendChild(searchTrigger);

    ["문서", "파운데이션", "컴포넌트", "3D 쇼룸"].forEach((label) => {
      const link = figma.createText();
      link.fontName = F.uiSemi;
      link.characters = label;
      link.fontSize = 13;
      link.fills = paint(label === "문서" ? C.textPrimary : C.textMuted);
      gnbRight.appendChild(link);
    });
    gnb.appendChild(gnbRight);

    // Hero Section
    const heroSection = figma.createFrame();
    heroSection.name = "Hero Section";
    heroSection.layoutMode = "VERTICAL";
    heroSection.primaryAxisAlignItems = "CENTER";
    heroSection.counterAxisAlignItems = "CENTER";
    heroSection.paddingTop = 56; heroSection.paddingBottom = 32;
    heroSection.paddingLeft = 48; heroSection.paddingRight = 48;
    heroSection.itemSpacing = 20;
    heroSection.fills = [];
    landingFrame.appendChild(heroSection);
    heroSection.layoutAlign = "STRETCH";

    const heroPill = figma.createFrame();
    heroPill.layoutMode = "HORIZONTAL";
    heroPill.counterAxisAlignItems = "CENTER";
    heroPill.paddingLeft = 14; heroPill.paddingRight = 14;
    heroPill.paddingTop = 6; heroPill.paddingBottom = 6;
    heroPill.cornerRadius = 999;
    heroPill.fills = paint(C.goldSoftBg, 0.1);
    heroPill.strokes = paint(C.goldSub, 0.3);
    heroPill.strokeWeight = 1;
    heroPill.itemSpacing = 8;
    const hpTxt = figma.createText();
    hpTxt.fontName = F.uiBold;
    hpTxt.characters = "겨울 끝, 민들레.  |  MDS v0.1.0";
    hpTxt.fontSize = 12;
    hpTxt.fills = paint(C.goldAccent);
    heroPill.appendChild(hpTxt);
    heroSection.appendChild(heroPill);

    const heroTitle = figma.createText();
    heroTitle.fontName = F.display;
    heroTitle.characters = "실무를 위한 단단하고 정갈한\n민들레 디자인 시스템";
    heroTitle.fontSize = 52;
    heroTitle.lineHeight = { value: 118, unit: "PERCENT" };
    heroTitle.letterSpacing = { value: -2.5, unit: "PERCENT" };
    heroTitle.textAlignHorizontal = "CENTER";
    heroTitle.fills = paint(C.textPrimary);
    heroSection.appendChild(heroTitle);

    const heroSub = figma.createText();
    heroSub.fontName = F.uiReg;
    heroSub.characters = "16종 인터랙티브 컴포넌트와 W3C 시맨틱 토큰 매트릭스.\n비바람에도 꺾이지 않는 The True 2px Stem과 4px 모듈러 곡률 조형 헌법.";
    heroSub.fontSize = 17;
    heroSub.lineHeight = { value: 150, unit: "PERCENT" };
    heroSub.textAlignHorizontal = "CENTER";
    heroSub.fills = paint(C.textMuted);
    heroSection.appendChild(heroSub);

    const ctaRow = figma.createFrame();
    ctaRow.layoutMode = "HORIZONTAL";
    ctaRow.counterAxisAlignItems = "CENTER";
    ctaRow.itemSpacing = 14;
    ctaRow.fills = [];

    const btnPri = figma.createFrame();
    btnPri.layoutMode = "HORIZONTAL";
    btnPri.counterAxisAlignItems = "CENTER";
    btnPri.paddingLeft = 24; btnPri.paddingRight = 24;
    btnPri.paddingTop = 13; btnPri.paddingBottom = 13;
    btnPri.cornerRadius = 4;
    btnPri.fills = paint(C.goldAccent);
    const btnPriTxt = figma.createText();
    btnPriTxt.fontName = F.uiBold;
    btnPriTxt.characters = "공식 문서 둘러보기  →";
    btnPriTxt.fontSize = 14;
    btnPriTxt.fills = paint(C.bgBase);
    btnPri.appendChild(btnPriTxt);
    ctaRow.appendChild(btnPri);

    const btnSec = figma.createFrame();
    btnSec.layoutMode = "HORIZONTAL";
    btnSec.counterAxisAlignItems = "CENTER";
    btnSec.paddingLeft = 22; btnSec.paddingRight = 22;
    btnSec.paddingTop = 12; btnSec.paddingBottom = 12;
    btnSec.cornerRadius = 4;
    btnSec.fills = paint(C.bgSurface);
    btnSec.strokes = paint(C.borderStrong);
    btnSec.strokeWeight = 2; // True 2px Stem
    const btnSecTxt = figma.createText();
    btnSecTxt.fontName = F.uiSemi;
    btnSecTxt.characters = "GitHub 레포지토리";
    btnSecTxt.fontSize = 14;
    btnSecTxt.fills = paint(C.textPrimary);
    btnSec.appendChild(btnSecTxt);
    ctaRow.appendChild(btnSec);

    const codePill = figma.createFrame();
    codePill.layoutMode = "HORIZONTAL";
    codePill.counterAxisAlignItems = "CENTER";
    codePill.paddingLeft = 16; codePill.paddingRight = 16;
    codePill.paddingTop = 12; codePill.paddingBottom = 12;
    codePill.cornerRadius = 4;
    codePill.fills = paint(C.bgElevated);
    codePill.strokes = paint(C.borderSubtle);
    codePill.strokeWeight = 1;
    const cpTxt = figma.createText();
    cpTxt.fontName = F.mono;
    cpTxt.characters = "pnpm add @mindulle/tokens @mindulle/ui";
    cpTxt.fontSize = 12;
    cpTxt.fills = paint(C.goldAccent);
    codePill.appendChild(cpTxt);
    ctaRow.appendChild(codePill);

    heroSection.appendChild(ctaRow);

    // Constitution Section
    const constSection = figma.createFrame();
    constSection.name = "Design Constitution Grid";
    constSection.layoutMode = "VERTICAL";
    constSection.paddingLeft = 80; constSection.paddingRight = 80;
    constSection.paddingTop = 20; constSection.paddingBottom = 40;
    constSection.itemSpacing = 24;
    constSection.fills = [];
    landingFrame.appendChild(constSection);
    constSection.layoutAlign = "STRETCH";

    const constHeader = figma.createFrame();
    constHeader.layoutMode = "VERTICAL";
    constHeader.itemSpacing = 4;
    constHeader.fills = [];
    constSection.appendChild(constHeader);
    constHeader.layoutAlign = "STRETCH";

    const constEyebrow = figma.createText();
    constEyebrow.fontName = F.mono;
    constEyebrow.characters = "DESIGN CONSTITUTION • 조형 헌법";
    constEyebrow.fontSize = 11;
    constEyebrow.fills = paint(C.goldAccent);
    const constTitle = figma.createText();
    constTitle.fontName = F.display;
    constTitle.characters = "민들레 3대 조형 헌법 (The Trinity Principles)";
    constTitle.fontSize = 24;
    constTitle.fills = paint(C.textPrimary);
    constHeader.appendChild(constEyebrow);
    constHeader.appendChild(constTitle);

    const gridRow = figma.createFrame();
    gridRow.layoutMode = "HORIZONTAL";
    gridRow.itemSpacing = 24;
    gridRow.fills = [];
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

    cardsData.forEach((c) => {
      const card = figma.createFrame();
      card.layoutMode = "VERTICAL";
      card.paddingLeft = 24; card.paddingRight = 24;
      card.paddingTop = 24; card.paddingBottom = 24;
      card.cornerRadius = 4;
      card.fills = paint(C.bgSurface);
      card.strokes = paint(C.borderStrong);
      card.strokeWeight = 2; // True 2px Stem
      card.itemSpacing = 14;

      card.appendChild(createPillBadge(c.tag, "neutral"));

      const cHead = figma.createText();
      cHead.fontName = F.serif;
      cHead.characters = c.title;
      cHead.fontSize = 20;
      cHead.fills = paint(C.textPrimary);
      card.appendChild(cHead);

      const cKo = figma.createText();
      cKo.fontName = F.uiBold;
      cKo.characters = c.ko;
      cKo.fontSize = 14;
      cKo.fills = paint(C.goldAccent);
      card.appendChild(cKo);

      const cDesc = figma.createText();
      cDesc.fontName = F.uiReg;
      cDesc.characters = c.desc;
      cDesc.fontSize = 13;
      cDesc.lineHeight = { value: 150, unit: "PERCENT" };
      cDesc.fills = paint(C.textMuted);
      card.appendChild(cDesc);

      gridRow.appendChild(card);
      card.layoutGrow = 1;
      card.layoutAlign = "STRETCH";
      card.resize(card.width, 240);
    });

    // =========================================================================
    // 2. SCREEN 02: Docs Documentation Viewer Shell Layout (1440 × 1200)
    // =========================================================================
    const viewerFrame = figma.createFrame();
    viewerFrame.name = "MDS Docs Shell • 02 Documentation Viewer";
    viewerFrame.resize(1440, 1200);
    viewerFrame.x = 1520;
    viewerFrame.y = 40;
    viewerFrame.fills = paint(C.bgBase);
    viewerFrame.layoutMode = "VERTICAL";
    viewerFrame.itemSpacing = 0;
    section.appendChild(viewerFrame);

    // Viewer GNB (1440 x 56)
    const vGnb = figma.createFrame();
    vGnb.name = "Viewer Header & Breadcrumbs";
    vGnb.resize(1440, 56);
    vGnb.layoutMode = "HORIZONTAL";
    vGnb.primaryAxisAlignItems = "SPACE_BETWEEN";
    vGnb.counterAxisAlignItems = "CENTER";
    vGnb.paddingLeft = 32; vGnb.paddingRight = 32;
    vGnb.paddingTop = 12; vGnb.paddingBottom = 12;
    vGnb.fills = paint(C.bgBase, 0.98);
    vGnb.strokes = paint(C.borderSubtle);
    vGnb.strokeWeight = 2; // True 2px Stem boundary
    viewerFrame.appendChild(vGnb);
    vGnb.layoutAlign = "STRETCH";

    const vLeft = figma.createFrame();
    vLeft.layoutMode = "HORIZONTAL";
    vLeft.counterAxisAlignItems = "CENTER";
    vLeft.itemSpacing = 12;
    vLeft.fills = [];
    vLeft.appendChild(createMindulleLogoNode(20));

    const vBread = figma.createText();
    vBread.fontName = F.uiSemi;
    vBread.characters = "문서  /  파운데이션  /  타이포그래피";
    vBread.fontSize = 13;
    vBread.fills = paint(C.textPrimary);
    vLeft.appendChild(vBread);
    vGnb.appendChild(vLeft);

    const vRight = figma.createFrame();
    vRight.layoutMode = "HORIZONTAL";
    vRight.counterAxisAlignItems = "CENTER";
    vRight.itemSpacing = 16;
    vRight.fills = [];
    vRight.appendChild(createPillBadge("SSOT Live Sync", "green"));
    const vGh = figma.createText();
    vGh.fontName = F.uiSemi;
    vGh.characters = "GitHub";
    vGh.fontSize = 12;
    vGh.fills = paint(C.textMuted);
    vRight.appendChild(vGh);
    vGnb.appendChild(vRight);

    // 3-Column Documentation Body (1440 x 1144)
    const vBody = figma.createFrame();
    vBody.name = "3-Column Docs Shell (Sidebar + Article + TOC)";
    vBody.resize(1440, 1144);
    vBody.layoutMode = "HORIZONTAL";
    vBody.itemSpacing = 0;
    vBody.fills = [];
    viewerFrame.appendChild(vBody);
    vBody.layoutAlign = "STRETCH";
    vBody.layoutGrow = 1;

    // Col 1: Left Navigation Sidebar (260px)
    const sidebar = figma.createFrame();
    sidebar.name = "Left Navigation Sidebar";
    sidebar.resize(260, 1144);
    sidebar.layoutMode = "VERTICAL";
    sidebar.paddingLeft = 24; sidebar.paddingRight = 20;
    sidebar.paddingTop = 32; sidebar.paddingBottom = 32;
    sidebar.itemSpacing = 24;
    sidebar.fills = paint(C.bgBase);
    sidebar.strokes = paint(C.borderSubtle);
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
      const sGroup = figma.createFrame();
      sGroup.layoutMode = "VERTICAL";
      sGroup.itemSpacing = 6;
      sGroup.fills = [];
      sidebar.appendChild(sGroup);
      sGroup.layoutAlign = "STRETCH";

      const sHead = figma.createText();
      sHead.fontName = F.mono;
      sHead.characters = s.header;
      sHead.fontSize = 11;
      sHead.fills = paint(C.goldAccent);
      sGroup.appendChild(sHead);

      s.items.forEach((item) => {
        const itemRow = figma.createFrame();
        itemRow.layoutMode = "HORIZONTAL";
        itemRow.paddingTop = 6; itemRow.paddingBottom = 6;
        itemRow.paddingLeft = 10; itemRow.paddingRight = 10;
        itemRow.cornerRadius = 4;
        itemRow.itemSpacing = 8;

        const isActive = s.activeItem === item;
        if (isActive) {
          itemRow.fills = paint(C.bgElevated);
          itemRow.strokes = paint(C.goldAccent);
          itemRow.strokeWeight = 2;
        } else {
          itemRow.fills = [];
        }

        const itemTxt = figma.createText();
        itemTxt.fontName = isActive ? F.uiBold : F.uiReg;
        itemTxt.characters = item;
        itemTxt.fontSize = 13;
        itemTxt.fills = paint(isActive ? C.goldAccent : C.textMuted);
        itemRow.appendChild(itemTxt);

        sGroup.appendChild(itemRow);
        itemRow.layoutAlign = "STRETCH";
      });
    });

    // Col 2: Center Article Pane (880px)
    const articlePane = figma.createFrame();
    articlePane.name = "Article Main Content Pane";
    articlePane.resize(880, 1144);
    articlePane.layoutMode = "VERTICAL";
    articlePane.paddingLeft = 48; articlePane.paddingRight = 48;
    articlePane.paddingTop = 40; articlePane.paddingBottom = 40;
    articlePane.itemSpacing = 28;
    articlePane.fills = paint(C.bgBase);
    vBody.appendChild(articlePane);
    articlePane.layoutAlign = "STRETCH";
    articlePane.layoutGrow = 1;

    const artHead = figma.createFrame();
    artHead.layoutMode = "VERTICAL";
    artHead.itemSpacing = 8;
    artHead.fills = [];
    articlePane.appendChild(artHead);
    artHead.layoutAlign = "STRETCH";

    const artEyebrow = figma.createText();
    artEyebrow.fontName = F.mono;
    artEyebrow.characters = "FOUNDATIONS  /  TYPOGRAPHY & DISPLAY";
    artEyebrow.fontSize = 12;
    artEyebrow.fills = paint(C.goldAccent);
    artHead.appendChild(artEyebrow);

    const artTitle = figma.createText();
    artTitle.fontName = F.display;
    artTitle.characters = "타이포그래피 (Typography & Display)";
    artTitle.fontSize = 38;
    artTitle.fills = paint(C.textPrimary);
    artHead.appendChild(artTitle);

    const artLead = figma.createText();
    artLead.fontName = F.uiReg;
    artLead.characters = "민들레 디자인 시스템은 정갈한 분석(Analytics)과 시적 에디토리얼(Editorial)의 만남을 지향합니다. 본문에는 고해상도 Pretendard/Inter를, 전시 및 헤드라인에는 한국어 시네마틱 디스플레이 서체 헌법을 강제합니다.";
    artLead.fontSize = 15;
    artLead.lineHeight = { value: 160, unit: "PERCENT" };
    artLead.fills = paint(C.textMuted);
    artHead.appendChild(artLead);

    // Shield Callout Banner
    const verifBanner = figma.createFrame();
    verifBanner.layoutMode = "HORIZONTAL";
    verifBanner.primaryAxisAlignItems = "SPACE_BETWEEN";
    verifBanner.counterAxisAlignItems = "CENTER";
    verifBanner.paddingLeft = 20; verifBanner.paddingRight = 20;
    verifBanner.paddingTop = 14; verifBanner.paddingBottom = 14;
    verifBanner.cornerRadius = 4;
    verifBanner.fills = paint(C.bgSurface);
    verifBanner.strokes = paint(C.goldSub, 0.6);
    verifBanner.strokeWeight = 2; // True 2px Stem
    articlePane.appendChild(verifBanner);
    verifBanner.layoutAlign = "STRETCH";

    const vbLeft = figma.createFrame();
    vbLeft.layoutMode = "VERTICAL"; vbLeft.itemSpacing = 2; vbLeft.fills = [];
    const vbTitle = figma.createText();
    vbTitle.fontName = F.uiBold;
    vbTitle.characters = "🛡️ Visual Consistency Graph 검증 통과 (SCORE 97/100 PASS)";
    vbTitle.fontSize = 13;
    vbTitle.fills = paint(C.textPrimary);
    const vbDesc = figma.createText();
    vbDesc.fontName = F.uiReg;
    vbDesc.characters = "Cormorant Garamond 700 ↔ Noto Serif KR 700 광학 일치도 96% & 2px True Stem 헌법 준수";
    vbDesc.fontSize = 12;
    vbDesc.fills = paint(C.textMuted);
    vbLeft.appendChild(vbTitle); vbLeft.appendChild(vbDesc);
    verifBanner.appendChild(vbLeft);
    verifBanner.appendChild(createPillBadge("Figma Local Styles 4종 SSOT", "gold"));

    // Specimen Card 1
    const specCard1 = figma.createFrame();
    specCard1.layoutMode = "VERTICAL";
    specCard1.paddingLeft = 28; specCard1.paddingRight = 28;
    specCard1.paddingTop = 24; specCard1.paddingBottom = 24;
    specCard1.cornerRadius = 4;
    specCard1.fills = paint(C.bgSurface);
    specCard1.strokes = paint(C.borderStrong);
    specCard1.strokeWeight = 2; // True 2px Stem
    specCard1.itemSpacing = 12;
    articlePane.appendChild(specCard1);
    specCard1.layoutAlign = "STRETCH";

    const sc1Meta = figma.createFrame();
    sc1Meta.layoutMode = "HORIZONTAL"; sc1Meta.itemSpacing = 12; sc1Meta.fills = [];
    const sc1Title = figma.createText();
    sc1Title.fontName = F.mono;
    sc1Title.characters = "Display / Cinematic Hero";
    sc1Title.fontSize = 12;
    sc1Title.fills = paint(C.goldAccent);
    sc1Meta.appendChild(sc1Title);
    sc1Meta.appendChild(createPillBadge("64px • 2.8px Stem (≥2px 합격)", "neutral"));
    specCard1.appendChild(sc1Meta);

    const sc1Text = figma.createText();
    sc1Text.fontName = F.display;
    sc1Text.characters = "겨울 끝, 민들레의 비상";
    sc1Text.fontSize = 42;
    sc1Text.fills = paint(C.textPrimary);
    specCard1.appendChild(sc1Text);

    const sc1En = figma.createText();
    sc1En.fontName = F.serif;
    sc1En.characters = "SOVEREIGN CINEMATIC ARCHITECTURE • TRUE 2PX STEM";
    sc1En.fontSize = 13;
    sc1En.letterSpacing = { value: 15, unit: "PERCENT" };
    sc1En.fills = paint(C.textMuted);
    specCard1.appendChild(sc1En);

    // Code Box
    const codeBox = figma.createFrame();
    codeBox.layoutMode = "VERTICAL";
    codeBox.paddingLeft = 20; codeBox.paddingRight = 20;
    codeBox.paddingTop = 16; codeBox.paddingBottom = 16;
    codeBox.cornerRadius = 4;
    codeBox.fills = paint(C.bgElevated);
    codeBox.strokes = paint(C.borderSubtle);
    codeBox.strokeWeight = 1;
    codeBox.itemSpacing = 6;
    articlePane.appendChild(codeBox);
    codeBox.layoutAlign = "STRETCH";

    const cbTitle = figma.createText();
    cbTitle.fontName = F.mono;
    cbTitle.characters = "/* CSS 변수 직접 호출 예시 */";
    cbTitle.fontSize = 11;
    cbTitle.fills = paint(C.textMuted);
    const cbCode = figma.createText();
    cbCode.fontName = F.mono;
    cbCode.characters = "font-family: var(--mds-font-cinematic-display), 'Cormorant Garamond', 'Noto Serif KR', Georgia, serif;\\nfont-weight: 700;\\nletter-spacing: -0.025em;";
    cbCode.fontSize = 12;
    cbCode.lineHeight = { value: 150, unit: "PERCENT" };
    cbCode.fills = paint(C.goldAccent);
    codeBox.appendChild(cbTitle);
    codeBox.appendChild(cbCode);

    // Col 3: Right Table of Contents
    const toc = figma.createFrame();
    toc.name = "Right Table of Contents (TOC)";
    toc.resize(300, 1144);
    toc.layoutMode = "VERTICAL";
    toc.paddingLeft = 24; toc.paddingRight = 24;
    toc.paddingTop = 40; toc.paddingBottom = 40;
    toc.itemSpacing = 16;
    toc.fills = paint(C.bgBase);
    toc.strokes = paint(C.borderSubtle);
    toc.strokeWeight = 1;
    toc.strokeAlign = "INSIDE";
    vBody.appendChild(toc);
    toc.layoutAlign = "STRETCH";

    const tocHeader = figma.createText();
    tocHeader.fontName = F.mono;
    tocHeader.characters = "ON THIS PAGE";
    tocHeader.fontSize = 11;
    tocHeader.fills = paint(C.textMuted);
    toc.appendChild(tocHeader);

    const tocItems = [
      { label: "디스플레이 서체 헌법", active: true },
      { label: "4대 디스플레이 스케일 표본", active: false },
      { label: "서체 패밀리 스택 정의", active: false },
      { label: "Tailwind & CSS 사용법", active: false },
      { label: "Figma SSOT 동기화 현황", active: false },
    ];

    tocItems.forEach((t) => {
      const tRow = figma.createFrame();
      tRow.layoutMode = "HORIZONTAL";
      tRow.counterAxisAlignItems = "CENTER";
      tRow.itemSpacing = 8;
      tRow.fills = [];

      const dot = figma.createFrame();
      dot.resize(4, 4);
      dot.cornerRadius = 2;
      dot.fills = paint(t.active ? C.goldAccent : C.borderStrong);
      tRow.appendChild(dot);

      const tTxt = figma.createText();
      tTxt.fontName = t.active ? F.uiBold : F.uiReg;
      tTxt.characters = t.label;
      tTxt.fontSize = 12;
      tTxt.fills = paint(t.active ? C.goldAccent : C.textMuted);
      tRow.appendChild(tTxt);

      toc.appendChild(tRow);
      tRow.layoutAlign = "STRETCH";
    });

    section.resizeWithoutConstraints(3000, 1360);
    figma.viewport.scrollAndZoomIntoView([section]);

    console.log("✅ [MDS] Successfully generated Docs Shell 2-Screen Templates!");
    resolve({
      status: "SUCCESS",
      sectionId: section.id,
      landingFrameId: landingFrame.id,
      viewerFrameId: viewerFrame.id,
      pageName: page.name,
      screens: [landingFrame.name, viewerFrame.name],
    });
  } catch (err) {
    console.error("❌ Error generating Docs Shell Templates:", err);
    resolve({ status: "ERROR", error: String(err) });
  }
});
