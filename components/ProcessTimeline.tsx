import React, { useMemo, useState } from 'react';
import { LIFECYCLE_STEPS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const ProcessTimeline: React.FC = () => {
    const { t, language } = useLanguage();
    const [activeStepId, setActiveStepId] = useState(LIFECYCLE_STEPS[0]?.id ?? 1);

    if (LIFECYCLE_STEPS.length === 0) return null;

    const getText = (step: any, type: 'title' | 'description') => {
        if (language === 'PL') return step[`${type}PL`];
        if (language === 'ES') return step[`${type}ES`];
        return step[type];
    };

    const activeIndex = useMemo(() => {
        const index = LIFECYCLE_STEPS.findIndex((step) => step.id === activeStepId);
        return index < 0 ? 0 : index;
    }, [activeStepId]);

    const activeStep = LIFECYCLE_STEPS[activeIndex] ?? LIFECYCLE_STEPS[0];

    return (
        <section id="process" className="relative bg-[#050505] text-white py-20 md:py-36 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_16%_20%,rgba(255,255,255,0.09),transparent_38%),radial-gradient(circle_at_84%_78%,rgba(255,255,255,0.07),transparent_34%)]"></div>

            <div className="max-w-[1450px] mx-auto px-6 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/45 mb-4">{t.process.badge}</span>
                    <h2 className="font-display text-4xl md:text-6xl font-light mb-6">{t.process.title}</h2>
                    <p className="text-white/60 max-w-3xl mx-auto leading-relaxed">{t.process.desc}</p>
                </div>

                <div className="overflow-x-auto pb-2 mb-8 md:mb-10">
                    <div className="relative min-w-[700px]">
                        <div className="absolute left-0 right-0 top-5 h-[2px] bg-white/15"></div>
                        <div
                            className="absolute left-0 top-5 h-[2px] bg-white transition-all duration-500"
                            style={{ width: `${((activeIndex + 1) / LIFECYCLE_STEPS.length) * 100}%` }}
                        ></div>

                        <div className="relative grid grid-cols-4 gap-4">
                            {LIFECYCLE_STEPS.map((step) => {
                                const isActive = step.id === activeStepId;

                                return (
                                    <button
                                        key={step.id}
                                        type="button"
                                        onClick={() => setActiveStepId(step.id)}
                                        className="pt-0 text-left"
                                        aria-pressed={isActive}
                                    >
                                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center mb-4 transition-colors ${isActive ? 'border-white bg-white text-black' : 'border-white/30 bg-[#050505] text-white/75'}`}>
                                            <step.icon size={16} />
                                        </div>
                                        <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-2">Phase 0{step.id}</div>
                                        <div className={`text-sm transition-colors ${isActive ? 'text-white' : 'text-white/55'}`}>{getText(step, 'title')}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    <article className="lg:col-span-7 rounded-2xl border border-white/20 bg-white/[0.04] p-6 md:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full border border-white bg-white text-black flex items-center justify-center">
                                <activeStep.icon size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">Linear Predictable</p>
                                <p className="font-mono text-sm text-white/70">Phase 0{activeStep.id}</p>
                            </div>
                        </div>

                        <h3 className="font-display text-3xl md:text-4xl font-light mb-4">{getText(activeStep, 'title')}</h3>
                        <p className="text-white/65 leading-relaxed max-w-2xl">{getText(activeStep, 'description')}</p>

                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {LIFECYCLE_STEPS.map((step) => {
                                const isActive = step.id === activeStep.id;
                                return (
                                    <div key={step.id} className={`rounded-xl border px-3 py-3 text-center ${isActive ? 'border-white/40 bg-white/10' : 'border-white/15 bg-white/[0.02]'}`}>
                                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">0{step.id}</div>
                                        <div className="text-sm mt-1 text-white/85">{getText(step, 'title')}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </article>

                    <aside className="lg:col-span-5 rounded-2xl border border-white/20 bg-white/[0.03] p-6 md:p-8">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/45 mb-5">Execution Order</p>

                        <div className="space-y-3">
                            {LIFECYCLE_STEPS.map((step) => {
                                const isActive = step.id === activeStep.id;

                                return (
                                    <button
                                        key={step.id}
                                        type="button"
                                        onClick={() => setActiveStepId(step.id)}
                                        className={`w-full text-left rounded-xl border px-4 py-4 transition-colors ${isActive ? 'border-white/40 bg-white/10' : 'border-white/15 bg-white/[0.02] hover:bg-white/[0.06]'}`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-1">Phase 0{step.id}</div>
                                                <div className="text-lg font-light text-white mb-1">{getText(step, 'title')}</div>
                                                <p className="text-sm text-white/60 leading-relaxed">{getText(step, 'description')}</p>
                                            </div>
                                            <div className={`w-2.5 h-2.5 mt-2 rounded-full ${isActive ? 'bg-white' : 'bg-white/30'}`}></div>
                                        </div>
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
