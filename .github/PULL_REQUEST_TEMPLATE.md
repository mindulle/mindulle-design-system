<!--
  제목 규칙: `type(scope): 요약 (MDS-00)` — Plane 식별자를 제목에 포함한다.
  식별자가 없으면 결정 코퍼스(collect_corpus.py)가 이 PR을 이슈와 연결하지 못한다.
-->

## 🔗 Plane

<!--
  대괄호 필수: Plane이 이 형식만 PR 상태 자동화(열림/머지)로 인식한다.
  제목은 conventional commits를 지키고, 자동화는 이 줄이 담당한다.
  모르면 Backlog에서 찾아 적는다. 임의 번호를 만들지 말 것.
-->

Plane: [MDS-00]

## 📌 Description

<!-- PR의 목적과 주요 변경 사항을 요약해 주세요. -->

## 🛠️ Changes

<!-- 세부 변경 사항을 목록으로 작성해 주세요. -->

- [ ]
- [ ]

## 🎨 Figma Reference

<!-- Figma 시안 또는 디자인 시스템 컴포넌트 링크 (Design-to-Code 싱크 확인용) -->

- **Figma Link:**

## 🧪 Testing

- [ ] `pnpm build` 통과
- [ ] `pnpm run lint` 통과
- [ ] 시각 변경이면 `test:visual` 통과 (베이스라인 갱신 시 사유 명시, L-023)

## 🎨 Token

<!-- 토큰을 새로 만들었거나 스케일을 확장했다면 전부 체크한다. -->

- [ ] `primitives.json` 수정 후 `pnpm --filter @mindulle/tokens build` 실행
- [ ] Figma Variables 동기화 완료
- [ ] `pnpm run tokens:map`으로 매핑표 재생성
- [ ] 원장 L-011에 사유 기록

## ⚖️ Rule Check

<!-- 결정 원장(llm-wiki/00_System/DECISION_LEDGER.md)과 어긋나는 부분이 있으면 적는다. -->

- 위반/예외 항목 (L-###):
