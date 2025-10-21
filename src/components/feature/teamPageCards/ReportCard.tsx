import DoneIcon from '@/assets/icons/DoneIcon.svg?react';
import TodoIcon from '@/assets/icons/TodoIcon.svg?react';
import CircularProgressbar from '../progressbar/CircularProgressbar';
import ReportCountCard from './ReportCountCard';

interface Props {
  todosCount: number;
  doneCount: number;
}

export default function ReportCard({ todosCount, doneCount }: Props) {
  return (
    <section className='card-common flex w-full items-center justify-between gap-5 py-6 pr-6'>
      <CircularProgressbar
        size='L'
        todosCount={todosCount}
        doneCount={doneCount}
      />
      <div className='flex w-full max-w-40 flex-col gap-4 md:max-w-70 lg:max-w-100'>
        <ReportCountCard
          text='오늘의 할 일'
          count={todosCount}
          icon={<TodoIcon />}
        />
        <ReportCountCard text='한 일' count={doneCount} icon={<DoneIcon />} />
      </div>
    </section>
  );
}
