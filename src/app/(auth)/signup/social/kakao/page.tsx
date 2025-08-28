import KakaoSignupClient from '@/src/components/pages/signup/KakaoSignupClient';
import { Suspense } from 'react';

export default function KakaoSignupPage() {
  return (
    <Suspense fallback={<div>인가코드 받아오는중...</div>}>
      <KakaoSignupClient />
    </Suspense>
  );
}
