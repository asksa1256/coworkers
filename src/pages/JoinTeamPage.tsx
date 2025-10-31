import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import { Label } from '@/components/ui/Label';

export default function JoinTeamPage() {
  return (
    <div className='my-5 flex grow-1 flex-col justify-center md:my-10'>
      <form className='bg-bg-primary mx-auto w-full max-w-[550px] rounded-[20px] px-5 pt-[46px] pb-[60px] md:px-[45px] md:pt-[60px] md:pb-[62px]'>
        <h2 className='text-xl font-bold md:text-2xl'>팀 참여하기</h2>

        <div className='mt-[22px] md:mt-12'>
          <Label
            htmlFor='name'
            className='text-md mb-2 block font-medium md:text-base'
          >
            팀 링크
          </Label>
          <InputField
            id='name'
            type='text'
            placeholder='팀 링크를 입력해주세요.'
          />
        </div>

        <Button type='submit' className='mt-10 text-base'>
          참여하기
        </Button>
        <p className='text-text-default mt-5 text-center text-xs md:mt-6 md:text-base'>
          공유받은 팀 링크를 입력해 참여할 수 있어요.
        </p>
      </form>
    </div>
  );
}
