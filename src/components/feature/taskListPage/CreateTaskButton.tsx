import { taskMutations } from '@/api/mutations';
import GnbPlusIcon from '@/assets/icons/GnbPlusIcon.svg?react';
import TaskForm from '@/components/feature/form/TaskForm';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import type { TaskFormSchema } from '@/types/taskFormSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  groupId?: string;
  taskListId?: string;
}

export default function CreateTaskButton({ groupId, taskListId }: Props) {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  const { mutateAsync: taskCreateMutateAsync } = useMutation(
    taskMutations.createTaskOptions({ queryClient, closeModal }),
  );

  const handleCreateTask = async (payload: TaskFormSchema) => {
    if (!groupId || !taskListId) return;
    return await taskCreateMutateAsync({ groupId, taskListId, payload });
  };

  const handleClickCreateTaskModalOpen = () => {
    openModal({
      children: () => <TaskForm onSubmit={handleCreateTask} />,
      className: 'px-4 py-9 md:px-6',
    });
  };

  return (
    <>
      <Button
        size='icon-xl'
        round='full'
        className='fixed right-[14px] bottom-5 z-[1] ml-auto flex shadow-[0px_5px_5px_0px_rgba(49,84,153,0.2)] lg:sticky lg:right-auto lg:bottom-2 lg:ml-auto lg:translate-x-[calc(60%+30px)]'
        onClick={handleClickCreateTaskModalOpen}
      >
        <GnbPlusIcon className='size-6 brightness-0 invert-100' />
      </Button>
    </>
  );
}
