import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface ToastType {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'failed';
  duration?: number;
  delay?: number;
}

interface ToastStoreType {
  toasts: ToastType[];
  createToast: (toast: Omit<ToastType, 'id'>) => void;
  deleteToast: (id: string) => void;
}

export const useToastStore = create<ToastStoreType>((set) => ({
  toasts: [],
  createToast: (toast) => {
    const id = uuidv4();
    const newToast = {
      ...toast,
      id,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
  },
  deleteToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
