# 문서 페이지 아키타입 (Docs Page Archetypes)

`apps/docs`(FumaDocs) 문서 사이트의 **페이지 조립 계약**입니다.

- 대상: `apps/docs/content/docs/**/*.mdx`
- 목적: 페이지마다 레이아웃을 새로 판단하지 않도록 4개 아키타입으로 고정
- 원칙: **Figma는 셸까지만, 조립 블록은 코드, 재료는 토큰**

시각 재료(색·타이포·선)는 `@mindulle/tokens`(`--mds-*`)만 사용합니다. MDX 본문에 raw hex를 넣지 않습니다.

---

## 1. 아키타입 4종

### A. Landing / Quickstart

| 항목      | 내용                                                                 |
| --------- | -------------------------------------------------------------------- |
| 대상      | `index.mdx` — 사이트 진입점                                          |
| 필수 순서 | Hero(제목 + 한 줄 정의) → 시작 단계(번호 목록) → 다음에 볼 링크 카드 |
| 허용 블록 | 코드 블록, 카드 그리드, 콜아웃                                       |
| 금지      | 컴포넌트 프리뷰, Props 표, 3단 이상 중첩 섹션                        |

### B. Component Spec

| 항목      | 내용                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------ |
| 대상      | `components/*.mdx`                                                                               |
| 필수 순서 | ① Preview(`<ComponentPreview>`) → ② Props 명세 → ③ 상태·사이즈 → ④ 토큰 → ⑤ 사용 규칙 → ⑥ 접근성 |
| 허용 블록 | `ComponentPreview`, 마크다운 표, 코드 블록, 콜아웃                                               |
| 금지      | 다른 컴포넌트의 Props를 이 페이지에 복붙, 스크린샷 이미지로 프리뷰 대체                          |

- ②~⑥ 중 해당 사항이 없으면 **섹션을 생략**하되, ①과 ②는 필수입니다.
- 상태·사이즈는 표로: `size` / `variant` / `state` 축을 각각 한 줄씩.
- 접근성은 최소 1줄: 역할(role), 키보드 동작, 포커스 처리 중 해당 항목.

### C. Foundation Reference

| 항목      | 내용                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| 대상      | `foundations/*.mdx`, `brand/assets.mdx`                                                                             |
| 필수 순서 | ① 정의(무엇을 위한 값인가) → ② 토큰 표(이름·값·용도) → ③ 시각 표본(매트릭스/스페시멘) → ④ 코드 사용법 → ⑤ 사용 규칙 |
| 허용 블록 | `ColorMatrix`, `TypographySpecimen`, `IconGalleryViewer`, `BrandAssetsGallery`, 마크다운 표, 코드 블록              |
| 금지      | 표 없이 산문만으로 값 나열, 토큰 이름과 실제 CSS 변수 불일치                                                        |

- ②의 표 열은 `토큰 | 값 | 용도` 순서 고정.
- ⑤ 사용 규칙은 “언제 쓰지 않는가”를 반드시 1줄 포함합니다.

### D. Guide / Policy / Case Study

| 항목      | 내용                                                               |
| --------- | ------------------------------------------------------------------ |
| 대상      | `brand/index.mdx`, `brand/commercial-usage.mdx`, `portfolio/*.mdx` |
| 필수 순서 | ① 리드(문서 목적 1문단) → ② 본문 섹션(자유) → ③ 기준 문서 링크     |
| 허용 블록 | 산문, 표, 콜아웃, `BrandShowcase`, 이미지                          |
| 금지      | Props 표, 토큰 스펙 표(→ C로 분리), 결정 없는 서술 나열            |

- 섹션 번호는 `Chapter 01.` 또는 `1.` 중 하나로 통일합니다. 한 문서 안에서 섞지 않습니다.
- 정책 문서는 “허용 / 승인 필요 / 금지” 3분류를 유지합니다.

---

## 2. 블록 인벤토리

`app/docs/[[...slug]]/page.tsx`에 등록된 MDX 컴포넌트입니다. **새 시각 요소가 필요하면 MDX에 HTML을 넣지 말고 여기에 컴포넌트를 추가**한 뒤 이 표를 갱신합니다.

| 블록                 | 파일                                       | 사용 아키타입 |
| -------------------- | ------------------------------------------ | ------------- |
| `ComponentPreview`   | `components/sandbox/ComponentPreview.tsx`  | B             |
| `ColorMatrix`        | `components/tokens/ColorMatrix.tsx`        | C             |
| `TypographySpecimen` | `components/tokens/TypographySpecimen.tsx` | C             |
| `IconGalleryViewer`  | `components/tokens/IconGalleryViewer.tsx`  | C             |
| `BrandShowcase`      | `components/brand/BrandShowcase.tsx`       | C, D          |
| `BrandAssetsGallery` | `components/brand/BrandAssetsGallery.tsx`  | C             |
| Callout              | `fumadocs-ui/mdx` (기본)                   | A, B, C, D    |

Props는 전용 컴포넌트 없이 **마크다운 표**로 씁니다. 표 열 순서는 `Prop | Type | Default | Description` 고정입니다.

---

## 3. 기존 페이지 분류 (35장)

| 아키타입 | 페이지                                                                                                        | 수  |
| -------- | ------------------------------------------------------------------------------------------------------------- | --- |
| A        | `index`                                                                                                       | 1   |
| B        | `components/*` 전체                                                                                           | 22  |
| C        | `foundations/colors`, `elevation`, `iconography`, `motifs`, `radius`, `spacing`, `typography`, `brand/assets` | 8   |
| D        | `brand/index`, `brand/commercial-usage`, `portfolio/index`, `portfolio/visual-qa`                             | 4   |

### 정규화가 필요한 페이지

| 페이지                                                         | 현재                                 | 조치                                             |
| -------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------ | ---------- | ---------------------------- | ------------------------- |
| `components/card.mdx`                                          | H2 섹션 없음                         | B 전체 뼈대 작성 (Preview → Props → 상태·사이즈) |
| `components/accordion.mdx`                                     | `사용 예제`만 존재                   | Props·상태 섹션 추가                             |
| `components/tabs.mdx`                                          | `사용 예제`만 존재                   | Props·상태 섹션 추가                             |
| `components/mobile-header.mdx`                                 | `Props                               | 토큰                                             | 사용 규칙` | ③ 상태·사이즈 누락           |
| `components/top-bar.mdx`                                       | `Props                               | 구조                                             | 토큰       | 사용 규칙`                   | `구조`를 ⑤로 이동, ③ 추가 |
| `components/table-of-contents.mdx`, `toast.mdx`, `tooltip.mdx` | `Props                               | 토큰                                             | 사용 규칙` | ③ 상태·사이즈, ⑥ 접근성 확인 |
| `components/mindulle-logo.mdx`, `sonagi-logo.mdx`              | 조형 구조/마이그레이션 섹션 포함     | B 유지, 로고 고유 섹션은 ⑤ 뒤에 배치             |
| `components/*` (B 22장 전체)                                   | 접근성 섹션 사실상 없음              | 최소 1줄씩 추가                                  |
| `foundations/typography.mdx`                                   | 5개 섹션(헌법/표본/스택/코드/동기화) | C 순서로 재배열 (정의 → 표 → 표본 → 코드 → 규칙) |
| `foundations/iconography.mdx`                                  | 조형 헌법이 ①에 위치                 | ① 정의로 축약, 헌법은 ⑤로                        |

---

## 4. 거버넌스

1. **새 페이지**: 아키타입을 먼저 고르고 해당 순서를 그대로 씁니다. 맞지 않으면 예외 사유를 PR에 적습니다.
2. **새 블록**: MDX 인라인 HTML 금지 → `components/`에 컴포넌트 추가 → `page.tsx` 등록 → 이 문서의 인벤토리 갱신.
3. **Figma 범위**: Docs Shell 2장(레이아웃·사이드바) + Component Page 1장까지만 시안화합니다. 페이지별 목업은 만들지 않습니다.
4. **토큰**: `--mds-*` 외 색·간격 사용 금지. 새 값이 필요하면 토큰에 먼저 추가합니다.
5. **검증**: 아키타입별 대표 페이지 1장씩만 시각 회귀 대상으로 삼습니다 (`index`, `components/button`, `foundations/colors`, `brand/index`).
