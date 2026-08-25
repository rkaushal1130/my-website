import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';

const ContactInfo = () => {
  const contactCards = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'kaushalrahul1130@gmail.com',
      href: 'mailto:kaushalrahul1130@gmail.com',
      description: 'We usually respond within one business day.',
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+91 9015323903',
      href: 'tel:9015323903',
      description: 'Monday – Friday, 9:00 AM – 6:00 PM IST',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Sundernagar, Distt. Mandi, Himachal Pradesh 175002',
      href: 'https://maps.google.com/?q=Sundernagar,+Distt.+Mandi,+Himachal+Pradesh+175002',
      description: 'Global AI engineering and operations headquarters.',
    },
  ];

  return (
    <div className="space-y-8 text-left">
      <div>
        {/* Small Red Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#252525] text-xs font-semibold tracking-wider text-[#FF1F26] uppercase shadow-sm mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26]" />
          LET'S TALK
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
          Start A Conversation
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed font-normal">
          Whether you're looking to automate a process, build an AI product or simply explore an idea, our team is ready to help.
        </p>
      </div>

      {/* 3 Contact Cards */}
      <div className="space-y-4">
        {contactCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#111111] border border-[#252525] hover:border-[#FF1F26]/50 transition-all duration-300 flex items-start gap-4 group shadow-sm hover:shadow-[0_8px_25px_-5px_rgba(255,31,38,0.15)]"
            >
              <div className="w-11 h-11 rounded-xl bg-[#050505] border border-[#252525] group-hover:border-[#FF1F26] flex items-center justify-center text-[#FF1F26] shrink-0 transition-colors shadow-sm">
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#737373]">
                  {card.title}
                </div>
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="text-base font-semibold text-white hover:text-[#FF1F26] transition-colors inline-block mt-0.5"
                  >
                    {card.value}
                  </a>
                ) : (
                  <div className="text-base font-semibold text-white mt-0.5">
                    {card.value}
                  </div>
                )}
                <div className="text-xs text-[#737373] mt-1 font-normal">
                  {card.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Media Links */}
      <SocialLinks />
    </div>
  );
};

export default ContactInfo;
