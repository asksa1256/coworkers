import { cn } from '@/lib/utils';
import { type FieldError } from 'react-hook-form';

interface TextareaFieldProps extends React.ComponentProps<'textarea'> {
  error?: FieldError | null;
}

export default function TextareaField({
  className,
  error,
  rows = 3,
  ...props
}: TextareaFieldProps) {
  const baseClasses = cn(
    'text-md w-full text-md md:min-w-[343px] min-h-[75px] bg-transparent px-4 py-3 transition-colors outline-none lg:text-base rounded-[12px] border border-border-primary bg-transparent resize-none',
    'hover:border-primary focus-within:border-primary',
    'placeholder:text-text-default',
    // 커스텀 스크롤바 스타일 추가
    'scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent',
    'disabled:bg-bg-secondary disabled:text-disabled disabled:pointer-events-none disabled:cursor-not-allowed',
    { 'border-danger': error },
  );

  const wrapperClasses = cn(
    'flex flex-col w-full',
    'aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 aria-invalid:border-danger dark:bg-input/30',
    className,
  );

  return (
    <div className={wrapperClasses}>
      <div data-slot='textarea' aria-invalid={error ? 'true' : undefined}>
        <textarea className={baseClasses} rows={rows} {...props} />
      </div>

      {error && <p className='text-danger text-md'>{error.message}</p>}
    </div>
  );
}
