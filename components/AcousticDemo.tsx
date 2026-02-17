import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const COLUMN_COUNT = 24;

const makeColumns = (level: number) => {
    const base = Math.max(0.08, Math.min(0.95, level));
    return Array.from({ length: COLUMN_COUNT }, (_, idx) => {
        const ripple = Math.sin(idx * 0.48) * 0.1;
        const random = (Math.random() - 0.5) * 0.25;
        return Math.max(0.06, Math.min(1, base + ripple + random));
    });
};

const AcousticDemo: React.FC = () => {
    const { t } = useLanguage();
    const [outsideDb, setOutsideDb] = useState(82);
    const [mode, setMode] = useState<'outside' | 'inside'>('outside');
    const [outsideCols, setOutsideCols] = useState<number[]>(() => makeColumns(0.82));
    const [insideCols, setInsideCols] = useState<number[]>(() => makeColumns(0.35));
    const [reduceMotion, setReduceMotion] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const visibleRef = useRef(false);

    const insideDb = useMemo(() => Math.max(31, Math.round(outsideDb - 47)), [outsideDb]);

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
        const root = rootRef.current;
        if (!root) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                visibleRef.current = Boolean(entry?.isIntersecting);
            },
            { threshold: 0.12 }
        );

        observer.observe(root);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const repaint = () => {
            if (!visibleRef.current) return;
            setOutsideCols(makeColumns(outsideDb / 100));
            setInsideCols(makeColumns(insideDb / 100));
        };

        repaint();
        if (reduceMotion) return;

        const intervalId = window.setInterval(repaint, 150);
        return () => window.clearInterval(intervalId);
    }, [outsideDb, insideDb, reduceMotion]);

    return (
        <section className="relative bg-[#0A0A0B] text-white py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.14),transparent_40%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.08),transparent_34%)]"></div>

            <div ref={rootRef} className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10 md:mb-14">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mb-4 block">Isonic Isolation</span>
                        <h2 className="font-display text-4xl md:text-5xl font-light">{t.acousticDemo.title}</h2>
                    </div>
                    <p className="text-sm text-white/65 max-w-md md:text-right leading-relaxed">{t.acousticDemo.desc}</p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-[#050506] overflow-hidden">
                    <div className="px-5 md:px-8 py-5 border-b border-white/10 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-7">
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setMode('outside')}
                                className={`px-4 py-2 rounded-full border text-[10px] uppercase tracking-[0.22em] transition-colors ${mode === 'outside' ? 'border-red-400/60 bg-red-500/15 text-red-200' : 'border-white/25 bg-white/5 text-white/70 hover:bg-white/10'}`}
                            >
                                Outside Focus
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode('inside')}
                                className={`px-4 py-2 rounded-full border text-[10px] uppercase tracking-[0.22em] transition-colors ${mode === 'inside' ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-200' : 'border-white/25 bg-white/5 text-white/70 hover:bg-white/10'}`}
                            >
                                Inside Focus
                            </button>
                        </div>

                        <div className="w-full lg:flex-1">
                            <label htmlFor="noise-level" className="text-[10px] uppercase tracking-[0.22em] text-white/50 mb-2 block">
                                Urban Noise Input: {outsideDb} dB
                            </label>
                            <input
                                id="noise-level"
                                type="range"
                                min={70}
                                max={92}
                                step={1}
                                value={outsideDb}
                                onChange={(e) => setOutsideDb(Number(e.target.value))}
                                className="w-full accent-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 md:p-8">
                        <article className={`rounded-xl border p-4 md:p-5 ${mode === 'outside' ? 'border-red-400/40 bg-red-500/10' : 'border-white/15 bg-white/[0.03]'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">{t.acousticDemo.outside}</span>
                                <span className="font-mono text-xl">{outsideDb}<span className="text-xs text-white/50 ml-1">dB</span></span>
                            </div>

                            <div className="h-44 md:h-52 flex items-end gap-1.5">
                                {outsideCols.map((value, idx) => (
                                    <div key={idx} className="flex-1 h-full flex items-end">
                                        <div
                                            className="w-full h-full rounded-sm transition-transform duration-150 ease-out"
                                            style={{
                                                transform: `scaleY(${value.toFixed(3)})`,
                                                transformOrigin: 'bottom center',
                                                background: 'linear-gradient(180deg, rgba(239,68,68,0.95), rgba(239,68,68,0.2))',
                                                opacity: 0.58 + (idx % 5) * 0.06,
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className={`rounded-xl border p-4 md:p-5 ${mode === 'inside' ? 'border-emerald-400/40 bg-emerald-500/10' : 'border-white/15 bg-white/[0.03]'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">{t.acousticDemo.inside}</span>
                                <span className="font-mono text-xl">{insideDb}<span className="text-xs text-white/50 ml-1">dB</span></span>
                            </div>

                            <div className="h-44 md:h-52 flex items-end gap-1.5">
                                {insideCols.map((value, idx) => (
                                    <div key={idx} className="flex-1 h-full flex items-end">
                                        <div
                                            className="w-full h-full rounded-sm transition-transform duration-150 ease-out"
                                            style={{
                                                transform: `scaleY(${value.toFixed(3)})`,
                                                transformOrigin: 'bottom center',
                                                background: 'linear-gradient(180deg, rgba(16,185,129,0.95), rgba(16,185,129,0.2))',
                                                opacity: 0.62 + (idx % 5) * 0.05,
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </div>

                    <div className="px-5 md:px-8 pb-7 md:pb-8">
                        <div className="rounded-xl border border-white/15 bg-white/[0.03] px-4 md:px-5 py-4 flex items-center justify-between gap-4">
                            <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">Measured Reduction</span>
                            <span className="font-mono text-lg">{outsideDb - insideDb}<span className="text-xs text-white/50 ml-1">dB</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AcousticDemo;
