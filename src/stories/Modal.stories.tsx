import Modal from '@/components/ui/Modal';
import useModal from '@/hooks/useModal';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Example/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalContentComponent = () => {
  const { closeModal } = useModal();
  console.log('모달 컨텐츠가 컴포넌트인 경우');

  return (
    <>
      <Modal.Body>
        <div className='h-screen'>내용이 들어가요</div>
      </Modal.Body>
      <Modal.Foot>
        <button onClick={closeModal} className='bg-primary w-full'>
          닫기
        </button>
      </Modal.Foot>
    </>
  );
};

const ModalTriggerButtons = () => {
  const { openModal, closeModal } = useModal();

  const modalContent = (
    <>
      <Modal.Body>
        <div className='h-screen'>내용이 들어가요</div>
      </Modal.Body>
      <Modal.Foot>
        <button onClick={closeModal} className='bg-primary w-full'>
          닫기
        </button>
      </Modal.Foot>
    </>
  );

  const handleBottomSheetModal = () => {
    openModal({
      closeIconButton: true,
      children: modalContent,
    });
  };

  const handleNormalModal = () => {
    openModal({
      mode: 'normal',
      closeIconButton: true,
      children: modalContent,
    });
  };

  const handleNormalModalComponent = () => {
    openModal({
      mode: 'normal',
      closeIconButton: true,
      children: () => <ModalContentComponent />,
    });
  };

  return (
    <div className='flex h-screen items-center justify-center gap-4 p-8'>
      <button onClick={handleBottomSheetModal}>Bottom Sheet 모달</button>
      <button onClick={handleNormalModal}>Normal 모달</button>
      <button onClick={handleNormalModalComponent}>
        컨텐츠가 컴포넌트인 경우
      </button>
    </div>
  );
};

export const DefaultModal: Story = {
  name: 'Modal 동작 테스트 (useModal)',
  args: {},
  render: () => {
    return (
      <>
        <ModalTriggerButtons />
        <Modal />
      </>
    );
  },
};
