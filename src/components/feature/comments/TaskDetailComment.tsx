interface Props {
  taskId: number;
  commentCount: number;
}

export default function TaskDetailComment({ taskId, commentCount }: Props) {
  return (
    <div className='px-4 md:px-7 lg:px-10'>
      코멘트 영역 <br />
      {`taskId: ${taskId}`} <br />
      {`commentCount: ${commentCount}`}
    </div>
  );
}
