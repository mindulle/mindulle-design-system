# 디자인 시스템 문서 레이아웃·요소 표준 (MDS-38)

> 기준: `AGENTS.md` (MINDULLE SPECIMEN — ED. 04) · `DESIGN.md` · `apps/docs/PAGE-ARCHETYPES.md`

---

## 1. 현재 문서·시안 인벤토리

| 구분 | 경로 | 목적 / 역할 | 상태 |
| :--- | :--- | :--- | :--- |
| 저장소 규칙 | `AGENTS.md` | 에이전트 작업 규칙, 정본 순서(Figma → `DESIGN.md` → `packages/*` → `apps/docs`), 간행물 문법 | **정본 (Active)** |
| 시스템 헌법 | `DESIGN.md` | 2px Stem, 4px 곡률, Dual Matrix 등 조형 철학 및 토큰 원칙 | **정본 (Active)** |
| 루트 안내 | `README.md` | 모노레포 구조, 패키지 설치 및 워크스페이스 명령 안내 | **Active** |
| 의사결정 기록 | `decisions/0001~0016` | 색상·타이포·섀도우·다크모드·패키지 통합 ADR 및 `QA-CHECKLIST.md` | **Active (Errata 원천)** |
| 간행물 지면 (표지/기사/도판/정오표) | `apps/docs/app/{page,rules,plates,errata}/page.tsx` | `MINDULLE SPECIMEN — ED. 04` 매거진 아키타입 지면 (`/` 표지, `/rules` 에세이, `/plates` 도판, `/errata` 정오표) | **Active (MDS-56)** |
| 문서 페이지 계약 | `apps/docs/PAGE-ARCHETYPES.md` | `/docs/**/*.mdx` 4종 아키타입(A. Landing / B. Component / C. Foundation / D. Guide) 조립 계약 | **Active** |
| 컴포넌트·파운데이션 MDX | `apps/docs/content/docs/**/*.mdx` | 22종 컴포넌트, 7종 파운데이션, 브랜드, 포트폴리오 실무 레퍼런스 | **Active** |
| 토큰 레퍼런스 | `packages/tokens/docs/token-reference.md` | `--mds-*` CSS Custom Properties 전체 참조표 | **Active** |
| 브랜드 헌장·모티프 | `docs/VISUAL_IDENTITY_CHARTER.md`, `docs/brand-motif-system.md` | 시각 정체성 헌장 및 3대 그래픽 모티프 규격 | **Active** |
| 독립 감사 리포트 | `docs/CLAUDE_OPUS_MDS_INDEPENDENT_AUDIT_REPORT.md` | MDS-25 품질 감사 스냅샷 | **Archive (이력 보관)** |
| 구 히어로 스펙 | `apps/docs/HERO-SPEC.md` | MDS-51 단계의 64px 히어로·2:1 워크벤치 스펙 | **Superseded (MDS-56 표지로 대체)** |
| Figma 자동화 | `figma-automation/` | Figma 변수·컴포넌트 추출 및 동기화 스크립트 | **Active** |

---

## 2. 문서 페이지 표준 레이아웃 (컴포넌트 기준)

`apps/docs/PAGE-ARCHETYPES.md`의 **B. Component Spec** 계약을 기본으로 하되, 실무 레퍼런스 완성도를 위해 **사용 규칙(Do / Don't)**과 **변경 이력**을 표준 슬롯으로 포함한다.

```text
1. 헤더 (Frontmatter: title · description · icon + H1)
2. 개요 (컴포넌트의 조형적 역할 1~2문장)
3. 예시 (<ComponentPreview name="..." defaultProps={...} />)
4. Props 명세 및 상태·사이즈 표
5. 사용 규칙 (Do / Don't)
6. 접근성 (role · 키보드 내비게이션 · focus-visible · aria-* 요구사항)
7. 변경 이력 (ADR 또는 Edition 기준 요약)
```

- **금지**: raw hex 하드코딩(반드시 `--mds-*` 토큰명 표기), 타 컴포넌트 Props 복붙, 정적 스크린샷으로 라이브 프리뷰 대체.

---

## 3. 컴포넌트 문서 표준 템플릿

```mdx
---
title: <한글명> (<ComponentName>)
description: <한 줄 역할 요약>
icon: <LucideIconName>
---

# <한글명> (<ComponentName>)

<컴포넌트의 조형적 근거와 사용 맥락을 1~2문장으로 정의합니다.>

<ComponentPreview name="<ComponentName>" defaultProps={{ ... }} />

## Props 명세

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `...` | `...` | `...` | `...` |

## 사용 규칙 (Do / Don't)

- **Do**: <권장 사용 패턴>
- **Don't**: <지양/금지 패턴>

## 접근성

- <시맨틱 요소, 키보드 조작, 포커스 링 및 ARIA 속성 규격>

## 변경 이력

- **ED. 04 (v0.1.0)**: <주요 변경 또는 기준 ADR 링크>
```

---

## 4. Figma 페이지 구조 규칙

Figma 파일(`Mindulle Design System v0.1.0`)은 아래 4계층 페이지 구조를 유지한다.

1. **`00 · Cover / Index`**: 에디션 표지(`ED. 04`) 및 파일 인덱스
2. **`01 · Foundations`**: Colors(Light/Night 매트릭스), Typography, Spacing(6px baseline), Radius(4px), 2px Stem
3. **`02 · Components`**: 컴포넌트별 프레임 — 내부는 **① Component Set(Variants) · ② Spec & Token Anatomy · ③ Do & Don't** 3섹션으로 고정
4. **`03 · Docs / Specimen Shell`**: 웹 간행물 셸(Running head, Cover, Plates, Colophon) 기준 프레임

---

## 5. 중복·죽은 문서 정리 목록

| 대상 | 사유 | 권장 조치 |
| :--- | :--- | :--- |
| `apps/docs/HERO-SPEC.md` | `MDS-56`에서 `app/page.tsx`가 `MINDULLE SPECIMEN` 표지로 전환되어 구 히어로 규격이 대체됨 | 상단에 `Superseded by MDS-56` 주석 유지 후 아카이브 |
| `docs/CLAUDE_OPUS_MDS_INDEPENDENT_AUDIT_REPORT.md` | 특정 시점(`MDS-25`)의 일회성 감사 보고서 | 삭제하지 않고 이력 스냅샷(`Archive`)으로 유지 |
| `packages/ui/storybook-static/` | 빌드 산출물(구 스텐실/시안 잔재 포함 가능) | 소스 정본 아님 — 배포/검증 시 재빌드 대상 |
