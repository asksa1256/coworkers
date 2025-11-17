import ArrowUpIcon from '@/assets/icons/ArrowUpIcon.svg';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { forwardRef, useState, type FormEvent } from 'react';
import { type FieldError } from 'react-hook-form';

interface InputReplyProps extends React.ComponentProps<'textarea'> {
  error?: FieldError;
  onSubmit: (e: FormEvent) => void;
}

function InputReply(
  { error, onSubmit, ...props }: InputReplyProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const [isEmpty, setIsEmpty] = useState(true);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;

    setIsEmpty(e.target.value.trim().length === 0);
    props.onInput?.(e);
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
          ref={ref}
          {...props} // rhf 연동: register('content')
          name={props.name}
          placeholder='댓글을 달아주세요.'
          onInput={handleInput}
          className='md:text-md w-full resize-none pt-1 text-xs md:pt-0.5'
          rows={1}
        ></textarea>
        <Button
          size='icon-md'
          round='full'
          disabled={props.disabled || isEmpty}
          onClick={onSubmit}
        >
          <img src={ArrowUpIcon} alt='댓글 달기' />
        </Button>
      </div>

      {error && <p className='text-danger text-sm'>{error.message}</p>}
    </div>
  );
}

InputReply.displayName = 'InputReply';

export default forwardRef(InputReply);
