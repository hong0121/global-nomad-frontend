import { format, formatDistanceToNow, getDay } from 'date-fns';
import { ko } from 'date-fns/locale';

export function dateToCalendarDate(date: Date) {
  const calendarDate = {
    date: format(date, 'yyyy-MM-dd'),
    year: format(date, 'yyyy'),
    month: format(date, 'MM'),
    day: format(date, 'dd'),
    yoil: getDay(date),
    relative: formatDistanceToNow(date, { addSuffix: true, locale: ko }),
  };

  return calendarDate;
}
