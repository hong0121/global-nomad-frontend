import { apiClient } from '@/src/services/primitives/apiClient';
import { TokenUserResponseType, UserResponseType } from '@/src/types/userType';

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
): Promise<TokenUserResponseType> {
  const res = await apiClient.post('/oauth/sign-up/kakao', signupBody);
  return res.data;
}
