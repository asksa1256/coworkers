import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header
      className={cn(
        'bg-bg-primary md:border-border-primary sticky top-0 h-[52px] shrink-0 transition-[width] md:h-screen md:w-[72px] md:border-r lg:w-[270px]',
        // toggle && 'md:w-[180px] lg:w-[270px]',
      )}
    >
      헤더
    </header>
  );
}
