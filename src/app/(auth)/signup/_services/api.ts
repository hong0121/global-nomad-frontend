import { apiClient } from '@/src/services/apiClient';

interface SignupRequestBody {
  email: string;
  nickname: string;
  password: string;
}

interface SignupResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function createUser(
  signupBody: SignupRequestBody
): Promise<SignupResponse> {
  const res = await apiClient.post('/users', signupBody);
  return res.data;
}
