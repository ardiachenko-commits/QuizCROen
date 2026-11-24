interface NetpeakLogoProps {
  compact?: boolean;
  size?: 'default' | 'sm';
}

export function NetpeakLogo({ compact = false, size = 'default' }: NetpeakLogoProps) {
  if (size === 'sm') {
    return (
      <div className="flex items-center gap-2 select-none">
        <div className="w-7 h-7 bg-[#5aace9] rounded-[1.5px] flex items-center justify-center shrink-0 overflow-hidden">
          <svg
            width="26"
            height="26"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-[26px] h-[26px]"
          >
            <path
              d="M16 1V31M1 16H31M1.5 1.5L30.5 30.5M30.5 1.5L1.5 30.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="butt"
            />
          </svg>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[27px] font-bold tracking-[-0.05em] text-[#5aace9] leading-[0.75]">
            netpeak
          </span>
          <div className="flex flex-col items-start leading-[1.05] text-[#5aace9] text-[8px] font-medium mt-0.5 w-[58px]">
            <span>marketing</span>
            <span>partner</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3.5 md:gap-4 select-none ${
        compact ? 'mb-6' : 'mb-12 md:mb-20'
      }`}
    >
      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#5aace9] rounded-[2px] flex items-center justify-center shrink-0 overflow-hidden">
        <svg
          width="48"
          height="48"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-11 h-11 md:w-[52px] md:h-[52px]"
        >
          <path
            d="M16 1V31M1 16H31M1.5 1.5L30.5 30.5M30.5 1.5L1.5 30.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="butt"
          />
        </svg>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[42px] md:text-[54px] font-bold tracking-[-0.05em] text-[#5aace9] leading-[0.75]">
          netpeak
        </span>
        <div className="flex flex-col items-start leading-[1.05] text-[#5aace9] text-[13px] md:text-[15px] font-medium mt-1.5 w-[92px] md:w-[115px]">
          <span>marketing</span>
          <span>partner</span>
        </div>
      </div>
    </div>
  );
}
