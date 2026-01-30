import { Calendar } from '@/components/ui/calendar';
import InputField from '@/components/ui/Input/InputField';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/dateUtils';
import { useState } from 'react';
import { toast } from 'sonner';

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
    const todayDate = new Date();
    const nextDate = date ?? todayDate;

    const diffDate = todayDate.getTime() - nextDate.getTime();
    if (diffDate >= 0) {
      toast.error('오늘보다 이전 날짜로 설정할 수 없습니다.');
      return;
    }

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
        <div className='mt-2 w-full'>
          <Calendar
            mode='single'
            selected={value}
            defaultMonth={value}
            onSelect={handleUpdateDate}
            className='border-primary-hover h-fit w-full min-w-auto rounded-xl border shadow-md'
          />
        </div>
      )}
    </>
  );
}
