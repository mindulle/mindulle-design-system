# 05_physical — 민들레 아틀리에 실물 인쇄 및 브랜드 굿즈 규격

> **"화면의 RGB는 빛이고, 인쇄의 CMYK는 물질(잉크와 종이)이다."**  
> 본 디렉토리는 성원애드피아, 레드프린팅, 을지로/충무로 공장 발주를 위한 실물 인쇄 전담 사전 출력(Pre-press) 공학 규격 및 벡터 원본을 보관합니다.

---

## 🖨️ 인쇄 공학 5대 헌법 (Pre-press Rules)

1. **블랙 분리 (K100 vs Rich Black)**:
   - 작은 본문 텍스트 (6~14pt): 4도 핀 어긋남 방지를 위해 반드시 **`K 100% 단색`** 및 오버프린트.
   - 넓은 면적의 배경: 희뿌연 회색을 방지하기 위해 **Rich Black (`C 20% M 20% Y 20% K 100%` = `#1c1412`)** 적용.
2. **사방 3mm 도련 (Bleed)**:
   - 재단 오차 대비 모든 작업물은 규격 외곽 사방 `3mm` 확장(예: 명함 90x50mm ➔ 96x56mm).
   - 본문 글자와 심볼은 재단선 안쪽 최소 `4mm` 안전 마진(Safe Margin) 확보.
3. **아웃라인 필수 (Create Outlines)**:
   - 인쇄소 RIP 서체 유실을 방지하기 위해 모든 텍스트는 곡선화 처리.
4. **해상도 300 DPI & CMYK 변환**:
   - `Japan Color 2001 Coated` 프로파일 기준.
5. **권장 용지 평량**:
   - 명함: 엑스트라 매트 350g/m² 또는 띤또레또 300g/m² (따뜻한 미색).
   - 스티커: 무광 코팅 유포지 또는 모조지 80g/m².

---

## 📁 에셋 목록

- `business_card/mindulle-business-card-front.svg`: 90x50mm (도련 96x56mm), 웜 페이퍼 라이트 모드
- `business_card/mindulle-business-card-back.svg`: 90x50mm (도련 96x56mm), 리치 블랙 & 골드 엠블럼
- `stickers/mindulle-circle-sticker-60mm.svg`: 지름 60mm 원형 브랜드 스티커
