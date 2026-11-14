# Mindulle Design System v0.1.0 (MDS)

> Category: Korean Product  
> Slogan: **"겨울 끝, 민들레." (At Winter's End, Dandelion.)**

## 🎯 Figma SSOT (정본)

|                      |                                                                             |
| -------------------- | --------------------------------------------------------------------------- |
| **파일**             | `Mindulle Design System v0.1.0`                                             |
| **키**               | `AEoW19jmlUh3rFgzhhV1vH`                                                    |
| **URL**              | https://www.figma.com/design/AEoW19jmlUh3rFgzhhV1vH/Sonagi-Design-System-V3 |
| **Foundations 보드** | node `198:2974` — "Mindulle Foundations (SSOT Live Sync)"                   |

**이 파일이 유일한 디자인 정본입니다.** 아래 두 파일은 폐기된 이력이므로 참조하지 마십시오.

| 폐기된 파일            | 키                       | 상태                                                                          |
| ---------------------- | ------------------------ | ----------------------------------------------------------------------------- |
| `Core-Primitives-v3`   | `1hgAgnMvqn2uCF8i45Do4x` | `Test Page` 한 장짜리 스크래치. Button 매트릭스 + 다크모드 테스트 보드만 존재 |
| `소나기 디자인 시스템` | `KN6Bl6Pb4aW2KJXpBhS7rZ` | 2026-04-30 이후 방치. ADR 0001에서 방향 불일치로 판정됨                       |

**값의 정본은 피그마 Local Variables입니다.** 2026-11-14 기준 `Colors` 25개 · `Color Primitives` 68개 · `Radius` 6단계를 대조해 아래 팔레트와 코드 토큰을 동기화했습니다. 문서·코드·캔버스가 어긋나면 **항상 피그마를 기준으로 나머지를 고칩니다.**

## 개요

Built for Korean-first products that run at the intersection of analytics and editorial — think data dashboards that still feel human. 단일 테마 **민들레(MDS Core)** 의 light / dark 2모드로 구성됩니다.

## Visual Theme & Atmosphere

Quiet depth. The brand lives in a warm **gold amber** (`#b86a04`) that sits on neutral paper (`#fbfbfa`) and pure-white surfaces. A brighter yellow (`#eab308`) is the single emphasis accent — one per screen. The cyan logo dot (`#00ffcc`) is reserved for the wordmark only — never used as a UI accent. Typography is Pretendard-first with Inter fallback; Korean and Latin share the same optical weight.

## Color Palette & Roles

**MDS Core (light mode)**

- **Background base:** `#fbfbfa` — neutral paper, the page floor
- **Surface:** `#ffffff` — cards, panels, input forms
- **Elevated:** `#ffffff` — modals, popovers, tooltips
- **Brand primary:** `#b86a04` — gold amber, main CTA fill, active elements
- **Brand primary hover:** `#9e5a03`
- **Accent:** `#eab308` — links, focused borders, interactive highlights; one accent per screen
- **Accent hover:** `#ca8a04`
- **Logo cyan:** `#00ffcc` — wordmark dot only; never used as UI color
- **Text primary:** `#18181b`
- **Text secondary:** `#52525b`
- **Text muted:** `#71717a`
- **Text disabled:** `#a1a1aa`
- **Border default:** `#e4e4e7`
- **Border subtle:** `#f4f4f5`
- **Border strong:** `#b86a04`
- **Success:** `#2ea043` (`#eaf4eb` bg) / **Warning:** `#d29922` (`#fdf5e5` bg) / **Danger (Error):** `#c83e4d` (`#fde8e8` bg) / **Info:** `#1275b5` (`#e8f1f8` bg)

**Dark mode** (`[data-theme="dark"]` or `prefers-color-scheme: dark`)

- **Background base:** `#12151d` — cool near-black
- **Surface:** `#1b202c`
- **Elevated:** `#242b3b`
- **Brand primary:** `#ffc837`
- **Brand primary hover:** `#e6b432`
- **Accent:** `#ffd166`
- **Accent hover:** `#ffc837`
- **Text primary:** `#f1f5f9`
- **Text secondary:** `#94a3b8`
- **Text muted:** `#64748b`
- **Text disabled:** `#6c605e`
- **Border default:** `#2c3547`
- **Border subtle:** `#1f2635`
- **Border strong:** `#ffc837`
- **Success:** `#56d364` (`#132e19` bg) / **Warning:** `#e3b341` (`#2e2305` bg) / **Danger (Error):** `#f85149` (`#421818` bg) / **Info:** `#79c0ff` (`#1c2d42` bg)

There are no other themes. `light` (alias `mds`) and `dark` are the only valid values for `data-theme` — the token set is 2-Tier (primitives → semantics) until a seasonal theme is introduced. See [ADR 0010](./decisions/0010-delivery-consolidation-github-packages.md).

Never use `#00ffcc` outside the wordmark context.

## Typography Rules

- **Cinematic Display (Primary):** `'Cormorant Garamond', 'Noto Serif KR', Georgia, serif` — Hero & Display headings (≥36px, Weight 700/600, True 2px Stem standard)
- **Editorial Humanist (Secondary):** `'Cormorant Garamond', 'MaruBuri', Georgia, serif` — Atelier essays, brand philosophy & narrative quotes
- **Primary sans:** `'Pretendard', 'Inter', system-ui, sans-serif` — all body and UI copy
- **Serif (editorial body):** `'Noto Serif KR', 'Merriweather', Georgia, serif` — long-form reading content
- **Mono:** `'JetBrains Mono', 'Fira Code', 'Consolas', monospace` — code, numbers in tables
- **Wordmark EN:** `'Jura Light', sans-serif` / **Wordmark KO:** `'Designhouse Light', sans-serif` — brand use only

**Type scale (px)** — Figma SSOT, modular 1.25 for headings:

| 계열                     | 값                                                              |
| ------------------------ | --------------------------------------------------------------- |
| **Display** (Cormorant)  | 24 · 36 · 36 · 64 (`hero` / `section` / `editorial` / `quote`)  |
| **Heading** (Pretendard) | H6 20 · H5 25 · H4 31 · H3 39 · H2 49 · H1 61 (1.25 비율)       |
| **Body**                 | caption 10 · base 16 · large 18                                 |
| **UI**                   | label 13 · detail/label 12 · body/label 14 · body 16 · title 18 |

**스타일 이름 규격:** `계열/단계` 2단만 사용합니다 — `Heading/H1`, `Body/Caption`, `UI/Label-14`, `Display/Hero`. 공백·복수형·괄호 표기는 금지합니다.

**사용 규칙 (역할 계약)**

| 계열        | 쓰는 곳                       | 금지           |
| ----------- | ----------------------------- | -------------- |
| **Display** | 히어로, 페이지 오프닝, 인용문 | 컨트롤·라벨    |
| **Heading** | 문서 구조(H1~H6)              | 카드·모달 제목 |
| **Body**    | 장문 본문                     | 버튼·라벨      |
| **UI**      | 버튼·입력·카드·탭             | 장문           |

**Weights:** Regular 400 · Medium 500 · Semibold 600 · Bold 700

**Line-height:** body-base 24/16 (1.5), body-small 18/13, headings tight (H1 60/61 → H6 26/20), display는 퍼센트(115% / 125% / 130% / 140%)

**Letter-spacing:** display 계열만 음수 (`-0.025em` hero, `-0.02em` section, `-0.01em` editorial), 나머지 전부 `0`

모든 타이포그래피는 `--mds-typography-*` 토큰(`h1`~`h6`, `body-*`, `caption`, `ui.*`, `display.*`)으로만 사용하고, 컴포넌트에서 폰트 사이즈를 직접 지정하지 않습니다.

## Token Architecture (3-Tier)

토큰은 3계층으로만 운용합니다. 컴포넌트 코드는 **Tier 3만** 참조합니다.

| Tier             | 컬렉션 (Figma)           | CSS 프리픽스        | 예시                                                           |
| ---------------- | ------------------------ | ------------------- | -------------------------------------------------------------- |
| **1. Primitive** | `Color Primitives`       | `--mds-primitive-*` | `gold/600` `#b86a04`, `night/950` `#12151d`                    |
| **2. Semantic**  | `Colors` (Light/Dark)    | `--mds-color-*`     | `brand/primary` → `gold/600`, `background/base` → `neutral/50` |
| **3. Component** | `Component` (Light/Dark) | `--mds-component-*` | `button/bg-primary` → `brand/primary`                          |

- Semantic은 반드시 Primitive를 alias하고, Component는 반드시 Semantic을 alias합니다. `raw hex`는 Primitive에서만 허용됩니다.
- 현재 Component 토큰: `button/{bg-primary, bg-primary-hover, text-on-primary, bg-secondary, border-secondary, text-secondary}`, `card/{bg, border}`, `input/{bg, border, border-focus}`, `focus/ring`
- 코드 정의: `packages/tokens/tokens/components.json`

### 표면 스코프 (Surface Scope)

특정 표면(신문지 지면 등)에서 색을 통째로 갈아끼울 때는 **별도 토큰 이름을 만들지 않고** `data-surface` 스코프로 시맨틱 값을 재매핑합니다.

```html
<section data-surface="editorial">…</section>
```

| 스코프      | 재매핑                                                                          |
| ----------- | ------------------------------------------------------------------------------- |
| `editorial` | `background/*` → `paper/*`, `text/*`·`border/*` → `ink/*`, `brand/*` → `spot/*` |

- 컴포넌트는 언제나 `background/*`·`text/*`만 사용합니다. 표면이 바뀌면 스코프가 값을 바꿉니다.
- 금지: `editorial/ink-primary`처럼 **역할이 같은 두 번째 토큰 이름**을 만들지 않습니다.
- 정의: `packages/tokens/tokens/surfaces.json` (`paper/ink/spot`은 Primitive)

## Component Classification & Publishing Policy

컴포넌트는 3분류로만 운용하고, **발행 여부를 분류로 결정**합니다.

| 분류                | 위치                                      | 라이브러리 발행 | 코드             |
| ------------------- | ----------------------------------------- | --------------- | ---------------- |
| **Core Components** | 각 컴포넌트 페이지                        | ✅ 발행         | `@mindulle/ui`   |
| **Patterns**        | `📦 Patterns & App-owned (Not Published)` | ❌ 미발행       | 없음 (조합 예시) |
| **App-owned**       | `📦 Patterns & App-owned (Not Published)` | ❌ 미발행       | 앱 내부 구현     |

- **Core**: Button · Badge · Input · Textarea · Select · Checkbox · Radio · Avatar · Card · Modal · Toast · Tooltip · Accordion · Tabs · List Item · Pagination · HoverPreview · `Navigation/{TopBar, Mobile-Header, TableOfContents}`
- **Patterns**: `Templates/Login-Form`
- **App-owned**: `Navigation/FAB` · `Overlay/BottomSheet`
- 발행 제외는 Figma의 **Assets → Manage library**에서 해당 컴포넌트를 체크 해제해 설정합니다 (플러그인 API 미지원).

## Component Stylings

- **Buttons:** `border-radius: 8px` (`--mds-radius-md`). Primary = gold amber fill (`--mds-color-brand-primary`) + white label, hover `--mds-color-brand-primary-hover`. Secondary = 1px border (`--mds-color-border-default`) with transparent fill. Ghost = transparent. Danger = error fill (`--mds-color-state-danger`). Padding: `10px 20px`, label 14px/600, min touch height 44px.
- **Cards:** `border-radius: 12px` (`--mds-radius-lg`), 1px border (`--mds-color-border-default`), surface background, `shadow-raised` by default. Internal padding: `20px`.
- **Inputs:** `border-radius: 8px` (`--mds-radius-md`), 1px border, gold focus ring on focus. Height: 40px.
- **Badges / Tags:** `border-radius: 9999px` (`--mds-radius-full`) for status pills; `border-radius: 4px` (`--mds-radius-sm`) for category labels.
- **Links:** brand gold `--mds-color-brand-primary`, no underline, underline on hover. Visited state stays brand gold.
- **Tables:** Zebra striping with `--mds-color-background-surface` on odd rows. Mono font for numeric columns.

**Radius scale (`--mds-radius-*`):** none 0 · sm 4 · base 6 · md 8 · lg 12 · xl 16 · 2xl 24 · full 9999. 컴포넌트 사용: Badge/Label 6(`base`), Button·Input 8(`md`), Card 12(`lg`), Modal 16(`xl`), Pill·Avatar `full`.

## Layout Principles

- **Grid:** 12-column, 1200px max-width, `24px` gutters (`--mds-spacing-6`).
- **Hero:** 40–56vh. Content top-biased; never vertically centered.
- **Section spacing:** `80px` desktop (`--mds-spacing-20`) · `48px` tablet (`--mds-spacing-12`) · `32px` mobile (`--mds-spacing-8`).
- **Sidebar width:** 240px; collapses to icon-only 64px below 1024px.
- Whitespace is the primary separator. Dividers (`1px`, `--mds-color-border-subtle`) only between structurally unrelated blocks.
- Do not nest cards inside cards.

## Depth & Elevation

Three levels:

- **Flat (0):** default content area, no shadow.
- **Raised (1):** cards, sticky headers. `shadow-raised: 0 2px 6px rgba(40,20,15,0.08)`.
- **Floating (2):** dropdowns, modals, toasts. `shadow-floating: 0 8px 24px rgba(40,20,15,0.15)`.

Focus ring: `shadow-focus: 0 0 0 3px rgba(184,106,4,0.25)` (light) / `0 0 0 3px rgba(255,200,55,0.35)` (dark) — always visible, never suppressed.

Z-index ladder: base 0 · raised 10 · dropdown 100 · sticky 200 · modal 300 · toast 400 · tooltip 500.

## Do's and Don'ts

- Use `--mds-color-*` semantic tokens. Never hardcode hex values.
- One accent element per screen. The gold amber CTA and neutral surfaces do the heavy lifting.
- Korean copy: sentence-case. English copy: sentence-case headings, title-case for proper nouns only.
- Motion: `150ms` base (`--mds-duration-base`), `cubic-bezier(0.4, 0, 0.2, 1)` (`--mds-ease-default`). Fast interactions: `100ms`. No motion over `250ms` for UI feedback.
- Do not use `#00ffcc` (logo cyan) anywhere except the wordmark SVG.
- Do not use drop shadows on inputs. Use border + focus ring instead.
- No gradients except a subtle `brand-primary → brand-primary-dark` on hero banners, used sparingly.
- No neumorphism. No glassmorphism.

## Responsive Behavior

- **Desktop ≥ 1024px:** 12-col grid, full sidebar, 24px gutters.
- **Tablet 640–1023px:** 8-col grid, sidebar collapses to icon-only, 16px gutters.
- **Mobile < 640px:** 4-col grid, sidebar hidden (bottom nav or hamburger), 12px gutters. Hero drops to 40vh. Font scale steps down one size.

## Macro-Architecture (Atlassian / Jira Model)

- **Global App Switcher:** The Mindulle platform (`blog`, `wiki`, `draw`, `bots`) is connected via a global sidebar/app switcher.
- **Independent Sub-Apps:** Each application maintains its distinct layout and UI flow suited for its purpose, tied together by the global navigation.
- **Unified Context:** Allows users to easily switch between completely different tools while feeling anchored in the Mindulle ecosystem.

## Micro-Architecture & Philosophy (Meta Astryx Inspired)

- **AI-Ready First:** APIs, classes, and CLI tools must be strictly typed and predictable so both human engineers and AI coding agents can consume them perfectly.
- **React 19+ Foundation:** Components must be server-component ready and utilize modern React primitives.
- **Brand-level Theming:** Avoid forking/wrapping components. Rely on deep token override capabilities to allow flexible customization without bloat.
- **Self-documenting Primitives:** Components must declare their behavior clearly (e.g., `Shadcn UI` pattern) to eliminate "magic" behavior.

## Agent Prompt Guide

- Tokens are available as CSS custom properties prefixed `--mds-*`. Use semantic tokens (`--mds-color-bg-base`, `--mds-color-text-primary`) over primitives (`--mds-color-neutral-100`).
- **Distribution is GitHub Packages only** (see ADR 0010). Install `@mindulle/tokens` from `https://npm.pkg.github.com` and import the stylesheet via the package export:
  - Bundled apps: `import '@mindulle/tokens/css';`
  - Plain HTML artifacts: link the installed file, e.g. `<link rel="stylesheet" href="./node_modules/@mindulle/tokens/dist/variables.css">`
- **There is no public CDN for tokens.** Do not link `design.sonagi.space` — that host serves an unrelated SPA and returns HTML for every path, so a stylesheet link there fails silently.
- Default to **MDS Core** (light). Apply `data-theme="dark"` to `<html>` for dark mode. No other themes exist yet — the token set is intentionally 2-Tier (primitives → semantics) until a seasonal theme is introduced (ADR 0010).
- If a color is needed outside the palette, surface a comment `/* WARNING: color outside MDS palette */` and use the nearest semantic token as a fallback.
- Pretendard must be loaded from CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css`
