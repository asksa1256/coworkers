import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import CircularProgressbar from '@/components/ui/CircularProgressbar';
import TaskCheckbox from '@/components/ui/TaskCheckbox';

interface Props {
  // Todo - task 타입으로 교체
  tasks: string[];
  taskListName: string;
}

export default function KanbanCard({ tasks, taskListName }: Props) {
  return (
    <div className='card-common px-4 py-5'>
      <div className='mb-4 flex items-center justify-between'>
        <h4 className='text-md font-semibold'>{taskListName}</h4>
        <div className='flex items-center'>
          {/* Todo - 할 일, 완료한 일 갯 수 계산 로직 추가 */}
          <CircularProgressbar
            className='px-2'
            todosCount={tasks.length}
            doneCount={1}
          />
          <KebabIcon className='hover:text-icon-primary text-icon-secondary h-6 w-6' />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        {/* Todo - 데이터 연결 */}
        {tasks.map((task, i) => (
          <TaskCheckbox
            key={task}
            taskId={i}
            isDone={i % 2 === 0 ? true : false}
          >
            {task}
          </TaskCheckbox>
        ))}
      </div>
    </div>
  );
}
