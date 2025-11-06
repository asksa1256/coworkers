import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import Avatar from '@/components/ui/Avatar';
import type { MemberType } from '@/types/userType';

interface Props {
  member: MemberType;
}

export default function MemberItem({ member }: Props) {
  return (
    <div className='flex items-center gap-3'>
      <Avatar imgSrc={member.userImage} className='shrink-0' />
      <div className='flex grow-1 items-center'>
        <div className='w-[138px] grow-1 truncate'>
          <div className='leading-sm text-sm font-semibold'>
            {member.userName}
          </div>
          <div className='text-text-secondary text-xs'>{member.userEmail}</div>
        </div>
        <KebabIcon className='text-icon-secondary hover:text-icon-primary h-4 w-4' />
      </div>
    </div>
  );
}
