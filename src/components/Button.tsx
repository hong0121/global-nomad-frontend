import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
  full?: boolean;
  className?: string;
  children: ReactNode;
}

const ButtonVariant = {
  primary:
    'bg-primary-500 text-white font-bold disabled:bg-gray-200 disabled:text-gray-50',
  secondary:
    'gap-1 border border-gray-200 bg-white text-gray-600 font-medium hover:border-primary-500 hover:bg-primary-500 hover:text-white disabled:border-gray-200 disabled:bg-white disabled:text-gray-200',
  text: 'px-5 justify-start gap-[5px] text-gray-600 hover:bg-primary-100 hover:text-gray-950 md:px-5 lg:px-5',
};

const ButtonSize = {
  sm: 'h-[41px] p-3 rounded-xl text-14 md:h-12 md:p-[14px] md:text-16 md:rounded-[14px] lg:h-[54px] lg:p-[17px] lg:rounded-2xl',
  md: 'h-12 p-[14px] text-16 rounded-[14px] lg:h-[54px] lg:p-[17px] lg:rounded-2xl',
  lg: 'h-[54px] p-[17px] rounded-2xl',
};

export default function Button({
  variant = 'primary',
  size = 'sm',
  full,
  className,
  children,
  ...props
}: ButtonProps) {
  const variantStyle = ButtonVariant[variant];
  const sizeStyle = ButtonSize[size];

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center group',
        sizeStyle,
        variantStyle,
        size === 'sm' && variant === 'secondary' && 'h-[34px] p-2',
        full ? 'w-full' : null,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
