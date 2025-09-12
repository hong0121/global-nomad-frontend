import { useQuery } from '@tanstack/react-query';
import { ActivitiesParams } from '@/src/services/pages/main/api';
import { queries } from '@/src/services/primitives/queries';

export const useActivities = (params: ActivitiesParams) => {
  return useQuery({
    ...queries.allActivitiesOptions(params),
  });
};
