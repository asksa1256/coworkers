import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import RepeatIcon from '@/assets/icons/RepeatIcon.svg?react';
import XIcon from '@/assets/icons/XIcon.svg?react';
import TaskDetailComment from '@/components/feature/comments/TaskDetailComment';
import TaskDetailDone from '@/components/feature/taskDetail/TaskDetailDone';
import TaskItemDropdown from '@/components/feature/taskListPage/TaskItemDropdown';
import Avatar from '@/components/ui/Avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FREQUENCY_TO_TEXT } from '@/constants';
import { cn } from '@/lib/utils';
import type { TaskDetailResponse } from '@/types/taskType';
import { formatDate } from '@/utils/dateUtils';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  task: TaskDetailResponse;
  onChangeDone: (task: TaskDetailResponse) => void;
  onDeleteModalOpen: (task: TaskDetailResponse) => void;
  onEditModalOpen: (task: TaskDetailResponse) => void;
}

export default function TaskDetailSheet({
  children,
  task,
  onChangeDone,
  onDeleteModalOpen,
  onEditModalOpen,
}: Props) {
  const isCheck = !!task.doneAt;

  const scheduleSectionConfig = [
    {
      Icon: CalendarIcon,
      label: '시작 날짜',
      value: formatDate(new Date(task.date)),
    },
    {
      Icon: RepeatIcon,
      label: '반복 설정',
      value: FREQUENCY_TO_TEXT[task.frequency],
    },
  ];

  const handleChangeDone = () => {
    onChangeDone(task);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='bg-bg-primary h-auto w-full gap-0 border-none p-0 sm:max-w-none md:max-w-[520px] lg:max-w-[780px]'>
        <SheetHeader className='px-4 pt-3 md:px-7 md:pt-10 lg:px-10'>
          <SheetClose>
            <XIcon />
          </SheetClose>
          <div className='mt-5 flex items-start gap-2 md:mt-[74px] md:gap-3'>
            <SheetTitle
              className={cn(
                'text-xl font-bold md:text-2xl',
                isCheck && 'text-text-default line-through',
              )}
            >
              {task.name}
            </SheetTitle>
            {isCheck && (
              <span className='bg-bg-secondary text-md text-primary shrink-0 rounded-lg px-2.5 py-1.5 font-bold'>
                완료
              </span>
            )}
            <div className='my-0.5 ml-auto shrink-0'>
              <TaskItemDropdown
                task={task}
                onDeleteModalOpen={onDeleteModalOpen}
                onEditModalOpen={onEditModalOpen}
                triggerClassName='size-6'
              />
            </div>
          </div>
        </SheetHeader>
        <div className='flex-1 overflow-x-hidden overflow-y-auto pb-20 md:pb-10'>
          <div className='px-4 md:px-7 lg:px-10'>
            {/* 유저 정보 */}
            <div className='mb-4 flex items-center gap-3'>
              <Avatar
                imgSrc={task.writer.image}
                className='size-8! rounded-lg! [&_img]:h-full [&_img]:w-full'
              />
              <strong className='text-md font-medium'>
                {task.writer.nickname}
              </strong>
            </div>
            <div className='border-border-primary mb-6 flex justify-between gap-3 border-b pb-4'>
              {/* 설정 정보 */}
              <div className='shrink-0'>
                {scheduleSectionConfig.map(schedule => (
                  <div
                    className='text-text-default mb-2 flex items-start gap-3 text-xs'
                    key={schedule.label}
                  >
                    <span className='inline-flex w-[82px] shrink-0 items-center gap-1.5'>
                      <schedule.Icon className='size-4' />
                      {schedule.label}
                    </span>
                    <span>{schedule.value}</span>
                  </div>
                ))}
              </div>
              <TaskDetailDone
                isCheck={isCheck}
                onChangeDone={handleChangeDone}
              />
            </div>
            {task.description && (
              <p className='text-md pb-10 whitespace-pre-line md:pb-14'>
                {task.description}
              </p>
            )}
          </div>
          <TaskDetailComment taskId={task.id} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
