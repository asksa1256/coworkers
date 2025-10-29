import { updateTaskListOrder } from '@/api/api';
import type { GroupDetailResponse } from '@/types/groupType';
import type { TaskListsResponse } from '@/types/taskType';
import { calcMouseLocation } from '@/utils/calculations';
import changeListOrder from '@/utils/changeListOrder';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import KanbanCard from './KanbanCard';
import KanbanTab from './KanbanTab';

interface Props {
  taskLists: TaskListsResponse;
}

const TAB__LIST_STYLE = 'flex w-full flex-col gap-3 lg:gap-2';

/**
 * dragOverCopy - dragOver중에 선반영되는 ui를 저장하는 배열
 * draggingIndex - 현재 dragging중인 카드의 인덱스
 * confirmedTargetIndex - api 요청으로 변경할 확정된 목표 인덱스
 */
export default function TaskKanbanBoard({ taskLists }: Props) {
  const [dragOverCopy, setDragOverCopy] = useState<TaskListsResponse | null>(
    null,
  );
  const draggingIndex = useRef<number | null>(null);
  const confirmedTargetIndex = useRef<number | null>(null);
  const todoTaskList: TaskListsResponse = [];
  const doneTaskList: TaskListsResponse = [];
  const queryClient = useQueryClient();
  const groupId = taskLists[0].groupId;
  const taskListsOrderMutation = useMutation({
    mutationFn: (args: Parameters<typeof updateTaskListOrder>) =>
      updateTaskListOrder(...args),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['group', groupId],
      });

      const prevSnapshot = queryClient.getQueryData(['group', groupId]);

      queryClient.setQueryData(
        ['group', groupId],
        (prev: GroupDetailResponse) => {
          if (!dragOverCopy) return prev;

          const updatedLists = dragOverCopy.map((taskList, i) => {
            return {
              ...taskList,
              displayIndex: i,
            };
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
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
    },
  });

  // 할 일/완료 탭 카드 분배
  (dragOverCopy || taskLists).map(taskList => {
    if (!taskList.tasks.length) {
      todoTaskList.push(taskList);
      return;
    }

    for (const task of taskList.tasks) {
      if (!task.doneAt) {
        todoTaskList.push(taskList);
        return;
      }
    }
    doneTaskList.push(taskList);
  });

  const handleDragOver = (e: React.DragEvent, tab: 'todo' | 'done') => {
    const target = e.target as HTMLElement;
    const currentCard = target.closest('[data-task-list-id]');
    const isValidTab = e.dataTransfer.types.includes(tab);
    const fromIndex = draggingIndex.current;
    const toIndex = Number(
      target
        .closest('[data-display-index]')
        ?.getAttribute('data-display-index'),
    );

    if (!currentCard || !isValidTab || fromIndex === null) return;

    e.preventDefault();
    const draggingPosition = calcMouseLocation(e, currentCard);

    //대상 카드의 영역에 따라서 적용될 인덱스 감지
    if (fromIndex < toIndex) {
      confirmedTargetIndex.current =
        draggingPosition === 'top' ? toIndex - 1 : toIndex;
    } else if (fromIndex > toIndex) {
      confirmedTargetIndex.current =
        draggingPosition === 'top' ? toIndex : toIndex + 1;
    }

    // 위치 이동이 없다면 ui 업데이트 취소
    if (confirmedTargetIndex.current === null) {
      setDragOverCopy(null);
      return;
    }

    setDragOverCopy(
      changeListOrder(taskLists, fromIndex, confirmedTargetIndex.current),
    );
  };

  const handleDrop = (e: React.DragEvent, tab: 'todo' | 'done') => {
    if (confirmedTargetIndex.current === null) return;

    const draggingTaskListId = Number(e.dataTransfer.getData(tab));
    taskListsOrderMutation.mutate([
      groupId,
      draggingTaskListId,
      { displayIndex: confirmedTargetIndex.current },
    ]);
  };

  const handleDragEnd = () => {
    draggingIndex.current = null;
    confirmedTargetIndex.current = null;
    setDragOverCopy(null);
  };

  return (
    <section className='flex w-full flex-col gap-8 lg:max-w-[846px] lg:flex-row lg:gap-4'>
      <div className='w-full'>
        <KanbanTab title='할 일' />
        <ul
          className={TAB__LIST_STYLE}
          onDragOver={e => {
            handleDragOver(e, 'todo');
          }}
          onDrop={e => {
            handleDrop(e, 'todo');
          }}
          onDragEnd={handleDragEnd}
        >
          {todoTaskList.map(taskList => (
            <KanbanCard
              key={taskList.id}
              taskList={taskList}
              tab='todo'
              onDragStart={(index: number) => {
                draggingIndex.current = index;
              }}
            />
          ))}
        </ul>
      </div>
      <div className='w-full'>
        <KanbanTab title='완료' />
        <ul
          className={TAB__LIST_STYLE}
          onDragOver={e => {
            handleDragOver(e, 'done');
          }}
          onDrop={e => {
            handleDrop(e, 'done');
          }}
          onDragEnd={handleDragEnd}
        >
          {doneTaskList.map(taskList => (
            <KanbanCard
              key={taskList.id}
              taskList={taskList}
              tab='done'
              onDragStart={(index: number) => {
                draggingIndex.current = index;
              }}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
