import React from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';

const JobCard = ({ job, onApply }) => {
  return (
    <div className="group relative p-6 sm:p-8 rounded-[22px] bg-[#101010] border border-[#242424] hover:border-[#FF1F26]/60 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 hover:[transform:rotateX(2deg)_rotateY(-2deg)] flex flex-col justify-between overflow-hidden text-left">
      
      {/* Red Glowing Hover Ambient */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF1F26]/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <Badge className="bg-[#050505] text-[#FF3030] border-[#242424] group-hover:border-[#FF1F26]/40">
            {job.department.toUpperCase()}
          </Badge>

          <div className="flex items-center gap-3 text-xs font-mono text-[#737373]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF1F26]" />
              {job.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#A7A7A7]" />
              {job.type}
            </span>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
          {job.title}
        </h3>

        <p className="text-sm text-[#A7A7A7] leading-relaxed font-normal mb-6">
          {job.description}
        </p>

        {job.tags && job.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {job.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-[#050505] border border-[#1D1D1D] text-[11px] font-mono text-[#737373] group-hover:border-[#242424] group-hover:text-[#A7A7A7] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-[#242424] flex items-center justify-between">
        <span className="text-xs font-mono text-[#737373]">
          Full Benefits + Equity
        </span>

        <button
          type="button"
          onClick={() => onApply(job)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050505] border border-[#242424] group-hover:border-[#FF1F26] group-hover:bg-[#FF1F26] text-xs sm:text-sm font-semibold text-white transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,31,38,0.4)] cursor-pointer"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

    </div>
  );
};

export default JobCard;
