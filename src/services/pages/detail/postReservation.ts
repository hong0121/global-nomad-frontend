import { IReservation } from '@/src/types/activityType';
import { apiClient } from '../../primitives/apiClient';

export async function createReservation(
  activityId: number,
  body: IReservation
) {
  try {
    const res = await apiClient.post(
      `/activities/${activityId}/reservations`,
      body
    );
    if (res.status !== 201) throw new Error(res.data.message);
    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error('예약에 실패했습니다!', err.message);
  }
}
