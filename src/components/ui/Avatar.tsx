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
        'bg-bg-tertiary inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-md md:h-8 md:w-8 md:rounded-lg',
        {
          'h-6 w-6 rounded-md': size === 'sm',
          'h-6 w-6 rounded-md md:h-8 md:w-8 md:rounded-lg lg:h-10 lg:w-10 lg:rounded-xl':
            size === 'lg',
        },
        className,
      )}
    >
      <img
        src={imgSrc || DefaultProfileIcon}
        alt='프로필 이미지'
        className={cn(
          imgSrc && 'h-full w-full object-cover',
          !imgSrc && 'h-5 w-5 object-contain md:h-6 md:w-6',
          !imgSrc && {
            'lg:h-8 lg:w-8': size === 'lg',
          },
        )}
      />
    </div>
  );
}
