import Avatar from '@/components/ui/Avatar';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Example/Avatar/Avatar',
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
    imgSrc: null,
  },
};

export const AvatarWithImage: Story = {
  args: {
    imgSrc:
      'https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/2d1c/7ad2c762d37fbd312d08861c34db742f14091a3cb9753ce415da7e4b0413.jpg',
  },
};
