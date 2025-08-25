import { apiClient } from '@/src/services/primitive/apiClient';
import { UserResponseType } from '@/src/types/userType';

interface SignupRequestBody {
  email: string;
  nickname: string;
  password: string;
}

interface KakaoSignupRequestBody {
  nickname: string;
  redirectUri: string;
  token: string;
}

interface KakaoSignupResponseType {
  user: UserResponseType;
  refreshToken: string;
  accessToken: string;
}

// 일반 회원가입
export async function createUser(
  signupBody: SignupRequestBody
): Promise<UserResponseType> {
  const res = await apiClient.post('/users', signupBody);
  return res.data;
}

// 카카오 회원가입
export async function createKakaoUser(
  signupBody: KakaoSignupRequestBody
): Promise<KakaoSignupResponseType> {
  const res = await apiClient.post('/oauth/sign-up/kakao', signupBody);
  return res.data;
}
