"use client";
import React from 'react';

export interface MobileHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** 좌측 브랜드/타이틀 */
  title?: React.ReactNode;
  /** 메뉴 버튼 클릭 핸들러 */
  onMenuClick?: () => void;
  /** 메뉴 버튼 접근성 라벨 */
  menuLabel?: string;
  /** 우측 추가 액션 슬롯 */
  actions?: React.ReactNode;
}

/**
 * MobileHeader — 모바일 공통 헤더 (Figma: Navigation/Mobile-Header)
 * 높이 56px, 좌우 패딩 16px, 좌측 타이틀 + 우측 메뉴 버튼.
 */
export function MobileHeader({
  title,
  onMenuClick,
  menuLabel = '메뉴 열기',
  actions,
  className = '',
  ...props
}: MobileHeaderProps) {
  const classes = [
    'w-full h-14 px-4 flex items-center justify-between gap-3',
    'bg-bg-surface border-b border-border-default',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes} {...props}>
      <div className="flex items-center gap-2 min-w-0 text-text-primary text-base font-medium truncate">
        {title}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {actions}
        {onMenuClick ? (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label={menuLabel}
            className="inline-flex items-center justify-center w-10 h-10 rounded-md text-text-primary hover:bg-bg-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5.5h14M3 10h14M3 14.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        ) : null}
      </div>
    </header>
  );
}

MobileHeader.displayName = 'MobileHeader';
