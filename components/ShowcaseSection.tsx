import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ShowcaseSection: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for Curtain Logic
  const curtainSectionRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let isTicking = false;

    const handleScroll = () => {
        if (!isTicking) {
            rafId = requestAnimationFrame(() => {
                if (curtainSectionRef.current && curtainRef.current) {
                    const rect = curtainSectionRef.current.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const totalHeight = rect.height - viewportHeight;
                    
                    // Calculate progress 0 to 1 based on sticky container scroll
                    const rawProgress = (rect.top * -1) / totalHeight;
                    const progress = Math.max(0, Math.min(1, rawProgress));
                    
                    // Lift the curtain (translate Y negative)
                    const liftAmount = progress * 100;
                    
                    // Direct transform manipulation optimized
                    curtainRef.current.style.transform = `translate3d(0, -${liftAmount}%, 0)`;
                }
                isTicking = false;
            });
            isTicking = true;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-white text-[#1D1D1F] w-full"
    >
      
      {/* SCENE 1: ARCHITECTURE OF SILENCE - FULL SCREEN IMAGE */}
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 z-0">
             <img 
                src="https://i.imgur.com/dGFCeEU.jpeg" 
                alt="Architecture"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
         </div>

         <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2">
             <div className="reveal-on-scroll py-20 md:py-0">
                 <span className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">01 — {t.story.chapter1.title}</span>
                 <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-light leading-[1.1] mb-8 text-white">
                    {t.story.chapter1.title}
                 </h2>
                 <p className="font-sans text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-md">
                    {t.story.chapter1.text}
                 </p>
             </div>
         </div>
      </div>

      {/* SCENE 2: PRECISION (RADICAL TRANSPARENCY) */}
      <div className="min-h-screen relative py-20 md:py-24 flex items-center bg-[#F5F5F7] z-30">
          <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 relative">
             <div className="flex flex-col md:flex-row items-center relative">
                 <div className="w-full md:w-3/4 h-[400px] sm:h-[500px] md:h-[85vh] relative z-10">
                     {/* Glass Frame Wrapper */}
                     <div className="w-full h-full p-1 rounded-xl bg-gradient-to-br from-white/80 to-white/40 border border-white/60 shadow-2xl shadow-black/30 backdrop-blur-md">
                         <div className="w-full h-full rounded-lg overflow-hidden relative bg-white shadow-inner group">
                             <img 
                                src="https://i.imgur.com/7ou8tEP.jpeg" 
                                alt="Structure Detail"
                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                                loading="lazy"
                                decoding="async"
                             />
                         </div>
                     </div>
                 </div>
                 
                 {/* Text Card - Responsive positioning */}
                 <div className="w-full md:w-1/3 md:-ml-32 mt-8 md:mt-0 relative z-20 p-8 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] reveal-on-scroll rounded-xl bg-white/80 backdrop-blur-xl border border-white/50">
                     <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#86868B] mb-6">
                        02 — {t.hero.precision}
                     </span>
                     <h2 className="font-display text-3xl md:text-5xl text-[#1D1D1F] mb-6 leading-tight font-light">
                        {t.story.chapter2.title}
                     </h2>
                     <p className="text-[#6E6E73] leading-relaxed font-light text-lg">
                        {t.story.chapter2.text}
                     </p>
                 </div>
             </div>
          </div>
      </div>

      {/* SCENE 3: CURATED ATMOSPHERE - CURTAIN LIFT EFFECT */}
      <div ref={curtainSectionRef} className="relative h-[250vh] bg-black">
         
         <div className="sticky top-0 w-full h-screen overflow-hidden">
             
             {/* BOTTOM LAYER: Fixed Image */}
             <div className="absolute inset-0 z-0">
                 <img 
                    src="https://i.imgur.com/iWyQPX1.jpeg" 
                    alt="Atmosphere"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                 />
                 <div className="absolute inset-0 bg-black/40"></div>
                 
                 {/* Content Revealed on Image - Responsive positioning */}
                 <div className="absolute bottom-12 left-6 md:bottom-24 md:left-24 text-white z-0 pointer-events-none max-w-xl pr-6">
                     <h2 className="font-display text-4xl md:text-7xl font-light mb-4 leading-tight">
                        {t.story.chapter3.title}
                     </h2>
                     <p className="text-lg md:text-xl font-light opacity-90 leading-relaxed">
                        {t.story.chapter3.text}
                     </p>
                 </div>
             </div>

             {/* TOP LAYER: The "Frosted" Curtain - Optimization: will-change-transform added via tailwind if possible, or style */}
             <div 
                ref={curtainRef}
                className="absolute inset-0 z-10 bg-[#050505]/95 md:bg-[#050505]/90 backdrop-blur-none md:backdrop-blur-md w-full h-full flex flex-col items-center justify-end pb-32 will-change-transform shadow-2xl border-b border-white/20"
                style={{ willChange: 'transform' }}
             >
                {/* Content on the curtain before it lifts */}
                 <div className="text-center max-w-2xl px-6 mb-24">
                     <span className="inline-block mb-8 px-4 py-1.5 border border-white/30 rounded-full bg-transparent">
                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white">
                           03 — Atmosphere
                        </span>
                     </span>
                     <h2 className="font-display text-4xl md:text-6xl font-light text-white tracking-tight mb-8 drop-shadow-md">
                        Light as Material.
                     </h2>
                     <p className="text-white/80 text-base md:text-lg font-light drop-shadow-sm">
                        Scroll to reveal the architecture of light.
                     </p>
                 </div>

                 {/* The Connector Graphic - "Coachline" */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[50%] z-20">
                     <div className="w-[1px] h-32 bg-white opacity-40"></div>
                     <div className="w-3 h-3 border border-white rounded-full bg-white -mt-1.5 -ml-[5px]"></div>
                 </div>

                 {/* Decorative Border Line at bottom of curtain */}
                 <div className="absolute bottom-0 w-full h-[1px] bg-white/30"></div>
             </div>

         </div>

      </div>

    </section>
  );
};

export default ShowcaseSection;