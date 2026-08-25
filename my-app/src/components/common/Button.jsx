import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  icon = true,
  customIcon,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 select-none group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF1F26] focus:ring-offset-2 focus:ring-offset-[#050505] min-h-[44px]';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 rounded-xl gap-1.5 min-h-[40px]',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2 min-h-[44px]',
    lg: 'text-base px-7 py-3 rounded-xl gap-2.5 min-h-[48px]',
  };

  const variantStyles = {
    primary: 'bg-[#FF1F26] hover:bg-[#FF3030] text-white shadow-[0_0_20px_rgba(255,31,38,0.25)] hover:shadow-[0_0_30px_rgba(255,31,38,0.45)] hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-[#050505] text-white border border-[#333333] hover:border-[#FF1F26] hover:text-[#FF1F26] hover:shadow-[0_0_15px_rgba(255,31,38,0.2)] hover:-translate-y-0.5 active:translate-y-0',
    outline: 'bg-transparent text-white border border-[#242424] hover:border-[#FF1F26] hover:bg-[#FF1F26]/10 active:translate-y-0',
    ghost: 'bg-transparent text-[#A7A7A7] hover:text-white hover:bg-white/5 active:translate-y-0',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${
    disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  } ${className}`;

  const iconElement = loading ? (
    <Loader2 className="w-4 h-4 animate-spin shrink-0" />
  ) : customIcon ? (
    customIcon
  ) : icon ? (
    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
  ) : null;

  if (to) {
    return (
      <Link to={to} className={combinedStyles} {...props}>
        <span>{children}</span>
        {iconElement}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={combinedStyles} {...props}>
        <span>{children}</span>
        {iconElement}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedStyles}
      {...props}
    >
      <span>{children}</span>
      {iconElement}
    </button>
  );
};

export default Button;
