import { Notifications } from '@/src/types/notificationType';
import { apiClient } from '../../primitives/apiClient';

interface Params {
  cursorId?: number;
  size?: number;
}

export async function getNotifications(params?: Params) {
  const { data } = await apiClient.get<Notifications>('/my-notifications', {
    params,
  });
  return data;
}
