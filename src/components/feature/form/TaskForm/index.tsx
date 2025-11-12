import TaskFormCalendar from '@/components/feature/form/TaskForm/TaskFormCalendar';
import TaskFormWeek from '@/components/feature/form/TaskForm/TaskFormWeek';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import InputField from '@/components/ui/Input/InputField';
import { Label } from '@/components/ui/Label';
import Modal from '@/components/ui/Modal';
import TextareaField from '@/components/ui/Textarea/TextareaField';
import {
  taskFormSchema,
  type MonthlyTaskFormSchema,
  type TaskFormSchema,
  type WeeklyTaskFormSchema,
} from '@/types/taskFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

const FREQUENCY_DROPDOWN = [
  { label: '한 번', value: 'ONCE' },
  { label: '매일 반복', value: 'DAILY' },
  { label: '매주 반복', value: 'WEEKLY' },
  { label: '매월 반복', value: 'MONTHLY' },
];

interface Props {
  initialData?: TaskFormSchema;
  onSubmit: (formData: TaskFormSchema) => void;
}

export default function TaskForm({ initialData, onSubmit }: Props) {
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      startDate: initialData?.startDate || new Date(),
      frequencyType: initialData?.frequencyType || 'ONCE',
    },
  });

  const frequencyType = watch('frequencyType');

  const isWeekly = frequencyType === 'WEEKLY';
  const isMonthly = frequencyType === 'MONTHLY';
  const isEditMode = !!initialData;

  const handleSubmitTaskForm = (formData: TaskFormSchema) => onSubmit(formData);

  const handleFrequencyMonthly = (date?: Date) => {
    const startDate = date || getValues('startDate') || new Date();
    setValue('monthDay', startDate.getDate(), {
      shouldDirty: true,
    });
  };

  useEffect(() => {
    if (isWeekly) {
      const initialWeeklyData = initialData as WeeklyTaskFormSchema;
      setValue('weekDays', initialWeeklyData?.weekDays || [], {
        shouldDirty: false,
      });
    }

    if (isMonthly) {
      const initialMonthlyData = initialData as MonthlyTaskFormSchema;
      setValue(
        'monthDay',
        initialMonthlyData?.monthDay || new Date().getDate(),
        {
          shouldDirty: false,
        },
      );
    }
  }, [initialData, isWeekly, isMonthly, frequencyType, setValue]);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitTaskForm)}
        className='flex grow-1 flex-col overflow-hidden'
      >
        <Modal.Body>
          <div className='mb-6 text-center font-medium'>
            <h2>할 일 만들기</h2>
          </div>
          <div>
            <Label className='mb-4 font-medium' htmlFor='name'>
              할 일 제목
            </Label>
            <InputField
              id='name'
              type='text'
              placeholder='할 일 제목을 입력해주세요.'
              {...register('name')}
              error={errors.name}
            />
          </div>

          <div className='mt-6'>
            <Label className='mb-4 font-medium' htmlFor='startDate'>
              시작 날짜
            </Label>
            <Controller
              name='startDate'
              control={control}
              render={({ field: { onChange, value } }) => {
                const handleChange = (date: Date | undefined) => {
                  if (isMonthly) handleFrequencyMonthly(date);
                  onChange(date);
                };
                return (
                  <TaskFormCalendar
                    value={value}
                    id='startDate'
                    onChange={handleChange}
                    disabled={isEditMode}
                  />
                );
              }}
            />
          </div>

          <div className='relative mt-6'>
            <Label className='mb-4 font-medium'>반복 설정</Label>
            <Controller
              name='frequencyType'
              control={control}
              render={({ field: { onChange, value } }) => {
                const handleSelect = (v: string) => {
                  if (v === 'MONTHLY') handleFrequencyMonthly();
                  onChange(v);
                };
                return (
                  <>
                    <Dropdown
                      type='select'
                      menuItems={FREQUENCY_DROPDOWN}
                      value={value}
                      onSelect={handleSelect}
                    />
                    {isEditMode && (
                      <div className='absolute top-0 right-0 bottom-0 left-0' />
                    )}
                  </>
                );
              }}
            />
            {isWeekly && (
              <div className='mt-4'>
                <Label className='mb-4 font-medium'>반복 요일</Label>
                <Controller
                  control={control}
                  name='weekDays'
                  render={({ field: { value = [], onChange } }) => (
                    <TaskFormWeek
                      value={value}
                      onChange={onChange}
                      errors={errors}
                    />
                  )}
                />
              </div>
            )}
            {isMonthly && (
              <p className='text-md text-text-default mt-2'>
                시작 날짜의 일자를 기준으로 반복 됩니다. <br />
                ex) 11월 11일 → 12월 11일
              </p>
            )}
          </div>

          <div className='mt-6'>
            <Label className='mb-4 font-medium' htmlFor='description'>
              할 일 메모{' '}
            </Label>
            <TextareaField
              id='description'
              placeholder='메모를 입력해주세요.'
              className='[&_textarea]:min-w-auto'
              {...register('description')}
            />
          </div>
        </Modal.Body>
        <Modal.Foot>
          <Button disabled={!isValid || isSubmitting || !isDirty}>
            만들기
          </Button>
        </Modal.Foot>
      </form>
    </>
  );
}
