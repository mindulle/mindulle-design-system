"use client";
import React from 'react';

export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  /** 좌측 브랜드 슬롯 (로고 등) */
  brand?: React.ReactNode;
  /** 중앙 내비게이션 슬롯 */
  nav?: React.ReactNode;
  /** 우측 액션 슬롯 (테마 토글, 검색, GitHub 등) */
  actions?: React.ReactNode;
  /** 스크롤 시 상단 고정 (기본 true) */
  sticky?: boolean;
}

/**
 * TopBar — 데스크톱 공통 헤더 (Figma: Navigation/TopBar)
 * 높이 64px, 좌우 패딩 24px, 슬롯 3분할(브랜드/내비/액션).
 */
export function TopBar({
  brand,
  nav,
  actions,
  sticky = true,
  className = '',
  ...props
}: TopBarProps) {
  const classes = [
    'w-full h-16 px-6 flex items-center gap-6',
    'bg-bg-surface border-b border-border-default',
    sticky ? 'sticky top-0 z-40 backdrop-blur-md' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes} {...props}>
      {brand ? <div className="flex items-center shrink-0">{brand}</div> : null}
      {nav ? (
        <nav className="flex items-center gap-8 flex-1 min-w-0" aria-label="주요 메뉴">
          {nav}
        </nav>
      ) : (
        <div className="flex-1" />
      )}
      {actions ? <div className="flex items-center gap-2 shrink-0">{actions}</div> : null}
    </header>
  );
}

TopBar.displayName = 'TopBar';
