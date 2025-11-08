import { getGroupMembership } from '@/api/api';
import { groupQueries } from '@/api/queries';
import ConfigIcon from '@/assets/icons/ConfigIcon.svg?react';
import AvatarGroup from '@/components/feature/teamPage/AvatarGroup';
import MemberListCard from '@/components/feature/teamPage/MemberListCard';
import ReportCard from '@/components/feature/teamPage/ReportCard';
import TaskKanbanBoard from '@/components/feature/teamPage/TaskKanbanBoard';
import GroupTitleBar from '@/components/ui/GroupTitleBar';
import useModal from '@/hooks/useModal';
import { calcTodayDone, calcTodayTodos } from '@/utils/calculations';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function TeamPage() {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const params = useParams();
  const groupId = Number(params.groupId);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { data: groupData } = useQuery(groupQueries.groupOptions(groupId));

  useEffect(() => {
    const getUserRole = async () => {
      const user = localStorage.getItem('user');

      if (!user) return;

      try {
        const data = await getGroupMembership(groupId, JSON.parse(user).id);
        setIsAdmin(data.role === 'ADMIN');
      } catch (e) {
        console.log('유저 권한 가져오기 실패: ', e);
        if (isAxiosError(e) && e.response?.status === 404) {
          // 그룹 멤버 아닐 시 홈으로 이동
          navigate('/', { replace: true });
        } else {
          toast.error('사용자 권한을 가져올 수 없습니다. 다시 시도해주세요.');
        }
        throw e;
      }
    };

    setIsAdmin(null);
    getUserRole();
  }, [navigate, groupId]);

  if (isAdmin === null || !groupData) return;

  const handleOpenMembersModal = () => {
    openModal({
      children: (
        <MemberListCard members={groupData.members} isModalDisplay={true} />
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
          <ConfigIcon className={clsx('w-5 md:w-6', { hidden: !isAdmin })} />
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
        <MemberListCard members={groupData.members} />
      </div>
    </div>
  );
}
