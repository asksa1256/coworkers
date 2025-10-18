import TitleBarPattern from '@/assets/images/TitleBarPattern.png';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: 'team' | 'list';
}

const BASE_STYLE =
  'relative w-full font-bold md:text-2xl md:leading-2xl lg:max-w-280';

export default function GroupTitleBar({
  children,
  className,
  variant = 'team',
}: Props) {
  const groupTitleBarVariant = cva(BASE_STYLE, {
    variants: {
      variant: {
        team: 'card-common text-xl leading-xl px-6 py-[19px] md:px-[26px] md:py-[17px]',
        list: 'text-lg leading-lg lg:bg-bg-primary lg:border-border-primary lg:rounded-xl lg:border lg:px-[26px] lg:py-[17px]',
      },
    },
  });

  return (
    <div className={cn(groupTitleBarVariant({ variant }), className)}>
      <img
        src={TitleBarPattern}
        alt=''
        className='hidden h-full lg:absolute lg:top-0 lg:right-56 lg:block lg:translate-x-[50%]'
      />
      {children}
    </div>
  );
}
