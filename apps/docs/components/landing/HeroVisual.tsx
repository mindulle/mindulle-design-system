import React from 'react';
import Link from 'next/link';
import { Button } from '@mindulle/ui';

/**
 * MDS-51 Carbon-Density 2:1 Asymmetric Modular Workbench:
 * Left 2/3 (Typography & Real-Scale UI Specimen) + Right 1/3 (<=15% Botanical Monoline Spot).
 */
export function HeroVisual() {
  return (
    <div
      className="relative w-full rounded-sm border border-fd-border bg-fd-card p-6 sm:p-7 text-left"
      aria-label="Mindulle Design System 2:1 Asymmetric Editorial Specimen Workbench"
    >
      {/* Top Workbench Chrome */}
      <div className="flex items-center justify-between border-b border-fd-border pb-3.5 mb-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full border border-fd-foreground/60" />
            <span className="size-2 rounded-full border border-fd-foreground/60" />
            <span className="size-2 rounded-full border border-brand-primary" />
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-fd-muted-foreground ml-2">
            WORKBENCH · EDITORIAL SPECIMEN
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-widest uppercase text-brand-primary">
          MDS-51 · 2:1 MODULAR
        </span>
      </div>

      {/* 2:1 Asymmetric Modular Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left 2/3: Typography & Real-Scale UI Specimen */}
        <div className="md:col-span-8 rounded-sm border border-fd-border bg-fd-background/50 p-6 sm:p-8 flex flex-col justify-between gap-8">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] font-semibold tracking-wider text-brand-primary">
              01 · TYPOGRAPHY &amp; UI SPECIMEN
            </span>
            <span className="font-mono text-[11px] text-fd-muted-foreground">
              W3C DTCG · REACT 19
            </span>
          </div>

          {/* Block A: Editorial Type & Hairline Token Specimen */}
          <div className="border-b border-fd-border pb-6 flex flex-col gap-3">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="font-cinematic text-4xl sm:text-5xl font-bold tracking-tight text-fd-foreground leading-none">
                가Aa
              </span>
              <span className="font-editorial text-base sm:text-lg text-fd-muted-foreground break-keep">
                한국어 에디토리얼 조판과 1px 모노라인
              </span>
            </div>
            <p className="font-mono text-[11px] text-fd-muted-foreground">
              Display 64px · Body 16px (1.65) · --mds-bg-base · --mds-brand-primary
            </p>
          </div>

          {/* Block B: Real-Scale UI Primitives on Open Space */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/docs/components/button">
                <Button size="md" variant="primary" className="font-semibold">
                  Primary Action
                </Button>
              </Link>
              <Link href="/docs/foundations/colors">
                <Button size="md" variant="secondary">
                  Semantic Tokens
                </Button>
              </Link>
            </div>

            <nav
              aria-label="Specimen preview tabs"
              className="flex items-center gap-5 font-mono text-xs"
            >
              <Link
                href="/docs"
                className="border-b-2 border-brand-primary pb-1.5 font-semibold text-brand-primary"
              >
                Overview
              </Link>
              <Link
                href="/docs/foundations/colors"
                className="pb-1.5 text-fd-muted-foreground hover:text-fd-foreground transition-colors"
              >
                Tokens
              </Link>
              <Link
                href="/docs/components/button"
                className="pb-1.5 text-fd-muted-foreground hover:text-fd-foreground transition-colors"
              >
                A11y
              </Link>
            </nav>
          </div>
        </div>

        {/* Right 1/3: <=15% Botanical Monoline Spot */}
        <div className="md:col-span-4 rounded-sm border border-fd-border bg-fd-background/50 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold text-fd-foreground">
              02 · MOTIF
            </span>
            <span className="font-mono text-[11px] text-brand-primary">85:15 RULE</span>
          </div>

          <div className="flex items-center justify-center py-3">
            <svg
              viewBox="0 0 90 110"
              className="w-[116px] sm:w-[132px] h-auto text-fd-foreground"
              fill="none"
              aria-hidden="true"
            >
              <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
                <path d="M 46 102 C 44 82, 47 64, 50 46" stroke="currentColor" />
                <path
                  d="M 46 102 C 36 96, 30 90, 26 82 C 34 86, 40 94, 46 102 Z"
                  stroke="currentColor"
                />
                <circle cx="50" cy="42" r="4" className="stroke-brand-primary" />
                <line x1="50" y1="38" x2="50" y2="16" stroke="currentColor" />
                <path d="M 46 20 L 50 16 L 54 20" stroke="currentColor" />
                <line x1="53" y1="39" x2="69" y2="23" stroke="currentColor" />
                <line x1="54" y1="42" x2="76" y2="42" stroke="currentColor" />
                <line x1="53" y1="45" x2="69" y2="61" stroke="currentColor" />
                <line x1="47" y1="45" x2="31" y2="61" stroke="currentColor" />
                <line x1="46" y1="42" x2="24" y2="42" stroke="currentColor" />
                <line x1="47" y1="39" x2="31" y2="23" stroke="currentColor" />
                <g className="stroke-brand-primary">
                  <line x1="28" y1="14" x2="22" y2="20" />
                  <circle cx="21" cy="21" r="1.2" />
                </g>
              </g>
            </svg>
          </div>

          <div className="flex items-center justify-between border-t border-fd-border pt-3.5 font-mono text-[11px]">
            <span className="text-fd-muted-foreground">1px Monoline</span>
            <Link
              href="/docs/brand"
              className="font-medium text-brand-primary hover:underline"
            >
              /docs/brand →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
