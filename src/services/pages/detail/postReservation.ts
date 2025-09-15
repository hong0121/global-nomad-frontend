import { IReservation } from '@/src/types/activityType';
import { apiClient } from '../../primitives/apiClient';
import { CancelMyReservationResponse } from '@/src/types/myReservationType';

export async function createReservation(
  activityId: number,
  body: IReservation
) {
  try {
    const res = await apiClient.post<CancelMyReservationResponse>(
      `/activities/${activityId}/reservations`,
      body
    );
    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error('예약에 실패했습니다!', err.message);
    throw err;
  }
}
