# Mindulle Graphic Motif System

> MDS-28 · Mindulle 브랜드 접점 확장 규격

## 1. 로고 구조 분석

Mindulle 마스터 심볼은 **비대칭 돛 곡선**, **황금 씨앗**, **2px 중심축**의 세 요소로 분해된다.

| 모듈        | 조형 규칙                                            | 의미                  | 최소 사용 단위 |
| ----------- | ---------------------------------------------------- | --------------------- | -------------- |
| Sail Curve  | 좌우 대칭을 피한 3차 베지어, 끝점은 진행 방향을 향함 | 겨울 끝의 바람과 이동 | 24px           |
| Golden Seed | 중심 원 + 3방향 방사선, `#ffd166` 계열               | 작은 시작, 생명력     | 8px            |
| Axis        | 화면 좌표에 스냅된 정확한 2px 중심축                 | 도구의 신뢰와 방향성  | 16px           |

모티프는 로고를 장식적으로 복제하지 않는다. **축은 구조를 세우고, 곡선은 시선을 운반하며, 씨앗은 도착점을 표시한다.**

## 2. 세 가지 모티프

### A. Sail Arc — 흐름

한 개의 비대칭 돛 곡선을 8px 그리드에 배치한다. Docs의 섹션 구분선, Portfolio 히어로의 스크롤 경로, 인쇄물의 가장자리 패턴에 사용한다.

- stroke: `2px`, round cap/join
- 반복 간격: `64px` 이상
- 회전: 0°, 90°, 180°만 허용
- 허용 색: `border-strong`, `brand-accent`, `golden-seed`

### B. Seed Orbit — 집중

황금 씨앗을 중심으로 3개의 짧은 방사선을 배치한다. 카드의 메타데이터, 빈 상태의 회복 신호, CTA의 완료 상태에 사용한다.

- core diameter: 8–12px
- ray length: core diameter × 2
- 선은 항상 2px, 점은 면으로 처리
- 화면당 한 번만 강한 골드로 사용

### C. Axis Frame — 구조

2px 중심축과 짧은 수평 베이스를 결합한 프레임이다. 카드의 좌측 인덱스, 문서의 빈 상태, 포스터의 재단선에 사용한다.

- axis: `2px solid`
- baseline: `2px solid`, 길이 24–96px
- 코너는 4px Weathered Radius
- 그림자와 그라디언트 금지

## 3. 접점 확장

| 접점              | 적용 모티프             | 운용 원칙                                       |
| ----------------- | ----------------------- | ----------------------------------------------- |
| Figma Foundations | 세 모티프 + 구조 분해   | 2px 선과 토큰 바인딩을 한 보드에서 검증         |
| Docs              | Axis Frame + Seed Orbit | 구분선은 구조적으로 다른 블록 사이에만 사용     |
| Portfolio Hero    | Sail Arc                | 제목의 시선 흐름을 방해하지 않는 저대비 배경    |
| Project Cards     | Seed Orbit + Axis Frame | 카드마다 한 모티프, 중첩 카드 금지              |
| 인쇄물            | Sail Arc 타일           | 3mm 도련 안쪽에 패턴을 두고 로고 안전 여백 유지 |
| 모션              | Sail Arc → Seed Orbit   | 곡선이 먼저 그려지고 씨앗이 85% 지점에서 안착   |

## 4. 모션 전환

`Sail Arc`를 트랙 매트로 사용한다. 0–65% 구간에서 2px 선을 그린 뒤, 65–85% 구간에서 씨앗이 scale 0.8→1.0으로 안착한다. 전체 전환은 250ms를 넘기지 않으며, `prefers-reduced-motion`에서는 정지 프레임으로 대체한다.

```text
Sail Arc draw ────────────────┐
                              ├─ Seed settle → next scene
Axis remains                  ┘
```
