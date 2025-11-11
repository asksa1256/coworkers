import GnbPlusIcon from '@/assets/icons/GnbPlusIcon.svg?react';
import TaskForm from '@/components/feature/form/TaskForm';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import type { TaskFormSchema } from '@/types/taskFormSchema';

export default function CreateTaskButton() {
  const { openModal } = useModal();

  const handleCreateTask = (formData: TaskFormSchema) => {
    console.log(formData);
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
