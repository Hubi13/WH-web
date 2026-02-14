import React from 'react';
import { Cpu, ShieldCheck, Ruler } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CoreIdentity: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: Ruler,
      title: t.identity.card1Title,
      desc: t.identity.card1Desc
    },
    {
      icon: ShieldCheck,
      title: t.identity.card2Title,
      desc: t.identity.card2Desc
    },
    {
      icon: Cpu,
      title: t.identity.card3Title,
      desc: t.identity.card3Desc
    }
  ];

  return (
    <section id="identity" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 reveal-on-scroll">
          <div>
             <h2 className="text-xs font-bold text-[#888] uppercase tracking-[0.2em] mb-6">{t.identity.badge}</h2>
             <h3 className="font-sans text-4xl md:text-6xl font-light text-white leading-tight uppercase tracking-wide">
               {t.identity.title} <br/><span className="font-semibold text-[#888]">{t.identity.titleBold}</span>
             </h3>
          </div>
          <div className="flex items-end">
            <p className="text-[#888] text-lg leading-relaxed max-w-xl font-normal">
              {t.identity.desc}
            </p>
          </div>
        </div>

        {/* Separated cards for glassy effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((item, idx) => (
            <div 
              key={idx} 
              className={`group p-12 bg-white/5 backdrop-blur-[2px] border border-white/10 rounded-2xl hover:bg-white/10 transition-colors duration-500 reveal-on-scroll delay-${(idx + 1) * 100}`}
            >
              <div className="mb-8 text-[#666] group-hover:text-white transition-colors transform group-hover:scale-110 duration-300 origin-left">
                <item.icon size={32} strokeWidth={1} />
              </div>
              <h4 className="font-sans text-2xl font-medium text-white mb-4">{item.title}</h4>
              <p className="text-[#888] leading-relaxed text-sm group-hover:text-white/80 transition-colors">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10"></div>
    </section>
  );
};

export default CoreIdentity;