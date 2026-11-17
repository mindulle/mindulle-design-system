import React from 'react';
import Link from 'next/link';

/**
 * MDS-39 F-Plan Hero Graphic:
 * 1px Monoline UI Wireframe + Pure 1px Botanical Dandelion Line Art.
 * Uses semantic tokens so Light (#FBF9F5 / #161616 / #D97706) & Dark modes adapt automatically.
 */
export function HeroVisual() {
  return (
    <div
      className="relative w-full rounded-sm border border-fd-border bg-fd-card p-5 text-left"
      aria-label="Mindulle Design System F-Plan Monoline UI Wireframe"
    >
      {/* Top Wireframe Chrome */}
      <div className="flex items-center justify-between border-b border-fd-border pb-3 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full border border-fd-foreground/60" />
          <span className="size-2 rounded-full border border-fd-foreground/60" />
          <span className="size-2 rounded-full border border-brand-primary" />
        </div>
        <span className="font-mono text-[10px] tracking-widest uppercase text-fd-muted-foreground">
          MDS-39 · F-PLAN
        </span>
      </div>

      {/* Split Wireframe Body: Left Token Stack + Right 1px Monoline Dandelion */}
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-7 flex flex-col gap-2.5">
          <div className="rounded-sm border border-fd-border p-3">
            <div className="font-mono text-[10px] text-brand-primary mb-1">01 · TOKENS</div>
            <div className="h-1.5 w-4/5 border-b border-fd-foreground/30 mb-1.5" />
            <div className="h-1.5 w-3/5 border-b border-fd-foreground/20" />
          </div>
          <div className="rounded-sm border border-fd-border p-3">
            <div className="font-mono text-[10px] text-fd-muted-foreground mb-1">02 · 22 COMPONENTS</div>
            <div className="h-1.5 w-11/12 border-b border-fd-foreground/30 mb-1.5" />
            <div className="h-1.5 w-2/3 border-b border-fd-foreground/20" />
          </div>
          <div className="rounded-sm border border-brand-primary/60 p-3">
            <div className="font-mono text-[10px] text-brand-primary mb-1">03 · 1PX MONOLINE</div>
            <div className="h-1.5 w-3/4 border-b border-brand-primary/50" />
          </div>
        </div>

        {/* Pure 1px Botanical Monoline Dandelion */}
        <div className="col-span-5 flex items-center justify-center">
          <svg
            viewBox="0 0 140 180"
            className="w-full max-w-[140px] h-auto text-fd-foreground"
            fill="none"
            aria-hidden="true"
          >
            <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
              {/* Stem & basal leaves */}
              <path
                d="M 70 166 C 68 134, 72 108, 76 78"
                stroke="currentColor"
              />
              <path
                d="M 70 166 C 54 156, 44 146, 38 134 C 50 140, 60 152, 70 166 Z"
                stroke="currentColor"
              />
              <path
                d="M 70 166 C 84 158, 96 148, 102 136 C 90 144, 80 154, 70 166 Z"
                stroke="currentColor"
              />

              {/* Gold Seed Center (<= 15% accent) */}
              <circle cx="76" cy="74" r="5" className="stroke-brand-primary" />

              {/* Radial Pappus Rays */}
              <line x1="76" y1="69" x2="76" y2="34" stroke="currentColor" />
              <path d="M 70 39 L 76 34 L 82 39" stroke="currentColor" />

              <line x1="79" y1="70" x2="103" y2="45" stroke="currentColor" />
              <path d="M 96 45 L 103 45 L 103 52" stroke="currentColor" />

              <line x1="81" y1="74" x2="116" y2="74" stroke="currentColor" />
              <path d="M 111 68 L 116 74 L 111 80" stroke="currentColor" />

              <line x1="79" y1="78" x2="103" y2="103" stroke="currentColor" />
              <path d="M 103 96 L 103 103 L 96 103" stroke="currentColor" />

              <line x1="73" y1="78" x2="49" y2="103" stroke="currentColor" />
              <path d="M 56 103 L 49 103 L 49 96" stroke="currentColor" />

              <line x1="71" y1="74" x2="36" y2="74" stroke="currentColor" />
              <path d="M 41 80 L 36 74 L 41 68" stroke="currentColor" />

              <line x1="73" y1="70" x2="49" y2="45" stroke="currentColor" />
              <path d="M 49 52 L 49 45 L 56 45" stroke="currentColor" />

              {/* Drifting Golden Seeds */}
              <g className="stroke-brand-primary">
                <line x1="44" y1="28" x2="35" y2="37" />
                <path d="M 39 25 L 44 28 L 47 33" />
                <circle cx="34" cy="38" r="1.4" />

                <line x1="112" y1="26" x2="104" y2="35" />
                <path d="M 107 23 L 112 26 L 115 31" />
                <circle cx="103" cy="36" r="1.4" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom 4-Card Quick Links */}
      <div className="mt-4 pt-3 border-t border-fd-border grid grid-cols-4 gap-2">
        {[
          { label: 'Tokens', href: '/docs/foundations/colors' },
          { label: '22 UI', href: '/docs/components/button' },
          { label: 'Brand', href: '/docs/brand' },
          { label: 'Visual QA', href: '/docs/portfolio/visual-qa' },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-sm border border-fd-border px-2 py-2 text-center font-mono text-[10px] text-fd-muted-foreground hover:border-brand-primary hover:text-brand-primary transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
