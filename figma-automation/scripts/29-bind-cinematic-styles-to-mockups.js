/**
 * Figma Automation Script: 29-bind-cinematic-styles-to-mockups.js
 * Mindulle Design System (MDS) - Batch Bind Korean Cinematic Typography to Mockups
 * 
 * Targets:
 * - [Option 2] Continuous Cinematic Long-Scroll [1920x5200]
 * - Master Exhibition Room 01 ~ Room 05
 * - Section titles, hero headlines, and manifesto quotes containing Korean text
 */

return new Promise(async (resolve) => {
  try {
    console.log("🎨 [MDS] Starting batch binding of Korean Cinematic Typography to mockups...");

    // 1. Safe font loader helper
    async function loadSafeFont(family, style) {
      try {
        await figma.loadFontAsync({ family, style });
        return { family, style };
      } catch (e) {
        console.warn(`Font load warning (${family} ${style}), falling back to Pretendard/Inter`);
        try {
          await figma.loadFontAsync({ family: "Pretendard", style: style === "Bold" ? "Bold" : "Regular" });
          return { family: "Pretendard", style: style === "Bold" ? "Bold" : "Regular" };
        } catch {
          await figma.loadFontAsync({ family: "Inter", style: style === "Bold" ? "Bold" : "Regular" });
          return { family: "Inter", style: style === "Bold" ? "Bold" : "Regular" };
        }
      }
    }

    // 2. Pre-load all necessary fonts
    const cormorantBold = await loadSafeFont("Cormorant Garamond", "Bold");
    const cormorantMedium = await loadSafeFont("Cormorant Garamond", "Medium");
    const notoSerifBold = await loadSafeFont("Noto Serif KR", "Bold");
    const notoSerifRegular = await loadSafeFont("Noto Serif KR", "Regular");
    const maruBuriBold = await loadSafeFont("MaruBuri", "Bold");
    const maruBuriRegular = await loadSafeFont("MaruBuri", "Regular");
    const pretendardBold = await loadSafeFont("Pretendard", "Bold");
    const pretendardRegular = await loadSafeFont("Pretendard", "Regular");

    // 3. Get registered text styles
    const localStyles = await figma.getLocalTextStylesAsync();
    const styleHero = localStyles.find(s => s.name === "Display / Cinematic Hero");
    const styleSection = localStyles.find(s => s.name === "Display / Cinematic Section");
    const styleHumanist = localStyles.find(s => s.name === "Display / Editorial Humanist");
    const styleQuote = localStyles.find(s => s.name === "Display / Editorial Quote");

    console.log("Found local styles:", {
      hero: styleHero?.id,
      section: styleSection?.id,
      humanist: styleHumanist?.id,
      quote: styleQuote?.id,
    });

    let updatedCount = 0;
    const updateLog = [];

    // Helper: test if text contains Korean characters
    const hasKorean = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);

    // 4. Recursive traverser
    function processNode(node) {
      if (node.type === "TEXT") {
        const chars = node.characters.trim();
        if (!hasKorean(chars)) return;

        // Pattern matching for titles and quotes
        // A. Hero Quotes & Big Headlines
        if (
          chars.includes("도구가 완벽할 때") ||
          chars.includes("겨울 끝, 민들레") ||
          chars.includes("민들레 디자인 시스템") ||
          node.fontSize >= 38
        ) {
          if (styleHero) {
            try { node.textStyleId = styleHero.id; } catch (e) {}
          }
          node.fontName = notoSerifBold;
          node.letterSpacing = { value: -2.5, unit: "PERCENT" };
          updatedCount++;
          updateLog.push({ type: "Hero", text: chars.slice(0, 25) + "..." });
        }
        // B. Wild Architecture / Monolith / Section Titles (Noto Serif KR)
        else if (
          chars.includes("얼어붙은 땅을 깨우는") ||
          chars.includes("벼락같은 몰입") ||
          chars.includes("디지털 방파제") ||
          chars.includes("민들레 3대 조형 헌법") ||
          (node.fontSize >= 26 && node.fontSize < 38 && !chars.includes("다정함"))
        ) {
          if (styleSection) {
            try { node.textStyleId = styleSection.id; } catch (e) {}
          }
          node.fontName = notoSerifBold;
          node.letterSpacing = { value: -2.0, unit: "PERCENT" };
          updatedCount++;
          updateLog.push({ type: "Section", text: chars.slice(0, 25) + "..." });
        }
        // C. Living Soul / Editorial Humanist (Maru Buri Bold)
        else if (
          chars.includes("콘크리트 틈에서 피어나는") ||
          chars.includes("다정함") ||
          chars.includes("안식처") ||
          chars.includes("풍경")
        ) {
          if (styleHumanist) {
            try { node.textStyleId = styleHumanist.id; } catch (e) {}
          }
          node.fontName = maruBuriBold;
          node.letterSpacing = { value: -1.0, unit: "PERCENT" };
          updatedCount++;
          updateLog.push({ type: "Humanist", text: chars.slice(0, 25) + "..." });
        }
        // D. Manifesto Philosophy & Colophon Quotes (Maru Buri Regular/Bold)
        else if (
          chars.includes("기계가 완벽해야") ||
          chars.includes("사람이 쉴 수 있다") ||
          chars.startsWith("“") ||
          chars.startsWith("\"")
        ) {
          if (styleQuote) {
            try { node.textStyleId = styleQuote.id; } catch (e) {}
          }
          node.fontName = maruBuriRegular;
          node.letterSpacing = { value: 0, unit: "PERCENT" };
          updatedCount++;
          updateLog.push({ type: "Quote", text: chars.slice(0, 25) + "..." });
        }
      }

      if ("children" in node) {
        for (const child of node.children) {
          processNode(child);
        }
      }
    }

    // Process all children on current page
    for (const child of figma.currentPage.children) {
      processNode(child);
    }

    console.log(`✅ [MDS] Finished batch binding: ${updatedCount} Korean typography nodes updated.`);
    resolve({
      success: true,
      updatedCount,
      updateLog,
    });
  } catch (error) {
    console.error("❌ Error in batch binding typography:", error);
    resolve({
      success: false,
      error: error.message,
    });
  }
});