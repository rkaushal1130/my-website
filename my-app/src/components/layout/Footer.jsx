import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Container from '../common/Container';
import brandLogo from '../../assets/images/logo.png';

/* Clean Social SVG Icons matching reference */
const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const XTwitterIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#030303] border-t border-[#1C1C22] pt-14 pb-10 relative overflow-hidden text-left">
      
      {/* Subtle bottom ambient red accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-[#FF1F26]/4 blur-3xl pointer-events-none" />

      <Container size="wide" className="relative z-10">
        
        {/* Brand Top Header */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-3.5 group focus:outline-none"
            aria-label="NeverquiT.ai Home"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0a0a0d] border border-[#242424] group-hover:border-[#FF1F26] overflow-hidden flex items-center justify-center p-1 transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(255,31,38,0.4)]">
              <img
                src={brandLogo}
                alt="NeverquiT.ai Logo"
                className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-white">
              NeverquiT<span className="text-[#FF1F26]">.ai</span>
            </span>
          </Link>
        </div>

        {/* 4 Clean Columns Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          
          {/* Column 1: Reach Us At (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-base font-semibold text-white tracking-normal">
              Reach Us At
            </h4>
            
            <div className="space-y-3.5 text-sm text-[#A7A7A7]">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF1F26] shrink-0 mt-1" />
                <span className="leading-relaxed">
                  Chandigarh, India
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF1F26] shrink-0" />
                <a
                  href="mailto:kaushalrahul1130@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  kaushalrahul1130@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF1F26] shrink-0" />
                <a
                  href="tel:9015323903"
                  className="hover:text-white transition-colors"
                >
                  +91 9015323903
                </a>
              </div>

            </div>
          </div>

          {/* Column 2: Explore (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-semibold text-white tracking-normal">
              Explore
            </h4>
            
            <ul className="space-y-2.5 text-sm text-[#A7A7A7]">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Autonomous Swarms
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Resources & Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-semibold text-white tracking-normal">
              Support
            </h4>
            
            <ul className="space-y-2.5 text-sm text-[#A7A7A7]">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Security & Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-semibold text-white tracking-normal">
              Follow Us
            </h4>
            
            {/* Social Icons Row */}
            <div className="flex items-center gap-4 text-[#A7A7A7]">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow NeverquiT.ai on Facebook"
                className="hover:text-white hover:scale-110 transition-all duration-200"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow NeverquiT.ai on Instagram"
                className="hover:text-white hover:scale-110 transition-all duration-200"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow NeverquiT.ai on X"
                className="hover:text-white hover:scale-110 transition-all duration-200"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow NeverquiT.ai on LinkedIn"
                className="hover:text-white hover:scale-110 transition-all duration-200"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow NeverquiT.ai on YouTube"
                className="hover:text-white hover:scale-110 transition-all duration-200"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar Divider & Copyright */}
        <div className="pt-8 border-t border-[#1C1C22] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <div>
            © 2026 NeverquiT.ai. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </Container>
    </footer>
  );
};

export default Footer;
