import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePage } from '../contexts/PageContext';

const CTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { setPage } = usePage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-32 lg:py-40 bg-[#050505] text-white overflow-hidden flex items-center justify-center">
      
      {/* Background Image - Darkened */}
      <div className="absolute inset-0 z-0 opacity-50">
         <img 
            src="https://i.imgur.com/iWyQPX1.jpeg" 
            alt="West Home Atmosphere" 
            className={`w-full h-full object-cover transition-transform duration-[3s] cubic-bezier(0.25, 1, 0.5, 1) ${isVisible ? 'scale-100' : 'scale-110'}`}
         />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40"></div>

      {/* Gradient transition to footer */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-20"></div>

      <div className="relative z-30 max-w-5xl mx-auto px-6 text-center w-full">
        
        {/* Content Container - No Tile Styles */}
        <div className={`
             transition-all duration-1000 transform
             ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <div className="inline-block mb-8 px-4 py-1 border border-white/20 rounded-full bg-white/5">
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">{t.cta.badge}</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight mb-8 text-white drop-shadow-md">
            {t.cta.title} <span className="font-medium">{t.cta.titleBold}</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light mb-12 drop-shadow-sm">
            {t.cta.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="/dealer"
              onClick={(e) => { e.preventDefault(); setPage('dealer'); }}
              className="px-10 py-4 bg-white text-[#1D1D1F] hover:bg-gray-100 transition-colors shadow-lg rounded-full no-underline flex items-center justify-center"
            >
              <span className="flex items-center gap-3 font-bold uppercase tracking-widest text-xs">
                {t.cta.btn}
                <ArrowRight size={14} />
              </span>
            </a>
            
            <a 
              href="/catalogue"
              onClick={(e) => { e.preventDefault(); setPage('catalogue'); }}
              className="text-xs font-bold uppercase tracking-widest text-white border-b border-white/30 hover:border-white pb-1 transition-all no-underline"
            >
              View Digital Catalogue
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTA;