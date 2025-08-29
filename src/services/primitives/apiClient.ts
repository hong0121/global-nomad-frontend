import { queries } from '@/src/services/primitives/queries';
import { getQueryClient } from '@/src/utils/getQueryClient';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// request - 토큰 주입
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
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

    // 401 에러 - 액세스 토큰 만료시
    if (status === 401 && !originalRequest._retry) {
      // 토큰 갱신 요청 중복 방지 플래그
      originalRequest._retry = true;

      try {
        // 1. 토큰 갱신 라우터 핸들러 호출
        const { data } = await axios.post('/api/refreshToken');

        // 2. 새로운 액세스 토큰 저장
        localStorage.setItem('accessToken', data.newAccessToken);

        // 3. 다시 api 요청
        originalRequest.headers.Authorization = `Bearer ${data.newAccessToken}`;
        return apiClient(originalRequest);
      } catch (error) {
        // 리프레시 토큰 만료시,
        // 1. accessToken 로컬스토리지에서 삭제
        localStorage.removeItem('accessToken');

        // 2. 리액트 쿼리 유저 정보 초기화
        const queryClient = getQueryClient();
        queryClient.removeQueries({ queryKey: queries.user() });

        // 3. 로그인 페이지로 이동
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
