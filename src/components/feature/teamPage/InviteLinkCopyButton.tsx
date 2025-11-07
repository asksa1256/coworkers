import { createInviteToken } from '@/api/api';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

interface Props {
  groupId: string;
}

export default function InviteLinkCopyButton({ groupId }: Props) {
  const { closeModal } = useModal();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const token = await createInviteToken(id);
      const origin = window.location.origin;
      const url = new URL('/join-team', origin);
      url.searchParams.set('token', token);
      url.searchParams.set('groupId', id);

      await copyToClipboard(url.toString());
      return token;
    },
    onSuccess: () => {
      toast.success('초대 링크가 복사되었습니다!');
      closeModal();
    },
    onError: error => {
      if (isAxiosError(error)) {
        // 엔드포인트 /groups/${groupId}/invitation의 에러 처리
        toast.error('초대 링크를 생성하지 못했습니다.');
      } else {
        // copyToClipboard의 에러 처리
        toast.error('복사에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  const handleCopyInviteLink = async () => {
    if (!groupId) {
      toast.error('팀 정보가 없습니다.');
      return;
    }
    mutate(groupId);
  };

  return (
    <Button onClick={handleCopyInviteLink} disabled={isPending}>
      {isPending ? '링크 복사중...' : '링크 복사하기'}
    </Button>
  );
}
