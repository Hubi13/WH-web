import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ShowcaseSection: React.FC = () => {
    const { t } = useLanguage();

    const lightSpecs = [
        { label: 'Spectrum', value: 'Circadian Tuned' },
        { label: 'Filtering', value: 'Hospital Grade' },
        { label: 'Control', value: 'Adaptive Neural Core' },
    ];

    return (
        <section className="w-full bg-white text-[#1D1D1F]">
            <div className="py-20 md:py-28 bg-white">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-5 reveal-on-scroll">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#86868B] mb-5 block">01 - {t.story.chapter1.title}</span>
                        <h2 className="font-display text-[clamp(1.9rem,6vw,4.9rem)] font-light leading-[1.08] mb-6">
                            {t.story.chapter1.title}
                        </h2>
                        <p className="text-[#6E6E73] text-base md:text-lg leading-relaxed max-w-xl">{t.story.chapter1.text}</p>
                    </div>

                    <div className="lg:col-span-7 reveal-on-scroll">
                        <div className="relative rounded-[2rem] overflow-hidden border border-black/10 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.4)]">
                            <div className="relative aspect-[16/10]">
                                <img
                                    src="https://i.imgur.com/dGFCeEU.jpeg"
                                    alt="Architecture"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent"></div>

                                <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm px-4 py-2 text-white text-[10px] uppercase tracking-[0.24em]">
                                    Architecture of Silence
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 md:py-28 bg-[#F5F5F7]">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 order-2 lg:order-1">
                        <article className="rounded-[1.6rem] overflow-hidden border border-black/10 shadow-[0_24px_55px_-30px_rgba(0,0,0,0.28)]">
                            <div className="relative aspect-[4/5]">
                                <img
                                    src="https://i.imgur.com/7ou8tEP.jpeg"
                                    alt="Radical Transparency"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35"></div>
                            </div>
                        </article>

                        <article className="rounded-[1.6rem] overflow-hidden border border-black/10 bg-white p-6 md:p-8 flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.26em] text-[#9A9AA1] mb-4 block">02 - {t.hero.precision}</span>
                                <h3 className="font-display text-3xl md:text-4xl font-light leading-tight mb-4">{t.story.chapter2.title}</h3>
                                <p className="text-[#6E6E73] leading-relaxed text-sm md:text-base">{t.story.chapter2.text}</p>
                            </div>
                            <div className="mt-8 h-[1px] bg-black/10"></div>
                            <div className="mt-4 text-[10px] uppercase tracking-[0.22em] text-[#8C8C93]">Vision Glass / Passive Envelope</div>
                        </article>
                    </div>

                    <div className="lg:col-span-5 order-1 lg:order-2 reveal-on-scroll">
                        <div className="rounded-[1.6rem] border border-white/70 bg-white/80 backdrop-blur-xl p-6 md:p-8 shadow-[0_24px_55px_-28px_rgba(0,0,0,0.24)]">
                            <h4 className="font-display text-2xl md:text-3xl font-light mb-4">Precision in Every Junction</h4>
                            <p className="text-[#6E6E73] leading-relaxed">
                                Structural glazing, calibrated seals, and engineered tolerances align to keep volume, light, and climate in balance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-[#070708] text-white py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_36%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.08),transparent_30%)]"></div>

                <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                        <div className="lg:col-span-5">
                            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/80 mb-7">
                                03 - Atmosphere
                            </span>
                            <h3 className="font-display text-[clamp(2.1rem,5vw,4.6rem)] font-light leading-[1.04] mb-6">Light as Material.</h3>
                            <p className="text-white/75 leading-relaxed text-base md:text-lg mb-7">{t.story.chapter3.text}</p>

                            <div className="space-y-3">
                                {lightSpecs.map((item) => (
                                    <div key={item.label} className="flex items-center justify-between gap-4 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3">
                                        <span className="text-[10px] uppercase tracking-[0.24em] text-white/55">{item.label}</span>
                                        <span className="text-sm text-white/90">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="relative rounded-[1.8rem] overflow-hidden border border-white/20 shadow-[0_30px_75px_-32px_rgba(0,0,0,0.75)]">
                                <div className="relative aspect-[16/10]">
                                    <img
                                        src="https://i.imgur.com/iWyQPX1.jpeg"
                                        alt="Light as Material"
                                        className="absolute inset-0 w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/65 via-black/25 to-transparent"></div>

                                    <div className="absolute right-5 top-5 md:right-8 md:top-8 rounded-xl border border-white/20 bg-black/35 backdrop-blur-sm px-4 py-3 max-w-[220px]">
                                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/65 mb-2">Material Logic</p>
                                        <p className="text-sm text-white/85 leading-relaxed">Light temperature shifts by hour to align recovery, focus, and rest.</p>
                                    </div>

                                    <div className="absolute left-5 bottom-5 md:left-8 md:bottom-8 max-w-md">
                                        <p className="text-white/90 text-sm md:text-base leading-relaxed">Scroll through the project and experience how volume and illumination become one continuous surface.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-3">
                                <div className="h-1 rounded-full bg-gradient-to-r from-white/70 to-white/15"></div>
                                <div className="h-1 rounded-full bg-gradient-to-r from-white/45 to-white/10"></div>
                                <div className="h-1 rounded-full bg-gradient-to-r from-white/28 to-white/5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShowcaseSection;
