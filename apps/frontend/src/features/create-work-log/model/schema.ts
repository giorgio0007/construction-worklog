import { z } from 'zod';

export const createWorkLogSchema = z.object({
  date: z.string().min(1, 'Укажите дату'),
  workTypeId: z.string().min(1, 'Выберите вид работ'),
  volume: z.number({ error: 'Укажите объём' }).positive('Объём должен быть больше 0'),
  unit: z.string().min(1, 'Укажите единицу измерения'),
  workerName: z.string().min(1, 'Укажите исполнителя'),
  comment: z.string().optional(),
});

export type CreateWorkLogForm = z.infer<typeof createWorkLogSchema>;
