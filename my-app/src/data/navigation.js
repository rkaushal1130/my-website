export const mainNavigation = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Services', path: '/services' },
  { name: 'Career', path: '/careers' },
  { name: 'Contact', path: '/contact' },
];

export const WHATSAPP_NUMBER = '7719561597';

export const WHATSAPP_DEFAULT_MESSAGE = `Hello Avaura Team,

I came across your website and would like to learn more about your services. I’m interested in discussing my requirements and exploring how Avaura can assist with my project. Please share more information about your services and the process of getting started. Looking forward to connecting with your team.

Thank you.`;

export const WHATSAPP_URL = `https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE
)}`;

export const footerLinks = {
  quickLinks: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Career', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Open Positions', path: '/careers' },
    { name: 'Get in Touch', path: '/contact' },
  ],
  contact: {
    email: 'admin@avauraai.com',
    phone: '+91 9015323903',
    secondaryPhone: '+91 7719561597',
    phones: ['+91 9015323903', '+91 7719561597'],
    whatsapp: '+91 7719561597',
    whatsappUrl: WHATSAPP_URL,
    location: 'Sundernagar, Distt. Mandi, Himachal Pradesh 175002',
    address: 'Sundernagar, Distt. Mandi, Himachal Pradesh 175002',
  },
  legal: [
    { name: 'Privacy Policy', path: '/contact' },
    { name: 'Terms of Service', path: '/contact' },
    { name: 'Security Notice', path: '/contact' },
  ],
};
