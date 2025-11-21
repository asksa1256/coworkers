import TaskListPageBody from '@/components/feature/taskListPage/TaskListPageBody';
import TaskListPageHeader from '@/components/feature/taskListPage/TaskListPageHeader';
import { useState } from 'react';

export default function TaskListPage() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className='mx-auto flex w-full max-w-[1120px] grow-1 flex-col pt-4 md:py-10 lg:grow-0 lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-[25px] lg:pt-30 lg:pb-20'>
      <TaskListPageHeader date={date} />
      <TaskListPageBody date={date} setDate={setDate} />
    </div>
  );
}
