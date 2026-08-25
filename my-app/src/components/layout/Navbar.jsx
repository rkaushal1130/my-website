import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import brandLogo from '../../assets/images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4 sm:py-5 transition-all duration-300">
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 2xl:px-28">
        <div className="flex items-center justify-between h-11 sm:h-12">
          
          {/* Top Left: Logo & Company Name */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none transition-transform duration-200 hover:scale-105 origin-left"
            aria-label="NeverquiT.ai Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-transparent border border-white/10 group-hover:border-[#FF1F26] overflow-hidden flex items-center justify-center p-0.5 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,31,38,0.4)]">
              <img
                src={brandLogo}
                alt="NeverquiT.ai Logo"
                className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              NeverquiT<span className="text-[#FF1F26]">.ai</span>
            </span>
          </Link>

          {/* Top Right: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 sm:gap-8 lg:gap-9 text-sm sm:text-[15px] font-medium">
            {mainNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative py-1.5 transition-all duration-200 inline-block hover:scale-105 origin-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] ${
                    isActive ? 'text-[#FF1F26] font-semibold' : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF1F26] rounded-full shadow-[0_0_8px_#FF1F26]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl bg-black/40 border border-white/15 text-white flex items-center justify-center focus:outline-none hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm backdrop-blur-md"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5 text-[#FF1F26]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-x-0 top-[68px] bottom-0 bg-[#050505]/98 backdrop-blur-2xl border-b border-[#242424] px-6 py-8 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300 md:hidden">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#737373] uppercase tracking-wider mb-2">
              Menu Navigation
            </div>
            {mainNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 hover:scale-[1.02] ${
                    isActive ? 'bg-[#FF1F26] text-white' : 'text-[#B0B0B0] hover:bg-[#101010] hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-6 border-t border-[#242424]">
            <p className="text-center text-xs text-[#737373]">
              Chandigarh, India • kaushalrahul1130@gmail.com
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
