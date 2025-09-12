import { create } from 'zustand';

interface ActivityStore {
  bannerImages: File[];
  subImages: File[];
  setBannerImages: (files: File[]) => void;
  setSubImages: (files: File[]) => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  bannerImages: [],
  subImages: [],
  setBannerImages: (files) => set({ bannerImages: files }),
  setSubImages: (files) => set({ subImages: files }),
}));
