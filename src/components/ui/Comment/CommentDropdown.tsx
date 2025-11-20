import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import Dropdown from '../Dropdown';

interface CommentDropdownProps {
  commentId: number;
  content?: string;
  onEdit: (id: number) => void;
  onDelete: (id: number, content: string) => void;
}

export default function CommentDropdown({
  commentId,
  content,
  onEdit,
  onDelete,
}: CommentDropdownProps) {
  const DROPDOWN_MENU = [
    { label: '수정하기', onClick: () => onEdit(commentId) },
    { label: '삭제하기', onClick: () => onDelete(commentId, content!) },
  ];

  return (
    <Dropdown
      type='icon'
      menuItems={DROPDOWN_MENU}
      triggerChildren={<KebabIcon className='h-5 w-5' />}
      align='end'
      className='text-center'
    />
  );
}
