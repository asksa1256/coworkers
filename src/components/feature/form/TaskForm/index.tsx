import TaskCalendar from '@/components/feature/form/TaskForm/TaskCalendar';
import TaskRepeat from '@/components/feature/form/TaskForm/TaskRepeat';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import { Label } from '@/components/ui/Label';
import Modal from '@/components/ui/Modal';
import TextareaField from '@/components/ui/Textarea/TextareaField';

const FREQUENCY_DROPDOWN = [
  { label: '한 번', value: 'ONCE' },
  { label: '매일 반복', value: 'DAILY' },
  { label: '매주 반복', value: 'WEEKLY' },
  { label: '매월 반복', value: 'MONTHLY' },
];

export default function TaskForm() {
  return (
    <>
      <Modal.Body>
        <form>
          <div className='mb-6 text-center font-medium'>
            <h2 className='mb-4'>할 일 만들기</h2>
            <p className='text-md text-text-default'>
              할 일은 실제로 행동 가능한 작업 중심으로 <br />
              작성해주시면 좋습니다.
            </p>
          </div>
          <div>
            <Label className='mb-4 font-medium'>할 일 제목</Label>
            <InputField
              type='text'
              id='name'
              placeholder='할 일 제목을 입력해주세요.'
            />
          </div>

          <div className='mt-6'>
            <Label className='mb-4 font-medium'>시작 날짜 및 시간</Label>
            <TaskCalendar value={new Date()} onChange={() => {}} />
          </div>

          <div className='mt-6'>
            <Label className='mb-4 font-medium'>반복 설정</Label>
            <TaskRepeat
              value={FREQUENCY_DROPDOWN[0].value}
              onChange={(value: string) => console.log(value)}
              menuItems={FREQUENCY_DROPDOWN}
            />
          </div>

          <div className='mt-6'>
            <Label className='mb-4 font-medium'>할 일 메모 </Label>
            <TextareaField
              id='description'
              placeholder='메모를 입력해주세요.'
              className='[&_textarea]:min-w-auto'
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Foot>
        <Button>만들기</Button>
      </Modal.Foot>
    </>
  );
}
