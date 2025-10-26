import TriangleDownIcon from '@/assets/icons/TriangleDownIcon.svg?react';
import Avatar from '@/components/ui/Avatar';
import Dropdown, { type SelectDropdownProps } from '@/components/ui/Dropdown';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

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
  // 메뉴 선택 시 선택값 표시(리렌더링)를 위해 render 사용
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
