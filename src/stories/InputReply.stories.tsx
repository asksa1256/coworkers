import InputReply from '@/components/ui/Comment/InputReply';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
  title: 'Example/InputReply',
  component: InputReply,
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
      control: 'object',
      description: '유효성 검사 실패 시 전달되는 에러 객체 (message 필드 포함)',
    },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof InputReply>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요.',
    disabled: false,
    error: null,
  },
};

export const WithError: Story = {
  args: {
    disabled: false,
    error: {
      message: '내용을 입력해주세요.',
    },
  },
  name: '에러 메시지 표시',
};
