import Avatar from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';
import { userAtom } from '@/store/authAtom';
import { type CreateCommentRequest } from '@/types/CommentRequestSchema';
import { useAtomValue } from 'jotai';
import type { FormEvent } from 'react';
import {
  type FieldError,
  type UseFormRegister,
  type UseFormWatch,
} from 'react-hook-form';
import InputReply from './InputReply';

interface CommentFormProps {
  register: UseFormRegister<CreateCommentRequest>;
  error?: FieldError;
  watch: UseFormWatch<CreateCommentRequest>; // 폼 제출 후 초기화 시 InputReply 제출 버튼 비활성화 전환용
  className?: string;
  onSubmit: (e: FormEvent) => void;
}

export default function CommentForm({
  register,
  error,
  watch,
  className,
  onSubmit,
}: CommentFormProps) {
  const user = useAtomValue(userAtom);

  return (
    <form
      onSubmit={onSubmit}
      className={cn('mb-[28px] flex gap-3 md:mb-9 md:gap-4', className)}
    >
      <Avatar size='md' imgSrc={user?.image ?? null} className='mt-3 md:mt-2' />
      <InputReply
        {...register('content')}
        error={error}
        value={watch('content')}
        onSubmit={onSubmit}
      />
    </form>
  );
}
