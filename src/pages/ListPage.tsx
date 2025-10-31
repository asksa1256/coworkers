import Button from '@/components/ui/Button';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function ListPage() {
  const { groupId } = useParams();

  const handleCopyInviteLink = async () => {
    if (!groupId) {
      toast.error('팀 정보가 없습니다.');
      return;
    }

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
    }
  };

  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard) {
      // navigator.clipboard 지원O
      await navigator.clipboard.writeText(text);
    } else {
      // navigator.clipboard 지원X - fallback용
      // ex) iphone safari, IE ...
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      textArea.style.zIndex = '-9999';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const result = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (!result) throw new Error('execCommand 복사 실패');
    }
  };

  return (
    <>
      <div className='h-full'>
        <Button onClick={handleCopyInviteLink}>링크 복사하기</Button>
      </div>
    </>
  );
}
