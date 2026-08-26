import React from 'react';
import { Search, X, Filter, Sparkles } from 'lucide-react';
import Container from '../common/Container';

const PortfolioFilters = ({
  categories = [
    'ALL',
    'AI & AUTOMATION',
    'WEB DEVELOPMENT',
    'UI/UX',
    'SAAS',
    'DIGITAL SOLUTIONS',
  ],
  activeCategory = 'ALL',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  totalCount = 0,
}) => {
  return (
    <div className="py-6 border-y border-white/[0.08] bg-[#0A0A0A]/95 backdrop-blur-xl sticky top-16 md:top-20 z-30 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
      <Container size="wide">
        
        <div className="flex flex-col xl:flex-row items-center justify-between gap-5">
          
          {/* Category Filter Pills */}
          <div
            role="tablist"
            aria-label="Portfolio Category Filters"
            className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 scrollbar-none"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mr-1 shrink-0 select-none">
              <Filter className="w-3.5 h-3.5 text-[#FF1F26]" />
              <span className="hidden sm:inline">Filter:</span>
            </div>

            {categories.map((cat) => {
              const isActive = activeCategory.toUpperCase() === cat.toUpperCase();
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer select-none border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1F26] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] ${
                    isActive
                      ? 'bg-[#FF1F26] text-white border-[#FF3030] shadow-[0_0_22px_rgba(255,31,38,0.4)] scale-100 font-extrabold'
                      : 'bg-[#0E0E14] text-white/90 border-white/[0.08] hover:text-white hover:border-white/[0.2] hover:bg-[#14141C] hover:shadow-[0_0_12px_rgba(255,31,38,0.1)]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box & Active Result Count */}
          <div className="flex items-center gap-3.5 w-full xl:w-auto justify-between xl:justify-end">
            
            {/* Live Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search solutions, stack, clients..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search case studies and technologies"
                className="w-full pl-9.5 pr-9 py-2.5 rounded-full bg-[#0E0E14] border border-white/[0.08] text-white placeholder-[#71717A] text-xs sm:text-sm focus:outline-none focus:border-[#FF1F26] focus:ring-1 focus:ring-[#FF1F26] transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Total Count Chip */}
            <div className="shrink-0 px-3.5 py-2.5 rounded-full bg-[#0E0E14] border border-white/[0.08] text-xs font-mono text-[#A1A1AA] select-none">
              <span className="text-[#FF1F26] font-bold">{totalCount}</span> Solutions
            </div>

          </div>

        </div>

      </Container>
    </div>
  );
};

export default PortfolioFilters;
