import GroupTitleBar from '@/components/ui/GroupTitleBar';
import type { Meta } from '@storybook/react-vite';

const meta: Meta<typeof GroupTitleBar> = {
  title: 'Example/GroupTitleBar',
  component: GroupTitleBar,
  tags: ['autodocs'],
  args: {
    children: '경영관리팀',
  },
  parameters: {
    backgrounds: {
      values: [
        {
          name: 'bg-secondary',
          value: 'bg-bg-secondary',
        },
      ],
    },
  },
};

export const Team = {
  args: {
    variant: 'team',
  },
};

export const List = {
  args: {
    variant: 'list',
  },
};

export default meta;
