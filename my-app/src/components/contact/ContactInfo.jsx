import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Badge from '../common/Badge';
import IconBox from '../common/IconBox';
import SocialLinks from './SocialLinks';

const ContactInfo = () => {
  const contactCards = [
    {
      icon: Mail,
      title: 'Email',
      value: 'kaushalrahul1130@gmail.com',
      href: 'mailto:kaushalrahul1130@gmail.com',
      description: 'We usually respond within one business day.',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 9015323903',
      href: 'tel:9015323903',
      description: 'Monday – Friday, 9:00 AM – 6:00 PM IST',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Sundernagar, Distt. Mandi, Himachal Pradesh 175002',
      href: 'https://maps.google.com/?q=Sundernagar,+Distt.+Mandi,+Himachal+Pradesh+175002',
      description: 'Global AI engineering and operations headquarters.',
    },
  ];

  return (
    <div className="space-y-8 text-left [perspective:1000px]">
      <div>
        <Badge className="mb-4">LET'S TALK</Badge>

        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-tight mb-3">
          Start A Conversation
        </h2>

        <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed font-normal">
          Whether you're looking to automate a process, build an AI product or simply explore an idea, our team is ready to help.
        </p>
      </div>

      <div className="space-y-4">
        {contactCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-[22px] bg-[#101010]/95 border border-[#242424] hover:border-[#FF1F26]/60 backdrop-blur-md transition-all duration-300 hover:shadow-[0_15px_35px_rgba(255,31,38,0.18)] hover:-translate-y-1.5 hover:[transform:rotateX(2deg)_rotateY(-1.5deg)] flex items-start gap-4 group"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                <IconBox icon={Icon} size="md" />
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[#FF3030] font-bold">
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

      <SocialLinks />
    </div>
  );
};

export default ContactInfo;
