import { IMyReservations } from '@/src/types/activityType';
import { apiClient } from '../../primitives/apiClient';
import { IReservedSchedule } from '@/src/types/scheduleType';

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

// 내 체험 가져오기
export async function getMyExperiences(): Promise<IMyReservations> {
  try {
    const res = await apiClient.get(`/my-activities/`);
    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error('체험을 가져오는데 실패했습니다:', err.message);
    throw err;
  }
}

// 내 체험 별로 예약 달력 가져오기
export async function getMyReservationStatus(
  activityId: number,
  year: string,
  month: string
): Promise<IReservedSchedule[]> {
  try {
    const res = await apiClient.get(
      `/my-activities/${activityId}/reservation-dashboard`,
      { params: { year, month } }
    );
    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error('예약 목록을 가져오는데 실패했습니다:', err.message);
    throw err;
  }
}
