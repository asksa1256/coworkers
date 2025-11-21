import { Calendar } from '@/components/ui/calendar';
import InputField from '@/components/ui/Input/InputField';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/dateUtils';
import { useState } from 'react';

interface Props {
  value: Date | undefined;
  onChange: (date: Date) => void;
  id: string;
}

export default function TaskFormCalendar({
  value = new Date(),
  onChange,
  id,
}: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleUpdateDate = (date: Date | undefined) => {
    const nextDate = date ?? new Date();
    onChange(nextDate);
    setIsCalendarOpen(false);
  };

  return (
    <>
      <InputField
        type='text'
        id={id}
        placeholder='2024년 7월 29일'
        onClick={() => setIsCalendarOpen(prev => !prev)}
        value={formatDate(value)}
        readOnly
        className={cn({ isCalendarOpen: '[&_input]:border-primary-hover' })}
      />
      {isCalendarOpen && (
        <div className='border-primary-hover mt-2 w-full rounded-xl border'>
          <Calendar
            mode='single'
            selected={value}
            defaultMonth={value}
            onSelect={handleUpdateDate}
            className='w-full min-w-auto'
          />
        </div>
      )}
    </>
  );
}
