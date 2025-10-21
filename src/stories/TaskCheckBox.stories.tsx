import TaskCheckbox from '@/components/ui/TaskCheckbox';
import type { Meta } from '@storybook/react-vite';

const meta: Meta<typeof TaskCheckbox> = {
  title: 'Example/TaskCheckbox',
  component: TaskCheckbox,
  tags: ['autodocs'],
  args: {
    children: '법인 설립 혹은 변경 등기 비용 안내 드리기',
  },
};

export const Default = {};

export default meta;
