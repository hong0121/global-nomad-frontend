import { getMyReservationList } from '@/src/services/pages/myReservation/api';
import getUserInfo from '@/src/services/primitives/getUserInfo';
import { ReservationStatus } from '@/src/types/myReservationType';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

export const queries = {
  user: () => ['user'],
  userOptions: (accessToken: string | null | undefined) =>
    queryOptions({
      queryKey: [...queries.user()],
      queryFn: () => getUserInfo(),
      enabled: !!accessToken,
    }),
  myReservationList: () => ['myReservationList'],
  myReservationLists: (status: ReservationStatus | null) => [
    'myReservationList',
    status ?? 'all',
  ],
  myReservationListOptions: (status: ReservationStatus | null) =>
    infiniteQueryOptions({
      queryKey: [...queries.myReservationLists(status)],
      queryFn: ({ pageParam }) => getMyReservationList({ pageParam, status }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.cursorId,
    }),
};
