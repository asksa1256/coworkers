import HeartFilledIcon from '@/assets/icons/HeartFilledIcon.svg?react';
import HeartIcon from '@/assets/icons/HeartIcon.svg?react';
import Button from '@/components/ui/Button';
import { useState } from 'react';

interface Props {
  likeCount: number;
}

export default function LikeFloatingButton({ likeCount }: Props) {
  const [isActive, setIsActive] = useState(false);

  const handleLike = () => {
    setIsActive(prev => !prev);
  };

  return (
    <div className='relative top-[50px] mt-[250px] hidden flex-col items-center gap-2 lg:sticky lg:flex'>
      <Button
        type='button'
        size='icon-xl'
        variant='ghost'
        round='full'
        className='group bg-bg-primary shadow-sm transition-transform hover:-translate-y-0.5'
        onClick={handleLike}
      >
        {isActive ? (
          <HeartFilledIcon className='text-primary' />
        ) : (
          <HeartIcon className='text-text-default group-hover:text-primary transition-colors' />
        )}
      </Button>
      <span className='text-text-default'>
        {likeCount > 99 ? '99+' : likeCount}
      </span>
    </div>
  );
}
