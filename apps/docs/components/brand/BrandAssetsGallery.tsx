'use client';

import React, { useState } from 'react';
import { Download, Copy, Check, Package } from 'lucide-react';

interface BrandAssetItem {
  id: string;
  title: string;
  subtitle: string;
  minSize: string;
  lightSrc: string;
  darkSrc: string;
  lightPath: string;
  darkPath: string;
}

const BRAND_ASSETS: BrandAssetItem[] = [
  {
    id: 'master-seal',
    title: '마스터 인장 (Master Seal)',
    subtitle: '공식 문서 · 인증 · 포털 헤더',
    minSize: '화면 64×64px / 인쇄 20×20mm 이상',
    lightSrc: '/brand-assets/master-seal-light.svg',
    darkSrc: '/brand-assets/master-seal.svg',
    lightPath: '01_master_seal/light/master-seal-light.svg',
    darkPath: '01_master_seal/dark/master-seal.svg',
  },
  {
    id: 'master-symbol',
    title: '마스터 심볼 (Master Symbol)',
    subtitle: '아이콘 단독 · 앱 런처 · 스탬프',
    minSize: '화면 32×32px / 인쇄 10×10mm 이상',
    lightSrc: '/brand-assets/master-symbol-light.svg',
    darkSrc: '/brand-assets/master-symbol-dark.svg',
    lightPath: '01_master_seal/light/master-symbol-light.svg',
    darkPath: '01_master_seal/dark/master-symbol-dark.svg',
  },
  {
    id: 'favicon-32',
    title: '표준 파비콘 (Favicon 32px)',
    subtitle: '브라우저 탭 · 북마크 바',
    minSize: '32×32px 기준',
    lightSrc: '/brand-assets/favicon-32.svg',
    darkSrc: '/brand-assets/favicon-32.svg',
    lightPath: '04_touchpoints/favicons/favicon-32.svg',
    darkPath: '04_touchpoints/favicons/favicon-32.svg',
  },
  {
    id: 'favicon-16',
    title: '극소형 파비콘 (Favicon 16px)',
    subtitle: '고밀도 16px 힌팅 심볼',
    minSize: '16×16px 전용',
    lightSrc: '/brand-assets/favicon-16.svg',
    darkSrc: '/brand-assets/favicon-16.svg',
    lightPath: '04_touchpoints/favicons/favicon-16.svg',
    darkPath: '04_touchpoints/favicons/favicon-16.svg',
  },
  {
    id: 'social-card',
    title: '소셜 카드 (OG / Social Card)',
    subtitle: '링크 미리보기 · 공유 썸네일',
    minSize: '1200×630px 비율',
    lightSrc: '/brand-assets/social-card-light.svg',
    darkSrc: '/brand-assets/social-card-dark.svg',
    lightPath: '04_touchpoints/social_cards/social-card-light.svg',
    darkPath: '04_touchpoints/social_cards/social-card-dark.svg',
  },
];

export function BrandAssetsGallery() {
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isDark = previewTheme === 'dark';

  const handleCopySvg = async (id: string, src: string) => {
    try {
      const res = await fetch(src);
      const svgText = await res.text();
      await navigator.clipboard.writeText(svgText);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback: copy public path if clipboard fails
      setCopiedId(null);
    }
  };

  return (
    <div data-audit-block="specimen" className="w-full my-8 rounded-xl border border-fd-border bg-fd-card overflow-hidden not-prose">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fd-border bg-fd-muted/30 px-4 py-3">
        <div className="flex items-center rounded-lg border border-fd-border bg-fd-background p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setPreviewTheme('light')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors break-keep ${
              !isDark
                ? 'bg-brand-primary/10 text-brand-primary font-bold'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            미색 신문지
          </button>
          <button
            type="button"
            onClick={() => setPreviewTheme('dark')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors break-keep ${
              isDark
                ? 'bg-brand-primary/20 text-brand-primary font-bold'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            아카이벌 다크
          </button>
        </div>

        <a
          href="/brand-assets/mindulle-brand-kit-v0.1.0.zip"
          download="mindulle-brand-kit-v0.1.0.zip"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border border-fd-border bg-fd-background text-fd-foreground hover:border-brand-primary transition-colors break-keep"
        >
          <Package size={14} className="shrink-0 text-brand-primary dark:text-brand-primary" />
          <span>전체 브랜드 킷 (.zip)</span>
          <Download size={12} className="shrink-0 opacity-75" />
        </a>
      </div>

      {/* Asset Grid */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {BRAND_ASSETS.map((asset) => {
          const src = isDark ? asset.darkSrc : asset.lightSrc;
          const officialPath = isDark ? asset.darkPath : asset.lightPath;
          const fileName = src.split('/').pop() || `${asset.id}.svg`;
          const isSocial = asset.id === 'social-card';

          return (
            <div
              key={asset.id}
              className={`rounded-lg border border-fd-border bg-fd-background overflow-hidden flex flex-col ${
                isSocial ? 'md:col-span-2' : ''
              }`}
            >
              {/* Preview Canvas */}
              <div
                className={`w-full flex items-center justify-center border-b border-fd-border transition-colors ${
                  isSocial ? 'h-56 sm:h-64 p-4' : 'h-36 p-6'
                }`}
                style={{
                  backgroundColor: isDark ? '#12100E' : '#FBF9F5',
                }}
              >
                <div
                  className={`flex items-center justify-center ${
                    isSocial
                      ? 'w-full h-full'
                      : isDark && asset.id !== 'master-seal'
                        ? 'bg-paper p-3 rounded-lg border border-paper-line'
                        : 'w-full h-full'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={asset.title}
                    className={
                      isSocial
                        ? 'w-full h-full object-contain'
                        : 'max-h-full max-w-full object-contain'
                    }
                  />
                </div>
              </div>

              {/* Meta + Actions */}
              <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-fd-foreground break-keep">
                      {asset.title}
                    </h4>
                    <span className="text-2xs font-mono text-fd-muted-foreground shrink-0">
                      SVG
                    </span>
                  </div>
                  <p className="text-xs text-fd-muted-foreground break-keep">
                    {asset.subtitle} · {asset.minSize}
                  </p>
                  <code className="block text-2xs font-mono text-fd-muted-foreground truncate pt-0.5">
                    {officialPath}
                  </code>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-fd-border">
                  <button
                    type="button"
                    onClick={() => handleCopySvg(asset.id, src)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border border-fd-border bg-fd-card text-fd-foreground hover:bg-fd-muted transition-colors break-keep"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check size={12} className="text-emerald-500" />
                        <span>SVG 복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>SVG 복사</span>
                      </>
                    )}
                  </button>

                  <a
                    href={src}
                    download={fileName}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border border-fd-border bg-fd-card text-fd-foreground hover:bg-fd-muted transition-colors break-keep"
                  >
                    <Download size={12} />
                    <span>다운로드</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
