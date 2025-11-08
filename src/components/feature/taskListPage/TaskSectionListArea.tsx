import { taskQueries } from '@/api/queries';
import TaskSectionLIstItem from '@/components/feature/taskListPage/TaskSectionLIstItem';
import { Spinner } from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface Props {
  date: Date;
}

export default function TaskSectionListArea({ date }: Props) {
  const { groupId, taskListId } = useParams();
  const { data: tasks } = useQuery(
    taskQueries.tasksOptions(groupId, taskListId, date),
  );

  if (!tasks)
    return (
      <div className='flex justify-center py-10'>
        <Spinner />
      </div>
    );

  return (
    <ul className='mt-[31px] md:mt-10 lg:mt-[34px]'>
      {tasks.map(task => (
        <TaskSectionLIstItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
