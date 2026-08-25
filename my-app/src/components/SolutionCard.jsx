import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionCard = ({
  icon: Icon,
  title,
  description,
  features = [],
  link = '/contact',
  badge,
  className = '',
}) => {
  return (
    <div className={`relative group p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#242424] hover:border-[#FF1F26]/60 transition-all duration-500 hover:shadow-[0_12px_40px_-10px_rgba(255,31,38,0.22)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${className}`}>
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#FF1F26]/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-13 h-13 p-3 rounded-xl bg-[#0B0B0B] border border-[#242424] group-hover:border-[#FF1F26]/60 flex items-center justify-center text-[#FF1F26] group-hover:shadow-[0_0_20px_rgba(255,31,38,0.35)] transition-all duration-300">
            {Icon && <Icon className="w-7 h-7 stroke-[1.75]" />}
          </div>

          <div className="flex items-center gap-2">
            {badge && (
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FF1F26]/10 text-[#FF2B30] border border-[#FF1F26]/30">
                {badge}
              </span>
            )}
            <Link
              to={link}
              aria-label={`Learn more about ${title}`}
              className="w-9 h-9 rounded-full bg-[#0B0B0B] border border-[#242424] group-hover:border-[#FF1F26] group-hover:bg-[#FF1F26] flex items-center justify-center text-[#B5B5B5] group-hover:text-white transition-all duration-300 shadow-sm"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-200">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-[#B5B5B5] leading-relaxed mb-6 font-normal">
          {description}
        </p>

        {features.length > 0 && (
          <ul className="space-y-2.5 mb-6 pt-4 border-t border-[#242424]">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#B5B5B5]">
                <CheckCircle2 className="w-4 h-4 text-[#FF1F26] shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-4 border-t border-[#242424]/60">
        <Link
          to={link}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FF1F26] group-hover:text-[#FF2B30] hover:underline"
        >
          <span>Explore Architecture</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default SolutionCard;
