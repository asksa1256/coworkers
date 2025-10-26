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

interface DropdownBaseProps {
  menuItems: string[];
  align?: 'start' | 'center' | 'end';
}

// 셀렉트 형태 드롭다운
interface SelectDropdownProps extends DropdownBaseProps {
  triggerChildren: string;
  suffix: ReactNode;
}

// 아이콘 형태 드롭다운
interface IconDropdownProps extends DropdownBaseProps {
  triggerChildren: ReactNode;
  suffix?: never;
}

type DropdownProps = SelectDropdownProps | IconDropdownProps;

const Dropdown = ({
  triggerChildren,
  suffix,
  menuItems,
  align = 'start',
}: DropdownProps) => {
  const isSelectTrigger = typeof triggerChildren === 'string';

  return (
    <DropdownMenu>
      {/* 드롭다운 트리거 */}
      {isSelectTrigger ? (
        // 셀렉트 형태
        <DropdownMenuTrigger suffix={suffix as ReactNode}>
          {triggerChildren}
        </DropdownMenuTrigger>
      ) : (
        // 아이콘 형태
        <DropdownMenuTrigger>{triggerChildren}</DropdownMenuTrigger>
      )}

      {/* 드롭다운 메뉴 */}
      <DropdownMenuContent align={align}>
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
    triggerChildren: {
      control: false,
      description: '드롭다운 트리거 내용',
    },
    suffix: {
      control: false,
      description: '드롭다운 suffix 아이콘 (셀렉트 형태에만 필수)',
    },
    menuItems: { control: 'object', description: '드롭다운 메뉴 아이템' },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '드롭다운 메뉴 정렬',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownWithSuffix: Story = {
  args: {
    triggerChildren: '최신순',
    suffix: <TriangleDownIcon className='h-6 w-6' />,
    menuItems: ['최신순', '좋아요순'],
    align: 'start',
  },
  name: '셀렉트 형태 드롭다운',
};

export const DropdownWithTriggerIcon: Story = {
  args: {
    triggerChildren: <Avatar imgSrc={null} size='md' />,
    menuItems: ['마이 히스토리', '계정 설정', '팀 참여', '로그아웃'],
    align: 'end',
  },
  name: '아이콘 트리거 드롭다운',
};
