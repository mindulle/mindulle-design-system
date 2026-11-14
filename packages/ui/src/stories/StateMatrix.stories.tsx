import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { Badge } from '../components/Badge/Badge';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Radio } from '../components/Radio/Radio';
import { Card } from '../components/Card/Card';

const meta: Meta = {
  title: 'QA/State Matrix',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="p-8 bg-bg-base min-h-screen text-text-primary">
    <h2 className="text-lg font-semibold mb-6">State Matrix</h2>
    {children}
  </div>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-start gap-6 border-b border-border-subtle py-4">
    <div className="w-28 shrink-0 pt-2 text-xs font-medium text-text-muted">{label}</div>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
);

const STATES = ['default', 'hover', 'active', 'disabled'] as const;
const VARIANTS = ['primary', 'secondary', 'danger'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

export const Buttons: Story = {
  render: () => (
    <Shell>
      {VARIANTS.map((variant) => (
        <Row key={variant} label={variant}>
          {STATES.map((state) => (
            <Button key={state} variant={variant} state={state} size="md">
              {state}
            </Button>
          ))}
        </Row>
      ))}
      <Row label="sizes">
        {SIZES.map((size) => (
          <Button key={size} variant="primary" size={size}>
            {size}
          </Button>
        ))}
      </Row>
    </Shell>
  ),
};

export const Forms: Story = {
  render: () => (
    <Shell>
      <Row label="Input">
        <Input placeholder="기본 입력" />
        <Input placeholder="오류 상태" error />
        <Input placeholder="비활성" disabled />
      </Row>
      <Row label="Checkbox">
        <Checkbox label="미선택" />
        <Checkbox label="선택됨" defaultChecked />
        <Checkbox label="부분 선택" indeterminate />
        <Checkbox label="비활성" disabled />
      </Row>
      <Row label="Radio">
        <Radio name="matrix" label="미선택" />
        <Radio name="matrix" label="선택됨" defaultChecked />
        <Radio name="matrix2" label="비활성" disabled />
      </Row>
    </Shell>
  ),
};

export const Badges: Story = {
  render: () => (
    <Shell>
      {(['pill', 'label'] as const).map((variant) => (
        <Row key={variant} label={variant}>
          {(['info', 'success', 'warning', 'danger'] as const).map((color) => (
            <Badge key={color} variant={variant} color={color}>
              {color}
            </Badge>
          ))}
        </Row>
      ))}
    </Shell>
  ),
};

export const Cards: Story = {
  render: () => (
    <Shell>
      <Row label="elevation">
        {(['flat', 'raised', 'floating'] as const).map((elevation) => (
          <div key={elevation} className="w-64">
            <Card elevation={elevation}>
              <span className="text-sm font-semibold">{elevation}</span>
              <span className="text-xs text-text-secondary">카드 표면 예시</span>
            </Card>
          </div>
        ))}
      </Row>
    </Shell>
  ),
};
