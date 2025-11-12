import type { TeamFormDataType } from '@/components/feature/form/TeamForm';
import type { ArticleDetailResponse } from '@/types/boardType';
import type { GroupDetailResponse } from '@/types/groupType';
import type { TaskListSchema } from '@/types/taskListSchema';
import type {
  TaskDetailResponse,
  TaskListOrderRequestBody,
  TaskListsResponse,
  TaskUpdateRequestBody,
} from '@/types/taskType';
import type { UserType } from '@/types/userType';
import { toggleDoneAt } from '@/utils/taskUtils';
import { mutationOptions, QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { produce } from 'immer';
import type { UseFormReset, UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';
import {
  addTaskList,
  deleteGroup,
  deleteGroupMember,
  deleteTaskList,
  likeArticle,
  unlikeArticle,
  updateGroup,
  updateTask,
  updateTaskList,
  updateTaskListOrder,
} from './api';
import {
  boardQueries,
  groupQueries,
  taskListQueries,
  taskQueries,
} from './queries';

export const taskListMutations = {
  //할 일 목록 추가
  addTaskListOptions: (
    groupId: number,
    queryClient: QueryClient,
    formReset: UseFormReset<TaskListSchema>,
    formSetError: UseFormSetError<TaskListSchema>,
  ) =>
    mutationOptions({
      mutationFn: (variables: { groupId: number; payload: TaskListSchema }) =>
        addTaskList(variables.groupId, variables.payload),
      onSuccess: () => {
        formReset();
        toast.success('새 할 일 목록이 추가되었습니다.');
        queryClient.invalidateQueries({
          queryKey: groupQueries.group(groupId),
        });
      },
      onError: error => {
        if (isAxiosError(error) && error.response?.status === 409) {
          formSetError('name', {
            type: 'duplicate',
            message: error.response.data.message,
          });
        } else {
          toast.error('목록 생성 실패. 다시 시도해주세요.');
        }
        throw error;
      },
    }),

  //할 일 목록 이름 변경
  updateTaskListOptions: (
    groupId: number,
    taskListId: number,
    queryClient: QueryClient,
    formSetError: UseFormSetError<TaskListSchema>,
    closeModal?: () => void,
  ) =>
    mutationOptions({
      mutationFn: (variables: {
        groupId: number;
        taskListId: number;
        payload: TaskListSchema;
      }) =>
        updateTaskList(
          variables.groupId,
          variables.taskListId,
          variables.payload,
        ),
      onSuccess: () => {
        toast.success('할 일 목록명을 변경했습니다.');
        queryClient.invalidateQueries({
          queryKey: groupQueries.group(groupId),
        });
        if (closeModal) closeModal();
      },
      onError: error => {
        if (isAxiosError(error) && error.response?.status === 409) {
          formSetError('name', {
            type: 'duplicate',
            message: error.response.data.message,
          });
        } else {
          toast.error('목록명 수정 실패. 다시 시도해주세요.');
        }
        throw error;
      },
    }),

  //할 일 목록 삭제
  deleteTaskListOptions: (
    groupId: number,
    taskListId: number,
    queryClient: QueryClient,
    closeModal?: () => void,
  ) =>
    mutationOptions({
      mutationFn: (taskListId: number) => deleteTaskList(taskListId),
      onSuccess: () => {
        toast.success('할 일 목록을 삭제했습니다.');
        queryClient.invalidateQueries({
          queryKey: groupQueries.group(groupId),
        });
        if (closeModal) closeModal();
      },
      onError: error => {
        toast.error('목록명 수정 실패. 다시 시도해주세요.');
        throw error;
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
      mutationFn: (variables: {
        groupId: number;
        taskListId: number;
        payload: TaskListOrderRequestBody;
      }) =>
        updateTaskListOrder(
          variables.groupId,
          variables.taskListId,
          variables.payload,
        ),
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
      mutationFn: (variables: {
        taskId: number;
        payload: TaskUpdateRequestBody;
      }) => updateTask(variables.taskId, variables.payload),
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
            const taskId = variables.taskId;
            const done = variables.payload.done;

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

export const groupMutations = {
  // 그룹에서 멤버 제외
  excludeGroupMemberOptions: (
    groupId: number,
    userName: string,
    queryClient: QueryClient,
    closeModal?: () => void,
  ) =>
    mutationOptions({
      mutationFn: (variables: { groupId: number; userId: number }) =>
        deleteGroupMember(variables.groupId, variables.userId),
      onSuccess: () => {
        toast.success(`${userName}님을 팀에서 제외했습니다.`);
        queryClient.invalidateQueries({
          queryKey: groupQueries.group(groupId),
        });
        if (closeModal) closeModal();
      },
      onError: error => {
        if (isAxiosError(error) && error.response?.status === 400) {
          toast.error('마지막 구성원은 제외할 수 없습니다. 팀을 삭제해주세요.');
        } else {
          toast.error('멤버 제외 실패. 다시 시도해주세요.');
        }
        throw error;
      },
    }),

  // 그룹 정보 수정
  updateGroupOptions: (
    groupId: number,
    user: UserType,
    queryClient: QueryClient,
  ) =>
    mutationOptions({
      mutationFn: (variables: { groupId: number; payload: TeamFormDataType }) =>
        updateGroup(variables.groupId, variables.payload),
      onSuccess: () => {
        toast.success('팀 정보를 수정했습니다.');
        queryClient.invalidateQueries({
          queryKey: groupQueries.group(groupId),
        });
        queryClient.invalidateQueries({
          queryKey: groupQueries.groups(user),
        });
      },
      onError: error => {
        toast.error('팀 정보 수정 실패. 다시 시도해주세요.');
        throw error;
      },
    }),

  //그룹 삭제
  deleteGroupOptions: (user: UserType, queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (groupId: number) => deleteGroup(groupId),
      onSuccess: () => {
        toast.success('팀이 삭제되었습니다.');
        queryClient.invalidateQueries({
          queryKey: groupQueries.groups(user),
        });
      },
      onError: error => {
        toast.error('팀 삭제 실패. 다시 시도해주세요.');
        throw error;
      },
    }),
};

// 게시글 좋아요 뮤테이션
export const likeMutations = {
  // 좋아요 추가
  likeMutation: (articleId: number) => ['article', articleId], // 게시글 상세 쿼리 키에 좋아요 데이터가 있으므로 해당 키 사용
  likeMutationOptions: ({
    articleId,
    queryClient,
  }: {
    articleId: number;
    queryClient: QueryClient;
  }) =>
    mutationOptions({
      mutationFn: (articleId: number) => likeArticle(articleId),
      onMutate: async () => {
        await queryClient.cancelQueries({
          queryKey: boardQueries.article(articleId),
        });
        const prevData = queryClient.getQueryData(
          boardQueries.article(articleId),
        );

        // 캐시 업데이트
        queryClient.setQueryData<ArticleDetailResponse>(
          boardQueries.article(articleId),
          old => {
            if (!old) return old;

            return {
              ...old,
              likeCount: old.likeCount + 1,
              isLiked: true,
            };
          },
        );

        return { prevData }; // 실패 시 복구되도록 이전 데이터 반환
      },

      onError: (_err, _variables, context) => {
        if (context?.prevData) {
          queryClient.setQueryData(
            boardQueries.article(articleId),
            context.prevData,
          );
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: boardQueries.article(articleId),
        });
      },
    }),

  // 좋아요 취소
  unlikeMutation: (articleId: number) => ['article', articleId],
  unlikeMutationOptions: ({
    articleId,
    queryClient,
  }: {
    articleId: number;
    queryClient: QueryClient;
  }) =>
    mutationOptions({
      mutationFn: (articleId: number) => unlikeArticle(articleId),
      onMutate: async () => {
        await queryClient.cancelQueries({
          queryKey: boardQueries.article(articleId),
        });
        const prevData = queryClient.getQueryData(
          boardQueries.article(articleId),
        );

        queryClient.setQueryData<ArticleDetailResponse>(
          boardQueries.article(articleId),
          old => {
            if (!old) return old;

            return {
              ...old,
              likeCount: old.likeCount - 1,
              isLiked: false,
            };
          },
        );

        return { prevData };
      },

      onError: (_err, _variables, context) => {
        if (context?.prevData) {
          queryClient.setQueryData(
            boardQueries.article(articleId),
            context.prevData,
          );
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: boardQueries.article(articleId),
        });
      },
    }),
};
