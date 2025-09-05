import { create } from 'zustand';

interface TimeSlot {
  startTime?: string;
  endTime?: string;
}

interface TimeSlotState {
  timeSlots: TimeSlot[]; // 여러 슬롯 관리
  setTimeSlots: (slots: TimeSlot[]) => void; // 배열 전체 업데이트
  addSlot: () => void; // 새 슬롯 추가
  updateSlot: (index: number, slot: TimeSlot) => void; // 특정 슬롯 업데이트
  removeSlot: (index: number) => void; // 특정 슬롯 제거
  reset: () => void; // 초기화
}

export const useTimeSlotStore = create<TimeSlotState>((set) => ({
  timeSlots: [{ startTime: undefined, endTime: undefined }], // 초기엔 한 줄만
  setTimeSlots: (slots) => set({ timeSlots: slots }),
  addSlot: () =>
    set((state) => ({
      timeSlots: [
        ...state.timeSlots,
        { startTime: undefined, endTime: undefined },
      ],
    })),
  updateSlot: (index, slot) =>
    set((state) => {
      const updated = [...state.timeSlots];
      updated[index] = { ...updated[index], ...slot };
      return { timeSlots: updated };
    }),
  removeSlot: (index) =>
    set((state) => ({
      timeSlots: state.timeSlots.filter((_, i) => i !== index),
    })),
  reset: () =>
    set({ timeSlots: [{ startTime: undefined, endTime: undefined }] }),
}));
