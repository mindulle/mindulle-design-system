'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Anchor, ArrowUpRight } from 'lucide-react';

interface MotifItem {
  id: string;
  num: string;
  name: string;
  sub: string;
  role: string;
  principle: string;
  usage: string;
  svgPreview: React.ReactNode;
}

const MOTIFS: MotifItem[] = [
  {
    id: 'sail-arc',
    num: '01',
    name: 'Sail Arc',
    sub: '비대칭 돛 곡선',
    role: '흐름 (Flow)',
    principle: '2px 라운드 스트로크, 8px 그리드 스냅, 좌우 대칭 배제',
    usage: '히어로 배경, 섹션 전환 트랙 매트, 인쇄 패턴',
    svgPreview: (
      <svg viewBox="0 0 160 120" className="w-full h-28 stroke-current" fill="none">
        {/* Dynamic sweeping sail bezier curve */}
        <path
          d="M 20,100 C 40,30 110,20 140,40"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-amber-500"
        />
        <path
          d="M 45,95 C 65,50 110,45 130,55"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 4"
          className="text-amber-500/50"
        />
        <circle cx="140" cy="40" r="3" className="fill-amber-500 text-amber-500" />
      </svg>
    ),
  },
  {
    id: 'seed-orbit',
    num: '02',
    name: 'Seed Orbit',
    sub: '황금 씨앗과 방사선',
    role: '집중 (Focus)',
    principle: '8–12px 골드 코어, 3방향 방사선, 화면당 1회 강한 골드',
    usage: 'CTA 완료 상태, 빈 상태(Empty State) 회복 신호, 핵심 메타데이터',
    svgPreview: (
      <svg viewBox="0 0 160 120" className="w-full h-28" fill="none">
        {/* Center Golden Seed */}
        <circle cx="80" cy="60" r="8" fill="#ffd166" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="78" cy="58" r="2" fill="#ffffff" />
        {/* 3 Radiating Orbits */}
        <line
          x1="80"
          y1="42"
          x2="80"
          y2="28"
          stroke="#ffd166"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="95"
          y1="70"
          x2="108"
          y2="78"
          stroke="#ffd166"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="65"
          y1="70"
          x2="52"
          y2="78"
          stroke="#ffd166"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Subtle orbit ring */}
        <circle
          cx="80"
          cy="60"
          r="32"
          stroke="#ffd166"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.35"
        />
      </svg>
    ),
  },
  {
    id: 'axis-frame',
    num: '03',
    name: 'Axis Frame',
    sub: '2px 중심축 프레임',
    role: '구조 (Structure)',
    principle: '좌표 스냅 2.0px 솔리드 축, 4px Weathered Radius 베이스',
    usage: '카드 인덱스 분할, 문서 구분선, 포스터 및 인쇄물 재단선',
    svgPreview: (
      <svg viewBox="0 0 160 120" className="w-full h-28" fill="none">
        {/* 2px Solid Axis */}
        <line
          x1="80"
          y1="15"
          x2="80"
          y2="95"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-fd-foreground"
        />
        {/* Horizontal Weathered Base */}
        <path
          d="M 40,95 L 120,95"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-fd-foreground"
        />
        {/* Accent tick */}
        <rect x="76" y="45" width="8" height="8" rx="2" fill="#ffd166" />
      </svg>
    ),
  },
];

export function MotifShowcase() {
  const [activeMotif, setActiveMotif] = useState<string>('sail-arc');
  const current = MOTIFS.find((m) => m.id === activeMotif) || MOTIFS[0];

  return (
    <div className="w-full my-16 text-left">
      {/* Section Title */}
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-500 mb-1">
          MDS-28 GRAPHIC MOTIF SYSTEM
        </span>
        <h2 className="font-cinematic text-2xl sm:text-3xl font-bold tracking-tight">
          브랜드의 본질을 전달하는 3대 그래픽 모티프
        </h2>
        <p className="font-editorial text-sm sm:text-base text-fd-muted-foreground mt-2 max-w-xl break-keep">
          로고를 단순 복제하는 장식을 지양하고, 축은 구조를 세우며, 곡선은 시선을 운반하고, 씨앗은
          도착점을 표시합니다.
        </p>
      </div>

      {/* Grid of 3 Motifs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {MOTIFS.map((motif) => {
          const isSelected = activeMotif === motif.id;
          return (
            <div
              key={motif.id}
              onClick={() => setActiveMotif(motif.id)}
              className={`cursor-pointer p-6 rounded-sm border-2 transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/[0.04] shadow-md shadow-amber-500/10'
                  : 'border-fd-border bg-fd-card/70 hover:border-fd-foreground/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-amber-500">
                    {motif.num} / {motif.name.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-fd-muted text-fd-foreground border border-fd-border">
                    {motif.role}
                  </span>
                </div>

                <div className="my-4 p-3 rounded-sm bg-fd-muted/30 border border-fd-border flex items-center justify-center">
                  {motif.svgPreview}
                </div>

                <h3 className="font-bold text-lg text-fd-foreground mb-1">{motif.name}</h3>
                <p className="text-xs font-editorial text-amber-500 font-bold mb-3">{motif.sub}</p>
                <p className="text-xs text-fd-muted-foreground leading-relaxed break-keep">
                  {motif.principle}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-fd-border/70 text-[11px] font-mono text-fd-muted-foreground flex items-center justify-between">
                <span>적용: {motif.usage.split(',')[0]}</span>
                <span className="text-amber-500 font-bold">확인 →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Showcase Callout */}
      <div className="mt-6 p-5 rounded-sm border-2 border-fd-border bg-fd-card/90 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <Compass className="size-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold uppercase text-amber-500">
              선택된 모티프: {current.name} ({current.role})
            </div>
            <div className="text-sm font-medium text-fd-foreground mt-0.5">
              주요 활용: {current.usage}
            </div>
          </div>
        </div>
        <Link
          href="/docs/foundations/motifs"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-amber-500 text-black text-xs font-bold font-mono hover:bg-amber-400 transition-colors shrink-0"
        >
          <span>모티프 규격 문서 보기</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
