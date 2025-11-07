import CircularProgressbar from '@/components/ui/CircularProgressbar';
import type { TaskListsResponse } from '@/types/taskType';

interface Props {
  group: TaskListsResponse;
}

export default function TaskGroupSummary({ group }: Props) {
  const { tasks, name } = group;

  return (
    <>
      <strong className='text-sm font-semibold'>{name}</strong>
      <CircularProgressbar
        todosCount={tasks.length}
        doneCount={tasks.filter(task => task.doneAt !== null).length}
        className='shrink-0'
      />
    </>
  );
}
