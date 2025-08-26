import { InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  errorMessage?: string;
  isPasswordVisible?: boolean;
  isPassword?: boolean;
  variant?: 'default' | 'auth' | 'experience';
}

const Input = ({
  label,
  errorMessage,
  placeholder,
  isPasswordVisible = false,
  isPassword = false,
  variant,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const baseBorder = 'border border-[var(--color-gray-100)]';
  const focusBorder =
    'focus:border-[var(--color-primary-500)] focus:outline-none';
  const errorBorder = errorMessage ? 'border-[var(--color-red-500)]' : '';
  const variantLabelStyles = clsx({
    'font-bold text-base text-[var(--color-gray-950)]':
      variant === 'experience',
    'font-medium text-base text-[var(--color-gray-900)]': variant === 'auth',
  });

  return (
    <div className='flex flex-col gap-[10px] '>
      <label className={variantLabelStyles}>{label}</label>
      <div className='relative'>
        <input
          {...props}
          type={isPassword && !showPassword ? 'password' : 'text'}
          className={`${baseBorder} ${focusBorder} ${errorBorder} rounded-[16px] w-full pt-4 pr-10 pb-4 pl-5 transition-colors duration-200 font-medium`}
          placeholder={placeholder}
        />
        {isPasswordVisible && (
          <button type='button' onClick={togglePassword}>
            <Image
              src={
                showPassword
                  ? '/images/icons/EyeOpenIcon.svg'
                  : '/images/icons/EyeOffIcon.svg'
              }
              alt='Eyes Icon'
              width={24}
              height={24}
              className='absolute right-3 top-1/2 -translate-y-1/2'
            />
          </button>
        )}
      </div>
      <span
        className={`text-[12px] min-h-[20px] font-medium pl-2 ${
          errorMessage ? 'text-[var(--color-red-500)] visible' : 'invisible'
        }`}
      >
        {errorMessage || ' '}
      </span>
    </div>
  );
};

export default Input;
