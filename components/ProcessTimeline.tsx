import React, { useMemo, useState } from 'react';
import { LIFECYCLE_STEPS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const ProcessTimeline: React.FC = () => {
    const { t, language } = useLanguage();
    const [activeStep, setActiveStep] = useState(LIFECYCLE_STEPS[0]?.id ?? 1);

    const getText = (step: any, type: 'title' | 'description') => {
        if (language === 'PL') return step[`${type}PL`];
        if (language === 'ES') return step[`${type}ES`];
        return step[type];
    };

    const activeIndex = useMemo(() => {
        const idx = LIFECYCLE_STEPS.findIndex((item) => item.id === activeStep);
        return idx < 0 ? 0 : idx;
    }, [activeStep]);

    const activeData = LIFECYCLE_STEPS[activeIndex] ?? LIFECYCLE_STEPS[0];

    return (
        <section id="process" className="py-20 md:py-36 bg-[#050505] text-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_82%_80%,rgba(255,255,255,0.06),transparent_32%)]"></div>
            <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)]"></div>

            <div className="max-w-[1450px] mx-auto px-6 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/45 mb-4">{t.process.badge}</span>
                    <h2 className="font-display text-4xl md:text-6xl font-light">{t.process.title}</h2>
                    <p className="text-white/60 max-w-3xl mx-auto mt-6 leading-relaxed">{t.process.desc}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit rounded-2xl border border-white/20 bg-white/[0.03] p-6 md:p-8">
                        <div className="text-[10px] uppercase tracking-[0.24em] text-white/45 mb-3">Linear Predictable</div>
                        <div className="font-mono text-sm text-white/70 mb-5">Phase 0{activeData.id} / 0{LIFECYCLE_STEPS.length}</div>

                        <div className="h-[2px] w-full rounded-full bg-white/15 overflow-hidden mb-6">
                            <div
                                className="h-full bg-white transition-all duration-500"
                                style={{ width: `${((activeIndex + 1) / LIFECYCLE_STEPS.length) * 100}%` }}
                            ></div>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full border border-white/35 bg-white text-black flex items-center justify-center">
                                <activeData.icon size={15} />
                            </div>
                            <h3 className="text-2xl font-display font-light">{getText(activeData, 'title')}</h3>
                        </div>

                        <p className="text-white/65 leading-relaxed text-sm md:text-base">{getText(activeData, 'description')}</p>
                    </aside>

                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {LIFECYCLE_STEPS.map((step) => {
                            const isActive = step.id === activeStep;

                            return (
                                <button
                                    key={step.id}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => setActiveStep(step.id)}
                                    onMouseEnter={() => setActiveStep(step.id)}
                                    className={`text-left rounded-2xl border p-6 md:p-7 transition-all duration-300 ${isActive
                                        ? 'border-white/45 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.08)]'
                                        : 'border-white/15 bg-white/[0.03] hover:bg-white/[0.06]'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">Phase 0{step.id}</span>
                                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${isActive ? 'border-white bg-white text-black' : 'border-white/25 text-white/60'}`}>
                                            <step.icon size={15} />
                                        </div>
                                    </div>

                                    <h4 className="text-2xl font-display font-light mb-3">{getText(step, 'title')}</h4>
                                    <p className="text-white/65 text-sm md:text-base leading-relaxed">{getText(step, 'description')}</p>

                                    <div className="mt-6 h-[1px] w-full bg-white/15 relative overflow-hidden">
                                        <div className={`absolute inset-y-0 left-0 bg-white transition-all duration-500 ${isActive ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessTimeline;
