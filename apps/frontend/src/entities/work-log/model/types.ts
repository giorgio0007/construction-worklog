import type { WorkType } from '../../work-type/model/types';

export type WorkLog = {
  id: string;

  date: string;

  volume: number;

  unit: string;

  workerName: string;

  comment?: string | null;

  workTypeId: string;

  workType: WorkType;

  createdAt: string;
  updatedAt: string;
};
