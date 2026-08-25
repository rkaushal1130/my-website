import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  icon = true,
  customIcon,
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 select-none group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF1F26] focus:ring-offset-2 focus:ring-offset-[#050505]';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 rounded-lg gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-lg gap-2',
    lg: 'text-base px-7 py-3.5 rounded-xl gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#FF1F26] hover:bg-[#FF2B30] text-white shadow-[0_0_20px_rgba(255,31,38,0.3)] hover:shadow-[0_0_30px_rgba(255,31,38,0.55)] active:scale-[0.98]',
    secondary: 'bg-transparent text-white border border-[#242424] hover:border-[#FF1F26] hover:bg-[#FF1F26]/10 active:scale-[0.98]',
    outlineRed: 'bg-transparent text-white border border-[#FF1F26] hover:bg-[#FF1F26] shadow-[0_0_15px_rgba(255,31,38,0.2)] hover:shadow-[0_0_25px_rgba(255,31,38,0.5)] active:scale-[0.98]',
    ghost: 'bg-transparent text-[#B5B5B5] hover:text-white hover:bg-white/5 active:scale-[0.98]',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  const iconElement = customIcon ? (
    customIcon
  ) : icon ? (
    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
    <button type={type} onClick={onClick} disabled={disabled} className={combinedStyles} {...props}>
      <span>{children}</span>
      {iconElement}
    </button>
  );
};

export default Button;
