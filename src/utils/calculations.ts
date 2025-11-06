import type { TaskListsResponse, TasksResponse } from '@/types/taskType';

export const calcPercentage = (numerator: number, denominator: number) => {
  if (!denominator) return 0;

  return Math.floor((numerator / denominator) * 100);
};

export const calcTodayTodos = (taskLists: TaskListsResponse[]) => {
  let count = 0;

  for (let i = 0; i < taskLists.length; i++) {
    count += taskLists[i].tasks.length;
  }

  return count;
};

export const countDone = (tasks: TasksResponse) => {
  let count = 0;

  for (const task of tasks) {
    if (task.doneAt) {
      count++;
    }
  }

  return count;
};

export const calcTodayDone = (taskLists: TaskListsResponse[]) => {
  let count = 0;

  for (let i = 0; i < taskLists.length; i++) {
    count += countDone(taskLists[i].tasks);
  }

  return count;
};

// kanbanCard의 중간 좌표를 구해 위쪽 절반과 아래쪽 절반 중 어느 부분이 drop 동작의 대상이 될 지 결정
export const calcMouseLocation = (e: React.DragEvent, ref: Element) => {
  const rect = ref.getBoundingClientRect();
  const centerY = (rect.bottom - rect.top) / 2;
  const currentY = e.clientY - rect.top;
  return currentY <= centerY ? 'top' : 'bottom';
};
