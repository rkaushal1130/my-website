import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button with integrated loading spinner state
 */
const ButtonLoader = ({
  isLoading = false,
  loadingText = 'Processing...',
  children,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none';

  const sizeClasses = {
    sm: 'px-3 py-1.5 rounded-lg text-xs gap-1.5',
    md: 'px-5 py-2.5 rounded-xl text-sm gap-2',
    lg: 'px-6 py-3.5 rounded-xl text-base gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-[#FF1F26] hover:bg-[#FF3030] text-white shadow-[0_0_20px_rgba(255,31,38,0.35)] hover:shadow-[0_0_30px_rgba(255,31,38,0.55)]',
    secondary: 'bg-[#18181C] hover:bg-[#222228] text-white border border-[#2A2A2A]',
    outline: 'bg-transparent border border-[#242424] hover:border-[#FF1F26] text-white',
    danger: 'bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-200',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${
        variantClasses[variant] || variantClasses.primary
      } ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-white" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonLoader;
