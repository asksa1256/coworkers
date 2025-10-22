import { type FieldError } from 'react-hook-form';
import Input from '.';

interface InputFieldProps extends React.ComponentProps<'input'> {
  error?: FieldError | null;
  suffix?: React.ReactNode; // 우측 버튼 요소
}

export default function InputField({
  className,
  type,
  suffix,
  error,
  ...props
}: InputFieldProps) {
  return (
    <div className={className}>
      <div className='relative'>
        <Input type={type} error={error} {...props} />

        {suffix && (
          <div className='absolute inset-y-0 right-2 z-[1] flex items-center'>
            {suffix}
          </div>
        )}
      </div>

      {error && <p className='text-md text-danger mt-2'>{error.message}</p>}
    </div>
  );
}
