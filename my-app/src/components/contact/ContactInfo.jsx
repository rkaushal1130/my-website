import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Badge from '../common/Badge';
import SocialLinks from './SocialLinks';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { WHATSAPP_URL, WHATSAPP_NUMBER } from '../../data/navigation';

const ContactInfo = () => {
  const contactCards = [
    {
      icon: WhatsAppIcon,
      title: 'WhatsApp Direct',
      value: `+91 ${WHATSAPP_NUMBER}`,
      href: WHATSAPP_URL,
      description: 'Instant chat with our engineering leadership. Click to message directly.',
      isWhatsApp: true,
      badgeText: 'Chat Now',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'admin@avauraai.com',
      href: 'mailto:admin@avauraai.com',
      description: 'We usually respond within one business day.',
    },
    {
      icon: Phone,
      title: 'Phone',
      numbers: [
        { value: '+91 9015323903', href: 'tel:9015323903' },
        { value: '+91 7719561597', href: 'tel:7719561597' },
      ],
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

        <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-tight mb-3">
          Start A Conversation
        </h2>

        <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed font-normal">
          Whether you're looking to automate a process, build an AI product or simply explore an idea, our team is ready to help.
        </p>
      </div>

      <div className="space-y-4">
        {contactCards.map((card, idx) => {
          const Icon = card.icon;
          const isWhatsApp = card.isWhatsApp;

          return (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-[22px] bg-[#171717]/95 border backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:[transform:rotateX(2deg)_rotateY(-1.5deg)] flex items-start gap-3.5 sm:gap-4 group ${
                isWhatsApp
                  ? 'border-[#25D366]/30 hover:border-[#25D366] hover:shadow-[0_15px_35px_rgba(37,211,102,0.2)]'
                  : 'border-[#242424] hover:border-[#FF1F26]/60 hover:shadow-[0_15px_35px_rgba(255,31,38,0.18)]'
              }`}
            >
              <div
                className={`transition-transform duration-300 group-hover:scale-110 shrink-0 ${
                  isWhatsApp ? 'text-[#25D366]' : ''
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-[#0D0D0D] border flex items-center justify-center transition-all duration-300 ${
                    isWhatsApp
                      ? 'border-[#25D366]/40 text-[#25D366] group-hover:border-[#25D366] group-hover:shadow-[0_0_15px_rgba(37,211,102,0.35)]'
                      : 'border-[#242424] text-[#FF1F26] group-hover:border-[#FF1F26]/70 group-hover:shadow-[0_0_15px_rgba(255,31,38,0.25)]'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className={`text-xs uppercase tracking-wider font-bold ${
                    isWhatsApp ? 'text-[#25D366]' : 'text-[#FF3030]'
                  }`}
                >
                  {card.title}
                </div>

                {isWhatsApp ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-white hover:text-[#25D366] transition-colors mt-0.5 group/link"
                  >
                    <span>{card.value}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-[#25D366]/20 text-[#25D366] group-hover/link:bg-[#25D366] group-hover/link:text-white px-2.5 py-0.5 rounded-full border border-[#25D366]/40 transition-colors">
                      {card.badgeText} &rarr;
                    </span>
                  </a>
                ) : card.numbers ? (
                  <div className="flex flex-col space-y-0.5 mt-0.5">
                    {card.numbers.map((item, nIdx) => (
                      <a
                        key={nIdx}
                        href={item.href}
                        className="text-sm sm:text-base font-semibold text-white hover:text-[#FF1F26] transition-colors inline-block"
                      >
                        {item.value}
                      </a>
                    ))}
                  </div>
                ) : card.href ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="text-sm sm:text-base font-semibold text-white hover:text-[#FF1F26] transition-colors inline-block mt-0.5 break-all sm:break-normal"
                  >
                    {card.value}
                  </a>
                ) : (
                  <div className="text-sm sm:text-base font-semibold text-white mt-0.5 break-words">
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
