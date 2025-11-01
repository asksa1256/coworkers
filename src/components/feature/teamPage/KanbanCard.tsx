import { updateTask } from '@/api/api';
import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import CircularProgressbar from '@/components/ui/CircularProgressbar';
import TaskCheckbox from '@/components/ui/TaskCheckbox';
import { cn } from '@/lib/utils';
import type { GroupDetailResponse } from '@/types/groupType';
import type { TaskListsResponse } from '@/types/taskType';
import { countDone } from '@/utils/calculations';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  taskList: TaskListsResponse[number];
  tab: 'todo' | 'done';
  onDragStart: (index: number) => void;
}

export default function KanbanCard({ taskList, tab, onDragStart }: Props) {
  const queryClient = useQueryClient();
  const [isDragging, setIsDragging] = useState(false);
  const { pathname } = useLocation();
  const groupId = Number(pathname.slice(1));
  const taskDoneMutation = useMutation({
    mutationFn: (args: Parameters<typeof updateTask>) => updateTask(...args),
    onMutate: async variables => {
      await queryClient.cancelQueries({
        queryKey: ['group', groupId],
      });

      const prevSnapshot = queryClient.getQueryData(['group', groupId]);

      queryClient.setQueryData(
        ['group', groupId],
        (prev: GroupDetailResponse) => {
          const taskId = variables[0];
          const done = variables[1].done;

          const updatedTasks = taskList.tasks.map(task => {
            return task.id === taskId
              ? {
                  ...task,
                  doneAt: done ? 'temp value' : null,
                }
              : task;
          });

          const updatedLists = prev.taskLists.map(prevList => {
            return prevList.id === taskList.id
              ? { ...prevList, tasks: updatedTasks }
              : prevList;
          });

          return {
            ...prev,
            taskLists: updatedLists,
          };
        },
      );

      return { prevSnapshot };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['group', groupId], context?.prevSnapshot);
    },
    onSettled: () => {
      if (queryClient.isMutating({ mutationKey: ['group', groupId] }) === 1) {
        queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      }
    },
  });

  /**
   * dataTransfer은 현재 이동중인 카드 id와 속한 탭을 dragovder, drop이벤트에 전달
   * onDragStart는 이동(dragging)중인 카드의 인덱스 전달
   */
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(tab, String(taskList.id));
    onDragStart(taskList.displayIndex);
    setIsDragging(true);
  };

  const onChangeTaskDone = (taskUpdateArgs: Parameters<typeof updateTask>) => {
    taskDoneMutation.mutate(taskUpdateArgs);
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
          {taskList.tasks.map(task => (
            <TaskCheckbox
              key={task.id}
              taskId={task.id}
              isDone={!!task.doneAt}
              onChange={() => {
                onChangeTaskDone([
                  task.id,
                  {
                    name: task.name,
                    description: task.description,
                    done: !task.doneAt,
                  },
                ]);
              }}
            >
              {task.name}
            </TaskCheckbox>
          ))}
        </div>
      </Link>
    </li>
  );
}
