import React, { useState, useEffect } from 'react';
import { Wind, Zap, Shield, Activity, Wifi, Lock, Smartphone, ChevronRight, Sun, Battery, Thermometer } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TechDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'climate' | 'energy' | 'security'>('climate');
  const { t } = useLanguage();

  // Live Data Simulation State
  const [temp, setTemp] = useState(21.5);
  const [humidity, setHumidity] = useState(42);
  const [energyUsage, setEnergyUsage] = useState(8.4);
  const [batteryLevel, setBatteryLevel] = useState(98);

  // Simulate "Live" fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
        setTemp(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
        setEnergyUsage(prev => +(prev + (Math.random() * 0.1 - 0.05)).toFixed(2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'climate', label: t.tech.tabs.climate.label, sub: t.tech.tabs.climate.sub, icon: Wind },
    { id: 'energy', label: t.tech.tabs.energy.label, sub: t.tech.tabs.energy.sub, icon: Zap },
    { id: 'security', label: t.tech.tabs.security.label, sub: t.tech.tabs.security.sub, icon: Shield },
  ] as const;

  return (
    <section id="technology" className="py-20 md:py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ 
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
      }}></div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 border-b border-white/20 pb-8 reveal-on-scroll">
           <div className="max-w-2xl">
              <span className="text-[10px] font-bold text-[#666] uppercase tracking-[0.2em] mb-4 md:mb-6 block">
                 {t.tech.badge}
              </span>
              <h2 className="font-sans text-3xl md:text-6xl font-light text-white tracking-wide">
                 {t.tech.title}
              </h2>
           </div>
           <div className="mt-8 md:mt-0 flex items-center gap-6">
               <div className="text-right">
                   <span className="block text-[10px] text-[#666] uppercase tracking-widest">Connection</span>
                   <span className="block text-sm font-mono text-green-500 animate-pulse">5G / STARLINK</span>
               </div>
               <div className="w-12 h-12 border border-white/20 flex items-center justify-center bg-[#111] rounded-full">
                   <Wifi size={16} className="text-white" />
               </div>
           </div>
        </div>

        {/* Device Container - Interactive Interface */}
        <div className="flex flex-col lg:flex-row bg-[#050505] border border-white/30 ring-1 ring-white/10 min-h-[600px] shadow-2xl relative overflow-hidden reveal-on-scroll delay-100 rounded-[1.5rem] md:rounded-[2.5rem]">
            
            {/* Left Sidebar / Nav */}
            <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/20 flex flex-col bg-[#080808]">
                <div className="p-6 md:p-8 border-b border-white/20 flex justify-between items-center">
                    <span className="text-xs font-mono text-[#444]">{t.tech.osVer}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="flex-1 p-4 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left p-4 md:p-6 rounded-xl group transition-all duration-300 relative overflow-hidden
                                ${activeTab === tab.id ? 'bg-white/10' : 'hover:bg-white/[0.05]'}
                            `}
                        >
                            <div className="flex justify-between items-center relative z-10">
                                <div className="flex items-center gap-4 md:gap-5">
                                    <div className={`p-3 border rounded-full transition-all duration-300 ${activeTab === tab.id ? 'border-white bg-white text-black' : 'border-white/30 text-[#666] group-hover:text-white group-hover:border-white'}`}>
                                        <tab.icon size={20} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <span className={`block font-sans text-base md:text-lg tracking-wide transition-colors ${activeTab === tab.id ? 'text-white' : 'text-[#888] group-hover:text-white'}`}>
                                            {tab.label}
                                        </span>
                                        <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#444]">{tab.sub}</span>
                                    </div>
                                </div>
                                {activeTab === tab.id && <ChevronRight size={16} className="text-white animate-fade-in-up" />}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="p-6 md:p-8 mt-auto">
                    <button className="w-full py-4 border border-white/30 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 group rounded-xl">
                        <Smartphone size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Remote Access</span>
                        <span className="sm:hidden">Remote</span>
                    </button>
                </div>
            </div>

            {/* Main Screen Area - Dynamic Content */}
            <div className="flex-1 relative bg-[#050505] p-8 md:p-16 flex flex-col justify-center overflow-hidden min-h-[400px]">
                
                {/* Background "Scan Line" Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_0%,#fff_50%,transparent_100%)] bg-[length:100%_4px] animate-pulse"></div>

                {/* Content Transition Wrapper */}
                <div className="relative z-10 w-full">
                    
                    {activeTab === 'climate' && (
                        <div key="climate" className="animate-fade-in-up w-full">
                            <div className="flex flex-col gap-8 md:gap-12">
                                 <div className="flex justify-between items-start">
                                     <div>
                                         <div className="text-[10px] text-[#666] uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Thermometer size={12} /> Living Room
                                         </div>
                                         <div className="text-6xl sm:text-7xl md:text-9xl font-light text-white tracking-tighter tabular-nums transition-all duration-1000">
                                             {temp.toFixed(1)}<span className="text-2xl md:text-4xl text-[#444] align-top mt-2 md:mt-4 inline-block">°C</span>
                                         </div>
                                     </div>
                                     <Activity className="text-[#333] animate-pulse-slow" size={32} />
                                 </div>

                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-white/20 pt-8 md:pt-12">
                                     <div className="border-r border-white/20 pr-4 md:pr-8">
                                         <div className="text-xl md:text-2xl text-white font-light tabular-nums">{humidity}%</div>
                                         <div className="text-[9px] md:text-[10px] text-[#666] uppercase tracking-widest mt-1">{t.tech.climate.humidity}</div>
                                     </div>
                                     <div className="border-r border-white/0 md:border-white/20 px-0 md:px-8 pl-4 md:pl-8">
                                         <div className="text-xl md:text-2xl text-green-500 font-light">12</div>
                                         <div className="text-[9px] md:text-[10px] text-[#666] uppercase tracking-widest mt-1">{t.tech.climate.aqi}</div>
                                     </div>
                                     <div className="col-span-2 md:col-span-1 pt-4 md:pt-0 border-t md:border-t-0 border-white/20 md:border-0 md:pl-8">
                                         <div className="text-xl md:text-2xl text-white font-light">Silent</div>
                                         <div className="text-[9px] md:text-[10px] text-[#666] uppercase tracking-widest mt-1">Mode</div>
                                     </div>
                                 </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'energy' && (
                        <div key="energy" className="animate-fade-in-up w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                                 <div className="p-6 md:p-8 border border-white/10 bg-white/5 backdrop-blur-[2px] hover:bg-white/10 hover:border-white/20 transition-all group md:cursor-crosshair rounded-2xl shadow-lg">
                                     <div className="flex justify-between mb-6 md:mb-8">
                                         <Sun className="text-yellow-500" />
                                         <span className="text-yellow-500 font-mono text-xs tabular-nums">+{energyUsage} kW</span>
                                     </div>
                                     <div className="text-2xl md:text-4xl font-light text-white mb-2">Solar Roof</div>
                                     <div className="w-full h-1 bg-[#333] mt-4 overflow-hidden rounded-full">
                                         <div className="h-full bg-yellow-500 transition-all duration-1000 rounded-full" style={{ width: `${(energyUsage / 10) * 100}%` }}></div>
                                     </div>
                                 </div>

                                 <div className="p-6 md:p-8 border border-white/10 bg-white/5 backdrop-blur-[2px] hover:bg-white/10 hover:border-white/20 transition-all group md:cursor-crosshair rounded-2xl shadow-lg">
                                     <div className="flex justify-between mb-6 md:mb-8">
                                         <Battery className="text-green-500" />
                                         <span className="text-green-500 font-mono text-xs tabular-nums">{batteryLevel}%</span>
                                     </div>
                                     <div className="text-2xl md:text-4xl font-light text-white mb-2">Powerwall</div>
                                     <div className="w-full h-1 bg-[#333] mt-4 overflow-hidden rounded-full">
                                         <div className="h-full bg-green-500 transition-all duration-1000 rounded-full" style={{ width: `${batteryLevel}%` }}></div>
                                     </div>
                                 </div>
                            </div>
                            <div className="mt-8 md:mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-[#666] font-mono uppercase gap-2">
                                 <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> Grid: Disconnected</span>
                                 <span>Autonomy: 72h</span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div key="security" className="animate-fade-in-up w-full">
                            <div className="mb-8 md:mb-12 flex items-center gap-4">
                                 <div className="w-4 h-4 bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e] rounded-full"></div>
                                 <span className="text-xl md:text-2xl font-light tracking-wide uppercase">System Armed</span>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { name: t.tech.security.frontGate, status: t.tech.security.locked },
                                    { name: t.tech.security.garage, status: t.tech.security.closed },
                                    { name: t.tech.security.perimeter, status: t.tech.security.armed }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 md:p-6 border border-white/10 bg-white/5 backdrop-blur-[2px] hover:bg-white/10 transition-colors rounded-xl md:rounded-2xl">
                                        <div className="flex items-center gap-4">
                                            <Lock size={16} className="text-[#666]" />
                                            <span className="text-xs md:text-sm uppercase tracking-widest">{item.name}</span>
                                        </div>
                                        <span className="text-green-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

        </div>

      </div>
    </section>
  );
};

export default TechDashboard;