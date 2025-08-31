'use client';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';
import { queries } from '@/src/services/primitives/queries';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function AuthProvicder({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null | undefined>(
    undefined
  );
  // 리액트쿼리는 액세스 토큰이 있고, 유효한 액세스 토큰을 넘겨주었을 때에만 페칭을 시작함.
  const { isFetched, data: userInfo } = useQuery({
    ...queries.userOptions(accessToken),
  });

  const isLoggingIn = !!userInfo;

  const AUTH_PATHS = ['/login', '/signup'];
  const PUBLIC_PATH_PATTERNS = [/^\/$/, /^\/detail\/\d+$/];

  const isAuthPath = AUTH_PATHS.includes(pathname);
  const isPublicPath = PUBLIC_PATH_PATTERNS.some((regex) =>
    regex.test(pathname)
  );

  useEffect(() => {
    // 클라이언트에서만 localStorage 접근 가능
    setAccessToken(localStorage.getItem('accessToken'));
  }, []);

  // 리다이렉트 분기
  useEffect(() => {
    // accessToken 가져오기 전이라면 retrn
    if (accessToken === undefined) return;
    // accessToken에 값이 null이 아니고, 첫 데이터 가져오는 중이라면 return
    if (accessToken !== null && !isFetched) return;

    // 로그인 상태일때
    if (isLoggingIn) {
      // auth 페이지(로그인/회원가입) 라우트시
      if (isAuthPath) {
        router.replace('/');
      }
    }

    // 로그인 상태가 아닐 때
    if (!isLoggingIn) {
      // 프로텍트 페이지 (/, /detail, /login, /signup 제외) 접속시
      if (!isPublicPath && !isAuthPath) {
        // 로그인페이지로 리다이렉트, 이때 params에 ?&redirect_uri=현재페이지경로 를 추가해줘서 로그인 완료시 접속시도했던 페이지로 리다이렉트되도록 처리
        router.replace(`/login?redirect_path=${pathname}`);
      }
    }
  }, [pathname, router, isLoggingIn, accessToken, isFetched]);

  // 유저 정보 api 요청시에는 로딩 보여주기.
  if (accessToken === undefined || (accessToken !== null && !isFetched))
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <LoadingSpinner />
      </div>
    );

  return <>{children}</>;
}
