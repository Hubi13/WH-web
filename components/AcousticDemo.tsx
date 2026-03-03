import React, { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

type DeploymentNode = {
  id: string;
  country: string;
  city: string;
  climate: string;
  status: 'online' | 'expanding';
  leadTime: string;
  top: string;
  left: string;
  image: string;
};

const NODES: DeploymentNode[] = [
  { id: 'warsaw', country: 'Poland', city: 'Warsaw', climate: 'Cold Continental', status: 'online', leadTime: '16-20 weeks', top: '34%', left: '56%', image: 'https://i.imgur.com/dGFCeEU.jpeg' },
  { id: 'austin', country: 'United States', city: 'Austin', climate: 'Hot Subtropical', status: 'online', leadTime: '14-18 weeks', top: '40%', left: '20%', image: 'https://i.imgur.com/ay5UUWQ.jpeg' },
  { id: 'valencia', country: 'Spain', city: 'Valencia', climate: 'Mediterranean', status: 'expanding', leadTime: '18-22 weeks', top: '44%', left: '49%', image: 'https://i.imgur.com/ay5UUWQ.jpeg' },
  { id: 'dubai', country: 'UAE', city: 'Dubai', climate: 'Desert', status: 'expanding', leadTime: '20-24 weeks', top: '48%', left: '62%', image: 'https://i.imgur.com/7ou8tEP.jpeg' },
  { id: 'osaka', country: 'Japan', city: 'Osaka', climate: 'Humid Temperate', status: 'online', leadTime: '16-20 weeks', top: '41%', left: '79%', image: 'https://i.imgur.com/7ou8tEP.jpeg' },
  { id: 'sydney', country: 'Australia', city: 'Sydney', climate: 'Marine', status: 'expanding', leadTime: '20-24 weeks', top: '70%', left: '82%', image: 'https://i.imgur.com/dGFCeEU.jpeg' },
];

const AcousticDemo: React.FC = () => {
  const { t } = useLanguage();
  const [activeNodeId, setActiveNodeId] = useState<string>(NODES[0]?.id ?? 'warsaw');

  const activeNode = useMemo(
    () => NODES.find((node) => node.id === activeNodeId) ?? NODES[0],
    [activeNodeId]
  );

  return (
    <section className="relative py-20 md:py-28 bg-[#F2EEE6] text-[#191712] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_14%_16%,rgba(255,255,255,0.85),transparent_46%),radial-gradient(circle_at_86%_12%,rgba(214,189,149,0.24),transparent_42%),radial-gradient(circle_at_80%_82%,rgba(188,172,144,0.22),transparent_44%)]" />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-black/52 mb-4 block">{t.acousticDemo.title}</span>
            <h2 className="font-display text-4xl md:text-6xl font-light leading-[0.95]">Global Estate Deployment</h2>
          </div>
          <p className="text-sm md:text-base text-black/62 max-w-xl leading-relaxed">
            A premium building standard that adapts to climate, terrain, and local regulation, so the same architectural quality can be delivered anywhere in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 items-stretch">
          <article className="xl:col-span-8 rounded-[14px] border border-[#A48A62]/30 bg-[#191713] text-white overflow-hidden relative min-h-[440px] md:min-h-[560px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(196,164,112,0.24),transparent_42%),linear-gradient(180deg,#211D17_0%,#16130E_100%)]" />
            <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="relative z-10 p-5 md:p-7 h-full flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#D7C09A]/76">Deployment Atlas</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{NODES.length} Regions</p>
              </div>

              <div className="relative flex-1 rounded-lg border border-[#D7C09A]/26 bg-black/25 overflow-hidden">
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" aria-hidden>
                  <path d="M20 40 C35 35, 42 45, 56 34" stroke="rgba(215,192,154,0.85)" strokeWidth="0.6" fill="none" />
                  <path d="M56 34 C62 42, 71 37, 79 41" stroke="rgba(215,192,154,0.7)" strokeWidth="0.6" fill="none" />
                  <path d="M79 41 C82 52, 83 61, 82 70" stroke="rgba(215,192,154,0.65)" strokeWidth="0.6" fill="none" />
                  <path d="M49 44 C55 50, 61 47, 62 48" stroke="rgba(215,192,154,0.58)" strokeWidth="0.6" fill="none" />
                </svg>

                {NODES.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveNodeId(node.id)}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top: node.top, left: node.left }}
                  >
                    <span className={`block w-2.5 h-2.5 rounded-full ${node.status === 'online' ? 'bg-[#EAD7B8]' : 'bg-[#C2A676]'} shadow-[0_0_16px_rgba(234,215,184,0.6)]`} />
                    <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${activeNodeId === node.id ? 'w-8 h-8 border-[#EAD7B8]/85' : 'w-6 h-6 border-[#EAD7B8]/38'}`} />
                  </button>
                ))}

                <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-[440px] border border-[#EAD7B8]/28 bg-[#16130FCC] backdrop-blur-md p-4 md:p-5 rounded-md">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#D7C09A]/68 mb-2">Selected Residence Zone</p>
                  <p className="text-2xl font-light mb-1">{activeNode.city}, {activeNode.country}</p>
                  <p className="text-sm text-white/72">{activeNode.climate} · Delivery window {activeNode.leadTime}</p>
                </div>
              </div>
            </div>
          </article>

          <article className="xl:col-span-4 rounded-[14px] border border-[#A48A62]/30 bg-[#F8F4EC]/85 p-5 md:p-7 flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/46 mb-4">Atelier Protocol</p>
            <h3 className="text-2xl md:text-3xl font-light leading-tight mb-5">Built for any geography</h3>

            <div className="space-y-3 mb-6">
              <div className="rounded-md border border-[#A48A62]/24 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-2">01 Terrain Study</p>
                <p className="text-sm text-black/72">Topography, access, and utility integration are resolved before production.</p>
              </div>
              <div className="rounded-md border border-[#A48A62]/24 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-2">02 Climate Composition</p>
                <p className="text-sm text-black/72">Envelope, insulation and glazing package are tuned for local climate behavior.</p>
              </div>
              <div className="rounded-md border border-[#A48A62]/24 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-2">03 Deployment Craft</p>
                <p className="text-sm text-black/72">Factory precision enables a predictable on-site build sequence worldwide.</p>
              </div>
            </div>

            <div className="mt-auto rounded-md border border-[#A48A62]/30 bg-[#1E1A14] text-white p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#D7C09A]/64 mb-2">Current Region</p>
              <p className="text-lg font-light mb-1">{activeNode.status === 'online' ? 'Operational' : 'Expansion in Progress'}</p>
              <p className="text-xs text-white/68">{activeNode.city} · {activeNode.country}</p>
            </div>
          </article>
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {NODES.slice(0, 3).map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNodeId(node.id)}
              className={`relative h-36 rounded-lg border overflow-hidden text-left transition-all ${activeNodeId === node.id ? 'border-[#8D7351] shadow-[0_20px_40px_-26px_rgba(80,58,25,0.55)]' : 'border-black/10 hover:border-[#8D7351]/55'}`}
            >
              <img src={node.image} alt={node.city} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/20" />
              <div className="relative z-10 p-4 text-white">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/62 mb-2">{node.status}</p>
                <p className="text-2xl font-light leading-none mb-1">{node.city}</p>
                <p className="text-xs text-white/78">{node.climate}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcousticDemo;

