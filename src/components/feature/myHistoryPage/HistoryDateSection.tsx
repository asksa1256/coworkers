import HistoryItem from '@/components/feature/myHistoryPage/HistoryItem';
import type { MyHistoryTaskDoneItem } from '@/types/userType';

interface Props {
  dateTitle: string;
  tasks: MyHistoryTaskDoneItem[];
}

export default function HistoryDateSection({ dateTitle, tasks }: Props) {
  return (
    <div className='mb-10 md:mb-[45px] lg:mb-20'>
      <h3 className="before:bg-border-primary relative mb-3 text-center before:absolute before:top-1/2 before:right-0 before:left-0 before:h-[1px] before:content-['']">
        <span className='bg-bg-primary text-md text-text-default relative inline-block px-5 md:text-base md:font-medium'>
          {dateTitle}
        </span>
      </h3>

      {tasks.map(task => (
        <HistoryItem key={task.id} task={task} />
      ))}
    </div>
  );
}
