import React, { useState } from 'react';
import { HOUSE_MODELS } from '../constants';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePage } from '../contexts/PageContext';

const ModelSelector: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeModel = HOUSE_MODELS[activeIndex];
    const { t, language } = useLanguage();
    const { setPage } = usePage();
    const details = t.models.details[activeModel.line];

    return (
        <section id="models" className="py-16 md:py-32 bg-[#F5F5F7] relative" aria-labelledby="collection-heading">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16">
                    <div className="mb-8 md:mb-0">
                        <span className="text-[9px] md:text-[10px] font-bold text-[#86868B] uppercase tracking-[0.2em] mb-4 block">
                            {t.models.badge}
                        </span>
                        <h2 id="collection-heading" className="font-sans text-[clamp(1.75rem,5vw,3.75rem)] text-[#1D1D1F] font-light tracking-tight leading-tight">
                            {t.models.title} <span className="font-medium">{t.models.titleBold}</span>
                        </h2>
                    </div>

                    {/* Tab List Pill Style - Horizontal Scroll on Mobile */}
                    <div className="w-full md:w-auto overflow-x-auto hide-scrollbar">
                        <div className="flex gap-2 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm w-max" role="tablist" aria-label="House Models">
                            {HOUSE_MODELS.map((model, idx) => (
                                <button
                                    key={model.id}
                                    role="tab"
                                    aria-selected={activeIndex === idx}
                                    aria-controls={`model-panel-${model.id}`}
                                    id={`model-tab-${model.id}`}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`
                      px-5 md:px-6 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 whitespace-nowrap
                      ${activeIndex === idx
                                            ? 'bg-[#1D1D1F] text-white shadow-md'
                                            : 'text-[#86868B] hover:bg-gray-50 hover:text-[#1D1D1F]'}
                      `}
                                >
                                    {model.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Semantic Article */}
                <article
                    id={`model-panel-${activeModel.id}`}
                    role="tabpanel"
                    aria-labelledby={`model-tab-${activeModel.id}`}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
                >

                    {/* Image Area */}
                    <div
                        key={activeModel.id}
                        className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/9] animate-fade-in-up group"
                    >
                        <div className="absolute inset-0 p-1 rounded-xl bg-gradient-to-br from-white/80 to-white/40 border border-white/60 shadow-2xl shadow-black/20 backdrop-blur-md">
                            <div className="w-full h-full rounded-lg overflow-hidden relative bg-white shadow-inner">
                                <img
                                    src={activeModel.image}
                                    alt={`${activeModel.name} modular home`}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40"></div>
                                <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-white/90 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/50 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[#1D1D1F] shadow-lg">
                                    {activeModel.line} Series
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Area */}
                    <div
                        key={`${activeModel.id}-info`}
                        className="lg:col-span-4 space-y-6 md:space-y-8 animate-fade-in-up"
                        style={{ animationDelay: '150ms' }}
                    >
                        <div>
                            <h3 className="text-[clamp(1.35rem,4vw,3rem)] font-light text-[#1D1D1F] mb-3 md:mb-4 tracking-tight leading-tight">{activeModel.name}</h3>
                            <p className="text-[#6E6E73] text-sm md:text-base lg:text-lg font-light leading-relaxed border-l-2 border-[#1D1D1F]/10 pl-5 md:pl-6">
                                {details.tagline}
                            </p>
                        </div>

                        <div className="space-y-4 md:space-y-6 py-5 md:py-8 border-t border-gray-200">
                            <div className="flex justify-between items-center group cursor-default">
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#86868B] group-hover:text-[#1D1D1F] transition-colors">{t.models.area}</span>
                                <span className="font-mono text-base md:text-lg text-[#1D1D1F]">{activeModel.specs.area}</span>
                            </div>
                            <div className="flex justify-between items-center group cursor-default">
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#86868B] group-hover:text-[#1D1D1F] transition-colors">{t.models.efficiency}</span>
                                <span className="font-mono text-base md:text-lg text-[#1D1D1F] px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded">{activeModel.specs.efficiency}</span>
                            </div>
                            <div className="flex justify-between items-center group cursor-default">
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#86868B] group-hover:text-[#1D1D1F] transition-colors">{t.models.acoustics}</span>
                                <span className="font-mono text-base md:text-lg text-[#1D1D1F]">{activeModel.specs.acoustics}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {details.features.map((feat: string, i: number) => (
                                <span key={i} className="px-3 py-1 md:px-4 md:py-1.5 bg-white border border-gray-200 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-[#6E6E73] shadow-sm">
                                    {feat}
                                </span>
                            ))}
                        </div>

                        <a
                            href="/dealer"
                            onClick={(e) => { e.preventDefault(); setPage('dealer'); }}
                            className="w-full py-3.5 md:py-5 bg-[#1D1D1F] text-white rounded-xl flex items-center justify-center gap-3 md:gap-4 hover:bg-[#000] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#1D1D1F]/20 no-underline"
                        >
                            <span className="font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">{t.models.configure}</span>
                            <ArrowRight size={16} />
                        </a>
                    </div>

                </article>

            </div>
        </section>
    );
};

export default ModelSelector;