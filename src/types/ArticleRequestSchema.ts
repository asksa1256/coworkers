import { z } from 'zod';

export const createArticleRequestSchema = z.object({
  title: z.string().trim().min(1, '제목을 입력해주세요.'),
  content: z.string().trim().min(1, '내용을 입력해주세요.'),
  image: z.string().optional(),
});

export type CreateArticleRequest = z.infer<typeof createArticleRequestSchema>;
