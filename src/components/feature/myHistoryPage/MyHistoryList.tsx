import HistoryDateSection from '@/components/feature/myHistoryPage/HistoryDateSection';
import axiosInstance from '@/lib/axios';
import type {
  MyHistoryResponse,
  MyHistoryTaskDoneItem,
} from '@/types/userType';
import { dayToText, formatDate } from '@/utils/dateUtils';
import { useQuery } from '@tanstack/react-query';

const getMyHistory = async (): Promise<MyHistoryResponse> => {
  const { data } = await axiosInstance.get('/user/history');
  return data;
};

export default function MyHistoryList() {
  const { data: myHistoryData } = useQuery({
    queryKey: ['myHistory'],
    queryFn: () => getMyHistory(),
  });

  if (!myHistoryData) return null;

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
      {Array.from(historyByDate.entries()).map(([key, value]) => (
        <HistoryDateSection key={key} dateTitle={key} tasks={value} />
      ))}
    </div>
  );
}
