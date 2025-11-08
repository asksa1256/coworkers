import { groupMutations } from '@/api/mutations';
import AlertIcon from '@/assets/icons/AlertIcon.svg?react';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import type { MemberType } from '@/types/userType';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  member: MemberType;
}

export default function ExcludeGroupMemberModal({ member }: Props) {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const excludeGroupMemberMutation = useMutation(
    groupMutations.excludeGroupMemberOptions(
      member.groupId,
      member.userId,
      member.userName,
      queryClient,
      closeModal,
    ),
  );

  const handleExcludeGroupMember = () => {
    excludeGroupMemberMutation.mutate([member.groupId, member.userId]);
  };

  return (
    <div className='text-center'>
      <AlertIcon className='mb-4 inline' />
      <div className='mb-2 font-medium whitespace-pre-line'>
        {`${member.userName}님을\n정말 팀에서 제외하시겠어요?`}
      </div>
      <div className='text-text-secondary text-md mb-6 font-medium'>
        이 작업은 되돌릴 수 없습니다.
      </div>
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
          onClick={handleExcludeGroupMember}
          disabled={excludeGroupMemberMutation.isPending}
        >
          {excludeGroupMemberMutation.isPending ? '제외중...' : '멤버 제외'}
        </Button>
      </div>
    </div>
  );
}
