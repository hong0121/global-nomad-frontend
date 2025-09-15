'use client';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';
import ToastContainer from '@/src/components/primitives/toast/ToastContainer';
import { queries } from '@/src/services/primitives/queries';
import { useTokenStore } from '@/src/store/useTokenStore';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function AuthProvicder({ children }: Props) {
  const [isAuthChecked, setIsAuthCheck] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const accessToken = useTokenStore((state) => state.accessToken);

  // 리액트쿼리는 액세스 토큰이 있고, 유효한 액세스 토큰을 넘겨주었을 때에만 페칭을 시작함.
  const { isLoading } = useQuery({
    ...queries.userOptions(accessToken),
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!!accessToken) {
      setIsAuthCheck(true);
    } else {
      setIsAuthCheck(false);
    }
  }, [accessToken]);

  // 리다이렉트 분기
  useEffect(() => {
    // 리액트 쿼리 페칭중이라면 return
    if (isAuthChecked === null || isLoading) return;

    const AUTH_PATHS = [
      '/login',
      '/signup',
      '/login/social/kakao',
      '/signup/social/kakao',
    ];
    const PUBLIC_PATH_PATTERNS = [/^\/$/, /^\/detail\/\d+$/];

    const isAuthPath = AUTH_PATHS.includes(pathname);
    const isPublicPath = PUBLIC_PATH_PATTERNS.some((regex) =>
      regex.test(pathname)
    );

    // 로그인 상태일때
    if (isAuthChecked) {
      // auth 페이지(로그인/회원가입) 라우트시
      if (isAuthPath) {
        router.replace('/');
      }
    }

    // 로그인 상태가 아닐 때
    if (!isAuthChecked) {
      // 프로텍트 페이지 (/, /detail, /login, /signup 제외) 접속시
      if (!isPublicPath && !isAuthPath) {
        // 로그인페이지로 리다이렉트, 이때 params에 ?&redirect_uri=현재페이지경로 를 추가해줘서 로그인 완료시 접속시도했던 페이지로 리다이렉트되도록 처리
        router.replace(`/login?redirect_path=${pathname}`);
      }
    }
  }, [pathname, router, isLoading, isAuthChecked]);

  // 리액트 쿼리 페칭중이라면 로딩 보여주기.
  if (isLoading)
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
