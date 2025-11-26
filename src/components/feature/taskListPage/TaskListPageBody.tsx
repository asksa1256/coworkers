import { taskListQueries } from '@/api/queries';
import CreateTaskButton from '@/components/feature/taskListPage/CreateTaskButton';
import TaskSectionListArea from '@/components/feature/taskListPage/TaskSectionListArea';
import TaskSectionWeek from '@/components/feature/taskListPage/TaskSectionWeek';
import TaskSectionWeekButton from '@/components/feature/taskListPage/TaskSectionWeekButton';
import CalendarPopover from '@/components/ui/CalendarPopover';
import { Spinner } from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import type { Dispatch } from 'react';
import { useParams } from 'react-router-dom';

interface Props {
  date: Date;
  setDate: Dispatch<React.SetStateAction<Date>>;
}

export default function TaskListPageBody({ date, setDate }: Props) {
  const { groupId, taskListId } = useParams();
  const { data: singleTaskListData, isLoading: isTaskListLoading } = useQuery(
    taskListQueries.singleTaskListOptions(groupId, taskListId, date),
  );

  const handleUpdateDate = (date: Date) => setDate(date);

  const handlePrevWeek = () => {
    setDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  if (isTaskListLoading || !singleTaskListData || !date) return <Spinner />;

  return (
    <div className='expand-bg-x bg-bg-primary relative mt-[22px] grow-1 px-4 py-[38px] md:w-full md:rounded-[20px] md:px-[30px]! md:pt-[46px] md:pb-[122px] lg:mt-0 lg:flex-1 lg:shrink-0 lg:px-[43px]! lg:pb-[34px]'>
      <div className='relative z-[1] flex items-center justify-between gap-2'>
        <h4 className='text-2lg font-bold md:text-xl'>
          {singleTaskListData.name}
        </h4>
        <div className='flex shrink-0 items-center gap-1'>
          {/* 현재 날짜 기준 년도와 월 표시 */}
          <span className='mr-1 block text-sm font-medium'>{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</span>
          {/* 주간 버튼 */}
          <TaskSectionWeekButton onClick={handlePrevWeek} />
          <TaskSectionWeekButton
            onClick={handleNextWeek}
            className='rotate-180'
          />
          {/* 달력 */}
          <div className='ml-1'>
            <CalendarPopover date={date} onChangeDate={setDate} />
          </div>
        </div>
      </div>

      {/* 투두 주간일자 */}
      <div className='bg-bg-primary sticky top-[52px] z-[1] mt-4.5 grid grid-cols-7 gap-1 py-1.5 md:gap-2 lg:top-0 lg:mt-6.5 lg:gap-3'>
        <TaskSectionWeek date={date} onChangeDate={handleUpdateDate} />
      </div>

      <TaskSectionListArea date={date} />
      <CreateTaskButton groupId={groupId} taskListId={taskListId} />
    </div>
  );
}
