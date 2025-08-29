import { cn } from '@/src/utils/cn';
import { dateToCalendarDate } from '@/src/utils/dateParser';
import { format } from 'date-fns';

export default function CalendarDay({
  date,
  currentDate,
  selected,
  isAvailable,
  dateCallback,
}: {
  date: Date;
  currentDate: Date;
  selected: Date;
  isAvailable: boolean;
  dateCallback: (selected: Date) => void;
}) {
  const currentMonth = format(currentDate, 'MM');
  const calendarDate = dateToCalendarDate(date);

  const availableDateClasses =
    isAvailable &&
    'text-primary-500 font-bold bg-primary-100 hover:bg-primary-100';
  const yoilClasses =
    calendarDate.month === currentMonth &&
    (calendarDate.yoil === 0 || calendarDate.yoil === 6) &&
    'text-red-500';
  const selectedClasses =
    format(selected, 'yyyy-MM-dd') === calendarDate.date &&
    'bg-primary-500 text-white font-bold hover:bg-primary-500';
  const prevNextMonthClasses =
    calendarDate.month !== currentMonth ? 'text-gray-200' : 'text-black';

  return (
    <button
      className={`w-[46px] h-[46px] rounded-full text-center hover:bg-gray-100 ${yoilClasses} ${prevNextMonthClasses} ${selectedClasses} ${availableDateClasses}`}
      onClick={() => dateCallback(date)}
    >
      {calendarDate.day}
    </button>
  );
}
