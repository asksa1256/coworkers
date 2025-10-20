import PasswordChangeField from '@/components/ui/Input/PasswordChangeField';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Example/PasswordChangeField',
  component: PasswordChangeField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: '인풋 필드 값',
    },
  },
} satisfies Meta<typeof PasswordChangeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '12345678',
  },
};
