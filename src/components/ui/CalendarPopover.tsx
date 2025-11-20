import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

interface Props {
  date: Date;
  onChangeDate: (value: Date) => void;
}

export default function CalendarPopover({ date, onChangeDate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className='bg-bg-secondary flex size-6 items-center justify-center rounded-full'>
          <CalendarIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto overflow-hidden bg-white p-0'
        align='end'
      >
        <Calendar
          mode='single'
          selected={date}
          defaultMonth={date}
          captionLayout='label'
          onSelect={date => {
            onChangeDate(date ?? new Date());
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
