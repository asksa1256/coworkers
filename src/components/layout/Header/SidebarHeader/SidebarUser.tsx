import UserMenu from '@/components/layout/Header/UserMenu';
import Avatar from '@/components/ui/Avatar';
import { userAtom } from '@/store/authAtom';
import type { GroupType } from '@/types/userType';
import { useAtomValue } from 'jotai';

interface Props {
  currentGroup: GroupType | null;
}

export default function SidebarUser({ currentGroup }: Props) {
  const user = useAtomValue(userAtom);

  if (!user) return;

  const { nickname, image } = user;

  return (
    <div className='border-border-primary relative mx-4 border-t pt-5 pb-6 [&_button]:max-w-full [&_button]:overflow-hidden'>
      <UserMenu>
        <div className='flex w-full items-center gap-3 text-left'>
          <Avatar
            imgSrc={image}
            size='lg'
            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-200'
          />
          <div className='grow-1 overflow-hidden group-[.is-fold]:hidden'>
            <strong className='block overflow-hidden leading-[1.35] font-medium text-ellipsis whitespace-nowrap'>
              {nickname}
            </strong>
            {currentGroup && (
              <span className='text-md mt-0.5 block overflow-hidden leading-[1.1] text-ellipsis whitespace-nowrap text-slate-400'>
                {currentGroup.name}
              </span>
            )}
          </div>
        </div>
      </UserMenu>
    </div>
  );
}
