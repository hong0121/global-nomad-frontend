import { createContext } from 'react';

interface ITabContext {
  tab: string | null;
  setTab: (tab: string | null) => void;
}

export const TabContext = createContext<ITabContext>({
  tab: null,
  setTab: () => {},
});
