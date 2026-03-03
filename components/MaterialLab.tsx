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
    <section ref={sectionRef} id="materials" className="py-12 md:py-32 bg-[#F5F5F7] overflow-hidden border-t border-gray-200">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="mb-8 md:mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#86868B] mb-4 block">
            {t.materials.badge}
          </span>
          <h2 className="font-sans text-[clamp(1.75rem,5vw,3.75rem)] text-[#1D1D1F] font-light tracking-tight leading-tight">
            {t.materials.title} <span className="font-medium">{t.materials.titleBold}</span>
          </h2>
        </div>

        <div className="block lg:hidden space-y-5 mb-10">
          {materialList.map((mat) => (
            <article key={mat.id} className="rounded-xl border border-black/10 bg-white overflow-hidden">
              <div className="relative aspect-[16/10]">
                <img
                  src={TEXTURE_IMAGES[mat.id as keyof typeof TEXTURE_IMAGES]}
                  alt={mat.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/45"></div>
                <div className="absolute left-4 bottom-4 text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/75 block mb-1">{mat.subtitle}</span>
                  <h3 className="text-2xl font-light leading-tight">{mat.title}</h3>
                </div>
              </div>

              <div className="p-4">
                <p className="text-[#5C5C62] text-sm leading-relaxed mb-4">{mat.desc}</p>
                <div className="grid grid-cols-2 gap-2">
                  {mat.specs?.map((spec: any, idx: number) => (
                    <div key={idx} className="rounded-md border border-black/10 bg-[#F8F8F8] px-3 py-2">
                      <span className="block text-[9px] uppercase tracking-[0.15em] text-[#8A8A90]">{spec.label}</span>
                      <span className="block text-[11px] font-medium text-[#1D1D1F] mt-1">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-8 relative group">
            <div className="w-full aspect-[4/3] rounded-xl p-1 bg-gradient-to-br from-white/80 to-white/40 border border-white/60 shadow-2xl backdrop-blur-md overflow-hidden relative">
              <div className="w-full h-full rounded-lg overflow-hidden relative bg-white">
                <img
                  key={activeId}
                  src={TEXTURE_IMAGES[activeId as keyof typeof TEXTURE_IMAGES]}
                  alt={activeMaterial.title}
                  className="w-full h-full object-cover transition-all duration-[1.2s] ease-out will-change-transform scale-100"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 md:p-10 pointer-events-none">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <span className="text-white/60 text-[10px] uppercase tracking-widest mb-2 block">{activeMaterial.subtitle}</span>
                      <h3 className="text-white text-2xl md:text-4xl font-light mb-2">{activeMaterial.title}</h3>
                      <p className="text-white/70 text-xs md:text-sm max-w-lg font-light leading-relaxed">{activeMaterial.desc}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:gap-3 min-w-[200px]">
                      {activeMaterial.specs?.map((spec: any, idx: number) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-md">
                          <span className="block text-[7px] font-bold uppercase tracking-widest text-white/50">{spec.label}</span>
                          <span className="block text-[10px] md:text-xs font-medium text-white">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            {materialList.map((mat) => (
              <div
                key={mat.id}
                onClick={() => setActiveId(mat.id)}
                className={`
                  relative cursor-pointer group rounded-xl border-[4px] transition-all duration-500 overflow-hidden aspect-[16/5]
                  ${activeId === mat.id
                    ? 'border-white shadow-2xl scale-[1.02] z-10'
                    : 'border-white/40 shadow-sm hover:shadow-xl hover:border-white hover:scale-[1.01]'}
                `}
                style={{ flex: 1 }}
              >
                <div className="absolute inset-0 w-full h-full bg-gray-100">
                  <img
                    src={TEXTURE_IMAGES[mat.id as keyof typeof TEXTURE_IMAGES]}
                    alt={mat.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${activeId === mat.id ? 'scale-110' : 'scale-100 group-hover:scale-110'}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${activeId === mat.id ? 'opacity-90' : 'opacity-60'}`} />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-center">
                  <span className="text-white/70 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{mat.subtitle}</span>
                  <h4 className="text-white text-xl font-medium tracking-tight">{mat.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialLab;

