import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일은 필수 입력입니다.')
      .and(z.email('이메일 형식으로 작성해주세요.')),
    password: z
      .string()
      .min(1, '비밀번호는 필수 입력입니다.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/,
        '비밀번호는 영문, 숫자, 특수문자(!@#$%^&*)를 모두 포함해야 합니다.',
      ),
    passwordConfirmation: z
      .string()
      .min(1, '비밀번호 확인을 입력해주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    nickname: z
      .string()
      .min(1, '이름은 필수 입력입니다.')
      .max(20, '이름은 최대 20자까지 가능합니다.'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    error: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
