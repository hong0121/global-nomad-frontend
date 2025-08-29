import { format } from 'date-fns';
import {
  IAvailableReservationSchedule,
  IReservedSchedule,
  ISchedule,
  IScheduleCount,
} from '../types/scheduleType';

export function mergeScheduleWithDays(
  schedule: IReservedSchedule[],
  days: Date[]
) {
  const scheduleMap = new Map<string, IScheduleCount>();

  schedule.forEach((item) => {
    scheduleMap.set(item.date, item.reservations);
  });

  return days.map((day) => {
    return {
      schedule: scheduleMap.get(format(day, 'yyyy-MM-dd')) ?? null,
      date: day,
    };
  });
}

export function availableDateWithDaysArray(
  availableDate: ISchedule[],
  dateArray: Date[]
) {
  return dateArray.map((day): IAvailableReservationSchedule => {
    const availableTime = availableDate.filter(
      (date) => format(day, 'yyyy-MM-dd') === date.date
    );
    return {
      date: day,
      times: availableTime.length !== 0 ? availableTime : null,
    };
  });
}
