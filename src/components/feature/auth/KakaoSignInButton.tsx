import KakaotalkIcon from '@/assets/images/KakaotalkIcon.png';
import Button from '@/components/ui/Button';

export default function KakaoSignInButton() {
  const handleKakaoSignIn = () => {
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;

    window.location.href = url;
  };

  return (
    <Button
      type='button'
      size='icon-lg'
      variant='ghost'
      className='h-[42px] w-[42px]'
      onClick={handleKakaoSignIn}
    >
      <img src={KakaotalkIcon} alt='카카오톡 로그인' />
    </Button>
  );
}
