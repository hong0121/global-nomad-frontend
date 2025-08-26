import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface Props {
  state: DehydratedState;
  children: ReactNode;
}

export default function QueryHydration({ state, children }: Props) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
