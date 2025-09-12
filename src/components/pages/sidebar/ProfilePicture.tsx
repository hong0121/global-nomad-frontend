'use client';

import { queries } from '@/src/services/primitives/queries';
import { useTokenStore } from '@/src/store/useTokenStore';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import EditIcon from '@/public/images/icons/EditIcon.svg';
import { ChangeEvent, useRef } from 'react';
import { patchMyInfo, postAvatar } from '@/src/services/pages/users/api';
import { getQueryClient } from '@/src/utils/getQueryClient';

export default function ProfilePicture() {
  const { accessToken } = useTokenStore();
  const { data: userData } = useQuery(queries.userOptions(accessToken));
  const queryClient = getQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const { profileImageUrl } = await postAvatar(formData);
    patchMyInfo({ profileImageUrl }).then(() => {
      queryClient.invalidateQueries({ queryKey: queries.user() });
    });
  };

  return (
    <div className='relative h-[120px] md:h-[70px] lg:h-[120px] aspect-square'>
      {userData && userData.profileImageUrl ? (
        <Image
          src={userData.profileImageUrl}
          alt={`${userData.nickname}의 아바타`}
          fill
          className='w-full h-full rounded-full object-cover'
        />
      ) : (
        <Image src={'/images/Default_Profile.png'} alt='기본 아바타' fill />
      )}
      <input
        type='file'
        className='hidden'
        ref={fileRef}
        onChange={handleFileChange}
      />
      <button
        className='absolute bottom-0 right-0 w-[30px] h-[30px] rounded-full bg-gray-300'
        onClick={() => fileRef.current?.click()}
      >
        <EditIcon className='m-auto fill-white' />
      </button>
    </div>
  );
}
