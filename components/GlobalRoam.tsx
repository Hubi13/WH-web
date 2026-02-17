import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DESKTOP_QUERY = '(min-width: 1024px)';

const GlobalRoam: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef({ start: 0, range: 1, travel: 0 });
  const visibleRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia(DESKTOP_QUERY).matches;
  });

  const scenes = useMemo(
    () => [
      {
        id: 'alpine',
        index: '01',
        title: t.globalRoam.locations[0].title,
        desc: t.globalRoam.locations[0].desc,
        img: 'https://i.imgur.com/dGFCeEU.jpeg',
      },
      {
        id: 'coastal',
        index: '02',
        title: t.globalRoam.locations[1].title,
        desc: t.globalRoam.locations[1].desc,
        img: 'https://i.imgur.com/ay5UUWQ.jpeg',
      },
      {
        id: 'forest',
        index: '03',
        title: t.globalRoam.locations[2].title,
        desc: t.globalRoam.locations[2].desc,
        img: 'https://i.imgur.com/7ou8tEP.jpeg',
      },
    ],
    [t.globalRoam.locations]
  );

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

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

    const measure = () => {
      const rect = container.getBoundingClientRect();
      metricsRef.current = {
        start: rect.top + window.scrollY,
        range: Math.max(1, rect.height - window.innerHeight),
        travel: Math.max(0, track.scrollWidth - window.innerWidth),
      };
    };

    const applyAt = () => {
      const { start, range, travel } = metricsRef.current;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const progress = clamp((scrollY - start) / range, 0, 1);
      track.style.transform = `translate3d(-${(travel * progress).toFixed(2)}px, 0, 0)`;
    };

    const requestDraw = () => {
      if (!visibleRef.current || rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        applyAt();
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = Boolean(entry?.isIntersecting);
        if (visibleRef.current) requestDraw();
      },
      { threshold: 0.01 }
    );

    const onViewportChange = () => {
      measure();
      requestDraw();
    };

    observer.observe(container);

    const resizeObserver = new ResizeObserver(onViewportChange);
    resizeObserver.observe(container);
    resizeObserver.observe(track);

    window.addEventListener('scroll', requestDraw, { passive: true });
    window.addEventListener('resize', onViewportChange, { passive: true });
    window.addEventListener('orientationchange', onViewportChange, { passive: true });

    measure();
    applyAt();

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestDraw);
      window.removeEventListener('resize', onViewportChange);
      window.removeEventListener('orientationchange', onViewportChange);
    };
  }, [isDesktop, scenes]);

  if (!isDesktop) {
    return (
      <section className="py-16 bg-white text-[#1D1D1F]">
        <div className="max-w-[1800px] mx-auto px-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#86868B] mb-3 block">{t.globalRoam.badge}</span>
          <h2 className="font-display text-4xl font-light mb-4">{t.globalRoam.title}</h2>
          <p className="text-[#6E6E73] leading-relaxed mb-8">{t.globalRoam.desc}</p>

          <div className="space-y-5">
            {scenes.map((scene) => (
              <article key={scene.id} className="rounded-2xl overflow-hidden border border-black/10 bg-[#F5F5F7]">
                <div className="relative aspect-[4/3]">
                  <img src={scene.img} alt={scene.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/55"></div>
                  <span className="absolute top-4 right-4 text-white/75 font-mono text-xs">{scene.index}</span>
                  <h3 className="absolute left-4 bottom-4 text-white text-2xl font-light">{scene.title}</h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[#4C4C52] leading-relaxed">{scene.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[380vh] bg-white z-10 [contain:layout_paint_style]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute top-28 left-8 xl:left-12 z-30 pointer-events-none mix-blend-difference text-white">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2 block">{t.globalRoam.badge}</span>
          <h2 className="font-display text-4xl xl:text-5xl font-light">{t.globalRoam.title}</h2>
        </div>

        <div ref={trackRef} className="absolute top-0 left-0 h-full flex will-change-transform" style={{ willChange: 'transform' }}>
          <div className="w-[35vw] min-w-[320px] h-full bg-white border-r border-black/10 flex items-center justify-center flex-shrink-0">
            <div className="rotate-90 text-[10px] tracking-[0.32em] uppercase text-[#8B8B90]">Global Capability</div>
          </div>

          {scenes.map((scene) => (
            <article key={scene.id} className="relative w-[65vw] min-w-[820px] h-full border-r border-white/20 overflow-hidden flex-shrink-0">
              <img src={scene.img} alt={scene.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-black/25"></div>

              <div className="absolute top-10 right-10 text-white/60 text-xs font-mono">{scene.index}</div>

              <div className="absolute bottom-12 left-12 max-w-sm rounded-2xl border border-white/20 bg-black/35 backdrop-blur-sm p-7 text-white">
                <h3 className="text-3xl font-light mb-4">{scene.title}</h3>
                <p className="text-sm text-white/85 leading-relaxed">{scene.desc}</p>
              </div>
            </article>
          ))}

          <div className="w-[65vw] min-w-[760px] h-full bg-[#1D1D1F] text-white flex-shrink-0 flex items-center justify-center">
            <div className="text-center max-w-2xl px-10">
              <p className="text-3xl font-light leading-relaxed mb-6">{t.globalRoam.desc}</p>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">End of Journey</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalRoam;
