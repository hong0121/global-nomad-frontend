'use client';

import Button from '@/src/components/primitives/Button';
import { loginRequestBody, loginUser } from '@/src/services/pages/login/api';
import { queries } from '@/src/services/primitives/queries';
import { setTokenAction } from '@/src/services/primitives/tokenAction';
import { TokenUserResponseType } from '@/src/types/userType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: (data: loginRequestBody) => loginUser(data),
    onSuccess: async (data: TokenUserResponseType) => {
      queryClient.setQueryData(queries.user(), data.user); // 리액트 쿼리 데이터 캐싱
      await setTokenAction(data); // 토큰 쿠키 설정
      router.replace('/');
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      if (err?.response?.status === 400 || err?.response?.status === 404) {
        alert('로그인 정보를 다시 확인해주세요.');
      }
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) return;

    loginMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-2'>
        <label className='block'>이메일</label>
        <input name='email' type='text' placeholder='이메일을 입력해 주세요' />
      </div>
      <div className='mb-2'>
        <label className='block'>비밀번호</label>
        <input
          name='password'
          type='password'
          placeholder='8자 이상 입력해 주세요'
        />
      </div>
      <Button size='lg' full>
        로그인하기
      </Button>
    </form>
  );
}
