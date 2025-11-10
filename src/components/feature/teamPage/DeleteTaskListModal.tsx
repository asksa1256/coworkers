import { taskListMutations } from '@/api/mutations';
import AlertIcon from '@/assets/icons/AlertIcon.svg?react';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  groupId: number;
  taskListId: number;
  taskListName: string;
}

export default function DeleteTaskListModal({
  groupId,
  taskListId,
  taskListName,
}: Props) {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const deleteTaskListMutation = useMutation(
    taskListMutations.deleteTaskListOptions(
      groupId,
      taskListId,
      queryClient,
      closeModal,
    ),
  );

  return (
    <div className='text-center'>
      <AlertIcon className='mb-4 inline' />
      <p className='mb-6 font-medium whitespace-pre-line'>
        {`${taskListName}을(를)\n정말 삭제하시겠어요?`}
      </p>
      <div className='flex gap-2'>
        <Button
          className='text-text-default hover:text-unset focus:text-unset bg-bg-primary hover:border-unset hover:bg-unset focus:border-unset border-icon-secondary shrink-1 hover:brightness-95 focus:brightness-90'
          variant='outline'
          onClick={() => {
            closeModal();
          }}
        >
          닫기
        </Button>
        <Button
          className='shrink-1'
          variant='danger'
          onClick={() => deleteTaskListMutation.mutate(taskListId)}
          disabled={deleteTaskListMutation.isPending}
        >
          {deleteTaskListMutation.isPending ? '삭제중...' : '삭제'}
        </Button>
      </div>
    </div>
  );
}
