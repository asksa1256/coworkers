import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import RepeatIcon from '@/assets/icons/RepeatIcon.svg?react';
import VCheckIcon from '@/assets/icons/VCheckIcon.svg?react';
import Dropdown from '@/components/ui/Dropdown';
import { FREQUENCY_TO_TEXT } from '@/constants';
import { cn } from '@/lib/utils';
import type { MyHistoryTaskDoneItem } from '@/types/userType';
import { formatDate } from '@/utils/dateUtils';

interface Props {
  task: MyHistoryTaskDoneItem;
}

export default function HistoryItem({ task }: Props) {
  const { id, name, frequency, doneAt, date } = task;
  const isRepeat = frequency !== 'ONCE';

  return (
    <div className='bg-bg-secondary mb-3 rounded-lg px-[14px] py-3'>
      <div className='mb-[10px] flex items-start gap-2'>
        <span className='border-primary bg-primary m-0.5 flex size-3 shrink-0 cursor-pointer items-center justify-center rounded-sm border md:mx-0 md:size-4 md:rounded-md'>
          <input
            id={String(1)}
            type='checkbox'
            className='peer hidden appearance-none'
            checked={!!doneAt}
            onChange={() => console.log(false)}
          />
          <VCheckIcon className='hidden w-[6px] peer-checked:block md:w-2' />
        </span>
        <label
          htmlFor={String(1)}
          className='text-primary-inactive md:text-md text-sm font-medium line-through'
        >
          {name}
        </label>
        <div className='ml-auto'>
          <Dropdown
            type='icon'
            triggerChildren={
              <KebabIcon className={cn('text-icon-primary size-4')} />
            }
            align='end'
            className='block text-center'
            menuItems={[
              {
                label: '수정하기',
                onClick: () => console.log('수정하기'),
              },
              {
                label: '삭제하기',
                onClick: () => console.log('삭제하기'),
              },
            ]}
          />
        </div>
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
