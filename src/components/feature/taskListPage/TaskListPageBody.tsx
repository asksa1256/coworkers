import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import CommentIcon from '@/assets/icons/CommentIcon.svg?react';
import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import RepeatIcon from '@/assets/icons/RepeatIcon.svg?react';
import VCheckIcon from '@/assets/icons/VCheckIcon.svg?react';
import WeekArrowIcon from '@/assets/icons/WeekArrowIcon.svg?react';
import CreateTaskButton from '@/components/feature/taskListPage/CreateTaskButton';
import { Calendar } from '@/components/ui/calendar';
import Dropdown from '@/components/ui/Dropdown';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import axiosInstance from '@/lib/axios';
import { cn } from '@/lib/utils';
import type { TaskListsResponse } from '@/types/taskType';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

// `/groups/${groupId}/task-lists/${taskListId}/tasks/26154`, => 태스크 상세페이지
const getTaskList = async (
  groupId: string,
  taskListId: string,
): Promise<TaskListsResponse> => {
  const { data } = await axiosInstance.get(
    `/groups/${groupId}/task-lists/${taskListId}`,
  );
  return data;
};

export default function TaskListPageBody() {
  const { groupId, taskListId } = useParams();
  const [currentTaskList, setCurrentTaskList] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectDay, setSelectDay] = useState(false);

  const { data: taskListData, isLoading: isTaskListLoading } = useQuery({
    queryKey: ['taskList', groupId, taskListId],
    queryFn: () => getTaskList(groupId!, taskListId!),
    enabled: !!groupId && !!taskListId,
  });

  if (isTaskListLoading || !taskListData) return <Spinner />;

  return (
    <div className='expand-bg-x bg-bg-primary relative mt-[22px] grow-1 px-4 py-[38px] md:w-full md:rounded-[20px] md:px-[30px]! md:pt-[46px] md:pb-[122px] lg:mt-0 lg:flex-1 lg:shrink-0 lg:px-[43px]! lg:pb-[34px]'>
      {/* 투두 헤더 */}
      <div className='relative z-[1] flex items-center justify-between gap-2'>
        <h4 className='text-2lg font-bold md:text-xl'>법인 등기</h4>
        <div className='flex shrink-0 items-center gap-1'>
          {/* 현재 날짜 기준 년도와 월 표시 */}
          <span className='mr-1 block text-sm font-medium'>2025년 5월</span>
          {/* 주간 버튼 */}
          <button className='flex size-4 items-center justify-center rounded-full border border-slate-200 shadow-[0px_15px_50px_-12px_rgba(0,0,0,0.05)]'>
            <WeekArrowIcon />
          </button>
          <button className='flex size-4 items-center justify-center rounded-full border border-slate-200 shadow-[0px_15px_50px_-12px_rgba(0,0,0,0.05)]'>
            <WeekArrowIcon className='rotate-180' />
          </button>
          {/* 달력 */}
          <div className='ml-1'>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className='bg-bg-secondary flex size-6 items-center justify-center rounded-full'>
                  <CalendarIcon />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className='w-auto overflow-hidden bg-white p-0'
                align='end'
              >
                <Calendar
                  mode='single'
                  selected={date}
                  captionLayout='dropdown'
                  onSelect={date => {
                    setDate(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* 투두 주간일자 */}
      <div className='bg-bg-primary sticky top-[52px] mt-4.5 grid grid-cols-7 gap-1 py-1.5 md:gap-2 lg:top-0 lg:mt-6.5 lg:gap-3'>
        <button
          className={cn(
            `border-border-primary block rounded-lg border py-2 text-center`,
            {
              'text-text-inverse border-slate-800 bg-slate-800': selectDay,
            },
          )}
        >
          <span
            className={cn(
              `text-text-default block text-xs font-medium md:text-sm`,
              { 'text-text-inverse': selectDay },
            )}
          >
            월
          </span>
          <strong className='mt-0.5 block text-lg font-semibold md:mt-1 md:text-xl'>
            18
          </strong>
        </button>

        <button
          className={cn(
            `border-border-primary block rounded-lg border py-2 text-center`,
            {
              'text-text-inverse border-slate-800 bg-slate-800': selectDay,
            },
          )}
        >
          <span
            className={cn(
              `text-text-default block text-xs font-medium md:text-sm`,
              { 'text-text-inverse': selectDay },
            )}
          >
            화
          </span>
          <strong className='mt-0.5 block text-lg font-semibold md:mt-1 md:text-xl'>
            19
          </strong>
        </button>
        <button
          className={cn(
            `border-border-primary block rounded-lg border py-2 text-center`,
            {
              'text-text-inverse border-slate-800 bg-slate-800': selectDay,
            },
          )}
        >
          <span
            className={cn(
              `text-text-default block text-xs font-medium md:text-sm`,
              { 'text-text-inverse': selectDay },
            )}
          >
            수
          </span>
          <strong className='mt-0.5 block text-lg font-semibold md:mt-1 md:text-xl'>
            20
          </strong>
        </button>
        <button
          className={cn(
            `border-border-primary block rounded-lg border py-2 text-center`,
            {
              'text-text-inverse border-slate-800 bg-slate-800': selectDay,
            },
          )}
        >
          <span
            className={cn(
              `text-text-default block text-xs font-medium md:text-sm`,
              { 'text-text-inverse': selectDay },
            )}
          >
            목
          </span>
          <strong className='mt-0.5 block text-lg font-semibold md:mt-1 md:text-xl'>
            21
          </strong>
        </button>
        <button
          className={cn(
            `border-border-primary block rounded-lg border py-2 text-center`,
            {
              'text-text-inverse border-slate-800 bg-slate-800': selectDay,
            },
          )}
        >
          <span
            className={cn(
              `text-text-default block text-xs font-medium md:text-sm`,
              { 'text-text-inverse': selectDay },
            )}
          >
            금
          </span>
          <strong className='mt-0.5 block text-lg font-semibold md:mt-1 md:text-xl'>
            22
          </strong>
        </button>
        <button
          className={cn(
            `border-border-primary block rounded-lg border py-2 text-center`,
            {
              'text-text-inverse border-slate-800 bg-slate-800': selectDay,
            },
          )}
        >
          <span
            className={cn(
              `text-text-default block text-xs font-medium md:text-sm`,
              { 'text-text-inverse': selectDay },
            )}
          >
            토
          </span>
          <strong className='mt-0.5 block text-lg font-semibold md:mt-1 md:text-xl'>
            23
          </strong>
        </button>
        <button
          className={cn(
            `border-border-primary block rounded-lg border py-2 text-center`,
            {
              'text-text-inverse border-slate-800 bg-slate-800': selectDay,
            },
          )}
        >
          <span
            className={cn(
              `text-text-default block text-xs font-medium md:text-sm`,
              { 'text-text-inverse': selectDay },
            )}
          >
            일
          </span>
          <strong className='mt-0.5 block text-lg font-semibold md:mt-1 md:text-xl'>
            24
          </strong>
        </button>
      </div>

      {/* 해당 일자의 tasks */}
      <ul className='mt-[31px] md:mt-10 lg:mt-[34px]'>
        <li className='border-border-primary has-checked:bg-secondary has-checked:border-bg-secondary group mb-3 rounded-lg border px-[14px] py-3 md:rounded-xl'>
          <div className='flex items-start gap-2'>
            <label className='border-border-primary has-checked:bg-primary has-checked:border-primary m-0.5 flex size-3 shrink-0 cursor-pointer items-center justify-center rounded-sm border md:mx-0 md:size-4 md:rounded-md'>
              <input type='checkbox' className='peer hidden appearance-none' />
              <VCheckIcon className='hidden w-[6px] peer-checked:block md:w-2' />
            </label>
            <button className='flex items-start'>
              <span className='group-has-checked:text-primary-inactive md:text-md text-sm font-medium group-has-checked:line-through'>
                법인 설립 안내드리기
              </span>
              <span className='text-text-default ml-3 inline-flex shrink-0 gap-0.5 text-xs'>
                <CommentIcon /> 3
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
              2024년 7월 29일
            </span>
            <span className='inline-flex items-center gap-1.5 before:mr-2 before:h-2 before:w-[1px] before:bg-slate-700 before:content-[""]'>
              <RepeatIcon />
              매일 반복
            </span>
          </div>
        </li>

        <li className='border-border-primary has-checked:bg-secondary has-checked:border-bg-secondary group mb-3 rounded-lg border px-[14px] py-3 md:rounded-xl'>
          <div className='flex items-start gap-2'>
            <label className='border-border-primary has-checked:bg-primary has-checked:border-primary m-0.5 flex size-3 shrink-0 cursor-pointer items-center justify-center rounded-sm border md:mx-0 md:size-4 md:rounded-md'>
              <input type='checkbox' className='peer hidden appearance-none' />
              <VCheckIcon className='hidden w-[6px] peer-checked:block md:w-2' />
            </label>
            <button className='flex items-start text-left'>
              <span className='group-has-checked:text-primary-inactive md:text-md text-sm font-medium group-has-checked:line-through'>
                법인 설립 안내드리기 법인 설립 안내드리기 법인 설립 안내드리기
                법인 설립 안내드리기 법인 설립 안내드리기 법인 설립 안내드리기
                법인 설립 안내드리기
              </span>
              <span className='text-text-default ml-3 inline-flex shrink-0 gap-0.5 text-xs'>
                <CommentIcon /> 3
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
              2024년 7월 29일
            </span>
            <span className='inline-flex items-center gap-1.5 before:mr-2 before:h-2 before:w-[1px] before:bg-slate-700 before:content-[""]'>
              <RepeatIcon />
              매일 반복
            </span>
          </div>
        </li>
      </ul>

      <CreateTaskButton />
    </div>
  );
}
