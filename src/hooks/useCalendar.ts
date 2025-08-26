import { useState } from 'react';
import { getDaysArray } from '@/src/utils/getDaysArray';
import { useCalendarStore } from '../store/CalendarStore';

export function useCalendar() {
  const today = new Date();
  const { selectedDate, setSelectedDate } = useCalendarStore();
  const [dateToDisplay, setDateToDisplay] = useState<Date>(today);

  const daysArray = getDaysArray(dateToDisplay);

  return {
    daysArray,
    dateSelector: { selectedDate, setSelectedDate },
    displayController: { dateToDisplay, setDateToDisplay },
  };
}
