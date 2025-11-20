import { articleCommentMutations } from '@/api/mutations';
import Avatar from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';
import { userAtom } from '@/store/authAtom';
import {
  type CreateCommentRequest,
  createCommentRequestSchema,
} from '@/types/CommentRequestSchema';
import type { CommentData } from '@/types/commentType';
import { getCommentAuthor } from '@/utils/typeGuard';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import TextareaField from '../Textarea/TextareaField';
import InputReply from './InputReply';

interface CommentFormProps {
  articleId: number; // 쿼리 키 ['comments', articleId]
  comment?: CommentData;
  className?: string;
  onEditSuccess?: () => void; // 수정 완료 처리
  onCancel?: () => void;
}

export default function CommentForm({
  articleId,
  comment,
  className,
  onEditSuccess,
  onCancel,
}: CommentFormProps) {
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch,
  } = useForm<CreateCommentRequest>({
    resolver: zodResolver(createCommentRequestSchema),
    mode: 'onBlur',
    defaultValues: {
      content: comment?.content,
    },
  });

  const { mutate: createComment } = useMutation(
    articleCommentMutations.createCommentMutationOptions({
      articleId,
      user: user!,
      formReset: reset,
      queryClient,
    }),
  );

  const { mutate: updateComment } = useMutation(
    articleCommentMutations.updateCommentMutationOptions({
      articleId,
      user: user!,
      queryClient,
      onSuccess: () => {
        reset();
        onEditSuccess?.();
      },
    }),
  );

  const onEdit = (formData: CreateCommentRequest) => {
    if (comment?.content)
      updateComment({ commentId: comment.id, content: formData.content });
  };

  const onCreate = async (formData: CreateCommentRequest) => {
    createComment({ articleId, content: formData.content });
  };

  const isEditMode = !!comment;

  // 수정 폼
  if (isEditMode) {
    const author = getCommentAuthor(comment);

    return (
      <form className='flex flex-col gap-2' onSubmit={handleSubmit(onEdit)}>
        <div className='flex gap-4'>
          <Avatar size='md' imgSrc={author?.image ?? null} />

          <div className='md:text-md w-full text-xs'>
            <span className='mb-[6px] inline-block font-bold'>
              {author?.nickname}
            </span>
            <TextareaField
              {...register('content')}
              error={errors.content}
              className='[&_textarea]:bg-bg-primary'
            />
          </div>
        </div>

        <div className='flex gap-2 self-end'>
          <Button
            variant='ghost'
            type='button'
            size='sm'
            className='hover:bg-bg-tertiary w-auto'
            onClick={onCancel}
          >
            취소
          </Button>
          <Button
            variant='outline'
            className='w-auto'
            size='sm'
            disabled={!isDirty || !isValid}
          >
            수정하기
          </Button>
        </div>
      </form>
    );
  }

  // 등록 폼
  return (
    <form
      onSubmit={handleSubmit(onCreate)}
      className={cn('mb-[28px] flex gap-3 md:mb-9 md:gap-4', className)}
    >
      <Avatar size='md' imgSrc={user?.image ?? null} className='mt-3 md:mt-2' />
      <InputReply
        {...register('content')}
        error={errors.content}
        value={watch('content')}
      />
    </form>
  );
}
