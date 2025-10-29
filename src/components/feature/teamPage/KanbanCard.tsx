import { updateTaskListOrder } from '@/api/api';
import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import CircularProgressbar from '@/components/ui/CircularProgressbar';
import TaskCheckbox from '@/components/ui/TaskCheckbox';
import { cn } from '@/lib/utils';
import type { TaskListsResponse } from '@/types/taskType';
import { calcMouseLocation, countDone } from '@/utils/calculations';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  taskList: TaskListsResponse[number];
  tab: 'todo' | 'done';
}

export default function KanbanCard({ taskList, tab }: Props) {
  const [draggingLocation, setDraggingLocation] = useState<
    'top' | 'bottom' | null
  >(null);
  const cardRef = useRef(null);
  const { pathname } = useLocation();
  const groupId = Number(pathname.slice(1));
  const queryClient = useQueryClient();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(tab, String(taskList.id));
    e.dataTransfer.setData('currentIndex', String(taskList.displayIndex));
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!cardRef.current) return;

    const isValidTab = e.dataTransfer.types.includes(tab);

    if (!isValidTab) return;

    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggingLocation(calcMouseLocation(e, cardRef.current));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const movedTaskListId = Number(e.dataTransfer.getData(tab));
    const currentIndex = Number(e.dataTransfer.getData('currentIndex'));

    if (movedTaskListId === taskList.id) return;

    let targetIndex = 0;

    if (currentIndex > taskList.displayIndex) {
      targetIndex =
        draggingLocation === 'top'
          ? taskList.displayIndex
          : taskList.displayIndex + 1;
    } else {
      targetIndex =
        draggingLocation === 'bottom'
          ? taskList.displayIndex
          : taskList.displayIndex - 1;
    }

    updateTaskListOrder(groupId, movedTaskListId, {
      displayIndex: targetIndex,
    });
    queryClient.invalidateQueries({
      queryKey: ['group', groupId],
    });
    setDraggingLocation(null);
  };

  return (
    <Link
      className='card-common relative px-4 py-5'
      to={`/list${pathname}`}
      ref={cardRef}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={() => setDraggingLocation(null)}
      onDragEnd={() => setDraggingLocation(null)}
      onDrop={handleDrop}
    >
      <div
        className={clsx('flex items-center justify-between', {
          'mb-4': taskList.tasks.length,
        })}
      >
        <h4 className='text-md font-semibold'>{taskList.name}</h4>
        <div className='flex items-center'>
          <CircularProgressbar
            className='px-2'
            todosCount={taskList.tasks.length}
            doneCount={countDone(taskList.tasks)}
          />
          <KebabIcon className='hover:text-icon-primary text-icon-secondary h-6 w-6' />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        {taskList.tasks.map((task, i) => (
          <TaskCheckbox
            key={task.id}
            taskId={i}
            isDone={task.doneAt ? true : false}
          >
            {task.name}
          </TaskCheckbox>
        ))}
      </div>
      {/* card가 drop될 위치를 보여주는 ui */}
      <div
        className={cn(
          'border-primary absolute left-[50%] hidden w-[90%] translate-x-[-50%] rounded-2xl border-t-3 opacity-70 lg:border-t-2',
          {
            'top-[-8px] block lg:top-[-6px]': draggingLocation === 'top',
            'bottom-[-8px] block lg:bottom-[-6px]':
              draggingLocation === 'bottom',
          },
        )}
      />
    </Link>
  );
}
