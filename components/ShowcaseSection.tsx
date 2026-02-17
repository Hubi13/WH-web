import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ShowcaseSection: React.FC = () => {
    const { t } = useLanguage();
    const curtainSectionRef = useRef<HTMLDivElement>(null);
    const curtainRef = useRef<HTMLDivElement>(null);
    const metricsRef = useRef({ start: 0, range: 1 });
    const visibleRef = useRef(false);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const section = curtainSectionRef.current;
        const curtain = curtainRef.current;
        if (!section || !curtain) return;

        const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

        const measure = () => {
            const rect = section.getBoundingClientRect();
            metricsRef.current = {
                start: rect.top + window.scrollY,
                range: Math.max(1, rect.height - window.innerHeight),
            };
        };

        const applyAt = () => {
            const { start, range } = metricsRef.current;
            const scrollY = window.scrollY || window.pageYOffset || 0;
            const progress = clamp((scrollY - start) / range, 0, 1);
            curtain.style.transform = `translate3d(0, -${(progress * 100).toFixed(3)}%, 0)`;
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

        observer.observe(section);

        const resizeObserver = new ResizeObserver(onViewportChange);
        resizeObserver.observe(section);

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
    }, []);

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
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
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

                        <div className="w-full md:w-1/3 md:-ml-32 mt-8 md:mt-0 relative z-20 p-6 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] reveal-on-scroll rounded-xl bg-white/80 backdrop-blur-xl border border-white/50">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#86868B] mb-6">
                                02 - {t.hero.precision}
                            </span>
                            <h2 className="font-display text-[clamp(1.6rem,5vw,3.5rem)] text-[#1D1D1F] mb-6 leading-tight font-light">
                                {t.story.chapter2.title}
                            </h2>
                            <p className="text-[#6E6E73] leading-relaxed font-light text-lg">
                                {t.story.chapter2.text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={curtainSectionRef} className="relative h-[250vh] bg-black [contain:layout_paint_style]">
                <div className="sticky top-0 w-full h-screen overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://i.imgur.com/iWyQPX1.jpeg"
                            alt="Atmosphere"
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>

                        <div className="absolute bottom-12 left-6 md:bottom-24 md:left-24 text-white z-0 pointer-events-none max-w-xl pr-6">
                            <h2 className="font-display text-[clamp(1.75rem,8vw,6rem)] font-light mb-4 leading-tight">
                                {t.story.chapter3.title}
                            </h2>
                            <p className="text-lg md:text-xl font-light opacity-90 leading-relaxed">
                                {t.story.chapter3.text}
                            </p>
                        </div>
                    </div>

                    <div
                        ref={curtainRef}
                        className="absolute inset-0 z-10 bg-[#050505]/95 md:bg-[#050505]/90 backdrop-blur-none md:backdrop-blur-md w-full h-full flex flex-col items-center justify-end pb-32 will-change-transform shadow-2xl border-b border-white/20"
                        style={{ willChange: 'transform' }}
                    >
                        <div className="text-center max-w-2xl px-6 mb-24">
                            <span className="inline-block mb-8 px-4 py-1.5 border border-white/30 rounded-full bg-transparent">
                                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white">
                                    03 - Atmosphere
                                </span>
                            </span>
                            <h2 className="font-display text-4xl md:text-6xl font-light text-white tracking-tight mb-8 drop-shadow-md">
                                Light as Material.
                            </h2>
                            <p className="text-white/80 text-base md:text-lg font-light drop-shadow-sm">
                                Scroll to reveal the architecture of light.
                            </p>
                        </div>

                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[50%] z-20">
                            <div className="w-[1px] h-32 bg-white opacity-40"></div>
                            <div className="w-3 h-3 border border-white rounded-full bg-white -mt-1.5 -ml-[5px]"></div>
                        </div>

                        <div className="absolute bottom-0 w-full h-[1px] bg-white/30"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShowcaseSection;
