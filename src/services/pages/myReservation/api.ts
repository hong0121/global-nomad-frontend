import { apiClient } from '@/src/services/primitives/apiClient';
import {
  CancelMyReservationResponse,
  MyReservationListResponse,
  ReservationStatus,
} from '@/src/types/myReservationType';

const LIST_SIZE = 10;

interface Props {
  pageParam: number;
  status: ReservationStatus | null;
}

export async function getMyReservationList({
  pageParam,
  status,
}: Props): Promise<MyReservationListResponse> {
  const params = new URLSearchParams();

  params.append('size', String(LIST_SIZE));
  if (pageParam !== 0) params.append('cursorId', String(pageParam)); // cursorId
  if (status) params.append('status', String(status)); // status

  const q = params.toString();

  const res = await apiClient.get(`/my-reservations?${q}`);
  return res.data;
}

export async function cancelMyReservation(
  reservationId: number
): Promise<CancelMyReservationResponse> {
  const res = await apiClient.patch(`/my-reservations/${reservationId}`, {
    status: 'canceled',
  });

  return res.data;
}
