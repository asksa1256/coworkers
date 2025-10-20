import KakaotalkIcon from '@/assets/images/KakaotalkIcon.png';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import PasswordField from '@/components/ui/Input/PasswordField';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function SignInForm() {
  return (
    <form className='w-full max-w-[550px] rounded-[20px] bg-white px-[22px] py-[56px] shadow md:px-[44px] md:py-[70px]'>
      <h3 className='mb-8 text-center text-xl font-bold md:mb-16 md:text-2xl'>
        로그인
      </h3>

      <div className='mb-10 space-y-6'>
        <div className='flex flex-col gap-3'>
          <Label htmlFor='email'>이메일</Label>
          <InputField id='email' placeholder='이메일을 입력해주세요.' />
        </div>

        <div className='flex flex-col gap-3'>
          <Label htmlFor='pw'>비밀번호</Label>
          <PasswordField
            id='pw'
            placeholder='비밀번호를 입력해주세요.'
            autoComplete='new-password'
          />
          <div className='text-right'>
            <Button
              type='button'
              variant='link'
              className='text-md w-auto p-0 font-normal underline underline-offset-4 hover:font-medium md:text-base'
            >
              비밀번호를 잊으셨나요?
            </Button>
          </div>
        </div>
      </div>

      <Button type='submit' className='mb-6 text-base'>
        로그인
      </Button>

      <div className='text-md mb-12 text-center md:mb-[60px] md:text-base'>
        <span className='text-text-primary mr-2'>아직 계정이 없으신가요?</span>
        <Link
          to='/auth/signup'
          className='text-primary underline underline-offset-4 hover:font-medium'
        >
          가입하기
        </Link>
      </div>

      <div className='mb-4 flex items-center justify-between gap-6'>
        <span className='bg-border-primary inline-block h-[1px] w-full'></span>
        <span className='text-text-default text-md md:text-base'>OR</span>
        <span className='bg-border-primary inline-block h-[1px] w-full'></span>
      </div>

      <div className='flex items-center justify-between'>
        <span className='text-md text-text-default md:text-base'>
          간편 로그인하기
        </span>
        <Button
          type='button'
          size='icon-lg'
          variant='ghost'
          className='h-[42px] w-[42px]'
        >
          <img src={KakaotalkIcon} alt='카카오톡 로그인' />
        </Button>
      </div>
    </form>
  );
}
