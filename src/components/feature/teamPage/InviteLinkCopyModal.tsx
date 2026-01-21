import { createInviteToken } from '@/api/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useModal from '@/hooks/useModal';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  groupId: string;
}

export default function InviteLinkCopyModal({ groupId }: Props) {
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [copyFailed, setCopyFailed] = useState(false);
  const { closeModal } = useModal();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => createInviteToken(id),
    onSuccess: token => {
      const origin = window.location.origin;
      const url = new URL('/join-team', origin);
      url.searchParams.set('token', token);
      url.searchParams.set('groupId', groupId);
      setInviteUrl(url.toString());
    },
    onError: () => {
      toast.error('초대 링크를 생성하지 못했습니다.');
    },
  });

  const handleCreateInviteLink = async () => {
    if (!groupId) {
      toast.error('팀 정보가 없습니다.');
      return;
    }
    mutate(groupId);
  };

  const handleCopyInviteLink = () => {
    if (inviteUrl === null) return;

    copyToClipboard(inviteUrl)
      .then(() => {
        toast.success('초대 링크가 복사되었습니다!');
        closeModal();
      })
      .catch(() => {
        setCopyFailed(true);
        toast.error('복사에 실패했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <div className='text-center'>
      <h3 className='mb-2 block font-medium'>멤버 초대</h3>
      <p className='text-md mb-10'>그룹에 참여할 수 있는 링크를 복사합니다.</p>
      <div className='flex gap-1'>
        <Button
          onClick={handleCreateInviteLink}
          disabled={isPending}
          className='w-auto flex-1'
        >
          {isPending ? '링크 생성중...' : '링크 생성하기'}
        </Button>

        <Button
          onClick={handleCopyInviteLink}
          disabled={!inviteUrl}
          className='w-auto flex-1'
          variant='outline'
        >
          링크 복사하기
        </Button>
      </div>
      {copyFailed && (
        <div className='mt-2'>
          <Input readOnly value={inviteUrl || ''} />
          <p className='text-md text-primary-pressed mt-2'>
            길게 눌러 복사해주세요.
          </p>
        </div>
      )}
    </div>
  );
}
