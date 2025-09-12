'use client';

import MyExperienceCard from '@/src/components/pages/myExperiences/MyExperienceCard';
import Button from '@/src/components/primitives/Button';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import BackIcon from '@/public/images/icons/BackIcon.svg';
import { useContext, useState } from 'react';
import { TabContext } from '../pageContext';
import { queries } from '@/src/services/primitives/queries';
import ConfirmModal from '@/src/components/primitives/modal/ConfirmModal';
import Link from 'next/link';

export default function MyExperiencesPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<number>(0);
  const { setIsTabOpen } = useContext(TabContext);
  const { data, isPending } = useQuery(queries.myExperiencesOptions());
  const mutation = useMutation(queries.myExperiencesMutationOptions());

  return (
    <section className='flex flex-col items-center gap-8'>
      <div className='w-full flex flex-col md:flex-row gap-4 md:justify-between'>
        <div className='flex gap-4 items-center'>
          <button
            onClick={() => setIsTabOpen(false)}
            className='block md:hidden'
          >
            <BackIcon />
          </button>
          <div className='space-y-2.5'>
            <h1 className='text-18 font-bold'>내 체험 관리</h1>
            <p className='font-14 text-gray-500'>
              체험을 등록하거나 수정 및 삭제가 가능합니다.
            </p>
          </div>
        </div>
        <Link href={'/myCreateExperiences'}>
          <Button size='lg'>체험 등록하기</Button>
        </Link>
      </div>
      {!isPending ? (
        <>
          {data && data.totalCount !== 0 ? (
            <>
              {data.activities.map((activity) => (
                <MyExperienceCard
                  data={activity}
                  key={activity.id}
                  callbackId={setSelectedExperience}
                  setIsModalVisible={setIsModalVisible}
                />
              ))}
            </>
          ) : (
            <div className='space-y-8'>
              <Image
                src={'/images/Not_Found_Earth.png'}
                alt='찾을 수 없습니다'
                width={122}
                height={122}
                className='mx-auto'
              />
              <span className='text-18 text-gray-600'>
                아직 등록한 체험이 없어요
              </span>
            </div>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
      <ConfirmModal
        onConfirm={() => {
          mutation.mutate(selectedExperience);
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
        isOpen={isModalVisible}
        message='정말 체험을 삭제하시겠습니까?'
      />
    </section>
  );
}
