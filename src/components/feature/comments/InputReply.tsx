import ArrowUpIcon from '@/assets/icons/ArrowUpIcon.svg';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { type FieldError } from '@/types';
import { useRef } from 'react';

interface InputReplyProps extends React.ComponentProps<'textarea'> {
  error?: FieldError | null;
}

export default function InputReply({ error, ...props }: InputReplyProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div className={cn('flex w-full flex-col gap-1', props.className)}>
      <div
        className={cn(
          'border-border-primary hover:border-primary-hover focus:border-primary-pressed flex w-full gap-6 border-t border-b px-3 py-3 transition-colors',
          {
            'border-danger': error,
          },
        )}
      >
        <textarea
          ref={textareaRef}
          name={props.name}
          placeholder='댓글을 달아주세요.'
          onInput={handleInput}
          className='md:text-md w-full resize-none pt-1 text-xs md:pt-0.5'
          rows={1}
        ></textarea>
        <Button size='icon-md' round='full' disabled={props.disabled}>
          <img src={ArrowUpIcon} alt='댓글 달기' />
        </Button>
      </div>

      {error && <p className='text-danger text-sm'>{error.message}</p>}
    </div>
  );
}
