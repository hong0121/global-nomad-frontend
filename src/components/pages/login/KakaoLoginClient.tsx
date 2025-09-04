'use client';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';
import { KAKAO_REDIRECT_URI_LOGIN } from '@/src/constants/social';
import useKakaoLoginUser from '@/src/hooks/pages/auth/useKakaoLoginUser';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function KakaoLoginClient() {
  const router = useRouter();
  const flagRef = useRef(false);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const kakaoLoginMutation = useKakaoLoginUser();

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
    <div className='flex flex-col items-center justify-center gap-4'>
      <LoadingSpinner className='w-[40px] h-[40px] border-8' />
      <p>카카오 로그인중...</p>
    </div>
  );
}
