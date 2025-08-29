import { UpdateActivity } from '@/src/types/myActivityType';
import { apiClient } from '../../primitives/apiClient';

// 내 체험 수정
export async function patchActivityById(
  activityId: number,
  data: UpdateActivity
): Promise<UpdateActivity> {
  try {
    const res = await apiClient.patch(`/my-activities/${activityId}`, data);
    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error('체험 정보를 수정하는데 실패했습니다:', err.message);
    throw err;
  }
}
