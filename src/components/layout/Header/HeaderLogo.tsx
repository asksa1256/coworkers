import LogoIcon from '@/assets/images/LogoIcon.svg?react';
import LogoText from '@/assets/images/LogoText.svg?react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Props {
  iconOnly?: boolean;
}

export default function HeaderLogo({ iconOnly }: Props) {
  return (
    <Link to='/' className='text-primary flex h-full gap-0.5'>
      <LogoIcon
        className={cn(`w-4 md:w-6`, iconOnly && 'w-6')}
        aria-label='COWORKERS 로고 아이콘'
      />
      {!iconOnly && (
        <LogoText
          className='w-[84px] md:w-[132px]'
          aria-label='COWORKERS 로고 텍스트'
        />
      )}
    </Link>
  );
}
