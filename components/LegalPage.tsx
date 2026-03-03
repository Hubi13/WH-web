import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, FileText, Cookie, Zap, Download } from 'lucide-react';
import { usePage } from '../contexts/PageContext';

const LegalPage: React.FC = () => {
  const { setPage } = usePage();
  const [activeTab, setActiveTab] = useState('privacy');

  // Handle deep linking via hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['privacy', 'terms', 'cookies', 'eu-labels'].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  const navItems = [
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
    { id: 'eu-labels', label: 'EU Energy Labels', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12">
      
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full bg-[#050505]/90 backdrop-blur-md border-b border-white/20 z-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            <a 
                href="/"
                onClick={(e) => { e.preventDefault(); setPage('home'); }}
                className="flex items-center gap-2 text-[#888] hover:text-white transition-colors text-xs font-bold uppercase tracking-[0.2em]"
            >
                <ArrowLeft size={14} /> Back to Home
            </a>
            <span className="text-sm font-medium">Legal Documentation</span>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-1/4">
                <div className="sticky top-32 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                try {
                                  window.history.replaceState(null, '', `#${item.id}`);
                                } catch (e) {
                                  // Ignore history errors in sandboxed environments
                                }
                            }}
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
            </aside>

            {/* Content Area */}
            <article className="w-full lg:w-3/4 min-h-[60vh] animate-fade-in-up">
                
                {/* PRIVACY POLICY */}
                {activeTab === 'privacy' && (
                    <div className="space-y-8 max-w-3xl">
                        <header>
                            <h1 className="font-display text-4xl md:text-5xl font-light mb-8">Privacy Policy</h1>
                        </header>
                        <div className="text-[#888] space-y-6 leading-relaxed font-light">
                            <p>
                                At West Home Systems, we prioritize the sanctity of your data as much as the silence of your home. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our digital platforms and bespoke configuration services.
                            </p>
                            
                            <section>
                                <h3 className="text-white text-lg font-medium pt-4">1. Information Collection</h3>
                                <p>
                                    We collect information necessary to provide our architectural services, including but not limited to:
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Contact details (Name, Email, Phone)</li>
                                    <li>Geolocation data for site analysis</li>
                                    <li>Configuration preferences and architectural specifications</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-white text-lg font-medium pt-4">2. Digital Twin Data</h3>
                                <p>
                                    For clients utilizing our Digital Twin service, we process topographic and environmental data of your property. This data is encrypted and stored on secure, air-gapped servers located in Switzerland.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-white text-lg font-medium pt-4">3. Data Sovereignty</h3>
                                <p>
                                    We do not sell your data. Your architectural profile is used exclusively for the fabrication and deployment of your West Home unit.
                                </p>
                            </section>
                        </div>
                        <footer className="pt-8 text-xs text-[#666]">
                            Last Updated: January 15, 2025
                        </footer>
                    </div>
                )}

                {/* TERMS OF SERVICE */}
                {activeTab === 'terms' && (
                    <div className="space-y-8 max-w-3xl">
                        <header>
                            <h1 className="font-display text-4xl md:text-5xl font-light mb-8">Terms of Service</h1>
                        </header>
                        <div className="text-[#888] space-y-6 leading-relaxed font-light">
                            <p>
                                These Terms of Service govern your access to and use of the West Home Systems website, configurator, and related services. By accessing our platform, you agree to be bound by these terms.
                            </p>
                            
                            <section>
                                <h3 className="text-white text-lg font-medium pt-4">1. Configuration Accuracy</h3>
                                <p>
                                    The West Home Configurator provides a digital approximation of our physical modules. While we strive for "Digital Twin" accuracy, final dimensions, materials, and specifications are subject to the Engineering Verification phase.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-white text-lg font-medium pt-4">2. Intellectual Property</h3>
                                <p>
                                    All designs, schematics, and software architecture related to West Home (including R-OS) are the exclusive intellectual property of West Home Systems. Unauthorized reproduction of our modular connector systems is strictly prohibited.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-white text-lg font-medium pt-4">3. Production Slot Reservation</h3>
                                <p>
                                    A reservation fee secures a production slot in our fabrication facility. This fee is refundable up until the "Material Lock" phase, typically 90 days prior to fabrication.
                                </p>
                            </section>
                        </div>
                    </div>
                )}

                {/* COOKIE POLICY */}
                {activeTab === 'cookies' && (
                    <div className="space-y-8 max-w-3xl">
                        <header>
                            <h1 className="font-display text-4xl md:text-5xl font-light mb-8">Cookie Policy</h1>
                        </header>
                        <div className="text-[#888] space-y-6 leading-relaxed font-light">
                            <p>
                                West Home Systems uses cookies to enhance the functionality of our 3D configuration tools and to analyze traffic performance.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="p-6 border border-white/20 rounded-xl bg-white/5">
                                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Essential</h4>
                                    <p className="text-sm">Required for the 3D Configurator to retain your selected options between page reloads.</p>
                                </div>
                                <div className="p-6 border border-white/20 rounded-xl bg-white/5">
                                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Analytical</h4>
                                    <p className="text-sm">Anonymous telemetry to help us optimize load times for high-fidelity assets.</p>
                                </div>
                            </div>

                            <p className="pt-4">
                                You may disable cookies in your browser settings, but please note that the 3D Configurator state may not be saved.
                            </p>
                        </div>
                    </div>
                )}

                {/* EU LABELS */}
                {activeTab === 'eu-labels' && (
                    <div className="space-y-8 max-w-3xl">
                        <header>
                            <h1 className="font-display text-4xl md:text-5xl font-light mb-8">EU Energy Labels</h1>
                        </header>
                        <div className="text-[#888] space-y-6 leading-relaxed font-light">
                            <p>
                                In accordance with EU Directive 2010/31/EU on the energy performance of buildings, West Home modules are rated based on their primary energy consumption.
                            </p>
                            
                            <div className="flex flex-col md:flex-row gap-8 items-start pt-8 pb-8">
                                {/* Visual Label */}
                                <div className="w-full md:w-64 bg-white text-black p-4 rounded-lg shadow-xl shrink-0">
                                    <div className="border-b-2 border-black pb-2 mb-2 flex justify-between items-end">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" className="h-4 w-auto" alt="EU Flag" />
                                        <span className="font-bold text-sm">ENERGIA</span>
                                    </div>
                                    <div className="space-y-1 font-bold text-white text-xs">
                                        <div className="bg-[#00a651] w-[30%] px-2 py-0.5">A+++</div>
                                        <div className="bg-[#4cb848] w-[40%] px-2 py-0.5 flex justify-between items-center shadow-lg transform scale-105 origin-left relative z-10">
                                            A++ 
                                            <span className="text-black bg-white/90 px-1 ml-2 text-[8px] rounded uppercase tracking-wider">West Home Standard</span>
                                        </div>
                                        <div className="bg-[#bfd730] w-[50%] px-2 py-0.5 opacity-30">A+</div>
                                        <div className="bg-[#fff200] w-[60%] px-2 py-0.5 opacity-30">A</div>
                                        <div className="bg-[#fdb913] w-[70%] px-2 py-0.5 opacity-30">B</div>
                                        <div className="bg-[#f36f21] w-[80%] px-2 py-0.5 opacity-30">C</div>
                                        <div className="bg-[#ed1c24] w-[90%] px-2 py-0.5 opacity-30">D</div>
                                    </div>
                                    <div className="mt-4 pt-2 border-t border-black flex justify-between text-[10px] font-bold">
                                        <span>XYZ kWh/annum</span>
                                        <span>2025</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white text-xl font-light mb-4">A++ Certified Performance</h3>
                                    <p className="mb-4">
                                        All West Home "Prime" and "Zenith" configurations achieve an A++ Energy Performance Certificate (EPC) rating standard.
                                    </p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2"><Zap size={14} className="text-yellow-500"/> Thermal Transmittance (U-Value): 0.12 W/m²K</li>
                                        <li className="flex items-center gap-2"><Zap size={14} className="text-yellow-500"/> Primary Energy Demand: &lt; 15 kWh/m²/y</li>
                                        <li className="flex items-center gap-2"><Zap size={14} className="text-yellow-500"/> Air Tightness: n50 &lt; 0.6/h</li>
                                    </ul>
                                </div>
                            </div>

                            <button className="flex items-center gap-3 px-6 py-3 border border-white/20 hover:bg-white hover:text-black transition-colors rounded-full text-xs font-bold uppercase tracking-widest w-max">
                                <Download size={16} /> Download Full EPC Certificate
                            </button>
                        </div>
                    </div>
                )}
            </article>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;