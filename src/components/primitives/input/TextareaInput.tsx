'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        className={clsx(
          'h-[140px] md:h-[200px] border border-gray-100 rounded-2xl w-full pt-4 pr-5 pb-4 pl-5 transition-colors duration-200 resize-none',
          className
        )}
      />
    );
  }
);

TextareaInput.displayName = 'TextareaInput';
export default TextareaInput;
