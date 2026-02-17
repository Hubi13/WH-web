import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { requestScrollRuntimeTick, subscribeScrollFrame } from '../utils/scrollRuntime';

const GlobalRoam: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef({ start: 0, range: 1, travel: 0 });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;
    if (!container || !scrollContent) return;

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

    const measure = () => {
      const rect = container.getBoundingClientRect();
      metricsRef.current = {
        start: rect.top + window.scrollY,
        range: Math.max(1, rect.height - window.innerHeight),
        travel: Math.max(0, scrollContent.scrollWidth - window.innerWidth),
      };
    };

    const applyAt = (scrollY: number) => {
      const { start, range, travel } = metricsRef.current;
      const progress = clamp((scrollY - start) / range, 0, 1);
      const moveAmount = travel * progress;
      scrollContent.style.transform = `translate3d(-${moveAmount}px, 0, 0)`;
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = Boolean(entry?.isIntersecting);
        if (isVisibleRef.current) requestScrollRuntimeTick();
      },
      { threshold: 0.01 }
    );

    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      measure();
      applyAt(window.scrollY || window.pageYOffset || 0);
      requestScrollRuntimeTick();
    });

    resizeObserver.observe(container);
    resizeObserver.observe(scrollContent);

    const handleViewportChange = () => {
      measure();
      applyAt(window.scrollY || window.pageYOffset || 0);
      requestScrollRuntimeTick();
    };

    window.addEventListener('resize', handleViewportChange, { passive: true });
    window.addEventListener('orientationchange', handleViewportChange, { passive: true });

    const unsubscribe = subscribeScrollFrame(
      ({ scrollY }) => {
        if (!isVisibleRef.current) return;
        applyAt(scrollY);
      },
      () => isVisibleRef.current
    );

    measure();
    applyAt(window.scrollY || window.pageYOffset || 0);
    requestScrollRuntimeTick();

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
      intersectionObserver.disconnect();
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
    // Explicit z-index ensures this section sits correctly in the stack when sticky
    <section ref={containerRef} className="relative h-[400vh] bg-white z-10">

      {/* Sticky container needs to handle the view */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Header Overlay */}
        <div className="absolute top-32 left-6 md:left-12 z-30 mix-blend-difference text-white pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2 block">{t.globalRoam.badge}</span>
          <h2 className="font-display text-4xl">{t.globalRoam.title}</h2>
        </div>

        {/* Horizontal Track - Added will-change for GPU optimization */}
        <div
          ref={scrollRef}
          className="absolute top-0 left-0 h-full flex will-change-transform"
          style={{ willChange: 'transform' }}
        >

          {/* Intro / Spacer Panel */}
          <div className="w-[100vw] md:w-[30vw] h-full bg-white flex items-center justify-center border-r border-gray-100 flex-shrink-0">
            <div className="rotate-90 text-[10px] uppercase tracking-[0.3em] text-[#888]">
              Explore Environments
            </div>
          </div>

          {scenes.map((scene, idx) => (
            <div key={scene.id} className="w-[100vw] md:w-[60vw] h-full relative border-r border-white/20 group overflow-hidden flex-shrink-0">
              <img
                src={scene.img}
                alt={scene.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

              <div className="absolute bottom-12 left-12 text-white p-8 bg-black/20 backdrop-blur-md border border-white/10 max-w-sm z-20">
                <h3 className="text-3xl font-light mb-4">{scene.title}</h3>
                <p className="text-sm font-light opacity-90">{scene.desc}</p>
              </div>

              <div className="absolute top-12 right-12 text-white/50 font-mono text-xs z-20">
                0{idx + 1}
              </div>
            </div>
          ))}

          {/* Outro Panel */}
          <div className="w-[100vw] h-full bg-[#1D1D1F] flex items-center justify-center text-white flex-shrink-0">
            <div className="text-center">
              <p className="text-2xl font-light mb-8 max-w-xl mx-auto px-6">
                {t.globalRoam.desc}
              </p>
              <span className="text-[10px] uppercase tracking-widest text-white/40">End of Journey</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default GlobalRoam;
