import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import Dropdown from '@/components/ui/Dropdown';
import type { TaskDetailResponse } from '@/types/taskType';

interface Props {
  task: TaskDetailResponse;
  onDeleteModalOpen: (task: TaskDetailResponse) => void;
  onEditModalOpen: (task: TaskDetailResponse) => void;
}

export default function TaskSectionLIstItemMenu({
  task,
  onDeleteModalOpen,
  onEditModalOpen,
}: Props) {
  return (
    <Dropdown
      type='icon'
      triggerChildren={<KebabIcon className='text-icon-primary size-4' />}
      align='end'
      className='block text-center'
      menuItems={[
        {
          label: '수정하기',
          onClick: () => onEditModalOpen(task),
        },
        {
          label: '삭제하기',
          onClick: () => onDeleteModalOpen(task),
        },
      ]}
    />
  );
}
