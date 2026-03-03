import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePage } from '../contexts/PageContext';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const { t } = useLanguage();
  const { setPage } = usePage();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    // Changed h-screen to h-[100dvh] to prevent layout jumps on mobile browsers with dynamic address bars
    <section className="relative h-[100dvh] w-full bg-black text-white overflow-hidden" aria-label="Introduction">

      {/* Background Layer - LCP Optimized */}
      <div className="absolute inset-0 z-0">
        <div
          className={`w-full h-full transition-transform duration-[20s] ease-out will-change-transform ${loaded ? 'scale-105' : 'scale-100'}`}
          style={{ willChange: 'transform' }}
        >
          <img
            src="https://i.imgur.com/iWyQPX1.jpeg"
            alt="West Home Infinity Architecture"
            className="w-full h-full object-cover opacity-80"
            fetchPriority="high"
            loading="eager"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80 opacity-80"></div>

        {/* Noise reduced for mobile performance */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 md:opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 md:px-12 pointer-events-none">

        <div className="max-w-[1920px] w-full mx-auto flex flex-col items-center pointer-events-auto">

          <div className={`
                  inline-flex items-center gap-3 px-3 py-1.5 md:px-4 md:py-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-md mb-4 md:mb-12 
                  transition-all duration-1000 transform 
                  ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-white/90">
              {t.hero.status}
            </span>
          </div>

          {/* Typography using clamp/responsive classes to fit everything from iPhone SE to 4K TV */}
          <h1 className={`
                  font-display font-light leading-[1.1] md:leading-[0.95] tracking-tight mb-6 md:mb-12
                  text-[clamp(1.65rem,10vw,10rem)]
                  transition-all duration-1000 delay-200 transform text-white
                  ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}>
            <span className="block">{t.hero.titleLine1}</span>
            <span className="text-white/70 font-medium italic font-serif block mt-2 md:mt-4">{t.hero.titleLine2}</span>
          </h1>

          <p className={`
                  text-sm sm:text-base md:text-xl text-gray-300 font-light leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl mb-6 md:mb-12
                  transition-all duration-1000 delay-400 transform
                  ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}>
            {t.hero.subtitle}
          </p>

          <div className={`
                  flex w-full sm:w-auto px-6 sm:px-0
                  transition-all duration-1000 delay-500 transform
                  ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}>
            <a
              href="/dealer"
              onClick={(e) => { e.preventDefault(); setPage('dealer'); }}
              className="group h-12 md:h-14 px-8 md:px-10 border border-white/20 text-white bg-white/10 flex items-center justify-center gap-3 hover:bg-white/15 backdrop-blur-sm transition-colors rounded-full cursor-pointer no-underline w-full sm:w-auto"
            >
              <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap">{t.hero.configure}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

      </div>

      <div className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 text-white/40 
          transition-all duration-1000 delay-1000 z-20
          ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>

    </section>
  );
};

export default Hero;
