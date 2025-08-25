'use client';

import { useRouter } from 'next/navigation';
import Button from '@/src/components/primitives/Button';
import { KAKAO_AUTH_URL } from '@/src/constants/social';
import KakaoIcon from '@/public/images/icons/KakaoIcon.svg';

export default function KakaoSignupButton() {
  const router = useRouter();

  const handleCliek = () => router.replace(KAKAO_AUTH_URL);

  return (
    <>
      <h2 className='relative my-[30px] w-full h-[1px] bg-gray-100 md:my-10'>
        <span className='absolute left-[50%] top-[50%] px-[14px] -translate-1/2 text-[#79747e] text-center font-medium bg-white whitespace-nowrap'>
          SNS 계정으로 회원가입하기
        </span>
      </h2>
      <Button variant='secondary' size='lg' full onClick={handleCliek}>
        <KakaoIcon className='group-hover:invert-100' />
        카카오 회원가입
      </Button>
    </>
  );
}
