import type { TaskListsType } from '@/types/taskType';
import KanbanCard from './KanbanCard';
import KanbanTab from './KanbanTab';

interface Props {
  tasklists: TaskListsType;
}

const TAB_STYLE = 'flex w-full flex-col gap-3 lg:gap-2';

export default function TaskKanbanBoard({ tasklists }: Props) {
  const todoTaskList: TaskListsType = [];
  const doneTaskList: TaskListsType = [];
  tasklists.map(tasklist => {
    if (!tasklist.tasks.length) {
      todoTaskList.push(tasklist);
      return;
    }

    for (const task of tasklist.tasks) {
      if (!task.doneAt) {
        todoTaskList.push(tasklist);
        return;
      }
    }
    doneTaskList.push(tasklist);
  });

  return (
    <section className='flex w-full flex-col gap-8 lg:max-w-[846px] lg:flex-row lg:gap-4'>
      <div className={TAB_STYLE}>
        <KanbanTab title='할 일' />
        {todoTaskList.map(taskList => (
          <KanbanCard key={taskList.id} taskList={taskList} tab='todo' />
        ))}
      </div>
      <div className={TAB_STYLE}>
        <KanbanTab title='완료' />
        {doneTaskList.map(taskList => (
          <KanbanCard key={taskList.id} taskList={taskList} tab='done' />
        ))}
      </div>
    </section>
  );
}
