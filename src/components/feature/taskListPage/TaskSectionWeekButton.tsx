import WeekArrowIcon from '@/assets/icons/WeekArrowIcon.svg?react';
import { cn } from '@/lib/utils';

interface Props {
  onClick: () => void;
  className?: string;
}

export default function TaskSectionWeekButton({ onClick, className }: Props) {
  return (
    <button
      className={cn(
        'flex size-4 items-center justify-center rounded-full border border-slate-200 shadow-[0px_15px_50px_-12px_rgba(0,0,0,0.05)]',
        className,
      )}
      onClick={onClick}
    >
      <WeekArrowIcon />
    </button>
  );
}
