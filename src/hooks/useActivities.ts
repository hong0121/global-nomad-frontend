import { useQuery } from '@tanstack/react-query';
import { getActivities, ActivitiesParams } from '@/src/services/pages/main/api';
import { ActivitiesResponse } from '@/src/types/activityType';

export const useActivities = (params: ActivitiesParams) => {
  return useQuery<ActivitiesResponse>({
    queryKey: ['activities', params],
    queryFn: () => getActivities(params),
    placeholderData: (prev) => prev,
  });
};
