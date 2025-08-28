import { useQuery } from '@tanstack/react-query';
import { UserResponseType } from '../types/userType';
import { fetchCurrentUser } from '../services/primitives/currentUser';

export function useCurrentUser() {
  return useQuery<UserResponseType | null>({
    queryKey: ['UserResponseType'],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5, // 5분
    retry: false,
  });
}
