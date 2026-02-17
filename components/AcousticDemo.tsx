import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const BAR_COUNT = 28;

const createBars = (strength: number) => {
    const clamped = Math.max(0.08, Math.min(1, strength));

    return Array.from({ length: BAR_COUNT }, (_, index) => {
        const wave = Math.sin(index * 0.45) * 0.09;
        const noise = (Math.random() - 0.5) * (0.18 + clamped * 0.2);
        return Math.max(0.08, Math.min(1, clamped + wave + noise));
    });
};

const AcousticDemo: React.FC = () => {
    const { t } = useLanguage();
    const [focusMode, setFocusMode] = useState<'outside' | 'inside'>('outside');
    const [outsideDb, setOutsideDb] = useState(82);
    const [outsideBars, setOutsideBars] = useState<number[]>(() => createBars(0.82));
    const [insideBars, setInsideBars] = useState<number[]>(() => createBars(0.35));
    const [reduceMotion, setReduceMotion] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const visibleRef = useRef(false);

    const insideDb = useMemo(() => Math.max(30, Math.round(outsideDb - 47)), [outsideDb]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setReduceMotion(media.matches);

        onChange();

        if (typeof media.addEventListener === 'function') {
            media.addEventListener('change', onChange);
            return () => media.removeEventListener('change', onChange);
        }

        media.addListener(onChange);
        return () => media.removeListener(onChange);
    }, []);

    useEffect(() => {
        const panel = panelRef.current;
        if (!panel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                visibleRef.current = Boolean(entry?.isIntersecting);
            },
            { threshold: 0.12 }
        );

        observer.observe(panel);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const updateBars = () => {
            if (!visibleRef.current) return;
            const outsideStrength = outsideDb / 100;
            const insideStrength = Math.max(0.15, Math.min(0.42, insideDb / 100));
            setOutsideBars(createBars(outsideStrength));
            setInsideBars(createBars(insideStrength));
        };

        if (reduceMotion) {
            updateBars();
            return;
        }

        const intervalId = window.setInterval(updateBars, 130);
        updateBars();

        return () => window.clearInterval(intervalId);
    }, [outsideDb, insideDb, reduceMotion]);

    return (
        <section className="relative bg-[#09090A] text-white py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.14),transparent_40%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.08),transparent_35%)] opacity-25"></div>

            <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10 md:mb-14">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/55 mb-4 block">Isonic Isolation</span>
                        <h2 className="font-display text-4xl md:text-5xl font-light">{t.acousticDemo.title}</h2>
                    </div>
                    <p className="text-sm text-white/65 max-w-md md:text-right leading-relaxed">{t.acousticDemo.desc}</p>
                </div>

                <div ref={panelRef} className="rounded-2xl border border-white/15 bg-[#040405] overflow-hidden">
                    <div className="px-5 md:px-10 pt-6 md:pt-8 pb-7 border-b border-white/10">
                        <div className="flex flex-col lg:flex-row lg:items-end gap-5 lg:gap-8">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFocusMode('outside')}
                                    className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition-colors ${focusMode === 'outside' ? 'border-red-400/55 bg-red-500/15 text-red-200' : 'border-white/25 bg-white/5 text-white/70 hover:bg-white/10'}`}
                                >
                                    Outside Focus
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFocusMode('inside')}
                                    className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition-colors ${focusMode === 'inside' ? 'border-emerald-400/55 bg-emerald-500/15 text-emerald-200' : 'border-white/25 bg-white/5 text-white/70 hover:bg-white/10'}`}
                                >
                                    Inside Focus
                                </button>
                            </div>

                            <div className="w-full lg:flex-1">
                                <label htmlFor="noise-intensity" className="text-[10px] uppercase tracking-[0.22em] text-white/55 block mb-2">
                                    Urban Intensity: {outsideDb} dB
                                </label>
                                <input
                                    id="noise-intensity"
                                    type="range"
                                    min={68}
                                    max={92}
                                    value={outsideDb}
                                    onChange={(event) => setOutsideDb(Number(event.target.value))}
                                    className="w-full accent-white"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 p-5 md:p-8">
                        <article className={`rounded-xl border p-4 md:p-5 transition-colors ${focusMode === 'outside' ? 'border-red-400/40 bg-red-500/10' : 'border-white/15 bg-white/[0.03]'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] uppercase tracking-[0.22em] text-white/60">{t.acousticDemo.outside}</span>
                                <span className="font-mono text-xl tabular-nums">{outsideDb}<span className="text-xs text-white/50 ml-1">dB</span></span>
                            </div>

                            <div className="h-44 md:h-52 flex items-end gap-1.5">
                                {outsideBars.map((bar, index) => (
                                    <div key={index} className="flex-1 h-full flex items-end">
                                        <div
                                            className="w-full h-full rounded-sm transition-transform duration-150 ease-out"
                                            style={{
                                                transform: `scaleY(${bar.toFixed(3)})`,
                                                transformOrigin: 'bottom center',
                                                background: 'linear-gradient(180deg, rgba(239,68,68,0.95), rgba(239,68,68,0.2))',
                                                opacity: 0.56 + (index % 6) * 0.06,
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className={`rounded-xl border p-4 md:p-5 transition-colors ${focusMode === 'inside' ? 'border-emerald-400/40 bg-emerald-500/10' : 'border-white/15 bg-white/[0.03]'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] uppercase tracking-[0.22em] text-white/60">{t.acousticDemo.inside}</span>
                                <span className="font-mono text-xl tabular-nums">{insideDb}<span className="text-xs text-white/50 ml-1">dB</span></span>
                            </div>

                            <div className="h-44 md:h-52 flex items-end gap-1.5">
                                {insideBars.map((bar, index) => (
                                    <div key={index} className="flex-1 h-full flex items-end">
                                        <div
                                            className="w-full h-full rounded-sm transition-transform duration-150 ease-out"
                                            style={{
                                                transform: `scaleY(${bar.toFixed(3)})`,
                                                transformOrigin: 'bottom center',
                                                background: 'linear-gradient(180deg, rgba(16,185,129,0.95), rgba(16,185,129,0.22))',
                                                opacity: 0.6 + (index % 6) * 0.05,
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </div>

                    <div className="px-5 md:px-8 pb-7 md:pb-8">
                        <div className="rounded-xl border border-white/15 bg-white/[0.03] px-4 md:px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">Isolation Delta</span>
                            <div className="font-mono text-lg tabular-nums">{outsideDb - insideDb}<span className="text-xs text-white/50 ml-1">dB reduction</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AcousticDemo;
