import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import { servicesList } from '../../data/servicesData';

const ServicesGrid = ({ onOpenDemo }) => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#030303]">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#FF1F26]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge>WHAT WE DELIVER</Badge>

          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Specialized AI Capabilities
          </h2>

          <p className="text-sm sm:text-base text-[#A7A7A7] font-normal leading-relaxed">
            Engineered from ground up for enterprise reliability, high throughput, and strict security standards.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="p-5 sm:p-7 rounded-[22px] bg-[#0A0A0D] border border-[#222226] hover:border-[#FF1F26]/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(255,31,38,0.18)] group flex flex-col justify-between"
              >
                <div>
                  
                  {/* Top Bar: Icon, Number & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#141418] border border-[#26262B] group-hover:border-[#FF1F26] flex items-center justify-center text-[#FF1F26] transition-all duration-300 group-hover:scale-110 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#121216] border border-[#222] text-[11px] font-medium text-[#FF3030]">
                        {service.badge}
                      </span>
                      <span className="text-xs font-bold text-[#555] group-hover:text-[#FF1F26] transition-colors">
                        {service.number}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-[#FF1F26] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <div className="text-xs text-[#FF3030] font-medium mb-3">
                    {service.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Bullet Features */}
                  <div className="space-y-2 pt-4 border-t border-[#1C1C22]">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#8A8A8A]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1F26] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card Action */}
                <div className="pt-6 mt-6 border-t border-[#1C1C22]">
                  <button
                    type="button"
                    onClick={onOpenDemo}
                    className="w-full py-2.5 rounded-xl bg-[#121216] hover:bg-[#FF1F26] border border-[#26262B] hover:border-[#FF1F26] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 group-hover:shadow-[0_0_15px_rgba(255,31,38,0.25)] cursor-pointer"
                  >
                    <span>Request Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

export default ServicesGrid;
