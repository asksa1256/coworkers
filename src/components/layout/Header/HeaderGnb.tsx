import { groupQueries } from '@/api/queries';
import GnbArrowIcon from '@/assets/icons/GnbArrowIcon.svg?react';
import GnbBoardIcon from '@/assets/icons/GnbBoardIcon.svg?react';
import GnbPlusIcon from '@/assets/icons/GnbPlusIcon.svg?react';
import GnbTeamIcon from '@/assets/icons/GnbTeamIcon.svg?react';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { userAtom } from '@/store/authAtom';
import type { GroupType } from '@/types/userType';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

interface GnbItemProps {
  type: 'team' | 'board';
  href: string;
  title: string;
  image?: string | null;
  current: boolean;
}

const gnbIconType = {
  team: GnbTeamIcon,
  board: GnbBoardIcon,
};

function GnbItem({ type, href, title, current, image }: GnbItemProps) {
  const Icon = gnbIconType[type];
  return (
    <li className='md:mb-2'>
      <Link
        to={href}
        className={cn(
          'text-md flex h-11 items-center gap-2 whitespace-normal md:h-auto md:min-h-[52px] md:gap-3 md:rounded-xl md:px-4 md:py-[10px] md:hover:bg-slate-50 lg:text-base',
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
          {image ? (
            <img
              src={image}
              className='aspect-square w-full rounded-sm object-cover md:scale-150'
            />
          ) : (
            <Icon />
          )}
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
  currentGroup: GroupType | null;
  onUpdateCurrentGroup: (group: GroupType | null) => void;
}

export default function HeaderGnb({
  currentGroup,
  onUpdateCurrentGroup,
}: HeaderGnbProps) {
  const location = useLocation();
  const { groupId } = useParams();
  const [isGroupOpen, setIsGroupOpen] = useState(true);

  const user = useAtomValue(userAtom);
  const { data: userGroups } = useQuery(groupQueries.groupsOptions(user));

  useEffect(() => {
    const findGroup = userGroups?.find(item => String(item.id) === groupId);
    if (findGroup) {
      onUpdateCurrentGroup(findGroup);
    } else {
      onUpdateCurrentGroup(null);
    }
  }, [groupId, userGroups, onUpdateCurrentGroup]);

  if (!userGroups)
    return (
      <div className='flex justify-center py-10'>
        <Spinner />
      </div>
    );

  return (
    <nav className='lg:-mx-4 lg:flex lg:w-[270px] lg:grow-1 lg:flex-col lg:overflow-hidden lg:px-4'>
      <div
        className={cn(
          'lg:flex lg:flex-col lg:overflow-hidden lg:opacity-100 lg:transition-all lg:delay-200 lg:duration-75',
          'group-[.is-fold]:lg:opacity-0',
        )}
      >
        <div
          className={cn(
            'border-border-primary mb-3 border-b pb-6 lg:flex lg:flex-col lg:overflow-hidden',
            'group-[.is-fold]:lg:hidden',
          )}
        >
          {!!userGroups.length && (
            <>
              <button
                className={cn(
                  'lg:text-md mb-2 hidden h-9 w-full items-center gap-3 overflow-hidden px-4 text-left lg:flex lg:shrink-0 lg:text-base',
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
                  {currentGroup?.image ? (
                    <img
                      src={currentGroup.image}
                      className='aspect-square w-full rounded-sm object-cover md:scale-150'
                    />
                  ) : (
                    <GnbTeamIcon />
                  )}
                </span>
                <span
                  className={cn(
                    'block grow-1 overflow-hidden font-semibold text-ellipsis whitespace-nowrap text-slate-400',
                    currentGroup && 'text-primary',
                  )}
                >
                  {currentGroup === null ? '팀 선택' : currentGroup.name}
                </span>
                <span className='shrink-0'>
                  <GnbArrowIcon
                    className={cn(!isGroupOpen && 'rotate-180 transition-all')}
                  />
                </span>
              </button>
              <div
                className={cn(
                  'lg:grow-1 lg:overflow-auto',
                  isGroupOpen ? 'lg:block' : 'lg:hidden',
                )}
              >
                <ul>
                  {userGroups.map(team => (
                    <GnbItem
                      type='team'
                      image={team.image}
                      title={team.name}
                      href={`/${team.id}`}
                      key={team.id}
                      current={currentGroup?.id === team.id}
                    />
                  ))}
                </ul>
              </div>
            </>
          )}
          <Link
            to='/create-team'
            className='border-primary text-md text-primary mt-2 flex h-[33px] shrink-0 items-center justify-center gap-1 rounded-lg border font-semibold'
          >
            <GnbPlusIcon />팀 생성하기
          </Link>
        </div>
      </div>

      {currentGroup && (
        <ul className='mb-2 hidden group-[.is-fold]:lg:block'>
          <GnbItem
            type='team'
            title={currentGroup?.name}
            href={`/${currentGroup.id}`}
            current={true}
          />
        </ul>
      )}

      <ul className='shrink-0'>
        <GnbItem
          type='board'
          title='자유게시판'
          href='/board'
          current={location.pathname.includes('/board')}
        />
      </ul>
    </nav>
  );
}
