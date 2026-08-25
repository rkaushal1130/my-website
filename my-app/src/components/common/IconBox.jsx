import React from 'react';

const IconBox = ({
  icon: Icon,
  size = 'md',
  className = '',
  glow = true,
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-12 h-12 rounded-xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5 sm:w-6 sm:h-6',
  };

  return (
    <div
      className={`bg-[#050505] border border-[#242424] flex items-center justify-center text-[#FF1F26] transition-all duration-300 ${
        glow ? 'group-hover:border-[#FF1F26]/70 group-hover:shadow-[0_0_15px_rgba(255,31,38,0.25)]' : ''
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {Icon ? <Icon className={`${iconSizes[size] || iconSizes.md} stroke-[1.75]`} /> : children}
    </div>
  );
};

export default IconBox;
