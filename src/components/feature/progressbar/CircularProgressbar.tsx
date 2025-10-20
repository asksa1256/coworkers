import DoneIcon from '@/assets/icons/ProgressDone.svg?react';
import { cn } from '@/lib/utils';
import calcPercentage from '@/utils/calcPercentage';

/**
 * size - L: 팀 페이지 리포트 ui, S: task ui
 * todosCouont - 총 할 일의 수
 * doneCount - 마친 일의 수
 */
interface Props {
  className?: string;
  size?: 'L' | 'S';
  todosCount: number;
  doneCount: number;
}

export default function CircularProgressbar({
  className,
  size = 'S',
  todosCount,
  doneCount,
}: Props) {
  /**
   * progress - 진행률 (0 - 100으로 고정)
   * viewBoxSize - svg 좌표계 크기 기준값
   * strokeWidth - 진행률을 나타내는 track의 너비
   * center - 좌표계 중심
   * radius - 원의 반지름 (strokeWidth는 원의 border 개념이므로 절반 제외)
   * circumference - 원의 둘레
   * offset - 전체 둘레중 빈 영역
   */
  const variant = {
    L: 'h-30 w-30 md:h-40 md:w-40',
    S: 'h-4 w-4',
  };
  const progress = Math.max(
    0,
    Math.min(100, calcPercentage(doneCount, todosCount)),
  );
  const viewBoxSize = 100;
  const strokeWidth = 15;
  const padding = 10;
  const center = viewBoxSize / 2;
  const radius = center - strokeWidth / 2 - padding;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);
  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      <svg
        className={cn('scale-y-[-1] rotate-90', variant[size], {
          hidden: progress === 100 && size === 'S',
        })}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        <circle
          className='stroke-bg-secondary'
          cx={center}
          cy={center}
          r={radius}
          fill='transparent'
          strokeWidth={strokeWidth}
        />
        <circle
          className='stroke-primary transition-all duration-200'
          cx={center}
          cy={center}
          r={radius}
          fill='transparent'
          strokeWidth={strokeWidth}
          strokeDashoffset={offset}
          strokeDasharray={circumference}
          strokeLinecap='round'
        />
      </svg>

      {progress === 100 && size === 'S' ? (
        <DoneIcon className='custom-fade-in' />
      ) : undefined}

      {size === 'S' ? (
        <span className='text-md leading-md text-primary'>{`${doneCount}/${todosCount}`}</span>
      ) : undefined}
    </div>
  );
}
