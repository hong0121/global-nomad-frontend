import { apiClient } from '@/src/services/primitives/apiClient';

export default async function getUserInfo() {
  const res = await apiClient.get('/users/me');
  return res.data;
}
