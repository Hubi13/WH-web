import React, { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

type DeploymentNode = {
    country: string;
    flag: string;
    city: string;
    status: 'online' | 'expanding';
    top: string;
    left: string;
};

const NODES: DeploymentNode[] = [
    { country: 'Poland', flag: 'https://flagcdn.com/w40/pl.png', city: 'Warsaw', status: 'online', top: '31%', left: '56%' },
    { country: 'United States', flag: 'https://flagcdn.com/w40/us.png', city: 'Austin', status: 'online', top: '36%', left: '20%' },
    { country: 'Spain', flag: 'https://flagcdn.com/w40/es.png', city: 'Valencia', status: 'expanding', top: '40%', left: '49%' },
    { country: 'UAE', flag: 'https://flagcdn.com/w40/ae.png', city: 'Dubai', status: 'expanding', top: '45%', left: '62%' },
    { country: 'Japan', flag: 'https://flagcdn.com/w40/jp.png', city: 'Osaka', status: 'online', top: '38%', left: '79%' },
    { country: 'Australia', flag: 'https://flagcdn.com/w40/au.png', city: 'Sydney', status: 'expanding', top: '67%', left: '82%' },
];

const AcousticDemo: React.FC = () => {
    const { t } = useLanguage();
    const [activeCity, setActiveCity] = useState(NODES[0]?.city ?? 'Warsaw');

    const activeNode = useMemo(
        () => NODES.find((node) => node.city === activeCity) ?? NODES[0],
        [activeCity]
    );

    return (
        <section className="relative py-20 md:py-32 bg-[#09090A] text-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.14),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.08),transparent_34%)]"></div>

            <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/55 mb-4 block">Sonic Isolation</span>
                        <h2 className="font-display text-4xl md:text-5xl font-light">Global Deployment System</h2>
                    </div>
                    <p className="text-sm text-white/65 md:text-right max-w-md leading-relaxed">
                        We deploy the same engineered home system across climates and continents, with standardized process and local adaptation.
                    </p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-[#050506] overflow-hidden p-5 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                        <div className="lg:col-span-7">
                            <div className="relative mx-auto w-[min(82vw,520px)] aspect-square">
                                <div className="absolute inset-0 rounded-full border border-white/25 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.24),rgba(255,255,255,0.02)_52%,transparent_72%)]"></div>
                                <div className="absolute inset-[8%] rounded-full border border-white/12"></div>
                                <div className="absolute inset-[18%] rounded-full border border-white/10"></div>

                                <div className="absolute inset-[12%] rounded-full border border-white/20 [animation:spin_38s_linear_infinite] overflow-hidden">
                                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_38%,white_0%,transparent_34%),radial-gradient(circle_at_68%_54%,white_0%,transparent_28%),radial-gradient(circle_at_54%_68%,white_0%,transparent_22%)]"></div>
                                </div>

                                {NODES.map((node) => (
                                    <button
                                        key={node.city}
                                        type="button"
                                        onClick={() => setActiveCity(node.city)}
                                        className="absolute -translate-x-1/2 -translate-y-1/2"
                                        style={{ top: node.top, left: node.left }}
                                    >
                                        <span className={`block w-3 h-3 rounded-full ${node.status === 'online' ? 'bg-white' : 'bg-white/70'} animate-pulse`}></span>
                                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-white/35"></span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-5 space-y-4">
                            <div className="rounded-xl border border-white/20 bg-white/[0.04] p-4">
                                <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-2">Active Node</p>
                                <div className="flex items-center gap-3 mb-2">
                                    <img src={activeNode.flag} alt={activeNode.country} className="w-6 h-4 rounded-sm object-cover border border-white/20" />
                                    <p className="text-xl font-light">{activeNode.city}, {activeNode.country}</p>
                                </div>
                                <p className="text-sm text-white/65">Status: {activeNode.status === 'online' ? 'Operational' : 'Expansion in Progress'}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {NODES.map((node) => (
                                    <button
                                        key={node.city}
                                        type="button"
                                        onClick={() => setActiveCity(node.city)}
                                        className={`rounded-lg border p-3 text-left transition-colors ${activeCity === node.city ? 'border-white/40 bg-white/10' : 'border-white/15 bg-white/[0.02] hover:bg-white/[0.06]'}`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <img src={node.flag} alt={node.country} className="w-5 h-3 rounded-sm object-cover border border-white/20" />
                                            <span className="text-sm text-white">{node.city}</span>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">{node.status}</span>
                                    </button>
                                ))}
                            </div>

                            <p className="text-xs text-white/55 leading-relaxed">
                                This section now shows how the same building system scales internationally while preserving technical standards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AcousticDemo;
