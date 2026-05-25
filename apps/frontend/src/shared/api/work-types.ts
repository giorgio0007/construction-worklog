import { api } from './api';
import type { WorkType } from '@entities/work-type/model/types';

export const getWorkTypes = async (): Promise<WorkType[]> => {
  const { data } = await api.get('/work-types');
  return data;
};
