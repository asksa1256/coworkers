import Input from '@/components/ui/Input';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '인풋 비활성화 여부',
    },
    error: {
      control: 'boolean',
      description: '유효성 검사 오류 여부',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: null,
    placeholder: '이메일을 입력하세요.',
    disabled: false,
  },
};
