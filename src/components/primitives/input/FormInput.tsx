'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import PasswordInput from './PasswordInput';
import Input from './Input';
import { cn } from '@/src/utils/cn';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  isPassword?: boolean;
  variant?: 'default' | 'experience' | 'auth';
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, errorMessage, isPassword, variant = 'default', ...props }, ref) => {
    const variantLabelStyles = cn({
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
            className={cn(baseBorder, focusBorder, errorBorder)}
          />
        ) : (
          <Input
            ref={ref}
            {...props}
            className={cn(baseBorder, focusBorder, errorBorder)}
          />
        )}
        <span
          className={cn('text-sm pl-2', errorMessage ? 'text-red-500' : null)}
        >
          {errorMessage || ' '}
        </span>
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
export default FormInput;
