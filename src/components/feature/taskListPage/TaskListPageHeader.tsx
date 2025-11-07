import { groupQueries } from '@/api/queries';
import ConfigIcon from '@/assets/icons/ConfigIcon.svg?react';
import CreateTaskGroupListButton from '@/components/feature/taskListPage/CreateTaskGroupListButton';
import TaskGroupList from '@/components/feature/taskListPage/TaskGroupList';
import GroupTitleBar from '@/components/ui/GroupTitleBar';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

export default function TaskListPageHeader() {
  const { groupId } = useParams();

  const { data: groupData } = useQuery(
    groupQueries.groupOptions(Number(groupId)),
  );

  if (!groupData) return null;

  return (
    <>
      <GroupTitleBar
        variant='list'
        className='flex shrink-0 items-center gap-2 lg:mb-12'
      >
        <h2>{groupData.name}</h2>

        {/* 임시 경로 / */}
        <Link aria-label='팀 수정하기 페이지로 이동' to='/'>
          <ConfigIcon className='size-5 md:size-6' />
        </Link>
      </GroupTitleBar>

      <div className='mt-5 shrink-0 md:mt-10 lg:mt-0 lg:w-[270px]'>
        <h3 className='text-text-default lg:text-text-primary mb-2 text-xs font-semibold md:mb-3 md:text-base lg:mb-6 lg:text-xl'>
          할 일
        </h3>
        <div className='flex items-center justify-between lg:block'>
          <TaskGroupList taskGroups={groupData.taskLists} />
          <CreateTaskGroupListButton />
        </div>
      </div>
    </>
  );
}
