'use client';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';
import { queries } from '@/src/services/primitives/queries';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function AuthProvicder({ children }: Props) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { isFetching, data } = useQuery(queries.userOptions(accessToken));

  useEffect(() => {
    // 클라이언트에서만 localStorage 접근 가능
    setAccessToken(localStorage.getItem('accessToken'));
  }, []);

  // 유저 정보 api 요청시에는 로딩 보여주기.
  // 리액트쿼리는 액세스 토큰이 있고, 유효한 액세스 토큰을 넘겨주었을 때에만 페칭을 시작함.
  if (isFetching)
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <LoadingSpinner />
      </div>
    );

  return <>{children}</>;
}
