import HeartIcon from '@/assets/icons/HeartIcon.svg?react';
import Button from '@/components/ui/Button';

interface LikeFloatingButton {
  likeCount: number;
}

export default function LikeFloatingButton({ likeCount }: LikeFloatingButton) {
  return (
    <div className='relative top-[50px] mt-[250px] hidden flex-col items-center gap-2 lg:sticky lg:flex'>
      <Button
        type='button'
        size='icon-xl'
        variant='ghost'
        round='full'
        className='bg-bg-primary shadow-sm [&_svg]:!size-6'
      >
        <HeartIcon />
      </Button>
      <span className='text-text-default'>
        {likeCount > 99 ? '99+' : likeCount}
      </span>
    </div>
  );
}
