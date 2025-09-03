import { create } from 'zustand';

interface ActivityStore {
  bannerImages: File[];
  subImages: File[];
  setStoreImages: (key: 'bannerImages' | 'subImages', files: File[]) => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  bannerImages: [],
  subImages: [],
  setStoreImages: (key, files) => set({ [key]: files }),
}));
