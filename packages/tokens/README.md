# @mindulle/tokens

민들레 디자인 시스템(Mindulle Design System, MDS v0.1.0)의 단일 진실 소스(SSOT) 디자인 토큰 패키지입니다. (엔진: Sonagi)
W3C Design Tokens Community Group 규격과 CSS Custom Properties (`--mds-*`)를 제공합니다.

## 설치

```bash
npm install @mindulle/tokens
# 또는
pnpm add @mindulle/tokens
```

## 사용법

### CSS (모든 프레임워크)

```css
@import '@mindulle/tokens/css';

.button {
  background-color: var(--mds-color-brand-primary);
  color: var(--mds-color-text-inverse);
  border-radius: var(--mds-radius-base);
}
```

### Next.js / React

```tsx
// app/layout.tsx 또는 globals.css에서 한 번만 import
import '@mindulle/tokens/css';
```

### Evidence (Svelte)

```js
// evidence.config.yaml 또는 app.css에서 import
@import '@mindulle/tokens/css';
```

## 다크모드

토큰은 라이트/다크 모드를 자동으로 지원합니다.

- **기본**: 라이트모드 값 적용
- **다크모드**: `<html>` 요소에 `data-theme="dark"` 속성 추가

```js
// 다크모드 전환
document.documentElement.setAttribute('data-theme', 'dark');

// 라이트모드 전환
document.documentElement.removeAttribute('data-theme');
```

## 토큰 목록

### 색상

| 변수                              | 라이트    | 다크      | 용도           |
| --------------------------------- | --------- | --------- | -------------- |
| `--mds-color-brand-primary`       | `#1c2c4d` | `#1c2c4d` | 주 브랜드 색상 |
| `--mds-color-brand-primary-dark`  | `#0a1128` | `#0a1128` | 딥 블루        |
| `--mds-color-brand-primary-hover` | `#1275b5` | `#1275b5` | hover 상태     |
| `--mds-color-bg-base`             | `#faf9f7` | `#010609` | 페이지 배경    |
| `--mds-color-bg-surface`          | `#fff8f2` | `#0d1117` | 카드, 패널     |
| `--mds-color-bg-elevated`         | `#ffffff` | `#161b22` | 모달, 드롭다운 |
| `--mds-color-bg-overlay`          | `#f0ede8` | `#1c2128` | hover 오버레이 |
| `--mds-color-text-primary`        | `#0d1117` | `#f0f6fc` | 본문 텍스트    |
| `--mds-color-text-secondary`      | `#30363d` | `#c9d1d9` | 보조 텍스트    |
| `--mds-color-text-muted`          | `#8b949e` | `#8b949e` | placeholder    |
| `--mds-color-border-default`      | `#e6eaef` | `#30363d` | 기본 테두리    |
| `--mds-color-border-strong`       | `#1c2c4d` | `#1c2c4d` | 강조 테두리    |
| `--mds-color-state-success`       | `#2ea043` | `#2ea043` | 성공           |
| `--mds-color-state-warning`       | `#d29922` | `#d29922` | 경고           |
| `--mds-color-state-danger`        | `#f85149` | `#f85149` | 오류 (위험)    |

### 타이포그래피

| 변수                            | 값                                |
| ------------------------------- | --------------------------------- |
| `--mds-font-cinematic-display`  | Cormorant Garamond, Noto Serif KR |
| `--mds-font-editorial-humanist` | Cormorant Garamond, MaruBuri      |
| `--mds-font-sans`               | Pretendard, Inter, system-ui      |
| `--mds-font-serif`              | Noto Serif KR, Merriweather       |
| `--mds-font-mono`               | JetBrains Mono, Fira Code         |
| `--mds-font-size-base`          | 16px                              |

### 간격 / 반경 / 기타

| 변수                 | 값                           |
| -------------------- | ---------------------------- |
| `--mds-radius-base`  | 6px                          |
| `--mds-radius-md`    | 8px                          |
| `--mds-radius-full`  | 9999px                       |
| `--mds-border-thin`  | 1px                          |
| `--mds-border-base`  | 2px                          |
| `--mds-shadow-focus` | 0 0 0 3px (브랜드 컬러 기반) |

전체 목록은 [`tokens/variables.css`](./tokens/variables.css) 참조.

## 버전

| 버전  | 내용                                                    |
| ----- | ------------------------------------------------------- |
| 1.2.0 | 토큰 네이밍 개편 및 CDN 쇼케이스 자동화 적용            |
| 1.1.0 | Primitive/Semantic 2-레이어, 라이트/다크 모드 완전 지원 |
| 1.0.0 | 초기 릴리즈, 다크모드 전용                              |
