import type { TaskListsResponse } from '@/types/taskType';

const changeListOrder = (
  list: TaskListsResponse[],
  fromIndex: number,
  targetIndex: number,
) => {
  return fromIndex > targetIndex
    ? [
        ...list.slice(0, targetIndex),
        ...list.slice(fromIndex, fromIndex + 1),
        ...list.slice(targetIndex, fromIndex),
        ...list.slice(fromIndex + 1),
      ]
    : [
        ...list.slice(0, fromIndex),
        ...list.slice(fromIndex + 1, targetIndex + 1),
        ...list.slice(fromIndex, fromIndex + 1),
        ...list.slice(targetIndex + 1),
      ];
};

export default changeListOrder;
