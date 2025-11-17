import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { WeeklyTaskFormSchema } from '@/types/taskFormSchema';
import type { FieldErrors } from 'react-hook-form';

interface Props {
  value: number[];
  onChange: (value: number[]) => void;
  errors: FieldErrors<WeeklyTaskFormSchema>;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function TaskFormWeek({ value, onChange, errors }: Props) {
  const handleChange = (idx: number) => {
    const isSelect = value.includes(idx);
    const newValue = isSelect
      ? value.filter(number => number !== idx)
      : [...value, idx];
    onChange(newValue);
  };

  return (
    <>
      <div className='grid grid-cols-7 gap-1'>
        {DAYS.map((day, idx) => {
          return (
            <Button
              key={day}
              type='button'
              variant='outline'
              size='lg'
              className={cn(
                'border-border-primary text-text-default h-12 p-0 font-medium',
                {
                  'bg-primary text-text-inverse': value.includes(idx),
                },
              )}
              onClick={() => handleChange(idx)}
            >
              {day}
            </Button>
          );
        })}
      </div>
      {errors.weekDays && (
        <p className='text-md text-danger mt-2'>{errors.weekDays?.message}</p>
      )}
    </>
  );
}
