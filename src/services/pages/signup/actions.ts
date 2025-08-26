'use server';
import { KAKAO_REDIRECT_URI } from '@/src/constants/social';
import { createKakaoUser } from '@/src/services/pages/signup/api';

export default async function signupAction(code: string | null) {
  // 리다이렉트 값 확인
  if (!KAKAO_REDIRECT_URI) {
    throw new Error('Redirect URI 설정을 확인하세요.');
  }

  // 인가 코드 확인
  if (!code) {
    throw new Error('인가 코드가 없습니다.');
  }

  // 서비스 서버에 회원가입 요청
  const data = await createKakaoUser({
    nickname: '사용자',
    redirectUri: KAKAO_REDIRECT_URI,
    token: code,
  });

  return data;
}
