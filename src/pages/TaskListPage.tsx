import GroupTitleBar from '@/components/ui/GroupTitleBar';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

export default function TaskListPage() {
  const [date, setDate] = useState<Date>(new Date());

  console.log(date);

  return (
    <div>
      <GroupTitleBar variant='list'>경영관리팀</GroupTitleBar>

      {date?.toLocaleString()}

      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-md border shadow-sm'
        captionLayout='dropdown'
      />
    </div>
  );
}
