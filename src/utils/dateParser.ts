import { format, getDay } from 'date-fns';

export function dateToCalendarDate(date: Date) {
  const calendarDate = {
    date: format(date, 'yyyy-MM-dd'),
    year: format(date, 'yyyy'),
    month: format(date, 'MM'),
    day: format(date, 'dd'),
    yoil: getDay(date),
  };

  return calendarDate;
}
