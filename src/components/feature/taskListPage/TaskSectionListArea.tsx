import { taskMutations } from '@/api/mutations';
import { taskQueries } from '@/api/queries';
import EditTaskForm from '@/components/feature/form/EditTaskForm';
import DeleteTaskModal from '@/components/feature/taskListPage/DeleteTaskModal';
import TaskSectionLIstItem from '@/components/feature/taskListPage/TaskSectionLIstItem';
import EmptyContent from '@/components/ui/EmptyContent';
import { Spinner } from '@/components/ui/spinner';
import useModal from '@/hooks/useModal';
import type { TaskDetailResponse } from '@/types/taskType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface Props {
  date: Date;
}

export default function TaskSectionListArea({ date }: Props) {
  const queryClient = useQueryClient();
  const { groupId, taskListId } = useParams();
  const { openModal } = useModal();
  const { data: tasksData, isLoading } = useQuery(
    taskQueries.tasksOptions(groupId, taskListId, date),
  );
  const { mutate: updateTaskDoneMutate } = useMutation(
    taskMutations.updateTaskListPageTaskDoneOptions({
      groupId: groupId ?? '',
      queryClient,
    }),
  );

  const handleUpdateDone = (task: TaskDetailResponse) => {
    if (!groupId || !taskListId) return null;

    const payload = {
      name: task.name,
      description: task.description,
      done: !task.doneAt,
    };

    updateTaskDoneMutate({
      taskListId,
      taskId: task.id,
      date,
      payload,
    });
  };

  const handleDeleteTaskModalOpen = (task: TaskDetailResponse) => {
    if (!groupId || !taskListId) return null;

    openModal({
      children: () => (
        <DeleteTaskModal
          task={task}
          groupId={groupId}
          taskListId={taskListId}
        />
      ),
      className: 'pt-10 md:pt-10 lg:pt-10',
    });
  };

  const handleEditTaskModalOpen = (task: TaskDetailResponse) => {
    if (!groupId || !taskListId || !task) return null;

    openModal({
      children: () => (
        <EditTaskForm task={task} groupId={groupId} taskListId={taskListId} />
      ),
      className: 'px-4 py-9 md:px-6',
    });
  };

  if (isLoading)
    return (
      <div className='flex justify-center py-10'>
        <Spinner />
      </div>
    );

  if (!tasksData?.length) {
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
          onDeleteModalOpen={handleDeleteTaskModalOpen}
          onEditModalOpen={handleEditTaskModalOpen}
        />
      ))}
    </ul>
  );
}
