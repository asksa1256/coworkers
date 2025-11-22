import MyHistoryList from '@/components/feature/myHistoryPage/MyHistoryList';

export default function MyHistoryPage() {
  return (
    <div className='mx-auto w-full max-w-[1120px] pt-4 pb-10 lg:py-[90px]'>
      <div className='mb-[25px] md:mb-6'>
        <h2 className='mb-1 text-xl font-bold'>마이 히스토리</h2>
        <p className='text-md text-text-default'>
          완료된 할 일에 대한 내역을 확인할 수 있습니다.
        </p>
      </div>
      <MyHistoryList />
    </div>
  );
}
