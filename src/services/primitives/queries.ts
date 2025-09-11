import { getMyReservationList } from '@/src/services/pages/myReservation/api';
import getUserInfo from '@/src/services/primitives/getUserInfo';
import { ReservationStatus } from '@/src/types/myReservationType';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import {
  getMyExperiences,
  getMyReservationStatus,
} from '../pages/myExperiences/api';
import { TScheduleStatus } from '@/src/types/scheduleType';
import {
  getReservedSchedule,
  getTimeSchedule,
} from '../pages/myReservationStatus/myActivities';

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
  myExperiences: () => ['myExperiences'],
  myExperiencesOptions: () =>
    queryOptions({
      queryKey: [...queries.myExperiences()],
      queryFn: () => getMyExperiences(),
    }),
};

export const reservationQueries = {
  monthSchedule: (activityId: number) => ['monthSchedule', activityId],
  monthScheduleOptions: (activityId: number, year: string, month: string) =>
    queryOptions({
      queryKey: [...reservationQueries.monthSchedule(activityId)],
      queryFn: () => getMyReservationStatus(activityId, year, month),
      enabled: !!activityId,
    }),
  daySchedule: (activityId: number) => ['daySchedule', activityId],
  dayScheduleOptions: (activityId: number, date: string) =>
    queryOptions({
      queryKey: [...reservationQueries.daySchedule(activityId)],
      queryFn: () => getReservedSchedule(activityId, date),
    }),
  timeSchedule: (scheduleId: number) => ['timeSchedule', scheduleId],
  timeScheduleOptions: (
    activityId: number,
    scheduleId: number | null,
    status: TScheduleStatus
  ) =>
    queryOptions({
      queryKey: [...reservationQueries.timeSchedule(scheduleId!)],
      queryFn: () => getTimeSchedule(activityId, scheduleId!, status),
      enabled: !!scheduleId,
    }),
};
