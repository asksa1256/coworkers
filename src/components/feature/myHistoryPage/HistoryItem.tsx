import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import RepeatIcon from '@/assets/icons/RepeatIcon.svg?react';
import VCheckIcon from '@/assets/icons/VCheckIcon.svg?react';
import { FREQUENCY_TO_TEXT } from '@/constants';
import type { MyHistoryTaskDoneItem } from '@/types/userType';
import { formatDate } from '@/utils/dateUtils';

interface Props {
  task: MyHistoryTaskDoneItem;
}

export default function HistoryItem({ task }: Props) {
  const { name, frequency, date } = task;
  const isRepeat = frequency !== 'ONCE';

  return (
    <div className='bg-bg-secondary mb-3 rounded-lg px-[14px] py-3'>
      <div className='mb-[10px] flex items-start gap-2'>
        <span className='border-primary bg-primary m-0.5 flex size-3 shrink-0 items-center justify-center rounded-sm border md:mx-0 md:size-4 md:rounded-md'>
          <VCheckIcon className='w-[6px] md:w-2' />
        </span>
        <strong className='text-primary-inactive md:text-md text-sm font-medium line-through'>
          {name}
        </strong>
      </div>
      <div className='text-text-default mt-2.5 flex items-center gap-3 text-xs'>
        <span className='inline-flex items-center gap-1.5'>
          <CalendarIcon />
          {formatDate(new Date(date))}
        </span>

        {isRepeat && (
          <span className='inline-flex items-center gap-1.5 before:mr-2 before:h-2 before:w-[1px] before:bg-slate-700 before:content-[""]'>
            <RepeatIcon />
            {FREQUENCY_TO_TEXT[frequency]}
          </span>
        )}
      </div>
    </div>
  );
}
