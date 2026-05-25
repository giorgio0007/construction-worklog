import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getWorkLogs,
  createWorkLog,
  updateWorkLog,
  deleteWorkLog,
} from '@shared/api/work-logs';

import type {
  CreateWorkLogDto,
  UpdateWorkLogDto,
  GetWorkLogsQuery,
} from '@shared/api/work-logs';

export const useWorkLogs = (params?: GetWorkLogsQuery) => {
  return useQuery({
    queryKey: ['work-logs', params],
    queryFn: () => getWorkLogs(params),
  });
};

export const useCreateWorkLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateWorkLogDto) => createWorkLog(dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['work-logs'],
      });
      toast.success('Запись добавлена');
    },

    onError: () => {
      toast.error('Не удалось создать запись');
    },
  });
};

export const useUpdateWorkLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateWorkLogDto }) =>
      updateWorkLog(id, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['work-logs'],
      });
      toast.success('Запись обновлена');
    },

    onError: () => {
      toast.error('Не удалось обновить запись');
    },
  });
};

export const useDeleteWorkLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteWorkLog(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['work-logs'],
      });
      toast.success('Запись удалена');
    },

    onError: () => {
      toast.error('Не удалось удалить запись');
    },
  });
};
