'use client';

import { useEffect, useState } from 'react';

export interface UseActiveSectionOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * IntersectionObserver 기반으로 현재 뷰포트에서 가장 위쪽에 보이는 섹션 ID를 반환합니다.
 * 아무 섹션도 보이지 않으면 마지막 활성 ID를 유지하며, SSR 환경에서는 null을 반환합니다.
 */
export function useActiveSection(
  ids: string[],
  options?: UseActiveSectionOptions
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const rootMargin = options?.rootMargin ?? '-80px 0px -60% 0px';
  const threshold = options?.threshold ?? 0;
  const idsKey = ids.join('\0');

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      ids.length === 0
    ) {
      return;
    }

    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleIds.add(id);
          } else {
            visibleIds.delete(id);
          }
        }

        const topmost = ids.find((id) => visibleIds.has(id));
        if (topmost !== undefined) {
          setActiveId(topmost);
        }
      },
      { rootMargin, threshold }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    }

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, rootMargin, threshold]);

  return activeId;
}
