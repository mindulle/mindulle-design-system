import React from 'react';
import Link from 'next/link';

/**
 * MDS-39 F-Plan Option A Full-Width Workbench:
 * 1px Monoline 3-Column Spec Workbench + <=15% Corner Botanical Dandelion Spot.
 */
export function HeroVisual() {
  return (
    <div
      className="relative w-full rounded-sm border border-fd-border bg-fd-card p-5 sm:p-6 text-left"
      aria-label="Mindulle Design System F-Plan Full-Width Monoline Workbench"
    >
      {/* Top Workbench Chrome */}
      <div className="flex items-center justify-between border-b border-fd-border pb-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full border border-fd-foreground/60" />
            <span className="size-2 rounded-full border border-fd-foreground/60" />
            <span className="size-2 rounded-full border border-brand-primary" />
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-fd-muted-foreground ml-2">
            WORKBENCH · 1PX MONOLINE EDITORIAL
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-widest uppercase text-brand-primary">
          MDS-39 · F-PLAN
        </span>
      </div>

      {/* 3-Column Full-Width Spec Workbench + <=15% Corner Dandelion Spot */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Col 1: Semantic Tokens */}
        <div className="md:col-span-4 rounded-sm border border-fd-border p-4 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold text-brand-primary">
              01 · SEMANTIC TOKENS
            </span>
            <span className="font-mono text-[10px] text-fd-muted-foreground">W3C DTCG</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between border border-fd-border rounded-sm px-2.5 py-1.5 font-mono text-[10px]">
              <span className="text-fd-foreground">--mds-bg-base</span>
              <span className="text-fd-muted-foreground">#fbfbfa / #12151d</span>
            </div>
            <div className="flex items-center justify-between border border-brand-primary/50 rounded-sm px-2.5 py-1.5 font-mono text-[10px]">
              <span className="text-brand-primary">--mds-brand</span>
              <span className="text-fd-muted-foreground">#9e5a03 / #ffc837</span>
            </div>
          </div>
        </div>

        {/* Col 2: 22 UI Primitives Wireframe */}
        <div className="md:col-span-5 rounded-sm border border-fd-border p-4 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold text-fd-foreground">
              02 · 22 REACT 19 COMPONENTS
            </span>
            <span className="font-mono text-[10px] text-fd-muted-foreground">A11Y · ARIA</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="border border-brand-primary/70 rounded-sm px-2 py-2 text-center font-mono text-[10px] text-brand-primary">
              Button
            </div>
            <div className="border border-fd-border rounded-sm px-2 py-2 text-center font-mono text-[10px] text-fd-foreground">
              Card
            </div>
            <div className="border border-fd-border rounded-sm px-2 py-2 text-center font-mono text-[10px] text-fd-foreground">
              Tabs
            </div>
          </div>
          <div className="h-1.5 w-full border-b border-fd-foreground/20" />
        </div>

        {/* Col 3: <=15% Botanical Monoline Spot + Quick Links */}
        <div className="md:col-span-3 rounded-sm border border-fd-border p-4 flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1.5 min-w-0">
            <span className="font-mono text-[10px] font-semibold text-fd-foreground">
              03 · MOTIF
            </span>
            <span className="font-mono text-[10px] text-fd-muted-foreground leading-snug">
              85:15 Rule
              <br />
              1px Spot
            </span>
          </div>

          <svg
            viewBox="0 0 90 110"
            className="w-[72px] h-auto shrink-0 text-fd-foreground"
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
      </div>

      {/* Bottom 4-Column Quick Links Strip */}
      <div className="mt-4 pt-3 border-t border-fd-border grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: '01 · Tokens', href: '/docs/foundations/colors' },
          { label: '02 · 22 UI', href: '/docs/components/button' },
          { label: '03 · Brand', href: '/docs/brand' },
          { label: '04 · Visual QA', href: '/docs/portfolio/visual-qa' },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-sm border border-fd-border px-3 py-2 text-center font-mono text-[10px] text-fd-muted-foreground hover:border-brand-primary hover:text-brand-primary transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
