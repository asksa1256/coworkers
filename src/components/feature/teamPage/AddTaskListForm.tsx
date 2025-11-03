import { addTaskList } from '@/api/api';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import {
  addTaskListSchema,
  type AddTaskListSchema,
} from '@/types/addTaskListSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

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
  const addTaskListMutation = useMutation({
    mutationFn: (args: Parameters<typeof addTaskList>) => addTaskList(...args),
    onSuccess: () => {
      reset();
      toast.success('새 할 일 목록이 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
    },
    onError: e => {
      if (isAxiosError(e) && e.response?.status === 409) {
        setError('name', {
          type: 'duplicate',
          message: e.response.data.message,
        });
      } else {
        toast.error('목록 생성에 실패했습니다. 다시 시도해주세요.');
      }
      throw e;
    },
  });

  const onSubmit: SubmitHandler<AddTaskListSchema> = data => {
    addTaskListMutation.mutate([groupId, data]);
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
