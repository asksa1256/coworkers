import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header
      className={cn(
        'border-border-primary bg-bg-primary md:border-border-primary sticky top-0 h-[52px] shrink-0 border-b transition-[width] md:h-screen md:w-[72px] md:border-r md:border-none lg:w-[270px]',
        // toggle && 'md:w-[180px] lg:w-[270px]',
      )}
    >
      헤더
    </header>
  );
}
