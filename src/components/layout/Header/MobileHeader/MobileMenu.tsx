import SheetCloseIcon from '@/assets/icons/SheetCloseIcon.svg?react';
import SheetMenuIcon from '@/assets/icons/SheetMenuIcon.svg?react';
import HeaderGnb from '@/components/layout/Header/HeaderGnb';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { MembershipsType, UserType } from '@/types/userType';
import { DialogTitle } from '@radix-ui/react-dialog';

interface Props {
  user: UserType;
  currentGroup: MembershipsType | null;
  onUpdateCurrentGroup: (group: MembershipsType) => void;
}

export default function MobileMenu({
  user,
  currentGroup,
  onUpdateCurrentGroup,
}: Props) {
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
          <HeaderGnb
            user={user}
            currentGroup={currentGroup}
            onUpdateCurrentGroup={onUpdateCurrentGroup}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
