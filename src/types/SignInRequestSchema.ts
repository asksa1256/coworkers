import { z } from 'zod';

export const SignInRequestSchema = z.object({
  email: z
    .string()
    .min(1, '이메일은 필수 입력입니다.')
    .and(z.email('이메일 형식으로 작성해주세요.')),
  password: z
    .string()
    .min(1, '비밀번호는 필수 입력입니다.')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

export type SignInRequest = z.infer<typeof SignInRequestSchema>;
