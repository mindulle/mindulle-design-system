import type { Meta, StoryObj } from '@storybook/react';
import { MindulleLogo } from './MindulleLogo';

const meta = {
  title: 'Brand/MindulleLogo',
  component: MindulleLogo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number' } },
    theme: { control: 'select', options: ['auto', 'light', 'dark'] },
    withBackground: { control: 'boolean' },
  },
} satisfies Meta<typeof MindulleLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { size: 32 } };
export const Large: Story = { args: { size: 64 } };
export const WithBackground: Story = { args: { size: 48, withBackground: true } };
