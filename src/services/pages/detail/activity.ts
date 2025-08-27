import { Activity } from '@/src/types/activityType';
import { apiClient } from '../../primitives/apiClient';

/**
 * 특정 activityId의 체험 상세 조회
 * @param activityId 체험 ID
 * @returns Activity 객체
 */
export async function getActivityById(activityId: number): Promise<Activity> {
  const { data } = await apiClient.get<Activity>(`/activities/${activityId}`);
  return data;
}
