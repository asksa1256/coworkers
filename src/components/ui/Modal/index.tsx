import SheetCloseIcon from '@/assets/icons/SheetCloseIcon.svg?react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import ModalBody from '@/components/ui/Modal/ModalBody';
import ModalFoot from '@/components/ui/Modal/ModalFoot';
import useModal from '@/hooks/useModal';
import { cn } from '@/lib/utils';
import { unmountModalAtom } from '@/store/modalAtom';
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import { useSetAtom } from 'jotai';

const modalStyle = cva(
  `flex flex-col border-none bg-bg-primary max-h-[90dvh] gap-0 overflow-hidden`,
  {
    variants: {
      mode: {
        bottomSheet: `
          top-[auto] bottom-0 translate-y-full rounded-none p-12 pb-8
          md:top-1/2 md:bottom-[auto] md:w-[384px] md:-translate-y-1/2 md:px-[52px] md:pt-12 md:pb-8
        `,
        normal: `
          sm:max-w-[90vw] w-[90%] rounded-xl py-8 px-6 shadow-[4px_4px_10px_rgba(36,36,36,0.25)
          md:w-[384px]
        `,
      },
      round: {
        sm: 'rounded-t-xl md:rounded-xl',
        lg: 'rounded-t-3xl md:rounded-3xl',
      },
      motion: {
        bottomSheet: `
          data-[state=open]:zoom-in-100 data-[state=open]:slide-in-from-bottom data-[state=open]:translate-y-0
          md:data-[state=open]:zoom-in-95 md:data-[state=open]:animate-in md:data-[state=open]:slide-in-from-bottom-0 md:data-[state=open]:-translate-y-1/2
        `,
        normal: ``,
      },
    },
    compoundVariants: [{ mode: 'normal', className: 'rounded-3xl' }],
    defaultVariants: {
      mode: 'bottomSheet',
      round: 'lg',
      motion: 'bottomSheet',
    },
  },
);

export default function Modal() {
  const unmountModal = useSetAtom(unmountModalAtom);
  const { modal, closeModal } = useModal();
  const { isOpen, options } = modal;

  if (options === null) return;
  const { children, closeIconButton, className, mode, round } = options;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          modalStyle({
            mode,
            round,
            motion: mode,
          }),
          className,
        )}
        onAnimationEnd={e => {
          const element = e.currentTarget as HTMLElement;
          if (element.getAttribute('data-state') === 'closed') {
            unmountModal();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle className='sr-only' />
          <DialogDescription className='sr-only' />
        </DialogHeader>
        {closeIconButton && (
          <DialogClose className='absolute top-4 right-4'>
            <SheetCloseIcon />
          </DialogClose>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}

Modal.Body = ModalBody;
Modal.Foot = ModalFoot;
