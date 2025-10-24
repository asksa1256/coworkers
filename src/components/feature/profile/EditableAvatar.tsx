import PencilIcon from '@/assets/icons/PencilIcon.svg?react';
import Avatar from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface EditableAvatarProps {
  imgSrc: string | null;
  className?: string;
  onImageChange: (file: File) => void;
}

export default function EditableAvatar({
  imgSrc,
  className,
  onImageChange,
}: EditableAvatarProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        alert('jpg, png, webp, avif 형식의 이미지만 업로드 가능합니다.');
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        alert('파일 크기는 10MB 이하여야 합니다.');
        return;
      }

      onImageChange(file);
    }
  };

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
        accept='image/jpeg,image/png,image/webp,image/avif'
        onChange={handleFileChange}
      />

      <Avatar
        imgSrc={imgSrc}
        className={cn(
          'border-border-primary bg-bg-tertiary/50 relative !h-full !w-full cursor-pointer rounded-[20px] border-2 transition-colors md:rounded-4xl',
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
