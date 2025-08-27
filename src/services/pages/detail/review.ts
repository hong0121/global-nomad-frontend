import { ReviewResponse } from '@/src/types/reviewType';
import { apiClient } from '../../primitives/apiClient';

export const getReviewsByActivityId = async (
  activityId: number,
  page: number = 1,
  size: number = 3
): Promise<ReviewResponse> => {
  const { data } = await apiClient.get<ReviewResponse>(
    `/activities/${activityId}/reviews`,
    {
      params: { page, size },
    }
  );
  return data;
};
