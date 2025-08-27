import { apiClient } from '../../primitives/apiClient';

export interface ReviewUser {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface Review {
  id: number;
  user: ReviewUser;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

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
