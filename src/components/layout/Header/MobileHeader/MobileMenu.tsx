import SheetCloseIcon from '@/assets/images/icons/SheetCloseIcon.svg?react';
import SheetMenuIcon from '@/assets/images/icons/SheetMenuIcon.svg?react';
import HeaderGnb from '@/components/layout/Header/HeaderGnb';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { DialogTitle } from '@radix-ui/react-dialog';

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <DialogTitle>
          <SheetMenuIcon />
        </DialogTitle>
      </SheetTrigger>
      <SheetContent
        className='bg-bg-primary w-[204px] gap-3 border-none'
        side='left'
      >
        <SheetHeader>
          <SheetClose className='ml-auto'>
            <SheetCloseIcon />
          </SheetClose>
        </SheetHeader>
        <div className='grow-1 overflow-auto px-4'>
          <HeaderGnb />
        </div>
      </SheetContent>
    </Sheet>
  );
}
