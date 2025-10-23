import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon.svg';
import Avatar from '@/components/ui/Avatar';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Example/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imgSrc: DefaultProfileIcon,
  },
};
