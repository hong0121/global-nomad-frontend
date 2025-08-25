'use client';
import LoadingSpinner from '@/src/components/primitive/LoadingSpinner';
import signupAction from '@/src/services/pages/signup/actions';
import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';

export default function KakaoSignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const code = searchParams.get('code');

  useEffect(() => {
    startTransition(async () => {
      try {
        await signupAction(code);

        // 회원가입 성공시 로그인 페이지로 이동
        router.replace('/login');
      } catch (error) {
        const err = error as AxiosError<{ error: string }>;

        console.error(err.response?.data?.error);
        // 유저 안내 메세지 - 추후에 토스트로 변경 예정
        alert('카카오 회원가입에 실패하였습니다. 다시 시도해주세요.');
        // 회원가입 실패시 회원가입 페이지로 이동
        router.replace('/signup');
      }
    });
  }, []);

  return (
    <div className='flex flex-col items-center justify-center max-w-[640px] gap-4 min-h-screen mx-auto'>
      <LoadingSpinner className='w-[40px] h-[40px] border-8' />
      <p>카카오 회원가입중...</p>
    </div>
  );
}
