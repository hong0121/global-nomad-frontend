'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/src/utils/cn';
import PasswordInput from './PasswordInput';
import Input from './Input';
import TextareaInput from './TextareaInput';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  isPassword?: boolean;
  isTextarea?: boolean;
  variant?: 'default' | 'experience' | 'auth';
}

const FormInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormInputProps
>(
  (
    {
      label,
      errorMessage,
      isPassword,
      isTextarea,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const variantLabelStyles = cn({
      'font-bold text-base text-gray-950': variant === 'default',
      'font-medium text-base text-gray-950':
        variant === 'experience' || variant === 'auth',
    });

    const baseBorder = 'border border-gray-100';
    const focusBorder =
      'focus:border-[var(--color-primary-500)] focus:outline-none';
    const errorBorder = errorMessage ? 'border-red-500' : '';

    return (
      <div className='flex flex-col gap-2.5'>
        <label className={variantLabelStyles}>{label}</label>
        {isTextarea ? (
          <TextareaInput
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={cn(baseBorder, focusBorder, errorBorder)}
          />
        ) : isPassword ? (
          <PasswordInput
            ref={ref as React.Ref<HTMLInputElement>}
            {...props}
            className={cn(baseBorder, focusBorder, errorBorder)}
          />
        ) : (
          <Input
            ref={ref as React.Ref<HTMLInputElement>}
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
