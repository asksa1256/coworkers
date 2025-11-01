import { updateTaskListOrder } from '@/api/api';
import type { GroupDetailResponse } from '@/types/groupType';
import type { TaskListsResponse } from '@/types/taskType';
import { calcMouseLocation } from '@/utils/calculations';
import changeListOrder from '@/utils/changeListOrder';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import KanbanCardList from './KanbanCardList';
import KanbanTab from './KanbanTab';

interface Props {
  taskLists: TaskListsResponse;
}

/**
 * dragOverCopy - dragOver중에 선반영되는 ui를 저장하는 배열
 * draggingIndex - 현재 dragging중인 카드의 인덱스
 * confirmedTargetIndex - api 요청으로 변경할 확정된 목표 인덱스
 * todoTaskLists - 해당 taskList의 모든 task가 완료되었는지 여부에 따라 완료되지 않은 항목이 있으면 todo에 저장
 * doneTaskLists - 모두 완료되었으면 done에 저장
 */
export default function TaskKanbanBoard({ taskLists }: Props) {
  const [dragOverCopy, setDragOverCopy] = useState<TaskListsResponse | null>(
    null,
  );
  const draggingIndex = useRef<number | null>(null);
  const confirmedTargetIndex = useRef<number | null>(null);
  const todoTaskLists: TaskListsResponse = [];
  const doneTaskLists: TaskListsResponse = [];
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const groupId = Number(pathname.slice(1));
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
      toast.error('순서 변경에 실패했습니다.');
      queryClient.setQueryData(['group', groupId], context?.prevSnapshot);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
    },
  });

  // 할 일/완료 탭 카드 분배, dragOver중일 때는 실제 taskLists가 아닌 임시로 보여줄 ui인 dragOverCopy를 보여줌
  (dragOverCopy || taskLists).map(taskList => {
    if (!taskList.tasks.length) {
      todoTaskLists.push(taskList);
      return;
    }

    for (const task of taskList.tasks) {
      if (!task.doneAt) {
        todoTaskLists.push(taskList);
        return;
      }
    }
    doneTaskLists.push(taskList);
  });

  /**
   * currentCard - dragOver중인 요소가 KanbanCard가 맞는지 확인. closest로 card의 하위요소도 Card로 인식
   * isValidTab - dragOver중인 카드가 같은 종류의 탭의 항목인지 확인 (todo와 done 내부에서만 이동 가능)
   */
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

    /**
     * 대상 카드의 영역(카드 중심을 기준으로 위/아래)에 따라서 적용될 인덱스 감지
     * 이동하는 카드가 대상 카드보다 위에 위치 -> 대상 카드의 아래쪽 절반을 넘어야 이동
     * 이동하는 카드가 대상 카드보다 아래에 위치 -> 대상 카드의 위쪽 절반을 넘어야 이동
     * dragging중인 카드의 원래 위치를 가리키면 confirmedTargetIndex.current에 저장하지 않고 생략
     */
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

    // ui에 반영될 결과를 미리 보여주도록 list 복사본 상태에 저장
    setDragOverCopy(
      changeListOrder(taskLists, fromIndex, confirmedTargetIndex.current),
    );
  };

  const handleDrop = (e: React.DragEvent, tab: 'todo' | 'done') => {
    // 위치 이동이 없다면 api 호출하지 않음
    if (confirmedTargetIndex.current === null) return;

    const draggingTaskListId = Number(e.dataTransfer.getData(tab));
    taskListsOrderMutation.mutate([
      groupId,
      draggingTaskListId,
      { displayIndex: confirmedTargetIndex.current },
    ]);
  };

  // drag이벤트가 실행중일 때 설정된 모든 상태 초기화
  const handleDragEnd = () => {
    draggingIndex.current = null;
    confirmedTargetIndex.current = null;
    setDragOverCopy(null);
  };

  return (
    <section className='relative flex w-full flex-col gap-8 lg:max-w-[846px] lg:flex-row lg:gap-4'>
      <div className='w-full'>
        <KanbanTab title='할 일' />
        <KanbanCardList
          taskLists={todoTaskLists}
          draggingRef={draggingIndex}
          tab='todo'
          onDragOver={e => {
            handleDragOver(e, 'todo');
          }}
          onDrop={e => {
            handleDrop(e, 'todo');
          }}
          onDragEnd={handleDragEnd}
        />
        {!taskLists.length ? (
          <div className='text-text-default text-md flex h-[150px] w-full items-center justify-center lg:hidden'>
            아직 할 일 목록이 없어요.
          </div>
        ) : undefined}
      </div>

      <div className='w-full'>
        <KanbanTab title='완료' />
        <KanbanCardList
          taskLists={doneTaskLists}
          draggingRef={draggingIndex}
          tab='done'
          onDragOver={e => {
            handleDragOver(e, 'done');
          }}
          onDrop={e => {
            handleDrop(e, 'done');
          }}
          onDragEnd={handleDragEnd}
        />
      </div>

      {!taskLists.length ? (
        <div className='text-text-default text-md absolute top-[55%] hidden w-full text-center lg:block'>
          아직 할 일 목록이 없어요.
        </div>
      ) : undefined}
    </section>
  );
}
