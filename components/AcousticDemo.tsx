import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const BAR_COUNT = 26;

const AcousticDemo: React.FC = () => {
    const { t } = useLanguage();
    const [isInside, setIsInside] = useState(false);
    const [bars, setBars] = useState<number[]>(() => Array.from({ length: BAR_COUNT }, () => 30));
    const zoneRef = useRef<HTMLDivElement>(null);
    const visibleRef = useRef(false);

    const toggleState = () => setIsInside((prev) => !prev);

    useEffect(() => {
        const zone = zoneRef.current;
        if (!zone) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                visibleRef.current = Boolean(entry?.isIntersecting);
            },
            { threshold: 0.15 }
        );

        observer.observe(zone);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let timerId: number | null = null;

        const tick = () => {
            if (!visibleRef.current) return;
            const base = isInside ? 16 : 64;
            const variance = isInside ? 12 : 32;
            setBars((prev) => prev.map(() => Math.max(6, Math.min(96, base + (Math.random() * variance - variance * 0.5)))));
        };

        timerId = window.setInterval(tick, isInside ? 180 : 110);
        tick();

        return () => {
            if (timerId !== null) {
                window.clearInterval(timerId);
            }
        };
    }, [isInside]);

    const meter = useMemo(() => (isInside ? 35 : 82), [isInside]);

    return (
        <section className="bg-[#0D0D0E] text-white py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_35%)]"></div>

            <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mb-4 block">Interactive Demo</span>
                        <h2 className="font-display text-4xl md:text-5xl font-light">{t.acousticDemo.title}</h2>
                    </div>
                    <p className="text-sm text-white/60 max-w-md md:text-right leading-relaxed">{t.acousticDemo.desc}</p>
                </div>

                <div
                    ref={zoneRef}
                    className="relative border border-white/15 bg-[#050505] rounded-2xl overflow-hidden"
                    onMouseEnter={() => setIsInside(true)}
                    onMouseLeave={() => setIsInside(false)}
                    onTouchStart={() => setIsInside(true)}
                    onTouchEnd={() => setIsInside(false)}
                >
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_60%)]"></div>

                    <div className="relative h-[52vh] md:h-[58vh] px-5 md:px-10 pb-8 pt-20 md:pt-24 flex flex-col justify-end">
                        <div className="absolute top-5 left-5 md:top-7 md:left-8">
                            <button
                                type="button"
                                onClick={toggleState}
                                className="text-[10px] uppercase tracking-[0.22em] border border-white/30 bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 rounded-full"
                            >
                                {isInside ? 'Switch to Outside' : 'Enter Sanctuary'}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-5 mb-8 text-[10px] uppercase tracking-[0.22em]">
                            <div className={`border rounded-lg px-3 py-2 ${!isInside ? 'border-red-400/50 text-red-300 bg-red-500/10' : 'border-white/15 text-white/45'}`}>
                                {t.acousticDemo.outside}
                            </div>
                            <div className={`border rounded-lg px-3 py-2 text-right ${isInside ? 'border-emerald-400/50 text-emerald-300 bg-emerald-500/10' : 'border-white/15 text-white/45'}`}>
                                {t.acousticDemo.inside}
                            </div>
                        </div>

                        <div className="h-[55%] min-h-[180px] flex items-end gap-1.5 md:gap-2">
                            {bars.map((bar, idx) => (
                                <div key={idx} className="flex-1 flex items-end h-full">
                                    <div
                                        className="w-full rounded-sm transition-all duration-150 ease-out"
                                        style={{
                                            height: `${bar}%`,
                                            background: isInside
                                                ? 'linear-gradient(180deg, rgba(16,185,129,0.9), rgba(16,185,129,0.2))'
                                                : 'linear-gradient(180deg, rgba(239,68,68,0.9), rgba(239,68,68,0.2))',
                                            opacity: 0.55 + (idx % 5) * 0.07,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 md:mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                            <div className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full ${isInside ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`}></div>
                                <div className="font-mono text-2xl md:text-3xl tabular-nums leading-none">{meter}<span className="text-sm text-white/45 ml-1">dB</span></div>
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
