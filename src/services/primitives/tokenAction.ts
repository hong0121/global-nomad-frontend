'use server';

import { TokenUserResponseType } from '@/src/types/userType';
import { cookies } from 'next/headers';

const isProduction = process.env.NODE_ENV === 'production';

export async function setTokenAction(data: TokenUserResponseType) {
  const cookieStore = await cookies();
  const { accessToken, refreshToken } = data;

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: isProduction,
    maxAge: 60 * 30, // 30분
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: isProduction,
    maxAge: 60 * 60 * 24 * 14, // 14일
  });
}

export async function deleteTokenAction() {
  const cookieStore = await cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}
