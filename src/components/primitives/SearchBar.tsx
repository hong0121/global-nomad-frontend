"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";

interface SearchFormInput {
  query: string;
}

interface SearchBarProps {
  size?: 'pc/tb' | 'mo';
  onSearch: (query: string) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ size = 'pc/tb', onSearch }) => {
  const { register, handleSubmit } = useForm<SearchFormInput>();
  const isPc = size === 'pc/tb';

  const onSubmit: SubmitHandler<SearchFormInput> = (data) => {
    onSearch(data.query);
  };

  return (
    <div className={clsx(
      "flex flex-col items-center w-full",
      isPc ? "gap-9" : "gap-3" // 36px or 12px
    )}>
      
      <h2 className={clsx(
        "font-bold text-[#1F1F22] text-center -tracking-[0.025em] leading-[100%]",
        isPc ? "text-[32px] h-[38px]" : "text-[16px] h-[19px]"
      )}>
        무엇을 체험하고 싶으신가요?
      </h2>

      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(
          "flex items-center justify-between w-full bg-white shadow-[0px_6px_10px_0px_#0D99FF0D]",
          isPc 
            
            ? "max-w-[1040px] h-[70px] rounded-[24px] pl-[32px] pr-[12px] py-[10px]"
            : "max-w-[374px] h-[53px] rounded-2xl pl-5 pr-2 py-[6px]"
        )}
      >
        <div className="flex items-center flex-grow gap-2">
          
          <img
            src="/images/icons/SearchIcon.svg"
            alt="검색 아이콘"
            className={clsx(isPc ? "w-6 h-6" : "w-5 h-5")}
          />
          
          <input
            type="text"
            placeholder="내가 원하는 체험은"
            {...register('query')}
            className={clsx(
              "w-full bg-transparent outline-none font-medium -tracking-[0.025em] leading-[100%] placeholder:text-[#84858C]",
              isPc ? "text-[18px]" : "text-[14px]"
            )}
          />
        </div>

        
        <button
          type="submit"
          className={clsx(
            "flex-shrink-0 text-white font-bold -tracking-[0.025em] leading-[100%] bg-[#3D9EF2] transition-colors hover:bg-blue-600",
            isPc 
              ? "w-[120px] h-[50px] rounded-[14px] text-[16px]"
              : "w-auto px-4 h-[41px] rounded-[12px] text-[14px]"
          )}
        >
          검색하기
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
