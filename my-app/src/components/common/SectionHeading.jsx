import React from 'react';
import Badge from './Badge';

const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
  size = 'md',
}) => {
  const isCentered = align === 'center';

  return (
    <div className={`flex flex-col ${isCentered ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {eyebrow && (
        <Badge className="mb-4">
          {eyebrow}
        </Badge>
      )}

      {title && (
        <h2 className={`font-bold tracking-tight text-white ${
          size === 'lg' ? 'text-4xl sm:text-5xl lg:text-6xl' :
          size === 'sm' ? 'text-2xl sm:text-3xl' :
          'text-3xl sm:text-4xl lg:text-[44px]'
        } leading-[1.12]`}>
          {highlight ? (
            <>
              {title.replace(highlight, '')}{' '}
              <span className="text-[#FF1F26] text-glow inline-block">{highlight}</span>
            </>
          ) : (
            title
          )}
        </h2>
      )}

      {description && (
        <p className={`mt-3.5 text-[#A7A7A7] leading-relaxed max-w-2xl text-base sm:text-lg font-normal ${
          isCentered ? 'mx-auto' : ''
        }`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
