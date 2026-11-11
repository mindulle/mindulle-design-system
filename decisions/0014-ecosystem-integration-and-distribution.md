# ADR 0014: 생태계 역할 분담, 문서 시안 범위 및 미니멀 배포(POSSE) 원칙

- **상태**: 확정 (Accepted)
- **일자**: 2026-11-10
- **연관 결정**: ADR 0013 (민들레 디자인 시스템 리브랜딩)

---

## 1. Context (배경)

민들레 디자인 시스템(MDS) 공식 문서 사이트(`apps/docs`, FumaDocs)의 출범과 함께, 기존 포트폴리오(`sonagi-portfolio`), 블로그(`blog-sonagi-space`), 이력서(CV) 및 대외 배포 채널(RSS, SNS, 뉴스레터) 간의 역할 경계와 시안(Figma) 범위, 그리고 1인 창작자로서 지속 가능한 운영 원칙을 명확히 정립할 필요가 발생했습니다.

---

## 2. Decision (결정)

### 2.1. 4대 핵심 접점의 역할 분담 (Hub & Spoke 아키텍처)

각 플랫폼은 서로의 본질을 침범하지 않고 고유한 역할에만 100% 집중합니다:

1. **`sonagi-portfolio` (관문 & 마스터 쇼룸)**
   - 4막 공간 시네마(3D WebGL), 6대 도구체인 및 대표 프로젝트 전시 공간.
   - 독립된 이력서 페이지를 두지 않고, 엔딩 막(Act 04 Colophon)에 **'아틀리에 장인(The Artisan)'** 요약 소개와 단일 CV 문서 다운로드 링크만 배치합니다.
2. **`blog-sonagi-space` (디지털 정원 / Digital Garden)**
   - 시간순 나열형 블로그에서 벗어나 양방향 지식 그래프(`[[Wikilinks]]`)와 에버그린 노트가 자라나는 사유의 숲으로 운영합니다.
   - 정원사 소개 노트(`[[The Gardener]]`) 및 순수 RSS 피드(`/rss.xml`) 구독 위젯을 포함하며, 디자인 철학 노트에서 MDS 기술 문서로 자연스럽게 연결합니다.
3. **`sonagi-design-system` (`apps/docs` — 공식 기술 명세)**
   - FumaDocs 기반의 단단하고 정갈한 실무 구현 스펙(2px True Stem, W3C 토큰 매트릭스, 16종 컴포넌트 API) 전담 포털.
4. **`Curriculum Vitae` (단일 이력서 문서)**
   - 웹사이트 UI 내 무거운 경력 나열 페이지를 배제하고, 정갈하게 조판된 단일 PDF/문서로만 관리하여 채용·협업 시에만 링크로 제공합니다.

---

### 2.2. 디자인 시안(Figma) 범위 제한 원칙

- **문서 사이트 전체 페이지 시안화 금지**: 수십 개의 컴포넌트 API 상세 페이지와 마크다운 본문을 Figma에 일일이 그리는 안티패턴을 배제합니다.
- **대표 템플릿(Docs Shell) 2장 한정 시안화**:
  1. 문서 랜딩 홈 (`Landing Home`) 1장
  2. 문서 뷰어 공통 셸 (`Docs Shell Layout` — 헤더, 사이드바, 2px Stem 프로즈, TOC 그리드) 1장
- 헤더 내비게이션과 파비콘 스케일 대응을 위해 `MindulleLogo` 벡터 심볼을 2px Stem 규격에 맞춰 정밀 보정합니다.

---

### 2.3. 1인 창작자 지속 가능 배포 원칙 (POSSE & Zero-Effort)

1. **뉴스레터 수동 작성 금지 (Commitment Debt 차단)**
   - 정기 뉴스레터 발행이라는 심리적 부채와 마감 압박을 원천 차단합니다.
   - 이메일 구독이 필요할 경우 별도 뉴스레터 작성 없이 블로그의 `/rss.xml`을 활용한 **RSS-to-Email(Buttondown 등)** 자동 전송 방식만 채택합니다.
2. **POSSE 원칙 (Publish on Own Site, Syndicate Elsewhere)**
   - 모든 글과 작업물의 원본(SSOT)은 내 디지털 정원 및 포트폴리오에 먼저 발행합니다.
   - SNS(X, Threads, LinkedIn 등)는 타임라인 소모 없이, 완성된 작업물/노트가 출하되었을 때 핵심 요약과 원본 링크를 던져두는 **전시용 확성기**로만 활용합니다.

---

## 3. 실행 등록 현황 (Plane)

- **`MDS-24`**: `[Figma] Docs Shell Template (랜딩/문서뷰어 2장) 시안 배치 및 민들레 로고 벡터 보정`
- **`BLOG-3`**: `[Digital Garden] 블로그를 디지털 정원으로 전환 & RSS 피드 구독 컴포넌트 추가`
- **`PORT-14`**: `[Portfolio] Act 04 Colophon 섹션 제작자(The Artisan) 소개 및 CV(이력서) 다운로드 링크 배치`
