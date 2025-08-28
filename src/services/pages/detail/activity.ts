import { Activity } from '@/src/types/activityType';
import { apiClient } from '../../primitives/apiClient';

/**
 * @param activityId 체험 ID
 * @returns Activity 객체
 */

// 특정 activityId의 체험 상세 조회
export async function getActivityById(activityId: number): Promise<Activity> {
  const { data } = await apiClient.get<Activity>(`/activities/${activityId}`);
  return data;
}

// 특정 activityId의 체험 삭제
export async function deleteActivityById(activityId: number) {
  const res = await apiClient.delete(`/my-activities/${activityId}`);
  return res;
}
