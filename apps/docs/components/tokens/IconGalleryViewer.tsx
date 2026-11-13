'use client';

import React, { useState } from 'react';
import * as Icons from '@mindulle/icons';
import { Copy, Check, Search } from 'lucide-react';

const coreIcons = [
  { name: 'MdsAddIcon', legacy: 'SngAddIcon', desc: '항목 추가, 플러스 동작' },
  { name: 'MdsArrowRightIcon', legacy: 'SngArrowRightIcon', desc: '다음 단계, 이동, 링크' },
  { name: 'MdsCheckIcon', legacy: 'SngCheckIcon', desc: '완료, 체크박스 확인' },
  { name: 'MdsCloseIcon', legacy: 'SngCloseIcon', desc: '닫기, 삭제, 모달 해제' },
  { name: 'MdsDocumentIcon', legacy: 'SngDocumentIcon', desc: '문서, 사양서, 기술 아티클' },
  { name: 'MdsHomeIcon', legacy: 'SngHomeIcon', desc: '홈, 관문 대시보드' },
  { name: 'MdsMenuIcon', legacy: 'SngMenuIcon', desc: '햄버거 메뉴, 사이드바 토글' },
  { name: 'MdsSearchIcon', legacy: 'SngSearchIcon', desc: '검색 폼, 쿼리 탐색' },
  { name: 'MdsUserIcon', legacy: 'SngUserIcon', desc: '사용자 프로필, 아틀리에 장인' },
];

export function IconGalleryViewer() {
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = coreIcons.filter((icon) =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.desc.includes(searchTerm)
  );

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<${name} size={20} />`);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1500);
  };

  return (
    <div className="my-6 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="아이콘 이름 또는 용도 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded-md border border-fd-border bg-fd-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
        />
        <Search className="absolute left-3 top-2.5 size-4 text-fd-muted-foreground" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
        {filteredIcons.map((icon) => {
          const IconComponent = Icons[icon.name as keyof typeof Icons] as React.ElementType;
          if (!IconComponent) return null;
          const isCopied = copiedName === icon.name;

          return (
            <button
              key={icon.name}
              type="button"
              onClick={() => handleCopy(icon.name)}
              className="flex flex-col items-center p-4 rounded-lg border border-fd-border bg-fd-card hover:border-amber-500/50 hover:bg-fd-accent/20 transition-all text-left group relative"
            >
              <div className="p-3 rounded-md bg-fd-muted/30 mb-2 group-hover:scale-110 transition-transform">
                <IconComponent size={28} className="text-fd-foreground" strokeWidth={2} />
              </div>
              <span className="font-mono text-xs font-semibold text-fd-foreground text-center">
                {icon.name}
              </span>
              <span className="text-[11px] text-fd-muted-foreground text-center mt-1">
                {icon.desc}
              </span>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {isCopied ? (
                  <Check className="size-3.5 text-emerald-500" />
                ) : (
                  <Copy className="size-3.5 text-fd-muted-foreground" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
