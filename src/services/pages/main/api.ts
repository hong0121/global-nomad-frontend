// src/services/pages/main/api.ts

import { apiClient } from '@/src/services/primitives/apiClient';
import { ActivitiesResponse } from '@/src/types/activityType';

export type ActivitiesSort =
  | 'most_reviewed'
  | 'price_asc'
  | 'price_desc'
  | 'latest';

export interface ActivitiesParams {
  category?: string;
  keyword?: string;
  sort?: ActivitiesSort;
  page?: number;
  size?: number;
}

interface ActivitiesFilterParams extends Partial<ActivitiesParams> {
  method: string;
}

export const getActivities = async (params: ActivitiesParams) => {
  const filteredParams: ActivitiesFilterParams = {
    method: 'offset',
  };

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      filteredParams[key as keyof ActivitiesParams] = value;
    }
  });

  // undefined가 모두 제거된 안전한 파라미터로 요청을 보냅니다.
  const { data } = await apiClient.get<ActivitiesResponse>('/activities', {
    params: filteredParams,
  });

  return data;
};
