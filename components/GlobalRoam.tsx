import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const GlobalRoam: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;
    if (!container || !scrollContent) return;

    let rafId: number;
    let containerTop = 0;
    let containerHeight = 0;
    let isVisible = false;

    const updateLayout = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      containerTop = rect.top + window.scrollY;
      containerHeight = rect.height;
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.01 });

    intersectionObserver.observe(container);

    const handleScroll = () => {
      if (!isVisible) return;

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewHeight = window.innerHeight;
        const viewWidth = window.innerWidth;

        // Calculate progress within the sticky section
        const sectionRelativeScroll = scrollY - containerTop;
        const scrollableHeight = containerHeight - viewHeight;

        let progress = sectionRelativeScroll / scrollableHeight;
        progress = Math.max(0, Math.min(1, progress));

        // Calculate horizontal distance (scrollContent width minus viewport width)
        const horizontalDist = scrollContent.scrollWidth - viewWidth;
        const xPos = -horizontalDist * progress;

        // Single consolidated transform for performance
        scrollContent.style.transform = `translate3d(${xPos}px, 0, 0)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateLayout);
    updateLayout();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateLayout);
      intersectionObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scenes = [
    {
      id: 'alps',
      title: 'Alpine',
      desc: t.globalRoam.locations[0].desc,
      img: 'https://i.imgur.com/dGFCeEU.jpeg'
    },
    {
      id: 'coast',
      title: 'Coastal',
      desc: t.globalRoam.locations[1].desc,
      img: 'https://i.imgur.com/ay5UUWQ.jpeg'
    },
    {
      id: 'forest',
      title: 'Forest',
      desc: t.globalRoam.locations[2].desc,
      img: 'https://i.imgur.com/7ou8tEP.jpeg'
    }
  ];

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Fixed Overlay Background (Grid) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>

        {/* Content Track */}
        <div
          ref={scrollRef}
          className="absolute top-0 left-0 h-full flex will-change-transform"
        >
          {/* Intro Panel */}
          <div className="w-[100vw] h-full flex items-center px-6 md:px-24 flex-shrink-0 relative z-10">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-6 block">
                {t.globalRoam.badge}
              </span>
              <h2 className="font-display text-5xl md:text-8xl text-white font-light tracking-tight mb-8">
                {t.globalRoam.title}
              </h2>
              <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                {t.globalRoam.desc}
              </p>
            </div>
          </div>

          {/* Scene Panels */}
          {scenes.map((scene, idx) => (
            <div key={scene.id} className="w-[100vw] h-full relative flex-shrink-0 group overflow-hidden">
              {/* Panel Background Image */}
              <div className="absolute inset-0 bg-[#0A0A0A]">
                <img
                  src={scene.img}
                  alt={scene.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-1000 scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              {/* Panel Content Overlay */}
              <div className="absolute inset-0 p-8 md:p-24 flex flex-col justify-end">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-xs text-white/40">SCENE 0{idx + 1}</span>
                    <div className="h-[1px] w-12 bg-white/20"></div>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-display font-light text-white mb-6">
                    {scene.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base font-light max-w-sm leading-relaxed">
                    {scene.desc}
                  </p>
                </div>

                {/* Aesthetic Tech Corners */}
                <div className="absolute top-12 left-12 w-4 h-4 border-t border-l border-white/20"></div>
                <div className="absolute bottom-12 right-12 w-4 h-4 border-b border-r border-white/20"></div>
              </div>
            </div>
          ))}

          {/* Outro Panel */}
          <div className="w-[100vw] h-full bg-[#1D1D1F] flex items-center justify-center flex-shrink-0">
            <div className="text-center px-6">
              <div className="w-16 h-1 w-24 bg-white/20 mx-auto mb-12"></div>
              <h2 className="text-white text-3xl md:text-5xl font-display font-light mb-4">
                End of Exploration
              </h2>
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/30">R-Home Architecture v1.1.4</span>
            </div>
          </div>
        </div>

        {/* Progress Indicator (Bottom) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/10 z-20 hidden md:block">
          <div className="h-full bg-white/40 w-1/3"></div>
        </div>

      </div>
    </section>
  );
};

export default GlobalRoam;