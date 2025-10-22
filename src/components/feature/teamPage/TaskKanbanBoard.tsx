import KanbanCard from './KanbanCard';
import KanbanTab from './KanbanTab';

interface Props {
  tasklist: {
    name: string;
    tasks: string[];
    displayIndex: number;
    groupId: number;
    updatedAt: string;
    createdAt: string;
    id: number;
  }[];
}

const TAB_STYLE = 'flex w-full flex-col gap-3 lg:gap-2';

export default function TaskKanbanBoard({ tasklist }: Props) {
  return (
    <section className='flex w-full max-w-[846px] flex-col gap-8 lg:flex-row lg:gap-4'>
      <div className={TAB_STYLE}>
        <KanbanTab title='할 일' />
        {tasklist.map(tasks => (
          <KanbanCard
            key={tasks.id}
            taskListName={tasks.name}
            tasks={tasks.tasks}
          />
        ))}
      </div>
      <div className={TAB_STYLE}>
        <KanbanTab title='완료' />
      </div>
    </section>
  );
}
