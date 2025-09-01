import { queries } from '@/src/services/primitives/queries';
import { useQueryClient } from '@tanstack/react-query';
import { UserResponseType } from '../types/userType';

export default function useCurrentUser(): UserResponseType | undefined {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserResponseType>(queries.user());

  return user;
}
