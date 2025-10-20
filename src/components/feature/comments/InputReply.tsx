import ArrowUpIcon from '@/assets/icons/ArrowUpIcon.svg';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { type FieldError } from '@/types';
import { useRef } from 'react';

interface InputReplyProps extends React.ComponentProps<'textarea'> {
  name?: string; // 폼 제출용 필드
  error?: FieldError | null;
  disabled: boolean;
  className?: string;
}

export default function InputReply({
  name,
  error,
  disabled = false,
  className,
}: InputReplyProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      <div className='border-border flex w-full gap-6 border-t border-b px-3 py-3'>
        <textarea
          ref={textareaRef}
          name={name}
          placeholder='댓글을 달아주세요.'
          onInput={handleInput}
          className='md:text-md w-full resize-none pt-1 text-xs md:pt-0.5'
          rows={1}
        ></textarea>
        <Button size='icon-md' round='full' disabled={disabled}>
          <img src={ArrowUpIcon} alt='댓글 달기' />
        </Button>
      </div>

      {error && <p className='text-destructive text-sm'>{error.message}</p>}
    </div>
  );
}
