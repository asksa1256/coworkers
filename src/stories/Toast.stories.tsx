import Toast from '@/components/ui/Toast';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from 'sonner';

const meta: Meta = {
  title: 'Example/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastTriggerButtons = () => {
  const handleInfoToast = () => {
    toast.info('저장하지 않은 변경사항이 있어요!', {
      classNames: {
        // toast: 'bg-red-500', // 토스트의 css 수정이 필요한 경우
      },
      action: {
        label: '변경사항 저장하기',
        onClick: () => console.log('변경사항 저장하기 함수 실행'),
      },
    });
  };

  const handleSuccessToast = () => {
    toast.success('개인정보 수정 성공!');
  };

  const handleErrorToast = () => {
    toast.error('서버에 문제가 발생하였습니다! 다시 시도해주세요!');
  };

  const handleWarningToast = () => {
    toast.warning('날짜를 다시 지정해주세요!');
  };

  const handleLoadingToast = () => {
    toast.loading('로딩중');
  };

  return (
    <div className='flex h-screen items-center justify-center gap-4 p-8'>
      <button className='rounded-md border px-2' onClick={handleInfoToast}>
        info
      </button>
      <button className='rounded-md border px-2' onClick={handleSuccessToast}>
        success
      </button>
      <button className='rounded-md border px-2' onClick={handleErrorToast}>
        error
      </button>
      <button className='rounded-md border px-2' onClick={handleWarningToast}>
        warning
      </button>
      <button className='rounded-md border px-2' onClick={handleLoadingToast}>
        loading
      </button>
    </div>
  );
};

export const DefaultToast: Story = {
  name: '토스트 동작 테스트',
  args: {},
  render: () => {
    return (
      <>
        <ToastTriggerButtons />
        <Toast />
      </>
    );
  },
};
