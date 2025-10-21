import CircularProgressbar from '@/components/feature/progressbar/CircularProgressbar';
import type { Meta } from '@storybook/react-vite';

const meta: Meta<typeof CircularProgressbar> = {
  title: 'Example/CircularProgressbar',
  component: CircularProgressbar,
  tags: ['autodocs'],
  args: {
    todosCount: 5,
    doneCount: 3,
  },
};

export const L = {
  args: {
    size: 'L',
  },
};

export const S = {
  args: {
    size: 'S',
  },
};

export default meta;
