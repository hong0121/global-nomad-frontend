'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import PasswordInput from './PasswordInput';
import Input from './Input';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  isPassword?: boolean;
  variant?: 'default' | 'experience' | 'auth';
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, errorMessage, isPassword, variant = 'default', ...props }, ref) => {
    const variantLabelStyles = clsx({
      'font-bold text-base text-gray-950': variant === 'default',
      'font-medium text-base text-gray-950': variant === 'experience',
      'font-medium text-lg text-text-gray-950': variant === 'auth',
    });

    const baseBorder = 'border border-gray-100';
    const focusBorder =
      'focus:border-[var(--color-primary-500)] focus:outline-none';
    const errorBorder = errorMessage ? 'border-red-500' : '';

    return (
      <div className='flex flex-col gap-2.5'>
        <label className={variantLabelStyles}>{label}</label>
        {isPassword ? (
          <PasswordInput
            ref={ref}
            {...props}
            className={clsx(baseBorder, focusBorder, errorBorder)}
          />
        ) : (
          <Input
            ref={ref}
            {...props}
            className={clsx(baseBorder, focusBorder, errorBorder)}
          />
        )}
        <span
          className={clsx(
            'text-sm min-h-5 pl-2',
            errorMessage ? 'text-red-500 visible' : 'invisible'
          )}
        >
          {errorMessage || ' '}
        </span>
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
export default FormInput;
