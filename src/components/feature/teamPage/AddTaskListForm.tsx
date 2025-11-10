import { taskListMutations } from '@/api/mutations';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import {
  addTaskListSchema,
  type AddTaskListSchema,
} from '@/types/addTaskListSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';

export default function AddTaskListForm({ groupId }: { groupId: number }) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addTaskListSchema),
    mode: 'onSubmit',
  });

  const queryClient = useQueryClient();
  const addTaskListMutation = useMutation(
    taskListMutations.addTaskListOptions(groupId, queryClient, reset, setError),
  );

  const onSubmit: SubmitHandler<AddTaskListSchema> = data => {
    addTaskListMutation.mutate({ groupId, payload: data });
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

      <Button disabled={addTaskListMutation.isPending || !!errors.name}>
        만들기
      </Button>
    </form>
  );
}
