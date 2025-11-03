import { getGroup, getGroupMembership } from '@/api/api';
import ConfigIcon from '@/assets/icons/ConfigIcon.svg?react';
import MemberCard from '@/components/feature/teamPage/MemberListCard';
import ReportCard from '@/components/feature/teamPage/ReportCard';
import TaskKanbanBoard from '@/components/feature/teamPage/TaskKanbanBoard';
import GroupTitleBar from '@/components/ui/GroupTitleBar';
import type { GroupDetailResponse } from '@/types/groupType';
import { calcTodayDone, calcTodayTodos } from '@/utils/calculations';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

//Todo - api 연결 이후 삭제
const MOCK_DATA = {
  TEAM: {
    groupId: 'kyungyoung',
    updatedAt: '2025-10-20T17:37:13.606Z',
    createdAt: '2025-10-20T17:37:13.606Z',
    image: 'string',
    name: '경영관리팀',
    id: 0,
    members: [
      {
        role: 'ADMIN',
        userImage: '이미지',
        userEmail: 'codeitCEO@email.com',
        userName: '강영훈',
        groupId: 123,
        userId: 1,
      },
      {
        role: 'MEMBER',
        userImage: '이미지',
        userEmail: 'ysub@email.com',
        userName: '이용섭',
        groupId: 123,
        userId: 2,
      },
    ],
    taskLists: [
      {
        displayIndex: 0,
        groupId: 123,
        updatedAt: '2025-10-20T17:37:13.606Z',
        createdAt: '2025-10-20T17:37:13.606Z',
        name: '법인 설립',
        id: 1,
        tasks: ['법인 설립 안내 드리기'],
      },
      {
        displayIndex: 1,
        groupId: 124,
        updatedAt: '2025-10-21T12:37:13.606Z',
        createdAt: '2025-10-21T12:37:13.606Z',
        name: '팀장 회의',
        id: 2,
        tasks: ['커피 타기', '회의실 예약하기', '공지 올리기'],
      },
      {
        displayIndex: 1,
        groupId: 124,
        updatedAt: '2025-10-22T12:37:13.606Z',
        createdAt: '2025-10-22T12:37:13.606Z',
        name: '업무 보고',
        id: 3,
        tasks: ['보고서 작성', '자료 전달'],
      },
    ],
  },
};

export default function TeamPage() {
  const navigate = useNavigate();
  const params = useParams();
  const groupId = Number(params.groupId);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const { data: groupData } = useQuery<GroupDetailResponse>({
    queryKey: ['group', groupId],
    queryFn: () => getGroup(groupId),
  });

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

  useEffect(() => {
    setIsAdmin(null);
    getUserRole();
  }, [groupId]);

  if (isAdmin === null || !groupData) return;

  return (
    <div className='mx-auto w-full max-w-280 py-6 md:py-18 lg:py-30'>
      <div className='flex flex-col gap-3 md:gap-5'>
        <GroupTitleBar className='flex justify-between'>
          <div className='flex gap-2'>
            <h2>{groupData.name}</h2>
            <div className='lg:hidden'>{'[멤버아바타]'}</div>
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

      <div className='flex lg:gap-7'>
        <TaskKanbanBoard taskLists={groupData.taskLists} />
        <MemberCard members={MOCK_DATA.TEAM.members} />
      </div>
    </div>
  );
}
