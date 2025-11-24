import { taskMutations } from '@/api/mutations';
import CircularProgressbar from '@/components/ui/CircularProgressbar';
import TaskCheckbox from '@/components/ui/TaskCheckbox';
import { cn } from '@/lib/utils';
import type { TaskListsResponse } from '@/types/taskType';
import { countDone } from '@/utils/calculations';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TaskListDropdown from './TaskListDropdown';

interface Props {
  taskList: TaskListsResponse;
  tab: 'todo' | 'done';
  onDragStart: (index: number) => void;
}

export default function KanbanCard({ taskList, tab, onDragStart }: Props) {
  const queryClient = useQueryClient();
  const [isDragging, setIsDragging] = useState(false);
  const params = useParams();
  const groupId = Number(params.groupId);
  const taskDoneMutation = useMutation(
    taskMutations.updateTeamPageTaskDoneOptions(groupId, queryClient, taskList),
  );

  /**
   * dataTransfer은 현재 이동중인 카드 id와 속한 탭을 dragovder, drop이벤트에 전달
   * onDragStart는 이동(dragging)중인 카드의 인덱스 전달
   */
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(tab, String(taskList.id));
    onDragStart(taskList.displayIndex);
    setIsDragging(true);
  };

  return (
    <li
      draggable={true}
      data-task-list-id={taskList.id}
      data-display-index={taskList.displayIndex}
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
      className={cn(
        'card-common relative block px-4 py-5',
        isDragging && 'border-primary opacity-50',
      )}
    >
      {/* 카드 전체가 클릭가능 범위가 되도록 지정 */}
      <Link
        to={`/${groupId}/details/${taskList.id}`}
        className='absolute inset-0'
      />

      <div
        className={clsx('flex items-center justify-between', {
          'mb-4': taskList.tasks.length,
        })}
      >
        <h4 className='text-md grow-1 font-semibold'>{taskList.name}</h4>
        <div className='flex items-center'>
          <CircularProgressbar
            className='px-2'
            todosCount={taskList.tasks.length}
            doneCount={countDone(taskList.tasks)}
          />
          <TaskListDropdown
            groupId={groupId}
            taskListId={taskList.id}
            taskListName={taskList.name}
          />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {taskList.tasks.map(task => (
          <TaskCheckbox
            key={task.id}
            taskId={task.id}
            isDone={!!task.doneAt}
            onChange={() => {
              taskDoneMutation.mutate({
                taskId: task.id,
                payload: {
                  name: task.name,
                  description: task.description,
                  done: !task.doneAt,
                },
              });
            }}
          >
            {task.name}
          </TaskCheckbox>
        ))}
      </div>
    </li>
  );
}
