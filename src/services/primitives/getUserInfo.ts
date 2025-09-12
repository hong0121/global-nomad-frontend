import { apiClient } from '@/src/services/primitives/apiClient';
import { UserResponseType } from '@/src/types/userType';

export default async function getUserInfo(): Promise<UserResponseType> {
  const res = await apiClient.get('/users/me');
  return res.data;
}
