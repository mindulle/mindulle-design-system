import Link from 'next/link';
import { SpecimenShell } from '@/components/specimen/SpecimenShell';

const DECISIONS = [
  {
    id: '0001',
    title: '색상 체계 재정의 (웜 스톤 & 앰버 골드)',
    status: 'ACCEPTED',
    summary:
      '초기 블루 계열을 폐기하고 웜 스톤(#fbfbfa) 바탕에 앰버 골드(#9e5a03 / #ffc837) 단일 브랜드 축으로 수렴했다.',
  },
  {
    id: '0002',
    title: '타이포그래피 스케일 재정의',
    status: 'ACCEPTED',
    summary:
      '전시용 세리프(Cormorant Garamond · Noto Serif KR)와 실무 UI 산세리프(Pretendard · Inter)의 역할을 분리했다.',
  },
  {
    id: '0003',
    title: '블러 그림자 폐기 및 2px 보더 위계',
    status: 'ACCEPTED',
    summary:
      '다크 모드(#12151d)에서 인지되지 않는 소프트 섀도우를 제거하고 2px 실선과 표면 명도 차이로 층위를 표현한다.',
  },
  {
    id: '0006',
    title: '야간판(Night edition) 회색돌 다크 팔레트 확정',
    status: 'ACCEPTED',
    summary:
      '순수 검정(#000000) 대신 청회색 돌(#12151d)과 민들레 골드(#ffc837)를 적용해 WCAG AA 대비를 확보했다.',
  },
  {
    id: '0010',
    title: 'GitHub Packages 기반 단일 배포 파이프라인 통합',
    status: 'ACCEPTED',
    summary:
      '@mindulle/tokens, @mindulle/ui, @mindulle/icons의 토큰 빌드와 릴리스를 단일 워크플로로 통합했다.',
  },
  {
    id: '0013',
    title: '민들레 디자인 시스템(MDS) 리브랜딩',
    status: 'ACCEPTED',
    summary:
      '브랜드 접두어를 --sng-에서 --mds-로 이관하되 하위 호환 alias를 유지한다.',
  },
  {
    id: '0016',
    title: '브랜드 스튜디오와 디자인 시스템 문서의 분리',
    status: 'ACCEPTED',
    summary:
      'docs/brand 아키타입 규정에 따라 디자인 시스템 문서는 매거진 아키타입 간행물(MINDULLE SPECIMEN)로 운영한다.',
  },
];

export default function ErrataPage() {
  return (
    <SpecimenShell active="errata">
      <section className="py-10 border-b border-[var(--color-fd-border)] text-left">
        <div className="font-mono text-2xs tracking-[0.2em] uppercase text-[var(--mds-color-brand-primary)] mb-4">
          Edition 04 — Errata &amp; Decisions
        </div>
        <h1 className="font-cinematic font-normal text-4xl sm:text-[56px] leading-[1.02] tracking-[-0.025em] m-0 mb-4">
          Errata <em className="italic text-[var(--mds-color-brand-primary)]">Ledger</em>
        </h1>
        <p className="text-[15.5px] leading-[1.75] text-[var(--mds-color-text-secondary)] max-w-[54ch] m-0 break-keep">
          시스템의 결정과 번복은 삭제하지 않고 공개 기록에 남깁니다. 시각적 검증 이력은{' '}
          <Link
            href="/docs/portfolio/visual-qa"
            className="text-[var(--color-fd-foreground)] underline underline-offset-4"
          >
            Visual QA
          </Link>
          에서 이어집니다.
        </p>
      </section>

      <section className="py-6 text-left">
        <div className="divide-y divide-[var(--color-fd-border)] border-b border-[var(--color-fd-border)]">
          {DECISIONS.map((d) => (
            <article
              key={d.id}
              className="py-5 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-8 items-baseline"
            >
              <div className="font-mono text-2xs text-[var(--color-fd-muted-foreground)]">
                <span className="text-[var(--mds-color-brand-primary)] font-semibold">
                  ADR-{d.id}
                </span>{' '}
                · {d.status}
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-[var(--color-fd-foreground)] m-0 mb-1.5">
                  {d.title}
                </h2>
                <p className="text-[13.5px] leading-[1.72] text-[var(--mds-color-text-secondary)] m-0 break-keep">
                  {d.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SpecimenShell>
  );
}
