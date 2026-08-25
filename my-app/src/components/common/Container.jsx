import React from 'react';

const Container = ({ children, className = '', size = 'default', ...props }) => {
  const sizeClasses = {
    default: 'max-w-[1680px]',
    narrow: 'max-w-[1200px]',
    compact: 'max-w-[960px]',
    wide: 'max-w-[1760px]',
    full: 'max-w-none w-full',
  };

  return (
    <div
      className={`w-full mx-auto px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 2xl:px-28 ${sizeClasses[size] || sizeClasses.default} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
