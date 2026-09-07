import React from 'react';
import Container from '../common/Container';
import brandLogo from '../../assets/images/logo.png';

const photos = [
  {
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    badge: 'GOOD PEOPLE',
    subBadge: 'GREAT PROJECTS',
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    isLogoCard: true,
    title: 'Avauraa',
    subBadge: 'Ideas to Impact',
  },
  {
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    badge: 'Better Solutions',
    subBadge: 'A Brighter Tomorrow',
  },
  {
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    badge: 'WORK CREATE',
    subBadge: 'COLLABORATE GROW',
  },
];

const CareersLifeAtAvaura = () => {
  return (
    <section id="life-at-avaura" className="py-20 sm:py-28 relative overflow-hidden bg-[#171717] scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-radial-glow opacity-30 pointer-events-none" />

      <Container className="relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Life at Avauraa
          </h2>

          <p className="text-base sm:text-lg text-[#A7A7A7] font-normal leading-relaxed">
            A glimpse of our work culture, people and moments that make Avauraa special.
          </p>
        </div>

        {/* 4 Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className="relative h-[320px] sm:h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#24242A] bg-[#0E0E12] group shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              <img
                src={item.image}
                alt={item.subBadge}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D]/95 via-[#0A0A0D]/40 to-transparent" />

              {/* Text / Logo Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left z-10">
                {item.isLogoCard ? (
                  <div className="space-y-2">
                    <img
                      src={brandLogo}
                      alt="Avauraa"
                      className="h-8 w-auto object-contain brightness-110"
                    />
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#FF1F26]">
                      {item.subBadge}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm font-black uppercase tracking-wider text-white leading-tight">
                      {item.badge}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#FF1F26] mt-0.5">
                      {item.subBadge}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CareersLifeAtAvaura;
