import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const POINTS = 40;

const makeWave = (intensity: number) => {
    const base = Math.max(0.08, Math.min(0.95, intensity));
    return Array.from({ length: POINTS }, (_, idx) => {
        const trend = Math.sin(idx * 0.32) * 0.1;
        const jitter = (Math.random() - 0.5) * 0.24;
        return Math.max(0.08, Math.min(0.98, base + trend + jitter));
    });
};

const AcousticDemo: React.FC = () => {
    const { t } = useLanguage();
    const [outsideDb, setOutsideDb] = useState(80);
    const [mode, setMode] = useState<'outside' | 'inside'>('inside');
    const [outsideWave, setOutsideWave] = useState<number[]>(() => makeWave(0.8));
    const [insideWave, setInsideWave] = useState<number[]>(() => makeWave(0.34));
    const [reduceMotion, setReduceMotion] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const visibleRef = useRef(false);

    const insideDb = useMemo(() => Math.max(32, outsideDb - 46), [outsideDb]);
    const reduction = useMemo(() => outsideDb - insideDb, [outsideDb, insideDb]);

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
            { threshold: 0.15 }
        );

        observer.observe(root);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const update = () => {
            if (!visibleRef.current) return;
            setOutsideWave(makeWave(outsideDb / 100));
            setInsideWave(makeWave(insideDb / 100));
        };

        update();
        if (reduceMotion) return;

        const id = window.setInterval(update, 170);
        return () => window.clearInterval(id);
    }, [outsideDb, insideDb, reduceMotion]);

    return (
        <section className="relative py-20 md:py-32 bg-[#0A0A0B] text-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.16),transparent_38%),radial-gradient(circle_at_88%_82%,rgba(255,255,255,0.08),transparent_30%)]"></div>

            <div ref={rootRef} className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/55 mb-4 block">Isonic Isolation</span>
                        <h2 className="font-display text-4xl md:text-5xl font-light">{t.acousticDemo.title}</h2>
                    </div>
                    <p className="text-sm text-white/65 md:text-right max-w-md leading-relaxed">{t.acousticDemo.desc}</p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-[#050506] overflow-hidden">
                    <div className="border-b border-white/10 px-5 md:px-8 py-5 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
                        <div className="lg:col-span-4 flex gap-2">
                            <button
                                type="button"
                                onClick={() => setMode('outside')}
                                className={`px-4 py-2 rounded-full border text-[10px] uppercase tracking-[0.22em] transition-colors ${mode === 'outside' ? 'border-red-400/60 bg-red-500/15 text-red-200' : 'border-white/25 bg-white/5 text-white/75 hover:bg-white/10'}`}
                            >
                                Outside
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode('inside')}
                                className={`px-4 py-2 rounded-full border text-[10px] uppercase tracking-[0.22em] transition-colors ${mode === 'inside' ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-200' : 'border-white/25 bg-white/5 text-white/75 hover:bg-white/10'}`}
                            >
                                Inside
                            </button>
                        </div>

                        <div className="lg:col-span-5">
                            <label htmlFor="outside-db" className="text-[10px] uppercase tracking-[0.22em] text-white/55 mb-2 block">
                                Source Noise Level: {outsideDb} dB
                            </label>
                            <input
                                id="outside-db"
                                type="range"
                                min={68}
                                max={92}
                                value={outsideDb}
                                onChange={(e) => setOutsideDb(Number(e.target.value))}
                                className="w-full accent-white"
                            />
                        </div>

                        <div className="lg:col-span-3 grid grid-cols-3 gap-2 text-center">
                            <div className="rounded-lg border border-white/15 bg-white/[0.03] px-2 py-2">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Input</p>
                                <p className="font-mono text-sm mt-1">{outsideDb}</p>
                            </div>
                            <div className="rounded-lg border border-white/15 bg-white/[0.03] px-2 py-2">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Inside</p>
                                <p className="font-mono text-sm mt-1">{insideDb}</p>
                            </div>
                            <div className="rounded-lg border border-white/15 bg-white/[0.03] px-2 py-2">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Delta</p>
                                <p className="font-mono text-sm mt-1">-{reduction}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 md:p-8">
                        <article className={`rounded-xl border p-4 md:p-5 ${mode === 'outside' ? 'border-red-400/45 bg-red-500/10' : 'border-white/15 bg-white/[0.03]'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">{t.acousticDemo.outside}</span>
                                <span className="font-mono text-xl">{outsideDb}<span className="text-xs text-white/50 ml-1">dB</span></span>
                            </div>

                            <div className="h-44 md:h-52 flex items-end gap-1">
                                {outsideWave.map((point, idx) => (
                                    <div key={idx} className="flex-1 h-full flex items-end">
                                        <div
                                            className="w-full h-full rounded-[2px] transition-transform duration-150 ease-out"
                                            style={{
                                                transform: `scaleY(${point.toFixed(3)})`,
                                                transformOrigin: 'bottom center',
                                                background: 'linear-gradient(180deg,rgba(239,68,68,0.95),rgba(239,68,68,0.18))',
                                                opacity: 0.58 + (idx % 4) * 0.08,
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className={`rounded-xl border p-4 md:p-5 ${mode === 'inside' ? 'border-emerald-400/45 bg-emerald-500/10' : 'border-white/15 bg-white/[0.03]'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">{t.acousticDemo.inside}</span>
                                <span className="font-mono text-xl">{insideDb}<span className="text-xs text-white/50 ml-1">dB</span></span>
                            </div>

                            <div className="h-44 md:h-52 flex items-end gap-1">
                                {insideWave.map((point, idx) => (
                                    <div key={idx} className="flex-1 h-full flex items-end">
                                        <div
                                            className="w-full h-full rounded-[2px] transition-transform duration-150 ease-out"
                                            style={{
                                                transform: `scaleY(${point.toFixed(3)})`,
                                                transformOrigin: 'bottom center',
                                                background: 'linear-gradient(180deg,rgba(16,185,129,0.95),rgba(16,185,129,0.18))',
                                                opacity: 0.62 + (idx % 4) * 0.07,
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AcousticDemo;
