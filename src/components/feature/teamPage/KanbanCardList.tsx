import type { TaskListsResponse } from '@/types/taskType';
import type { ComponentProps, RefObject } from 'react';
import KanbanCard from './KanbanCard';

interface Props extends ComponentProps<'ul'> {
  taskLists: TaskListsResponse;
  draggingRef: RefObject<number | null>;
}

export default function KanbanCardList({
  taskLists,
  draggingRef,
  onDragOver,
  onDrop,
  onDragEnd,
}: Props) {
  return (
    <ul
      className='flex w-full flex-col gap-3 lg:gap-2'
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      {taskLists.map(taskList => (
        <KanbanCard
          key={taskList.id}
          taskList={taskList}
          tab='todo'
          onDragStart={(index: number) => {
            draggingRef.current = index;
          }}
        />
      ))}
    </ul>
  );
}
