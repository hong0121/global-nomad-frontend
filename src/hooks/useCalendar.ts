import { getDaysArray } from '@/src/utils/getDaysArray';
import { useReservationStore } from '../store/ReservationStore';

export function useCalendar() {
  const { displayController } = useReservationStore();

  const daysArray = getDaysArray(displayController.dateToDisplay);

  return {
    daysArray,
  };
}
