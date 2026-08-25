import React from 'react';
import { FolderGit2 } from 'lucide-react';

/**
 * Reusable Empty State component for API-connected UI views
 */
const EmptyState = ({
  icon: Icon = FolderGit2,
  title = 'No records available',
  description = 'There are currently no items to display.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`py-16 px-6 text-center rounded-2xl bg-[#0D0D10] border border-[#242424] max-w-md mx-auto animate-in fade-in duration-200 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-[#18181C] text-[#737373] flex items-center justify-center mx-auto mb-4 border border-[#242424]">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-lg font-bold text-white mb-1.5 tracking-tight">{title}</h4>
      <p className="text-xs text-[#A8A8A8] leading-relaxed mb-5">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-4 py-2 rounded-xl bg-[#FF1F26] hover:bg-[#FF3030] text-white text-xs font-semibold shadow-[0_0_15px_rgba(255,31,38,0.35)] transition-all cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
