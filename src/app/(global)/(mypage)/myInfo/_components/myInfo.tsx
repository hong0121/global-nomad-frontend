'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { patchMyInfo } from '@/src/services/pages/users/api';
import Button from '@/src/components/primitives/Button';
import FormInput from '@/src/components/primitives/input/FormInput';
import AlertModal from '@/src/components/primitives/modal/AlertModal';
import BackBtn from '@/src/components/primitives/mypage/BackBtn';
import getUserInfo from '@/src/services/primitives/getUserInfo';

type MyInfoFormData = {
  nickname: string;
  email: string;
  password?: string;
  checkpassword?: string;
};

export default function MyInfoPage() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MyInfoFormData>({ mode: 'onBlur' });

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (userInfo) {
      reset({
        nickname: userInfo.nickname,
        email: userInfo.email,
        password: '',
        checkpassword: '',
      });
    }
  }, [userInfo, reset]);

  const watchedFields = watch();
  const isButtonDisabled =
    !watchedFields.nickname ||
    !watchedFields.email ||
    watchedFields.password !== watchedFields.checkpassword;

  const onSubmit = async (data: MyInfoFormData) => {
    const payload = {
      ...data,
      ...(data.password ? { password: data.password } : {}),
    };

    try {
      await patchMyInfo(payload);
      reset({
        nickname: data.nickname,
        email: data.email,
        password: '',
        checkpassword: '',
      });
      setAlertMessage('내 정보가 저장되었습니다!');
      setAlertOpen(true);
    } catch (err) {
      setAlertMessage('저장에 실패했습니다.');
      setAlertOpen(true);
    }
  };

  return (
    <section>
      <div className='flex items-center gap-4 mb-7.5 md:mb-8.5'>
        <BackBtn />
        <div>
          <h1 className='font-bold text-18 mb-2.5'>내 정보</h1>
          <p className='text-14 font-medium text-gray-500'>
            닉네임과 비밀번호를 수정하실 수 있습니다
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4.5 md:gap-6'
      >
        <FormInput
          label='닉네임'
          variant='experience'
          placeholder='닉네임을 입력하세요'
          errorMessage={errors.nickname?.message}
          {...register('nickname', {
            required: '필수 입력 항목입니다.',
            maxLength: {
              value: 10,
              message: '닉네임은 10자 이하로 작성해주세요.',
            },
          })}
        />
        <FormInput
          label='이메일'
          variant='experience'
          placeholder='이메일을 입력하세요'
          errorMessage={errors.email?.message}
          {...register('email', {
            required: '필수 입력 항목입니다.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
        />
        <FormInput
          label='비밀번호'
          isPassword={true}
          variant='experience'
          placeholder='8자 이상 입력해 주세요'
          errorMessage={errors.password?.message}
          {...register('password', {
            minLength: { value: 8, message: '8자 이상 입력해주세요.' },
          })}
        />
        <FormInput
          label='비밀번호 확인'
          isPassword={true}
          variant='experience'
          placeholder='비밀번호를 한 번 더 입력해 주세요'
          errorMessage={errors.checkpassword?.message}
          {...register('checkpassword', {
            minLength: { value: 8, message: '8자 이상 입력해주세요.' },
            validate: (value) =>
              value === watch('password') || '비밀번호가 일치하지 않습니다.',
          })}
        />
        <div className='w-full flex justify-center'>
          <Button
            type='submit'
            className='w-30'
            variant='primary'
            disabled={isButtonDisabled}
          >
            저장하기
          </Button>
        </div>
      </form>

      <AlertModal
        isOpen={alertOpen}
        message={alertMessage}
        onClose={() => setAlertOpen(false)}
      />
    </section>
  );
}
