import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DESKTOP_QUERY = '(min-width: 1024px)';

const ShowcaseSection: React.FC = () => {
    const { t } = useLanguage();
    const curtainSectionRef = useRef<HTMLDivElement>(null);
    const curtainRef = useRef<HTMLDivElement>(null);
    const metricsRef = useRef({ start: 0, range: 1 });
    const visibleRef = useRef(false);
    const rafRef = useRef<number | null>(null);
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
            curtain.style.opacity = `${(1 - progress * 0.2).toFixed(3)}`;
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
    }, [isDesktop]);

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
                        <h2 className="font-display text-[clamp(1.75rem,9vw,6rem)] font-light leading-[1.1] mb-8 text-white">
                            {t.story.chapter1.title}
                        </h2>
                        <p className="font-sans text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-md">
                            {t.story.chapter1.text}
                        </p>
                    </div>
                </div>
            </div>

            <div className="min-h-screen relative py-20 md:py-24 flex items-center bg-[#F5F5F7] z-20">
                <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 relative">
                    <div className="flex flex-col md:flex-row items-center relative">
                        <div className="w-full md:w-3/4 h-[400px] sm:h-[500px] md:h-[85vh] relative z-10">
                            <div className="w-full h-full p-1 rounded-xl bg-gradient-to-br from-white/85 to-white/45 border border-white/60 shadow-2xl shadow-black/20 backdrop-blur-md">
                                <div className="w-full h-full rounded-lg overflow-hidden relative bg-white shadow-inner group">
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

                        <div className="w-full md:w-1/3 md:-ml-32 mt-8 md:mt-0 relative z-20 p-6 md:p-16 rounded-xl border border-white/55 bg-white/80 backdrop-blur-xl shadow-[0_24px_50px_-16px_rgba(0,0,0,0.2)] reveal-on-scroll">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#86868B] mb-6">02 - {t.hero.precision}</span>
                            <h2 className="font-display text-[clamp(1.6rem,5vw,3.5rem)] text-[#1D1D1F] mb-6 leading-tight font-light">{t.story.chapter2.title}</h2>
                            <p className="text-[#6E6E73] leading-relaxed font-light text-lg">{t.story.chapter2.text}</p>
                        </div>
                    </div>
                </div>
            </div>

            {isDesktop ? (
                <div ref={curtainSectionRef} className="relative h-[240vh] bg-black [contain:layout_paint_style]">
                    <div className="sticky top-0 w-full h-screen overflow-hidden">
                        <div className="absolute inset-0">
                            <img
                                src="https://i.imgur.com/iWyQPX1.jpeg"
                                alt="Light as Material"
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-black/55"></div>

                            <div className="absolute bottom-14 left-8 md:bottom-20 md:left-20 z-10 text-white max-w-xl pr-6">
                                <h2 className="font-display text-[clamp(2rem,7vw,5rem)] font-light leading-tight mb-4">{t.story.chapter3.title}</h2>
                                <p className="text-lg md:text-xl text-white/85 font-light leading-relaxed">{t.story.chapter3.text}</p>
                            </div>
                        </div>

                        <div
                            ref={curtainRef}
                            className="absolute inset-0 z-20 bg-[#040404]/97 backdrop-blur-xl flex items-end justify-center pb-28 will-change-transform border-b border-white/25"
                            style={{ willChange: 'transform, opacity' }}
                        >
                            <div className="text-center px-6 max-w-3xl">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 text-white/85 text-[10px] uppercase tracking-[0.28em] mb-8">
                                    03 - Atmosphere
                                </span>
                                <h3 className="font-display text-[clamp(2rem,5vw,4.25rem)] font-light text-white tracking-tight mb-6">Light as Material.</h3>
                                <p className="text-white/80 font-light text-base md:text-lg">Scroll to reveal the architecture of light.</p>
                            </div>

                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[52%] z-30">
                                <div className="w-[1px] h-28 bg-white/45"></div>
                                <div className="w-3 h-3 rounded-full border border-white bg-white -mt-1.5 -ml-[5px]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
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

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[76vw] max-w-[320px] aspect-square rounded-2xl border border-white/25 bg-black/55 backdrop-blur-sm p-5 text-white flex flex-col justify-center text-center">
                            <span className="block text-[10px] uppercase tracking-[0.24em] text-white/70 mb-2">03 - Atmosphere</span>
                            <h3 className="font-display text-3xl font-light mb-2">Light as Material.</h3>
                            <p className="text-sm text-white/80 leading-relaxed">{t.story.chapter3.text}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ShowcaseSection;
