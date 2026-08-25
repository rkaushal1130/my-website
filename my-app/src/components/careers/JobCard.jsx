import React from 'react';
import { MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Badge from '../common/Badge';

const JobCard = ({ job, onApply }) => {
  const employmentType = job.employmentType || job.type || 'Full-time';

  return (
    <div className="group relative p-6 sm:p-8 rounded-[22px] bg-[#101010] border border-[#242424] hover:border-[#FF1F26]/60 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden text-left">
      {/* Red Glowing Hover Ambient */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF1F26]/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Header: Department & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <Badge className="bg-[#050505] text-[#FF3030] border-[#242424] group-hover:border-[#FF1F26]/40">
            {(job.department || 'ENGINEERING').toUpperCase()}
          </Badge>

          <div className="flex items-center gap-3 text-xs font-mono text-[#737373]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF1F26]" />
              {job.location || 'Remote'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#A7A7A7]" />
              {employmentType}
            </span>
          </div>
        </div>

        {/* 1. Job Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
          {job.title}
        </h3>

        {/* 2. Description */}
        <p className="text-sm text-[#A7A7A7] leading-relaxed font-normal mb-4">
          {job.description}
        </p>

        {/* 3. Requirements (if available) */}
        {job.requirements && (
          <div className="mb-6 p-3.5 rounded-xl bg-[#08080A] border border-[#1E1E22] text-xs text-[#888888] space-y-1.5">
            <div className="font-semibold text-[#CCCCCC] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1F26]" />
              <span>Key Requirements</span>
            </div>
            <p className="line-clamp-2 text-[#9E9E9E]">{job.requirements}</p>
          </div>
        )}

        {/* Salary Range or Tags */}
        {job.salaryRange && (
          <div className="mb-4">
            <span className="text-xs font-mono text-[#FF3030] font-medium">
              {job.salaryRange}
            </span>
          </div>
        )}
      </div>

      {/* Footer & Apply Button */}
      <div className="pt-4 border-t border-[#242424] flex items-center justify-between">
        <span className="text-xs font-mono text-[#737373]">
          Full Benefits + Equity
        </span>

        {/* Apply Button */}
        <button
          type="button"
          onClick={() => onApply(job)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#050505] border border-[#242424] group-hover:border-[#FF1F26] group-hover:bg-[#FF1F26] text-xs sm:text-sm font-semibold text-white transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,31,38,0.4)] cursor-pointer"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
