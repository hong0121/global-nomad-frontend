'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/src/components/primitives/Button';
import { KAKAO_AUTH_URL_LOGIN } from '@/src/constants/social';
import KakaoIcon from '@/public/images/icons/KakaoIcon.svg';

export default function KakaoLoginButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect_path');

  const linkUrl = redirectPath
    ? `${KAKAO_AUTH_URL_LOGIN}&state=${redirectPath}`
    : KAKAO_AUTH_URL_LOGIN;

  const handleClick = () => router.replace(linkUrl);

  return (
    <>
      <h2 className='relative my-[30px] w-full h-[1px] bg-gray-100 md:my-10'>
        <span className='absolute left-[50%] top-[50%] px-[14px] -translate-1/2 text-[#79747e] text-center font-medium bg-white whitespace-nowrap'>
          or
        </span>
      </h2>
      <Button variant='secondary' size='lg' full onClick={handleClick}>
        <KakaoIcon className='group-hover:invert-100' />
        카카오 로그인
      </Button>
    </>
  );
}
