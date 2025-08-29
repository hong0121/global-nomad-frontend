import { apiClient } from '../../primitives/apiClient';

// 내 체험 삭제
export async function deleteActivityById(activityId: number) {
  try {
    const res = await apiClient.delete(`/my-activities/${activityId}`);
    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error('체험을 삭제하는데 실패했습니다:', err.message);
    throw err;
  }
}
