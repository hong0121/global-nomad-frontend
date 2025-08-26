import apiClient from '@/src/services/primitives/apiClient';

export async function getReservedSchedule(activitiyId: number, date: string) {
  try {
    const res = await apiClient.get(
      `/my-activities/${activitiyId}/reserved-schedule`,
      { params: { date } }
    );

    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error(
        '체험 날짜별 예약 정보를 불러오는데 실패했습니다!',
        err.message
      );
  }
}
