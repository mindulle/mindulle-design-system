import Link from 'next/link';
import { Button } from '@mindulle/ui';
import { SpecimenShell } from '@/components/specimen/SpecimenShell';
import { InstrumentWorkbench } from '@/components/specimen/InstrumentWorkbench';

const SECTION_INDEX = [
  { n: '01', t: 'The three laws', d: '왜 2px·4px·이중 매트릭스인가', href: '#laws' },
  { n: '02', t: 'Specimen plates', d: '라이브 빌드에서 렌더한 도판', href: '#plates' },
  { n: '03', t: 'Instrument', d: '값을 직접 바꾸는 작업대', href: '#instrument' },
  { n: '04', t: 'Errata', d: '결정과 번복의 기록', href: '#errata' },
  { n: '05', t: 'Colophon', d: '서체·스택·기여자', href: '#colophon' },
];

const ERRATA_HIGHLIGHTS = [
  {
    id: 'ADR-0001',
    date: '2026-08',
    title: '색상 체계 재정의 — 웜 스톤 & 앰버 골드',
    note: '단일 액센트 원칙을 위해 보조 브라운과 버밀리온 실험안을 폐기하고 #9e5a03 단일 브랜드 축으로 수렴했다.',
  },
  {
    id: 'ADR-0003',
    date: '2026-08',
    title: '블러 그림자 폐기 및 2px 획 도입',
    note: '다크 표면(#12151d)에서 유실되는 소프트 섀도우를 제거하고 솔리드 보더 위계로 대체했다.',
  },
  {
    id: 'ADR-0016',
    date: '2026-11',
    title: '브랜드 스튜디오와 디자인 시스템의 분리',
    note: '문서 사이트(design.sonagi.space)는 제품이 아니라 매거진 아키타입 간행물(MINDULLE SPECIMEN)로 재정의했다.',
  },
];

export default function HomePage() {
  return (
    <SpecimenShell active="specimen">
      {/* Cover: asymmetric title + 2:1 specimen field */}
      <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-[54px] py-9 sm:py-[38px] pb-10 items-end">
        <div className="pb-1.5 text-left">
          <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[var(--mds-color-brand-primary)] mb-5">
            A specimen of one design system
          </div>
          <h1 className="font-cinematic font-normal text-5xl sm:text-[64px] lg:text-[78px] leading-[0.94] tracking-[-0.03em] text-[var(--color-fd-foreground)] m-0 mb-[18px]">
            Mindulle
            <br />
            <em className="italic text-[var(--mds-color-brand-primary)]">Specimen</em>
          </h1>
          <p className="text-[15.5px] leading-[1.72] text-[var(--mds-color-text-secondary)] max-w-[38ch] m-0 mb-[26px] break-keep text-left [hyphens:none]">
            세 개의 조형 법칙, 스물두 개의 컴포넌트, 하나의 서체 계열. 이 문서는 시스템을
            설명하지 않고 전시합니다.
          </p>
          <dl className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-4 font-mono text-[10.5px] tracking-[0.08em] text-[var(--color-fd-muted-foreground)] border-t border-[var(--color-fd-border)] pt-3.5 max-w-[420px] m-0">
            <div>
              <dt className="font-normal">LAWS</dt>
              <dd className="m-0 mt-1 text-[12px] font-semibold tracking-[0.02em] text-[var(--color-fd-foreground)]">
                03
              </dd>
            </div>
            <div>
              <dt className="font-normal">COMPONENTS</dt>
              <dd className="m-0 mt-1 text-[12px] font-semibold tracking-[0.02em] text-[var(--color-fd-foreground)]">
                22
              </dd>
            </div>
            <div>
              <dt className="font-normal">TOKENS</dt>
              <dd className="m-0 mt-1 text-[12px] font-semibold tracking-[0.02em] text-[var(--color-fd-foreground)]">
                184
              </dd>
            </div>
            <div>
              <dt className="font-normal">BASELINE</dt>
              <dd className="m-0 mt-1 text-[12px] font-semibold tracking-[0.02em] text-[var(--color-fd-foreground)]">
                6px
              </dd>
            </div>
          </dl>
        </div>

        {/* Specimen field (2:1 ratio per Magazine archetype) */}
        <div
          aria-label="SPECIMEN 01 — TYPE & SURFACE"
          className="bg-[var(--color-fd-muted)] border border-[var(--color-fd-border)] sm:aspect-[2/1] relative flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-0"
        >
          <span className="sm:absolute sm:top-3 sm:left-3.5 font-mono text-[9.5px] tracking-[0.12em] text-[var(--color-fd-muted-foreground)] mb-4 sm:mb-0">
            SPECIMEN 01 — TYPE &amp; SURFACE
          </span>
          <span
            aria-hidden="true"
            className="hidden sm:block absolute top-[10px] right-[10px] w-[14px] h-[14px] border-t border-r border-[var(--mds-color-brand-primary)]"
          />
          <span
            aria-hidden="true"
            className="hidden sm:block absolute bottom-[10px] right-[10px] w-[14px] h-[14px] border-b border-r border-[var(--mds-color-brand-primary)]"
          />

          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-3.5 border-b border-[var(--color-fd-border)]">
            <span className="font-cinematic text-4xl sm:text-[56px] leading-none tracking-[-0.02em]">
              획
            </span>
            <span className="font-cinematic text-2xl sm:text-[34px] leading-none tracking-[-0.01em]">
              2px
            </span>
            <span className="font-mono text-[13px] text-[var(--mds-color-text-secondary)]">
              stem · solid · no gradient
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-3.5 border-b border-[var(--color-fd-border)]">
            <span className="font-cinematic text-2xl sm:text-[34px] leading-none tracking-[-0.01em]">
              곡률 4px
            </span>
            <span className="font-mono text-[13px] text-[var(--mds-color-text-secondary)]">
              radius · weathered · 1x legible
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-3.5">
            <span className="text-[18px] sm:text-[21px] font-medium">Primary action</span>
            <span className="text-[18px] sm:text-[21px] font-medium text-[var(--mds-color-brand-primary)]">
              Amber #9e5a03
            </span>
          </div>
        </div>
      </section>

      {/* Section index: horizontal, no leaders */}
      <nav
        aria-label="Edition 04 contents"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-y border-[var(--color-fd-border)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-fd-border)]"
      >
        {SECTION_INDEX.map((item) => (
          <a
            key={item.n}
            href={item.href}
            className="py-[18px] sm:px-5 lg:first:pl-0 lg:last:pr-0 no-underline text-inherit hover:bg-[var(--color-fd-muted)]/60 transition-colors block"
          >
            <span className="font-mono text-[10px] text-[var(--mds-color-brand-primary)] tracking-[0.1em] block mb-[9px]">
              {item.n}
            </span>
            <span className="text-[14.5px] font-semibold block mb-[5px] text-[var(--color-fd-foreground)]">
              {item.t}
            </span>
            <span className="text-[12px] text-[var(--color-fd-muted-foreground)] leading-[1.5] break-keep block">
              {item.d}
            </span>
          </a>
        ))}
      </nav>

      {/* Feature Essay: big statement + specification rail */}
      <section
        id="laws"
        aria-labelledby="law-01-heading"
        className="grid grid-cols-1 lg:grid-cols-[1.6fr_0.9fr] gap-10 lg:gap-[56px] py-10 sm:py-[44px] pb-[38px] border-b border-[var(--color-fd-border)] text-left"
      >
        <div>
          <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[var(--mds-color-brand-primary)] mb-4">
            Law 01 — the stem
          </div>
          <h2
            id="law-01-heading"
            className="font-cinematic font-normal text-3xl sm:text-[44px] leading-[1.14] tracking-[-0.02em] m-0 mb-[22px] break-keep text-[var(--color-fd-foreground)]"
          >
            획은 <em className="italic">2px</em>이다, 뼈가 얇아서
          </h2>
          <p className="text-[16px] leading-[1.75] text-[var(--color-fd-foreground)] max-w-[44ch] m-0 mb-4 break-keep text-left [hyphens:none]">
            <strong className="font-semibold">1px는 사라진다.</strong> 밝기 60%의 노트북에서
            사라지고, 검토용 덱에 들어가며 한 번 더 사라진다. 3px는 우리가 고르지 않은 목소리로
            말한다.
          </p>
          <div className="text-[14px] leading-[1.8] text-[var(--mds-color-text-secondary)] max-w-[46ch] break-keep text-left [hyphens:none] space-y-3">
            <p className="m-0">
              그래서 선의 두께를 먼저 고정했다. 피그마에서 코드로, 코드에서 프로젝터로 옮겨가는
              동안 형태를 유지하는 값은 2px뿐이었다. 나머지 결정도 같은 기준을 따랐다 — 작업이
              우리 손을 떠난 뒤에도 읽히는가.
            </p>
            <p className="m-0">
              곡률이 4px인 이유도 같다. 1x로 렌더링했을 때 의도적으로 보이는 가장 작은 부드러움이다.
              규칙은 문서가 아니라 토큰에 산다. 산문으로만 존재하는 규칙은 다음 개발자가 선의를
              가지고 어기는 규칙이다.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/rules"
              className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--mds-color-brand-primary)] underline underline-offset-4 hover:text-[var(--color-fd-foreground)]"
            >
              Read all 5 essays in Rules →
            </Link>
          </div>
        </div>

        <aside className="border-t lg:border-t-0 lg:border-l border-[var(--color-fd-border)] pt-6 lg:pt-0 lg:pl-[26px]">
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--color-fd-muted-foreground)] mb-3">
            Specification
          </div>
          <dl className="m-0 mb-[26px]">
            <dt className="text-[12px] text-[var(--color-fd-muted-foreground)] mb-[3px]">Stem</dt>
            <dd className="m-0 mb-[14px] font-mono text-[13px] text-[var(--color-fd-foreground)]">
              2px solid
            </dd>
            <dt className="text-[12px] text-[var(--color-fd-muted-foreground)] mb-[3px]">
              Radius
            </dt>
            <dd className="m-0 mb-[14px] font-mono text-[13px] text-[var(--color-fd-foreground)]">
              4px weathered
            </dd>
            <dt className="text-[12px] text-[var(--color-fd-muted-foreground)] mb-[3px]">
              Baseline
            </dt>
            <dd className="m-0 mb-[14px] font-mono text-[13px] text-[var(--color-fd-foreground)]">
              6px
            </dd>
            <dt className="text-[12px] text-[var(--color-fd-muted-foreground)] mb-[3px]">
              Accent
            </dt>
            <dd className="m-0 mb-[14px] font-mono text-[13px] text-[var(--color-fd-foreground)]">
              one per screen
            </dd>
          </dl>
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--color-fd-muted-foreground)] mb-3">
            From the editor
          </div>
          <blockquote className="font-cinematic text-[21px] leading-[1.55] italic m-0 text-[var(--color-fd-foreground)] break-keep">
            “시스템은 그리는 것이 아니다. 지켜보지 않아도 남는 것이다.”
            <cite className="block mt-2.5 font-mono text-[10px] not-italic tracking-[0.1em] text-[var(--color-fd-muted-foreground)]">
              편집자의 글
            </cite>
          </blockquote>
        </aside>
      </section>

      {/* Specimen Plates: catalogue row with 2px divider */}
      <section
        id="plates"
        aria-labelledby="plates-heading"
        className="py-[38px] pb-[30px] border-b border-[var(--color-fd-border)] text-left"
      >
        <div className="flex flex-wrap justify-between items-baseline gap-2 mb-[22px]">
          <h3 id="plates-heading" className="text-[15px] font-semibold m-0">
            Specimen plates
          </h3>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.08em] text-[var(--color-fd-muted-foreground)]">
              PL. 01–04 · rendered from the live build
            </span>
            <Link
              href="/plates"
              className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-[var(--mds-color-brand-primary)] underline underline-offset-4"
            >
              All Plates →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[var(--color-fd-border)] border border-[var(--color-fd-border)]">
          <div className="bg-[var(--color-fd-background)]">
            <div className="bg-[var(--color-fd-muted)] h-[150px] grid place-items-center relative">
              <span className="absolute top-[9px] left-[10px] font-mono text-[9px] text-[var(--color-fd-muted-foreground)] tracking-[0.1em]">
                PL. 01
              </span>
              <Button variant="primary" size="md">
                Primary action
              </Button>
            </div>
            <div className="px-3 py-[11px] pb-[13px]">
              <b className="block text-[12.5px] font-semibold mb-[3px]">유일한 채움면</b>
              <span className="font-mono text-[9.5px] text-[var(--color-fd-muted-foreground)] tracking-[0.04em]">
                radius 4 · ink on paper
              </span>
            </div>
          </div>

          <div className="bg-[var(--color-fd-background)]">
            <div className="bg-[var(--color-fd-muted)] h-[150px] grid place-items-center relative">
              <span className="absolute top-[9px] left-[10px] font-mono text-[9px] text-[var(--color-fd-muted-foreground)] tracking-[0.1em]">
                PL. 02
              </span>
              <Button variant="secondary" size="md">
                Secondary
              </Button>
            </div>
            <div className="px-3 py-[11px] pb-[13px]">
              <b className="block text-[12.5px] font-semibold mb-[3px]">되돌릴 수 있는 행동</b>
              <span className="font-mono text-[9.5px] text-[var(--color-fd-muted-foreground)] tracking-[0.04em]">
                2px stem · no fill
              </span>
            </div>
          </div>

          <div className="bg-[var(--color-fd-background)]">
            <div className="bg-[var(--color-fd-muted)] h-[150px] grid place-items-center relative">
              <span className="absolute top-[9px] left-[10px] font-mono text-[9px] text-[var(--color-fd-muted-foreground)] tracking-[0.1em]">
                PL. 03
              </span>
              <div className="flex gap-1" aria-label="Semantic color swatches">
                <i className="w-5 h-[42px] block bg-[var(--mds-primitive-neutral-900)]" />
                <i className="w-5 h-[42px] block bg-[var(--mds-primitive-gold-700)]" />
                <i className="w-5 h-[42px] block bg-[var(--mds-primitive-yellow-500)]" />
                <i className="w-5 h-[42px] block bg-[var(--mds-primitive-neutral-500)]" />
              </div>
            </div>
            <div className="px-3 py-[11px] pb-[13px]">
              <b className="block text-[12.5px] font-semibold mb-[3px]">네 개의 의미 역할</b>
              <span className="font-mono text-[9.5px] text-[var(--color-fd-muted-foreground)] tracking-[0.04em]">
                ink · brand · accent · muted
              </span>
            </div>
          </div>

          <div className="bg-[var(--color-fd-background)]">
            <div className="bg-[var(--color-fd-muted)] h-[150px] grid place-items-center relative">
              <span className="absolute top-[9px] left-[10px] font-mono text-[9px] text-[var(--color-fd-muted-foreground)] tracking-[0.1em]">
                PL. 04
              </span>
              <span className="font-cinematic text-[28px] leading-none">가Aa</span>
            </div>
            <div className="px-3 py-[11px] pb-[13px]">
              <b className="block text-[12.5px] font-semibold mb-[3px]">전시 64 / 본문 14</b>
              <span className="font-mono text-[9.5px] text-[var(--color-fd-muted-foreground)] tracking-[0.04em]">
                serif display · sans UI
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Instrument: Live Component & Token Workbench */}
      <InstrumentWorkbench />

      {/* Errata: Architectural Decisions Summary */}
      <section
        id="errata"
        aria-labelledby="errata-heading"
        className="py-10 text-left"
      >
        <div className="flex flex-wrap justify-between items-baseline gap-2 mb-6">
          <div>
            <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[var(--mds-color-brand-primary)] block mb-1.5">
              04 · Errata
            </span>
            <h3 id="errata-heading" className="text-[15px] font-semibold m-0">
              결정과 번복의 기록
            </h3>
          </div>
          <Link
            href="/errata"
            className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-[var(--mds-color-brand-primary)] underline underline-offset-4"
          >
            Full Errata Ledger →
          </Link>
        </div>

        <div className="divide-y divide-[var(--color-fd-border)] border-y border-[var(--color-fd-border)]">
          {ERRATA_HIGHLIGHTS.map((item) => (
            <div
              key={item.id}
              className="py-4 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-6 items-baseline"
            >
              <div className="font-mono text-[11px] text-[var(--color-fd-muted-foreground)]">
                <span className="text-[var(--mds-color-brand-primary)] font-semibold">
                  {item.id}
                </span>{' '}
                · {item.date}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[var(--color-fd-foreground)] mb-1">
                  {item.title}
                </div>
                <p className="text-[13px] leading-[1.7] text-[var(--mds-color-text-secondary)] m-0 break-keep">
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SpecimenShell>
  );
}
