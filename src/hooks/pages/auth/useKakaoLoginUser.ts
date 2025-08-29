import {
  KakaoLoginRequestBody,
  kakaoLoginUser,
} from '@/src/services/pages/login/api';
import { queries } from '@/src/services/primitives/queries';
import { setTokenAction } from '@/src/services/primitives/tokenAction';
import { TokenUserResponseType } from '@/src/types/userType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function useKakaoLoginUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: KakaoLoginRequestBody) =>
      await kakaoLoginUser(data),
    onSuccess: async (data: TokenUserResponseType) => {
      queryClient.setQueryData(queries.user(), data.user); // 리액트 쿼리 데이터 캐싱
      localStorage.setItem('accessToken', data.accessToken); // 액세스 토큰 로컬스토리지 저장
      await setTokenAction(data.refreshToken); // 리프레시 토큰 쿠키 설정
      router.replace('/');
    },
    onError: () => {
      alert('로그인에 실패하였습니다. 다시 시도 해주세요.');
      router.replace('/login');
    },
  });
}
