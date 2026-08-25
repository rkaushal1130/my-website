import React from 'react';

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  number,
  className = '',
  badge,
}) => {
  return (
    <div className={`relative group p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#242424] hover:border-[#FF1F26]/60 transition-all duration-500 hover:shadow-[0_10px_35px_-10px_rgba(255,31,38,0.2)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden ${className}`}>
      {/* Background glow on hover */}
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#FF1F26]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div>
        <div className="flex items-center justify-between mb-6">
          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-[#0B0B0B] border border-[#242424] group-hover:border-[#FF1F26]/50 flex items-center justify-center text-[#FF1F26] group-hover:shadow-[0_0_15px_rgba(255,31,38,0.3)] transition-all duration-300">
              <Icon className="w-6 h-6 stroke-[1.75]" />
            </div>
          )}
          {number && (
            <span className="text-2xl font-extrabold text-[#242424] group-hover:text-[#FF1F26]/40 transition-colors duration-300 font-mono">
              {number}
            </span>
          )}
          {badge && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FF1F26]/10 text-[#FF2B30] border border-[#FF1F26]/30">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-200">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-[#B5B5B5] leading-relaxed font-normal">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[#242424]/60 flex items-center gap-2 text-xs font-medium text-[#737373] group-hover:text-[#FF1F26] transition-colors duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-[#242424] group-hover:bg-[#FF1F26] transition-colors duration-300" />
        <span>Enterprise Ready</span>
      </div>
    </div>
  );
};

export default FeatureCard;
