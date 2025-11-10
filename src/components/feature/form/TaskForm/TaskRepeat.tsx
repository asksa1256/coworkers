import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import { Label } from '@/components/ui/Label';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Props {
  value: string;
  onChange: (frequencyType: string) => void;
  menuItems: { label: string; value: string }[];
}

export default function TaskRepeat({ value, onChange, menuItems }: Props) {
  const [frequency, setFrequency] = useState(value);
  const isRepeatDaysOpen = frequency === 'WEEKLY';
  const isSelectDay = true;

  const handleUpdateFrequency = (value: string) => {
    setFrequency(value);
    onChange(value);
  };

  return (
    <>
      <Dropdown
        type='select'
        menuItems={menuItems}
        value={frequency}
        onSelect={handleUpdateFrequency}
      />
      {isRepeatDaysOpen && (
        <div className='mt-4'>
          <Label className='mb-4 font-medium'>반복 요일</Label>
          <div className='grid grid-cols-7 gap-1'>
            <Button
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
              일
            </Button>
            <Button
              type='button'
              variant='outline'
              size='lg'
              className={cn(
                'border-border-primary text-text-default h-12 p-0 font-medium',
              )}
            >
              월
            </Button>
            <Button
              type='button'
              variant='outline'
              size='lg'
              className={cn(
                'border-border-primary text-text-default h-12 p-0 font-medium',
              )}
            >
              화
            </Button>
            <Button
              type='button'
              variant='outline'
              size='lg'
              className={cn(
                'border-border-primary text-text-default h-12 p-0 font-medium',
              )}
            >
              수
            </Button>
            <Button
              type='button'
              variant='outline'
              size='lg'
              className={cn(
                'border-border-primary text-text-default h-12 p-0 font-medium',
              )}
            >
              목
            </Button>
            <Button
              type='button'
              variant='outline'
              size='lg'
              className={cn(
                'border-border-primary text-text-default h-12 p-0 font-medium',
              )}
            >
              금
            </Button>
            <Button
              type='button'
              variant='outline'
              size='lg'
              className={cn(
                'border-border-primary text-text-default h-12 p-0 font-medium',
              )}
            >
              토
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
