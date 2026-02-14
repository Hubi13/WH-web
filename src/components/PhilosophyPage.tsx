import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Anchor, Zap } from 'lucide-react';
import { usePage } from '../contexts/PageContext';

const PhilosophyPage: React.FC = () => {
  const { setPage } = usePage();
  const [activeTab, setActiveTab] = useState('manifesto');

  const navItems = [
    { id: 'manifesto', label: 'Manifesto', icon: BookOpen },
    { id: 'principles', label: 'First Principles', icon: Anchor },
    { id: 'future', label: 'Future Vision', icon: Zap },
  ];

  const handleBack = () => {
    setPage('home');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5] text-[#1D1D1F] pt-24 pb-12">
      
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 w-full bg-[#E5E5E5]/90 backdrop-blur-md border-b border-[#1D1D1F]/10 z-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-[#666] hover:text-black transition-colors text-xs font-bold uppercase tracking-[0.2em]"
            >
                <ArrowLeft size={14} /> Back to Home
            </button>
            <span className="text-sm font-medium">Philosophy & Origins</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/4">
                <div className="sticky top-32 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                                activeTab === item.id 
                                ? 'bg-[#1D1D1F] text-white shadow-lg' 
                                : 'text-[#666] hover:bg-black/5 hover:text-black'
                            }`}
                        >
                            <item.icon size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-3/4 min-h-[60vh] animate-fade-in-up">
                
                {activeTab === 'manifesto' && (
                    <div className="space-y-8 max-w-3xl">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#666]">Our Core Belief</span>
                        <h1 className="font-display text-5xl md:text-6xl font-light mb-8 leading-tight">
                            The Architecture of <br/><span className="font-medium">Silence.</span>
                        </h1>
                        <div className="text-[#444] space-y-6 leading-relaxed font-light text-lg">
                            <p>
                                We believe that in an increasingly chaotic world, the ultimate luxury is silence. Not just the absence of sound, but the absence of noise—visual, thermal, and cognitive.
                            </p>
                            <p>
                                R-Home was founded on a simple premise: apply the rigorous engineering standards of the automotive industry to the archaic world of construction. We don't build houses; we manufacture precision living environments.
                            </p>
                            <blockquote className="border-l-2 border-black pl-6 py-2 my-8 text-xl italic text-[#1D1D1F]">
                                "A home should not be a static box, but a high-performance machine for living."
                            </blockquote>
                        </div>
                    </div>
                )}

                {activeTab === 'principles' && (
                    <div className="space-y-8 max-w-3xl">
                        <h1 className="font-display text-4xl md:text-5xl font-light mb-8">First Principles</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm">
                                <span className="block text-4xl font-light mb-4 text-[#1D1D1F]">01</span>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Radical Precision</h3>
                                <p className="text-[#666] text-sm leading-relaxed">
                                    We reject the "acceptable tolerances" of traditional construction. Every R-Home component is machined to within 1mm.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-sm">
                                <span className="block text-4xl font-light mb-4 text-[#1D1D1F]">02</span>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Biophilic Integration</h3>
                                <p className="text-[#666] text-sm leading-relaxed">
                                    Technology should dissolve into nature. Our glazing systems erase the boundary between shelter and landscape.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-sm">
                                <span className="block text-4xl font-light mb-4 text-[#1D1D1F]">03</span>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Systems Autonomy</h3>
                                <p className="text-[#666] text-sm leading-relaxed">
                                    A home should sustain itself. Solar integration, water capture, and thermal mass are foundational, not additive.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'future' && (
                    <div className="space-y-8 max-w-3xl">
                        <h1 className="font-display text-4xl md:text-5xl font-light mb-8">Future Vision 2030</h1>
                        <div className="text-[#444] space-y-6 leading-relaxed font-light">
                            <p>
                                The R-Sequence is just the beginning. We are developing the <strong className="font-medium">R-Home System</strong>, a decentralized grid of autonomous homes that share energy and data to optimize community resilience.
                            </p>
                            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden relative mt-8">
                                <img src="https://i.imgur.com/iWyQPX1.jpeg" className="w-full h-full object-cover opacity-80" alt="Future Vision" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold uppercase tracking-[0.3em] border border-white/30 px-6 py-3 rounded-full backdrop-blur-md">R-Home System</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
};

export default PhilosophyPage;