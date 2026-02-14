import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SmoothCounter: React.FC<{ value: string; label: string; suffix?: string }> = ({ value, label, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const target = parseInt(value.replace(/\D/g, '')) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
            let start = 0;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                
                setDisplayValue(Math.floor(easeOutQuart * target));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={elementRef} className="group relative h-40 md:h-64 flex flex-col items-center justify-center border-r border-b md:border-b-0 border-black/10 last:border-r-0 hover:bg-white transition-all duration-500 cursor-default overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F5F5F7] to-[#E5E5E5] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
       
       <div className="relative z-10 flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
         <div className="text-4xl md:text-7xl font-sans font-light text-[#1D1D1F] tracking-tighter tabular-nums mb-2 md:mb-4 drop-shadow-sm group-hover:text-black transition-colors">
            {displayValue}<span className="text-xl md:text-3xl text-[#1D1D1F]/60 ml-1 align-top font-normal group-hover:text-[#1D1D1F]/80 transition-colors">{suffix}</span>
         </div>
         <h3 className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#6E6E73] group-hover:text-[#1D1D1F] transition-colors text-center px-4">
            {label}
         </h3>
      </div>
    </div>
  );
};

const Stats: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-[#F5F5F7] border-b border-gray-200 relative z-20" aria-label="Key Statistics">
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-300 border-t border-gray-200">
          
          <div className="group relative h-40 md:h-64 flex flex-col items-center justify-center border-r border-b md:border-b-0 border-black/10 hover:bg-white transition-all duration-500 cursor-default overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F5F5F7] to-[#E5E5E5] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             <div className="relative z-10 flex flex-col items-center transform group-hover:scale-110 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
                <div className="text-4xl md:text-7xl font-sans font-light text-[#1D1D1F] tracking-tighter mb-2 md:mb-4 drop-shadow-sm">A++</div>
                <h3 className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#6E6E73] group-hover:text-[#1D1D1F] transition-colors text-center px-4">{t.stats.energy}</h3>
             </div>
          </div>

          <SmoothCounter value="45" suffix="dB" label={t.stats.acoustic} />
          <SmoothCounter value="12" suffix={t.stats.weeks} label={t.stats.production} />
          <SmoothCounter value="25" suffix={t.stats.years} label={t.stats.warranty} />

        </div>
      </div>
    </section>
  );
};

export default Stats;