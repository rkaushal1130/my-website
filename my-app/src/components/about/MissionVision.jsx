import React from 'react';
import { Target, Eye, Sparkles } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import IconBox from '../common/IconBox';

const MissionVision = () => {
  return (
    <section className="py-24 lg:py-32 relative">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <Badge>OUR NORTH STAR</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Mission & Vision
          </h2>

          <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed font-normal">
            Driving the global standard for reliable, high-yield enterprise artificial intelligence.
          </p>
        </div>

        {/* 3D Perspective Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 [perspective:1200px]">
          
          {/* Mission Card (3D Tilt & Glass Material) */}
          <div className="relative group p-8 sm:p-10 rounded-[24px] bg-[#101010]/90 border border-[#242424] hover:border-[#FF1F26]/60 backdrop-blur-md transition-all duration-400 shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(255,31,38,0.2)] hover:-translate-y-2 hover:[transform:rotateX(2.5deg)_rotateY(-2deg)] flex flex-col justify-between overflow-hidden">
            
            {/* Ambient Red Edge Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF1F26]/6 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/40 to-transparent" />

            <div>
              <div className="mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                <IconBox icon={Target} size="lg" />
              </div>

              <span className="text-xs font-mono uppercase tracking-wider text-[#FF3030] font-bold block mb-2">
                MISSION STATEMENT
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Make Powerful AI Accessible, Practical & Valuable
              </h3>

              <p className="text-base text-[#A7A7A7] leading-relaxed font-normal">
                Make powerful AI technology accessible, practical and valuable for modern businesses through dependable architecture and deep engineering discipline.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1D1D1D] flex items-center justify-between text-xs font-mono text-[#737373]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26] animate-ping" />
                Outcome Focused
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF1F26]" />
            </div>
          </div>

          {/* Vision Card (3D Tilt & Glass Material) */}
          <div className="relative group p-8 sm:p-10 rounded-[24px] bg-[#101010]/90 border border-[#242424] hover:border-[#FF1F26]/60 backdrop-blur-md transition-all duration-400 shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(255,31,38,0.2)] hover:-translate-y-2 hover:[transform:rotateX(2.5deg)_rotateY(2deg)] flex flex-col justify-between overflow-hidden">
            
            {/* Ambient Red Edge Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF1F26]/6 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/40 to-transparent" />

            <div>
              <div className="mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                <IconBox icon={Eye} size="lg" />
              </div>

              <span className="text-xs font-mono uppercase tracking-wider text-[#FF3030] font-bold block mb-2">
                OUR VISION
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Pioneering The Intelligent Enterprise
              </h3>

              <p className="text-base text-[#A7A7A7] leading-relaxed font-normal">
                Build a future where intelligent technology enables every business to move faster and smarter in an AI-native world.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1D1D1D] flex items-center justify-between text-xs font-mono text-[#737373]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26] animate-ping" />
                Future Proofing
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF1F26]" />
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
};

export default MissionVision;
