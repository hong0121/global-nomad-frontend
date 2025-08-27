'use client';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';
import { KAKAO_REDIRECT_URI_SIGNUP } from '@/src/constants/social';
import { createKakaoUser } from '@/src/services/pages/signup/api';
import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function KakaoSignupClient() {
  const router = useRouter();
  const flagRef = useRef(false);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      alert('인가 코드가 없습니다. 다시 시도해주세요.');
      router.replace('/signup');
      return;
    }

    if (flagRef.current) return;
    flagRef.current = true;

    const kakaoSignup = async () => {
      try {
        await createKakaoUser({
          nickname: '사용자',
          redirectUri: KAKAO_REDIRECT_URI_SIGNUP,
          token: code,
        });
        router.replace('/login'); // 성공하면 로그인 페이지로 이동
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;

        if (err?.response?.status === 400) {
          // 유저 안내 메세지 - 추후에 토스트로 변경 예정
          alert('이미 등록된 사용자입니다. 로그인 페이지로 이동합니다.');
          router.replace('/login'); // 로그인 페이지로 이동
          return;
        }
        console.error(err?.response?.data?.message);
        // 유저 안내 메세지 - 추후에 토스트로 변경 예정
        alert('카카오 회원가입에 실패하였습니다. 다시 시도해주세요.');
        // 회원가입 실패시 회원가입 페이지로 이동
        router.replace('/signup');
      }
    };

    kakaoSignup();
  }, [code, router]);

  return (
    <div className='flex flex-col items-center justify-center max-w-[640px] gap-4 min-h-screen mx-auto'>
      <LoadingSpinner className='w-[40px] h-[40px] border-8' />
      <p>카카오 회원가입중...</p>
    </div>
  );
}
