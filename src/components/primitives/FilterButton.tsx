"use client";

import React from "react";
import Image from "next/image";

interface FilterButtonProps {
  state?: "normal" | "active";
  size?: "pc/tb" | "mo";
  showIcon?: boolean;
  label: string;
  icon?: string;
  onClick?: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  state = "normal",
  size = "pc/tb",
  showIcon = true,
  label,
  icon, 
  onClick,
}) => {
  const isLarge = size === "pc/tb";
  const isActive = state === "active";

  const baseStyles =
    "inline-flex items-center justify-center rounded-full transition-colors duration-200";
  const sizeStyles = isLarge
    ? "h-[44px] px-4 gap-[6px] text-[16px]"
    : "h-[37px] px-[14px] gap-[4px] text-[14px]";
  const stateStyles = isActive
    ? "bg-[#333333] text-white font-bold"
    : "bg-white text-[#1F1F22] border border-[#D8D8D8] font-medium";

  const iconSize = isLarge ? 20 : 16;

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${stateStyles} font-pretendard`}
      onClick={onClick}
    >
    
      {showIcon && icon && (
        <Image
          src={icon}
          alt={`${label} 아이콘`}
          width={iconSize}
          height={iconSize}
          className={isActive ? "invert" : ""}
        />
      )}
      <span className="leading-[100%] -tracking-[0.025em]">{label}</span>
    </button>
  );
};

export default FilterButton;

