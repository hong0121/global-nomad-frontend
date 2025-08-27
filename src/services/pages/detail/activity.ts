import { apiClient } from '../../primitives/apiClient';

export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: SubImage[];
  schedules: Schedule[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 특정 activityId의 체험 상세 정보를 가져옵니다.
 * @param activityId 체험 ID
 * @returns Activity 객체
 */
export async function getActivityById(activityId: number): Promise<Activity> {
  const { data } = await apiClient.get<Activity>(`/activities/${activityId}`);
  return data;
}
