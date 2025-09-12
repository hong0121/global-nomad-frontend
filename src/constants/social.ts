export const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

const CURRENT_ORIGIN =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_VERCEL_URL;
export const KAKAO_REDIRECT_URI_SIGNUP = `${CURRENT_ORIGIN}/signup/social/kakao`;
export const KAKAO_REDIRECT_URI_LOGIN = `${CURRENT_ORIGIN}/login/social/kakao`;

export const KAKAO_AUTH_URL_SIGNUP = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI_SIGNUP}`;
export const KAKAO_AUTH_URL_LOGIN = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI_LOGIN}`;

export const KAKAO_JAVASCRIPT_KEY =
  process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
