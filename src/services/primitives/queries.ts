import { ActivitiesParams, getActivities } from '@/src/services/pages/main/api';
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
  allActivities: (params: ActivitiesParams) => ['allActivities', params],
  allActivitiesOptions: (params: ActivitiesParams) =>
    queryOptions({
      queryKey: [...queries.allActivities(params)],
      queryFn: () => getActivities(params),
      placeholderData: (prev) => prev,
    }),
  popularActivities: () => ['popularActivities'],
  popularActivitiesOptions: (MAX_SIZE: number) =>
    infiniteQueryOptions({
      queryKey: [...queries.popularActivities()],
      queryFn: ({ pageParam }) =>
        getActivities({
          sort: 'most_reviewed',
          page: pageParam,
          size: MAX_SIZE,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allpage, lastPageParam) =>
        lastPage.totalCount > allpage.length * MAX_SIZE
          ? lastPageParam + 1
          : undefined,
    }),
};
