import ResetPasswordForm from '@/components/feature/auth/ResetPasswordForm';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  return (
    <section className='flex min-h-screen items-center justify-center'>
      <ResetPasswordForm navigate={navigate} />
    </section>
  );
}
