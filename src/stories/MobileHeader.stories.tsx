import MobileHeader from '@/components/layout/Header/MobileHeader';
import type { MembershipsType, UserType } from '@/types/userType';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { fn } from 'storybook/internal/test';

const TEST_USER: UserType = {
  id: 2318,
  nickname: 'aaa1111',
  createdAt: '2025-10-21T01:01:25+09:00',
  updatedAt: '2025-10-21T01:01:25+09:00',
  image: null,
  teamId: '16-16',
  email: 'aaa1111@aaaa.com',
  memberships: [
    {
      userId: 2318,
      groupId: 3244,
      userName: 'aaa1111',
      userEmail: 'aaa1111@aaaa.com',
      userImage: null,
      role: 'ADMIN',
      group: {
        id: 3244,
        name: '스누피처럼살자',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/2318/images.jpg',
        createdAt: '2025-10-21T01:05:40+09:00',
        updatedAt: '2025-10-21T01:05:40+09:00',
        teamId: '16-16',
      },
    },
    {
      userId: 2318,
      groupId: 3245,
      userName: 'aaa1111',
      userEmail: 'aaa1111@aaaa.com',
      userImage: null,
      role: 'MEMBER',
      group: {
        id: 3245,
        name: '도비는자유에요',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/2319/dobbyisfree.jpg',
        createdAt: '2025-10-21T01:20:24+09:00',
        updatedAt: '2025-10-21T01:20:24+09:00',
        teamId: '16-16',
      },
    },
  ],
};

const TEST_GROUP: MembershipsType = {
  userId: 2318,
  groupId: 3245,
  userName: 'aaa1111',
  userEmail: 'aaa1111@aaaa.com',
  userImage: null,
  role: 'MEMBER',
  group: {
    id: 3245,
    name: '도비는자유에요',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/2319/dobbyisfree.jpg',
    createdAt: '2025-10-21T01:20:24+09:00',
    updatedAt: '2025-10-21T01:20:24+09:00',
    teamId: '16-16',
  },
};

const meta = {
  title: 'Example/MobileHeader',
  component: MobileHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'iphone5',
    },
  },
  decorators: [
    (Story, context) => {
      return (
        <MemoryRouter>
          <Story
            args={{
              ...context.args,
            }}
          />
        </MemoryRouter>
      );
    },
  ],
} satisfies Meta<typeof MobileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MobileLoggedIn: Story = {
  args: {
    isLoggedIn: true,
    user: TEST_USER,
    currentGroup: null,
    onUpdateCurrentGroup: fn(),
  },
};

export const MobileLoggedInSelectGroup: Story = {
  args: {
    isLoggedIn: true,
    user: TEST_USER,
    currentGroup: TEST_GROUP,
    onUpdateCurrentGroup: fn(),
  },
};

export const MobileLoggedOut: Story = {
  args: {
    isLoggedIn: false,
    user: TEST_USER,
    currentGroup: null,
    onUpdateCurrentGroup: fn(),
  },
};
