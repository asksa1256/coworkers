import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import ResetPasswordEmailForm from './ResetPasswordEmailForm';

export default function ResetPasswordModal() {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal({
      mode: 'normal',
      closeIconButton: false,
      children: () => <ResetPasswordEmailForm />,
    });
  };

  return (
    <Button
      type='button'
      variant='link'
      className='text-md w-auto p-0 font-normal underline underline-offset-4 hover:font-medium md:text-base'
      onClick={handleOpenModal}
    >
      비밀번호를 잊으셨나요?
    </Button>
  );
}
