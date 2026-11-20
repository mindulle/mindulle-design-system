import Link from 'next/link';
import { SpecimenShell } from '@/components/specimen/SpecimenShell';

const ESSAYS = [
  {
    id: 'law-01',
    kicker: 'Law 01 — The Stem',
    title: '획은 2px이다, 뼈가 얇아서',
    lead: '1px는 사라진다. 밝기 60%의 노트북에서 사라지고, 검토용 덱에 들어가며 한 번 더 사라진다. 3px는 우리가 고르지 않은 목소리로 말한다.',
    paragraphs: [
      '피그마에서 코드로, 코드에서 프로젝터로 옮겨가는 동안 형태를 유지하는 선 두께는 2px뿐이었다. 나머지 결정도 같은 기준을 따랐다 — 작업이 우리 손을 떠난 뒤에도 읽히는가.',
      '규칙은 문서가 아니라 토큰(--mds-border-base: 2px)에 산다. 산문으로만 존재하는 규칙은 다음 개발자가 선의를 가지고 어기는 규칙이다.',
    ],
    specs: [
      { k: 'Token', v: '--mds-border-base' },
      { k: 'Value', v: '2px solid' },
      { k: 'Divider', v: '1px subtle hairline' },
      { k: 'Counter-example', v: 'shadow-sm / blur' },
    ],
  },
  {
    id: 'law-02',
    kicker: 'Law 02 — Weathered Radius',
    title: '4px는 1x 화면에서 의도적으로 보이는 최소의 부드러움이다',
    lead: '과도한 알약(Pill)이나 인위적 직각이 아니라, 척박한 환경을 견뎌내며 자연스럽게 마모된 4px 모듈러 곡률.',
    paragraphs: [
      '0px 직각은 화면 밀도가 높아질수록 경직되어 보이고, 12px 이상의 큰 라운드는 정보의 모서리를 뭉개 카드를 장난감처럼 만든다.',
      '버튼과 입력 필드, 카드의 기본 곡률을 4px로 고정하되 상태 배지(Pill)에만 9999px를 허용한다. 형태만으로 행동과 상태 메타데이터를 구별하기 위함이다.',
    ],
    specs: [
      { k: 'Default', v: '4px (--mds-radius-sm)' },
      { k: 'Container max', v: '6px (--mds-radius-base)' },
      { k: 'Forbidden', v: '>= 8px on cards' },
      { k: 'Pill exception', v: 'Badge status only' },
    ],
  },
  {
    id: 'law-03',
    kicker: 'Law 03 — Dual Matrix',
    title: '주간판과 야간판은 색을 반전하지 않고 역할을 매핑한다',
    lead: '단순한 CSS invert는 종이의 따뜻함과 야간판의 대비를 동시에 망가뜨린다. W3C DTCG 2-Tier 토큰이 유일한 해법이다.',
    paragraphs: [
      '주간판(Day edition)은 웜 스톤 종이(#fbfbfa) 위에서 잉크(#18181b)와 앰버 골드(#9e5a03)로 인쇄된다. 야간판(Night edition)은 회색돌(#12151d) 위에서 민들레 골드(#ffc837)로 발광한다.',
      '모든 컴포넌트는 hex 값을 직접 알지 못한다. 오직 --mds-color-background-base와 --mds-color-brand-primary 같은 의미 역할만 참조한다.',
    ],
    specs: [
      { k: 'Day base', v: '#fbfbfa / #18181b' },
      { k: 'Night base', v: '#12151d / #f1f5f9' },
      { k: 'Brand (Day/Night)', v: '#9e5a03 / #ffc837' },
      { k: 'Contrast floor', v: 'WCAG AA (>= 4.5:1)' },
    ],
  },
  {
    id: 'law-04',
    kicker: 'Typography — Korean Editorial Setting',
    title: '한글 본문은 양끝 정렬을 금지한다',
    lead: '영문 브로드시트의 justify는 음절과 하이픈을 전제로 작동한다. 어절 단위인 한국어에 justify를 걸면 강물이 터진 듯 자간이 벌어진다.',
    paragraphs: [
      'MINDULLE SPECIMEN의 한국어 본문은 text-align: left, word-break: keep-all, hyphens: none을 강제한다. 행간은 영문(1.66)보다 넓은 1.72~1.80을 쓴다.',
      '제목과 전시 활자는 세리프(Cormorant Garamond · Noto Serif KR)가 맡고, UI와 본문은 산세리프(Pretendard · Inter)가 맡아 역할이 섞이지 않게 분리한다.',
    ],
    specs: [
      { k: 'Alignment', v: 'text-align: left' },
      { k: 'Line break', v: 'word-break: keep-all' },
      { k: 'Line height', v: '1.72 – 1.80' },
      { k: 'Drop cap', v: 'Forbidden in Magazine' },
    ],
  },
  {
    id: 'law-05',
    kicker: 'Archetype — Magazine vs Broadsheet',
    title: '문서는 매거진이고 블로그는 신문이다',
    lead: '민들레 아틀리에의 두 웹사이트가 같은 하우스 스타일을 공유하되 판형을 달리하는 이유.',
    paragraphs: [
      '블로그(blog.sonagi.space)는 긴 글을 읽는 신문(Broadsheet)이므로 중앙 마스트헤드와 드롭캡, 세리프 2단 칼럼을 쓴다. 반면 디자인 시스템(design.sonagi.space)은 2:1 스페시멘과 도판 카탈로그를 전시하는 매거진(Magazine)이다.',
      '신문의 점선 리더 목차나 3분할 폴리오는 디자인 시스템 지면에 들어오는 순간 성격을 흐린다. 매체는 목적에 맞는 판형 문법을 지켜야 한다.',
    ],
    specs: [
      { k: 'Design System', v: 'Magazine archetype' },
      { k: 'Blog', v: 'Broadsheet archetype' },
      { k: 'Cover', v: 'Asymmetric 0.9 : 1.1' },
      { k: 'Specimen field', v: 'aspect-ratio: 2 / 1' },
    ],
  },
];

export default function RulesPage() {
  return (
    <SpecimenShell active="rules">
      <section className="py-10 border-b border-[var(--color-fd-border)] text-left">
        <div className="font-mono text-2xs tracking-display uppercase text-[var(--mds-color-brand-primary)] mb-4">
          Edition 04 — Rules &amp; Essays
        </div>
        <h1 className="font-cinematic font-normal text-4xl sm:text-[56px] leading-[1.02] tracking-tight m-0 mb-4">
          The Rules, <em className="italic text-[var(--mds-color-brand-primary)]">Argued</em>
        </h1>
        <p className="text-[15.5px] leading-[1.75] text-[var(--mds-color-text-secondary)] max-w-[52ch] m-0 break-keep">
          규칙을 스펙 표로 나열하지 않고 왜 그 값이어야만 했는지 논증하는 다섯 편의 에세이.
          실무 토큰 레퍼런스는{' '}
          <Link
            href="/docs/foundations/colors"
            className="text-[var(--color-fd-foreground)] underline underline-offset-4"
          >
            /docs/foundations
          </Link>
          에서 이어집니다.
        </p>
      </section>

      <div className="divide-y divide-[var(--color-fd-border)]">
        {ESSAYS.map((essay) => (
          <article
            key={essay.id}
            id={essay.id}
            className="grid grid-cols-1 lg:grid-cols-[1.6fr_0.9fr] gap-10 lg:gap-[56px] py-10 text-left"
          >
            <div>
              <div className="font-mono text-2xs tracking-label uppercase text-[var(--mds-color-brand-primary)] mb-3.5">
                {essay.kicker}
              </div>
              <h2 className="font-cinematic font-normal text-3xl sm:text-[36px] leading-[1.18] tracking-tight m-0 mb-5 break-keep">
                {essay.title}
              </h2>
              <p className="text-[16px] leading-[1.75] text-[var(--color-fd-foreground)] max-w-[46ch] m-0 mb-4 font-medium break-keep">
                {essay.lead}
              </p>
              <div className="text-sm-tight leading-[1.8] text-[var(--mds-color-text-secondary)] max-w-[48ch] space-y-3 break-keep [hyphens:none]">
                {essay.paragraphs.map((p, idx) => (
                  <p key={idx} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <aside className="border-t lg:border-t-0 lg:border-l border-[var(--color-fd-border)] pt-6 lg:pt-0 lg:pl-6">
              <div className="font-mono text-3xs tracking-label uppercase text-[var(--color-fd-muted-foreground)] mb-3">
                Specification
              </div>
              <dl className="m-0">
                {essay.specs.map((spec) => (
                  <div key={spec.k} className="mb-3.5">
                    <dt className="text-xs-tight text-[var(--color-fd-muted-foreground)] mb-[2px]">
                      {spec.k}
                    </dt>
                    <dd className="m-0 font-mono text-sm-tight text-[var(--color-fd-foreground)]">
                      {spec.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </article>
        ))}
      </div>
    </SpecimenShell>
  );
}
