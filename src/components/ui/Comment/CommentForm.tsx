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
import { useAtomValue } from 'jotai';
import type { KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import TextareaField from '../Textarea/TextareaField';
import InputReply from './InputReply';

interface CommentFormProps {
  comment?: CommentData;
  className?: string;
  onSubmit: (v: string) => void;
  onCancel?: () => void;
}

export default function CommentForm({
  comment,
  className,
  onSubmit,
  onCancel,
}: CommentFormProps) {
  const user = useAtomValue(userAtom);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
    watch,
  } = useForm<CreateCommentRequest>({
    resolver: zodResolver(createCommentRequestSchema),
    mode: 'onBlur',
    defaultValues: {
      content: comment?.content,
    },
  });

  const handleFormSubmit = async (formData: CreateCommentRequest) => {
    onSubmit(formData.content);
    if (!isEditMode) {
      reset(); // 댓글 등록 폼에서만 제출 후 입력창 비우기
    }
  };

  const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' && e.ctrlKey) {
      handleSubmit(handleFormSubmit)();
    }
  };

  const isEditMode = !!comment;

  // 수정 폼
  if (isEditMode) {
    const author = getCommentAuthor(comment);

    return (
      <li className='bg-bg-secondary -mx-[22px] px-[22px] py-5 md:-mx-10 md:px-10 lg:-mx-[60px] lg:px-[60px]'>
        <form
          className='flex flex-col gap-2 pb-4'
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className='flex gap-4'>
            <Avatar size='md' imgSrc={author?.image ?? null} />

            <div className='md:text-md w-full text-xs'>
              <span className='mb-[6px] inline-block font-bold'>
                {author?.nickname}
              </span>
              <TextareaField
                {...register('content')}
                className='[&_textarea]:bg-bg-primary'
                onKeyDown={handleEnter}
              />
              <p className='text-text-default text-sm'>ctrl + enter - 전송</p>
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
      </li>
    );
  }

  // 등록 폼
  return (
    <div className='mb-[28px] md:mb-9'>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn('flex gap-3 md:gap-4', className)}
      >
        <Avatar
          size='md'
          imgSrc={user?.image ?? null}
          className='mt-3 md:mt-2'
        />
        <div className='grow-1'>
          <InputReply
            {...register('content')}
            value={watch('content')}
            onKeyDown={handleEnter}
          />
          <p className='text-text-default mt-1 text-sm'>ctrl + enter - 전송</p>
        </div>
      </form>
    </div>
  );
}
