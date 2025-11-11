import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import type { MenuItem } from '@/components/ui/Dropdown';
import Dropdown from '@/components/ui/Dropdown';
import useModal from '@/hooks/useModal';
import DeleteTaskListModal from './DeleteTaskListModal';
import TaskListForm from './TaskListForm';

interface Props {
  groupId: number;
  taskListId: number;
  taskListName: string;
}

export default function TaskListDropdown({
  groupId,
  taskListId,
  taskListName,
}: Props) {
  const { openModal } = useModal();
  const taskListDropdownMenu: MenuItem[] = [
    {
      label: '수정하기',
      onClick: () => {
        handleOpenUpdateTaskListModal();
      },
    },
    {
      label: '삭제하기',
      onClick: () => {
        handleOpenDeleteTaskListModal();
      },
    },
  ];
  const taskListDropdownTrigger = (
    <KebabIcon className='text-icon-secondary hover:text-icon-primary h-6 w-6' />
  );

  const handleOpenUpdateTaskListModal = () => {
    openModal({
      children: (
        <TaskListForm
          groupId={groupId}
          taskListId={taskListId}
          mode='update'
          initialValue={taskListName}
        />
      ),
      closeIconButton: true,
    });
  };

  const handleOpenDeleteTaskListModal = () => {
    openModal({
      children: (
        <DeleteTaskListModal
          groupId={groupId}
          taskListId={taskListId}
          taskListName={taskListName}
        />
      ),
    });
  };

  return (
    <>
      <Dropdown
        type='icon'
        align='end'
        menuItems={taskListDropdownMenu}
        triggerChildren={taskListDropdownTrigger}
      />
    </>
  );
}
