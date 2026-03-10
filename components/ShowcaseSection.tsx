import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { requestScrollRuntimeTick, subscribeScrollFrame } from '../utils/scrollRuntime';

const DESKTOP_QUERY = '(min-width: 1024px)';

const ShowcaseSection: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainSectionRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const curtainMetricsRef = useRef({ start: 0, range: 1 });
  const isCurtainVisibleRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia(DESKTOP_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(DESKTOP_QUERY);
    const handleChange = () => setIsDesktop(media.matches);
    handleChange();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleChange);
      return () => media.removeEventListener('change', handleChange);
    }

    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const section = curtainSectionRef.current;
    const curtain = curtainRef.current;
    if (!section || !curtain) return;

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

    const measure = () => {
      const rect = section.getBoundingClientRect();
      curtainMetricsRef.current = {
        start: rect.top + window.scrollY,
        range: Math.max(1, rect.height - window.innerHeight),
      };
    };

    const applyAt = (scrollY: number) => {
      const { start, range } = curtainMetricsRef.current;
      const progress = clamp((scrollY - start) / range, 0, 1);
      curtain.style.transform = `translate3d(0, -${progress * 100}%, 0)`;
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isCurtainVisibleRef.current = Boolean(entry?.isIntersecting);
        if (isCurtainVisibleRef.current) requestScrollRuntimeTick();
      },
      { threshold: 0.01 }
    );

    visibilityObserver.observe(section);

    const resizeObserver = new ResizeObserver(() => {
      measure();
      applyAt(window.scrollY || window.pageYOffset || 0);
      requestScrollRuntimeTick();
    });

    resizeObserver.observe(section);

    const handleViewportChange = () => {
      measure();
      applyAt(window.scrollY || window.pageYOffset || 0);
      requestScrollRuntimeTick();
    };

    window.addEventListener('resize', handleViewportChange, { passive: true });
    window.addEventListener('orientationchange', handleViewportChange, { passive: true });

    const unsubscribe = subscribeScrollFrame(
      ({ scrollY }) => {
        if (!isCurtainVisibleRef.current) return;
        applyAt(scrollY);
      },
      () => isCurtainVisibleRef.current
    );

    measure();
    applyAt(window.scrollY || window.pageYOffset || 0);
    requestScrollRuntimeTick();

    return () => {
      unsubscribe();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
    };
  }, [isDesktop]);

  if (isDesktop) {
    return (
      <section ref={containerRef} className="relative bg-white text-[#1D1D1F] w-full">
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://i.imgur.com/dGFCeEU.jpeg"
              alt="Architecture"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          </div>

          <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2">
            <div className="reveal-on-scroll py-20 md:py-0">
              <span className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">01 - {t.story.chapter1.title}</span>
              <h2 className="font-display text-[clamp(1.75rem,9vw,6rem)] font-light leading-[1.1] mb-8 text-white">
                {t.story.chapter1.title}
              </h2>
              <p className="font-sans text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-md">
                {t.story.chapter1.text}
              </p>
            </div>
          </div>
        </div>

        <div className="min-h-screen relative py-20 md:py-24 flex items-center bg-[#F5F5F7] z-30">
          <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 relative">
            <div className="flex flex-col md:flex-row items-center relative">
              <div className="w-full md:w-3/4 h-[400px] sm:h-[500px] md:h-[85vh] relative z-10">
                <div className="w-full h-full p-1 rounded-none bg-gradient-to-br from-white/80 to-white/40 border border-white/60 shadow-2xl shadow-black/30 backdrop-blur-md">
                  <div className="w-full h-full rounded-none overflow-hidden relative bg-white shadow-inner group">
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

              <div className="w-full md:w-1/3 md:-ml-32 mt-8 md:mt-0 relative z-20 p-6 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] reveal-on-scroll rounded-none bg-white/80 backdrop-blur-xl border border-white/50">
                <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#86868B] mb-6">02 - {t.hero.precision}</span>
                <h2 className="font-display text-[clamp(1.6rem,5vw,3.5rem)] text-[#1D1D1F] mb-6 leading-tight font-light">
                  {t.story.chapter2.title}
                </h2>
                <p className="text-[#6E6E73] leading-relaxed font-light text-lg">{t.story.chapter2.text}</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={curtainSectionRef} className="relative h-[250vh] bg-black">
          <div className="sticky top-0 w-full h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="https://i.imgur.com/iWyQPX1.jpeg"
                alt="Atmosphere"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-12 left-6 md:bottom-24 md:left-24 text-white z-0 pointer-events-none max-w-xl pr-6">
                <h2 className="font-display text-[clamp(1.75rem,8vw,6rem)] font-light mb-4 leading-tight">{t.story.chapter3.title}</h2>
                <p className="text-lg md:text-xl font-light opacity-90 leading-relaxed">{t.story.chapter3.text}</p>
              </div>
            </div>

            <div
              ref={curtainRef}
              className="absolute inset-0 z-10 bg-[#050505]/95 md:bg-[#050505]/90 backdrop-blur-none md:backdrop-blur-md w-full h-full flex flex-col items-center justify-end pb-32 will-change-transform shadow-2xl border-b border-white/20"
              style={{ willChange: 'transform' }}
            >
              <div className="text-center max-w-2xl px-6 mb-24">
                <span className="inline-block mb-8 px-4 py-1.5 border border-white/30 rounded-full bg-transparent">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white">03 - Atmosphere</span>
                </span>
                <h2 className="font-display text-4xl md:text-6xl font-light text-white tracking-tight mb-8 drop-shadow-md">Light as Material.</h2>
                <p className="text-white/80 text-base md:text-lg font-light drop-shadow-sm">Scroll to reveal the architecture of light.</p>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[50%] z-20">
                <div className="w-[1px] h-32 bg-white opacity-40" />
                <div className="w-3 h-3 border border-white rounded-full bg-white -mt-1.5 -ml-[5px]" />
              </div>

              <div className="absolute bottom-0 w-full h-[1px] bg-white/30" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-white text-[#1D1D1F] w-full">
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.imgur.com/dGFCeEU.jpeg"
            alt="Architecture"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent"></div>
        </div>

        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2">
          <div className="reveal-on-scroll py-20 md:py-0">
            <span className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">01 - {t.story.chapter1.title}</span>
            <h2 className="font-display text-[clamp(1.75rem,9vw,6rem)] font-light leading-[1.1] mb-8 text-white">{t.story.chapter1.title}</h2>
            <p className="font-sans text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-md">{t.story.chapter1.text}</p>
          </div>
        </div>
      </div>

      <div className="min-h-screen relative py-20 md:py-24 flex items-center bg-[#F5F5F7] z-20">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 relative">
          <div className="flex flex-col md:flex-row items-center relative">
            <div className="w-full md:w-3/4 h-[400px] sm:h-[500px] md:h-[85vh] relative z-10">
              <div className="w-full h-full p-1 rounded-none bg-gradient-to-br from-white/85 to-white/45 border border-white/60 shadow-2xl shadow-black/20 backdrop-blur-md">
                <div className="w-full h-full rounded-none overflow-hidden relative bg-white shadow-inner group">
                  <img
                    src="https://i.imgur.com/7ou8tEP.jpeg"
                    alt="Structure Detail"
                    className="w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3 md:-ml-32 mt-8 md:mt-0 relative z-20 p-6 md:p-16 rounded-none border border-white/55 bg-white/80 backdrop-blur-xl shadow-[0_24px_50px_-16px_rgba(0,0,0,0.2)] reveal-on-scroll">
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#86868B] mb-6">02 - {t.hero.precision}</span>
              <h2 className="font-display text-[clamp(1.6rem,5vw,3.5rem)] text-[#1D1D1F] mb-6 leading-tight font-light">{t.story.chapter2.title}</h2>
              <p className="text-[#6E6E73] leading-relaxed font-light text-lg">{t.story.chapter2.text}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-black">
        <div className="relative h-[72vh] overflow-hidden border-y border-white/10">
          <img
            src="https://i.imgur.com/iWyQPX1.jpeg"
            alt="Light as Material"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/72"></div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute -inset-3 rounded-[1.2rem] border border-white/20 rotate-6"></div>
            <div className="relative w-[62vw] max-w-[250px] aspect-square rounded-xl border border-white/25 bg-black/55 backdrop-blur-sm p-4 text-white flex flex-col justify-center text-center">
              <span className="block text-[10px] uppercase tracking-[0.24em] text-white/70 mb-2">03 - Atmosphere</span>
              <h3 className="font-display text-[1.8rem] font-light mb-2 leading-tight">Light as Material.</h3>
              <p className="text-xs text-white/80 leading-relaxed">{t.story.chapter3.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
