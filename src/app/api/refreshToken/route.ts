import { setTokenAction } from '@/src/services/primitives/tokenAction';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface TokenReissueResponse {
  accessToken: string;
  refreshToken: string;
}

export async function POST() {
  try {
    // 1. refreshToken 토큰 가져오기
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    // 2. 리프레시 토큰 없으면, 에러 반환
    if (!refreshToken) {
      return NextResponse.json(
        { error: '리프레시 토큰이 없습니다.' },
        { status: 401 }
      );
    }

    // 3. 리프레시 토큰으로 토큰 재발급 요청
    const { data } = await axios.post<TokenReissueResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/tokens`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    // 4. 서버액션으로 refreshToken 쿠키 다시 저장
    await setTokenAction(data.refreshToken);

    // 5. 토큰 반환
    return NextResponse.json({ data });
  } catch (error) {
    const err = error as AxiosError;
    const status = err.response?.status || 500;

    return NextResponse.json({ error: '토큰 갱신 실패' }, { status: status });
  }
}
