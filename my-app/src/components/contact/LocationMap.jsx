import React, { useState } from 'react';
import { ArrowRight, Compass, MapPin, Navigation, Phone, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const LocationMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#030303]">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF1F26]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <Container size="wide">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <Badge icon={Compass}>OFFICE & OPERATIONS</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Our Global Location
          </h2>

          <p className="text-base text-[#A7A7A7] font-normal leading-relaxed">
            Headquartered in Sundernagar, Distt. Mandi, Himachal Pradesh 175002 — engineering intelligent artificial intelligence systems for global enterprise scale.
          </p>
        </div>

        {/* Interactive Map & Address Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address & Location Info Card (5 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-[#0A0A0D] border border-[#222226] hover:border-[#FF1F26]/50 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-6 text-left">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Headquarters Active</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                NeverquiT <span className="text-[#FF1F26]">AI</span>
              </h3>
              
              <p className="text-xs text-[#FF3030] font-medium mb-6">
                Advanced AI & Multi-Agent Engineering Center
              </p>

              <div className="space-y-4 pt-4 border-t border-[#1C1C22]">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#141418] border border-[#26262B] flex items-center justify-center text-[#FF1F26] shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#737373] uppercase font-bold tracking-wider">Official Address</div>
                    <div className="text-base font-semibold text-white mt-0.5">Sundernagar, Distt. Mandi</div>
                    <div className="text-xs text-[#8A8A8A] mt-0.5">Himachal Pradesh 175002, India</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#141418] border border-[#26262B] flex items-center justify-center text-[#FF1F26] shrink-0 mt-0.5 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#737373] uppercase font-bold tracking-wider">Email Inquiry</div>
                    <a href="mailto:kaushalrahul1130@gmail.com" className="text-sm font-semibold text-white hover:text-[#FF1F26] transition-colors mt-0.5 block">
                      kaushalrahul1130@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#141418] border border-[#26262B] flex items-center justify-center text-[#FF1F26] shrink-0 mt-0.5 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#737373] uppercase font-bold tracking-wider">Direct Phone</div>
                    <a href="tel:9015323903" className="text-sm font-semibold text-white hover:text-[#FF1F26] transition-colors mt-0.5 block">
                      +91 9015323903
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1C1C22] space-y-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Sundernagar,+Distt.+Mandi,+Himachal+Pradesh+175002"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#FF1F26] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px] text-[#737373] px-1 font-medium">
                <span>COORDINATES: 31.5326° N, 76.8906° E</span>
                <span className="text-white">UTC +5:30</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Embedded Interactive Google Map (8 cols) */}
          <div className="lg:col-span-8 relative rounded-2xl sm:rounded-3xl bg-[#0A0A0D] border border-[#222226] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] min-h-[340px] sm:min-h-[460px] flex flex-col group">
            
            {/* Top Bar on Map */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pointer-events-none">
              <div className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-[#050505]/90 border border-[#26262B] backdrop-blur-md text-[11px] sm:text-xs font-semibold text-white flex items-center gap-2 shadow-lg w-fit">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1F26] shrink-0" />
                <span>Sundernagar, Himachal Pradesh — HQ Location</span>
              </div>

              <a
                href="https://maps.google.com/?q=Sundernagar,+Distt.+Mandi,+Himachal+Pradesh+175002"
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-[#050505]/90 hover:bg-[#FF1F26] border border-[#26262B] hover:border-[#FF1F26] backdrop-blur-md text-[11px] sm:text-xs font-semibold text-[#A7A7A7] hover:text-white flex items-center gap-1.5 transition-all shadow-lg w-fit"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Live Interactive Map IFrame with High-Contrast Dark Custom Styling */}
            <div className="relative w-full h-full min-h-[340px] sm:min-h-[460px] flex-grow overflow-hidden">
              <iframe
                title="NeverquiT AI Headquarters Sundernagar Map"
                src="https://maps.google.com/maps?q=Sundernagar,%20Distt.%20Mandi,%20Himachal%20Pradesh%20175002&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  minHeight: '340px',
                  filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)',
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                onLoad={() => setMapLoaded(true)}
              />
            </div>

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 pointer-events-none border border-[#26262B] rounded-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0A0A0D] to-transparent pointer-events-none" />

          </div>

        </div>

      </Container>
    </section>
  );
};

export default LocationMap;
