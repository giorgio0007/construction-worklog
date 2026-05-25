import { useQuery } from '@tanstack/react-query';
import { getWorkTypes } from '@shared/api/work-types';

export const useWorkTypes = () => {
  return useQuery({
    queryKey: ['work-types'],
    queryFn: getWorkTypes,
  });
};
