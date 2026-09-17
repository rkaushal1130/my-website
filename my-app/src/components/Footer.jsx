import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import brandLogo from '../assets/images/logo.png';

/* Clean Social SVG Icons matching reference */
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

const Footer = () => {
  return (
    <footer className="bg-[#171717] border-t border-[#1C1C22] py-6 sm:py-7 relative overflow-hidden text-left">
      
      {/* Subtle bottom ambient red accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[#FF1F26]/4 blur-3xl pointer-events-none" />

      <div className="max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 relative z-10">
        
        {/* 4 Clean Columns Grid matching modern SaaS layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-6">
          
          {/* Column 1: Brand & Reach Us At (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <Link
              to="/"
              className="inline-flex items-center group focus:outline-none mb-1 transition-transform duration-200 hover:scale-105 origin-left"
              aria-label="Avaura Home"
            >
              <img
                src={brandLogo}
                alt="Avaura"
                className="h-11 sm:h-12 md:h-[50px] w-auto max-w-[210px] sm:max-w-[240px] md:max-w-[260px] object-contain select-none transition-all duration-300 group-hover:drop-shadow-[0_0_18px_rgba(255,31,38,0.45)]"
              />
            </Link>
            
            <div className="space-y-2 text-sm text-[#A7A7A7]">
              
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF1F26] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Sundernagar, Distt. Mandi,<br />
                  Himachal Pradesh 175002
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF1F26] shrink-0" />
                <a
                  href="mailto:kaushalrahul1130@gmail.com"
                  className="hover:text-white transition-colors break-all sm:break-normal"
                >
                  kaushalrahul1130@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#FF1F26] shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-1">
                  <a
                    href="tel:9015323903"
                    className="hover:text-white transition-colors"
                  >
                    +91 9015323903
                  </a>
                  <a
                    href="tel:7719561597"
                    className="hover:text-white transition-colors"
                  >
                    +91 7719561597
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Column 2: Explore (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-normal">
              Explore
            </h4>
            
            <ul className="space-y-2 text-sm text-[#A7A7A7]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  Career
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-normal">
              Support
            </h4>
            
            <ul className="space-y-2 text-sm text-[#A7A7A7]">
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
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-normal">
              Follow Us
            </h4>
            
            {/* Social Icons Row */}
            <div className="flex items-center gap-3.5 text-[#A7A7A7]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Avaura on Instagram"
                className="hover:text-white hover:scale-110 transition-all duration-200"
              >
                <InstagramIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Avaura on X"
                className="hover:text-white hover:scale-110 transition-all duration-200"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Avaura on LinkedIn"
                className="hover:text-white hover:scale-110 transition-all duration-200"
              >
                <LinkedinIcon className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar Divider & Copyright */}
        <div className="pt-4 border-t border-[#1C1C22] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A8A8A]">
          <div>
            © 2026 Avaura. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <Link to="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
