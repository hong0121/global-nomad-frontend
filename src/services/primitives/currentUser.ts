import { apiClient } from './apiClient';
import { UserResponseType } from '@/src/types/userType';

export async function fetchCurrentUser(): Promise<UserResponseType | null> {
  try {
    const { data } = await apiClient.get<UserResponseType>('/users/me');
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('사용자 정보를 가져오지 못했습니다.');
  }
}
