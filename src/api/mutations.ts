import type { AddTaskListSchema } from '@/types/addTaskListSchema';
import type { GroupDetailResponse } from '@/types/groupType';
import type { TaskListsResponse } from '@/types/taskType';
import { mutationOptions, QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import type { UseFormReset, UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';
import { addTaskList, updateTask, updateTaskListOrder } from './api';
import { groupQueries } from './queries';

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
  updateTaskDoneOptions: (
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
};
