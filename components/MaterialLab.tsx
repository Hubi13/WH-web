import React, { useRef, useEffect, useState } from 'react';
import { Plus, Layers } from 'lucide-react';
import { MATERIAL_ELEMENTS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const TEXTURE_IMAGES = {
  structural: "https://i.imgur.com/H4BsEqJ.jpeg",
  facade: "https://i.imgur.com/fNQn8nP.jpeg",
  tactile: "https://i.imgur.com/476tMHr.jpeg",
  detail: "https://i.imgur.com/7ou8tEP.jpeg"
};

const MaterialLab: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('structural');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getMatText = (el: any, key: string) => {
    if (language === 'PL') return el[`${key}PL`];
    if (language === 'ES') return el[`${key}ES`];
    return el[key];
  }

  return (
    <section ref={ref} id="materials" className="py-20 md:py-32 bg-white overflow-hidden border-t border-gray-100 relative">
       
       <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-12 md:mb-16 flex flex-col lg:flex-row justify-between items-start lg:items-end relative z-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#86868B] mb-4 block">{t.materials.badge}</span>
            <h3 className="font-display text-4xl md:text-5xl font-light text-[#1D1D1F] tracking-tight">
              {t.materials.title} <span className="font-medium">{t.materials.titleBold}</span>
            </h3>
          </div>
          <div className={`max-w-md mt-6 lg:mt-0 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
             <p className="text-[#6E6E73] text-sm leading-relaxed">
               {t.materials.desc}
             </p>
          </div>
       </div>

       {/* Materials Grid - Vertical on Mobile, Horizontal Accordion on Desktop */}
       <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-4 relative z-20 min-h-[800px] lg:h-[600px] lg:min-h-0">
          {MATERIAL_ELEMENTS.map((el) => {
            const isActive = activeId === el.id;
            const title = getMatText(el, 'title');
            const subtitle = getMatText(el, 'subtitle');
            const desc = getMatText(el, 'desc');
            const specs = getMatText(el, 'specs');
            // @ts-ignore
            const image = TEXTURE_IMAGES[el.id] || el.image;
            
            return (
              <div
                key={el.id}
                onClick={() => setActiveId(el.id)} // Click for mobile
                onMouseEnter={() => setActiveId(el.id)} // Hover for desktop
                className={`
                  relative cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                  /* Mobile: Height based expansion */
                  w-full lg:w-auto
                  ${isActive ? 'h-[400px] lg:h-auto lg:flex-[2.5]' : 'h-[80px] lg:h-auto lg:flex-[0.5]'}
                  group
                  p-1 rounded-xl 
                  bg-gradient-to-br from-white/60 to-white/10 
                  border border-white/10 
                  shadow-2xl shadow-black/30
                  backdrop-blur-none lg:backdrop-blur-[2px]
                  ring-1 ring-white/20 ring-inset
                  overflow-hidden
                `}
              >
                <div className="w-full h-full rounded-lg overflow-hidden relative">
                    <img 
                      src={image} 
                      alt={title} 
                      className={`
                        absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s]
                        ${isActive ? 'scale-100' : 'scale-110 opacity-80'} 
                      `}
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Overlay gradient - Active Only */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    {/* Dim overlay for inactive */}
                    <div className={`absolute inset-0 bg-white/10 transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-10'}`}></div>

                    {/* Vertical Label (Inactive Desktop) */}
                    <div className={`hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                      <span className="block -rotate-90 whitespace-nowrap text-xs font-bold uppercase tracking-[0.2em] text-[#1D1D1F] bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-sm">
                        {title}
                      </span>
                    </div>

                    {/* Horizontal Label (Inactive Mobile) */}
                    <div className={`lg:hidden absolute left-6 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                      <span className="text-sm font-bold uppercase tracking-[0.2em] text-white drop-shadow-md">
                        {title}
                      </span>
                    </div>

                    {/* Content (Active) */}
                    <div className={`
                        absolute bottom-0 left-0 w-full p-6 md:p-12 
                        transition-all duration-500 transform 
                        ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                    `}>
                      <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 block">{subtitle}</span>
                      <h4 className="text-white text-2xl md:text-4xl font-light mb-4 md:mb-6">{title}</h4>
                      <p className="text-white/80 text-xs md:text-sm max-w-lg leading-relaxed mb-6 hidden sm:block">{desc}</p>
                      
                      {/* Mobile Desc (Short) */}
                      <p className="text-white/80 text-xs max-w-lg leading-relaxed mb-6 sm:hidden line-clamp-2">{desc}</p>

                      <div className="flex flex-wrap gap-2">
                          {specs.map((s: string, i: number) => (
                            <span key={i} className="px-2 py-1 md:px-3 md:py-1 border border-white/20 text-[9px] md:text-[10px] text-white uppercase tracking-wider rounded-full">{s}</span>
                          ))}
                      </div>
                    </div>
                </div>
              </div>
            );
          })}
       </div>

    </section>
  );
};

export default MaterialLab;