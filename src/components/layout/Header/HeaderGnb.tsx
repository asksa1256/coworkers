import GnbArrowIcon from '@/assets/icons/GnbArrowIcon.svg?react';
import GnbBoardIcon from '@/assets/icons/GnbBoardIcon.svg?react';
import GnbPlusIcon from '@/assets/icons/GnbPlusIcon.svg?react';
import GnbTeamIcon from '@/assets/icons/GnbTeamIcon.svg?react';
import { cn } from '@/lib/utils';
import type { MembershipsType, UserType } from '@/types/userType';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

interface GnbItemProps {
  type: 'team' | 'board';
  href: string;
  title: string;
  current: boolean;
}

const gnbIconType = {
  team: GnbTeamIcon,
  board: GnbBoardIcon,
};

function GnbItem({ type, href, title, current }: GnbItemProps) {
  const Icon = gnbIconType[type];
  return (
    <li className='md:mb-2'>
      <Link
        to={href}
        className={cn(
          'text-md flex h-11 items-center gap-2 whitespace-normal md:h-auto md:min-h-[52px] md:rounded-xl md:px-4 md:py-[10px] md:text-base md:hover:bg-slate-50',
          current && 'text-primary font-semibold md:bg-blue-50',
          'transition-all group-[.is-fold]:md:h-[52px] group-[.is-fold]:md:w-[52px] group-[.is-fold]:md:gap-0 group-[.is-fold]:md:px-0',
        )}
      >
        <span
          className={cn(
            'w-5 shrink-0 text-slate-300',
            current && 'text-primary',
            'transition-all group-[.is-fold]:md:mx-auto group-[.is-fold]:md:w-6',
          )}
        >
          {<Icon />}
        </span>
        <span
          className={cn(
            'md:opacity-100 md:transition-opacity md:delay-200 md:duration-75',
            'group-[.is-fold]:md:hidden group-[.is-fold]:md:opacity-0 group-[.is-fold]:md:delay-0',
          )}
        >
          {title}
        </span>
      </Link>
    </li>
  );
}

interface HeaderGnbProps {
  user: UserType;
  currentGroup: MembershipsType | null;
  onUpdateCurrentGroup: (group: MembershipsType) => void;
}

export default function HeaderGnb({
  user,
  currentGroup,
  onUpdateCurrentGroup,
}: HeaderGnbProps) {
  const location = useLocation();
  const params = useParams();
  const [isGroupOpen, setIsGroupOpen] = useState(true);

  const { memberships } = user;

  useEffect(() => {
    if (!params.teamId) return;
    const findGroup = memberships.find(
      item => String(item.group.id) === params.teamId,
    );
    if (findGroup) onUpdateCurrentGroup(findGroup);
  }, [params.teamId]);

  return (
    <nav className='md:-mx-4 md:flex md:w-[270px] md:grow-1 md:flex-col md:overflow-hidden md:px-4'>
      <div
        className={cn(
          'md:flex md:flex-col md:overflow-hidden md:opacity-100 md:transition-all md:delay-200 md:duration-75',
          'group-[.is-fold]:md:opacity-0',
        )}
      >
        <div
          className={cn(
            'border-border-primary mb-3 border-b pb-6 md:flex md:flex-col md:overflow-hidden',
            'group-[.is-fold]:md:hidden',
          )}
        >
          {!!memberships.length && (
            <>
              <button
                className={cn(
                  'mb-2 hidden h-9 w-full items-center gap-3 px-4 text-left md:flex md:shrink-0',
                )}
                onClick={() => {
                  setIsGroupOpen(prev => !prev);
                }}
              >
                <span
                  className={cn(
                    'block w-5 shrink-0 text-slate-300',
                    currentGroup && 'text-primary',
                  )}
                >
                  <GnbTeamIcon />
                </span>
                <span
                  className={cn(
                    'grow-1 font-semibold text-slate-400',
                    currentGroup && 'text-primary',
                  )}
                >
                  {currentGroup === null ? '팀 선택' : currentGroup.group.name}
                </span>
                <span className='shrink-0'>
                  <GnbArrowIcon
                    className={cn(!isGroupOpen && 'rotate-180 transition-all')}
                  />
                </span>
              </button>
              <div
                className={cn(
                  'md:grow-1 md:overflow-auto',
                  isGroupOpen ? 'md:block' : 'md:hidden',
                )}
              >
                <ul>
                  {memberships.map(team => (
                    <GnbItem
                      type='team'
                      title={team.group.name}
                      href={`/${team.group.id}`}
                      key={team.group.id}
                      current={currentGroup?.group?.id === team.group.id}
                    />
                  ))}
                </ul>
              </div>
            </>
          )}
          <Link
            to=''
            className='border-primary text-md text-primary mt-2 flex h-[33px] shrink-0 items-center justify-center gap-1 rounded-lg border font-semibold'
          >
            <GnbPlusIcon />팀 추가하기
          </Link>
        </div>
      </div>

      {currentGroup && (
        <ul className='mb-2 hidden group-[.is-fold]:md:block'>
          <GnbItem
            type='team'
            title={currentGroup?.group.name}
            href={`/${currentGroup.group.id}`}
            current={true}
          />
        </ul>
      )}

      <ul className='shrink-0'>
        <GnbItem
          type='board'
          title='자유게시판'
          href='/board'
          current={location.pathname === '/board'}
        />
      </ul>
    </nav>
  );
}
