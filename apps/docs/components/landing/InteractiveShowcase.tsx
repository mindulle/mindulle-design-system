'use client';

import React, { useState } from 'react';
import { Button, Badge, Card, Input, Checkbox, MindulleLogo } from '@mindulle/ui';
import { Sparkles, Check, Copy, Sliders, Shield } from 'lucide-react';

export function InteractiveShowcase() {
  const [buttonVariant, setButtonVariant] = useState<'primary' | 'secondary' | 'danger'>('primary');
  const [buttonSize, setButtonSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [badgeColor, setBadgeColor] = useState<'info' | 'success' | 'warning' | 'danger'>(
    'success'
  );
  const [inputText, setInputText] = useState('겨울 끝, 민들레');
  const [isChecked, setIsChecked] = useState(true);
  const [copied, setCopied] = useState(false);

  const getCodeSnippet = () => {
    return `<Button variant="${buttonVariant}" size="${buttonSize}">
  시작하기
</Button>
<Badge variant="pill" color="${badgeColor}">
  ${badgeColor.toUpperCase()}
</Badge>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full my-12 rounded-sm border-2 border-fd-border bg-fd-card/90 shadow-sm overflow-hidden text-left">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-fd-border bg-fd-muted/40 px-5 py-3.5 gap-3">
        <div className="flex items-center gap-2">
          <Sliders className="size-4 text-amber-500" />
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-fd-foreground">
            MDS Live Component Playground
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">
            Interactive
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded bg-fd-background border border-fd-border hover:border-amber-500 transition-colors"
        >
          {copied ? (
            <Check className="size-3.5 text-green-500" />
          ) : (
            <Copy className="size-3.5 text-fd-muted-foreground" />
          )}
          <span>{copied ? '복사됨!' : '코드 복사'}</span>
        </button>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-fd-border">
        {/* Left: Controls Column */}
        <div className="lg:col-span-4 p-5 space-y-5 bg-fd-muted/20">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-fd-muted-foreground mb-2">
              Button Variant
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['primary', 'secondary', 'danger'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setButtonVariant(v)}
                  className={`text-xs py-1.5 px-2 rounded-sm font-medium border transition-colors capitalize ${
                    buttonVariant === v
                      ? 'bg-amber-500/15 border-amber-500 text-amber-500 font-bold'
                      : 'border-fd-border hover:bg-fd-muted/50 text-fd-muted-foreground'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-fd-muted-foreground mb-2">
              Button Size
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setButtonSize(s)}
                  className={`text-xs py-1.5 px-2 rounded-sm font-medium border transition-colors uppercase ${
                    buttonSize === s
                      ? 'bg-amber-500/15 border-amber-500 text-amber-500 font-bold'
                      : 'border-fd-border hover:bg-fd-muted/50 text-fd-muted-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-fd-muted-foreground mb-2">
              Badge Status
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['info', 'success', 'warning', 'danger'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setBadgeColor(c)}
                  className={`text-xs py-1 px-2 rounded-sm font-medium border transition-colors uppercase ${
                    badgeColor === c
                      ? 'bg-amber-500/15 border-amber-500 text-amber-500 font-bold'
                      : 'border-fd-border hover:bg-fd-muted/50 text-fd-muted-foreground'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-fd-muted-foreground mb-2">
              Input Text
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full text-xs p-2 rounded-sm border-2 border-fd-border bg-fd-card text-fd-foreground focus:outline-none focus:border-amber-500 font-medium"
            />
          </div>
        </div>

        {/* Right: Live Interactive Canvas */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-center gap-6 bg-fd-background/50">
          <Card className="p-6 border-2 border-fd-border bg-fd-card text-fd-card-foreground shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <MindulleLogo size={36} />
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-fd-foreground">
                    Mindulle Atelier Component
                  </h4>
                  <p className="text-xs text-fd-muted-foreground">
                    The True 2px Stem &amp; 4px Weathered Radius 실측 검증
                  </p>
                </div>
              </div>
              <Badge variant="pill" color={badgeColor}>
                {badgeColor.toUpperCase()}
              </Badge>
            </div>

            <div className="space-y-4 my-6">
              <div>
                <label className="block text-xs font-semibold text-fd-foreground mb-1.5">
                  프로젝트 라벨
                </label>
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="텍스트를 입력하세요"
                  className="!bg-fd-background !text-fd-foreground !border-2 !border-fd-border font-medium focus:!border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="live-checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  label="The True 2px Stem 헌법 준수 모드 활성화"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t-2 border-fd-border">
              <Button variant={buttonVariant} size={buttonSize}>
                <Sparkles className="size-4" />
                <span>선택된 액션 실행</span>
              </Button>
              <Button variant="secondary" size={buttonSize}>
                취소
              </Button>
            </div>
          </Card>

          {/* Under-the-hood spec bar */}
          <div className="p-3 rounded-sm border border-fd-border bg-fd-muted/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-fd-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="size-3.5 text-amber-500" />
              <span>
                Stroke: <strong>2.0px Solid</strong>
              </span>
              <span>•</span>
              <span>
                Radius: <strong>4px/6px Weathered</strong>
              </span>
            </div>
            <div className="text-amber-500 font-bold">WCAG AAA COMPLIANT</div>
          </div>
        </div>
      </div>
    </div>
  );
}
