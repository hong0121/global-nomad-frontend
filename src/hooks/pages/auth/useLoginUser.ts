import { loginRequestBody, loginUser } from '@/src/services/pages/login/api';
import { queries } from '@/src/services/primitives/queries';
import { setTokenAction } from '@/src/services/primitives/tokenAction';
import { TokenUserResponseType } from '@/src/types/userType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function useLoginUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: loginRequestBody) => loginUser(data),
    onSuccess: async (data: TokenUserResponseType) => {
      queryClient.setQueryData(queries.user(), data.user); // 리액트 쿼리 데이터 캐싱
      localStorage.setItem('accessToken', data.accessToken); // 액세스 토큰 로컬스토리지 저장
      await setTokenAction(data.refreshToken); // 리프레시 토큰 쿠키 설정
      router.replace('/');
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      if (err?.response?.status === 400 || err?.response?.status === 404) {
        alert('로그인 정보를 다시 확인해주세요.');
      }
    },
  });
}
