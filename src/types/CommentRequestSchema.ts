import { z } from 'zod';

export const createCommentRequestSchema = z.object({
  content: z.string().trim().min(1, '댓글 내용을 입력해주세요.'),
});

export type CreateCommentRequest = z.infer<typeof createCommentRequestSchema>;
