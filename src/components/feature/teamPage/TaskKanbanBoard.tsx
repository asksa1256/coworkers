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
    <section className='flex w-full flex-col gap-8 lg:max-w-[846px] lg:flex-row lg:gap-4'>
      <div className={TAB_STYLE}>
        <KanbanTab title='할 일' />
        {/* Todo - 할 일과 완료 탭 구분 로직 */}
        {tasklist.map((tasks, i) =>
          i !== 0 ? (
            <KanbanCard
              key={tasks.id}
              taskListName={tasks.name}
              tasks={tasks.tasks}
            />
          ) : undefined,
        )}
      </div>
      <div className={TAB_STYLE}>
        <KanbanTab title='완료' />
        {tasklist.map((tasks, i) =>
          i === 0 ? (
            <KanbanCard
              key={tasks.id}
              taskListName={tasks.name}
              tasks={tasks.tasks}
            />
          ) : undefined,
        )}
      </div>
    </section>
  );
}
