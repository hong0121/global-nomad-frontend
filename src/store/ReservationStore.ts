import { create } from 'zustand';

interface IReservationStore {
  dateSelector: {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
  };
  displayController: {
    dateToDisplay: Date;
    setDateToDisplay: (date: Date | ((prevDate: Date) => Date)) => void;
  };
  personSelector: {
    person: number;
    incrementPerson: () => void;
    decrementPerson: () => void;
  };
  timeSelector: {
    timeId: number | null;
    setTimeId: (id: number) => void;
  };
}

export const useReservationStore = create<IReservationStore>()((set) => ({
  dateSelector: {
    selectedDate: new Date(),
    setSelectedDate: (by) =>
      set((state) => ({
        dateSelector: { ...state.dateSelector, selectedDate: by },
      })),
  },
  displayController: {
    dateToDisplay: new Date(),
    setDateToDisplay: (dateOrUpdater) =>
      set((state) => ({
        displayController: {
          ...state.displayController,
          dateToDisplay:
            typeof dateOrUpdater === 'function'
              ? dateOrUpdater(state.displayController.dateToDisplay)
              : dateOrUpdater,
        },
      })),
  },
  personSelector: {
    person: 1,
    incrementPerson: () =>
      set((state) => ({
        personSelector: {
          ...state.personSelector,
          person: state.personSelector.person + 1,
        },
      })),
    decrementPerson: () =>
      set((state) => ({
        personSelector: {
          ...state.personSelector,
          person: state.personSelector.person - 1,
        },
      })),
  },
  timeSelector: {
    timeId: null,
    setTimeId: (by) =>
      set((state) => ({
        timeSelector: {
          ...state.timeSelector,
          timeId: by,
        },
      })),
  },
}));
