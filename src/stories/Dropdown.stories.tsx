import TriangleDownIcon from '@/assets/icons/TriangleDownIcon.svg?react';
import Avatar from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown/DropdownElements';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';

interface MenuItem {
  label: string;
  onClick?: () => void;
}

interface DropdownBaseProps {
  align?: 'start' | 'center' | 'end';
}

// 셀렉트 형태 드롭다운
interface SelectDropdownProps extends DropdownBaseProps {
  triggerChildren: string;
  menuItems: string[];
  suffix: ReactNode;
  onSelect?: (value: string) => void;
}

// 아이콘 형태 드롭다운
interface IconDropdownProps extends DropdownBaseProps {
  triggerChildren: ReactNode;
  menuItems: MenuItem[];
  suffix?: never;
  onSelect?: never; // onSelect 대신 onClick 사용
}

type DropdownProps = SelectDropdownProps | IconDropdownProps;

const Dropdown = ({
  triggerChildren,
  suffix,
  menuItems,
  align = 'start',
  onSelect,
}: DropdownProps) => {
  const handleItemClick = (item: string | MenuItem) => {
    if (typeof item === 'string') {
      // 셀렉트 형태: onSelect 호출
      onSelect?.(item);
    } else {
      // 아이콘 형태: onClick 실행
      item.onClick?.();
    }
  };

  const isSelectTrigger = typeof triggerChildren === 'string';

  return (
    <DropdownMenu>
      {/* 드롭다운 트리거 */}
      {isSelectTrigger ? (
        // 셀렉트 형태 트리거
        <DropdownMenuTrigger suffix={suffix as ReactNode}>
          {triggerChildren}
        </DropdownMenuTrigger>
      ) : (
        // 아이콘 형태 트리거
        <DropdownMenuTrigger>{triggerChildren}</DropdownMenuTrigger>
      )}

      {/* 드롭다운 메뉴 */}
      <DropdownMenuContent align={align}>
        {menuItems.map((item, i) => {
          const text = typeof item === 'string' ? item : item.label;

          return (
            <DropdownMenuItem key={i} onClick={() => handleItemClick(item)}>
              {text}
            </DropdownMenuItem>
          );
        })}
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

export const DropdownSelect: Story = {
  render: function Render(args) {
    const [selected, setSelected] = useState(args.triggerChildren as string);

    return (
      <Dropdown
        {...(args as SelectDropdownProps)}
        triggerChildren={selected}
        onSelect={setSelected}
      />
    );
  },
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
    menuItems: [
      {
        label: '마이 히스토리',
        onClick: () => alert('마이 히스토리로 이동'),
      },
      {
        label: '계정 설정',
        onClick: () => alert('계정 설정으로 이동'),
      },
      {
        label: '팀 참여',
        onClick: () => alert('팀 참여하기'),
      },
      {
        label: '로그아웃',
        onClick: () => alert('로그아웃'),
      },
    ],
    align: 'end',
  },
  name: '아이콘 트리거 드롭다운',
};
