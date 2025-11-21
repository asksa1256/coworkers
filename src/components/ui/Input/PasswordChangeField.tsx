import Button from '@/components/ui/Button';
import InputField from './InputField';

interface PasswordChangeFieldProps extends React.ComponentProps<'input'> {
  className?: string;
  onClick: () => void;
}

export default function PasswordChangeField({
  className,
  onClick,
  ...props
}: PasswordChangeFieldProps) {
  const changePasswordButton = (
    <Button
      type='button'
      size='sm'
      round='sm'
      aria-label='비밀번호 변경하기'
      onClick={onClick}
    >
      변경하기
    </Button>
  );

  return (
    <div className={className}>
      <InputField
        type='password'
        suffix={changePasswordButton}
        className='[&>input]:pr-12'
        disabled
        {...props}
      />
    </div>
  );
}
