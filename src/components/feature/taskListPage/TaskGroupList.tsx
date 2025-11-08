import { taskListQueries } from '@/api/queries';
import GnbArrowIcon from '@/assets/icons/GnbArrowIcon.svg?react';
import TaskGroupActionMenu from '@/components/feature/taskListPage/TaskGroupActionMenu';
import TaskGroupSummary from '@/components/feature/taskListPage/TaskGroupSummary';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown/DropdownElements';
import useCurrentView from '@/hooks/useCurrentView';
import type { TaskListsResponse } from '@/types/taskType';
import { useQueries } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

interface Props {
  taskGroups: TaskListsResponse[];
  date: Date;
}

export default function TaskGroupList({ taskGroups, date }: Props) {
  const { groupId, taskListId } = useParams();
  const currentView = useCurrentView();
  const isWeb = currentView === 'WEB';

  const dateTaskListQuery = useQueries({
    queries: taskGroups.map(task =>
      taskListQueries.singleTaskListOptions(groupId, String(task.id), date),
    ),
  });
  const isDateTaskListLoading = dateTaskListQuery.some(
    taskList => taskList.isLoading,
  );
  const dateTaskListData = dateTaskListQuery.map(taskList => taskList.data);
  const currentTaskGroup = taskGroups.find(
    group => group.id === Number(taskListId),
  );

  if (isDateTaskListLoading || !dateTaskListData || !currentTaskGroup)
    return null;

  return (
    <>
      {isWeb ? (
        <div>
          {dateTaskListData.map(group => {
            return (
              group && (
                <div
                  className='bg-bg-primary border-border-primary mb-1 flex items-center gap-2 rounded-xl border pr-3 pl-5'
                  key={group.id}
                >
                  <Link
                    to={`/${groupId}/details/${group.id}`}
                    className='flex grow-1 items-center justify-between gap-2 py-[14.5px]'
                  >
                    <TaskGroupSummary group={group} />
                  </Link>
                  <TaskGroupActionMenu id={group.id} />
                </div>
              )
            );
          })}
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className='border-radius border-border-primary bg-bg-primary inline-flex w-[180px] items-center gap-2 rounded-xl border py-[9.5px] pr-3 pl-4 md:w-[240px]'>
            <TaskGroupSummary group={currentTaskGroup} />
            <GnbArrowIcon className='ml-auto shrink-0' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[180px] md:w-[240px]' align='start'>
            {dateTaskListData.map(group => {
              return (
                group && (
                  <DropdownMenuItem
                    className='text-md py-[11.5px]'
                    key={group.id}
                    asChild
                  >
                    <Link
                      to={`/${groupId}/details/${group.id}`}
                      className='flex grow-1 items-center justify-between gap-2'
                    >
                      <TaskGroupSummary group={group} />
                    </Link>
                  </DropdownMenuItem>
                )
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
