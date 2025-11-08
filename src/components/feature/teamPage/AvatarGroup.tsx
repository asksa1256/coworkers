import Avatar from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';
import type { MemberType } from '@/types/userType';

interface Props {
  members: MemberType[];
  onClick: () => void;
}

const OUTLINE_STYLE = 'border-white border-1';

export default function AvatarGroup({ members, onClick }: Props) {
  return (
    <button
      className='card-common flex items-center gap-[6px] p-1 pr-2'
      type='button'
      onClick={onClick}
    >
      <div className='flex -space-x-[6px]'>
        {members.slice(0, 3).map((member, i) => (
          <Avatar
            className={cn(OUTLINE_STYLE, `z-${3 - i}`)}
            key={member.userId}
            size='sm'
            imgSrc={member.userImage}
          />
        ))}
      </div>
      <span className='text-text-default text-sm font-medium'>
        {members.length}
      </span>
    </button>
  );
}
