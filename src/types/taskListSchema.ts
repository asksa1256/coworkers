import z from 'zod';

export const taskListSchema = z.object({
  name: z.string().trim().min(1, { message: '목록명은 필수입니다.' }),
});

export type TaskListSchema = z.infer<typeof taskListSchema>;
