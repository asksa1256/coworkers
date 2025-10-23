import PencilIcon from '@/assets/icons/PencilIcon.svg?react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface EditableAvatarProps {
  imgSrc: string | null;
  className?: string;
}

export default function EditableAvatar({
  imgSrc,
  className,
}: EditableAvatarProps) {
  return (
    <div className={cn('group relative transition-colors', className)}>
      <Avatar
        imgSrc={imgSrc}
        className={cn(
          'border-border-primary bg-bg-tertiary/30 relative h-16 w-16 cursor-pointer rounded-[20px] border-2 transition-colors md:h-[100px] md:w-[100px] md:rounded-4xl',
          'group-hover:bg-bg-tertiary',
          'before:absolute before:inset-0 before:rounded-[18px] before:bg-black/0 before:transition-colors group-hover:before:bg-black/30 md:before:rounded-[30px]',
          !imgSrc && '[&_img]:size-12 md:[&_img]:size-20',
        )}
      />

      <Button
        size='icon-lg'
        round='full'
        className='bg-bg-tertiary group-hover:bg-primary hover:bg-primary absolute -right-1 bottom-0'
      >
        <PencilIcon className='text-icon-primary group-hover:text-white group-focus:text-white' />
      </Button>
    </div>
  );
}
