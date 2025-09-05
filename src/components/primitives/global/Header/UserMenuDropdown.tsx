'use client';

import logout from '@/src/services/primitives/logout';
import { useRouter } from 'next/navigation';

export default function UserMenuDropdown({
  setVisible,
}: {
  setVisible: (state: boolean) => void;
}) {
  const router = useRouter();

  const handleMypageClick = () => {
    setVisible(false);
    router.push('/myInfo');
  };

  return (
    <div className='flex flex-col justify-around items-center w-32 py-2 bg-white border border-[#dfdfdf] rounded-lg'>
      <button
        type='button'
        className='px-4 py-2 text-14 lg:text-16 font-medium text-left'
        aria-label='마이페이지로 이동'
        onClick={handleMypageClick}
      >
        마이페이지
      </button>
      <button
        type='button'
        className='px-4 py-2 text-14 lg:text-16 font-medium text-left'
        aria-label='로그아웃'
        onClick={() => logout()}
      >
        로그아웃
      </button>
    </div>
  );
}
