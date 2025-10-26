import TriangleDownIcon from '@/assets/icons/TriangleDownIcon.svg?react';
import Avatar from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown/DropdownElements';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

// 스토리북용 dropdown interface
interface DropdownProps {
  triggerChildren: string | ReactNode;
  showSuffix?: boolean;
  menuItems: string[];
}

const Dropdown = ({
  triggerChildren,
  showSuffix,
  menuItems,
}: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        suffix={
          showSuffix ? <TriangleDownIcon className='h-6 w-6' /> : undefined
        }
      >
        {triggerChildren}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuItems.map((item, i) => (
          <DropdownMenuItem key={i}>{item}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const meta = {
  title: 'Example/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    triggerChildren: { control: 'text', description: '드롭다운 트리거 컨텐츠' },
    showSuffix: {
      control: 'boolean',
      description: '드롭다운 트리거 우측 아이콘 추가 여부',
    },
    menuItems: { control: 'object', description: '드롭다운 메뉴 아이템' },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownWithSuffix: Story = {
  args: {
    triggerChildren: '최신순',
    showSuffix: true,
    menuItems: ['최신순', '좋아요순'],
  },
  name: '셀렉트 형태 드롭다운',
};

export const DropdownWithTriggerIcon: Story = {
  args: {
    triggerChildren: <Avatar imgSrc={null} size='md' />,
    menuItems: ['마이 히스토리', '계정 설정', '팀 참여', '로그아웃'],
    showSuffix: false,
  },
  name: '아이콘 트리거 드롭다운',
};
