import { createContext } from 'react';

interface IPageContext {
  page: number;
  setPage: (page: number) => void;
}

export const PageContext = createContext<IPageContext>({
  page: 1,
  setPage: () => {},
});
