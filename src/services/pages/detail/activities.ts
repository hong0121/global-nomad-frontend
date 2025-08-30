import { IActivity } from '@/src/types/scheduleType';
import { apiClient } from '../../primitives/apiClient';

export async function getActivityDetail(
  activityId: number
): Promise<IActivity> {
  try {
    const res = await apiClient.get(`/activities/${activityId}`);
    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error('체험 상세정보를 불러오는데 실패했습니다!');
    throw err;
  }
}
