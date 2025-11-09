import { updateTask } from '@/api/api';
import { taskMutations } from '@/api/mutations';
import { groupQueries, taskListQueries, taskQueries } from '@/api/queries';
import TaskSectionLIstItem from '@/components/feature/taskListPage/TaskSectionLIstItem';
import EmptyContent from '@/components/ui/EmptyContent';
import { Spinner } from '@/components/ui/spinner';
import type {
  TaskDetailResponse,
  TaskListsResponse,
  TaskUpdateRequestBody,
} from '@/types/taskType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useParams } from 'react-router-dom';

interface Props {
  date: Date;
}

const toggleDoneAt = (task: Omit<TaskDetailResponse, 'recurring'>) =>
  (task.doneAt = task.doneAt ? null : new Date().toLocaleString());

export default function TaskSectionListArea({ date }: Props) {
  const queryClient = useQueryClient();
  const { groupId, taskListId } = useParams();
  const { data: tasksData } = useQuery(
    taskQueries.tasksOptions(groupId, taskListId, date),
  );
  const { mutate: updateTaskDoneMutate } = useMutation({
    mutationKey: taskMutations.updateTaskDoneMutation(Number(groupId)),
    mutationFn: ({
      taskId,
      payload,
    }: {
      groupId: string;
      taskListId: string;
      taskId: number;
      date: Date;
      payload: TaskUpdateRequestBody;
    }) => updateTask(taskId, payload),
    onMutate: async ({ groupId, taskListId, taskId, date, payload }) => {
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
      queryClient.setQueryData(
        taskListQueries.singleTaskList(groupId, taskListId, date),
        context?.prevTaskLists,
      );
      queryClient.setQueryData(
        taskQueries.tasks(groupId, taskListId, date),
        context?.prevTasks,
      );
    },
    onSettled: () => {
      // 뮤테이션 동시성 제어용
      // 뮤테이션키에 해당하는 뮤테이션이 하나만 실행중일 때 캐싱 무효화 진행
      if (
        queryClient.isMutating({
          mutationKey: taskMutations.updateTaskDoneMutation(Number(groupId)),
        }) === 1
      ) {
        queryClient.invalidateQueries({
          queryKey: groupQueries.group(Number(groupId)),
        });
        queryClient.invalidateQueries({
          queryKey: taskListQueries.singleTaskList(groupId, taskListId, date),
        });
        queryClient.invalidateQueries({
          queryKey: taskQueries.tasks(groupId, taskListId, date),
        });
      }
    },
  });

  const handleUpdateDone = (task: TaskDetailResponse) => {
    if (!groupId || !taskListId) return null;

    const payload = {
      name: task.name,
      description: task.description,
      done: !task.doneAt,
    };

    updateTaskDoneMutate({
      groupId,
      taskListId,
      taskId: task.id,
      date,
      payload,
    });
  };

  if (!tasksData)
    return (
      <div className='flex justify-center py-10'>
        <Spinner />
      </div>
    );

  if (!tasksData.length) {
    return (
      <div className='py-10'>
        <EmptyContent>할 일이 없습니다.</EmptyContent>
      </div>
    );
  }

  return (
    <ul className='mt-[31px] md:mt-10 lg:mt-[34px]'>
      {tasksData.map(task => (
        <TaskSectionLIstItem
          key={task.id}
          task={task}
          onChangeDone={handleUpdateDone}
        />
      ))}
    </ul>
  );
}
