import { queries } from '@/src/services/primitives/queries';
import { deleteTokenAction } from '@/src/services/primitives/tokenAction';
import { useTokenStore } from '@/src/store/useTokenStore';
import { getQueryClient } from '@/src/utils/getQueryClient';
import axios from 'axios';

const PUBLIC_PATH_PATTERNS = [
  /^\/$/,
  /^\/detail\/\d+$/,
  /^\/login$/,
  /^\/login\/social\/kakao$/,
  /^\/signup$/,
  /^\/signup\/social\/kakao$/,
];

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// request - 토큰 주입
apiClient.interceptors.request.use((config) => {
  const accessToken = useTokenStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// response - 액세스 토큰 만료시 재발급
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error?.status || error?.response?.status;
    const currentPath = window.location.pathname;

    // 401 에러 - 액세스 토큰 만료시
    if (status === 401 && !originalRequest._retry) {
      // 토큰 갱신 요청 중복 방지 플래그
      originalRequest._retry = true;

      try {
        // 1. 토큰 갱신 라우터 핸들러 호출
        const { data } = await axios.post('/api/refreshToken');
        const { accessToken } = data;

        // 2. 새로운 액세스 토큰 zustand로 로컬스토리지에 저장
        useTokenStore.getState().setAccessToken(accessToken);

        // 3. 다시 api 요청
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (error) {
        // 리프레시 토큰 만료시, 로그아웃 처리
        // 1. accessToken을 zustand로 로컬스토리지에서 삭제
        useTokenStore.getState().deleteAccessToken();

        // 2. refreshToken 쿠키에서 삭제
        deleteTokenAction();

        // 3. 리액트 쿼리 유저 정보 초기화
        const queryClient = getQueryClient();
        queryClient.removeQueries({ queryKey: queries.user() });

        const isPublicPath = PUBLIC_PATH_PATTERNS.some((regex) =>
          regex.test(currentPath)
        );

        if (!isPublicPath) {
          // 4. 인증 필요 O - 로그인 페이지 이동
          window.location.href = '/login';
        }
        // 4. 인증 필요 X - 현재 페이지 유지

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
