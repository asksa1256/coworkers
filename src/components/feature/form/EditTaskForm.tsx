import { taskMutations } from '@/api/mutations';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import { Label } from '@/components/ui/Label';
import Modal from '@/components/ui/Modal';
import TextareaField from '@/components/ui/Textarea/TextareaField';
import useModal from '@/hooks/useModal';
import {
  taskEditFormSchema,
  type TaskEditFormSchema,
} from '@/types/taskEditFormSchema';
import type { TaskDetailResponse } from '@/types/taskType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface Props {
  task: TaskDetailResponse;
  groupId: string;
  taskListId: string;
}

export default function EditTaskForm({ task, groupId, taskListId }: Props) {
  const { closeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(taskEditFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: task.name || '',
      description: task.description || '',
    },
  });
  const queryClient = useQueryClient();

  const { mutateAsync: updateTaskEditMutateAsync } = useMutation({
    ...taskMutations.editTaskOptions({
      invalidateQueryKey: [['tasks', groupId, taskListId]],
      queryClient,
      closeModal,
    }),
  });

  const handleClickEdit = (formData: TaskEditFormSchema) => {
    const payload = {
      name: formData.name,
      description: formData.description || '',
      done: !!task.doneAt,
    };
    return updateTaskEditMutateAsync({ taskId: task.id, payload: payload });
  };

  return (
    <form
      className='flex grow-1 flex-col overflow-hidden'
      onSubmit={handleSubmit(handleClickEdit)}
    >
      <Modal.Body>
        <div className='mb-6 text-center font-medium'>
          <h2 className='text-base'>할 일 수정하기</h2>
          <p className='text-text-default text-md'>
            시작 날짜와 반복 설정은 수정할 수 없습니다.
          </p>
        </div>
        <div>
          <Label className='mb-4 font-medium' htmlFor='name'>
            할 일 제목
          </Label>
          <InputField
            id='name'
            type='text'
            placeholder='할 일 제목을 입력해주세요.'
            {...register('name')}
            error={errors.name}
          />
        </div>
        <div className='mt-6'>
          <Label className='mb-4 font-medium' htmlFor='description'>
            할 일 메모
          </Label>
          <TextareaField
            id='description'
            placeholder='메모를 입력해주세요.'
            className='[&_textarea]:min-w-auto'
            {...register('description')}
          />
        </div>
      </Modal.Body>
      <Modal.Foot>
        <Button disabled={!isValid || isSubmitting || !isDirty}>
          {isSubmitting ? '수정 중...' : '수정하기'}
        </Button>
      </Modal.Foot>
    </form>
  );
}
