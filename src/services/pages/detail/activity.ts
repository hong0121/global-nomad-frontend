import { Activity } from '@/src/types/activityType';
import { apiClient } from '../../primitives/apiClient';

/**
 * @param activityId 체험 ID
 * @returns Activity 객체
 */

// 특정 activityId의 체험 상세 조회
export async function getActivityById(activityId: number): Promise<Activity> {
  try {
    const res = await apiClient.get(`/activities/${activityId}`);
    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error('체험 상세정보를 불러오는데 실패했습니다!');
    throw err;
  }
}
