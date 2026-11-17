import Link from 'next/link';
import { MindulleLogo, Button } from '@mindulle/ui';
import {
  ArrowRight,
  BookOpen,
  Palette,
  Shield,
  Layers,
  Terminal,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { InteractiveShowcase } from '@/components/landing/InteractiveShowcase';
import { MotifShowcase } from '@/components/landing/MotifShowcase';
import { HeroVisual } from '@/components/landing/HeroVisual';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-fd-background text-fd-foreground selection:bg-brand-primary selection:text-text-inverse">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 border-b-2 border-fd-border bg-fd-background/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <MindulleLogo size={28} />
          <span className="font-bold text-base sm:text-lg tracking-tight group-hover:text-brand-primary transition-colors">
            <span className="inline sm:hidden">민들레 MDS</span>
            <span className="hidden sm:inline">민들레 디자인 시스템</span>
          </span>
          <span className="hidden md:inline-flex text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded-sm border border-brand-primary/40 text-brand-primary">
            v0.1.0
          </span>
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <Link
            href="/docs/portfolio"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-sm border border-fd-border hover:border-brand-primary/60 text-fd-foreground hover:bg-fd-card transition-all"
          >
            <Flame className="size-3.5 text-brand-primary" />
            <span>케이스 스터디</span>
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-sm border border-brand-primary/40 text-brand-primary hover:bg-brand-primary hover:text-text-inverse transition-all"
          >
            <BookOpen className="size-3.5" />
            <span>실무 문서</span>
          </Link>
          <Link
            href="https://github.com/mindulle/mindulle-design-system"
            target="_blank"
            rel="noreferrer"
            className="text-xs sm:text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors p-1"
          >
            GitHub
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-5 sm:px-8 py-10 sm:py-14 lg:py-16 flex flex-col">
        {/* Hero Section: MDS-51 — Carbon 64px Editorial Breathing + 2:1 Modular Workbench */}
        <section className="flex flex-col gap-10 lg:gap-12 pb-14 lg:pb-16 border-b border-fd-border">
          {/* Top Compact Band */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-primary mb-2.5">
                MDS v0.1.0 · W3C DTCG · REACT 19
              </span>
              <h1 className="font-cinematic text-4xl sm:text-5xl lg:text-[64px] font-bold tracking-tight break-keep leading-[1.08] text-fd-foreground">
                겨울 끝, 민들레
                <br />
                실무용 디자인 시스템
              </h1>
              <p className="font-editorial text-sm sm:text-base text-fd-muted-foreground mt-3 leading-relaxed break-keep max-w-xl">
                W3C 시맨틱 토큰과 22종 React 19 컴포넌트로 구성한 한국어 에디토리얼 UI 시스템입니다.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm border border-fd-border bg-fd-card font-mono text-xs text-fd-foreground max-w-full overflow-x-auto whitespace-nowrap">
                <Terminal className="size-3.5 text-brand-primary shrink-0" />
                <span className="text-brand-primary">$</span>
                <span className="select-all">pnpm add @mindulle/tokens @mindulle/ui</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/docs">
                  <Button size="lg" variant="primary" className="gap-2 font-bold">
                    <span>Quickstart</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Link href="/docs/components/button">
                  <Button size="lg" variant="secondary" className="gap-2">
                    <span>22 Components</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Full-Width 1px Monoline Workbench */}
          <HeroVisual />
        </section>

        {/* Interactive Component Live Playground */}
        <InteractiveShowcase />

        {/* 3 Pillars of MDS Constitution */}
        <div className="w-full mt-12 pt-6">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-brand-primary mb-1">
              DESIGN CONSTITUTION
            </span>
            <h2 className="font-cinematic text-2xl sm:text-3xl font-bold tracking-tight">
              민들레 3대 조형 헌법
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left w-full">
            <div className="p-6 rounded-sm border-2 border-fd-border bg-fd-card hover:border-brand-primary/60 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-brand-primary">
                  01 / STEM &amp; LINE
                </span>
                <Shield className="size-4 text-brand-primary/70" />
              </div>
              <h3 className="text-lg font-bold mb-2">The True 2px Stem</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed break-keep">
                뿌연 블러 그림자를 배제하고, 비바람에도 꺾이지 않는 자아를 지켜내는 선명한 2.0px
                솔리드 스트로크.
              </p>
            </div>

            <div className="p-6 rounded-sm border-2 border-fd-border bg-fd-card hover:border-brand-primary/60 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-brand-primary">02 / RADIUS</span>
                <Layers className="size-4 text-brand-primary/70" />
              </div>
              <h3 className="text-lg font-bold mb-2">4px Weathered Radius</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed break-keep">
                과도한 알약(Pill)이나 인위적 직각이 아닌, 척박한 환경을 견뎌내며 자연스럽게 마모된
                4px 모듈러 곡률.
              </p>
            </div>

            <div className="p-6 rounded-sm border-2 border-fd-border bg-fd-card hover:border-brand-primary/60 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-brand-primary">03 / DUAL MATRIX</span>
                <Palette className="size-4 text-brand-primary/70" />
              </div>
              <h3 className="text-lg font-bold mb-2">W3C Light &amp; Dark</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed break-keep">
                회색돌 다크(#12151d)와 민들레 골드(#ffc837)를 품은 단일 SSOT 토큰 매트릭스 및 실시간
                코드 연동.
              </p>
            </div>
          </div>
        </div>

        {/* MDS-28 Graphic Motif Showcase */}
        <MotifShowcase />

        {/* 3D Exhibition Showroom Banner */}
        <div className="w-full mt-8 p-5 sm:p-6 rounded-sm border-2 border-fd-border bg-fd-card flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] font-bold text-brand-primary tracking-wider uppercase mb-0.5">
              EXPERIENCE
            </span>
            <span className="font-serif font-bold text-base sm:text-lg text-fd-foreground">
              3D 시네마틱 쇼룸 &amp; 5대 전시장
            </span>
            <span className="text-xs text-fd-muted-foreground mt-0.5">
              실시간 WebGL 셰이더 물방울과 인터랙티브 런웨이
            </span>
          </div>
          <Link
            href="/exhibition/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm border border-fd-border hover:border-brand-primary text-xs font-mono font-bold text-fd-foreground transition-all shrink-0"
          >
            <span>전시장 입장하기</span>
            <ExternalLink className="size-3.5 text-brand-primary" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-fd-border py-8 px-6 text-center text-xs text-fd-muted-foreground flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto w-full gap-4">
        <div>© 2026 Mindulle Design System (MDS v0.1.0) • Crafted by Mindulle Atelier</div>
        <div className="flex items-center gap-4">
          <Link href="/docs" className="hover:text-brand-primary transition-colors">
            공식 실무 문서
          </Link>
          <Link href="/docs/portfolio" className="hover:text-brand-primary transition-colors">
            포트폴리오
          </Link>
          <Link href="/docs/brand" className="hover:text-brand-primary transition-colors">
            브랜드 가이드
          </Link>
          <Link href="/exhibition/" className="hover:text-brand-primary transition-colors">
            3D 쇼룸
          </Link>
        </div>
      </footer>
    </div>
  );
}
