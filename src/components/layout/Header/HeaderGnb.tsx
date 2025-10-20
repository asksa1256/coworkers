import GnbBoardIcon from '@/assets/icons/GnbBoardIcon.svg?react';
import GnbPlusIcon from '@/assets/icons/GnbPlusIcon.svg?react';
import GnbTeamIcon from '@/assets/icons/GnbTeamIcon.svg?react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

interface GnbItemProps {
  type: 'team' | 'board';
  href: string;
  title: string;
  active: boolean;
}

const gnbIconType = {
  team: GnbTeamIcon,
  board: GnbBoardIcon,
};

function GnbItem({ type, href, title, active }: GnbItemProps) {
  console.log(active);
  const Icon = gnbIconType[type];
  return (
    <li>
      <Link
        to={href}
        className={cn(
          'text-md flex h-11 items-center gap-2',
          active && 'text-primary font-semibold',
        )}
      >
        <span className={cn('w-5 text-slate-300', active && 'text-primary')}>
          {<Icon />}
        </span>
        {title}
      </Link>
    </li>
  );
}

const mockTeam = [
  { title: '경영관리팀', href: '/list/123' },
  { title: '프로덕트팀', href: '/222' },
  { title: '마케팅팀', href: '/333' },
  { title: '콘텐츠팀', href: '/444' },
];

export default function HeaderGnb() {
  const { pathname } = useLocation();

  return (
    <nav>
      <ul>
        {mockTeam.map(team => (
          <GnbItem
            type='team'
            title={team.title}
            href={team.href}
            key={team.href}
            active={pathname === team.href}
          />
        ))}
        <li className='mt-2'>
          <Link
            to=''
            className='border-primary text-md text-primary flex h-[33px] items-center justify-center gap-1 rounded-lg border font-semibold'
          >
            <GnbPlusIcon />팀 추가하기
          </Link>
        </li>
      </ul>
      <ul className='border-border-primary mt-6 border-t pt-3'>
        <GnbItem
          type='board'
          title='자유게시판'
          href='/'
          active={pathname === 'board'}
        />
      </ul>
    </nav>
  );
}
