import { ScrollArea } from '@/components/ui/ScrollArea';
import { cn } from '@/lib/utils';
import { type FieldError } from '@/types/types';
import * as React from 'react';

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
    'text-md w-full min-w-[343px] min-h-[75px] bg-transparent px-4 py-3 transition-colors outline-none md:text-base rounded-[12px] border border-[#e2e8f0] bg-transparent resize-none',
    'hover:border-primary focus-within:border-primary-pressed',
    'placeholder:text-text-default',
    'disabled:bg-bg-secondary disabled:text-disabled disabled:pointer-events-none disabled:cursor-not-allowed',
    { 'border-destructive': error },
  );

  const wrapperClasses = cn(
    'flex flex-col w-full',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30',
    className,
  );

  return (
    <div className={wrapperClasses}>
      <div data-slot="textarea" aria-invalid={error ? 'true' : undefined}>
        <ScrollArea className="h-full w-full">
          <textarea className={baseClasses} rows={rows} {...props} />
        </ScrollArea>
      </div>

      {error && <p className="text-destructive text-sm">{error.message}</p>}
    </div>
  );
}
