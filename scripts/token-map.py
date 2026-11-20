#!/usr/bin/env python3
"""Regenerate docs/token-mapping.md from the current code.

Figma Variables only carry values that are already tokens; values invented in a
comp (18px, 26px, 38ch) need a decision. That decision lives in
docs/token-decisions.json and is merged into the table here, so regenerating
never erases a decision already made.

Usage: pnpm run tokens:map
"""

from __future__ import annotations

import collections
import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCAN_DIRS = [ROOT / "apps/docs", ROOT / "packages/ui/src"]
OUT = ROOT / "docs/token-mapping.md"
DECISIONS = ROOT / "docs/token-decisions.json"

SPACE = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
RADIUS = {"none": 0, "sm": 4, "base": 6, "md": 8, "lg": 12, "xl": 16}

CATS = {
    "spacing": r"(?<![\w-])(m|mb|mt|mx|my|ml|mr|p|pb|pt|px|py|pl|pr|gap|gap-x|gap-y|space-y)-\[([0-9.]+)px\]",
    "size": r"(?<![\w-])(h|w|min-h|max-h|min-w|max-w|top|left|right|bottom|inset)-\[([0-9.]+)px\]",
    "radius": r"(?<![\w-])rounded(-[a-z]+)?-\[([0-9.]+)px\]",
    "text": r"(?<![\w-])text-\[([0-9.]+)px\]",
}


def scan() -> dict[str, collections.Counter]:
    counts: dict[str, collections.Counter] = {k: collections.Counter() for k in CATS}
    for base in SCAN_DIRS:
        for path in base.rglob("*.tsx"):
            if "node_modules" in path.parts or ".next" in path.parts:
                continue
            text = path.read_text(encoding="utf-8")
            for name, pattern in CATS.items():
                for match in re.finditer(pattern, text):
                    counts[name][float(match.group(match.lastindex))] += 1
    return counts


def snap(value: float) -> tuple[float, float]:
    cand = SPACE if value <= 1 else [t for t in SPACE if t > 0]
    best = min(cand, key=lambda t: abs(t - value))
    return best, value - best


def fmt(value: float) -> str:
    return str(int(value)) if value == int(value) else str(value)


def decision(decisions: dict, section: str, value: float) -> str:
    return decisions.get(section, {}).get(fmt(value), "")


def main() -> int:
    counts = scan()
    decisions = (
        json.loads(DECISIONS.read_text(encoding="utf-8")) if DECISIONS.exists() else {}
    )
    total = sum(sum(c.values()) for c in counts.values())

    lines: list[str] = []
    add = lines.append
    add("# 토큰 매핑표")
    add("")
    add(
        f"`apps/docs`·`packages/ui`에서 **토큰화 대상**인 arbitrary 값 **{total}건**을 성격별로 묶은 표입니다."
    )
    add(
        "린터 기준 전체는 더 많지만, 측정폭(`ch`)·행간(`leading`)·CSS 속성·헤어라인은 "
        "아래 `영구 예외`로 분류해 여기서 세지 않습니다."
    )
    add(
        "4px 그리드 기준으로 가장 가까운 스케일을 제안하고, `결정` 칸은 `docs/token-decisions.json`에서 옵니다."
    )
    add("")
    add(
        "> 이 파일은 생성물입니다. 직접 고치지 말고 `pnpm run tokens:map`으로 다시 만드세요."
    )
    add("")
    add("관련: 결정 원장 **L-011**(토큰 전용), `eslint.config.mjs`(예외 정책)")
    add("")
    add("## 사용법")
    add("")
    add("1. 시안을 받으면 먼저 이 표에서 값을 찾는다.")
    add("2. 있으면 토큰, 없으면 아래 `결정 규칙`으로 처리한다.")
    add(
        "3. 스케일을 확장했다면 `primitives.json`에 추가하고 Figma Variables로 동기화한다."
    )
    add(
        "4. 결정한 내용을 `docs/token-decisions.json`에 적고 `pnpm run tokens:map`을 다시 돌린다."
    )
    add("")
    add("## 1. 여백·패딩·간격")
    add("")
    add("| 값 | 건수 | 가까운 토큰 | 차이 | 제안 | 결정 |")
    add("| --- | --- | --- | --- | --- | --- |")
    for value, count in sorted(counts["spacing"].items(), key=lambda kv: -kv[1]):
        target, delta = snap(value)
        if delta == 0:
            suggestion = "이미 토큰 (유틸리티로 교체)"
        elif abs(delta) <= 2:
            suggestion = f"스냅 → {fmt(target)}px"
        elif count >= 3:
            suggestion = "스케일 확장 검토"
        else:
            suggestion = "예외 유지"
        add(
            f"| {fmt(value)}px | {count} | {fmt(target)}px | {delta:+.0f} | {suggestion} "
            f"| {decision(decisions, 'spacing', value)} |"
        )

    add("")
    add("## 2. 높이·폭·위치")
    add("")
    add("| 값 | 건수 | 성격 추정 | 결정 |")
    add("| --- | --- | --- | --- |")
    for value, count in sorted(counts["size"].items(), key=lambda kv: -kv[1])[:15]:
        add(
            f"| {fmt(value)}px | {count} | 고정 크기·장식 | {decision(decisions, 'size', value)} |"
        )

    add("")
    add("## 3. 라운드")
    add("")
    add("| 값 | 건수 | 가까운 radius | 결정 |")
    add("| --- | --- | --- | --- |")
    for value, count in sorted(counts["radius"].items(), key=lambda kv: -kv[1]):
        name, radius = min(RADIUS.items(), key=lambda kv: abs(kv[1] - value))
        add(
            f"| {fmt(value)}px | {count} | {name}({radius}px) | {decision(decisions, 'radius', value)} |"
        )

    add("")
    add("## 4. 글자 크기 (15px 이상)")
    add("")
    add("| 값 | 건수 | 제안 | 결정 |")
    add("| --- | --- | --- | --- |")
    for value, count in sorted(counts["text"].items(), key=lambda kv: -kv[1]):
        add(
            f"| {fmt(value)}px | {count} | 디스플레이 스케일 결정 필요 | {decision(decisions, 'text', value)} |"
        )

    add("")
    add("## 5. 영구 예외")
    add("")
    add("| 패턴 | 이유 | 예시 |")
    add("| --- | --- | --- |")
    add("| `max-w-[Nch]` | 측정폭 — 글자 수 기준이라 px 토큰 불가 | `max-w-[38ch]` |")
    add("| `leading-[N]` | 디스플레이 행간 광학 보정 | `leading-[0.94]` |")
    add("| `[hyphens:none]` | CSS 전용 속성 | `[hyphens:none]` |")
    add("| `gap-[2px]` | 1px/2px 헤어라인 그리드 (브랜드 2px 규칙) | `gap-[2px]` |")
    add("| `text-[44~78px]` | 디스플레이 스케일 — 히어로 헤딩 | `text-[56px]` |")
    add("")
    add("## 결정 규칙")
    add("")
    add("| 차이 | 처리 |")
    add("| --- | --- |")
    add("| 0px | 토큰 유틸리티로 교체 |")
    add("| ±1~2px | 가까운 토큰으로 **스냅** |")
    add(
        "| ±3px 이상 · 3회 이상 | **스케일 확장** (원장 L-011 기록 + Figma Variables 동기화) |"
    )
    add("| ±3px 이상 · 1~2회 | **예외 유지** (사유를 코드 주석으로) |")
    add("")
    add("## 토큰을 새로 만들 때")
    add("")
    add("```text")
    add("1. packages/tokens/tokens/primitives.json 수정")
    add("2. pnpm --filter @mindulle/tokens build")
    add("3. Figma Variables 동기화")
    add("4. pnpm run tokens:map  (이 표 갱신)")
    add("5. 원장 L-011에 사유 기록")
    add("```")
    add("")
    add("5단계를 건너뛰면 표가 실제 코드와 어긋나고, 그 순간 표는 신뢰를 잃는다.")

    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"token map: {total} arbitrary values -> {OUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
