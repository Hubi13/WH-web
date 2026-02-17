import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const BAR_COUNT = 30;

const createBars = (inside: boolean) => {
    const base = inside ? 0.28 : 0.7;
    const variance = inside ? 0.2 : 0.32;

    return Array.from({ length: BAR_COUNT }, (_, index) => {
        const wave = Math.sin(index * 0.42) * 0.08;
        const noise = (Math.random() - 0.5) * variance;
        return Math.min(1, Math.max(0.08, base + wave + noise));
    });
};

const AcousticDemo: React.FC = () => {
    const { t } = useLanguage();
    const [isInside, setIsInside] = useState(false);
    const [bars, setBars] = useState<number[]>(() => createBars(false));
    const [reduceMotion, setReduceMotion] = useState(false);
    const zoneRef = useRef<HTMLDivElement>(null);
    const visibleRef = useRef(false);

    const meter = useMemo(() => (isInside ? 35 : 82), [isInside]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleChange = () => setReduceMotion(media.matches);

        handleChange();

        if (typeof media.addEventListener === 'function') {
            media.addEventListener('change', handleChange);
            return () => media.removeEventListener('change', handleChange);
        }

        media.addListener(handleChange);
        return () => media.removeListener(handleChange);
    }, []);

    useEffect(() => {
        const zone = zoneRef.current;
        if (!zone) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                visibleRef.current = Boolean(entry?.isIntersecting);
            },
            { threshold: 0.12 }
        );

        observer.observe(zone);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (reduceMotion) {
            setBars(createBars(isInside));
            return;
        }

        let timerId: number | null = null;
        const tick = () => {
            if (!visibleRef.current) return;
            setBars(createBars(isInside));
        };

        timerId = window.setInterval(tick, isInside ? 180 : 120);
        tick();

        return () => {
            if (timerId !== null) {
                window.clearInterval(timerId);
            }
        };
    }, [isInside, reduceMotion]);

    return (
        <section className="bg-[#0B0B0C] text-white py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.14),transparent_42%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.08),transparent_32%)]"></div>

            <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10 md:mb-14">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mb-4 block">Isonic Isolation</span>
                        <h2 className="font-display text-4xl md:text-5xl font-light">{t.acousticDemo.title}</h2>
                    </div>
                    <p className="text-sm text-white/65 max-w-md md:text-right leading-relaxed">{t.acousticDemo.desc}</p>
                </div>

                <div
                    ref={zoneRef}
                    className="relative rounded-2xl border border-white/15 bg-[#050505] overflow-hidden"
                    onMouseEnter={() => setIsInside(true)}
                    onMouseLeave={() => setIsInside(false)}
                    onTouchStart={() => setIsInside(true)}
                    onTouchEnd={() => setIsInside(false)}
                >
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_55%)]"></div>

                    <div className="relative px-5 md:px-10 pt-20 md:pt-24 pb-8 h-[52vh] md:h-[58vh] flex flex-col justify-end">
                        <div className="absolute top-5 left-5 md:top-7 md:left-8 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setIsInside((prev) => !prev)}
                                className="text-[10px] uppercase tracking-[0.22em] px-4 py-2 rounded-full border border-white/30 bg-white/5 hover:bg-white/12 transition-colors"
                            >
                                {isInside ? 'Switch to Outside' : 'Enter Sanctuary'}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-5 mb-8 text-[10px] uppercase tracking-[0.22em]">
                            <div className={`rounded-lg border px-3 py-2 ${!isInside ? 'border-red-400/50 text-red-300 bg-red-500/10' : 'border-white/20 text-white/50'}`}>
                                {t.acousticDemo.outside}
                            </div>
                            <div className={`rounded-lg border px-3 py-2 text-right ${isInside ? 'border-emerald-400/50 text-emerald-300 bg-emerald-500/10' : 'border-white/20 text-white/50'}`}>
                                {t.acousticDemo.inside}
                            </div>
                        </div>

                        <div className="h-[56%] min-h-[180px] flex items-end gap-1.5 md:gap-2">
                            {bars.map((bar, index) => (
                                <div key={index} className="flex-1 h-full flex items-end">
                                    <div
                                        className="w-full h-full rounded-sm transition-transform duration-150 ease-out"
                                        style={{
                                            transform: `scaleY(${bar.toFixed(3)})`,
                                            transformOrigin: 'bottom center',
                                            background: isInside
                                                ? 'linear-gradient(180deg, rgba(16,185,129,0.92), rgba(16,185,129,0.22))'
                                                : 'linear-gradient(180deg, rgba(239,68,68,0.92), rgba(239,68,68,0.22))',
                                            opacity: 0.54 + (index % 6) * 0.06,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 md:mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full ${isInside ? 'bg-emerald-400' : 'bg-red-400'} ${reduceMotion ? '' : 'animate-pulse'}`}></div>
                                <div className="font-mono text-2xl md:text-3xl tabular-nums leading-none">
                                    {meter}<span className="text-sm text-white/45 ml-1">dB</span>
                                </div>
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">Acoustic Delta {isInside ? '-47' : '+47'} dB</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AcousticDemo;
