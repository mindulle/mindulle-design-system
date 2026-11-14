import type { Meta, StoryObj } from '@storybook/react';
import { MobileHeader } from './MobileHeader';

const meta = {
  title: 'Navigation/MobileHeader',
  component: MobileHeader,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof MobileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '민들레 MDS v0.1.0',
    onMenuClick: () => undefined,
  },
  render: (args) => (
    <div className="w-[390px] mx-auto">
      <MobileHeader {...args} />
    </div>
  ),
};

export const WithActions: Story = {
  args: {
    title: '민들레 MDS v0.1.0',
    onMenuClick: () => undefined,
    actions: <span className="text-xs text-text-muted">검색</span>,
  },
  render: (args) => (
    <div className="w-[390px] mx-auto">
      <MobileHeader {...args} />
    </div>
  ),
};
