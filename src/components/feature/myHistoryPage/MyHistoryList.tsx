import { historyQueries } from '@/api/queries';
import HistoryDateSection from '@/components/feature/myHistoryPage/HistoryDateSection';
import EmptyContent from '@/components/ui/EmptyContent';
import type { MyHistoryTaskDoneItem } from '@/types/userType';
import { dayToText, formatDate } from '@/utils/dateUtils';
import { useQuery } from '@tanstack/react-query';

export default function MyHistoryList() {
  const { data: myHistoryData } = useQuery(historyQueries.historyOptions());

  if (!myHistoryData) return null;
  const isEmpty = myHistoryData.tasksDone.length === 0;

  const sortedTasks = [...myHistoryData.tasksDone].sort((a, b) => {
    return new Date(b.doneAt).getTime() - new Date(a.doneAt).getTime();
  });

  const historyByDate = new Map<string, MyHistoryTaskDoneItem[]>();

  sortedTasks.forEach(task => {
    const doneDate = new Date(task.doneAt);
    const dateLabel = `${formatDate(doneDate)} (${dayToText(doneDate)})`;

    if (!historyByDate.has(dateLabel)) {
      historyByDate.set(dateLabel, []);
    }

    historyByDate.get(dateLabel)!.push(task);
  });

  return (
    <div className='bg-bg-primary rounded-[20px] px-[22px] py-[30px] md:px-[30px] lg:px-[40px]'>
      {isEmpty ? (
        <EmptyContent className='py-10 md:py-20'>
          <p className='text-md text-text-default text-center'>
            아직 완료된 작업이 없어요.
            <br />
            하나씩 완료해가며 히스토리를 만들어보세요!
          </p>
        </EmptyContent>
      ) : (
        <>
          {Array.from(historyByDate.entries()).map(([key, value]) => (
            <HistoryDateSection key={key} dateTitle={key} tasks={value} />
          ))}
        </>
      )}
    </div>
  );
}
