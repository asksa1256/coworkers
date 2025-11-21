import TextareaField from '@/components/ui/Textarea/TextareaField';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
  title: 'Example/TextareaField',
  component: TextareaField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
    onBlur: fn(),
  },
  argTypes: {
    placeholder: { control: 'text', description: '플레이스홀더 텍스트' },
    value: { control: 'text', description: '인풋 필드의 값' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    error: {
      control: 'object',
      description: '유효성 검사 에러 객체 (message 포함)',
    },
  },
} satisfies Meta<typeof TextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요.',
    error: null,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    value: '',
    error: {
      type: 'required',
      message: '내용을 입력해주세요.',
    },
  },
  name: '에러 메시지 표시',
};
