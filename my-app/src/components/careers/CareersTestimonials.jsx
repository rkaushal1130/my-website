import React from 'react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const testimonials = [
  {
    quote:
      '"Avauraa has given me the freedom to explore, learn and grow. The team here feels like a family."',
    name: 'Simran K.',
    role: 'UI/UX Designer',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    quote:
      '"Working at Avauraa has been an incredible journey. The projects are challenging and the culture is amazing."',
    name: 'Rahul S.',
    role: 'Front-End Developer',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    quote:
      '"I love how ideas are valued here. It\'s a place where you can truly make an impact."',
    name: 'Neha P.',
    role: 'Digital Marketing Executive',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
  },
];

const CareersTestimonials = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#141416] border-t border-[#222226]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-radial-glow opacity-30 pointer-events-none" />

      <Container className="relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <Badge>VOICES FROM OUR TEAM</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Real People. Real Stories.
          </h2>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch text-left">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl sm:rounded-3xl bg-[#0D0D10] border border-[#222226] p-7 sm:p-8 hover:border-[#FF1F26]/50 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Quote */}
              <p className="text-sm sm:text-base text-[#D4D4D8] leading-relaxed font-normal mb-6 italic">
                {item.quote}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#1C1C22]">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#33333C] group-hover:border-[#FF1F26] transition-colors"
                />
                <div>
                  <div className="text-sm sm:text-base font-bold text-white leading-tight">
                    {item.name}
                  </div>
                  <div className="text-xs text-[#8A8A92] font-medium mt-0.5">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CareersTestimonials;
