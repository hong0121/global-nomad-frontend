'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={clsx(
          'border border-gray-100 rounded-2xl w-full pt-4 pr-5 pb-4 pl-5 transition-colors duration-200',
          className
        )}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;
