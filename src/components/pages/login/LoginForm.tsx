'use client';

import Button from '@/src/components/primitives/Button';
import useLoginUser from '@/src/hooks/auth/useLoginUser';
import { FormEvent } from 'react';

export default function LoginForm() {
  const loginMutation = useLoginUser();

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
