import React, { useMemo, useState } from 'react';
import { LIFECYCLE_STEPS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const ProcessTimeline: React.FC = () => {
    const { t, language } = useLanguage();
    const [activeStep, setActiveStep] = useState(1);

    const getText = (step: any, type: 'title' | 'description') => {
        if (language === 'PL') return step[`${type}PL`];
        if (language === 'ES') return step[`${type}ES`];
        return step[type];
    };

    const activeIndex = useMemo(() => Math.max(0, LIFECYCLE_STEPS.findIndex((item) => item.id === activeStep)), [activeStep]);

    return (
        <section id="process" className="py-20 md:py-36 bg-[#050505] text-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_85%_85%,rgba(255,255,255,0.06),transparent_30%)]"></div>
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.12)_50%,transparent_100%)]"></div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="text-center mb-14 md:mb-20">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/45 mb-4">{t.process.badge}</span>
                    <h2 className="font-display text-4xl md:text-6xl font-light text-white">{t.process.title}</h2>
                    <p className="text-white/60 max-w-3xl mx-auto mt-6 leading-relaxed">{t.process.desc}</p>
                </div>

                <div className="mb-10 md:mb-12">
                    <div className="h-[2px] w-full bg-white/15 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-700"
                            style={{ width: `${((activeIndex + 1) / LIFECYCLE_STEPS.length) * 100}%` }}
                        ></div>
                    </div>
                    <div className="mt-3 text-[10px] uppercase tracking-[0.22em] text-white/45">
                        Phase 0{activeStep} / 0{LIFECYCLE_STEPS.length}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
                    {LIFECYCLE_STEPS.map((step) => {
                        const isActive = activeStep === step.id;

                        return (
                            <article
                                key={step.id}
                                onMouseEnter={() => setActiveStep(step.id)}
                                onFocus={() => setActiveStep(step.id)}
                                onTouchStart={() => setActiveStep(step.id)}
                                className={`group rounded-2xl border p-6 md:p-8 transition-all duration-500 cursor-default ${isActive ? 'border-white/45 bg-white/10 shadow-[0_0_35px_rgba(255,255,255,0.08)]' : 'border-white/15 bg-white/[0.03] hover:bg-white/[0.06]'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-[11px] tracking-[0.2em] uppercase text-white/45">Phase 0{step.id}</span>
                                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${isActive ? 'border-white bg-white text-black' : 'border-white/25 text-white/60'}`}>
                                        <step.icon size={15} />
                                    </div>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-display font-light mb-3">{getText(step, 'title')}</h3>
                                <p className="text-white/65 leading-relaxed">{getText(step, 'description')}</p>

                                <div className="mt-8 h-[1px] w-full bg-white/15 relative overflow-hidden">
                                    <div className={`absolute inset-y-0 left-0 bg-white transition-all duration-700 ${isActive ? 'w-full' : 'w-0'}`}></div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProcessTimeline;
