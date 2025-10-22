import KebabIcon from '@/assets/icons/KebabIcon.svg?react';

interface Props {
  member: {
    role: string;
    userImage: string;
    userEmail: string;
    userName: string;
    groupId: number;
    userId: number;
  };
}

export default function MemberItem({ member }: Props) {
  return (
    <div className='flex items-center gap-3'>
      {/* Todo - img로 교체 */}
      <div className='h-8 w-8 rounded-lg border text-xs'>
        {member.userImage}
      </div>
      <div className='flex grow-1 items-center'>
        <div className='grow-1'>
          <div className='text-sm font-semibold'>{member.userName}</div>
          <div className='text-text-secondary text-xs'>{member.userEmail}</div>
        </div>
        <KebabIcon />
      </div>
    </div>
  );
}
