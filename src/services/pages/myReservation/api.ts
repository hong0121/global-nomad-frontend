import { apiClient } from '@/src/services/primitives/apiClient';
import {
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

  console.log('fetch');

  params.append('size', String(LIST_SIZE));
  if (pageParam !== 0) params.append('cursorId', String(pageParam)); // cursorId
  if (status) params.append('status', String(status)); // status

  const q = params.toString();

  const res = await apiClient.get(`/my-reservations?${q}`);
  return res.data;
}
