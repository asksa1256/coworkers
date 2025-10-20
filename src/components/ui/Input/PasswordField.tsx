import VisibilityOffIcon from '@/assets/icons/VisibilityOffIcon.svg';
import VisibilityOnIcon from '@/assets/icons/VisibilityOnIcon.svg';
import { type FieldError } from '@/types';
import { useState } from 'react';
import InputField from './InputField';

interface PasswordFieldProps extends React.ComponentProps<'input'> {
  error?: FieldError | null;
}

export default function PasswordField({
  error,
  className,
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const inputType = showPassword ? 'text' : 'password';

  const toggleButton = (
    <button
      type='button'
      className='pr-2 focus:outline-none'
      aria-label={showPassword ? '비밀번호 숨김' : '비밀번호 표시'}
      onClick={toggleVisibility}
    >
      {showPassword ? (
        <img src={VisibilityOnIcon} alt='' />
      ) : (
        <img src={VisibilityOffIcon} alt='' />
      )}
    </button>
  );

  return (
    <div className={className}>
      <InputField
        type={inputType}
        suffix={toggleButton}
        error={error}
        className='[&>input]:pr-12'
        {...props}
      />
    </div>
  );
}
