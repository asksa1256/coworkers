import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, '이메일은 필수 입력입니다.')
    .and(z.email('이메일 형식으로 작성해주세요.')),
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
