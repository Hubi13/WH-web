import React from 'react';
import { Shield, Box, Cpu, Waves, Sun, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePage } from '../contexts/PageContext';

const FeaturesGrid: React.FC = () => {
    const { t } = useLanguage();
    const { setPage } = usePage();

    return (
        <section className="bg-[#050505] relative py-20 md:py-32 overflow-hidden border-t border-white/20" aria-label="Features and Specifications">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 reveal-on-scroll">
                    <div className="max-w-2xl">
                        <span className="text-[9px] md:text-[10px] font-bold text-[#888] uppercase tracking-[0.3em] mb-4 md:mb-6 block">
                            {t.features.badge}
                        </span>
                        <h2 className="font-display text-3xl md:text-6xl text-white tracking-tight leading-[1.1]">
                            {t.features.title}
                        </h2>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-16 h-[1px] bg-white/20"></div>
                    </div>
                </div>

                {/* Elegant Grid Layout with Glassy Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

                    {/* 1. Large Feature Card - Structure */}
                    <article className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 relative group h-[400px] md:h-[600px] overflow-hidden bg-white/5 backdrop-blur-[2px] border border-white/10 rounded-2xl reveal-on-scroll">
                        <img
                            src="https://i.imgur.com/H4BsEqJ.jpeg"
                            alt="Mass Timber CLT Structure"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-60 group-hover:opacity-40"
                        />

                        <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full z-10">
                            <div className="flex items-center gap-3 mb-3 md:mb-4 text-white/60">
                                <span className="text-[8px] md:text-[10px] uppercase tracking-widest">{t.features.c1Mono}</span>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-light mb-4 md:mb-6 text-white">{t.features.c1Title}</h3>

                            <p className="text-xs md:text-sm text-white/70 max-w-md leading-relaxed border-l border-white/20 pl-4">
                                {t.features.c1Desc}
                            </p>
                        </div>
                    </article>

                    {/* 2. Intelligence Card */}
                    <article className="col-span-1 bg-white/5 backdrop-blur-[2px] border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between group hover:bg-white/10 transition-colors reveal-on-scroll delay-100 min-h-[220px]">
                        <div className="flex justify-between items-start">
                            <Cpu size={20} className="text-white/40 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/50 mb-2 block">{t.features.c2Mono}</span>
                            <h3 className="text-xl md:text-2xl font-light text-white mb-3 md:mb-4">{t.features.c2Title}</h3>
                            <p className="text-[10px] md:text-xs text-white/50 leading-relaxed">
                                Zintegrowane systemy zarządzania budynkiem oparte na predykcji.
                            </p>
                        </div>
                    </article>

                    {/* 3. Silence Card */}
                    <article className="col-span-1 bg-white/5 backdrop-blur-[2px] border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between group hover:bg-white/10 transition-colors reveal-on-scroll delay-200 min-h-[220px]">
                        <div className="flex justify-between items-start">
                            <Waves size={20} className="text-white/40 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/50 mb-2 block">{t.features.c3Mono}</span>
                            <h3 className="text-xl md:text-2xl font-light text-white">{t.features.c3Label}</h3>
                            <p className="text-[10px] md:text-xs text-white/50 leading-relaxed mt-3 md:mt-4">
                                Izolacja akustyczna na poziomie studyjnym.
                            </p>
                        </div>
                    </article>

                    {/* 4. Power Card */}
                    <article className="col-span-1 bg-white/5 backdrop-blur-[2px] border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between group hover:bg-white/10 transition-colors reveal-on-scroll delay-100 min-h-[220px]">
                        <div className="flex justify-between items-start">
                            <Sun size={20} className="text-white/40 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/50 mb-2 block">{t.features.c4Mono}</span>
                            <h3 className="text-xl md:text-2xl font-light text-white">{t.features.c4Label}</h3>
                            <p className="text-[10px] md:text-xs text-white/50 leading-relaxed mt-3 md:mt-4">
                                Samowystarczalność energetyczna dzięki panelom PVT.
                            </p>
                        </div>
                    </article>

                    {/* 5. Security Card */}
                    <article className="col-span-1 bg-white/5 backdrop-blur-[2px] border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between group hover:bg-white/10 transition-colors reveal-on-scroll delay-200 min-h-[220px]">
                        <div className="flex justify-between items-start">
                            <Shield size={20} className="text-white/40 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/50 mb-2 block">05 — SECURITY</span>
                            <h3 className="text-xl md:text-2xl font-light text-white mb-3 md:mb-4">{t.features.c5Title}</h3>
                            <p className="text-[10px] md:text-xs text-white/50 leading-relaxed">
                                Perymetryczna ochrona zintegrowana z R-OS.
                            </p>
                        </div>
                    </article>

                    {/* 6. Explore Link */}
                    <button
                        onClick={() => setPage('catalogs')}
                        className="col-span-1 md:col-span-2 bg-white text-black rounded-2xl group cursor-pointer relative overflow-hidden flex items-center justify-between p-8 md:p-10 reveal-on-scroll delay-300 text-left w-full hover:bg-gray-100 transition-colors"
                    >
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-2xl font-light mb-1 md:mb-2">Materiały</h3>
                            <p className="opacity-60 text-[10px] md:text-sm font-medium uppercase tracking-widest">Pełna biblioteka dokumentów</p>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 border border-black/10 flex items-center justify-center relative z-10 group-hover:bg-black group-hover:text-white transition-colors duration-300 rounded-full">
                            <ArrowUpRight size={20} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </button>

                </div>
            </div>
        </section>
    );
};

export default FeaturesGrid;