import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export function getDaysArray(date: Date) {
  const startOfCurrentMonth = startOfMonth(date);
  const endOfCurrentMonth = endOfMonth(date);
  const startOfFirstWeek = startOfWeek(startOfCurrentMonth, {
    weekStartsOn: 0,
  });
  const endOfLastWeek = endOfWeek(endOfCurrentMonth, { weekStartsOn: 0 });

  const days = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek,
  });
  const daysArray = days.map((day) => new Date(day));

  return daysArray;
}
