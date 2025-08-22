import { getDaysArray } from '@/src/app/(global)/detail/[id]/_utils/getDaysArray';
import { useState } from 'react';

export function useCalendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [dateToDisplay, setDateToDisplay] = useState<Date>(today);

  const daysArray = getDaysArray(dateToDisplay);

  return {
    daysArray,
    dateSelector: { selectedDate, setSelectedDate },
    displayController: { dateToDisplay, setDateToDisplay },
  };
}
