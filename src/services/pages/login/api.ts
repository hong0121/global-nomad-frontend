import { apiClient } from '@/src/services/primitives/apiClient';
import { TokenUserResponseType } from '@/src/types/userType';

export interface loginRequestBody {
  email: string;
  password: string;
}

export interface KakaoLoginRequestBody {
  redirectUri: string;
  token: string;
}

// 일반 로그인
export async function loginUser(
  loginBody: loginRequestBody
): Promise<TokenUserResponseType> {
  const res = await apiClient.post('/auth/login', loginBody);
  return res.data;
}

// 카카오 로그인
export async function kakaoLoginUser(
  loginBody: KakaoLoginRequestBody
): Promise<TokenUserResponseType> {
  const res = await apiClient.post('/oauth/sign-in/kakao', loginBody);
  return res.data;
}
