import React, { useEffect, useRef, useState } from 'react';
import { LIFECYCLE_STEPS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Check, Circle, Hexagon } from 'lucide-react';

const ProcessTimeline: React.FC = () => {
    const { t, language } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    const getText = (step: any, type: 'title' | 'description') => {
        if (language === 'PL') return step[`${type}PL`];
        if (language === 'ES') return step[`${type}ES`];
        return step[type];
    };

    useEffect(() => {
        let rafId: number;

        const handleScroll = () => {
            if (!containerRef.current || !lineRef.current) return;

            rafId = requestAnimationFrame(() => {
                if (!containerRef.current || !lineRef.current) return;

                const rect = containerRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // Start filling when the top of the section is near the middle of the viewport
                const startOffset = viewportHeight * 0.5;
                const totalDist = rect.height - (viewportHeight * 0.5); // Adjust total distance to finish before bottom

                const scrolled = (rect.top * -1) + startOffset;

                let progress = (scrolled / totalDist) * 100;
                progress = Math.max(0, Math.min(100, progress));

                // Direct DOM update for instant, lag-free response
                lineRef.current.style.height = `${progress}%`;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    // Intersection Observer for highlighting specific steps
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveStep(Number(entry.target.getAttribute('data-id')));
                }
            });
        }, {
            threshold: 0.5, // Require 50% visibility to trigger
            rootMargin: '-10% 0px -10% 0px' // Tighter margin to prevent flickering
        });

        const steps = document.querySelectorAll('.process-step');
        steps.forEach(s => observer.observe(s));

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={containerRef} id="process" className="py-20 md:py-40 bg-[#050505] text-white relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-6 md:left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/5"></div>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 md:mb-32 relative z-20">
                    <div className="inline-flex items-center justify-center p-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6">
                        <Hexagon size={16} className="text-white/60" />
                    </div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-4">{t.process.badge}</span>
                    <h2 className="font-display text-4xl md:text-6xl font-light text-white">{t.process.title}</h2>
                </div>

                {/* Timeline Container */}
                <div className="relative">

                    {/* Central Spine (Background Track) */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2"></div>

                    {/* Central Spine (Active Progress) - Removed CSS transitions for instant scroll response */}
                    <div
                        ref={lineRef}
                        className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] md:-translate-x-1/2 will-change-[height]"
                        style={{ height: '0%' }}
                    >
                        {/* Glowing Leading Dot */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)]"></div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-16 md:space-y-48 pb-32">
                        {LIFECYCLE_STEPS.map((step, index) => {
                            const isEven = index % 2 === 0;
                            const isActive = activeStep === step.id;
                            const isPast = activeStep > step.id;

                            return (
                                <div
                                    key={step.id}
                                    data-id={step.id}
                                    className={`process-step relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >

                                    {/* Central Node Marker */}
                                    <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
                                        <div className={`
                                    w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 relative z-20
                                    ${(isActive || isPast) ? 'border-white shadow-[0_0_25px_rgba(255,255,255,0.6)]' : 'border-white/20 shadow-none'}
                                    ${isPast ? 'bg-white scale-100' : isActive ? 'bg-[#050505] scale-110' : 'bg-[#050505] scale-100'}
                                 `}>
                                            {isActive ? (
                                                <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
                                            ) : isPast ? (
                                                <Check size={20} className="text-black" strokeWidth={3} />
                                            ) : (
                                                <Circle size={10} className="text-white/20 fill-white/20" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Horizontal Connector Line (Desktop Only) */}
                                    <div className={`hidden md:block absolute top-1/2 h-[1px] bg-white/20 w-[60px] lg:w-[100px] transition-all duration-1000 ease-out ${isActive ? 'opacity-100 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'opacity-20'} ${isEven ? 'right-1/2 mr-6' : 'left-1/2 ml-6'}`}></div>

                                    {/* Content Card */}
                                    <div className={`
                                 w-full md:w-[45%] lg:w-[42%] pl-20 md:pl-0 mt-2 md:mt-0 relative group
                                 transition-all duration-1000 ease-out transform
                                 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-8'}
                                 ${isEven ? 'md:text-right md:pr-24' : 'md:text-left md:pl-24'}
                             `}>
                                        <div className={`
                                    bg-[#0A0A0A] border p-6 md:p-12 relative overflow-hidden transition-all duration-500 rounded-3xl
                                    ${isActive ? 'border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.05)]' : 'border-white/20'}
                                 `}>

                                            {/* Big Background Number */}
                                            <div className={`
                                        absolute -bottom-8 font-display font-bold text-[60px] md:text-[180px] leading-none select-none pointer-events-none transition-colors duration-1000
                                        ${isEven ? '-left-4 md:-left-8' : '-right-4 md:-right-8'}
                                        ${isActive ? 'text-white/[0.04]' : 'text-white/[0.01]'}
                                     `}>
                                                0{step.id}
                                            </div>

                                            {/* Active Glint Gradient */}
                                            <div className={`absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 transition-opacity duration-1000 ${isActive ? 'opacity-100' : ''}`}></div>

                                            <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'} relative z-10`}>
                                                <div className="flex items-center gap-4 mb-6 text-white/50">
                                                    <span className="font-mono text-xs">PHASE 0{step.id}</span>
                                                    <div className="h-[1px] w-8 bg-white/20"></div>
                                                    <step.icon size={18} />
                                                </div>

                                                <h3 className="text-2xl md:text-3xl font-display font-light mb-4 text-white">
                                                    {getText(step, 'title')}
                                                </h3>

                                                <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
                                                    {getText(step, 'description')}
                                                </p>
                                            </div>

                                            {/* Tech Corners */}
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
                                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
                                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>
                                        </div>
                                    </div>

                                    {/* Empty side for layout balance */}
                                    <div className="hidden md:block w-[45%] lg:w-[42%]"></div>

                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ProcessTimeline;