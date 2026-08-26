import React from 'react';

const Badge = ({ children, className = '', align = 'center', icon: Icon, ...props }) => {
  const isCentered = align === 'center';

  return (
    <div
      className={`flex items-center ${isCentered ? 'justify-center' : 'justify-start'} gap-3 sm:gap-4 text-[13px] sm:text-sm font-sans font-semibold uppercase tracking-wider text-white select-none ${className}`}
      {...props}
    >
      <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
      <span className="tracking-wider text-white flex items-center gap-1.5">
        {Icon && <Icon className="w-4 h-4 text-[#FF1F26]" />}
        {children}
      </span>
      <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
    </div>
  );
};

export default Badge;
