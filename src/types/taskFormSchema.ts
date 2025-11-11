import z from 'zod';

const baseFields = {
  name: z.string().min(1, '제목은 필수입니다.'),
  description: z.string().optional(),
  startDate: z.date().optional(),
};

export const taskFormSchema = z.discriminatedUnion('frequencyType', [
  z.object({
    ...baseFields,
    frequencyType: z.literal('ONCE'),
  }),
  z.object({
    ...baseFields,
    frequencyType: z.literal('DAILY'),
  }),
  z.object({
    ...baseFields,
    frequencyType: z.literal('WEEKLY'),
    weekDays: z
      .array(z.number().min(0).max(6))
      .min(1, '요일을 하나 이상 선택해야 합니다.'),
  }),
  z.object({
    ...baseFields,
    frequencyType: z.literal('MONTHLY'),
    monthDay: z.number().min(1).max(31),
  }),
]);

export type TaskFormSchema = z.infer<typeof taskFormSchema>;
export type WeeklyTaskFormSchema = Extract<
  TaskFormSchema,
  { frequencyType: 'WEEKLY' }
>;
export type MonthlyTaskFormSchema = Extract<
  TaskFormSchema,
  { frequencyType: 'MONTHLY' }
>;
