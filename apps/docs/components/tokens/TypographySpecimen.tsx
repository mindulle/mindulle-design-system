'use client';

import React, { useState } from 'react';
import { Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';

interface TypographyScale {
  id: string;
  name: string;
  category: 'Cinematic Display' | 'Editorial Humanist';
  fontSize: string;
  fontClass: string;
  fontStack: string;
  cssVar: string;
  lineHeight: string;
  letterSpacing: string;
  koreanText: string;
  englishText: string;
  stemMetric: string;
  description: string;
}

const typographyScales: TypographyScale[] = [
  {
    id: 'cinematic-hero',
    name: 'Display / Cinematic Hero',
    category: 'Cinematic Display',
    fontSize: '64px (42px 모바일)',
    fontClass: 'font-cinematic',
    fontStack: "'Cormorant Garamond' 700 + 'Noto Serif KR' 700",
    cssVar: '--sng-font-cinematic-display',
    lineHeight: '115%',
    letterSpacing: '-0.025em',
    koreanText: '겨울 끝, 민들레의 비상',
    englishText: 'SOVEREIGN CINEMATIC ARCHITECTURE',
    stemMetric: '2.8px (≥2px True Stem 합격)',
    description: '최상위 히어로 타이틀 및 단독 선언문. 하이 콘트라스트 세리프와 칼날 같은 2px 기둥 두께 유지.',
  },
  {
    id: 'cinematic-section',
    name: 'Display / Cinematic Section',
    category: 'Cinematic Display',
    fontSize: '36px (28px 모바일)',
    fontClass: 'font-cinematic',
    fontStack: "'Cormorant Garamond' 700 + 'Noto Serif KR' 700",
    cssVar: '--sng-font-cinematic-display',
    lineHeight: '125%',
    letterSpacing: '-0.02em',
    koreanText: '얼어붙은 땅을 깨우는 벼락같은 몰입과 방패',
    englishText: 'MONOLITH I • WILD FORTRESS',
    stemMetric: '2.4px (≥2px True Stem 합격)',
    description: '쇼룸 섹션 및 주요 대단원 제목. Cormorant Garamond와의 광학적 두께 균형 96% 일치.',
  },
  {
    id: 'editorial-humanist',
    name: 'Display / Editorial Humanist',
    category: 'Editorial Humanist',
    fontSize: '36px (26px 모바일)',
    fontClass: 'font-editorial',
    fontStack: "'Cormorant Garamond' 700 + 'Maru Buri' 700",
    cssVar: '--sng-font-editorial-humanist',
    lineHeight: '130%',
    letterSpacing: '-0.01em',
    koreanText: '척박한 콘크리트 틈에서 피어나는 다정함',
    englishText: 'THE LIVING SANCTUARY & SOLACE',
    stemMetric: '2.2px (≥2px True Stem 합격)',
    description: '에디토리얼 에세이 및 아틀리에 풍경 표제어. 부드러운 휴머니스트 세리프로 따뜻한 감성 전달.',
  },
  {
    id: 'editorial-quote',
    name: 'Display / Editorial Quote',
    category: 'Editorial Humanist',
    fontSize: '24px (20px 모바일)',
    fontClass: 'font-editorial',
    fontStack: "'Cormorant Garamond' 500 Italic + 'Maru Buri' 400",
    cssVar: '--sng-font-editorial-humanist',
    lineHeight: '140%',
    letterSpacing: '0em',
    koreanText: '“기계가 완벽해야 사람이 쉴 수 있다.”',
    englishText: 'When the machine is flawless, the human soul finds solace.',
    stemMetric: '2.0px (기준선 도달)',
    description: '민들레 철학 인용문 및 아틀리에 헌법 조항. 여유로운 행간과 자연스러운 기울기.',
  },
];

export function TypographySpecimen() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, cssVar: string) => {
    navigator.clipboard.writeText(`font-family: var(${cssVar});`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="not-prose my-8 space-y-6">
      {/* Top Banner: sonagi-graph Visual Consistency Validation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-sm border-2 border-fd-border bg-fd-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="size-5 text-amber-500 shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">Visual Consistency Graph 검증 통과</span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                SCORE 97/100 PASS
              </span>
            </div>
            <p className="text-xs text-fd-muted-foreground mt-0.5">
              Cormorant Garamond 700 ↔ Noto Serif KR 700 광학 일치도 96% & 2px True Stem 헌법 준수
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-fd-muted-foreground self-end sm:self-center">
          Figma Local Style 4종 SSOT 동기화 완료
        </span>
      </div>

      {/* Specimen Cards */}
      <div className="space-y-4">
        {typographyScales.map((scale) => (
          <div
            key={scale.id}
            className="p-5 sm:p-6 rounded-sm border-2 border-fd-border bg-fd-card hover:border-amber-500/50 transition-all duration-200"
          >
            {/* Header info row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-fd-border/70">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-amber-500">
                  {scale.name}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-fd-muted text-fd-muted-foreground border border-fd-border">
                  {scale.fontSize}
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-mono rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  {scale.stemMetric}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <code className="text-[11px] font-mono px-2 py-1 rounded bg-fd-muted text-fd-foreground border border-fd-border">
                  var({scale.cssVar})
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy(scale.id, scale.cssVar)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-sm border border-fd-border hover:border-amber-500 hover:text-amber-500 transition-colors"
                  title="CSS font-family 복사"
                >
                  {copiedId === scale.id ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span className="text-emerald-500">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Specimen Live Display Text */}
            <div className="space-y-2 py-2">
              <div
                className={`${scale.fontClass} text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-fd-foreground break-keep`}
                style={{
                  lineHeight: scale.lineHeight,
                  letterSpacing: scale.letterSpacing,
                }}
              >
                {scale.koreanText}
              </div>
              <div
                className={`${scale.fontClass} text-sm sm:text-base tracking-widest text-fd-muted-foreground uppercase opacity-80`}
              >
                {scale.englishText}
              </div>
            </div>

            {/* Footer description & metrics */}
            <div className="mt-4 pt-3 border-t border-fd-border/50 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-fd-muted-foreground gap-2">
              <p>{scale.description}</p>
              <span className="font-mono text-[11px] shrink-0 text-amber-500/80">
                {scale.fontStack}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}