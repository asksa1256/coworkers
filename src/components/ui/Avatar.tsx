import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon.svg';
import { cn } from '@/lib/utils';

interface AvatarProps {
  imgSrc: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Avatar({
  imgSrc,
  size = 'md',
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        'bg-bg-tertiary inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg',
        {
          'h-6 w-6 rounded-md': size === 'sm',
          'h-10 w-10 rounded-xl': size === 'lg',
        },
        className,
      )}
    >
      <img
        src={imgSrc || DefaultProfileIcon}
        alt='프로필 이미지'
        className={cn(
          imgSrc && 'h-full w-full object-cover',
          !imgSrc && 'object-contain',
          !imgSrc && {
            'h-5 w-5': size === 'sm',
            'h-[26px] w-[26px]': size === 'md',
            'h-8 w-8': size === 'lg',
          },
        )}
      />
    </div>
  );
}
