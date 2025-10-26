import KakaotalkIcon from '@/assets/images/KakaotalkIcon.png';
import Button from '@/components/ui/Button';

interface Props {
  authType: 'signin' | 'signup';
}

export default function KakaoOAuthButton({ authType }: Props) {
  const state = authType;

  const handleKakaoOauth = () => {
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&state=${state}&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;

    window.location.href = url;
  };

  return (
    <Button
      type='button'
      size='icon-lg'
      variant='ghost'
      className='h-[42px] w-[42px]'
      onClick={handleKakaoOauth}
    >
      <img
        src={KakaotalkIcon}
        alt={`카카오 계정으로 ${authType === 'signin' ? '로그인' : '회원가입'}`}
      />
    </Button>
  );
}
