import getUserInfo from '@/src/services/primitives/getUserInfo';
import { queryOptions } from '@tanstack/react-query';

export const queries = {
  user: () => ['user'],
  userOptions: (accessToken: string | null) =>
    queryOptions({
      queryKey: [...queries.user()],
      queryFn: () => getUserInfo(),
      enabled: !!accessToken,
    }),
};
