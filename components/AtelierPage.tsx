import React from 'react';
import { ArrowLeft, Lock, Gem, Fingerprint } from 'lucide-react';
import { usePage } from '../contexts/PageContext';

const AtelierPage: React.FC = () => {
  const { setPage } = usePage();

  const handleBack = () => {
    setPage('home');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24 pb-12 flex flex-col items-center">
      
      {/* Discrete Header */}
      <div className="fixed top-0 left-0 w-full bg-[#080808]/90 backdrop-blur-md border-b border-white/5 z-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-[#666] hover:text-white transition-colors text-xs font-bold uppercase tracking-[0.2em]"
            >
                <ArrowLeft size={14} /> Return to Public Site
            </button>
            <div className="flex items-center gap-2 text-[#444]">
                <Lock size={12} />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Private Atelier</span>
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12 w-full animate-fade-in-up">
          
          <div className="text-center mb-16">
              <span className="inline-block p-4 border border-white/10 rounded-full mb-8 bg-white/5">
                  <Gem size={24} className="text-white" strokeWidth={1} />
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-light mb-6">
                  The Atelier.
              </h1>
              <p className="text-[#888] text-lg font-light max-w-xl mx-auto leading-relaxed">
                  Welcome to the private configuration suite. This environment is dedicated to one-of-a-kind commissions and prototype testing.
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
              <div className="bg-[#0A0A0A] p-12 hover:bg-[#111] transition-colors group cursor-pointer">
                  <div className="mb-8 opacity-50 group-hover:opacity-100 transition-opacity">
                      <Fingerprint size={32} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-light mb-4">Project Black</h3>
                  <p className="text-sm text-[#666] leading-relaxed">
                      Experimental stealth-geometry modular units utilizing radar-absorbent materials.
                  </p>
                  <span className="inline-block mt-8 text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-1">Request Access</span>
              </div>

              <div className="bg-[#0A0A0A] p-12 hover:bg-[#111] transition-colors group cursor-pointer">
                  <div className="mb-8 opacity-50 group-hover:opacity-100 transition-opacity">
                      <Gem size={32} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-light mb-4">Rare Earth</h3>
                  <p className="text-sm text-[#666] leading-relaxed">
                      Interiors crafted from solid blocks of Onyx and limited-run anodized titanium.
                  </p>
                  <span className="inline-block mt-8 text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-1">View Samples</span>
              </div>
          </div>

          <div className="mt-16 p-8 border border-yellow-900/30 bg-yellow-900/5 text-center rounded-sm">
              <p className="text-yellow-600/80 text-xs font-mono uppercase tracking-widest">
                  Invitation Only • Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
          </div>

      </div>
    </div>
  );
};

export default AtelierPage;