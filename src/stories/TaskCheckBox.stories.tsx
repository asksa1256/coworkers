import TaskCheckbox from '@/components/ui/TaskCheckbox';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

const meta: Meta<typeof TaskCheckbox> = {
  title: 'Example/TaskCheckbox',
  component: TaskCheckbox,
  tags: ['autodocs'],
  args: {
    isDone: false,
    taskId: 1,
    children: '법인 설립 혹은 변경 등기 비용 안내 드리기',
  },
};

export const Default: StoryObj<typeof TaskCheckbox> = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{ isDone }, updateArgs] = useArgs();
    return (
      <TaskCheckbox
        {...args}
        isDone={isDone}
        onChange={() => updateArgs({ isDone: !isDone })}
      />
    );
  },
};

export default meta;
