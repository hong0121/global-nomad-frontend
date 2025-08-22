import twMerge from "@/utils/customTwMerge";
import clsx from "clsx";
import { ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
