import React, { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

type CapabilityScene = {
  id: string;
  title: string;
  desc: string;
  img: string;
  readiness: string;
  condition: string;
};

const GlobalRoam: React.FC = () => {
  const { t } = useLanguage();

  const scenes = useMemo<CapabilityScene[]>(
    () => [
      {
        id: 'alpine',
        title: t.globalRoam.locations[0].title,
        desc: t.globalRoam.locations[0].desc,
        img: 'https://i.imgur.com/dGFCeEU.jpeg',
        readiness: '98%',
        condition: 'Thermal Retention',
      },
      {
        id: 'coastal',
        title: t.globalRoam.locations[1].title,
        desc: t.globalRoam.locations[1].desc,
        img: 'https://i.imgur.com/ay5UUWQ.jpeg',
        readiness: '96%',
        condition: 'Salt / Wind Defense',
      },
      {
        id: 'forest',
        title: t.globalRoam.locations[2].title,
        desc: t.globalRoam.locations[2].desc,
        img: 'https://i.imgur.com/7ou8tEP.jpeg',
        readiness: '97%',
        condition: 'Topography Fit',
      },
    ],
    [t.globalRoam.locations]
  );

  const [activeId, setActiveId] = useState(scenes[0]?.id ?? 'alpine');
  const activeScene = scenes.find((scene) => scene.id === activeId) ?? scenes[0];

  return (
    <section className="relative bg-[#F5F5F7] py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:44px_44px]"></div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-12 md:mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#86868B] mb-3 block">{t.globalRoam.badge}</span>
          <h2 className="font-display text-4xl md:text-6xl font-light text-[#1D1D1F] mb-5">{t.globalRoam.title}</h2>
          <p className="text-[#6E6E73] max-w-2xl leading-relaxed">{t.globalRoam.desc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit rounded-2xl border border-black/10 bg-white/75 backdrop-blur-md p-6 md:p-8 shadow-[0_24px_55px_-32px_rgba(0,0,0,0.35)]">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#8E8E94] block mb-5">Deployment Matrix</span>

            <div className="space-y-3 mb-6">
              {scenes.map((scene, index) => {
                const isActive = scene.id === activeId;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => setActiveId(scene.id)}
                    className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${isActive
                      ? 'border-black/25 bg-black text-white'
                      : 'border-black/10 bg-white hover:bg-black/[0.04] text-[#1D1D1F]'
                      }`}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm uppercase tracking-[0.18em]">0{index + 1} {scene.title}</span>
                      <span className="text-xs opacity-80">{scene.readiness}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-black/10 bg-[#F5F5F7] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#8E8E94] mb-2">Active Environment</p>
              <p className="text-lg font-light text-[#1D1D1F] mb-1">{activeScene.title}</p>
              <p className="text-sm text-[#6E6E73] leading-relaxed">{activeScene.desc}</p>
            </div>
          </aside>

          <div className="lg:col-span-8 space-y-5">
            {scenes.map((scene, index) => {
              const isActive = scene.id === activeId;

              return (
                <article
                  key={scene.id}
                  className={`group rounded-2xl overflow-hidden border transition-all duration-300 ${isActive
                    ? 'border-black/25 shadow-[0_26px_58px_-30px_rgba(0,0,0,0.4)]'
                    : 'border-black/10 shadow-none'
                    }`}
                  onMouseEnter={() => setActiveId(scene.id)}
                >
                  <div className="relative aspect-[16/9] md:aspect-[18/9]">
                    <img src={scene.img} alt={scene.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent"></div>

                    <div className="absolute left-5 top-5 md:left-7 md:top-7 text-white/75 text-xs font-mono">0{index + 1}</div>

                    <div className="absolute bottom-5 left-5 md:bottom-7 md:left-7 max-w-lg rounded-xl border border-white/20 bg-black/35 backdrop-blur-sm p-4 md:p-5 text-white">
                      <div className="flex items-center justify-between gap-5 mb-3">
                        <h3 className="text-2xl md:text-3xl font-light">{scene.title}</h3>
                        <span className="text-xs uppercase tracking-[0.18em] text-white/75">{scene.readiness}</span>
                      </div>
                      <p className="text-sm md:text-base text-white/85 leading-relaxed mb-3">{scene.desc}</p>
                      <div className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/85">
                        {scene.condition}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalRoam;
