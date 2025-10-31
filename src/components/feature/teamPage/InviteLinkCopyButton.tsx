import Button from '@/components/ui/Button';
import axiosInstance from '@/lib/axios';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function InviteLinkCopyButton() {
  const { groupId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleCopyInviteLink = async () => {
    if (!groupId) {
      toast.error('팀 정보가 없습니다.');
      return;
    }

    setIsLoading(true);
    try {
      const { data: token } = await axiosInstance.get(
        `/groups/${groupId}/invitation`,
      );

      const origin = window.location.origin;
      const url = new URL('/join-team', origin);
      url.searchParams.set('token', token);
      url.searchParams.set('groupId', groupId);

      await copyToClipboard(url.toString());
      toast.success('초대 링크가 복사되었습니다!');
    } catch (error) {
      if (isAxiosError(error)) {
        // 엔드포인트 /groups/${groupId}/invitation의 에러 처리
        toast.error('초대 링크를 생성하지 못했습니다.');
      } else {
        // copyToClipboard의 에러 처리
        toast.error('복사에 실패했습니다. 다시 시도해주세요.');
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleCopyInviteLink} disabled={isLoading}>
      {isLoading ? '복사중...' : '링크 복사하기'}
    </Button>
  );
}
