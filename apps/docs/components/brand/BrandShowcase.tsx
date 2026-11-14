'use client';

import React, { useState } from 'react';
import { Newspaper, ZoomIn, Sparkles, Feather, Check, Copy } from 'lucide-react';

export function BrandShowcase() {
  const [activeTab, setActiveTab] = useState<'masthead' | 'optical' | 'motifs' | 'constitution'>('masthead');
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyCode = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const isDark = previewTheme === 'dark';

  return (
    <div className="w-full my-8 rounded-xl border border-fd-border bg-fd-card overflow-hidden shadow-sm not-prose">
      {/* 1. Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-fd-border bg-fd-muted/30 px-4 py-3 gap-2">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTab('masthead')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all break-keep ${
              activeTab === 'masthead'
                ? 'bg-fd-background text-fd-foreground shadow-xs'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            <Newspaper size={14} className="text-amber-500 shrink-0" />
            <span>신문 마스트헤드</span>
          </button>

          <button
            onClick={() => setActiveTab('optical')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all break-keep ${
              activeTab === 'optical'
                ? 'bg-fd-background text-fd-foreground shadow-xs'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            <ZoomIn size={14} className="text-amber-500 shrink-0" />
            <span>광학 크기 매트릭스</span>
          </button>

          <button
            onClick={() => setActiveTab('motifs')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all break-keep ${
              activeTab === 'motifs'
                ? 'bg-fd-background text-fd-foreground shadow-xs'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            <Feather size={14} className="text-amber-500 shrink-0" />
            <span>1도 선화 에칭 4종</span>
          </button>

          <button
            onClick={() => setActiveTab('constitution')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all break-keep ${
              activeTab === 'constitution'
                ? 'bg-fd-background text-fd-foreground shadow-xs'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            <Sparkles size={14} className="text-amber-500 shrink-0" />
            <span>85:15 조형 헌법</span>
          </button>
        </div>

        {/* Theme toggle for live preview */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-fd-border bg-fd-background p-0.5 text-xs">
            <button
              onClick={() => setPreviewTheme('light')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors break-keep ${
                !isDark ? 'bg-amber-500/10 text-amber-600 font-bold' : 'text-fd-muted-foreground'
              }`}
            >
              미색 신문지
            </button>
            <button
              onClick={() => setPreviewTheme('dark')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors break-keep ${
                isDark ? 'bg-amber-500/20 text-amber-400 font-bold' : 'text-fd-muted-foreground'
              }`}
            >
              아카이벌 다크
            </button>
          </div>
        </div>
      </div>

      {/* 2. Tab Contents */}
      <div className="p-4 sm:p-6">
        {/* TAB 1: Broadsheet Masthead */}
        {activeTab === 'masthead' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-fd-muted-foreground">
              <span className="font-mono break-all">assets/svg/lockups/mindulle-garden-masthead.svg (800×180)</span>
              <button
                onClick={() =>
                  copyCode(
                    `<GazetteMasthead vol="VOL. 01" issue="ISSUE 01" />`,
                    'masthead-code'
                  )
                }
                className="inline-flex items-center gap-1 text-xs hover:text-amber-500 transition-colors break-keep shrink-0"
              >
                {copiedText === 'masthead-code' ? (
                  <>
                    <Check size={12} className="text-emerald-500" />
                    <span>복사됨!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>React 컴포넌트 복사</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Masthead Rendering Container */}
            <div
              className={`w-full min-h-[210px] rounded-lg border transition-all p-6 sm:p-8 flex flex-col items-center justify-center overflow-hidden ${
                !isDark
                  ? 'bg-[#FBF9F5] border-[#D6D3CD] text-[#161616]'
                  : 'bg-[#12100E] border-[#383431] text-[#F7EEEC]'
              }`}
              style={{
                boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
              }}
            >
              {/* Top Double Hairline */}
              <div className="w-full flex flex-col gap-[3px]" aria-hidden="true">
                <div
                  className="w-full h-[2px]"
                  style={{ backgroundColor: !isDark ? '#161616' : '#F7EEEC' }}
                />
                <div
                  className="w-full h-[1px]"
                  style={{ backgroundColor: !isDark ? '#D6D3CD' : '#383431' }}
                />
              </div>

              {/* Meta Line */}
              <div
                className="w-full py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[10px] sm:text-xs font-mono uppercase tracking-widest"
                style={{ color: !isDark ? '#57534E' : '#B8B0A8' }}
              >
                <span className="shrink-0">VOL. 01 • ISSUE 01</span>
                <span
                  className="font-bold tracking-[0.2em] sm:tracking-[0.25em] text-center"
                  style={{ fontFamily: 'Georgia, serif', color: !isDark ? '#292524' : '#E7E0D8' }}
                >
                  MINDULLE ATELIER
                </span>
                <span className="shrink-0">EST. 2026 • WINTER&apos;S END</span>
              </div>

              <div
                className="w-full h-[1px] mb-5"
                style={{ backgroundColor: !isDark ? '#D6D3CD' : '#383431' }}
              />

              {/* Title Centerpiece */}
              <div className="text-center flex flex-col items-center gap-2 my-1">
                <div className="flex items-center justify-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="shrink-0">
                    <line x1="16" y1="14" x2="16" y2="3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    <line x1="16" y1="14" x2="10.5" y2="5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    <line x1="16" y1="14" x2="21.5" y2="5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    <line x1="16" y1="14" x2="5.5" y2="8.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    <line x1="16" y1="14" x2="26.5" y2="8.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    <path d="M 5.5 8.5 Q 16 1.8 26.5 8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeDasharray="1.5 2" opacity="0.65" />
                    <circle cx="16" cy="14" r="1.5" fill={!isDark ? '#D97706' : '#F59E0B'} />
                    <line x1="16" y1="14" x2="16" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 16 22.5 C 14.2 24.5, 14.2 28, 16 29.5 C 17.8 28, 17.8 24.5, 16 22.5 Z" fill={!isDark ? '#D97706' : '#F59E0B'} />
                  </svg>
                  <h2
                    className="text-xl sm:text-3xl md:text-4xl font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase break-keep"
                    style={{ fontFamily: 'Georgia, serif', color: !isDark ? '#161616' : '#F7EEEC' }}
                  >
                    MINDULLE GARDEN
                  </h2>
                </div>
                <p
                  className="text-xs sm:text-sm font-semibold tracking-[0.35em] break-keep"
                  style={{ color: !isDark ? '#57534E' : '#D6CEC4' }}
                >
                  민 들 레 정 원
                </p>
                <p
                  className="text-xs sm:text-sm italic tracking-normal mt-1 break-keep"
                  style={{ fontFamily: 'Georgia, serif', color: !isDark ? '#78716C' : '#A8A29E' }}
                >
                  &ldquo;돌 틈에 단단히 뿌리내리고, 가볍게 사유하는 정원사의 지면&rdquo;
                </p>
              </div>

              {/* Bottom Double Hairline */}
              <div className="w-full flex flex-col gap-[3px] mt-5" aria-hidden="true">
                <div
                  className="w-full h-[1px]"
                  style={{ backgroundColor: !isDark ? '#D6D3CD' : '#383431' }}
                />
                <div
                  className="w-full h-[2px]"
                  style={{ backgroundColor: !isDark ? '#161616' : '#F7EEEC' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Optical Sizing Matrix */}
        {activeTab === 'optical' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-fd-muted-foreground break-keep">
                뷰포트 크기 축소 시 서브픽셀 뭉개짐을 방지하기 위해 독립 작도된 4단계 광학 크기입니다.
              </p>
              <div className="flex items-center gap-1.5 shrink-0">
                {[1, 2, 4].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setZoomLevel(scale)}
                    className={`px-2 py-1 text-xs font-mono rounded border transition-colors whitespace-nowrap ${
                      zoomLevel === scale
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold'
                        : 'border-fd-border text-fd-muted-foreground hover:bg-fd-accent'
                    }`}
                  >
                    {scale}x 줌
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 16px Favicon */}
              <div className="p-4 rounded-lg border border-fd-border bg-fd-background flex flex-col items-center justify-between gap-3 overflow-hidden">
                <div className="w-full flex justify-between items-center gap-2 text-[11px] font-mono border-b border-fd-border pb-2">
                  <span className="font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">16 × 16 px</span>
                  <span className="text-fd-muted-foreground break-keep">극소형 탭</span>
                </div>
                <div className="w-full h-36 rounded-md overflow-hidden flex items-center justify-center border border-fd-border/60"
                  style={{ backgroundColor: !isDark ? '#FBF9F5' : '#12100E' }}
                >
                  <div
                    className="p-3 rounded flex items-center justify-center transition-transform origin-center"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <line x1="8" y1="7.5" x2="8" y2="2" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.75" strokeLinecap="round" />
                      <line x1="8" y1="7.5" x2="3" y2="3.5" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.75" strokeLinecap="round" />
                      <line x1="8" y1="7.5" x2="13" y2="3.5" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.75" strokeLinecap="round" />
                      <path d="M 3 3.5 Q 8 1.5 13 3.5" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1" strokeLinecap="round" strokeDasharray="1.5 1.5" opacity="0.75" />
                      <line x1="8" y1="7.5" x2="8" y2="12" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2" strokeLinecap="round" />
                      <path d="M 8 11.5 C 6.8 12.8, 6.8 14.5, 8 15.2 C 9.2 14.5, 9.2 12.8, 8 11.5 Z" fill={!isDark ? '#D97706' : '#F59E0B'} />
                    </svg>
                  </div>
                </div>
                <p className="text-[11px] text-fd-muted-foreground text-center break-keep">
                  2px 기둥 + 3가닥 깃털 (16px 힌팅)
                </p>
              </div>

              {/* 32px Favicon */}
              <div className="p-4 rounded-lg border border-fd-border bg-fd-background flex flex-col items-center justify-between gap-3 overflow-hidden">
                <div className="w-full flex justify-between items-center gap-2 text-[11px] font-mono border-b border-fd-border pb-2">
                  <span className="font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">32 × 32 px</span>
                  <span className="text-fd-muted-foreground break-keep">표준 파비콘</span>
                </div>
                <div className="w-full h-36 rounded-md overflow-hidden flex items-center justify-center border border-fd-border/60"
                  style={{ backgroundColor: !isDark ? '#FBF9F5' : '#12100E' }}
                >
                  <div
                    className="p-3 rounded flex items-center justify-center transition-transform origin-center"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <line x1="16" y1="14" x2="16" y2="3.5" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.75" strokeLinecap="round" />
                      <line x1="16" y1="14" x2="10.5" y2="5" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.75" strokeLinecap="round" />
                      <line x1="16" y1="14" x2="21.5" y2="5" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.75" strokeLinecap="round" />
                      <line x1="16" y1="14" x2="5.5" y2="8.5" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.75" strokeLinecap="round" />
                      <line x1="16" y1="14" x2="26.5" y2="8.5" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.75" strokeLinecap="round" />
                      <path d="M 5.5 8.5 Q 16 1.8 26.5 8.5" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.25" strokeLinecap="round" strokeDasharray="1.5 2" opacity="0.65" />
                      <circle cx="16" cy="14" r="1.5" fill={!isDark ? '#D97706' : '#F59E0B'} />
                      <line x1="16" y1="14" x2="16" y2="23" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2" strokeLinecap="round" />
                      <path d="M 16 22.5 C 14.2 24.5, 14.2 28, 16 29.5 C 17.8 28, 17.8 24.5, 16 22.5 Z" fill={!isDark ? '#D97706' : '#F59E0B'} />
                    </svg>
                  </div>
                </div>
                <p className="text-[11px] text-fd-muted-foreground text-center break-keep">
                  5방향 깃털 낙하산 + 2px 대 + 골드 씨앗
                </p>
              </div>

              {/* 64px Responsive Favicon */}
              <div className="p-4 rounded-lg border border-fd-border bg-fd-background flex flex-col items-center justify-between gap-3 overflow-hidden">
                <div className="w-full flex justify-between items-center gap-2 text-[11px] font-mono border-b border-fd-border pb-2">
                  <span className="font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">64 × 64 px</span>
                  <span className="text-fd-muted-foreground break-keep">반응형 마스터</span>
                </div>
                <div className="w-full h-36 rounded-md overflow-hidden flex items-center justify-center border border-fd-border/60"
                  style={{ backgroundColor: !isDark ? '#FBF9F5' : '#12100E' }}
                >
                  <div
                    className="p-2 rounded flex items-center justify-center transition-transform origin-center"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
                      <circle cx="32" cy="18" r="15" fill={!isDark ? '#D97706' : '#F59E0B'} opacity="0.14" />
                      <line x1="32" y1="28" x2="32" y2="6" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2" strokeLinecap="round" />
                      <line x1="32" y1="28" x2="21" y2="9" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2" strokeLinecap="round" />
                      <line x1="32" y1="28" x2="43" y2="9" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2" strokeLinecap="round" />
                      <line x1="32" y1="28" x2="12" y2="16" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2" strokeLinecap="round" />
                      <line x1="32" y1="28" x2="52" y2="16" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2" strokeLinecap="round" />
                      <line x1="32" y1="28" x2="7" y2="25" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.75" strokeLinecap="round" />
                      <line x1="32" y1="28" x2="57" y2="25" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.75" strokeLinecap="round" />
                      <path d="M 7 25 Q 32 3 57 25" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.25" strokeLinecap="round" strokeDasharray="2 3" opacity="0.6" />
                      <circle cx="32" cy="28" r="2.5" fill={!isDark ? '#D97706' : '#F59E0B'} />
                      <line x1="32" y1="28" x2="32" y2="47" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 32 46 C 28.5 50, 28.5 56.5, 32 59.5 C 35.5 56.5, 35.5 50, 32 46 Z" fill={!isDark ? '#D97706' : '#F59E0B'} />
                      <circle cx="32" cy="52" r="1.5" fill="#FFFFFF" opacity="0.4" />
                    </svg>
                  </div>
                </div>
                <p className="text-[11px] text-fd-muted-foreground text-center break-keep">
                  7방향 깃털 + 미세 골드 오라
                </p>
              </div>

              {/* 120px Master Emblem */}
              <div className="p-4 rounded-lg border border-fd-border bg-fd-background flex flex-col items-center justify-between gap-3 overflow-hidden">
                <div className="w-full flex justify-between items-center gap-2 text-[11px] font-mono border-b border-fd-border pb-2">
                  <span className="font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">120 × 120 px</span>
                  <span className="text-fd-muted-foreground break-keep">마스터 심볼</span>
                </div>
                <div className="w-full h-36 rounded-md overflow-hidden flex items-center justify-center border border-fd-border/60"
                  style={{ backgroundColor: !isDark ? '#FBF9F5' : '#12100E' }}
                >
                  <div
                    className="p-2 rounded flex items-center justify-center transition-transform origin-center"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <svg width="36" height="36" viewBox="0 0 120 120" fill="none">
                      <circle cx="60" cy="34" r="28" fill={!isDark ? '#D97706' : '#F59E0B'} opacity="0.12" />
                      <line x1="60" y1="52" x2="60" y2="12" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="60" y1="52" x2="39" y2="18" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2" strokeLinecap="round" />
                      <line x1="60" y1="52" x2="81" y2="18" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2" strokeLinecap="round" />
                      <line x1="60" y1="52" x2="22" y2="31" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2" strokeLinecap="round" />
                      <line x1="60" y1="52" x2="98" y2="31" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2" strokeLinecap="round" />
                      <line x1="60" y1="52" x2="13" y2="48" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="60" y1="52" x2="107" y2="48" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M 13 48 Q 60 8 107 48" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2.5 3.5" opacity="0.55" />
                      <circle cx="60" cy="52" r="3.5" fill={!isDark ? '#D97706' : '#F59E0B'} />
                      <line x1="60" y1="52" x2="60" y2="87" stroke={!isDark ? '#161616' : '#F7EEEC'} strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 60 86 C 53.5 93, 53.5 106, 60 112 C 66.5 106, 66.5 93, 60 86 Z" fill={!isDark ? '#D97706' : '#F59E0B'} />
                      <circle cx="60" cy="98" r="3" fill="#FFFFFF" opacity="0.35" />
                    </svg>
                  </div>
                </div>
                <p className="text-[11px] text-fd-muted-foreground text-center break-keep">
                  스튜디오 공식 마스터 홀씨 엠블럼
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Botanical Etching Motifs */}
        {activeTab === 'motifs' && (
          <div className="space-y-4">
            <p className="text-xs text-fd-muted-foreground break-keep">
              신문 칼럼 여백과 기사 종결부에 1도 단색 먹색으로 얹히는 보태니컬 펜 선화 4종 에셋입니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Motif 1: Sprout */}
              <div
                className="p-5 rounded-lg border flex flex-col items-center justify-between gap-3 text-center"
                style={{
                  backgroundColor: !isDark ? '#FBF9F5' : '#12100E',
                  borderColor: !isDark ? '#E5E7EB' : '#2D2A27',
                  color: !isDark ? '#161616' : '#F7EEEC',
                }}
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                  MOTIF 01 • SPROUT
                </span>
                <div className="p-3">
                  <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke="currentColor">
                    <path
                      d="M 16 30 L 16 14 C 16 9, 23 8, 26 12 C 26 7, 19 6, 16 11 C 13 6, 6 7, 6 12 C 9 8, 16 9, 16 14"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line x1="8" y1="30" x2="24" y2="30" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" opacity="0.6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold font-sans break-keep" style={{ color: !isDark ? '#161616' : '#F7EEEC' }}>
                    돌 틈의 싹
                  </h4>
                  <p className="text-[11px] mt-0.5 break-keep" style={{ color: !isDark ? '#57534E' : '#A8A29E' }}>
                    2px 줄기와 떡잎 선화
                  </p>
                </div>
              </div>

              {/* Motif 2: Golden Seed */}
              <div
                className="p-5 rounded-lg border flex flex-col items-center justify-between gap-3 text-center"
                style={{
                  backgroundColor: !isDark ? '#FBF9F5' : '#12100E',
                  borderColor: !isDark ? '#E5E7EB' : '#2D2A27',
                  color: !isDark ? '#161616' : '#F7EEEC',
                }}
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                  MOTIF 02 • SEED
                </span>
                <div className="p-3" style={{ color: !isDark ? '#D97706' : '#F59E0B' }}>
                  <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="3.5" fill="currentColor" />
                    <line x1="16" y1="10" x2="16" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="21.2" y1="19" x2="26.4" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="10.8" y1="19" x2="5.6" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold font-sans break-keep" style={{ color: !isDark ? '#161616' : '#F7EEEC' }}>
                    생명력의 씨앗
                  </h4>
                  <p className="text-[11px] mt-0.5 break-keep" style={{ color: !isDark ? '#57534E' : '#A8A29E' }}>
                    3방향 방사선 오르빗
                  </p>
                </div>
              </div>

              {/* Motif 3: Pappus */}
              <div
                className="p-5 rounded-lg border flex flex-col items-center justify-between gap-3 text-center"
                style={{
                  backgroundColor: !isDark ? '#FBF9F5' : '#12100E',
                  borderColor: !isDark ? '#E5E7EB' : '#2D2A27',
                  color: !isDark ? '#161616' : '#F7EEEC',
                }}
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                  MOTIF 03 • PAPPUS
                </span>
                <div className="p-3">
                  <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke="currentColor">
                    <path d="M 16 14 L 6 6 M 16 14 L 11 4 M 16 14 L 16 3 M 16 14 L 21 4 M 16 14 L 26 6" strokeWidth="1.75" strokeLinecap="round" />
                    <line x1="16" y1="14" x2="16" y2="22" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 16 22 C 14.5 24, 14.5 27, 16 29 C 17.5 27, 17.5 24, 16 22 Z" fill={!isDark ? '#D97706' : '#F59E0B'} stroke="none" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold font-sans break-keep" style={{ color: !isDark ? '#161616' : '#F7EEEC' }}>
                    비행하는 깃털 홀씨
                  </h4>
                  <p className="text-[11px] mt-0.5 break-keep" style={{ color: !isDark ? '#57534E' : '#A8A29E' }}>
                    지혜와 도구의 확산
                  </p>
                </div>
              </div>

              {/* Motif 4: End Mark */}
              <div
                className="p-5 rounded-lg border flex flex-col items-center justify-between gap-3 text-center"
                style={{
                  backgroundColor: !isDark ? '#FBF9F5' : '#12100E',
                  borderColor: !isDark ? '#E5E7EB' : '#2D2A27',
                  color: !isDark ? '#161616' : '#F7EEEC',
                }}
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                  MOTIF 04 • END MARK
                </span>
                <div className="p-3" style={{ color: !isDark ? '#D97706' : '#F59E0B' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="11" r="2.5" />
                    <path d="M 10 11 C 6 10, 4 14, 8 16 C 10 17, 11 14, 10 11 Z" />
                    <path d="M 14 11 C 18 10, 20 14, 16 16 C 14 17, 13 14, 14 11 Z" />
                    <path d="M 12 13 C 12 18, 9 20, 7 19.5 C 8 21, 13 21, 13.5 15 C 13.5 14, 12.5 13, 12 13 Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold font-sans break-keep" style={{ color: !isDark ? '#161616' : '#F7EEEC' }}>
                    기사 종결부호 ❦
                  </h4>
                  <p className="text-[11px] mt-0.5 break-keep" style={{ color: !isDark ? '#57534E' : '#A8A29E' }}>
                    본문 끝에 놓이는 인쇄 부호
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 85:15 Visual Constitution */}
        {activeTab === 'constitution' && (
          <div className="space-y-6">
            {/* Visual Bar Breakdown */}
            <div className="space-y-2">
              <div className="flex flex-wrap justify-between gap-2 text-xs font-mono">
                <span className="font-bold text-fd-foreground break-keep">85% 신문 조판 그리드 &amp; 활판 인쇄</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 break-keep">15% 1도 보태니컬 에칭</span>
              </div>
              <div className="w-full h-4 rounded-full overflow-hidden flex border border-fd-border">
                <div className="h-full bg-stone-800 dark:bg-stone-200" style={{ width: '85%' }} />
                <div className="h-full bg-amber-500" style={{ width: '15%' }} />
              </div>
            </div>

            {/* Constitution Details Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-fd-border bg-fd-background space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-fd-foreground flex items-center gap-2 break-keep">
                  <span className="w-2 h-2 rounded-full bg-stone-800 dark:bg-stone-200 shrink-0" />
                  <span>85% 시스템 골격 (System Grid)</span>
                </h4>
                <ul className="text-xs text-fd-muted-foreground space-y-1.5 list-disc list-inside break-keep">
                  <li>The True 2px Stem (정직한 2.0px 중심축 및 경계선)</li>
                  <li>1px / 2px 물리적 헤어라인 분할선</li>
                  <li>따뜻한 미색 재생 신문용지 (#FBF9F5)</li>
                  <li>깊은 활판 인쇄 먹색 활자 (#161616)</li>
                  <li>Cormorant Garamond 700 클래식 세리프 활자</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-fd-border bg-fd-background space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2 break-keep">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>15% 그래픽 악센트 (Vitality Accent)</span>
                </h4>
                <ul className="text-xs text-fd-muted-foreground space-y-1.5 list-disc list-inside break-keep">
                  <li>지면 구석에 작고 단정하게 얹히는 1도 선화 에칭</li>
                  <li>생명력을 밝히는 단 하나의 앰버 골드 (#D97706 / #F59E0B)</li>
                  <li>비바람에 깎여 나간 4px / 6px 자연석 라운딩</li>
                  <li>기사 본문 종결부호 ❦</li>
                  <li>가독성을 지키는 2% 초미세 종이 그레인</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
