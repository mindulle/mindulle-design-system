/**
 * Badge 대비 가드.
 *
 * MDS-76(구 이슈)은 "야간판 Badge label+danger 대비 저하"를 지적했지만, 2026-11-24 실측에서는
 * 라이트 최저 4.82:1( success ), 다크 최저 7.18:1( info )로 전 조합이 AA를 넘었다. 즉 그 사이
 * 토큰이 바뀌어 재현되지 않는다.
 *
 * 그래도 같은 종류의 회귀가 조용히 들어오지 않도록, **소스 토큰**(`packages/tokens/tokens`)에서
 * 값을 해석해 대비를 계산하고 4.5:1 미만이면 실패시킨다. 배포물(dist)에 의존하지 않으므로
 * 빌드 전에도 돈다.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const TOKENS = join(__dirname, '../../../../../tokens/tokens');
const MIN_CONTRAST = 4.5;
const PAIRS = ['info', 'success', 'warning', 'danger', 'error'] as const;

type Leaf = { $value: string };
type Tree = { [key: string]: Leaf | Tree };

function load(file: string): Tree {
  return JSON.parse(readFileSync(join(TOKENS, file), 'utf8')) as Tree;
}

const primitives = load('primitives.json');
const semantics = load('semantics.json');

function at(tree: Tree, path: string): unknown {
  let node: unknown = tree;
  for (const part of path.split('.')) {
    if (typeof node !== 'object' || node === null) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return node;
}

/** 참조는 문서 두 개를 넘나든다: `primitive.*`는 primitives.json, 나머지는 semantics.json. */
function resolve(path: string, depth = 0): string {
  if (depth > 12) throw new Error(`참조 순환: ${path}`);
  const tree = path.startsWith('primitive.') ? primitives : semantics;
  const leaf = at(tree, path) as Leaf | undefined;
  if (!leaf || typeof leaf.$value !== 'string') throw new Error(`토큰 없음: ${path}`);
  const value = leaf.$value.trim();
  const alias = /^\{(.+)\}$/.exec(value);
  if (!alias) return value;
  return resolve(alias[1], depth + 1);
}

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const body = hex.replace('#', '').slice(0, 6);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(body.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe('Badge 색 대비', () => {
  for (const theme of ['light', 'dark'] as const) {
    for (const variant of PAIRS) {
      it(`${theme} · ${variant}: 텍스트가 배경에서 AA(4.5:1)를 넘는다`, () => {
        const base = `semantic.${theme}.color.state.${variant}`;
        const text = resolve(base);
        const background = resolve(`${base}-bg`);
        const ratio = contrast(text, background);

        // 실패하면 숫자를 메시지에 남긴다 — 어느 조합이 얼마나 모자란지 바로 보이게.
        expect(ratio, `${base} ${text} on ${background} = ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(
          MIN_CONTRAST
        );
      });
    }
  }
});
