import InviteLinkCopyButton from './InviteLinkCopyButton';

interface Props {
  groupId: string;
}

export default function InviteLinkCopyModal({ groupId }: Props) {
  return (
    <div className='text-center'>
      <h3 className='mb-2 block font-medium'>멤버 초대</h3>
      <div className='text-md mb-10'>
        그룹에 참여할 수 있는 링크를 복사합니다.
      </div>
      <InviteLinkCopyButton groupId={groupId} />
    </div>
  );
}
