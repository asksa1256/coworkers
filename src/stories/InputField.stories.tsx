import InputField from '@/components/ui/Input/InputField';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
  title: 'Example/InputField',
  component: InputField,
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
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'date', 'number'],
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '이름을 입력하세요',
    type: 'text',
    error: null,
  },
};

export const WithError: Story = {
  args: {
    error: {
      message: '유효한 이메일이 아닙니다.',
    },
    value: 'codeit@code.com',
  },
  name: '에러 메시지 표시',
};
