import { updateTask } from '@/api/api';
import { taskMutations } from '@/api/mutations';
import { groupQueries, taskQueries } from '@/api/queries';
import TaskSectionLIstItem from '@/components/feature/taskListPage/TaskSectionLIstItem';
import { Spinner } from '@/components/ui/spinner';
import type { GroupDetailResponse } from '@/types/groupType';
import type {
  TaskDetailResponse,
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
      await queryClient.cancelQueries({
        queryKey: groupQueries.group(Number(groupId)),
      });
      await queryClient.cancelQueries({
        queryKey: taskQueries.tasks(groupId, taskListId, date),
      });

      const prevGroups = queryClient.getQueryData(
        groupQueries.group(Number(groupId)),
      );
      const prevTasks = queryClient.getQueryData(
        taskQueries.tasks(groupId, taskListId, date),
      );

      // group setQueryData
      queryClient.setQueryData(
        groupQueries.group(Number(groupId)),
        (prev: GroupDetailResponse) => {
          return produce(prev, draft => {
            const targetList = draft.taskLists.find(
              taskList => String(taskList.id) === taskListId,
            );
            const updateTask = targetList?.tasks.find(
              task => task.id === taskId,
            );
            if (updateTask) toggleDoneAt(updateTask);
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

      return { prevGroups, prevTasks };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        groupQueries.group(Number(groupId)),
        context?.prevGroups,
      );
      queryClient.setQueryData(
        taskQueries.tasks(groupId, taskListId, date),
        context?.prevTasks,
      );
    },
    onSettled: () => {
      if (
        queryClient.isMutating({
          mutationKey: taskMutations.updateTaskDoneMutation(Number(groupId)),
        }) === 1
      ) {
        queryClient.invalidateQueries({
          queryKey: groupQueries.group(Number(groupId)),
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
