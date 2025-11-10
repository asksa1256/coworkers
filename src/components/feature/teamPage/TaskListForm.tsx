import { taskListMutations } from '@/api/mutations';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import useModal from '@/hooks/useModal';
import { taskListSchema, type TaskListSchema } from '@/types/addTaskListSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface Props {
  groupId: number;
  taskListId?: number;
  mode?: 'create' | 'update';
  initialValue?: string;
}

export default function TaskListForm({
  groupId,
  taskListId,
  mode = 'create',
  initialValue,
}: Props) {
  const { closeModal } = useModal();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(taskListSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: initialValue ? initialValue : '',
    },
  });
  const queryClient = useQueryClient();
  const addTaskListMutation = useMutation(
    taskListMutations.addTaskListOptions(groupId, queryClient, reset, setError),
  );
  const updateTaskListMutation = useMutation(
    taskListMutations.updateTaskListOptions(
      groupId,
      taskListId!,
      queryClient,
      setError,
      closeModal,
    ),
  );

  const onSubmit: SubmitHandler<TaskListSchema> = data => {
    if (mode === 'create') {
      addTaskListMutation.mutate({ groupId, payload: data });
    } else if (taskListId) {
      updateTaskListMutation.mutate({ groupId, taskListId, payload: data });
    }
  };

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <label
        className='mb-4 block text-center font-medium'
        htmlFor='taskListName'
      >
        할 일 목록
      </label>
      <InputField
        className='mb-6'
        id={'taskListName'}
        placeholder='목록명을 입력해주세요.'
        error={errors.name}
        {...register('name')}
      />

      <Button
        disabled={
          addTaskListMutation.isPending ||
          updateTaskListMutation.isPending ||
          !!errors.name ||
          !isDirty
        }
      >
        {mode === 'create' ? '만들기' : '수정하기'}
      </Button>
    </form>
  );
}
