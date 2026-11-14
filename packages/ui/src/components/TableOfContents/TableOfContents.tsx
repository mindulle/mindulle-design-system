"use client";
import React from 'react';

export interface TocItem {
  /** 앵커 대상 id (예: 'design-philosophy') */
  id: string;
  /** 표시 텍스트 */
  label: string;
  /** 들여쓰기 단계 (0 = 최상위) */
  depth?: number;
}

export interface TableOfContentsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** 카드 제목 (기본 'Table of Contents') */
  title?: string;
  /** 목차 항목 */
  items: TocItem[];
  /** 현재 활성 항목 id */
  activeId?: string;
  /** 항목 클릭 콜백 (앵커 기본 동작과 별도 처리용) */
  onSelect?: (id: string) => void;
}

/**
 * TableOfContents — 문헌형 목차 (Figma: Navigation/TableOfContents)
 * radius 12px, 패딩 16px, 항목 높이 28px, 활성 항목은 골드 보더/텍스트.
 */
export function TableOfContents({
  title = 'Table of Contents',
  items,
  activeId,
  onSelect,
  className = '',
  ...props
}: TableOfContentsProps) {
  const classes = [
    'flex flex-col gap-4 p-4 w-full',
    'bg-bg-surface border border-border-default rounded-lg',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={classes} aria-label="목차" {...props}>
      <p className="text-text-primary text-sm font-semibold">{title}</p>

      <ul className="flex flex-col gap-2 list-none m-0 p-0">
        {items.map((item) => {
          const active = item.id === activeId;
          const depth = item.depth ?? 0;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => onSelect?.(item.id)}
                aria-current={active ? 'location' : undefined}
                style={{ paddingLeft: 12 + depth * 12 }}
                className={[
                  'block py-1 text-sm border-l-2 transition-colors',
                  active
                    ? 'border-brand-primary text-brand-primary font-medium'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-default',
                ].join(' ')}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

TableOfContents.displayName = 'TableOfContents';
