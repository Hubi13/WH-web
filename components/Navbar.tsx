import React, { useState, useEffect } from 'react';
import { Search, Globe, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePage } from '../contexts/PageContext';

interface NavbarProps {
  onOpenDealer: () => void;
  theme?: 'light' | 'dark';
}


const Navbar: React.FC<NavbarProps> = ({ onOpenDealer, theme = 'dark' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { setPage } = usePage();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setScrolled((prev) => (prev ? y > 16 : y > 24));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: any, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    // If it's a section on home, and we are on home, just scroll
    if (page === 'home' && href.startsWith('/#')) {
      setPage('home');
      const hash = href.substring(1); // remove /
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } else {
      // Full page navigation
      setPage(page);
    }
  };

  const navLinks = [
    { name: t.nav.philosophy, page: 'philosophy', href: '/philosophy' },
    { name: t.nav.models, page: 'home', href: '/#models' },
    { name: 'Deployment', page: 'home', href: '/#global-capability' },
    { name: t.materials.badge, page: 'home', href: '/#materials' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
          ? 'bg-black/30 backdrop-blur-xl shadow-lg py-5 md:py-6'
          : 'bg-transparent py-5 md:py-6'
          }`}
        aria-label="Main Navigation"
      >
        <div className="w-full px-6 md:px-12 max-w-[1800px] mx-auto">
          <div className="grid grid-cols-3 items-center">

            {/* Left: Menu Trigger */}
            <div className="flex justify-start">
              <button
                onClick={() => setMenuOpen(true)}
                className={`group flex items-center gap-4 transition-colors ${theme === 'light' ? 'text-[#1D1D1F] hover:text-black' : 'text-white hover:text-gray-200'}`}
                aria-label="Open Menu"
                aria-expanded={menuOpen}
              >

                <div className="flex flex-col gap-[6px] w-6 h-4 justify-center" aria-hidden="true">
                  <span className="h-[1px] w-full bg-current group-hover:w-full transition-all duration-300"></span>
                  <span className="h-[1px] w-full bg-current group-hover:w-2/3 transition-all duration-300 origin-left"></span>
                </div>
                <span className="hidden md:block text-xs font-medium uppercase tracking-[0.2em]">
                  {t.nav.menu}
                </span>
              </button>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex justify-center">
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); setPage('home'); }}
                className="group flex flex-col items-center gap-1 opacity-90 hover:opacity-100 transition-opacity"
                aria-label="West Home Systems Homepage"
              >
                <img
                  src="https://i.imgur.com/COhpgL4.png"
                  alt="West Home Logo"
                  className="h-6 md:h-10 w-auto object-contain"
                />
              </a>
            </div>


            {/* Right: Find Dealer */}
            <div className="flex justify-end items-center">
              <button
                onClick={onOpenDealer}
                className={`group flex items-center gap-3 transition-colors duration-300 ${theme === 'light' ? 'text-[#1D1D1F] hover:text-black' : 'text-white hover:text-gray-200'}`}
                aria-label="Find a Dealer"
              >
                <Search size={20} strokeWidth={1.5} aria-hidden="true" />
                <span className="hidden md:block text-xs font-medium uppercase tracking-[0.2em]">
                  {t.nav.findDealer}
                </span>
              </button>
            </div>


          </div>
        </div>
      </nav>

      {/* FULL SCREEN MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[60] flex ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Full Screen Menu"
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-700 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        ></div>

        {/* Sliding Menu Panel */}
        <div
          className={`
                relative w-[85%] sm:w-[50%] lg:w-[35%] xl:w-[30%] h-full 
                bg-[#050505]/95 backdrop-blur-2xl border-r border-white/10
                shadow-2xl transform transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) 
                flex flex-col
                ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
             `}
        >
          <div className="absolute top-6 left-6 md:top-8 md:left-12 z-50">
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors py-4"
              aria-label="Close Menu"
            >
              <X size={20} strokeWidth={1} aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{t.nav.close}</span>
            </button>
          </div>


          <div className="flex-grow flex flex-col justify-center px-12 md:px-20 relative overflow-y-auto">
            <nav className="flex flex-col gap-4 md:gap-6 py-8" role="navigation">
              {navLinks.map((link, idx) => (
                <div
                  key={link.name}
                  className={`group transform transition-all duration-700 ${menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                  style={{ transitionDelay: `${100 + (idx * 50)}ms` }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.page, link.href)}
                    className="text-xl sm:text-2xl md:text-3xl text-white hover:text-gray-300 transition-colors font-light text-left uppercase tracking-wide block"
                  >
                    {link.name}
                  </a>
                </div>
              ))}

            </nav>

            <div className={`mt-8 md:mt-16 pt-8 border-t border-white/20 w-full transform transition-all duration-700 delay-500 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex flex-col gap-8">
                {/* Language Selector */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-white/60 mb-2">
                    <Globe size={14} aria-hidden="true" />
                    <span className="text-[10px] uppercase tracking-widest">Select Region</span>
                  </div>
                  <div className="flex gap-4 md:gap-6 flex-wrap" role="group" aria-label="Language Selection">
                    {['EN', 'PL', 'ES'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang as any)}
                        aria-pressed={language === lang}
                        className={`
                                            text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300
                                            ${language === lang ? 'text-white border-b border-white' : 'text-white/60 hover:text-white border-b border-transparent'}
                                        `}
                      >
                        {lang === 'PL' ? 'Polski' : lang === 'EN' ? 'English' : 'Español'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
