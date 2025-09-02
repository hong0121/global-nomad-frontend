import { queries } from '@/src/services/primitives/queries';
import { useQuery } from '@tanstack/react-query';
import { UserResponseType } from '../types/userType';
import getUserInfo from '@/src/services/primitives/getUserInfo';

export default function useCurrentUser(): UserResponseType | undefined {
  // 항상 최신 상태를 구독하기 위해 useQuery 사용
  const { data: user } = useQuery({
    queryKey: queries.user(),
    queryFn: () => getUserInfo(),
    enabled: false, // queryFn이 실행되지 않음.
  });

  return user;
}
