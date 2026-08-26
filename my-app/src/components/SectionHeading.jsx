import React from 'react';

const SectionHeading = ({
  badge,
  eyebrow,
  title,
  highlight,
  titlePrefix = '',
  titleSuffix = '',
  description,
  align = 'center',
  className = '',
  size = 'md',
}) => {
  const isCentered = align === 'center';
  const tagText = badge || eyebrow;

  return (
    <div className={`flex flex-col ${isCentered ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {tagText && (
        <div className={`flex items-center ${isCentered ? 'justify-center' : 'justify-start'} gap-3 sm:gap-4 text-[13px] sm:text-sm font-sans font-semibold uppercase tracking-wider text-white mb-4 select-none`}>
          <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
          <span className="tracking-wider text-white">{tagText}</span>
          <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
        </div>
      )}

      {title ? (
        <h2 className={`font-semibold tracking-tight text-white ${
          size === 'lg' ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl' :
          size === 'sm' ? 'text-2xl sm:text-3xl' :
          'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
        } leading-[1.15]`}>
          {highlight ? (
            <>
              {title.replace(highlight, '')}{' '}
              <span className="text-[#FF1F26] text-glow inline-block">{highlight}</span>
            </>
          ) : (
            title
          )}
        </h2>
      ) : (
        <h2 className={`font-semibold tracking-tight text-white ${
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
