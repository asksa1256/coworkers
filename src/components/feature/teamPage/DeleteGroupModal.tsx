import { groupMutations } from '@/api/mutations';
import AlertIcon from '@/assets/icons/AlertIcon.svg?react';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import { userAtom } from '@/store/authAtom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  groupId: number;
  groupName: string;
}

export default function DeleteGroupModal({ groupId, groupName }: Props) {
  const { closeModal } = useModal();
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation(
    groupMutations.deleteGroupOptions(user!, queryClient),
  );

  useEffect(() => {
    //userAtom 그룹 정보 동기화
    if (isSuccess) {
      setUser(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          memberships: prev.memberships.filter(
            group => group.groupId !== groupId,
          ),
        };
      });
      navigate('/', { replace: true });
      closeModal();
    }
  }, [isSuccess]);

  return (
    <div className='text-center'>
      <AlertIcon className='mb-4 inline' />
      <p className='mb-2 font-medium whitespace-pre-line'>
        <strong>팀 {groupName}</strong>
        {`을(를)\n정말 삭제하시겠어요?`}
      </p>
      <p className='text-text-secondary text-md mb-6 font-medium'>
        이 작업은 되돌릴 수 없습니다.
      </p>
      <div className='flex gap-2'>
        <Button
          className='text-text-default hover:text-unset focus:text-unset bg-bg-primary hover:border-unset hover:bg-unset focus:border-unset border-icon-secondary shrink-1 hover:brightness-95 focus:brightness-90'
          variant='outline'
          onClick={() => {
            closeModal();
          }}
        >
          닫기
        </Button>
        <Button
          className='shrink-1'
          variant='danger'
          onClick={() => {
            mutate(groupId);
          }}
          disabled={isPending}
        >
          {isPending ? '팀 삭제중...' : '삭제'}
        </Button>
      </div>
    </div>
  );
}
