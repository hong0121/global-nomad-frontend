"use client";

import React from "react";
import Image from "next/image";

// 1. FilterButtonProps 타입에 icon 속성을 추가합니다. (string 타입, optional)
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
  icon, // 2. icon prop을 받아옵니다.
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
      {/* 3. showIcon이 true이고 icon prop이 존재할 때만 이미지를 렌더링합니다. */}
      {showIcon && icon && (
        <Image
          // 4. 하드코딩된 경로 대신 전달받은 icon prop을 사용합니다.
          src={icon}
          // 5. alt 텍스트를 label을 사용해 동적으로 만듭니다.
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

