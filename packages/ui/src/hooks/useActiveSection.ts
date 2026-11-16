'use client';

import { useEffect, useRef, useState } from 'react';

export interface UseActiveSectionOptions {
  rootMargin?: string;
  threshold?: number;
  endThreshold?: number;
}

/**
 * IntersectionObserver 기반으로 현재 뷰포트에서 가장 위쪽에 보이는 섹션 ID를 반환합니다.
 * 초기 상태에서는 첫 번째 ID를 활성으로 두고, 문서 끝에 도달하면 마지막 ID를 우선 반환합니다.
 * 아무 섹션도 보이지 않으면 마지막 활성 ID를 유지하며, SSR 환경에서는 초기값만 반환합니다.
 */
export function useActiveSection(
  ids: string[],
  options?: UseActiveSectionOptions
): string | null {
  const [activeId, setActiveId] = useState<string | null>(() => ids[0] ?? null);
  const observedIdRef = useRef<string | null>(ids[0] ?? null);
  const rootMargin = options?.rootMargin ?? '-80px 0px -60% 0px';
  const threshold = options?.threshold ?? 0;
  const endThreshold = options?.endThreshold ?? 2;
  const idsKey = ids.join('\0');

  useEffect(() => {
    const fallbackId = ids[0] ?? null;
    if (observedIdRef.current === null || !ids.includes(observedIdRef.current)) {
      observedIdRef.current = fallbackId;
    }
    setActiveId((prev) => (prev !== null && ids.includes(prev) ? prev : fallbackId));

    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      ids.length === 0
    ) {
      return;
    }

    const isAtBottom = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      if (scrollHeight <= 0) return false;
      return window.innerHeight + window.scrollY >= scrollHeight - endThreshold;
    };

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
          observedIdRef.current = topmost;
          if (!isAtBottom()) {
            setActiveId(topmost);
          }
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

    let rafId: number | null = null;
    let scheduled = false;
    const syncScrollState = () => {
      scheduled = false;
      rafId = null;
      if (isAtBottom()) {
        setActiveId(ids[ids.length - 1]);
      } else {
        setActiveId(observedIdRef.current);
      }
    };

    const onScrollOrResize = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = window.requestAnimationFrame(syncScrollState);
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, rootMargin, threshold, endThreshold]);

  return activeId;
}
