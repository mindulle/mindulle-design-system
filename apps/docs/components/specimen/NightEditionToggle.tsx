'use client';

import React, { useEffect, useState } from 'react';

export function NightEditionToggle() {
  const [isNight, setIsNight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const initialNight =
      root.classList.contains('dark') ||
      root.dataset.theme === 'dark' ||
      localStorage.getItem('theme') === 'dark';
    setIsNight(initialNight);
  }, []);

  const toggle = () => {
    const next = !isNight;
    setIsNight(next);
    const root = document.documentElement;
    root.classList.toggle('dark', next);
    root.dataset.theme = next ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // ignore storage restrictions
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={mounted ? isNight : undefined}
      className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--color-fd-muted-foreground)] hover:text-[var(--mds-color-brand-primary)] transition-colors cursor-pointer bg-transparent border-0 p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mds-color-brand-primary)]"
    >
      {mounted ? (isNight ? '주간판 · Day' : '야간판 · Night') : '야간판 · Night'}
    </button>
  );
}
