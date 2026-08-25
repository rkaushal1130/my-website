import React from 'react';
import { Users, Lightbulb, Target, Sparkles } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const CultureSection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <Badge>OUR CULTURE</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Curiosity Drives Everything We Do
          </h2>

          <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed font-normal">
            We foster an environment where bold experimentation, rapid iteration, and intellectual honesty thrive.
          </p>
        </div>

        {/* Large AI Culture Visual Container */}
        <div className="relative rounded-[28px] bg-gradient-to-b from-[#101010] via-[#0A0A0A] to-[#050505] border border-[#242424] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#FF1F26]/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          {/* Culture Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-[#050505] border border-[#242424] hover:border-[#FF1F26]/50 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-[#141416] border border-[#242424] group-hover:border-[#FF1F26] flex items-center justify-center text-[#FF1F26] mb-4">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-[#FF1F26] uppercase font-bold">01 / AUTONOMY</div>
              <div className="text-base font-bold text-white mt-1">High Trust & Freedom</div>
              <p className="text-xs text-[#A7A7A7] mt-2 leading-relaxed">
                We hire exceptional talent and give you full ownership to lead critical engineering initiatives.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#050505] border border-[#242424] hover:border-[#FF1F26]/50 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-[#141416] border border-[#242424] group-hover:border-[#FF1F26] flex items-center justify-center text-[#FF1F26] mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-[#FF1F26] uppercase font-bold">02 / EXPERIMENTATION</div>
              <div className="text-sm font-bold text-white mt-1">Rapid Prototyping</div>
              <p className="text-xs text-[#A7A7A7] mt-2 leading-relaxed">
                Test novel neural architectures without bureaucratic hesitation. Ship fast, learn, and iterate.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#050505] border border-[#242424] hover:border-[#FF1F26]/50 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-[#141416] border border-[#242424] group-hover:border-[#FF1F26] flex items-center justify-center text-[#FF1F26] mb-4">
                <Target className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-[#FF1F26] uppercase font-bold">03 / MASTERY</div>
              <div className="text-sm font-bold text-white mt-1">Continuous Evolution</div>
              <p className="text-xs text-[#A7A7A7] mt-2 leading-relaxed">
                Generous learning stipends, conference passes, and access to the world's most capable compute clusters.
              </p>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
};

export default CultureSection;
