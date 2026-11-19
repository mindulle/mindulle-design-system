# ADR 0017: Hero & Graphic Asset Style Spec (MDS-39 · 1px Monoline Editorial)

- **Status:** Accepted
- **Date:** 2026-11-17
- **Related Issues:** MDS-39, BRAND
- **Reference Board:** `https://draw.sonagi.space/?file=mindulle-design-system-architecture` (Page 6: `6. Hero & Graphic Style (MDS-39)`)

## 1. Context

`blog-sonagi-space`의 에디토리얼 지면과 `apps/docs`(및 Upwork 포트폴리오 카탈로그)의 디자인 시스템 히어로 그래픽을 일관된 시각 문법으로 통일하되, 매체 성격에 맞는 표현 분기를 확정할 필요가 있었다.

## 2. Decision

공통 그래픽 문법을 **1px Monoline Editorial**로 확정하고, 용도에 따라 두 가지 시안으로 분기한다.

### 공통 문법 (1px Monoline Editorial)
- **팔레트:** `#FBF9F5` (Newsprint Cream 바탕) · `#161616` (1px 균일 선화) · `#D97706` (Dandelion Gold 스팟 악센트 **15% 이하**)
- **선 규격:** `1px` 균일 모노라인(`stroke-width="1"`, `fill="none"`, `stroke-linecap="round"`)
- **금지 요소:** 면 채우기(fill), 드롭 섀도우/그라데이션, 설계도 점선(`stroke-dasharray`) 및 엔지니어링 치수/라벨 표기

### 매체별 확정 시안
1. **블로그 (`blog-sonagi-space`) → G-clean**
   - **구성:** 모던 매거진 지면(마스트헤드·칼럼·드롭캡) + 순수 `1px` 보태니컬 모노라인 민들레 스팟
   - **레퍼런스 SVG:** `https://cdn.sonagi.space/assets/tldraw_assets/mds39-g-clean-blog.svg`
2. **디자인 시스템 (`apps/docs` · MDS-39 Upwork 히어로) → F안**
   - **구성:** 모노라인 UI 와이어프레임(Docs 셸·히어로 CTA·4-카드 그리드) + 민들레 선화
   - **레퍼런스 SVG:** `https://cdn.sonagi.space/assets/tldraw_assets/mds39-f-plan-hero.svg`

## 3. Consequences

- `.tldr` 및 문서 내 그래픽 에셋은 base64 인라인 대신 CDN(`cdn.sonagi.space`) 공개 URL 참조를 원칙으로 한다.
- 향후 `MDS-39` 히어로 구현 및 Upwork 포트폴리오 썸네일 제작 시 F안 규격을 기준으로 작업한다.
