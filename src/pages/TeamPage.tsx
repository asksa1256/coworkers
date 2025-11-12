import { groupQueries } from '@/api/queries';
import AvatarGroup from '@/components/feature/teamPage/AvatarGroup';
import GroupConfigDropdown from '@/components/feature/teamPage/GroupConfigDropdown';
import MemberListCard from '@/components/feature/teamPage/MemberListCard';
import ReportCard from '@/components/feature/teamPage/ReportCard';
import TaskKanbanBoard from '@/components/feature/teamPage/TaskKanbanBoard';
import GroupTitleBar from '@/components/ui/GroupTitleBar';
import useGroupRole from '@/hooks/useGroupRole';
import useModal from '@/hooks/useModal';
import { calcTodayDone, calcTodayTodos } from '@/utils/calculations';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function TeamPage() {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const params = useParams();
  const groupId = Number(params.groupId);
  const groupRole = useGroupRole(groupId);
  const isAdmin = groupRole === 'ADMIN';
  const isGroupMember = !groupRole;
  const { data: groupData } = useQuery(groupQueries.groupOptions(groupId));

  useEffect(() => {
    // 멤버가 아닌 페이지 접근시에 랜딩페이지로 리다이렉트
    if (isGroupMember) navigate('/', { replace: true });
  }, [isGroupMember, navigate]);

  if (!groupData) return;

  const handleOpenMembersModal = () => {
    openModal({
      children: (
        <MemberListCard
          members={groupData.members}
          isAdmin={isAdmin}
          isModalDisplay={true}
        />
      ),
      closeIconButton: true,
      className: 'md:py-12',
    });
  };

  return (
    <div className='mx-auto w-full max-w-280 py-6 md:py-18 lg:py-30'>
      <div className='flex flex-col gap-3 md:gap-5'>
        <GroupTitleBar className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <h2>{groupData.name}</h2>
            <div className='lg:hidden'>
              <AvatarGroup
                members={groupData.members}
                onClick={handleOpenMembersModal}
              />
            </div>
          </div>
          <GroupConfigDropdown
            groupId={groupId}
            groupName={groupData.name}
            isAdmin={isAdmin}
          />
        </GroupTitleBar>

        {isAdmin && (
          <ReportCard
            todosCount={calcTodayTodos(groupData.taskLists)}
            doneCount={calcTodayDone(groupData.taskLists)}
          />
        )}
      </div>

      {isAdmin && (
        <div className='border-border-primary mt-9 hidden w-full max-w-280 border-t lg:block' />
      )}

      <h2
        className={clsx(
          'mt-8 mb-4 font-medium md:mt-10 lg:mt-11 lg:mb-[30px]',
          { 'lg:mt-7': isAdmin },
        )}
      >
        할 일 목록
        <span className='text-text-default font-normal'>{` (${groupData.taskLists.length}개)`}</span>
      </h2>

      <div className='flex items-start lg:gap-7'>
        <TaskKanbanBoard taskLists={groupData.taskLists} />
        <MemberListCard members={groupData.members} isAdmin={isAdmin} />
      </div>
    </div>
  );
}
