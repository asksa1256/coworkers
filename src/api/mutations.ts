import type { AddTaskListSchema } from '@/types/addTaskListSchema';
import type { GroupDetailResponse } from '@/types/groupType';
import type {
  TaskDetailResponse,
  TaskListsResponse,
  TaskUpdateRequestBody,
} from '@/types/taskType';
import { toggleDoneAt } from '@/utils/taskUtils';
import { mutationOptions, QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { produce } from 'immer';
import type { UseFormReset, UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';
import { addTaskList, updateTask, updateTaskListOrder } from './api';
import { groupQueries, taskListQueries, taskQueries } from './queries';

export const taskListMutations = {
  //할 일 목록 추가
  addTaskListMutation: (groupId: number) => ['addTaskList', groupId],
  addTaskListOptions: (
    groupId: number,
    queryClient: QueryClient,
    formReset: UseFormReset<AddTaskListSchema>,
    formSetError: UseFormSetError<AddTaskListSchema>,
  ) =>
    mutationOptions({
      mutationKey: taskListMutations.addTaskListMutation(groupId),
      mutationFn: (variables: Parameters<typeof addTaskList>) =>
        addTaskList(...variables),
      onSuccess: () => {
        formReset();
        toast.success('새 할 일 목록이 추가되었습니다.');
        queryClient.invalidateQueries({
          queryKey: groupQueries.group(groupId),
        });
      },
      onError: e => {
        if (isAxiosError(e) && e.response?.status === 409) {
          formSetError('name', {
            type: 'duplicate',
            message: e.response.data.message,
          });
        } else {
          toast.error('목록 생성 실패. 다시 시도해주세요.');
        }
        throw e;
      },
    }),

  //할 일 목록 순서변경
  updateTaskListOrderMutation: (groupId: number) => [
    'updateTaskListOrder',
    groupId,
  ],
  updateTaskListOrderOptions: (
    groupId: number,
    queryClient: QueryClient,
    dragOverCopy: TaskListsResponse[] | null,
  ) =>
    mutationOptions({
      mutationKey: taskListMutations.updateTaskListOrderMutation(groupId),
      mutationFn: (variables: Parameters<typeof updateTaskListOrder>) =>
        updateTaskListOrder(...variables),
      onMutate: async () => {
        await queryClient.cancelQueries({
          queryKey: groupQueries.group(groupId),
        });

        const prevSnapshot = queryClient.getQueryData(
          groupQueries.group(groupId),
        );

        queryClient.setQueryData(
          groupQueries.group(groupId),
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
        queryClient.setQueryData(
          groupQueries.group(groupId),
          context?.prevSnapshot,
        );
      },
      onSettled: () => {
        if (
          queryClient.isMutating({
            mutationKey: taskListMutations.updateTaskListOrderMutation(groupId),
          }) === 1
        ) {
          queryClient.invalidateQueries({
            queryKey: groupQueries.group(groupId),
          });
        }
      },
    }),
};

export const taskMutations = {
  //할 일 완료 상태 토글
  updateTaskDoneMutation: (groupId: number) => ['updateTaskDone', groupId],
  updateTeamPageTaskDoneOptions: (
    groupId: number,
    queryClient: QueryClient,
    taskList: TaskListsResponse,
  ) =>
    mutationOptions({
      mutationKey: taskMutations.updateTaskDoneMutation(groupId),
      mutationFn: (args: Parameters<typeof updateTask>) => updateTask(...args),
      onMutate: async variables => {
        await queryClient.cancelQueries({
          queryKey: groupQueries.group(groupId),
        });

        const prevSnapshot = queryClient.getQueryData(
          groupQueries.group(groupId),
        );

        queryClient.setQueryData(
          groupQueries.group(groupId),
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
        queryClient.setQueryData(
          groupQueries.group(groupId),
          context?.prevSnapshot,
        );
      },
      onSettled: () => {
        if (
          queryClient.isMutating({
            mutationKey: taskMutations.updateTaskDoneMutation(groupId),
          }) === 1
        ) {
          queryClient.invalidateQueries({
            queryKey: groupQueries.group(groupId),
          });
        }
      },
    }),
  updateTaskListPageTaskDoneOptions: ({
    groupId,
    queryClient,
  }: {
    groupId: string;
    queryClient: QueryClient;
  }) =>
    mutationOptions({
      mutationKey: taskMutations.updateTaskDoneMutation(Number(groupId)),
      mutationFn: ({
        taskListId,
        taskId,
        date,
        payload,
      }: {
        taskListId: string;
        taskId: number;
        date: Date;
        payload: TaskUpdateRequestBody;
      }) => updateTask(taskId, payload),
      onMutate: async ({ taskListId, taskId, date, payload }) => {
        // 기존 쿼리들 취소
        await queryClient.cancelQueries({
          queryKey: taskListQueries.singleTaskList(groupId, taskListId, date),
        });
        await queryClient.cancelQueries({
          queryKey: taskQueries.tasks(groupId, taskListId, date),
        });

        // 이전 상태 백업
        const prevTaskLists = queryClient.getQueryData(
          taskListQueries.singleTaskList(groupId, taskListId, date),
        );
        const prevTasks = queryClient.getQueryData(
          taskQueries.tasks(groupId, taskListId, date),
        );

        // taskList setQueryData
        queryClient.setQueryData(
          taskListQueries.singleTaskList(groupId, taskListId, date),
          (prev: TaskListsResponse) => {
            if (!prev) return prev;
            return produce(prev, draft => {
              const targetTask = draft.tasks.find(task => task.id === taskId);
              if (targetTask) toggleDoneAt(targetTask);
            });
          },
        );

        // tasks setQueryData
        queryClient.setQueryData(
          taskQueries.tasks(groupId, taskListId, date),
          (prev: TaskDetailResponse[]) => {
            if (!prev) return prev;
            return prev.map(prevTask =>
              prevTask.id === taskId
                ? { ...prevTask, doneAt: toggleDoneAt(prevTask) }
                : prevTask,
            );
          },
        );

        return { prevTaskLists, prevTasks };
      },
      onError: (err, variables, context) => {
        const { taskListId, date } = variables;
        queryClient.setQueryData(
          taskListQueries.singleTaskList(groupId, taskListId, date),
          context?.prevTaskLists,
        );
        queryClient.setQueryData(
          taskQueries.tasks(groupId, taskListId, date),
          context?.prevTasks,
        );
      },
      onSettled: (data, error, variables) => {
        const { taskListId, date } = variables;
        const isMutatingCount = queryClient.isMutating({
          mutationKey: taskMutations.updateTaskDoneMutation(Number(groupId)),
        });
        // 뮤테이션 동시성 제어용
        // 뮤테이션키에 해당하는 뮤테이션이 2개 이상 실행중일 때 얼리 리턴
        if (isMutatingCount >= 2) return;

        queryClient.invalidateQueries({
          queryKey: groupQueries.group(Number(groupId)),
        });
        queryClient.invalidateQueries({
          queryKey: taskListQueries.singleTaskList(groupId, taskListId, date),
        });
        queryClient.invalidateQueries({
          queryKey: taskQueries.tasks(groupId, taskListId, date),
        });
      },
    }),
};
