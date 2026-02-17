import React, { useMemo, useState } from 'react';
import { LIFECYCLE_STEPS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const ProcessTimeline: React.FC = () => {
    const { t, language } = useLanguage();
    const [activeId, setActiveId] = useState(LIFECYCLE_STEPS[0]?.id ?? 1);

    const getText = (step: any, type: 'title' | 'description') => {
        if (language === 'PL') return step[`${type}PL`];
        if (language === 'ES') return step[`${type}ES`];
        return step[type];
    };

    const activeIndex = useMemo(() => {
        const idx = LIFECYCLE_STEPS.findIndex((step) => step.id === activeId);
        return idx < 0 ? 0 : idx;
    }, [activeId]);

    const active = LIFECYCLE_STEPS[activeIndex] ?? LIFECYCLE_STEPS[0];

    return (
        <section id="process" className="relative py-20 md:py-36 bg-[#050505] text-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:56px_56px]"></div>

            <div className="max-w-[1450px] mx-auto px-6 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <span className="block text-[10px] uppercase tracking-[0.25em] font-bold text-white/45 mb-4">{t.process.badge}</span>
                    <h2 className="font-display text-4xl md:text-6xl font-light mb-6">{t.process.title}</h2>
                    <p className="text-white/60 max-w-3xl mx-auto leading-relaxed">{t.process.desc}</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
                    <div className="xl:col-span-8 rounded-2xl border border-white/15 bg-white/[0.03] p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {LIFECYCLE_STEPS.map((step, idx) => {
                                const isActive = step.id === activeId;
                                return (
                                    <button
                                        key={step.id}
                                        type="button"
                                        onClick={() => setActiveId(step.id)}
                                        className={`text-left rounded-xl border p-4 md:p-5 transition-colors ${isActive ? 'border-white/45 bg-white/10' : 'border-white/15 bg-white/[0.02] hover:bg-white/[0.06]'}`}
                                        aria-pressed={isActive}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">Phase 0{idx + 1}</span>
                                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${isActive ? 'border-white bg-white text-black' : 'border-white/25 text-white/70'}`}>
                                                <step.icon size={15} />
                                            </div>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-display font-light mb-2">{getText(step, 'title')}</h3>
                                        <p className="text-sm text-white/60 leading-relaxed line-clamp-3">{getText(step, 'description')}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <aside className="xl:col-span-4 rounded-2xl border border-white/20 bg-[#080808] p-6 md:p-7 h-fit xl:sticky xl:top-24">
                        <div className="text-[10px] uppercase tracking-[0.24em] text-white/45 mb-3">Linear Predictable</div>
                        <div className="font-mono text-sm text-white/70 mb-5">Stage {activeIndex + 1} of {LIFECYCLE_STEPS.length}</div>

                        <div className="h-[2px] w-full rounded-full bg-white/15 overflow-hidden mb-6">
                            <div className="h-full bg-white transition-all duration-500" style={{ width: `${((activeIndex + 1) / LIFECYCLE_STEPS.length) * 100}%` }}></div>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full border border-white bg-white text-black flex items-center justify-center">
                                <active.icon size={16} />
                            </div>
                            <h4 className="text-2xl font-display font-light">{getText(active, 'title')}</h4>
                        </div>

                        <p className="text-white/65 leading-relaxed text-sm md:text-base mb-6">{getText(active, 'description')}</p>

                        <div className="space-y-2">
                            {LIFECYCLE_STEPS.map((step) => {
                                const isActive = step.id === activeId;
                                return (
                                    <button
                                        key={step.id}
                                        type="button"
                                        onClick={() => setActiveId(step.id)}
                                        className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${isActive ? 'border-white/40 bg-white/10 text-white' : 'border-white/15 bg-white/[0.02] text-white/70 hover:text-white'}`}
                                    >
                                        {getText(step, 'title')}
                                    </button>
                                );
                            })}
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default ProcessTimeline;
