import { cn } from '@/lib/utils';
import { getWeekDates } from '@/utils/dateUtils';

interface Props {
  date: Date;
  onChangeDate: (date: Date) => void;
}

// 상달님 PR 머지시 formatters.ts 파일로 분리 예정
const padZero = (num: number | string) => {
  return String(num).padStart(2, '0');
};

export default function TaskSectionWeek({ date, onChangeDate }: Props) {
  const currentWeekDates = getWeekDates(date);

  return (
    <>
      {currentWeekDates.map(day => {
        const dayNumber = day.date.getDate();
        const isActive = date.toDateString() === day.date.toDateString();

        return (
          <button
            key={day.week}
            className={cn(
              `border-border-primary block rounded-lg border py-2 text-center`,
              {
                'text-text-inverse border-slate-800 bg-slate-800': isActive,
              },
            )}
            onClick={() => onChangeDate(day.date)}
          >
            <span
              className={cn(
                `text-text-default block text-xs font-medium md:text-sm`,
                { 'text-text-inverse': isActive },
              )}
            >
              {day.week}
            </span>
            <strong className='mt-0.5 block text-lg font-semibold md:mt-1 md:text-xl'>
              {padZero(dayNumber)}
            </strong>
          </button>
        );
      })}
    </>
  );
}
