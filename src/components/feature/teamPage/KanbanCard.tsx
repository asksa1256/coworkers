import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import CircularProgressbar from '@/components/ui/CircularProgressbar';
import TaskCheckbox from '@/components/ui/TaskCheckbox';
import { cn } from '@/lib/utils';
import type { TaskListsResponse } from '@/types/taskType';
import { countDone } from '@/utils/calculations';
import clsx from 'clsx';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  taskList: TaskListsResponse[number];
  tab: 'todo' | 'done';
  onDragStart: (index: number) => void;
}

export default function KanbanCard({ taskList, tab, onDragStart }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const { pathname } = useLocation();

  /**
   * dataTransfer은 현재 이동중인 카드 id와 속한 탭 전달
   * onDragStart는 이동중인 카드 인덱스 전달
   */
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(tab, String(taskList.id));
    onDragStart(taskList.displayIndex);
    setIsDragging(true);
  };

  // 체크박스 클릭으로 link이동이 되는 것 방지
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest('label')) {
      e.preventDefault();
    }
  };

  return (
    <li
      draggable={true}
      data-task-list-id={taskList.id}
      data-display-index={taskList.displayIndex}
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
    >
      <Link
        className={cn(
          'card-common relative block px-4 py-5',
          isDragging && 'border-primary opacity-50',
        )}
        to={`/list${pathname}`}
        onClick={handleClick}
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
      </Link>
    </li>
  );
}
