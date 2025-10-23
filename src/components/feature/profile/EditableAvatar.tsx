import PencilIcon from '@/assets/icons/PencilIcon.svg?react';
import Avatar from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';

interface EditableAvatarProps {
  imgSrc: string | null;
  className?: string;
}

export default function EditableAvatar({
  imgSrc,
  className,
}: EditableAvatarProps) {
  const handleFileChange = () => {};

  return (
    <label
      className={cn(
        'group relative block h-16 w-16 transition-colors md:h-[100px] md:w-[100px]',
        className,
      )}
      htmlFor='profile-image-upload'
    >
      <input
        type='file'
        id='profile-image-upload'
        className='sr-only'
        accept='image/*'
        onChange={handleFileChange}
      />

      <Avatar
        imgSrc={imgSrc}
        className={cn(
          'border-border-primary bg-bg-tertiary/50 relative h-full w-full cursor-pointer rounded-[20px] border-2 transition-colors md:rounded-4xl',
          'group-hover:bg-bg-tertiary',
          !imgSrc && '[&_img]:size-12 md:[&_img]:size-20',
          imgSrc &&
            'before:absolute before:inset-0 before:rounded-[18px] before:bg-black/0 before:transition-colors group-hover:before:bg-black/30',
        )}
      />

      <span className='bg-bg-tertiary group-hover:bg-primary hover:bg-primary absolute -right-1 bottom-0 flex size-[20px] items-center justify-center rounded-full transition-colors md:size-8'>
        <PencilIcon className='text-icon-primary size-[10px] group-hover:text-white group-focus:text-white md:size-4' />
      </span>
    </label>
  );
}
