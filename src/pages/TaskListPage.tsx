import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import CommentIcon from '@/assets/icons/CommentIcon.svg?react';
import ConfigIcon from '@/assets/icons/ConfigIcon.svg?react';
import GnbArrowIcon from '@/assets/icons/GnbArrowIcon.svg?react';
import GnbPlusIcon from '@/assets/icons/GnbPlusIcon.svg?react';
import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import RepeatIcon from '@/assets/icons/RepeatIcon.svg?react';
import VCheckIcon from '@/assets/icons/VCheckIcon.svg?react';
import WeekArrowIcon from '@/assets/icons/WeekArrowIcon.svg?react';

import { groupQueries } from '@/api/queries';
import Button from '@/components/ui/Button';
import { Calendar } from '@/components/ui/calendar';
import CircularProgressbar from '@/components/ui/CircularProgressbar';
import Dropdown from '@/components/ui/Dropdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown/DropdownElements';
import GroupTitleBar from '@/components/ui/GroupTitleBar';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import axiosInstance from '@/lib/axios';
import type { TaskListsResponse } from '@/types/taskType';
import { PopoverContent } from '@radix-ui/react-popover';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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

// const getTasks = async();

export default function TaskListPage() {
  const { groupId, taskListId } = useParams();

  const [currentTaskList, setCurrentTaskList] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectDay, setSelectDay] = useState(false);

  const { data: groupData } = useQuery(
    groupQueries.groupOptions(Number(groupId)),
  );
  const { data: taskListData, isLoading: isTaskListLoading } = useQuery({
    queryKey: ['taskList', groupId, taskListId],
    queryFn: () => getTaskList(groupId!, taskListId!),
    enabled: !!groupId && !!taskListId,
  });

  // 1. taskLists에 대한 GET
  console.log(groupData);
  // 2. 선택한 taskLists의 tasks에 대한 GET
  console.log(taskListData);
  // 3. 클릭한 tasks에 대한 상세 정보 GET

  if (isTaskListLoading || !taskListData || !groupData) return <Spinner />;

  return (
    <div className='mx-auto flex w-full max-w-[1120px] grow-1 flex-col pt-4 md:py-10 lg:pt-30 lg:pb-20'>
      <GroupTitleBar
        variant='list'
        className='flex shrink-0 items-center gap-2'
      >
        <h2>{groupData.name}</h2>
        <ConfigIcon className='size-5 md:size-6' />
      </GroupTitleBar>

      <div className='mt-5 flex grow-1 flex-col md:mt-10 lg:mt-12 lg:flex-row lg:gap-[25px]'>
        {/* 목록 영역 */}
        <div className='shrink-0 lg:w-[270px]'>
          <h3 className='text-text-default lg:text-text-primary mb-2 text-xs font-semibold md:mb-3 md:text-base lg:mb-6 lg:text-xl'>
            할 일
          </h3>
          <div className='flex items-center justify-between lg:block'>
            {/* taskLists */}

            {/* 모바일 ~ 태블릿 */}
            <div className='lg:hidden'>
              <DropdownMenu>
                <DropdownMenuTrigger className='border-radius border-border-primary bg-bg-primary inline-flex w-[180px] items-center gap-2 rounded-xl border py-[9.5px] pr-3 pl-4 md:w-[240px]'>
                  <strong className='text-sm font-semibold'>
                    {taskListData.name}
                  </strong>
                  <CircularProgressbar
                    todosCount={5}
                    doneCount={3}
                    className='shrink-0'
                  />
                  <GnbArrowIcon className='ml-auto shrink-0' />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className='w-[180px] md:w-[240px]'
                  align='start'
                >
                  <DropdownMenuItem className='text-md py-[11.5px]'>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-md py-[11.5px]'>
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-md py-[11.5px]'>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-md py-[11.5px]'>
                    Keyboard shortcuts
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-md py-[11.5px]'>
                    GitHub
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-md py-[11.5px]'>
                    Support
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-md py-[11.5px]'>
                    API
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* 웹 */}
            <div className='hidden lg:block'>
              <div className='bg-bg-primary border-border-primary mb-1 flex items-center gap-2 rounded-xl border py-[14.5px] pr-3 pl-5'>
                <Link
                  to=''
                  className='flex grow-1 items-center justify-between gap-2'
                >
                  <strong className='text-sm font-semibold'>법인 설립</strong>
                  <CircularProgressbar
                    todosCount={5}
                    doneCount={3}
                    className='shrink-0'
                  />
                </Link>
                <Dropdown
                  align='end'
                  type='icon'
                  className='text-center'
                  triggerChildren={<KebabIcon className='text-slate-300' />}
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

              <div className='bg-bg-primary border-border-primary mb-1 flex items-center gap-2 rounded-xl border py-[14.5px] pr-3 pl-5'>
                <Link
                  to=''
                  className='flex grow-1 items-center justify-between gap-2'
                >
                  <strong className='text-sm font-semibold'>법인 등기</strong>
                  <CircularProgressbar
                    todosCount={5}
                    doneCount={2}
                    className='shrink-0'
                  />
                </Link>
                <Dropdown
                  align='end'
                  type='icon'
                  className='text-center'
                  triggerChildren={<KebabIcon className='text-slate-300' />}
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
            {/* 목록 추가 버튼 */}
            <Button
              className='bg-bg-primary h-10 w-[108px] gap-1 font-semibold shadow-[0px_15px_50px_-12px_rgba(0,0,0,0.05)] lg:mx-auto lg:mt-[34px] lg:flex'
              variant='outline'
              round='full'
            >
              <GnbPlusIcon /> 목록 추가
            </Button>
          </div>
        </div>

        {/* 투두 영역 */}
        <div className='expand-bg-x bg-bg-primary relative mt-[22px] grow-1 px-4 py-[38px] md:w-full md:rounded-[20px] md:px-[30px]! md:pt-[46px] md:pb-[122px] lg:mt-0 lg:px-[43px]! lg:pb-[34px]'>
          {/* 투두 헤더 */}
          <div className='relative z-[1] flex items-center justify-between gap-2'>
            <h4 className='text-2lg font-bold md:text-xl'>
              {taskListData.name}
            </h4>
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
              className={clsx(
                `border-border-primary block rounded-lg border py-2 text-center`,
                {
                  'text-text-inverse border-slate-800 bg-slate-800': selectDay,
                },
              )}
            >
              <span
                className={clsx(
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
              className={clsx(
                `border-border-primary block rounded-lg border py-2 text-center`,
                {
                  'text-text-inverse border-slate-800 bg-slate-800': selectDay,
                },
              )}
            >
              <span
                className={clsx(
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
              className={clsx(
                `border-border-primary block rounded-lg border py-2 text-center`,
                {
                  'text-text-inverse border-slate-800 bg-slate-800': selectDay,
                },
              )}
            >
              <span
                className={clsx(
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
              className={clsx(
                `border-border-primary block rounded-lg border py-2 text-center`,
                {
                  'text-text-inverse border-slate-800 bg-slate-800': selectDay,
                },
              )}
            >
              <span
                className={clsx(
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
              className={clsx(
                `border-border-primary block rounded-lg border py-2 text-center`,
                {
                  'text-text-inverse border-slate-800 bg-slate-800': selectDay,
                },
              )}
            >
              <span
                className={clsx(
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
              className={clsx(
                `border-border-primary block rounded-lg border py-2 text-center`,
                {
                  'text-text-inverse border-slate-800 bg-slate-800': selectDay,
                },
              )}
            >
              <span
                className={clsx(
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
              className={clsx(
                `border-border-primary block rounded-lg border py-2 text-center`,
                {
                  'text-text-inverse border-slate-800 bg-slate-800': selectDay,
                },
              )}
            >
              <span
                className={clsx(
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
                  <input
                    type='checkbox'
                    className='peer hidden appearance-none'
                  />
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
                  <input
                    type='checkbox'
                    className='peer hidden appearance-none'
                  />
                  <VCheckIcon className='hidden w-[6px] peer-checked:block md:w-2' />
                </label>
                <button className='flex items-start text-left'>
                  <span className='group-has-checked:text-primary-inactive md:text-md text-sm font-medium group-has-checked:line-through'>
                    법인 설립 안내드리기 법인 설립 안내드리기 법인 설립
                    안내드리기 법인 설립 안내드리기 법인 설립 안내드리기 법인
                    설립 안내드리기 법인 설립 안내드리기
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
          <Button
            size='icon-xl'
            round='full'
            className='fixed right-[14px] bottom-5 z-[1] ml-auto flex shadow-[0px_5px_5px_0px_rgba(49,84,153,0.2)] lg:sticky lg:right-auto lg:bottom-2 lg:ml-auto lg:translate-x-[calc(60%+30px)]'
          >
            <GnbPlusIcon className='size-6 brightness-0 invert-100' />
          </Button>
        </div>
      </div>
    </div>
  );
}
