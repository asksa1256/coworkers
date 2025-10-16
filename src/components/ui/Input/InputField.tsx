import { type FieldError } from '@/types/types';
import Input from '.';

interface InputFieldProps extends React.ComponentProps<'input'> {
  error?: FieldError | null;
}

export default function InputField({
  className,
  type,
  error,
  ...props
}: InputFieldProps) {
  return (
    <div className={className}>
      <Input type={type} error={error} {...props} />
      {error && (
        <p className="text-md text-destructive mt-2">{error.message}</p>
      )}
    </div>
  );
}
