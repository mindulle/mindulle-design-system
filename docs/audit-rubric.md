# 디자인 컨셉 감사 루브릭 (Design Concept Audit Rubric)

Plane 이슈 **MDS #61**의 판정 정본입니다. 배포된 화면이 민들레 디자인 시스템의 컨셉을 유지하는지 **사후에** 판정합니다.

- 상태: `draft` (v1 — 결정론 필터만)
- 기준일: 2026-11-20
- 대상: `apps/docs` 프로덕션 빌드, 이후 `blog-sonagi-space`로 확장
- 구현: 아직 없음. 이 문서는 구현의 계약서입니다.

## 0. 이 문서의 위치

| 층  | 시점    | 수단                                        | 이 문서               |
| --- | ------- | ------------------------------------------- | --------------------- |
| L1  | PR 전   | 시각 회귀(픽셀) + `no-arbitrary-value` 린터 | ❌ (이미 CI에서 강제) |
| L2  | 배포 후 | 이 루브릭에 따른 의미·컨셉 판정             | ✅                    |

**이 문서가 하지 않는 것**

- PR을 막지 않습니다. L2는 비동기 감사이며 결과는 Plane 이슈로만 환류합니다.
- 접근성(WCAG, axe-core)을 판정하지 않습니다. 접근성은 별도 렌즈이며, 이 루브릭의 DESIGN 축 근거로 쓰지 않습니다.
- 토큰 값 자체의 적합성을 판정하지 않습니다. 그건 `packages/tokens/scripts/validate-tokens.js`의 몫입니다.

## 1. 감사 대상

`apps/docs/scripts/visual-regression.mjs`의 `TARGET_PAGES`와 동일한 8개 라우트를 사용합니다.

| 라우트                     | 아키타입       | 기준 문서                           |
| -------------------------- | -------------- | ----------------------------------- |
| `/`                        | 표본(Specimen) | `docs/VISUAL_IDENTITY_CHARTER.md`   |
| `/rules`                   | 표본(Specimen) | 위와 동일                           |
| `/plates`                  | 표본(Specimen) | 위와 동일                           |
| `/errata`                  | 표본(Specimen) | 위와 동일                           |
| `/docs`                    | A. Landing     | `apps/docs/PAGE-ARCHETYPES.md` §1-A |
| `/docs/components/button`  | B. Component   | §1-B                                |
| `/docs/foundations/colors` | C. Foundation  | §1-C                                |
| `/docs/brand`              | D. Guide       | §1-D                                |

조합은 **8 라우트 × 2 뷰포트 × 2 테마 = 32회**입니다. VLM을 붙일 때의 비용 계산도 이 32를 기준으로 합니다(현재 제안 140회는 블로그·개별 문서 확장분 포함).

## 2. 캡처 계약

시각 회귀와 같은 조건을 써야 결과를 비교할 수 있습니다.

| 항목      | 값                                                |
| --------- | ------------------------------------------------- |
| 뷰포트    | desktop `1440×900`, mobile `390×844`              |
| 테마      | `data-theme="light"` / `data-theme="dark"` 강제   |
| 캡처      | full page, `deviceScaleFactor: 1`                 |
| 렌더러    | `mcr.microsoft.com/playwright` 고정 이미지        |
| 추가 덤프 | 대상 요소의 `getComputedStyle` (아래 §4의 속성만) |

`getComputedStyle` 덤프 대상 속성: `color`, `background-color`, `border-color`, `border-radius`, `border-width`, `box-shadow`, `font-size`, `font-family`, `line-height`, `letter-spacing`, `gap`, `padding`, `margin`, `width`, `height`.

## 3. 판정 규칙

모든 항목은 `PASS` / `FAIL` 이진 판정입니다. `FAIL`에는 화면 좌표와 근거 1문장을 붙입니다.

| ID  | 규칙                                                                   | 판정 방식                 | v1  |
| --- | ---------------------------------------------------------------------- | ------------------------- | --- |
| R1  | 소프트 섀도우·글로우 금지. 깊이는 보더와 surface 단차로만              | 결정론 (`box-shadow`)     | ✅  |
| R2  | 포인트 컬러·그래픽 면적 15% 이하, 85%는 지면 골격                      | 결정론 (픽셀 히스토그램)  | ✅  |
| R3  | 레거시 브랜드 잔재 금지 (`SONAGI` 스텐실, 틸-블루 `#1991B9`)           | 결정론 (DOM 텍스트·색)    | ✅  |
| R4  | 테마 위계 보존. 순수 흑/백 남용 없음, Base→Surface→Elevated 단차 유지  | 결정론 (해석된 토큰 대조) | ✅  |
| R5  | A. Landing: Hero → 시작 단계 → 링크 카드. 프리뷰·Props 표 금지         | 결정론 (DOM 구조)         | ✅  |
| R6  | B. Component: 라이브 프리뷰 최상단, 섹션 순서 고정, 스크린샷 대체 금지 | 결정론 (DOM 구조)         | ✅  |
| R7  | C/D: 표본과 산문의 역할 분리. Props 표가 Guide에 침범 금지             | 결정론 (DOM 구조)         | ✅  |

### R1 — 소프트 섀도우 금지 (ADR-0003, ADR-0013)

- `box-shadow`는 `none` 또는 **포커스 링**(`0 0 0 Npx <color>`, blur 0)만 허용합니다.
- 금지: blur > 0, spread > 0(포커스 제외), 글로우, 다중 레이어 그림자.
- 토큰에 `--mds-shadow-raised` / `--mds-shadow-floating`이 남아 있어도 **사용하지 않습니다.** L-002가 규칙이고, 토큰은 미정리 부채입니다.

### R2 — 85:15 조형 비율 (ADR-0016, ADR-0017)

- 스크린샷 픽셀 중 브랜드 액센트(골드·코랄 계열, 채도 임계 이상) 면적이 **15% 초과**면 `FAIL`.
- 판정은 토큰 해석값과의 색 거리(ΔE)로 계산합니다. 눈대중 금지.
- 그래픽이 1px 모노라인 에칭 수준을 넘어 전면 장식이면 VLM 단계에서 추가 판정합니다.

### R3 — 레거시 브랜드 잔재 (ADR-0013, ADR-0016)

- 헤더·주요 타이틀에 `S O N A G I` 스텐실 텍스트가 있으면 `FAIL`.
- 계산된 색이 `#1991B9`(MDS-61 본문이 지목한 구 틸-블루)이면 `FAIL`.
- 대외 브랜드는 `MINDULLE` 세리프 워드마크와 민들레 심볼 체계를 따릅니다.

### R4 — 테마 위계 (ADR-0006, ADR-0013)

- 불투명(`alpha ≥ 0.99`) 배경색은 활성 테마에서 해석한 팔레트 집합에 있어야 합니다. 집합은 `--mds-*`와 `--color-fd-*` 커스텀 속성 중 색상값을 모두 모아 만듭니다.
- `--mds-color-background-base`와 `surface`가 같은 값이면 `FAIL` (단차 소실). `elevated`는 보더로 구분되므로 surface와 같아도 허용합니다.
- 순수 `#000000` / `#ffffff`는 **팔레트에 있을 때만** 허용합니다. 라이트 테마의 surface는 실제로 `#ffffff`이므로, "흰색 금지"가 아니라 "토큰 밖 흰색 금지"입니다.
- 반투명 배경(`/20` 오버레이 등)은 합성 결과가 토큰이 아니므로 팔레트 검사에서 제외합니다.
- `data-surface="editorial"` 구역은 paper 팔레트가 팔레트 집합에 포함되어 있으므로 별도 분기가 필요 없습니다.

### R5~R7 — 구조 계약

페이지는 `<meta name="mds-archetype">`로 아키타입을 선언하고, 구조 블록은 `data-audit-block`으로 표시합니다. 검사 범위는 `article .prose`이며, Fumadocs 페이지네이션은 제외합니다. 클래스명에 의존하지 않습니다.

| 규칙 | 검사                                                                                                                                 |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ |
| R5   | `preview` 0개, Props 표 0개, 단계 목록(`ol` 또는 번호 h2 2개 이상), 내부 `/docs` 링크 1개 이상                                       |
| R6   | `preview` 1개 이상, Props 표 존재, 프리뷰가 Props 표보다 위, 프리뷰 내부 `img` 0개, 섹션 순서 Props → 사용 규칙 → 접근성 → 변경 이력 |
| R7   | foundation: `specimen` 1개 이상. guide: Props 표·토큰 표 0개                                                                         |

표 판별은 헤더 텍스트로 합니다. Props 표는 `Prop`+`Type`, 토큰 표는 `토큰`+`값`(또는 `Token`+`Value`)입니다.

## 4. 수치 상수

### 4.1 팔레트

**원칙: 허용 목록을 하드코딩하지 않고, 활성 테마에서 `--mds-*`와 `--color-fd-*` 커스텀 속성을 해석해 만든 집합을 씁니다.** 아래 표는 2026-11-20 스냅샷입니다.

| 역할                | Light                   | Dark                  |
| ------------------- | ----------------------- | --------------------- |
| brand-primary       | `#9e5a03` (gold-700)    | `#ffc837` (gold-300)  |
| brand-primary-hover | `#824902` (gold-800)    | `#e6b432` (gold-400)  |
| brand-accent        | `#eab308` (yellow-500)  | `#ffd166` (gold-200)  |
| brand-ink           | `#b86a04` (gold-600)    | `#ffc837` (gold-300)  |
| background-base     | `#fbfbfa` (neutral-50)  | `#12151d` (night-950) |
| background-surface  | `#ffffff` (base-white)  | `#1b202c` (night-900) |
| background-elevated | `#ffffff` (base-white)  | `#242b3b` (night-800) |
| text-primary        | `#18181b` (neutral-900) | `#f1f5f9` (slate-100) |
| border-default      | `#e4e4e7` (neutral-200) | `#2c3547` (night-700) |
| editorial base      | `#fbf9f5` (paper-50)    | `#fbf9f5` (paper-50)  |
| editorial ink       | `#161616` (ink-900)     | `#161616` (ink-900)   |

**항상 금지**

| 값                               | 이유                                                             |
| -------------------------------- | ---------------------------------------------------------------- |
| `#D97706`                        | primitive `spot-600`에만 있고 semantic brand 토큰이 아님 (L-011) |
| `#1991B9`                        | 구 브랜드 틸-블루                                                |
| 활성 테마 토큰 집합 밖의 모든 색 | 컨셉 이탈                                                        |

**예외 구역**

| 구역                                  | 처리                                                                          |
| ------------------------------------- | ----------------------------------------------------------------------------- |
| `MindulleLogo` 등 브랜드 SVG 아트워크 | 아트워크 내부 색은 감사 제외. 단, SVG를 감싼 컨테이너의 배경·보더는 감사 대상 |
| Fumadocs 셸 (`--color-fd-*`)          | 서드파티 크롬. 별도 허용 목록으로 관리하고 브랜드 팔레트 위반으로 세지 않음   |

### 4.2 Border radius

허용 집합(계산값 px): `0, 4, 8, 12, 16` + `full`

`apps/docs`가 실제로 내보내는 값입니다. 토큰 파일의 `base(6px)`와 `2xl(24px)`는 테마에 연결되지 않아 **유틸리티로 도달할 수 없습니다**(부채).

| 계산값 | 클래스                      | 근거                                    |
| ------ | --------------------------- | --------------------------------------- |
| 0      | `rounded-none`              |                                         |
| 4      | `rounded`, `rounded-sm`     | `--radius-sm: .25rem` = MDS `radius-sm` |
| 8      | `rounded-md`                | `--mds-radius-md`                       |
| 12     | `rounded-lg`                | `--mds-radius-lg`                       |
| 16     | `rounded-xl`, `rounded-2xl` | `--mds-radius-xl` / Tailwind 기본 1rem  |
| full   | `rounded-full`              | 계산값 `3.40282e+38px`                  |

- `rounded-[4px]`는 `rounded-sm`과 같은 값이므로 **arbitrary 사용 금지**(현재 14곳).
- `rounded-2xl`은 MDS `radius-2xl(24px)`가 아니라 Tailwind 기본 16px입니다. 24px이 필요하면 테마 매핑을 먼저 추가합니다.
- 그 외 값, 그리고 토큰이 있는데 arbitrary로 쓴 경우는 `FAIL`입니다.

### 4.3 Shadow

| 항목 | 값                                                                                            |
| ---- | --------------------------------------------------------------------------------------------- |
| 허용 | `none`                                                                                        |
| 허용 | `0 0 0 2px <color>`, `0 0 0 3px <color>` (포커스 링). 계산값의 blur가 0이고 spread가 3px 이하 |
| 금지 | blur > 0 인 모든 그림자                                                                       |
| 금지 | `--mds-shadow-raised`, `--mds-shadow-floating` 사용                                           |

### 4.4 Spacing

4px 그리드. 허용 집합(px): `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`

**영구 예외**

| 값                  | 사유                                                  |
| ------------------- | ----------------------------------------------------- |
| `1px`, `2px`        | 헤어라인·2px 스템. 브랜드 규칙이지 스케일 위반이 아님 |
| `56px`              | 디스플레이 간격. 디스플레이 스케일 확정 전까지 유지   |
| `max-w-[Nch]`       | 측정폭. 토큰 후보 아님                                |
| `leading-[0.94]` 등 | 디스플레이 행간. 토큰 후보 아님                       |
| `[hyphens:none]` 등 | CSS 전용 속성                                         |

그 외 off-grid 값은 `docs/token-mapping.md`의 결정을 따릅니다.

### 4.5 Typography

허용 font-size(px): `10, 11, 12, 13, 14, 16, 18, 20, 24, 25, 30, 31, 36, 39, 48, 49, 56, 61, 64`

| 구간                   | 근거                                            |
| ---------------------- | ----------------------------------------------- |
| 10, 11                 | `--mds-font-size-3xs`, `2xs`                    |
| 12, 13, 14             | `xs`, semantic `body-small`·`ui-label-13`, `sm` |
| 16, 18, 20, 24, 30, 36 | Tailwind 기본 + primitive                       |
| 48                     | Tailwind `5xl`                                  |
| 25, 31, 39, 49, 61     | semantic h5~h1                                  |
| 56                     | 디스플레이 예외 (`docs/token-decisions.json`)   |
| 64                     | display-hero                                    |

`13px`은 토큰에 있으나 Tailwind `text-*` 유틸리티가 없습니다. 이 상태에서는 arbitrary로 세지 않고 **허용**하되, 유틸리티 추가는 별도 부채로 둡니다.

**v1 기준선(알려진 부채, 신규 이슈 생성 제외)**: `14.5, 15, 15.5, 21, 28, 34, 44, 78`

표본 지면(`/`, `/rules`, `/plates`, `/errata`)의 디스플레이 스케일이 아직 결정되지 않아 남아 있는 값입니다. 새 값이 추가되면 그때는 `FAIL`입니다.

### 4.6 Layout (Fumadocs 셸)

토큰이 아니라 Fumadocs가 소유하는 값입니다. **측정값**이며, 셸 구조가 바뀌면 갱신해야 합니다.

| 항목                 | 값                                  | 출처     |
| -------------------- | ----------------------------------- | -------- |
| `--fd-sidebar-width` | `268px` 기본, 일부 레이아웃 `286px` | 빌드 CSS |
| `--fd-nav-height`    | `64px` (md 이상)                    | 빌드 CSS |
| 콘텐츠 최대폭        | `--spacing-fd-container`            | Fumadocs |

MDS #61 본문의 "240px 사이드바"는 실제 값과 다릅니다. 감사 상수는 위 측정값을 씁니다.

## 5. Anchor 레퍼런스

VLM 2단계에서 "민들레다움"의 기준점으로 쓰는 이미지입니다. v1에서는 사람이 FAIL을 검토할 때만 참조합니다.

| 테마  | 파일                                                                | 크기      |
| ----- | ------------------------------------------------------------------- | --------- |
| Light | `apps/docs/tests/visual-baselines/specimen-cover-desktop-light.png` | 1440×2552 |
| Dark  | `apps/docs/tests/visual-baselines/specimen-cover-desktop-dark.png`  | 1440×2552 |

- 표본 커버를 고른 이유: 루브릭이 말하는 지면 골격(85%)·1px/2px 선·paper 팔레트가 한 장에 모두 나옵니다.
- 모바일 대응: `specimen-cover-mobile-{light,dark}.png`.
- **승격 규칙**: 32조합 전부 `PASS`이고 사람이 승인한 실행의 스크린샷만 다음 Anchor 후보가 됩니다. 자동 승격은 VLM 도입 후.

## 6. 판정 절차

```text
[1] 캡처 (32조합)
      ↓
[2] 결정론 필터 (R1~R7 중 ✅)
      ↓ 위반 없음 → PASS, 종료
      ↓ 위반 있음
[3] 중복 해시 확인 → 기존 Open 이슈면 카운트만 +1
      ↓ 신규
[4] Plane 이슈 생성 (증거 이미지 + computed 값 + 규칙 ID)
```

VLM Pairwise Judge는 2단계이며, **결정론 필터를 통과한 화면에만** 호출합니다. 오탐률 측정 전에는 켜지 않습니다.

### 6.1 구현 상태 (2026-11-20)

| 항목       | 상태                                                             |
| ---------- | ---------------------------------------------------------------- |
| 스크립트   | `apps/docs/scripts/design-audit.mjs`                             |
| 실행       | `pnpm --filter @mindulle/docs audit:design`                      |
| 규칙       | R1~R7 결정론. R2는 스크린샷 픽셀 히스토그램, R5~R7은 구조 계약   |
| 출력       | `apps/docs/tests/audit-runs/<run>/report.json` (gitignore)       |
| 차단       | 기본 advisory. `--fail-on-violations` 또는 `audit:design:strict` |
| Plane 발행 | 미구현 (저장소·자격증명 미정)                                    |

**첫 실행 결과**: 32 캡처, 위반 4건 (R1 4 / R2 0 / R3 0 / R4 0), 최대 액센트 면적 0.93%.

R1 4건은 모두 `/docs/brand`의 `BrandShowcase` 라이브 프리뷰 컨테이너였습니다. 인라인 `box-shadow: 0 4px 20px -2px rgba(0,0,0,0.06)`를 제거하고(elevation은 border와 surface 단차로 대체) 재실행해 **0건**을 확인했습니다. 시각 회귀 베이스라인은 임계값 이내라 갱신하지 않았습니다.

R5~R7 계약을 붙인 뒤 `/docs`(landing)에서 **다음에 볼 내부 링크 0건**이 잡혔습니다. `PAGE-ARCHETYPES.md` A의 필수 순서를 위반한 상태이며, 콘텐츠 수정 전이라 advisory로 남겨 둡니다.

## 7. 결과와 중복 방지

중복 키는 **`sha1(route + "|" + ruleId + "|" + theme)`** 입니다. 뷰포트는 키에 넣지 않고 증거 메타데이터로만 기록합니다(같은 결함이 데스크톱·모바일에서 두 번 발행되는 것을 막기 위함).

기록 필드:

```text
run_id, commit_sha, executed_at, route, archetype, theme, viewport,
rule_id, status(PASS|FAIL), evidence, dedup_hash, plane_issue_id,
screenshot_url
```

- 닫힌 해시가 다시 `FAIL`이면 `regression` 라벨 + 우선순위 High.
- `false-positive` 라벨로 닫힌 사례는 다음 실행의 Negative Few-shot 후보로 보관합니다.

## 8. 오탐·예외 정책

| 상황                                                      | 처리                                       |
| --------------------------------------------------------- | ------------------------------------------ |
| 토큰 값과 일치하는 순수 흑/백                             | `PASS` (R4)                                |
| 브랜드 SVG 아트워크 내부 hex                              | 감사 제외                                  |
| Fumadocs 셸(`#nd-*`, header, nav, aside, `*-fd-*` 클래스) | **전 규칙 면제**                           |
| 반투명 배경(`alpha < 0.99`)                               | 팔레트 검사 제외                           |
| 헤어라인 1·2px                                            | `PASS`                                     |
| v1 기준선의 알려진 부채(§4.5)                             | `FAIL`로 기록하되 이슈 생성 제외, 카운트만 |
| 기준선에 없는 신규 위반                                   | 이슈 생성                                  |
| 루브릭에 없는 새 패턴                                     | 임의 판정 금지. 이 문서에 규칙을 먼저 추가 |

규칙을 느슨하게 만들어 오탐을 줄이지 않습니다. 예외는 **구역 단위**로만 둡니다.

## 9. 미해결

| 항목                                    | 상태                                       |
| --------------------------------------- | ------------------------------------------ |
| `audit_runs` / `audit_findings` 저장소  | 미정 — Postgres 신설 vs llmops SQLite 마트 |
| `cdn.sonagi.space` 업로드 경로·자격증명 | 미정                                       |
| VLM 비용                                | 32조합 기준 재계산 필요                    |
| 실행 주체                               | GitHub Actions cron vs sonagi-ops 루틴     |
| 표본 지면 디스플레이 스케일             | 56/78 등 미결정 — 결정 후 §4.5 기준선 축소 |

## 10. 변경 절차

1. 규칙 추가·수정은 이 파일을 먼저 고친다.
2. 수치 상수는 §4와 부록 A를 **같이** 고친다(둘이 어긋나면 스크립트가 틀린다).
3. Anchor를 바꾸면 §5 표와 파일을 같이 갱신한다.
4. 변경 사유는 `llm-wiki/00_System/DECISION_LEDGER.md`에 남긴다.

## 부록 A. 기계 판독 상수

구현 스크립트는 이 블록을 읽습니다. §4와 값이 다르면 이 블록이 아니라 §4를 먼저 고치고 둘을 맞춥니다.

```json
{
  "version": "1.0.0",
  "updated": "2026-11-20",
  "capture": {
    "viewports": {
      "desktop": { "width": 1440, "height": 900 },
      "mobile": { "width": 390, "height": 844 }
    },
    "themes": ["light", "dark"],
    "fullPage": true,
    "deviceScaleFactor": 1,
    "diffRatioMax": 0.005
  },
  "radius": {
    "allowedPx": [0, 4, 8, 12, 16],
    "allowFull": true,
    "forbiddenClasses": ["rounded-[4px]"]
  },
  "shadow": {
    "allowed": { "none": true, "blurPx": 0, "maxSpreadPx": 3 },
    "forbiddenTokens": ["--mds-shadow-raised", "--mds-shadow-floating"]
  },
  "spacing": {
    "gridPx": 4,
    "allowedPx": [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
    "exceptionsPx": [1, 2, 56]
  },
  "typography": {
    "allowedPx": [10, 11, 12, 13, 14, 16, 18, 20, 24, 25, 30, 31, 36, 39, 48, 49, 56, 61, 64],
    "v1BaselinePx": [14.5, 15, 15.5, 21, 28, 34, 44, 78]
  },
  "layout": {
    "sidebarPx": 268,
    "sidebarLgPx": 286,
    "navPx": 64
  },
  "accentAreaMax": 0.15,
  "forbiddenHex": ["#D97706", "#1991B9"],
  "exemptZones": ["brand-svg-artwork", "fumadocs-shell"],
  "dedupHash": "sha1(route + '|' + ruleId + '|' + theme)"
}
```

## 부록 B. 구조 셀렉터 계약

| 속성                          | 위치                                                                                                 | 값                      |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------- |
| `<meta name="mds-archetype">` | `generateMetadata().other` (`apps/docs/app/docs/[[...slug]]/page.tsx`)                               | frontmatter `archetype` |
| `data-audit-block="preview"`  | `ComponentPreview` 루트                                                                              | —                       |
| `data-audit-block="specimen"` | `ColorMatrix`, `TypographySpecimen`, `IconGalleryViewer`, `BrandAssetsGallery`, `BrandShowcase` 루트 | —                       |

새 시각 블록을 추가하면 루트에 `data-audit-block="specimen"`을 붙입니다. 붙이지 않으면 R7이 "표본 없음"으로 판정합니다.
