import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TokenState {
  accessToken: null | string | undefined;
  setAccessToken: (token: string | null) => void;
  deleteAccessToken: () => void;
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => {
      return {
        accessToken: undefined,
        setAccessToken: (token) => set({ accessToken: token }),
        deleteAccessToken: () => set({ accessToken: null }),
      };
    },
    {
      name: 'accessToken',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken === undefined) {
          state?.setAccessToken(null);
        }
      },
    }
  )
);
