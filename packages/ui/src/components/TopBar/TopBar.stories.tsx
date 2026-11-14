import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';

const meta = {
  title: 'Navigation/TopBar',
  component: TopBar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Nav = () => (
  <>
    <a className="text-sm text-text-secondary hover:text-text-primary" href="#docs">Docs</a>
    <a className="text-sm text-text-secondary hover:text-text-primary" href="#components">Components</a>
    <a className="text-sm text-text-secondary hover:text-text-primary" href="#showcase">Showcase</a>
  </>
);

export const Default: Story = {
  render: (args) => (
    <TopBar
      {...args}
      brand={<span className="text-base font-semibold text-text-primary">민들레</span>}
      nav={<Nav />}
      actions={<span className="text-xs text-text-muted">GitHub · 테마</span>}
    />
  ),
};

export const WithoutNav: Story = {
  render: (args) => (
    <TopBar
      {...args}
      brand={<span className="text-base font-semibold text-text-primary">민들레</span>}
      actions={<span className="text-xs text-text-muted">검색</span>}
    />
  ),
};

export const NotSticky: Story = {
  args: { sticky: false },
  render: (args) => (
    <TopBar
      {...args}
      brand={<span className="text-base font-semibold text-text-primary">민들레</span>}
      nav={<Nav />}
    />
  ),
};
