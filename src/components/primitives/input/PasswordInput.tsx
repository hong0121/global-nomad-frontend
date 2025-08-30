'use client';

import { useState, forwardRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Input from './Input';

interface PasswordInputProps {
  placeholder?: string;
  className?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className='relative'>
        <Input
          {...props}
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={clsx(className, 'pr-10')}
        />
        <button
          type='button'
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute right-3 top-1/2 -translate-y-1/2'
        >
          <Image
            src={
              showPassword
                ? '/images/icons/EyeOpenIcon.svg'
                : '/images/icons/EyeOffIcon.svg'
            }
            alt='Toggle Password'
            width={24}
            height={24}
          />
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;
