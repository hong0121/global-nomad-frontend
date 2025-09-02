import { getDaysArray } from '@/src/utils/getDaysArray';
import { useReservationStore } from '../store/ReservationStore';

export function useCalendar() {
  const dateToDisplay = useReservationStore(
    (state) => state.displayController.dateToDisplay
  );

  const daysArray = getDaysArray(dateToDisplay);

  return {
    daysArray,
  };
}
