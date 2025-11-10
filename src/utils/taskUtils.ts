import type { TaskDetailResponse } from '@/types/taskType';

export const toggleDoneAt = (task: Omit<TaskDetailResponse, 'recurring'>) =>
  (task.doneAt = task.doneAt ? null : new Date().toISOString());
