import React from 'react';

const JobFilters = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="w-full flex justify-center mb-12">
      {/* Mobile scrollable + Desktop centered */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full pb-2 px-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
              activeCategory === cat
                ? 'bg-[#FF1F26] text-white shadow-[0_0_15px_rgba(255,31,38,0.35)]'
                : 'bg-[#101010] text-[#A7A7A7] border border-[#242424] hover:border-[#FF1F26] hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobFilters;
