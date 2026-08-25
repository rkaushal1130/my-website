import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Reusable Error Message banner / card for API-connected UI components
 */
const ErrorMessage = ({
  title = 'Unable to Load Data',
  message,
  errors = [],
  onRetry,
  variant = 'card', // 'card' | 'banner' | 'inline'
  className = '',
}) => {
  if (!message && (!errors || errors.length === 0)) return null;

  if (variant === 'banner' || variant === 'inline') {
    return (
      <div
        className={`p-3.5 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex flex-col gap-1.5 animate-in fade-in duration-200 text-left ${className}`}
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#FF1F26]" />
          <span className="font-semibold">{message || title}</span>
        </div>
        {errors && errors.length > 0 && (
          <ul className="list-disc list-inside pl-1 text-[11px] text-[#FF9E9E] space-y-0.5">
            {errors.map((err, idx) => (
              <li key={idx}>
                {err.field && <span className="capitalize font-medium">{err.field}: </span>}
                {err.message || String(err)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div
      className={`py-12 px-6 text-center rounded-2xl bg-[#0D0D10] border border-red-900/50 max-w-md mx-auto space-y-4 animate-in fade-in duration-200 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-red-950/50 text-[#FF1F26] border border-red-800 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,31,38,0.2)]">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="text-lg font-bold text-white tracking-tight">{title}</h4>
      <p className="text-xs text-[#A8A8A8] leading-relaxed">{message}</p>

      {errors && errors.length > 0 && (
        <div className="p-3 rounded-xl bg-[#050505] border border-red-950 text-left text-[11px] text-red-300">
          <ul className="list-disc list-inside space-y-0.5">
            {errors.map((err, idx) => (
              <li key={idx}>
                {err.field && <span className="capitalize font-medium">{err.field}: </span>}
                {err.message || String(err)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {onRetry && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF1F26] hover:bg-[#FF3030] text-white text-xs font-semibold shadow-[0_0_15px_rgba(255,31,38,0.35)] transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
