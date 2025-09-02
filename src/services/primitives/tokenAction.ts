'use server';

import { cookies } from 'next/headers';

const isProduction = process.env.NODE_ENV === 'production';

export async function setTokenAction(refreshToken: string) {
  const cookieStore = await cookies();

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    maxAge: 60 * 60 * 24 * 14, // 14일
  });
}

export async function deleteTokenAction() {
  const cookieStore = await cookies();

  cookieStore.delete('refreshToken');
}
