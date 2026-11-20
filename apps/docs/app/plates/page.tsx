import { SpecimenShell } from '@/components/specimen/SpecimenShell';
import { PlatesCatalogue } from '@/components/specimen/PlatesCatalogue';

export default function PlatesPage() {
  return (
    <SpecimenShell active="plates">
      <section className="py-10 border-b border-[var(--color-fd-border)] text-left">
        <div className="font-mono text-2xs tracking-[0.2em] uppercase text-[var(--mds-color-brand-primary)] mb-4">
          Edition 04 — Specimen Plates
        </div>
        <h1 className="font-cinematic font-normal text-4xl sm:text-[56px] leading-[1.02] tracking-[-0.025em] m-0 mb-4">
          Component <em className="italic text-[var(--mds-color-brand-primary)]">Plates</em>
        </h1>
        <p className="text-[15.5px] leading-[1.75] text-[var(--mds-color-text-secondary)] max-w-[54ch] m-0 break-keep">
          모든 도판은 정적 이미지가 아니라 라이브{' '}
          <code className="font-mono text-[13px]">@mindulle/ui</code> 빌드에서 직접 렌더링합니다.
          각 도판의 캡션은 기능 요약이 아니라 조형적 판단입니다.
        </p>
      </section>

      <section className="py-10 text-left">
        <PlatesCatalogue />
      </section>
    </SpecimenShell>
  );
}
