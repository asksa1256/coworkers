import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const WEEK_DAYS = [
  { index: 0, label: '일' },
  { index: 1, label: '월' },
  { index: 2, label: '화' },
  { index: 3, label: '수' },
  { index: 4, label: '목' },
  { index: 5, label: '금' },
  { index: 6, label: '토' },
];

export default function RepeatDays() {
  const isSelectDay = true;

  return (
    <>
      {WEEK_DAYS.map(day => (
        <Button
          key={day.label}
          type='button'
          variant='outline'
          size='lg'
          className={cn(
            'border-border-primary text-text-default h-12 p-0 font-medium',
            {
              'bg-primary text-text-inverse': isSelectDay,
            },
          )}
        >
          {day.label}
        </Button>
      ))}
    </>
  );
}
