import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import { cn } from '@/lib/utils';
import type { MemberType } from '@/types/userType';
import InviteLinkCopyModal from './InviteLinkCopyModal';
import MemberItem from './MemberItem';

interface Props {
  members: MemberType[];
  isModalDisplay?: boolean;
}

export default function MemberListCard({
  members,
  isModalDisplay = false,
}: Props) {
  const { openModal } = useModal();
  const groupId = String(members[0].groupId);

  const handleOpenInviteModal = () => {
    if (!groupId) return;
    openModal({
      children: <InviteLinkCopyModal groupId={groupId} />,
      closeIconButton: true,
    });
  };

  return (
    <section
      className={cn(
        'card-common hidden h-[275px] w-full max-w-60 px-5 py-6 lg:block',
        isModalDisplay && 'block h-58 max-w-none border-none p-0',
      )}
    >
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='font-medium'>
          멤버
          <span className='text-md text-text-default font-normal'>{` (${members.length}명)`}</span>
        </h2>
        <Button
          className='w-auto px-0 py-0 font-semibold'
          variant='link'
          size='sm'
          onClick={handleOpenInviteModal}
        >
          초대하기 +
        </Button>
      </div>
      <div className='hide-scrollbar flex h-44 flex-col gap-4 overflow-x-hidden overflow-y-scroll'>
        {members.map(member => (
          <MemberItem key={member.userId} member={member} />
        ))}
      </div>
    </section>
  );
}
