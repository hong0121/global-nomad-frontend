'use client';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';
import { KAKAO_REDIRECT_URI_LOGIN } from '@/src/constants/social';
import {
  KakaoLoginRequestBody,
  kakaoLoginUser,
} from '@/src/services/pages/login/api';
import { queries } from '@/src/services/primitives/queries';
import { setTokenAction } from '@/src/services/primitives/tokenAction';
import { TokenUserResponseType } from '@/src/types/userType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function KakaoLoginPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const flagRef = useRef(false);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const kakaoLoginMutation = useMutation({
    mutationFn: async (data: KakaoLoginRequestBody) =>
      await kakaoLoginUser(data),
    onSuccess: async (data: TokenUserResponseType) => {
      queryClient.setQueryData(queries.user(), data.user); // 리액트 쿼리 데이터 캐싱
      await setTokenAction(data); // 토큰 쿠키 설정
      router.replace('/');
    },
    onError: () => {
      alert('로그인에 실패하였습니다. 다시 시도 해주세요.');
      router.replace('/login');
    },
  });

  useEffect(() => {
    if (!code) {
      alert('인가 코드가 없습니다. 다시 시도 해주세요.');
      router.replace('/login');
      return;
    }

    if (flagRef.current) return;

    flagRef.current = true;

    kakaoLoginMutation.mutate({
      redirectUri: KAKAO_REDIRECT_URI_LOGIN,
      token: code,
    });
  }, [code, kakaoLoginMutation, router]);

  return (
    <div className='flex flex-col items-center justify-center max-w-[640px] gap-4 min-h-screen mx-auto'>
      <LoadingSpinner className='w-[40px] h-[40px] border-8' />
      <p>카카오 로그인중...</p>
    </div>
  );
}
