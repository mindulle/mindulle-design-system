'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Badge,
  Input,
  Checkbox,
  Radio,
  Card,
  Avatar,
  Pagination,
  MindulleLogo,
  SonagiLogo,
} from '@mindulle/ui';

export function PlatesCatalogue() {
  const [page, setPage] = useState(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[var(--color-fd-border)] border border-[var(--color-fd-border)]">
      {/* PL. 01 */}
      <div className="bg-[var(--color-fd-background)] flex flex-col">
        <div className="bg-[var(--color-fd-muted)] h-[180px] grid place-items-center relative p-6">
          <span className="absolute top-3 left-3.5 font-mono text-[9.5px] tracking-[0.1em] text-[var(--color-fd-muted-foreground)]">
            PL. 01
          </span>
          <Button variant="primary" size="md">
            Primary action
          </Button>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between gap-2">
          <div>
            <b className="block text-[13.5px] font-semibold mb-1">유일한 채움면</b>
            <span className="font-mono text-[10px] text-[var(--color-fd-muted-foreground)]">
              Button · variant=&quot;primary&quot; · radius 4
            </span>
          </div>
          <Link
            href="/docs/components/button"
            className="font-mono text-[10px] text-[var(--mds-color-brand-primary)] underline underline-offset-4"
          >
            Spec →
          </Link>
        </div>
      </div>

      {/* PL. 02 */}
      <div className="bg-[var(--color-fd-background)] flex flex-col">
        <div className="bg-[var(--color-fd-muted)] h-[180px] grid place-items-center relative p-6">
          <span className="absolute top-3 left-3.5 font-mono text-[9.5px] tracking-[0.1em] text-[var(--color-fd-muted-foreground)]">
            PL. 02
          </span>
          <div className="flex gap-2">
            <Button variant="secondary" size="md">
              Secondary
            </Button>
            <Button variant="danger" size="md">
              Danger
            </Button>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between gap-2">
          <div>
            <b className="block text-[13.5px] font-semibold mb-1">되돌릴 수 있는 행동과 경고</b>
            <span className="font-mono text-[10px] text-[var(--color-fd-muted-foreground)]">
              Button · 2px stem · semantic danger
            </span>
          </div>
          <Link
            href="/docs/components/button"
            className="font-mono text-[10px] text-[var(--mds-color-brand-primary)] underline underline-offset-4"
          >
            Spec →
          </Link>
        </div>
      </div>

      {/* PL. 03 */}
      <div className="bg-[var(--color-fd-background)] flex flex-col">
        <div className="bg-[var(--color-fd-muted)] h-[180px] grid place-items-center relative p-6">
          <span className="absolute top-3 left-3.5 font-mono text-[9.5px] tracking-[0.1em] text-[var(--color-fd-muted-foreground)]">
            PL. 03
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="pill" color="info">
              INFO
            </Badge>
            <Badge variant="pill" color="success">
              ACTIVE
            </Badge>
            <Badge variant="pill" color="warning">
              REVIEW
            </Badge>
            <Badge variant="label" color="danger">
              DEPRECATED
            </Badge>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between gap-2">
          <div>
            <b className="block text-[13.5px] font-semibold mb-1">행동이 아닌 상태의 표식</b>
            <span className="font-mono text-[10px] text-[var(--color-fd-muted-foreground)]">
              Badge · pill (status) · label (tag)
            </span>
          </div>
          <Link
            href="/docs/components/badge"
            className="font-mono text-[10px] text-[var(--mds-color-brand-primary)] underline underline-offset-4"
          >
            Spec →
          </Link>
        </div>
      </div>

      {/* PL. 04 */}
      <div className="bg-[var(--color-fd-background)] flex flex-col">
        <div className="bg-[var(--color-fd-muted)] h-[180px] grid place-items-center relative p-6">
          <span className="absolute top-3 left-3.5 font-mono text-[9.5px] tracking-[0.1em] text-[var(--color-fd-muted-foreground)]">
            PL. 04
          </span>
          <div className="w-full max-w-[240px]">
            <Input aria-label="Token key" defaultValue="--mds-color-brand-primary" readOnly />
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between gap-2">
          <div>
            <b className="block text-[13.5px] font-semibold mb-1">그림자 없이 선으로 구획된 입력</b>
            <span className="font-mono text-[10px] text-[var(--color-fd-muted-foreground)]">
              Input · 2px border · 4px radius
            </span>
          </div>
          <Link
            href="/docs/components/input"
            className="font-mono text-[10px] text-[var(--mds-color-brand-primary)] underline underline-offset-4"
          >
            Spec →
          </Link>
        </div>
      </div>

      {/* PL. 05 */}
      <div className="bg-[var(--color-fd-background)] flex flex-col">
        <div className="bg-[var(--color-fd-muted)] h-[180px] grid place-items-center relative p-6">
          <span className="absolute top-3 left-3.5 font-mono text-[9.5px] tracking-[0.1em] text-[var(--color-fd-muted-foreground)]">
            PL. 05
          </span>
          <div className="space-y-2.5">
            <Checkbox label="2px 획 기준 통과" defaultChecked readOnly />
            <Radio name="plate-radio" label="매거진 아키타입" defaultChecked readOnly />
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between gap-2">
          <div>
            <b className="block text-[13.5px] font-semibold mb-1">복수 선택과 배타 선택의 시각 문법</b>
            <span className="font-mono text-[10px] text-[var(--color-fd-muted-foreground)]">
              Checkbox · Radio · 4px vs full
            </span>
          </div>
          <Link
            href="/docs/components/checkbox"
            className="font-mono text-[10px] text-[var(--mds-color-brand-primary)] underline underline-offset-4"
          >
            Spec →
          </Link>
        </div>
      </div>

      {/* PL. 06 */}
      <div className="bg-[var(--color-fd-background)] flex flex-col">
        <div className="bg-[var(--color-fd-muted)] h-[180px] grid place-items-center relative p-6">
          <span className="absolute top-3 left-3.5 font-mono text-[9.5px] tracking-[0.1em] text-[var(--color-fd-muted-foreground)]">
            PL. 06
          </span>
          <Card elevation="flat" className="w-full max-w-[230px]">
            <span className="font-mono text-[10px] text-[var(--mds-color-brand-primary)]">
              FLAT SURFACE
            </span>
            <span className="text-[13px] font-medium">선으로만 층위를 만든다</span>
          </Card>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between gap-2">
          <div>
            <b className="block text-[13.5px] font-semibold mb-1">블러 섀도우 없는 평면 위계</b>
            <span className="font-mono text-[10px] text-[var(--color-fd-muted-foreground)]">
              Card · elevation=&quot;flat&quot; · border-2
            </span>
          </div>
          <Link
            href="/docs/components/card"
            className="font-mono text-[10px] text-[var(--mds-color-brand-primary)] underline underline-offset-4"
          >
            Spec →
          </Link>
        </div>
      </div>

      {/* PL. 07 */}
      <div className="bg-[var(--color-fd-background)] flex flex-col">
        <div className="bg-[var(--color-fd-muted)] h-[180px] grid place-items-center relative p-6">
          <span className="absolute top-3 left-3.5 font-mono text-[9.5px] tracking-[0.1em] text-[var(--color-fd-muted-foreground)]">
            PL. 07
          </span>
          <div className="flex items-center gap-4">
            <Avatar initials="MD" size="md" />
            <Avatar initials="SG" size="lg" />
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between gap-2">
          <div>
            <b className="block text-[13.5px] font-semibold mb-1">이미지 유실 시 이니셜 폴백</b>
            <span className="font-mono text-[10px] text-[var(--color-fd-muted-foreground)]">
              Avatar · md / lg · 2px frame
            </span>
          </div>
          <Link
            href="/docs/components/avatar"
            className="font-mono text-[10px] text-[var(--mds-color-brand-primary)] underline underline-offset-4"
          >
            Spec →
          </Link>
        </div>
      </div>

      {/* PL. 08 */}
      <div className="bg-[var(--color-fd-background)] flex flex-col">
        <div className="bg-[var(--color-fd-muted)] h-[180px] grid place-items-center relative p-6">
          <span className="absolute top-3 left-3.5 font-mono text-[9.5px] tracking-[0.1em] text-[var(--color-fd-muted-foreground)]">
            PL. 08
          </span>
          <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between gap-2">
          <div>
            <b className="block text-[13.5px] font-semibold mb-1">판면 번호 이동 장치</b>
            <span className="font-mono text-[10px] text-[var(--color-fd-muted-foreground)]">
              Pagination · tabular-nums
            </span>
          </div>
          <Link
            href="/docs/components/pagination"
            className="font-mono text-[10px] text-[var(--mds-color-brand-primary)] underline underline-offset-4"
          >
            Spec →
          </Link>
        </div>
      </div>

      {/* PL. 09 */}
      <div className="bg-[var(--color-fd-background)] flex flex-col">
        <div className="bg-[var(--color-fd-muted)] h-[180px] grid place-items-center relative p-6">
          <span className="absolute top-3 left-3.5 font-mono text-[9.5px] tracking-[0.1em] text-[var(--color-fd-muted-foreground)]">
            PL. 09
          </span>
          <div className="flex items-center gap-6">
            <MindulleLogo size={40} />
            <SonagiLogo height={30} />
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between gap-2">
          <div>
            <b className="block text-[13.5px] font-semibold mb-1">2px 단일 획 브랜드 마크</b>
            <span className="font-mono text-[10px] text-[var(--color-fd-muted-foreground)]">
              MindulleLogo · SonagiLogo
            </span>
          </div>
          <Link
            href="/docs/components/mindulle-logo"
            className="font-mono text-[10px] text-[var(--mds-color-brand-primary)] underline underline-offset-4"
          >
            Spec →
          </Link>
        </div>
      </div>
    </div>
  );
}
