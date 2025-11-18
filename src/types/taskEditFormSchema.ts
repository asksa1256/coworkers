import z from 'zod';

export const taskEditFormSchema = z.object({
  name: z.string().min(1, '제목은 필수입니다.'),
  description: z.string().optional(),
});

export type TaskEditFormSchema = z.infer<typeof taskEditFormSchema>;
