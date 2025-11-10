import VCheckIcon from '@/assets/icons/VCheckIcon.svg?react';
import { cn } from '@/lib/utils';
import clsx from 'clsx';

/**
 * isDone - 체크 박스의 체크 상태를 나타냄. task의 doneAt이 null이면 false
 * taskId - task.id
 */
interface Props extends Omit<React.ComponentProps<'input'>, 'type'> {
  children: React.ReactNode;
  isDone: boolean;
  taskId: number;
}

export default function TaskCheckbox({
  children,
  className,
  isDone,
  taskId,
  onChange = () => {},
  ...props
}: Props) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <input
        className='sr-only'
        type='checkbox'
        onChange={onChange}
        id={String(taskId)}
        {...props}
      />

      <label
        className={cn(
          'bg-bg-primary border-icon-primary hover:bg-bg-secondary relative h-4 w-4 shrink-0 rounded-md border',
          { 'bg-primary hover:bg-primary-hover border-none': isDone },
        )}
        htmlFor={String(taskId)}
      >
        <VCheckIcon
          className={cn('absolute top-[50%] left-[50%] translate-[-50%]', {
            hidden: !isDone,
          })}
        />
      </label>

      <span
        className={clsx(
          'md:text-md truncate text-sm leading-[100%] font-medium',
          {
            'text-primary-inactive line-through': isDone,
          },
        )}
      >
        {children}
      </span>
    </div>
  );
}
