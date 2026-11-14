# ADR 0016: 브랜딩 스튜디오(mindulle-brand) 독립 및 민들레 정원 신문지 활판 헌법 제정

## 1. Context (배경)

- 기존 `Sonagi Design System(MDS)`은 UI 컴포넌트 라이브러리, 디자인 토큰, 그리고 최상위 브랜드 철학·아이덴티티가 단일 모노레포에 혼재되어 있었습니다.
- 이로 인해 UI 엔지니어링 티켓(버튼, 토큰 빌드, 접근성)과 브랜딩 티켓(철학, 심볼 작도, 지면 연출)이 뒤섞여, AI 에이전트와 작업자가 "지금 부품 라이브러리를 만드는 중인가, 아니면 지면의 서사를 고민하는 중인가?"라는 심각한 인지적 마찰과 정체성 혼선을 겪었습니다.
- 특히 지면 전체를 관통하는 **최상위 스타일 양식(Style Genre & Medium)**이 부재하여, 에이전트들이 "민들레"라는 키워드만 보고 라틴어 학명, 가상 박물관 서식지 씰, 과도한 아르누보 덩굴 모션 등 불필요한 판타지 롤플레잉으로 자의적 덧칠(Drift)을 반복하는 원인이 되었습니다.
- 또한 '소나기(Sonagi)'와 '민들레(Mindulle)'의 위계가 어정쩡하게 타협되어, 헤더에 영문 `S O N A G I` 스텐실 로고가 찍혀 있는 등 대외적인 얼굴에서 극심한 불일치가 발생했습니다.

---

## 2. Decision (결정)

### 2.1. 3-Tier 프로젝트 거버넌스 분리

브랜딩과 디자인 시스템을 물리적으로 분리하여 명확한 검토 위계를 확립합니다:

```
[ Tier 1: BRAND ] mindulle-brand (최상위 아트 디렉터 & 시각 헌법 SSOT)
       │
       ▼
[ Tier 2: MDS ] sonagi-design-system (순수 UI 컴포넌트 & W3C 토큰 공장)
       │
       ▼
[ Tier 3: APPS ] blog-sonagi-space, sonagi-portfolio 등 개별 서비스
```

### 2.2. 민들레와 소나기의 명확한 분리 헌법

- **대외 전면 민들레 (100% Mindulle)**:
  - 창작자 & 스튜디오: **민들레 스튜디오 (Mindulle Atelier)**
  - 대외 공간 & 지면: **민들레 정원 (Mindulle Garden)**
  - 디자인 시스템: **민들레 디자인 시스템 (MDS)**
  - 대외 헤더 로고: `S O N A G I` 스텐실 로고 영구 퇴역 ➔ `M I N D U L L E` 세리프 워드마크 및 민들레 심볼 적용.
- **내부 인프라 소나기 (Sonagi Engine)**:
  - 소나기는 대외 공간 이름으로 억지 연기하지 않고, 무대 뒤에서 묵묵히 돌아가는 백엔드, IaC, CLI, MCP 도구체인(`sonagi-tools`, `sonagi-cli`, `VectorCraft`)의 명칭으로 명확히 국한합니다.

### 2.3. 85:15 조형 헌법 (The 85:15 Rule) 제정

- **85% 시스템 골격**: 신문 브로드시트 그리드, 활판 인쇄술(Letterpress), 1px/2px 실선(The True 2px Stem), 갓 인쇄된 잉크 블랙(`#161616`) & 미색 신문용지(`#FBF9F5`), 클래식 세리프 활자.
- **15% 그래픽 악센트**: 1도 보태니컬 펜 선화 에칭(싹, 씨앗, 깃털, 종결부호 ❦).
- **엄격한 금지 조항**: 전면적 아르누보 덩굴 장식, 가상 박물관 서식지 롤플레잉, 가독성을 해치는 무거운 SVG 텍스처 필터, 소프트 드롭 섀도우 금지.

---

## 3. Consequences (결과 및 영향)

- **장점**:
  - `mindulle-brand` 독립 레포지토리와 Plane `BRAND`, Discord `#mindulle-brand` 채널이 신설되어 브랜드 단일 정본이 세워짐.
  - MDS는 순수 UI 라이브러리 개발에만 온전히 집중할 수 있어 코드베이스가 경량화됨.
  - 블로그(`blog-sonagi-space`)의 파비콘 결함(구형 블루 십자 마크) 및 과도한 롤플레잉이 완전히 제거되고, 읽기 좋은 신문지 활판 지면으로 정렬됨.
- **배포 및 관리**:
  - `@mindulle/brand`는 무리한 v1.0 대신 `v0.1.0`부터 차근차근 버저닝을 진행함.
  - `@mindulle/tokens`에 신문지 시맨틱 변수 5종(`--mds-color-editorial-*`) 공식 반영.

---

## 4. Status

- [x] Plane `BRAND` 프로젝트 개설 및 7대 헌법 과제 등록/완결
- [x] `mindulle-brand` 독립 레포지토리 생성 및 Discord `#mindulle-brand` 채널 개설
- [x] 최상위 시각 정체성 헌법(`VISUAL_IDENTITY_CHARTER.md`) 제정 및 위키 동기화
- [x] `sonagi-design-system` PR #79 머지 및 신문지 토큰(`a39640b`) 배포 완료
- [x] `blog-sonagi-space` 파비콘 및 신문 지면 조판 개편 배포 완료
