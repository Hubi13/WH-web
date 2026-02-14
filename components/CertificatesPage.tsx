import React, { useState } from 'react';
import { ArrowLeft, Download, ShieldCheck, Zap, Leaf, Shield, CheckCircle2, Globe, ArrowRight, FileCheck, ExternalLink, Home, Bath, Armchair, Box } from 'lucide-react';
import { usePage } from '../contexts/PageContext';

interface Certificate {
  id: string;
  category: string;
  title: string;
  issuer: string;
  desc: string;
  year: string;
  expiry: string;
  fullDetails: string;
  standards: string[];
  benefits: string[];
}

const CertificatesPage: React.FC = () => {
  const { setPage } = usePage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleBack = () => {
    if (selectedCert) {
      setSelectedCert(null);
    } else {
      setPage('home');
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const categories = [
    { id: 'all', label: 'Wszystkie', icon: Globe },
    { id: 'konstrukcja', label: 'Konstrukcja', icon: Home },
    { id: 'wnetrza', label: 'Łazienki & Meble', icon: Bath },
    { id: 'eco', label: 'Ekologia', icon: Leaf },
    { id: 'technologia', label: 'Inne & Tech', icon: Zap },
  ];

  const certificates: Certificate[] = [
    {
      id: 'clt-structural',
      category: 'konstrukcja',
      title: "ETA-14/0349 CLT",
      issuer: "European Technical Assessment",
      desc: "Europejska Ocena Techniczna dla konstrukcji z drewna klejonego krzyżowo.",
      year: "2024",
      expiry: "Permanent",
      fullDetails: "Kluczowy dokument potwierdzający nośność i sztywność paneli CLT produkowanych w standardzie R-Home. Obejmuje badania odporności ogniowej oraz stabilności wymiarowej w różnych warunkach klimatycznych.",
      standards: [
        "Nośność i stateczność (Eurokod 5)",
        "Klasa odporności ogniowej REI 60/90",
        "Izolacyjność akustyczna właściwa",
        "Trwałość biologiczna surowca"
      ],
      benefits: [
        "Bezpieczeństwo konstrukcyjne na pokolenia",
        "Gwarantowana sztywność budynku",
        "Wysoka ognioodporność drewna litego"
      ]
    },
    {
      id: 'bathroom-modular',
      category: 'wnetrza',
      title: "Modular Bath Cert",
      issuer: "Sanitary Engineering Inst.",
      desc: "Certyfikat szczelności i higieny modułów łazienkowych R-Home.",
      year: "2025",
      expiry: "2028",
      fullDetails: "Systemy łazienkowe R-Home przechodzą rygorystyczne testy ciśnieniowe oraz weryfikację hydroizolacyjną. Certyfikat potwierdza brak ryzyka przecieków w strukturze modułowej.",
      standards: [
        "Pełna hydroizolacja powłokowa",
        "Testy szczelności instalacji 10 bar",
        "Powierzchnie Easy-Clean (Anti-Bacterial)",
        "Systemy odpływowe zintegrowane"
      ],
      benefits: [
        "100% ochrony przed zalaniem",
        "Standard higieniczny klasy medycznej",
        "Cichy system kanalizacji (odsprzęglony)"
      ]
    },
    {
      id: 'furniture-voc',
      category: 'wnetrza',
      title: "E1 Furniture Emission",
      issuer: "BIFMA Standard",
      desc: "Certyfikat niskiej emisji formaldehydu dla mebli wbudowanych.",
      year: "2025",
      expiry: "Permanent",
      fullDetails: "Nasze autorskie systemy meblowe są produkowane z płyt o najniższym współczynniku emisji. Gwarantujemy bezpieczeństwo dla zdrowia i brak drażniących zapachów po montażu.",
      standards: [
        "Norma EN 717-1 (Klasa E1)",
        "Lakiery wodne UV-curable",
        "Okucia Blum / Hettich Cert",
        "Płyty o gęstości > 720 kg/m³"
      ],
      benefits: [
        "Zdrowe powietrze we wnętrzu",
        "Trwałość frontów i mechanizmów",
        "Naturalny dotyk fornirów"
      ]
    },
    {
      id: 'passive-house',
      category: 'technologia',
      title: "Passive House Component",
      issuer: "Passivhaus Institut",
      desc: "Certyfikacja dla przegród o współczynniku U < 0.12 W/m²K.",
      year: "2025",
      expiry: "Permanent",
      fullDetails: "Standard Domu Pasywnego gwarantuje minimalne zapotrzebowanie na energię przy najwyższym komforcie cieplnym. R-Home spełnia te wymogi w standardzie fabrycznym.",
      standards: [
        "Współczynnik U ściany < 0.12 W/m²K",
        "Szczelność powietrzna n50 < 0.6/h",
        "Brak mostków termicznych",
        "Rekuperacja o sprawności > 85%"
      ],
      benefits: [
        "Minimalne koszty eksploatacji",
        "Stabilna temperatura przez cały rok",
        "Wysoka wartość rezydualna budynku"
      ]
    },
    {
      id: 'fsc-coi',
      category: 'eco',
      title: "FSC® C123456",
      issuer: "Forest Stewardship Council",
      desc: "Gwarancja pochodzenia drewna z certyfikowanych lasów.",
      year: "2025",
      expiry: "2026",
      fullDetails: "Każdy metr sześcienny drewna w R-Home jest identyfikowalny. Wspieramy zrównoważoną gospodarkę leśną i ochronę bioróżnorodności.",
      standards: [
        "Łańcuch dostaw CoC",
        "Ochrona gatunków chronionych",
        "Prawa społeczności lokalnych",
        "Zakaz stosowania pestycydów"
      ],
      benefits: [
        "Wspieranie ekosystemów",
        "Certyfikowany ślad węglowy",
        "Pewność legalnego pochodzenia"
      ]
    },
    {
      id: 'ce-marking',
      category: 'konstrukcja',
      title: "CE Construction",
      issuer: "EU Conformity",
      desc: "Zgodność z normą EN 1090 dla elementów konstrukcyjnych.",
      year: "2024",
      expiry: "Permanent",
      fullDetails: "Potwierdzenie zgodności dla ram stalowych stosowanych w modelach R-Infinity. Obejmuje procesy spawania, badania nieniszczące oraz zabezpieczenie antykorozyjne C4/C5.",
      standards: [
        "Klasa wykonania EXC2/EXC3",
        "Spawacze certyfikowani ISO 9606",
        "Kontrola wizualna VT 100%",
        "Zgodność wymiarowa ISO 2768"
      ],
      benefits: [
        "Odporność na najtrudniejsze klimaty",
        "Precyzja połączeń milimetrowa",
        "Najwyższe bezpieczeństwo ogniowe"
      ]
    }
  ];

  const filteredCerts = activeCategory === 'all' 
    ? certificates 
    : certificates.filter(c => c.category === activeCategory);

  const handleTabChange = (id: string) => {
    setActiveCategory(id);
    setSelectedCert(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] pt-24 pb-12 font-sans">
      
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full bg-[#F5F5F7]/90 backdrop-blur-md border-b border-[#1D1D1B]/10 z-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-[#666] hover:text-black transition-colors text-xs font-bold uppercase tracking-[0.2em]"
            >
                <ArrowLeft size={14} /> {selectedCert ? 'Powrót do listy' : 'Biblioteka'}
            </button>
            <span className="text-sm font-medium tracking-tight">Systemy & Certyfikacja</span>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Sidebar Navigation - Mirroring Career style */}
            <aside className="w-full lg:w-1/5">
                <div className="sticky top-32 space-y-1.5">
                    <div className="mb-6 px-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#666]">Klasyfikacja Norm</span>
                    </div>
                    {categories.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleTabChange(item.id)}
                            className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl text-left transition-all duration-300 ${
                                activeCategory === item.id && !selectedCert
                                ? 'bg-[#1D1D1F] text-white shadow-lg' 
                                : 'text-[#666] hover:bg-white hover:text-black hover:shadow-sm'
                            }`}
                        >
                            <item.icon size={16} />
                            <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
                        </button>
                    ))}

                    <div className="mt-16 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hidden lg:block">
                        <ShieldCheck size={20} className="mb-4 text-[#1D1D1F]" />
                        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-[#1D1D1F]">Status: Verified</h4>
                        <p className="text-[11px] text-[#666] leading-relaxed">
                            Wszystkie dokumenty są aktualne i podlegają corocznej weryfikacji.
                        </p>
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <main className="w-full lg:w-4/5 min-h-[60vh] animate-fade-in-up">
                
                {!selectedCert ? (
                    // LIST VIEW - Compact grid with smaller cards
                    <>
                        <header className="mb-12">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#666] block mb-4">Ratio et Veritas</span>
                            <h1 className="font-display text-4xl md:text-5xl font-light mb-4 tracking-tight">Standardy Jakości</h1>
                            <p className="text-[#666] max-w-2xl text-base font-light leading-relaxed">
                                Każdy komponent R-Home posiada paszport techniczny potwierdzający najwyższe standardy inżynierii i ekologii.
                            </p>
                        </header>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredCerts.map((cert) => (
                                <div 
                                    key={cert.id} 
                                    onClick={() => setSelectedCert(cert)}
                                    className="group bg-white p-7 rounded-2xl border border-gray-200 hover:border-black/20 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between h-[300px]"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-9 h-9 bg-[#F5F5F7] rounded-xl flex items-center justify-center text-[#1D1D1F] group-hover:bg-[#1D1D1F] group-hover:text-white transition-colors">
                                                {cert.category === 'eco' ? <Leaf size={18} /> : 
                                                 cert.category === 'konstrukcja' ? <Home size={18} /> : 
                                                 cert.category === 'wnetrza' ? <Bath size={18} /> : <Zap size={18} />}
                                            </div>
                                            <span className="text-[8px] font-mono text-[#666] bg-[#F5F5F7] px-2.5 py-1 rounded-full uppercase tracking-widest">
                                                {cert.year}
                                            </span>
                                        </div>
                                        <span className="block text-[8px] font-bold uppercase tracking-[0.4em] text-[#666] mb-2">{cert.issuer}</span>
                                        <h3 className="text-xl font-serif font-light text-[#1D1D1F] mb-3 group-hover:italic transition-all leading-tight">{cert.title}</h3>
                                        <p className="text-[12px] text-[#666] font-light leading-relaxed line-clamp-3 italic">
                                            {cert.desc}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-[#1D1D1F]/40 group-hover:text-[#1D1D1F] transition-colors pt-4 border-t border-gray-50">
                                        Szczegóły normy <ArrowRight size={12} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    // DETAIL VIEW - Mirroring Career deep dive
                    <div className="animate-fade-in-up">
                        <div className="bg-white p-8 md:p-14 rounded-[2rem] border border-gray-200 shadow-xl max-w-5xl">
                            <header className="mb-10 border-b border-gray-100 pb-10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#666] mb-3 block">
                                            Oficjalna Dokumentacja — {selectedCert.issuer}
                                        </span>
                                        <h1 className="font-display text-4xl md:text-5xl font-light text-[#1D1D1F] tracking-tighter">
                                            {selectedCert.title}
                                        </h1>
                                    </div>
                                    <button className="flex items-center gap-2.5 px-7 py-3.5 bg-[#1D1D1F] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg">
                                        Pobierz PDF <Download size={14} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="bg-[#F5F5F7] p-4 rounded-xl">
                                        <span className="block text-[8px] font-bold uppercase tracking-widest text-[#666] mb-1">Status</span>
                                        <span className="text-xs font-medium text-green-600 flex items-center gap-1.5">
                                            <CheckCircle2 size={12} /> Aktywny
                                        </span>
                                    </div>
                                    <div className="bg-[#F5F5F7] p-4 rounded-xl">
                                        <span className="block text-[8px] font-bold uppercase tracking-widest text-[#666] mb-1">Rok Wydania</span>
                                        <span className="text-xs font-medium">{selectedCert.year}</span>
                                    </div>
                                    <div className="bg-[#F5F5F7] p-4 rounded-xl">
                                        <span className="block text-[8px] font-bold uppercase tracking-widest text-[#666] mb-1">Ważność</span>
                                        <span className="text-xs font-medium">{selectedCert.expiry}</span>
                                    </div>
                                    <div className="bg-[#F5F5F7] p-4 rounded-xl">
                                        <span className="block text-[8px] font-bold uppercase tracking-widest text-[#666] mb-1">Kod ID</span>
                                        <span className="text-xs font-mono opacity-40">CERT-{selectedCert.id.toUpperCase()}</span>
                                    </div>
                                </div>
                            </header>

                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-[#1D1D1F] border-l-2 border-[#1D1D1F] pl-4">Zakres i Specyfikacja</h3>
                                    <p className="text-[#666] leading-relaxed font-light text-base">
                                        {selectedCert.fullDetails}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div>
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-[#1D1D1F]">Punkty Kontrolne</h3>
                                        <ul className="space-y-3">
                                            {selectedCert.standards.map((s, i) => (
                                                <li key={i} className="flex items-start gap-3 text-[#666] text-[13px] leading-relaxed">
                                                    <div className="mt-1.5 w-1 h-1 rounded-full bg-[#1D1D1F] shrink-0" />
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-[#1D1D1F]">Korzyści dla Projektu</h3>
                                        <ul className="space-y-3">
                                            {selectedCert.benefits.map((b, i) => (
                                                <li key={i} className="flex items-start gap-3 text-[#666] text-[13px] leading-relaxed group">
                                                    <CheckCircle2 size={16} className="text-[#1D1D1F]/20 group-hover:text-green-500 transition-colors shrink-0" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-3 text-[#666] text-[10px]">
                                        <ShieldCheck size={16} strokeWidth={1} />
                                        <span>Dokumentacja zweryfikowana cyfrowo</span>
                                    </div>
                                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:underline">
                                        Weryfikacja w rejestrze <ExternalLink size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;