import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Philosophy: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!itemsRef.current.length) return;
      
      const viewportCenter = window.innerHeight / 2;
      
      itemsRef.current.forEach((item, idx) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + (rect.height / 2);
        
        // Activation logic based on viewport center
        if (Math.abs(viewportCenter - itemCenter) < 350) {
            setActiveIdx(idx);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="relative py-40 bg-[#f5f5f7] overflow-hidden">
      
      {/* Clean Light Background - No Texture */}
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Title Column - Sticky Left */}
            <div className="lg:col-span-5 sticky top-32 self-start">
               {/* Badge with Transparency and Border */}
               <span className="inline-block px-5 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-sm text-[10px] font-bold text-[#1D1D1F] uppercase tracking-[0.2em] mb-8 border border-white/60">
                  {t.philosophy.badge}
               </span>
               <h2 className="font-display text-5xl md:text-6xl font-medium text-[#1D1D1F] leading-[1.1] tracking-tight mb-8">
                  {t.philosophy.titleLine1} <br/>
                  <span className="text-[#86868B] font-light">{t.philosophy.titleLine2}</span>
               </h2>
               {/* Greyish Black Accent Line */}
               <div className="w-16 h-[2px] bg-[#1D1D1F] mb-8 opacity-80 rounded-full"></div>
            </div>

            {/* Content Column - Right List */}
            <div className="lg:col-span-7 space-y-8 pt-12 lg:pt-0">
               
               {[
                 { id: '01', title: t.philosophy.col1Title, desc: t.philosophy.col1Desc },
                 { id: '02', title: t.philosophy.col2Title, desc: t.philosophy.col2Desc },
                 { id: '03', title: t.philosophy.col3Title, desc: t.philosophy.col3Desc }
               ].map((item, idx) => (
                  <div 
                    key={idx} 
                    ref={(el) => { itemsRef.current[idx] = el; }}
                    className={`
                        group relative rounded-[2.5rem] p-10 md:p-12
                        bg-white/40 backdrop-blur-[2px] border border-white/20
                        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                        ${activeIdx === idx 
                           ? 'opacity-100 scale-100 shadow-xl shadow-black/5 translate-x-0' 
                           : 'opacity-40 scale-95 shadow-none translate-x-4 grayscale'}
                    `}
                  >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl md:text-3xl font-display font-medium text-[#1D1D1F] tracking-tight">
                            {item.title}
                        </h3>
                        {/* Greyish Black Accent Badge */}
                        <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500
                            ${activeIdx === idx 
                                ? 'bg-[#1D1D1F] text-white shadow-lg shadow-black/20' 
                                : 'bg-[#f5f5f7]/50 text-[#86868B] border border-black/5'}
                        `}>
                            {item.id}
                        </div>
                      </div>
                      
                      <p className="text-[#6E6E73] text-lg leading-relaxed font-light">
                        {item.desc}
                      </p>
                  </div>
               ))}

            </div>
        </div>

      </div>
    </section>
  );
};

export default Philosophy;