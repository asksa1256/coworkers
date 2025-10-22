import ConfigIcon from '@/assets/icons/ConfigIcon.svg?react';
import MemberCard from '@/components/feature/teamPage/MemberCard';
import ReportCard from '@/components/feature/teamPage/ReportCard';
import TaskKanbanBoard from '@/components/feature/teamPage/TaskKanbanBoard';
import GroupTitleBar from '@/components/ui/GroupTitleBar';
import clsx from 'clsx';

//Todo - api 연결 이후 삭제
const MOCK_DATA = {
  TEAM: {
    teamId: 'kyungyoung',
    updatedAt: '2025-10-20T17:37:13.606Z',
    createdAt: '2025-10-20T17:37:13.606Z',
    image: 'string',
    name: '경영관리팀',
    id: 0,
    members: [
      {
        role: 'ADMIN',
        userImage: '강영훈',
        userEmail: 'codeitCEO@email.com',
        userName: '영후니',
        groupId: 123,
        userId: 1,
      },
      {
        role: 'MEMBER',
        userImage: '이용섭',
        userEmail: 'ysub@email.com',
        userName: '용서비',
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
        tasks: ['커피 타기', '회의실 예약하기'],
      },
    ],
  },
};

export default function TeamPage() {
  //Todo - 로그인 유저의 role로 변경
  const isAdmin = true;

  return (
    <div className='w-full max-w-280 py-6 md:pt-18 lg:mx-auto lg:pt-30'>
      <div className='flex flex-col gap-3 md:gap-5'>
        <GroupTitleBar className='flex justify-between'>
          <div className='flex gap-2'>
            <h2>{MOCK_DATA.TEAM.name}</h2>
            <div className='lg:hidden'>{'[멤버아바타]'}</div>
          </div>
          <ConfigIcon className={clsx('w-5 md:w-6', { hidden: !isAdmin })} />
        </GroupTitleBar>

        {/* Todo - count 연결 */}
        {isAdmin && <ReportCard todosCount={3} doneCount={2} />}
      </div>

      <h2 className='mt-8 mb-4 font-medium md:mt-10 lg:mt-16 lg:mb-[30px]'>
        할 일 목록
        <span className='font-base text-text-default'>{` (${MOCK_DATA.TEAM.taskLists.length})개`}</span>
      </h2>
      <div className='flex lg:gap-7'>
        <TaskKanbanBoard tasklist={MOCK_DATA.TEAM.taskLists} />
        <MemberCard members={MOCK_DATA.TEAM.members} />
      </div>
    </div>
  );
}
