import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable content / section loading component with NeverQuit.ai black & red theme
 */
const Loader = ({
  text = 'Loading data...',
  size = 'md',
  skeletonCount = 0,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`w-full py-12 flex flex-col items-center justify-center gap-3 text-[#A8A8A8] ${className}`}>
      <div className="relative flex items-center justify-center">
        <Loader2 className={`${sizeClasses[size] || sizeClasses.md} animate-spin text-[#FF1F26]`} />
      </div>
      {text && <p className="text-xs sm:text-sm font-medium tracking-wide text-[#A8A8A8]">{text}</p>}

      {skeletonCount > 0 && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#101012] border border-[#242424] animate-pulse space-y-4 text-left"
            >
              <div className="flex justify-between items-center">
                <div className="w-20 h-5 bg-[#1C1C22] rounded-full" />
                <div className="w-16 h-4 bg-[#1C1C22] rounded" />
              </div>
              <div className="w-3/4 h-6 bg-[#1C1C22] rounded" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-[#1C1C22] rounded" />
                <div className="w-4/5 h-4 bg-[#1C1C22] rounded" />
              </div>
              <div className="pt-4 border-t border-[#242424] flex justify-between items-center">
                <div className="w-20 h-4 bg-[#1C1C22] rounded" />
                <div className="w-8 h-8 bg-[#1C1C22] rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Loader;
