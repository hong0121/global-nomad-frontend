import { cn } from '@/src/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

interface IExperienceButton extends ComponentPropsWithoutRef<'button'> {
  variant: 'primary' | 'outline';
  size: 'md' | 'sm';
  alert?: boolean;
}

export default function ExperienceButton({
  variant,
  size,
  alert = false,
  className,
  ...props
}: IExperienceButton) {
  const variantClasses = {
    primary: 'bg-primary-500 text-white text-14',
    outline: `border border-gray-50 text-gray-600 text-14 ${alert ? 'hover:bg-red-200 hover:border-red-200' : 'hover:bg-gray-50'}`,
  };

  const sizeClasses = {
    md: 'w-[148px] p-2.5',
    sm: 'px-2.5 py-1.5',
  };

  return (
    <button
      {...props}
      className={cn(
        'rounded-lg transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    ></button>
  );
}
