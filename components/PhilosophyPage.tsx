import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Sparkles, Compass } from 'lucide-react';
import { usePage } from '../contexts/PageContext';

const PhilosophyPage: React.FC = () => {
  const { setPage } = usePage();
  const [activeSection, setActiveSection] = useState<'manifesto' | 'future-vision' | 'culture'>('manifesto');

  const navItems = useMemo(
    () => [
      { id: 'manifesto' as const, label: 'Manifesto', icon: BookOpen },
      { id: 'future-vision' as const, label: 'Future Vision', icon: Sparkles },
      { id: 'culture' as const, label: 'Culture', icon: Compass },
    ],
    []
  );

  const setSection = (id: 'manifesto' | 'future-vision' | 'culture') => {
    setActiveSection(id);
    try {
      const path = window.location.pathname || '/philosophy';
      window.history.replaceState({ page: 'philosophy' }, '', `${path}#${id}`);
    } catch (e) {
      // ignore history failures in constrained environments
    }
  };

  useEffect(() => {
    const applyFromHash = () => {
      const hash = (window.location.hash || '').replace('#', '');
      if (hash === 'manifesto' || hash === 'future-vision' || hash === 'culture') {
        setActiveSection(hash);
      }
    };

    applyFromHash();
    window.addEventListener('hashchange', applyFromHash);
    return () => window.removeEventListener('hashchange', applyFromHash);
  }, []);

  return (
    <div className="min-h-screen bg-[#E5E5E5] text-[#1D1D1F] pt-32 pb-16">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-10">
        <button
          onClick={() => setPage('home')}
          className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#666] hover:text-black transition-colors mb-8"
        >
          Back to Home
        </button>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-32 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-md text-left transition-all duration-300 ${
                    activeSection === item.id ? 'bg-[#1D1D1F] text-white shadow-lg' : 'text-[#666] hover:bg-black/5 hover:text-black'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                </button>
              ))}
            </div>
          </aside>

          <main id="philosophy-content" className="w-full lg:w-3/4 min-h-[60vh] animate-fade-in-up">
            {activeSection === 'manifesto' && (
              <section id="manifesto" className="space-y-8 max-w-3xl scroll-mt-36">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#666]">Our Core Belief</span>
                <h1 className="font-display text-5xl md:text-6xl font-light leading-tight">
                  The Architecture of <br />
                  <span className="font-medium">Silence.</span>
                </h1>
                <div className="text-[#444] space-y-6 leading-relaxed font-light text-lg">
                  <p>
                    We believe that in an increasingly chaotic world, the ultimate luxury is silence. Not just the absence of sound, but the
                    absence of noise-visual, thermal, and cognitive.
                  </p>
                  <p>
                    West Home was founded on a simple premise: apply the rigorous engineering standards of the automotive industry to the archaic
                    world of construction. We don't build houses; we manufacture precision living environments.
                  </p>
                  <blockquote className="border-l-2 border-black pl-6 py-2 my-8 text-xl italic text-[#1D1D1F]">
                    "A home should not be a static box, but a high-performance machine for living."
                  </blockquote>
                </div>
              </section>
            )}

            {activeSection === 'future-vision' && (
              <section id="future-vision" className="space-y-8 max-w-4xl scroll-mt-36">
                <h2 className="font-display text-4xl md:text-5xl font-light">Future Vision 2030</h2>
                <div className="text-[#444] space-y-6 leading-relaxed font-light text-lg">
                  <p>
                    The R-Sequence is just the beginning. We are developing the <strong className="font-medium">West Home System</strong>, a
                    decentralized grid of autonomous homes that share energy and data to optimize community resilience.
                  </p>
                  <div className="aspect-video w-full bg-black rounded-md overflow-hidden relative mt-8">
                    <img src="https://i.imgur.com/iWyQPX1.jpeg" className="w-full h-full object-cover opacity-80" alt="Future Vision" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xs font-bold uppercase tracking-[0.3em] border border-white/30 px-6 py-3 rounded-full backdrop-blur-md">
                        West Home System
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'culture' && (
              <section id="culture" className="space-y-8 max-w-5xl scroll-mt-36">
                <h2 className="font-display text-4xl md:text-5xl font-light">Culture</h2>
                <p className="text-[#444] max-w-3xl text-lg leading-relaxed font-light">
                  Culture at West Home is a production philosophy, not branding. Each project combines engineering discipline with
                  architectural sensitivity so outcomes are consistent across locations, teams, and climates.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <article className="bg-white p-8 rounded-md shadow-sm border border-black/5">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-black/45 mb-3">01 Studio + Factory</span>
                    <h3 className="text-2xl font-display font-light mb-3">One Continuous Workflow</h3>
                    <p className="text-[#666] text-sm leading-relaxed">
                      Design decisions, fabrication details, and site execution are reviewed as one pipeline with no handoff gaps.
                    </p>
                  </article>
                  <article className="bg-white p-8 rounded-md shadow-sm border border-black/5">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-black/45 mb-3">02 Material Ethics</span>
                    <h3 className="text-2xl font-display font-light mb-3">Long-Life Selection</h3>
                    <p className="text-[#666] text-sm leading-relaxed">
                      We prioritize materials that age with dignity and maintain performance over decades, not short trend cycles.
                    </p>
                  </article>
                  <article className="bg-white p-8 rounded-md shadow-sm border border-black/5">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-black/45 mb-3">03 Delivery Standard</span>
                    <h3 className="text-2xl font-display font-light mb-3">Global, Yet Consistent</h3>
                    <p className="text-[#666] text-sm leading-relaxed">
                      The same quality envelope is delivered in every region through strict QA checkpoints and repeatable assembly logic.
                    </p>
                  </article>
                  <article className="bg-[#1D1D1F] p-8 rounded-md border border-black/5 text-white">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-white/55 mb-3">04 Human Standard</span>
                    <h3 className="text-2xl font-display font-light mb-3">Calm by Design</h3>
                    <p className="text-white/75 text-sm leading-relaxed">
                      Every decision is measured against occupant wellbeing: acoustic comfort, natural light rhythm, and cognitive clarity.
                    </p>
                  </article>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PhilosophyPage;
