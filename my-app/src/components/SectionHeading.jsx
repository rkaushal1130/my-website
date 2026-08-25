import React from 'react';

const SectionHeading = ({
  badge,
  title,
  highlight,
  titlePrefix = '',
  titleSuffix = '',
  description,
  align = 'center', // 'center' | 'left'
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
}) => {
  const isCentered = align === 'center';

  return (
    <div className={`flex flex-col ${isCentered ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#242424] text-xs font-semibold tracking-wider text-[#FF2B30] uppercase mb-4 shadow-[0_0_15px_rgba(255,31,38,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26] animate-pulse"></span>
          {badge}
        </div>
      )}

      {title ? (
        <h2 className={`font-bold tracking-tight text-white ${
          size === 'lg' ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl' :
          size === 'sm' ? 'text-2xl sm:text-3xl' :
          'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
        } leading-[1.15]`}>
          {title}
        </h2>
      ) : (
        <h2 className={`font-bold tracking-tight text-white ${
          size === 'lg' ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl' :
          size === 'sm' ? 'text-2xl sm:text-3xl' :
          'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
        } leading-[1.15]`}>
          {titlePrefix}{' '}
          {highlight && <span className="text-[#FF1F26] drop-shadow-[0_0_25px_rgba(255,31,38,0.4)]">{highlight}</span>}{' '}
          {titleSuffix}
        </h2>
      )}

      {description && (
        <p className={`mt-4 text-[#B5B5B5] leading-relaxed max-w-2xl text-sm sm:text-base md:text-lg font-normal ${
          isCentered ? 'mx-auto' : ''
        }`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
