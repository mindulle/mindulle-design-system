import type { Meta, StoryObj } from '@storybook/react';
import { TableOfContents } from './TableOfContents';

const meta = {
  title: 'Navigation/TableOfContents',
  component: TableOfContents,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof TableOfContents>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: 'philosophy', label: '1. 디자인 철학' },
  { id: 'colors', label: '2. 색상 시스템' },
  { id: 'typography', label: '3. 타이포그래피' },
  { id: 'components', label: '4. 컴포넌트', depth: 1 },
];

export const Default: Story = {
  args: { items },
  render: (args) => (
    <div className="w-[240px]">
      <TableOfContents {...args} />
    </div>
  ),
};

export const WithActiveItem: Story = {
  args: { items, activeId: 'colors' },
  render: (args) => (
    <div className="w-[240px]">
      <TableOfContents {...args} />
    </div>
  ),
};
