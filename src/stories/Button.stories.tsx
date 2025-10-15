import { Button } from '@/components/ui/button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check } from 'lucide-react';
import { fn } from 'storybook/test';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'outline',
        'destructive',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: [
        'default',
        'sm',
        'lg',
        'icon',
        'icon-sm',
        'icon-md',
        'icon-lg',
        'icon-xl',
      ],
    },
    disabled: {
      control: 'boolean', // disabled를 체크박스로 표시
      description: '버튼 비활성화 여부',
    },
    round: {
      control: 'select',
      options: ['sm', 'lg', 'full'],
      description: 'border-radius 설정',
      defaultValue: 'lg',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: '생성하기',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'default',
    children: '생성하기',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    children: '생성하기',
  },
};

export const Danger: Story = {
  args: {
    variant: 'destructive',
    size: 'default',
    children: '생성하기',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    disabled: true,
    children: '생성하기',
  },
};

export const IconButton: Story = {
  args: {
    variant: 'default',
    size: 'icon-lg',
    round: 'full',
    children: <Check />,
  },
};
