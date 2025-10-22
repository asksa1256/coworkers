interface Props {
  text: string;
  count: number;
  icon: React.ReactNode;
}

export default function ReportCountCard({ text, count, icon }: Props) {
  return (
    <div className='border-border-primary h-20 w-full min-w-34 rounded-xl border p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1'>
          <div className='leading-xs text-xs font-medium'>{text}</div>
          <div className='text-primary text-2xl font-bold'>{count}개</div>
        </div>
        {icon}
      </div>
    </div>
  );
}
