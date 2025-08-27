'use client';

import { useRouter } from 'next/navigation';

export default function DropdownList() {
  const router = useRouter();

  const handleUpdate = () => {
    router.push('/myCreateExperiences');
  };

  return (
    <>
      <div className='flex flex-col justify-around w-24 h-27 border border-[#dfdfdf] rounded-[8px] shadow-[0px_0px_3px_0px_#dde6ef]'>
        <button
          onClick={handleUpdate}
          type='button'
          className='text-16 font-medium'
          aria-label='수정하기'
        >
          수정하기
        </button>
        <button
          type='button'
          className='text-16 font-medium'
          aria-label='삭제하기'
        >
          삭제하기
        </button>
      </div>
    </>
  );
}
