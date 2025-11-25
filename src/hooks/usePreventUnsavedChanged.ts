import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { toast } from 'sonner';

const usePreventUnsavedChanges = (isDirty: boolean) => {
  const [hasWarned, setHasWarned] = useState(false);

  const shouldBlock = isDirty && !hasWarned;
  const blocker = useBlocker(shouldBlock);

  // 미저장 경고 해제 함수 (컴포넌트에서 onSuccess 내부에 사용)
  const confirmSave = () => setHasWarned(true);

  useEffect(() => {
    // 브라우저의 새로고침, 종료, url 이동 방지
    if (shouldBlock) {
      window.onbeforeunload = e => {
        e.preventDefault();
        // 브라우저 경고 출력시 플래그 활성
        setHasWarned(true);
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [shouldBlock]);

  useEffect(() => {
    // 클라이언트 라우팅 또는 뒤로가기 방지
    if (blocker.state === 'blocked') {
      toast.info('저장하지 않은 변경사항이 있어요!');

      // 토스트 출력시 플래그 활성
      setHasWarned(true);
      blocker.reset();
    }
  }, [blocker]);

  return { confirmSave, setHasWarned };
};

export default usePreventUnsavedChanges;
