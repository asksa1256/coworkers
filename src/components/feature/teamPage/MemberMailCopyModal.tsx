import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import type { MemberType } from '@/types/userType';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { toast } from 'sonner';

interface Props {
  member: MemberType;
}

export default function MemberMailCopyModal({ member }: Props) {
  const { closeModal } = useModal();

  const handleCopyMail = async () => {
    try {
      await copyToClipboard(member.userEmail);
      toast.success('이메일을 복사했습니다.');
      closeModal();
    } catch (e) {
      toast.error('복사에 실패했습니다. 다시 시도해주세요.');
      throw e;
    }
  };

  return (
    <div className='text-center'>
      <Avatar
        size='lg'
        imgSrc={member.userImage}
        className='mb-4 h-10 w-10 md:h-10 md:w-10'
      />
      <div className='text-md mb-1 font-semibold'>{member.userName}</div>
      <div className='mb-6 text-xs'>{member.userEmail}</div>
      <Button onClick={handleCopyMail}>이메일 복사하기</Button>
    </div>
  );
}
