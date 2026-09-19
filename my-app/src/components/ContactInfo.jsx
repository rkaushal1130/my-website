import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';
import WhatsAppIcon from './common/WhatsAppIcon';
import { WHATSAPP_URL, WHATSAPP_NUMBER } from '../data/navigation';

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
      title: 'Email Us',
      value: 'admin@avauraai.com',
      href: 'mailto:admin@avauraai.com',
      description: 'We usually respond within one business day.',
    },
    {
      icon: Phone,
      title: 'Call Us',
      numbers: [
        { value: '+91 9015323903', href: 'tel:9015323903' },
        { value: '+91 7719561597', href: 'tel:7719561597' },
      ],
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

      {/* Contact Cards */}
      <div className="space-y-4">
        {contactCards.map((card, idx) => {
          const Icon = card.icon;
          const isWhatsApp = card.isWhatsApp;

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-[#111111] border transition-all duration-300 flex items-start gap-4 group shadow-sm ${
                isWhatsApp
                  ? 'border-[#25D366]/30 hover:border-[#25D366] hover:shadow-[0_8px_25px_-5px_rgba(37,211,102,0.2)]'
                  : 'border-[#252525] hover:border-[#FF1F26]/50 hover:shadow-[0_8px_25px_-5px_rgba(255,31,38,0.15)]'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl bg-[#0D0D0D] border flex items-center justify-center shrink-0 transition-colors shadow-sm ${
                  isWhatsApp
                    ? 'border-[#25D366]/40 text-[#25D366] group-hover:border-[#25D366]'
                    : 'border-[#252525] text-[#FF1F26] group-hover:border-[#FF1F26]'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <div
                  className={`text-xs font-mono uppercase tracking-wider ${
                    isWhatsApp ? 'text-[#25D366]' : 'text-[#737373]'
                  }`}
                >
                  {card.title}
                </div>

                {isWhatsApp ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base font-semibold text-white hover:text-[#25D366] transition-colors mt-0.5"
                  >
                    <span>{card.value}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-[#25D366]/20 text-[#25D366] px-2.5 py-0.5 rounded-full border border-[#25D366]/40">
                      {card.badgeText} &rarr;
                    </span>
                  </a>
                ) : card.numbers ? (
                  <div className="flex flex-col space-y-0.5 mt-0.5">
                    {card.numbers.map((item, nIdx) => (
                      <a
                        key={nIdx}
                        href={item.href}
                        className="text-base font-semibold text-white hover:text-[#FF1F26] transition-colors inline-block"
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
