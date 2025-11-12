import { taskMutations } from '@/api/mutations';
import AlertIcon from '@/assets/icons/AlertIcon.svg?react';
import VCheckIcon from '@/assets/icons/VCheckIcon.svg?react';
import Button from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import useModal from '@/hooks/useModal';
import type { TaskDetailResponse } from '@/types/taskType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  task: TaskDetailResponse;
  groupId: string;
  taskListId: string;
}

export default function DeleteTaskModal({ task, groupId, taskListId }: Props) {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const [checkRecurringAfter, setCheckRecurringAfter] = useState(false);

  const { mutate: deleteTaskMutate, isPending } = useMutation(
    taskMutations.deleteTaskOptions({ queryClient, closeModal }),
  );

  const handleClickDelete = () => {
    const taskId = String(task.id);
    const params = {
      groupId,
      taskListId,
      taskId,
    };

    if (checkRecurringAfter) {
      // 반복 설정된 태스크의 모든 일정 삭제
      deleteTaskMutate({ ...params, recurringId: String(task.recurringId) });
    } else {
      // 반복 일정에 상관없이 태스크 삭제
      deleteTaskMutate(params);
    }
  };

  return (
    <div className='text-center'>
      <AlertIcon className='mb-4 inline' />
      <p className='mb-2 font-medium'>
        <strong>&apos;{task.name}&apos;</strong>
        <br />할 일을 정말 삭제하시겠어요?
      </p>
      <p className='text-md text-text-secondary font-medium'>
        삭제 후에는 되돌릴 수 없습니다.
      </p>

      {task.frequency !== 'ONCE' && (
        <div className='mt-2 flex items-center justify-center gap-1'>
          <span className='border-border-primary has-checked:bg-primary has-checked:border-primary m-0.5 inline-flex size-3 shrink-0 cursor-pointer items-center justify-center rounded-sm border md:mx-0 md:size-4 md:rounded-md'>
            <input
              type='checkbox'
              id='recurringAfter'
              className='peer hidden appearance-none'
              checked={checkRecurringAfter}
              onChange={() => setCheckRecurringAfter(prev => !prev)}
            />
            <VCheckIcon className='hidden w-[6px] peer-checked:block md:w-2' />
          </span>
          <Label htmlFor='recurringAfter'>
            <span className='text-md text-text-default'>
              반복되는 모든 일정 삭제하기
            </span>
          </Label>
        </div>
      )}

      <div className='mt-6 flex gap-2'>
        <Button
          variant='outline'
          className='text-text-default shrink-1 grow-1 border-[#CBD5E1]'
          onClick={closeModal}
        >
          닫기
        </Button>
        <Button
          variant='danger'
          className='shrink-1 grow-1'
          onClick={handleClickDelete}
          disabled={isPending}
        >
          {isPending ? '삭제중....' : '삭제하기'}
        </Button>
      </div>
    </div>
  );
}
