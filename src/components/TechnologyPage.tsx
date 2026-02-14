import React, { useState } from 'react';
import { ArrowLeft, Cpu, Layers, Hexagon } from 'lucide-react';
import { usePage } from '../contexts/PageContext';

const TechnologyPage: React.FC = () => {
  const { setPage } = usePage();
  const [activeTab, setActiveTab] = useState('r-os');

  const navItems = [
    { id: 'r-os', label: 'R-OS Core', icon: Cpu },
    { id: 'materials', label: 'Advanced Materials', icon: Layers },
    { id: 'manufacturing', label: 'Manufacturing', icon: Hexagon },
  ];

  const handleBack = () => {
    setPage('home');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-12">
      
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-[#888] hover:text-white transition-colors text-xs font-bold uppercase tracking-[0.2em]"
            >
                <ArrowLeft size={14} /> Back to Home
            </button>
            <span className="text-sm font-medium">Technology Stack</span>
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
                                ? 'bg-white text-black' 
                                : 'text-[#888] hover:bg-white/5 hover:text-white'
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
                
                {activeTab === 'r-os' && (
                    <div className="space-y-8 max-w-3xl">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-500">Operating System</span>
                        <h1 className="font-display text-5xl md:text-6xl font-light mb-8">R-OS Neural Core</h1>
                        <div className="text-[#888] space-y-6 leading-relaxed font-light">
                            <p>
                                R-OS is the central nervous system of every R-Home. Unlike fragmented smart home devices, R-OS is a unified layer that manages climate, energy, and security with predictive AI.
                            </p>
                            <div className="p-8 border border-white/10 rounded-2xl bg-[#111] mt-8">
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-xs uppercase tracking-widest">System Status</span>
                                    <span className="text-green-500 text-xs font-mono">ONLINE</span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                    <div className="p-4 bg-black rounded-lg">
                                        <div className="text-2xl font-light text-white">21°C</div>
                                        <div className="text-[10px] text-[#666] mt-1">Thermal</div>
                                    </div>
                                    <div className="p-4 bg-black rounded-lg">
                                        <div className="text-2xl font-light text-white">98%</div>
                                        <div className="text-[10px] text-[#666] mt-1">Air Quality</div>
                                    </div>
                                    <div className="p-4 bg-black rounded-lg">
                                        <div className="text-2xl font-light text-white">Low</div>
                                        <div className="text-[10px] text-[#666] mt-1">Latency</div>
                                    </div>
                                    <div className="p-4 bg-black rounded-lg">
                                        <div className="text-2xl font-light text-white">Secure</div>
                                        <div className="text-[10px] text-[#666] mt-1">Perimeter</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'materials' && (
                    <div className="space-y-8 max-w-3xl">
                        <h1 className="font-display text-4xl md:text-5xl font-light mb-8">Material Science</h1>
                        <p className="text-[#888] font-light text-lg">
                            We use materials engineered for the extremes. From aerogel-infused insulation to self-healing exterior coatings.
                        </p>
                        <div className="grid grid-cols-1 gap-6 mt-8">
                            <div className="flex gap-6 p-6 border border-white/10 bg-white/5 rounded-xl">
                                <div className="w-24 h-24 bg-[#222] shrink-0 rounded-lg overflow-hidden">
                                    <img src="https://i.imgur.com/H4BsEqJ.jpeg" className="w-full h-full object-cover opacity-50" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-light mb-2">CLT (Cross Laminated Timber)</h3>
                                    <p className="text-sm text-[#888]">
                                        5-ply spruce panels that provide structural rigidity surpassing steel in fire resistance and thermal mass.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6 p-6 border border-white/10 bg-white/5 rounded-xl">
                                <div className="w-24 h-24 bg-[#222] shrink-0 rounded-lg overflow-hidden">
                                    <img src="https://i.imgur.com/7ou8tEP.jpeg" className="w-full h-full object-cover opacity-50" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-light mb-2">Anodized Aluminum</h3>
                                    <p className="text-sm text-[#888]">
                                        Electro-chemically treated alloy ensuring zero corrosion even in saline coastal environments.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'manufacturing' && (
                    <div className="space-y-8 max-w-3xl">
                        <h1 className="font-display text-4xl md:text-5xl font-light mb-8">Automated Assembly</h1>
                        <div className="text-[#888] space-y-6 leading-relaxed font-light">
                            <p>
                                Traditional construction is plagued by weather delays and human error. R-Home modules are born in a clean-room environment.
                            </p>
                            <ul className="space-y-4 mt-6">
                                <li className="flex items-center gap-4 text-sm">
                                    <Hexagon size={16} className="text-white" />
                                    <span>Laser-guided cutting (±0.5mm precision)</span>
                                </li>
                                <li className="flex items-center gap-4 text-sm">
                                    <Hexagon size={16} className="text-white" />
                                    <span>Robotic welding for structural steel elements</span>
                                </li>
                                <li className="flex items-center gap-4 text-sm">
                                    <Hexagon size={16} className="text-white" />
                                    <span>Climate-controlled curing for concrete and adhesives</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage;