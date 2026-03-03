import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const GalleryChaos: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Optimization: Only calculate and render when the section is near the viewport
      if (rect.top < viewportHeight + 100 && rect.bottom > -100) {

        // Slightly reduced motion for smoother feel
        const y1 = (rect.top * -0.1);
        const y2 = (rect.top * 0.06);

        rafId = requestAnimationFrame(() => {
          if (img1Ref.current) {
            img1Ref.current.style.transform = `translate3d(0, ${y1}px, 0)`;
          }
          if (img2Ref.current) {
            img2Ref.current.style.transform = `translate3d(0, ${y2}px, 0)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-[#F5F5F7] overflow-hidden">

      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F2F0EB] to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative min-h-[600px] md:h-[1000px]">

        {/* Caption */}
        <div className="absolute top-0 left-6 md:left-12 z-20 reveal-on-scroll">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1D1D1F]/40">{t.gallery.badge}</span>
          <h2 className="text-2xl md:text-3xl font-display font-medium text-[#1D1D1F] mt-2">{t.gallery.title}</h2>
        </div>

        {/* Image 1: Large Portrait */}
        <div
          ref={img1Ref}
          className="absolute top-16 md:top-12 left-0 md:left-24 w-[85%] md:w-[40%] z-10 will-change-transform"
          data-cursor-text="View Detail"
        >
          <div className="p-1 rounded-lg bg-gradient-to-br from-white/80 to-white/40 border border-white/60 shadow-2xl shadow-black/20 backdrop-blur-md reveal-on-scroll">
            <div className="aspect-[3/4] w-full h-full overflow-hidden lg:cursor-none rounded-md relative bg-white shadow-inner">
              <img
                src="https://i.imgur.com/0FbPb8k.jpeg"
                alt="Interior Detail"
                className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
            </div>
          </div>
          <p className="mt-4 text-[9px] uppercase tracking-widest text-[#1D1D1F]/60 text-right md:text-left">{t.gallery.caption1}</p>
        </div>

        {/* Image 2: Sharp Detail - Positioned to avoid overlap on mobile */}
        <div
          ref={img2Ref}
          className="absolute bottom-8 md:bottom-32 right-0 md:right-32 w-[60%] md:w-[35%] z-20 will-change-transform"
          data-cursor-text="Inspect"
        >
          <div className="p-1 rounded-lg bg-gradient-to-br from-white/80 to-white/40 border border-white/60 shadow-2xl shadow-black/20 backdrop-blur-md reveal-on-scroll delay-200">
            <div className="aspect-square w-full h-full overflow-hidden lg:cursor-none rounded-md relative bg-white shadow-inner">
              <img
                src="https://i.imgur.com/rp0K1YQ.jpeg"
                alt="Material Detail"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
            </div>
          </div>
          <p className="mt-4 text-[9px] uppercase tracking-widest text-[#1D1D1F]/60 text-right">{t.gallery.caption2}</p>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default GalleryChaos;
