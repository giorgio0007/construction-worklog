import { api } from './api';
import type { WorkLog } from '@entities/work-log/model/types';

export type CreateWorkLogDto = {
  date: string;
  workTypeId: string;
  volume: number;
  unit: string;
  workerName: string;
  comment?: string;
};

export type UpdateWorkLogDto = Partial<CreateWorkLogDto>;

export type GetWorkLogsQuery = {
  from?: string;
  to?: string;
  sort?: 'asc' | 'desc';
};

export const getWorkLogs = async (
  params?: GetWorkLogsQuery
): Promise<WorkLog[]> => {
  const { data } = await api.get('/work-logs', {
    params,
  });
  return data;
};

export const createWorkLog = async (
  dto: CreateWorkLogDto
): Promise<WorkLog> => {
  const { data } = await api.post('/work-logs', dto);
  return data;
};

export const updateWorkLog = async (
  id: string,
  dto: UpdateWorkLogDto
): Promise<WorkLog> => {
  const { data } = await api.patch(`/work-logs/${id}`, dto);
  return data;
};

export const deleteWorkLog = async (
  id: string
): Promise<{ message: string }> => {
  const { data } = await api.delete(`/work-logs/${id}`);
  return data;
};
