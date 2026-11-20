import React from 'react';
import Link from 'next/link';
import { NightEditionToggle } from './NightEditionToggle';

export type SpecimenSection = 'specimen' | 'rules' | 'plates' | 'errata' | 'docs';

interface SpecimenShellProps {
  active?: SpecimenSection;
  children: React.ReactNode;
}

const NAV_ITEMS: { key: SpecimenSection; label: string; href: string }[] = [
  { key: 'specimen', label: 'Specimen', href: '/' },
  { key: 'rules', label: 'Rules', href: '/rules' },
  { key: 'plates', label: 'Plates', href: '/plates' },
  { key: 'errata', label: 'Errata', href: '/errata' },
  { key: 'docs', label: 'Docs', href: '/docs' },
];

export function SpecimenShell({ active = 'specimen', children }: SpecimenShellProps) {
  return (
    <div className="min-h-screen bg-[var(--color-fd-background)] text-[var(--color-fd-foreground)] font-sans-ui selection:bg-[var(--mds-color-brand-primary)] selection:text-[var(--color-fd-primary-foreground)]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-[56px] pt-6 sm:pt-[34px]">
        {/* Top strip: magazine issue line, left aligned */}
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-[var(--color-fd-border)] pb-[11px]">
          <Link href="/" className="flex items-baseline gap-3.5 no-underline group">
            <span className="font-mono text-2xs tracking-wider text-[var(--mds-color-brand-primary)] font-semibold">
              ED. 04
            </span>
            <span className="text-xs-tight tracking-wide text-[var(--mds-color-text-secondary)] group-hover:text-[var(--color-fd-foreground)] transition-colors">
              Mindulle Specimen · v0.1.0 · Nov 2026
            </span>
          </Link>

          <nav aria-label="Primary periodical navigation" className="flex flex-wrap items-center gap-4 sm:gap-[22px] text-xs-tight">
            {NAV_ITEMS.map((item) => {
              const isActive = item.key === active;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={
                    isActive
                      ? 'font-semibold text-[var(--color-fd-foreground)] no-underline'
                      : 'text-[var(--mds-color-text-secondary)] hover:text-[var(--color-fd-foreground)] no-underline transition-colors'
                  }
                >
                  {item.label}
                </Link>
              );
            })}
            <span className="text-[var(--color-fd-border)]" aria-hidden="true">
              |
            </span>
            <NightEditionToggle />
          </nav>
        </header>

        <main>{children}</main>

        {/* Colophon + 2-part Folio */}
        <footer
          id="colophon"
          className="mt-9 border-t-2 border-[var(--color-fd-foreground)] pt-[22px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-8 md:gap-9 pb-[18px]">
            <div>
              <h4 className="font-mono text-3xs tracking-label uppercase text-[var(--color-fd-muted-foreground)] mb-[9px] font-semibold">
                Colophon
              </h4>
              <p className="text-xs-tight leading-[1.65] text-[var(--mds-color-text-secondary)] m-0 break-keep">
                Cormorant Garamond · Noto Serif KR · Pretendard · 6px baseline. Tokens published as
                W3C DTCG. React 19, TypeScript, CSS custom properties.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-3xs tracking-label uppercase text-[var(--color-fd-muted-foreground)] mb-[9px] font-semibold">
                Correspondence
              </h4>
              <p className="text-xs-tight leading-[1.65] text-[var(--mds-color-text-secondary)] m-0 break-keep">
                결정과 번복은 공개 기록에 남는다.{' '}
                <Link
                  href="/errata"
                  className="text-[var(--color-fd-foreground)] underline underline-offset-4 hover:text-[var(--mds-color-brand-primary)]"
                >
                  정오표(Errata)
                </Link>
                와{' '}
                <Link
                  href="/docs/portfolio"
                  className="text-[var(--color-fd-foreground)] underline underline-offset-4 hover:text-[var(--mds-color-brand-primary)]"
                >
                  케이스 스터디
                </Link>
                에서 전체 이력을 확인할 수 있다.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-3xs tracking-label uppercase text-[var(--color-fd-muted-foreground)] mb-[9px] font-semibold">
                Next edition
              </h4>
              <p className="text-xs-tight leading-[1.65] text-[var(--mds-color-text-secondary)] m-0 break-keep">
                Edition 05 — 폼, 검증, 그리고 빨간 별표의 비용.{' '}
                <Link
                  href="/docs"
                  className="text-[var(--color-fd-foreground)] underline underline-offset-4 hover:text-[var(--mds-color-brand-primary)]"
                >
                  실무 레퍼런스(/docs)
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-2 font-mono text-3xs tracking-wider text-[var(--color-fd-muted-foreground)] pb-[18px]">
            <span>MINDULLE SPECIMEN — ED. 04</span>
            <span>DESIGN.SONAGI.SPACE</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
