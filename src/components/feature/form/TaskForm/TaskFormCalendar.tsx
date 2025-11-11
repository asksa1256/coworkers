import { Calendar } from '@/components/ui/calendar';
import InputField from '@/components/ui/Input/InputField';
import { formatDate } from '@/utils/dateUtils';
import { useState } from 'react';

interface Props {
  value: Date | undefined;
  onChange: (date: Date) => void;
}

export default function TaskFormCalendar({
  value = new Date(),
  onChange,
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
        placeholder='2024년 7월 29일'
        onClick={() => setIsCalendarOpen(prev => !prev)}
        value={formatDate(value)}
        readOnly
      />
      {isCalendarOpen && (
        <div className='border-primary-hover mt-2 w-full rounded-xl border px-11 py-4'>
          <Calendar
            mode='single'
            selected={value}
            onSelect={handleUpdateDate}
            className='mx-w-[250px] mx-auto'
          />
        </div>
      )}
    </>
  );
}
