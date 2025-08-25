import { create } from 'zustand';

interface ICalendarStore {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const useCalendarStore = create<ICalendarStore>()((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (by) => set({ selectedDate: by }),
}));
