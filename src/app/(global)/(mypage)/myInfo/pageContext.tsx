import { createContext } from 'react';

interface ITabContext {
  tab: string;
  setTab: (tab: string) => void;
  isTabOpen: boolean;
  setIsTabOpen: (isOpen: boolean) => void;
}

export const TabContext = createContext<ITabContext>({
  tab: '',
  setTab: () => {},
  isTabOpen: false,
  setIsTabOpen: () => {},
});
