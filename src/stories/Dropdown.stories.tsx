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
    type: {
      control: 'select',
      options: ['select', 'icon'],
      description: '드롭다운 형태',
    },
    triggerChildren: {
      control: false,
      description: '드롭다운 트리거 내용',
    },
    value: {
      control: 'text',
      description: '셀렉트 드롭다운의 기본 선택값',
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
    disabled: {
      control: 'boolean',
    },
    className: {
      control: 'text',
      description: '커스텀 스타일',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

function SelectDropdownStory(args: SelectDropdownProps) {
  const [selected, setSelected] = useState(args.value ?? 'recent');

  const handleSelect = (value: string) => {
    setSelected(value); // 내부 상태 갱신
    args.onSelect?.(value); // 외부 콜백 실행 (console.log)
  };

  return <Dropdown {...args} value={selected} onSelect={handleSelect} />;
}

export const DropdownSelect: Story = {
  // 메뉴 선택 시 선택값 표시(리렌더링)를 위해 render 사용
  render: args =>
    args.type === 'select' ? (
      <SelectDropdownStory {...(args as SelectDropdownProps)} />
    ) : (
      <></>
    ),
  args: {
    type: 'select',
    menuItems: [
      { label: '최신순', value: 'recent' },
      { label: '좋아요순', value: 'like' },
    ],
    value: 'recent',
    suffix: <TriangleDownIcon className='h-5 w-5' />,
    align: 'start',
    onSelect: value => console.log('선택됨:', value),
  },
  name: '셀렉트 형태 드롭다운',
};

export const DropdownWithTriggerIcon: Story = {
  args: {
    type: 'icon',
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
    className: 'text-center',
  },
  name: '아이콘 트리거 드롭다운',
};
