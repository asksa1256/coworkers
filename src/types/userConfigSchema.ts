import z from 'zod';

const trimmedString = z.string().trim();

export const userConfigSchema = z.object({
  nickname: trimmedString
    .min(1, '이름은 필수 입력입니다.')
    .max(20, '이름은 최대 20자까지 가능합니다.'),
  image: trimmedString.nullable(),
});

export type UserConfigSchema = z.infer<typeof userConfigSchema>;
