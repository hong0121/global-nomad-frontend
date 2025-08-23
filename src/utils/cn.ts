import clsx from 'clsx';
import { ClassValue } from 'clsx';
import twMerge from './customTwMerge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
