import Button from '@/components/ui/Button';
import useSignOut from '@/hooks/useSignOut';
import { userAtom } from '@/store/authAtom';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function LandingPage() {
  const user = useAtomValue(userAtom);
  const signOut = useSignOut();
  const navigate = useNavigate();

  return (
    <main>
      <h2 className='text-4xl font-bold'>Coworkers</h2>
      <h2 className='text-3xl font-semibold'>Coworkers</h2>
      <h2 className='text-2xl font-medium'>Coworkers</h2>
      <h2 className='text-xl'>Coworkers</h2>
      <br />
      <h2 className='text-primary text-4xl'>Coworkers</h2>
      <h2 className='text-secondary text-3xl'>Coworkers</h2>
      <h2 className='text-tertiary text-2xl'>Coworkers</h2>
      <h2 className='text-disabled text-xl'>Coworkers</h2>
      <br />
      <h2 className='text-text-primary text-4xl'>Coworkers</h2>
      <h2 className='text-text-secondary text-3xl'>Coworkers</h2>
      <h2 className='text-text-tertiary text-2xl'>Coworkers</h2>
      <h2 className='text-text-default text-xl'>Coworkers</h2>

      <Button
        className='mt-4'
        onClick={() => toast.success('shadcn/ui 세팅 완료')}
      >
        토스트 오픈
      </Button>

      {/* tailwind prettier order test */}
      <div className='flex rounded-lg bg-blue-500 p-4 text-xl font-bold shadow-lg'></div>

      {/* 로그인 후 user 전역 상태 테스트 */}
      {user ? (
        <>
          <span>환영합니다, {user.nickname}님</span>
          <Button className='w-auto' onClick={signOut}>
            로그아웃
          </Button>
        </>
      ) : (
        <span>
          로그인 전{' '}
          <Button className='w-auto' onClick={() => navigate('/auth/signIn')}>
            로그인
          </Button>
        </span>
      )}
    </main>
  );
}
