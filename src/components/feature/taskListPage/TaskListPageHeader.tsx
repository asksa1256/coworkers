import { groupQueries } from '@/api/queries';
import CreateTaskGroupListButton from '@/components/feature/taskListPage/CreateTaskGroupListButton';
import TaskGroupList from '@/components/feature/taskListPage/TaskGroupList';
import GroupConfigDropdown from '@/components/feature/teamPage/GroupConfigDropdown';
import GroupTitleBar from '@/components/ui/GroupTitleBar';
import { useGroupAuthContext } from '@/hooks/useGroupAuthContext';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface Props {
  date: Date;
}

export default function TaskListPageHeader({ date }: Props) {
  const { groupId } = useParams();
  const isAdmin = useGroupAuthContext();

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

        <GroupConfigDropdown
          groupId={Number(groupId)}
          groupName={groupData.name}
          isAdmin={isAdmin}
          align='start'
        />
      </GroupTitleBar>

      <div className='mt-5 shrink-0 md:mt-10 lg:mt-0 lg:w-[270px]'>
        <h3 className='text-text-default lg:text-text-primary mb-2 text-xs font-semibold md:mb-3 md:text-base lg:mb-6 lg:text-xl'>
          할 일
        </h3>
        <div className='flex items-center justify-between lg:block'>
          <TaskGroupList taskGroups={groupData.taskLists} date={date} />
          <CreateTaskGroupListButton groupId={groupId} />
        </div>
      </div>
    </>
  );
}
