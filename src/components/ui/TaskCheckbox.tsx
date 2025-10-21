import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { CheckIcon } from 'lucide-react';

interface Props extends Omit<React.ComponentProps<'input'>, 'type'> {
  children: React.ReactNode;
  isDone: boolean;
}

export default function TaskCheckbox({
  children,
  className,
  isDone,
  onChange = () => {},
  ...props
}: Props) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <input
        className='hidden'
        type='checkbox'
        onChange={onChange}
        {...props}
      />

      <label
        className={cn(
          'bg-bg-primary border-icon-primary hover:bg-bg-secondary relative h-4 w-4 shrink-0 rounded-md border',
          { 'bg-primary hover:bg-primary-hover border-none': isDone },
        )}
        htmlFor={props.id}
      >
        <CheckIcon
          stroke='white'
          className={cn(
            'absolute top-[50%] left-[50%] h-3 w-3 translate-[-50%]',
            { hidden: !isDone },
          )}
        />
      </label>

      <span
        className={clsx('md:text-md truncate text-sm font-medium', {
          'text-primary-inactive line-through': isDone,
        })}
      >
        {children}
      </span>
    </div>
  );
}
