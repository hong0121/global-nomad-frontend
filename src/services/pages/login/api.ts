import { apiClient } from '@/src/services/primitives/apiClient';

export interface loginRequestBody {
  email: string;
  password: string;
}

// 일반 로그인
export async function loginUser(loginBody: loginRequestBody) {
  const res = await apiClient.post('/auth/login', loginBody);
  return res.data;
}
