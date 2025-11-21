import AlertIcon from '@/assets/icons/AlertIcon.svg?react';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';

export default function SecessionModal() {
  const { closeModal } = useModal();

  return (
    <div className='text-center'>
      <AlertIcon className='mb-4 inline' />
      <p className='mb-2 font-medium whitespace-pre-line'>
        회원 탈퇴를 진행하시겠어요?
      </p>
      <p className='text-text-secondary text-md mb-6 font-medium whitespace-pre-line'>
        {`그룹장으로 있는 그룹은 자동으로 삭제되고,\n모든 그룹에서 나가집니다.`}
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
          onClick={() => {}}
          // disabled={isPending}
        >
          {/* {isPending ? '탈퇴중...' : '회원 탈퇴'} */}
          회원 탈퇴
        </Button>
      </div>
    </div>
  );
}
