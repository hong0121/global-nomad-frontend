import { IReserveSchedule } from '@/src/types/reservationType';
import { apiClient } from '../../primitives/apiClient';
import { TScheduleStatus } from '@/src/types/scheduleType';
import { MyReservationListResponse } from '@/src/types/myReservationType';

export async function getReservedSchedule(activityId: number, date: string) {
  try {
    const res = await apiClient.get<IReserveSchedule[]>(
      `/my-activities/${activityId}/reserved-schedule`,
      { params: { date } }
    );

    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error(
        '체험 날짜별 예약 정보를 불러오는데 실패했습니다!',
        err.message
      );
    throw err;
  }
}

export async function getTimeSchedule(
  activityId: number,
  scheduleId: number,
  status: TScheduleStatus
) {
  try {
    const res = await apiClient.get<MyReservationListResponse>(
      `/my-activities/${activityId}/reservations`,
      {
        params: { scheduleId, status },
      }
    );

    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error(
        '체험 시간별 예약 정보를 불러오는데 실패했습니다!',
        err.message
      );
    throw err;
  }
}

export async function patchReservationStatus(
  activitiyId: number,
  reservationId: number,
  status: TScheduleStatus
) {
  try {
    const res = await apiClient.patch(
      `/my-activities/${activitiyId}/reservations/${reservationId}`,
      {
        status: status,
      }
    );

    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error('예약 상태를 변경하는데 실패했습니다!', err.message);
    throw err;
  }
}
