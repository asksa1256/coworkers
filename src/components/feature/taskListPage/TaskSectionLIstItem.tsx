import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import CommentIcon from '@/assets/icons/CommentIcon.svg?react';
import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import RepeatIcon from '@/assets/icons/RepeatIcon.svg?react';
import VCheckIcon from '@/assets/icons/VCheckIcon.svg?react';
import Dropdown from '@/components/ui/Dropdown';
import { FREQUENCY_TO_TEXT } from '@/constants';
import type { TaskDetailResponse } from '@/types/taskType';
import { formatDate } from '@/utils/dateUtils';

interface Props {
  task: TaskDetailResponse;
  onChangeDone: (task: TaskDetailResponse) => void;
}

export default function TaskSectionLIstItem({ task, onChangeDone }: Props) {
  const { id, name, doneAt, commentCount, updatedAt, frequency } = task;
  const isRepeat = frequency !== 'ONCE';

  return (
    <>
      <li className='border-border-primary has-checked:bg-secondary has-checked:border-bg-secondary group mb-3 rounded-lg border px-[14px] py-3 md:rounded-xl'>
        <div className='flex items-start gap-2'>
          <label className='border-border-primary has-checked:bg-primary has-checked:border-primary m-0.5 flex size-3 shrink-0 cursor-pointer items-center justify-center rounded-sm border md:mx-0 md:size-4 md:rounded-md'>
            <input
              type='checkbox'
              className='peer hidden appearance-none'
              checked={!!doneAt}
              onChange={() => onChangeDone(task)}
            />
            <VCheckIcon className='hidden w-[6px] peer-checked:block md:w-2' />
          </label>
          <button className='flex items-start'>
            <span className='group-has-checked:text-primary-inactive md:text-md text-sm font-medium group-has-checked:line-through'>
              {name}
            </span>
            <span className='text-text-default ml-3 inline-flex shrink-0 gap-0.5 text-xs'>
              <CommentIcon /> {commentCount}
            </span>
          </button>
          <div className='ml-auto'>
            <Dropdown
              type='icon'
              triggerChildren={
                <KebabIcon className='text-icon-primary size-4' />
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
            {formatDate(new Date(updatedAt))}
          </span>

          {isRepeat && (
            <span className='inline-flex items-center gap-1.5 before:mr-2 before:h-2 before:w-[1px] before:bg-slate-700 before:content-[""]'>
              <RepeatIcon />
              {FREQUENCY_TO_TEXT[frequency]}
            </span>
          )}
        </div>
      </li>
    </>
  );
}
