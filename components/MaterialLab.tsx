import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const TEXTURE_IMAGES = {
  structural: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=2000",
  facade: "https://i.imgur.com/fNQn8nP.jpeg",
  tactile: "https://i.imgur.com/476tMHr.jpeg",
  detail: "https://i.imgur.com/7ou8tEP.jpeg"
};

const MaterialLab: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('structural');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const materialsData = t.materials.items || {};

  const materialList = [
    { id: 'structural', ...materialsData.structural },
    { id: 'facade', ...materialsData.facade },
    { id: 'tactile', ...materialsData.tactile },
    { id: 'detail', ...materialsData.detail },
  ];

  const activeMaterial = materialsData[activeId as keyof typeof materialsData] || materialList[0];

  return (
    <section ref={sectionRef} id="materials" className="py-16 md:py-32 bg-[#F5F5F7] overflow-hidden border-t border-gray-200">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-8 md:mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#86868B] mb-4 block">
            {t.materials.badge}
          </span>
          <h2 className="font-sans text-[clamp(1.75rem,5vw,3.75rem)] text-[#1D1D1F] font-light tracking-tight leading-tight">
            {t.materials.title} <span className="font-medium">{t.materials.titleBold}</span>
          </h2>
        </div>

        {/* Asymmetric Split Layout v5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Left Side: Large Featured Photo (Fixed Size/Ratio) */}
          <div className="lg:col-span-8 relative group">
            <div className="w-full aspect-[4/3] rounded-2xl p-1 bg-gradient-to-br from-white/80 to-white/40 border border-white/60 shadow-2xl backdrop-blur-md overflow-hidden relative">
              <div className="w-full h-full rounded-xl overflow-hidden relative bg-white">
                <img
                  key={activeId}
                  src={TEXTURE_IMAGES[activeId as keyof typeof TEXTURE_IMAGES]}
                  alt={activeMaterial.title}
                  className="w-full h-full object-cover transition-all duration-[1.5s] ease-out scale-100 group-hover:scale-105"
                />

                {/* Information Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-10 pointer-events-none">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <span className="text-white/60 text-[10px] uppercase tracking-widest mb-2 block">{activeMaterial.subtitle}</span>
                      <h3 className="text-white text-2xl md:text-4xl font-light mb-2">{activeMaterial.title}</h3>
                      <p className="text-white/70 text-sm max-w-lg font-light leading-relaxed">
                        {activeMaterial.desc}
                      </p>
                    </div>

                    {/* Technical Specs Overlay */}
                    <div className="grid grid-cols-2 gap-3 min-w-[200px]">
                      {activeMaterial.specs?.map((spec: any, idx: number) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg">
                          <span className="block text-[7px] font-bold uppercase tracking-widest text-white/50">{spec.label}</span>
                          <span className="block text-xs font-medium text-white">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Full Image Sidebar with Plus Icons & Overlaid Text */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {materialList.map((mat) => (
              <div
                key={mat.id}
                onClick={() => setActiveId(mat.id)}
                className={`
                  relative cursor-pointer group rounded-2xl border-[4px] transition-all duration-500 overflow-hidden aspect-[21/7] md:aspect-[16/5] lg:aspect-auto
                  ${activeId === mat.id
                    ? 'border-white shadow-2xl scale-[1.02] z-10'
                    : 'border-white/40 shadow-sm hover:shadow-xl hover:border-white hover:scale-[1.01]'}
                `}
                style={{ flex: 1 }}
              >
                {/* Full Image Background */}
                <div className="absolute inset-0 w-full h-full bg-gray-100">
                  <img
                    src={TEXTURE_IMAGES[mat.id as keyof typeof TEXTURE_IMAGES]}
                    alt={mat.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${activeId === mat.id ? 'scale-110 opacity-100' : 'scale-100 group-hover:scale-110 opacity-90 group-hover:opacity-100'}`}
                  />
                  {/* Darker Gradient Overlay for Text Legibility */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${activeId === mat.id ? 'opacity-90' : 'opacity-60 group-hover:opacity-80'}`} />
                </div>

                {/* Text Content Overlay */}
                <div className="absolute inset-0 p-3.5 md:p-6 flex flex-col justify-center">
                  <span className="text-white/70 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] mb-1">
                    {mat.subtitle}
                  </span>
                  <h4 className="text-white text-base md:text-xl font-medium tracking-tight">
                    {mat.title}
                  </h4>

                  {/* Selection Indicator Bar */}
                  {activeId === mat.id && (
                    <div className="h-0.5 w-12 bg-white mt-3 rounded-full transform origin-left transition-transform duration-500 scale-x-100 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  )}
                </div>

                {/* Plus Icon Overlay (for inactive boxes) */}
                {activeId !== mat.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/10">
                    <Plus size={14} className="text-white opacity-60 group-hover:opacity-100 transition-all scale-90 group-hover:scale-110" />
                  </div>
                )}
              </div>
            ))}

            {/* Bottom Disclaimer */}
            <div className="mt-2 p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[10px] font-bold">i</div>
              <p className="text-[9px] font-medium uppercase tracking-widest text-[#86868B] leading-tight">
                Technical specifications <br />subject to fleet configuration.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

const Plus = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default MaterialLab;