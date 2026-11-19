'use client';

import React, { useState } from 'react';
import { Button, Badge, Card, Input, Checkbox } from '@mindulle/ui';

export function InstrumentWorkbench() {
  const [buttonVariant, setButtonVariant] = useState<'primary' | 'secondary' | 'danger'>('primary');
  const [buttonSize, setButtonSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [badgeColor, setBadgeColor] = useState<'info' | 'success' | 'warning' | 'danger'>(
    'success'
  );
  const [inputText, setInputText] = useState('겨울 끝, 민들레');
  const [isChecked, setIsChecked] = useState(true);
  const [copied, setCopied] = useState(false);

  const snippet = `<Button variant="${buttonVariant}" size="${buttonSize}">
  확인
</Button>
<Badge variant="pill" color="${badgeColor}">
  ${badgeColor.toUpperCase()}
</Badge>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      id="instrument"
      aria-labelledby="instrument-heading"
      className="py-10 border-b border-[var(--color-fd-border)]"
    >
      <div className="flex flex-wrap justify-between items-baseline gap-3 mb-6">
        <div>
          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[var(--mds-color-brand-primary)] block mb-1.5">
            03 · Instrument
          </span>
          <h3 id="instrument-heading" className="text-[15px] font-semibold m-0">
            값을 직접 바꾸는 작업대
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.08em] text-[var(--color-fd-muted-foreground)]">
            LIVE BUILD · @MINDULLE/UI
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="font-mono text-[10.5px] tracking-[0.06em] px-2.5 py-1 border border-[var(--color-fd-border)] rounded-[4px] bg-[var(--color-fd-card)] text-[var(--color-fd-foreground)] hover:border-[var(--mds-color-brand-primary)] transition-colors cursor-pointer"
          >
            {copied ? 'COPIED' : 'COPY JSX'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] border border-[var(--color-fd-border)] bg-[var(--color-fd-card)]">
        {/* Controls Column */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-[var(--color-fd-border)] space-y-5 text-left">
          <div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-fd-muted-foreground)] block mb-2">
              Button Variant
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(['primary', 'secondary', 'danger'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setButtonVariant(v)}
                  className={
                    buttonVariant === v
                      ? 'font-mono text-[11px] px-2.5 py-1 rounded-[4px] border border-[var(--mds-color-brand-primary)] bg-[var(--mds-color-brand-primary)] text-[var(--color-fd-primary-foreground)] cursor-pointer'
                      : 'font-mono text-[11px] px-2.5 py-1 rounded-[4px] border border-[var(--color-fd-border)] bg-transparent text-[var(--mds-color-text-secondary)] hover:border-[var(--color-fd-foreground)] cursor-pointer'
                  }
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-fd-muted-foreground)] block mb-2">
              Button Size
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setButtonSize(s)}
                  className={
                    buttonSize === s
                      ? 'font-mono text-[11px] px-2.5 py-1 rounded-[4px] border border-[var(--mds-color-brand-primary)] bg-[var(--mds-color-brand-primary)] text-[var(--color-fd-primary-foreground)] cursor-pointer'
                      : 'font-mono text-[11px] px-2.5 py-1 rounded-[4px] border border-[var(--color-fd-border)] bg-transparent text-[var(--mds-color-text-secondary)] hover:border-[var(--color-fd-foreground)] cursor-pointer'
                  }
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-fd-muted-foreground)] block mb-2">
              Badge Semantic Role
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(['info', 'success', 'warning', 'danger'] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setBadgeColor(c)}
                  className={
                    badgeColor === c
                      ? 'font-mono text-[11px] px-2.5 py-1 rounded-[4px] border border-[var(--mds-color-brand-primary)] bg-[var(--mds-color-brand-primary)] text-[var(--color-fd-primary-foreground)] cursor-pointer'
                      : 'font-mono text-[11px] px-2.5 py-1 rounded-[4px] border border-[var(--color-fd-border)] bg-transparent text-[var(--mds-color-text-secondary)] hover:border-[var(--color-fd-foreground)] cursor-pointer'
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--color-fd-border)]">
            <pre className="font-mono text-[11px] leading-[1.6] text-[var(--mds-color-text-secondary)] overflow-x-auto m-0">
              <code>{snippet}</code>
            </pre>
          </div>
        </div>

        {/* Live Specimen Preview */}
        <div className="p-6 sm:p-8 bg-[var(--color-fd-muted)] flex flex-col justify-between gap-6">
          <div className="flex items-center justify-between font-mono text-[9.5px] tracking-[0.12em] text-[var(--color-fd-muted-foreground)]">
            <span>PLATE LIVE — INTERACTIVE</span>
            <span>2px STEM · 4px RADIUS</span>
          </div>

          <Card elevation="flat" className="w-full max-w-md mx-auto">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--color-fd-muted-foreground)]">
                Token Specimen
              </span>
              <Badge variant="pill" color={badgeColor}>
                {badgeColor.toUpperCase()}
              </Badge>
            </div>

            <label className="block space-y-1.5 text-left">
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--color-fd-muted-foreground)] block">
                표제 입력
              </span>
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="텍스트를 입력하세요"
              />
            </label>

            <Checkbox
              label="2px 획 · 4px 곡률 토큰 적용"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />

            <div className="pt-2 flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-[var(--color-fd-muted-foreground)] truncate">
                {inputText || '—'}
              </span>
              <Button variant={buttonVariant} size={buttonSize}>
                확인
              </Button>
            </div>
          </Card>

          <div className="font-mono text-[10px] text-[var(--color-fd-muted-foreground)] flex justify-between">
            <span>variant={buttonVariant}</span>
            <span>size={buttonSize}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
