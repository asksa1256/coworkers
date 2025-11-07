import TaskListPageBody from '@/components/feature/taskListPage/TaskListPageBody';
import TaskListPageHeader from '@/components/feature/taskListPage/TaskListPageHeader';

export default function TaskListPage() {
  return (
    <div className='lg: mx-auto flex w-full max-w-[1120px] grow-1 flex-col pt-4 md:py-10 lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-[25px] lg:pt-30 lg:pb-20'>
      <TaskListPageHeader />
      <TaskListPageBody />
    </div>
  );
}
