# ARCHIVE: apps/portal

이 브랜치는 **삭제된 `apps/portal`을 보존**하기 위한 것입니다. `main`에서는 제거됐습니다.

## 왜 옮겼나

디자인 시스템 저장소는 시스템(토큰·컴포넌트·문서)을 담는 곳이고, `apps/portal`은 그 시스템을 소비하는 **브랜드 쇼룸 SPA**였습니다.

- 크기 49M, 3D HeroScene 포함
- 배포는 독립 사이트가 아니라 `apps/docs/out/exhibition/`로 복사되는 **미링크 서브패스**
- 코드 레벨 `#D97706` 리터럴 10곳, `shadow-2xl`, `bg-[#...]` 임의값 — 시스템 규칙 위반이 시스템 저장소에서 집계됨

## 무엇이 들어 있나

- `apps/portal` 전체 (React + Vite, 147 tracked files)
- `apps/portal/public/brand` 74개 중 64개는 `packages/brand-assets`에 없는 **고유 자산**
  - `concept1-*` / `concept2-*` / `concept3-*` — CEO-1183 시안 A/B/C (크리스탈·렌즈·헤리티지)
  - `bi-icons`, 소셜 카드, 모바일 아트보드
- `.github/workflows/deploy-portal.yml`

## 되살리는 방법

```bash
git checkout archive/portal -- apps/portal .github/workflows/deploy-portal.yml
```

또는 별도 저장소로 분리:

```bash
git worktree add ../showroom archive/portal
```

## 참고

- 제거 커밋: `f12a3fb` (main)
- 보존 기준 커밋: `fe62383`
- 제거일: 2026-11-20
- 관련 결정: llm-wiki `00_System/DECISION_LEDGER.md` L-022 (저장소 경계)
