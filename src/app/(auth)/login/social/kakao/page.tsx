import KakaoLoginClient from '@/src/components/pages/login/KakaoLoginClient';
import { Suspense } from 'react';

export default function KakaoLoginPage() {
  return (
    <Suspense fallback={<div>인가코드 받아오는중...</div>}>
      <KakaoLoginClient />
    </Suspense>
  );
}
