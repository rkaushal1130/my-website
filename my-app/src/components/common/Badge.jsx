import React from 'react';

const Badge = ({ children, className = '', pulse = true, icon: Icon, ...props }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101010] border border-[#242424] text-[11px] sm:text-xs font-semibold tracking-wider text-[#FF1F26] uppercase shadow-[0_0_12px_rgba(255,31,38,0.12)] select-none ${className}`}
      {...props}
    >
      {Icon ? (
        <Icon className="w-3.5 h-3.5 text-[#FF1F26]" />
      ) : pulse ? (
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26] animate-ping" />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26]" />
      )}
      <span>{children}</span>
    </div>
  );
};

export default Badge;
