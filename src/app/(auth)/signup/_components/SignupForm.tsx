'use client';
import { createUser } from '@/src/app/(auth)/signup/_services/api';
import Button from '@/src/components/Button';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function SignupForm() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')?.toString();
    const nickname = formData.get('nickname')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !nickname || !password) return;

    try {
      await createUser({ email, nickname, password });
      router.replace('/login'); // 성공하면 로그인 페이지로 이동
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      if (err.response?.status === 409) {
        // 중복 이메일 체크
        alert(err.response?.data?.message); // 추후에, 토스트 UI로 교체 예정
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-2'>
        <label className='block'>이메일</label>
        <input name='email' type='text' placeholder='이메일을 입력해 주세요' />
      </div>
      <div className='mb-2'>
        <label className='block'>닉네임</label>
        <input
          name='nickname'
          type='text'
          placeholder='닉네임을 입력해 주세요'
        />
      </div>
      <div className='mb-2'>
        <label className='block'>비밀번호</label>
        <input
          name='password'
          type='password'
          placeholder='8자 이상 입력해 주세요'
        />
      </div>
      <div className='mb-2'>
        <label className='block'>비밀번호 확인</label>
        <input
          type='password'
          placeholder='비밀번호를 한 번 더 입력해 주세요'
        />
      </div>
      <Button size='lg' full>
        회원가입하기
      </Button>
    </form>
  );
}
