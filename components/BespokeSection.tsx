
import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

const BespokeSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#121212] text-white py-32 md:py-48 overflow-hidden relative">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* Content */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] mb-8 text-[#888]">
              {t.bespoke.badge}
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-light leading-none mb-8">
              {t.bespoke.title} <br/>
              <span className="text-[#666]">{t.bespoke.titleBold}</span>
            </h2>
            <p className="text-xl md:text-2xl font-light text-[#888] leading-relaxed max-w-lg mb-12">
              {t.bespoke.desc}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 border-b border-white/10 pb-6 group cursor-default">
                 <span className="text-xs font-mono text-[#444] group-hover:text-white transition-colors">01</span>
                 <span className="text-lg font-light tracking-wide">{t.bespoke.step1}</span>
              </div>
              <div className="flex items-center gap-6 border-b border-white/10 pb-6 group cursor-default">
                 <span className="text-xs font-mono text-[#444] group-hover:text-white transition-colors">02</span>
                 <span className="text-lg font-light tracking-wide">{t.bespoke.step2}</span>
              </div>
              <div className="flex items-center gap-6 border-b border-white/10 pb-6 group cursor-default">
                 <span className="text-xs font-mono text-[#444] group-hover:text-white transition-colors">03</span>
                 <span className="text-lg font-light tracking-wide">{t.bespoke.step3}</span>
              </div>
            </div>

            <button className="mt-12 group flex items-center gap-4 text-white hover:text-[#888] transition-colors">
               <span className="text-xs font-bold uppercase tracking-[0.2em] border-b border-white pb-1 group-hover:border-[#888] transition-all">
                 {t.bespoke.cta}
               </span>
               <ArrowRight size={16} />
            </button>
          </div>

          {/* Image */}
          <div className={`relative aspect-[4/5] md:aspect-[3/4] transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
             <img 
               src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop" 
               alt="Bespoke Architecture" 
               className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1.5s]"
             />
             <div className="absolute top-8 right-8 w-24 h-24 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                <div className="w-2 h-2 bg-white rounded-full"></div>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BespokeSection;
