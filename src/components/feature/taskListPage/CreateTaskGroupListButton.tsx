import GnbPlusIcon from '@/assets/icons/GnbPlusIcon.svg?react';
import AddTaskListForm from '@/components/feature/teamPage/AddTaskListForm';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';

interface Props {
  groupId: string | undefined;
}

export default function CreateTaskGroupListButton({ groupId }: Props) {
  const { openModal } = useModal();

  const handleCreateTaskGroup = () => {
    if (!groupId) return null;
    openModal({
      children: <AddTaskListForm groupId={Number(groupId)} />,
      closeIconButton: true,
    });
  };

  return (
    <Button
      className='bg-bg-primary h-10 w-[108px] gap-1 font-semibold shadow-[0px_15px_50px_-12px_rgba(0,0,0,0.05)] lg:mx-auto lg:mt-[34px] lg:flex'
      variant='outline'
      round='full'
      onClick={handleCreateTaskGroup}
    >
      <GnbPlusIcon /> 목록 추가
    </Button>
  );
}
