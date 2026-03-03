import React, { useEffect, useState } from 'react';
import { ArrowLeft, Printer, Shield, Zap, Wind, Ruler, Globe, Info, Download } from 'lucide-react';
import { usePage } from '../contexts/PageContext';

const TechnicalCatalogPage: React.FC = () => {
  const { setPage } = usePage();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // On desktop, we scale down if window is smaller than A4 landscape width (approx 1122px)
      // On mobile (<768px), we change strategy to maintain readability
      if (width < 768) {
         // Force a scale that fits the width but allows vertical scrolling inside the component container if needed
         // 297mm is approx 1122px. Phone is ~360px. Scale ~0.3 is too small. 
         // Strategy: Don't scale below 0.4, let user pinch zoom or just rely on the container overflow.
         // Actually, better UX for "Book" on mobile is to scale to fit width.
         const targetWidth = 1122; 
         const padding = 20;
         const newScale = (width - padding) / targetWidth;
         // Set a minimum scale floor to prevent microscopic text, though it might crop.
         // Ideally, for mobile, we should refactor layout, but preserving "Book" look:
         setScale(Math.max(newScale, 0.28)); 
      } else if (width < 1200) {
        const targetWidth = 1122; 
        const padding = 40;
        const newScale = (width - padding) / targetWidth;
        setScale(Math.max(newScale, 0.5));
      } else {
        setScale(1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBack = () => {
    setPage('catalogs');
  };

  const handlePrint = () => {
    window.print();
  };

  const pages = [
    {
      type: 'cover',
      title: 'West Home',
      subtitle: 'BOOK',
      meta: 'COLLECTIO MMXXV — TECHNICAL MONOGRAPH',
      edition: 'EDITIO PRIMA',
      location: 'VARSAVIA / OSLO',
      monogram: 'R-H'
    },
    {
      type: 'manifesto',
      chapter: 'I',
      label: 'PHILOSOPHIA',
      title: 'Architektura Ciszy.',
      text: 'W świecie zdefiniowanym przez hałas, my wybieramy redukcję. West Home to nie tylko dom, to precyzyjny instrument odcinający mieszkańców od zewnętrznego chaosu, tworząc przestrzeń dla myśli i spokoju.'
    },
    {
      type: 'tech',
      chapter: 'II',
      label: 'MATERIA',
      title: 'Nordic CLT.',
      desc: 'Rdzeń konstrukcyjny z drewna klejonego krzyżowo. Ujemny ślad węglowy połączony z wytrzymałością stali.',
      stats: [
        { label: 'Tolerancja', val: '± 0.5 mm' },
        { label: 'Gęstość', val: '480 kg/m³' },
        { label: 'Ognioodporność', val: 'REI 90' }
      ],
      image: 'https://i.imgur.com/H4BsEqJ.jpeg'
    },
    {
      type: 'intelligence',
      chapter: 'III',
      label: 'RATIO',
      title: 'R-OS Neural Core.',
      desc: 'Centralny układ nerwowy domu. Autonomiczne zarządzanie klimatem, energią i bezpieczeństwem bez Twojej ingerencji.',
      features: [
        'Predykcyjne zarządzanie energią',
        'Filtracja powietrza klasy HEPA-13',
        'Adaptacyjne oświetlenie cyrkadialne',
        'Zabezpieczenie perymetru R-Secure'
      ]
    },
    {
      type: 'performance',
      chapter: 'IV',
      label: 'SENSUM',
      title: 'Bariera Absolutna.',
      desc: 'Fizyczne odseparowanie od środowiska. Nasze przegrody definiują nową klasę izolacyjności seryjnej.',
      stats: [
        { icon: Wind, label: 'Standard', val: 'PASSIVE HOUSE' },
        { icon: Shield, label: 'Akustyka', val: '-48 dB' },
        { icon: Zap, label: 'Energia', val: 'KLASA A++' }
      ]
    },
    {
      type: 'collection',
      chapter: 'V',
      label: 'COLLECTIO',
      title: 'Modele 2025.',
      models: [
        { name: 'R-ONE', spec: '120m² — Core' },
        { name: 'R-SEQUENCE', spec: '180m² — Prime' },
        { name: 'R-INFINITY', spec: '300m²+ — Zenith' }
      ]
    },
    {
      type: 'epilogue',
      title: 'West Home SYSTEMS',
      contact: 'contact@west-home.eu',
      address: 'Złota 44, 00-120 Warszawa',
      web: 'www.r-home.systems'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1D1D1B] font-sans selection:bg-[#1D1D1B] selection:text-white print:bg-white print:text-black overflow-x-hidden">
      
      {/* Editorial HUD */}
      <nav className="fixed top-0 left-0 w-full bg-[#FDFCFB]/80 backdrop-blur-sm border-b border-[#1D1D1B]/5 z-[100] print:hidden">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 h-16 md:h-24 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 md:gap-4 text-[#1D1D1B]/40 hover:text-[#1D1D1B] transition-all text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]"
          >
            <ArrowLeft size={14} strokeWidth={1} /> INDEX
          </button>
          
          <div className="flex items-center gap-4 md:gap-12">
            <span className="hidden md:block text-[9px] font-bold uppercase tracking-[0.5em] text-[#1D1D1B]/30 italic font-serif">Catalogus Technicus MMXXV</span>
            <button 
              onClick={handlePrint}
              className="group flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#1D1D1B] border-b border-[#1D1D1B]/20 hover:border-[#1D1D1B] transition-all pb-1"
            >
              <Download size={12} strokeWidth={1.5} /> <span className="hidden sm:inline">PRINT EDITION</span><span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>
      </nav>

      {/* PUBLICATION CONTENT */}
      <div className="flex flex-col items-center pt-20 md:pt-32 pb-24 md:pb-32 print:pt-0 print:pb-0 px-2 md:px-4">
        
        {pages.map((page, idx) => (
          <div 
            key={idx} 
            className="flex justify-center w-full overflow-hidden md:overflow-visible mb-4 md:mb-16 print:mb-0"
            // Use dynamic height based on scale to reduce gap on mobile
            style={{ height: `calc(210mm * ${scale})` }}
          >
            <section 
              className={`
                relative w-[297mm] h-[210mm] bg-[#FDFCFB] flex flex-col p-[20mm] md:p-[35mm] overflow-hidden 
                shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)] origin-top
                print:shadow-none print:m-0 print:page-break-after-always print:scale-100
              `}
              style={{ transform: `scale(${scale})` }}
            >
              
              {/* Corner Decorative Elements */}
              <div className="absolute top-[10mm] left-[10mm] md:top-[15mm] md:left-[15mm] w-[10mm] md:w-[20mm] h-[0.5px] bg-[#1D1D1B]/10"></div>
              <div className="absolute top-[10mm] left-[10mm] md:top-[15mm] md:left-[15mm] w-[0.5px] h-[10mm] md:h-[20mm] bg-[#1D1D1B]/10"></div>
              
              {/* Header for internal pages */}
              {page.type !== 'cover' && page.type !== 'epilogue' && (
                <header className="flex justify-between items-start mb-8 md:mb-16 border-b border-[#1D1D1B]/5 pb-6 md:pb-10">
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="text-[12px] md:text-[16px] font-serif italic text-[#1D1D1B]/40 font-light">{page.chapter}</span>
                    <div className="h-4 w-[0.5px] bg-[#1D1D1B]/10"></div>
                    <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-[#1D1D1B]/60">{page.label}</span>
                  </div>
                  <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] text-[#1D1D1B]/30 italic font-serif">West Home Monograph</span>
                </header>
              )}

              {/* Content Logic */}
              {page.type === 'cover' && (
                <div className="h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[10px] md:text-[12px] font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase">West Home</span>
                      <span className="text-[7px] md:text-[8px] font-medium tracking-[0.3em] md:tracking-[0.4em] uppercase text-[#1D1D1B]/30 mt-2">Systems Engineering</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] md:text-[9px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-[#1D1D1B]/60">{page.location}</span>
                      <span className="block text-[8px] md:text-[9px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-[#1D1D1B]/60 mt-1 md:mt-2">{page.edition}</span>
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col justify-center items-center text-center">
                    <div className="text-[10px] md:text-[14px] font-serif italic text-[#1D1D1B]/20 mb-6 md:mb-10 tracking-[0.6em] md:tracking-[1em] uppercase">Monograph</div>
                    <h1 className="text-[80px] md:text-[150px] font-serif font-light leading-[0.7] tracking-tighter text-[#1D1D1B] flex flex-col">
                      <span>{page.title}</span>
                      <span className="italic opacity-10 -mt-2 md:-mt-4">{page.subtitle}</span>
                    </h1>
                    <div className="w-[60mm] md:w-[100mm] h-[0.5px] bg-[#1D1D1B]/20 my-10 md:my-16"></div>
                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.6em] md:tracking-[0.8em] text-[#1D1D1B]/40 max-w-lg leading-relaxed px-4">
                      {page.meta}
                    </p>
                  </div>
                  <div className="flex justify-between items-end border-t border-[#1D1D1B]/5 pt-6 md:pt-8">
                    <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#1D1D1B]/30 font-serif italic">Ratio et Veritas</span>
                    <span className="text-[10px] md:text-[14px] font-serif italic text-[#1D1D1B]/20">Pagina 01</span>
                  </div>
                </div>
              )}

              {page.type === 'manifesto' && (
                <div className="h-full flex flex-col justify-center max-w-[200mm] mx-auto text-center">
                  <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.6em] md:tracking-[1em] text-[#1D1D1B]/20 mb-8 md:mb-16">Manifesto</span>
                  <h2 className="text-4xl md:text-8xl font-serif font-light leading-[1] text-[#1D1D1B] mb-8 md:mb-16 tracking-tight">
                    {page.title}
                  </h2>
                  <div className="w-[0.5px] h-20 md:h-40 bg-[#1D1D1B]/10 mx-auto mb-8 md:mb-16"></div>
                  <p className="text-lg md:text-2xl font-serif leading-relaxed text-[#1D1D1B]/70 italic mx-auto max-w-3xl font-light">
                    {page.text}
                  </p>
                </div>
              )}

              {page.type === 'tech' && (
                <div className="h-full grid grid-cols-12 gap-10 md:gap-20 items-center">
                  <div className="col-span-5">
                    <h3 className="text-3xl md:text-6xl font-serif font-light mb-6 md:mb-10 tracking-tight leading-none">{page.title}</h3>
                    <p className="text-sm md:text-base font-serif leading-relaxed text-[#1D1D1B]/70 italic mb-8 md:mb-14 font-light">{page.desc}</p>
                    <div className="space-y-6 md:space-y-10">
                      {page.stats?.map((s, i) => (
                        <div key={i} className="flex justify-between items-end border-b border-[#1D1D1B]/10 pb-3 md:pb-5">
                          <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[#1D1D1B]/50">{s.label}</span>
                          <span className="text-lg md:text-2xl font-serif font-light">{s.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-7 h-full bg-[#FAF9F6] border border-[#1D1D1B]/5 overflow-hidden relative rounded-sm shadow-inner">
                    <img src={page.image} className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-[3s] hover:scale-105" alt="Tech" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCFB]/40 via-transparent to-transparent"></div>
                    <div className="absolute top-6 right-6 md:top-10 md:right-10 text-[6px] md:text-[8px] font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase text-white/50 mix-blend-difference">Scan 300DPI</div>
                  </div>
                </div>
              )}

              {page.type === 'intelligence' && (
                <div className="h-full flex flex-col justify-center">
                  <h3 className="text-4xl md:text-7xl font-serif font-light mb-10 md:mb-16 tracking-tight">{page.title}</h3>
                  <div className="grid grid-cols-12 gap-10 md:gap-24">
                    <div className="col-span-7">
                      <p className="text-lg md:text-2xl font-serif leading-relaxed text-[#1D1D1B]/80 italic font-light">
                        {page.desc}
                      </p>
                      <div className="mt-10 md:mt-20 w-full h-[1px] bg-[#1D1D1B]/10"></div>
                    </div>
                    <div className="col-span-5">
                      <ul className="space-y-4 md:space-y-8">
                        {page.features?.map((f, i) => (
                          <li key={i} className="flex items-center gap-4 md:gap-8 text-[9px] md:text-[12px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#1D1D1B]/80 group">
                            <div className="w-6 md:w-10 h-[0.5px] bg-[#1D1D1B]/20 group-hover:w-16 transition-all duration-500"></div>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {page.type === 'performance' && (
                <div className="h-full flex flex-col justify-center">
                  <h3 className="text-4xl md:text-7xl font-serif font-light mb-10 md:mb-16 tracking-tight">{page.title}</h3>
                  <p className="text-lg md:text-2xl font-serif leading-relaxed text-[#1D1D1B]/80 italic mb-12 md:mb-24 max-w-3xl font-light">
                    {page.desc}
                  </p>
                  <div className="grid grid-cols-3 gap-6 md:gap-10">
                    {page.stats?.map((s, i) => (
                      <div key={i} className="group p-6 md:p-12 border border-[#1D1D1B]/10 bg-white shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-1">
                        <s.icon size={20} strokeWidth={1} className="text-[#1D1D1B]/30 mb-6 md:mb-10 group-hover:text-black transition-colors" />
                        <span className="block text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#1D1D1B]/40 mb-2 md:mb-3">{s.label}</span>
                        <span className="text-xl md:text-4xl font-serif font-light tracking-tight">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {page.type === 'collection' && (
                <div className="h-full flex flex-col">
                  <h3 className="text-4xl md:text-7xl font-serif font-light mb-12 md:mb-24 tracking-tight">{page.title}</h3>
                  <div className="space-y-[1px] bg-[#1D1D1B]/10">
                    {page.models?.map((m, i) => (
                      <div key={i} className="flex justify-between items-center py-8 md:py-14 bg-[#FDFCFB] border-b border-[#1D1D1B]/10 group hover:bg-[#F9F8F6] transition-colors px-2 md:px-4">
                        <div className="flex items-baseline gap-4 md:gap-8">
                           <span className="text-[10px] md:text-[14px] font-serif italic text-[#1D1D1B]/20">0{i+1}</span>
                           <span className="text-2xl md:text-6xl font-serif font-light tracking-tighter group-hover:italic transition-all duration-500">{m.name}</span>
                        </div>
                        <span className="text-[8px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#1D1D1B]/40">{m.spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {page.type === 'epilogue' && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <img src="/west-home-logo.svg" alt="Logo" className="h-10 md:h-16 w-auto object-contain brightness-0 opacity-20 mb-12 md:mb-24" />
                  <h2 className="text-3xl md:text-6xl font-serif font-light mb-8 md:mb-14 tracking-tighter">{page.title}</h2>
                  <div className="w-12 md:w-16 h-[1px] bg-[#1D1D1B]/20 mb-10 md:mb-14"></div>
                  <div className="space-y-4 md:space-y-6 mb-16 md:mb-24">
                    <span className="block text-[8px] md:text-[11px] font-bold uppercase tracking-[0.6em] md:tracking-[0.8em] text-[#1D1D1B]/40">{page.contact}</span>
                    <span className="block text-[8px] md:text-[11px] font-bold uppercase tracking-[0.6em] md:tracking-[0.8em] text-[#1D1D1B]/40">{page.address}</span>
                    <span className="block text-[8px] md:text-[11px] font-bold uppercase tracking-[0.6em] md:tracking-[0.8em] text-[#1D1D1B]/40">{page.web}</span>
                  </div>
                  <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#1D1D1B]/20 italic font-serif">
                    Architectura pro aeternitate.
                  </div>
                </div>
              )}

              {/* Footer mark for internal pages */}
              {page.type !== 'cover' && page.type !== 'epilogue' && (
                <footer className="absolute bottom-[20mm] left-[20mm] right-[20mm] md:bottom-[35mm] md:left-[35mm] md:right-[35mm] flex justify-between items-end">
                  <div className="flex gap-10 md:gap-20 text-[7px] md:text-[9px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#1D1D1B]/40">
                    <div className="flex items-center gap-2 md:gap-4">
                      <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#1D1D1B]/20"></span>
                      <span>EX ARCHITECTURA SILENTII</span>
                    </div>
                    <span>EDITIO MMXXV</span>
                  </div>
                  <span className="text-[12px] md:text-[16px] font-serif italic text-[#1D1D1B]/20 font-light">Pagina 0{idx + 1}</span>
                </footer>
              )}

            </section>
          </div>
        ))}

      </div>

      <style>{`
        @media screen {
          section {
            box-shadow: 0 40px 120px -20px rgba(0,0,0,0.08);
          }
        }
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            background-color: white !important;
            -webkit-print-color-adjust: exact;
          }
          section {
            width: 297mm !important;
            height: 210mm !important;
            margin: 0 !important;
            padding: 35mm !important;
            box-shadow: none !important;
            border: none !important;
            page-break-after: always;
            float: none;
            overflow: hidden;
            background-color: #FDFCFB !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TechnicalCatalogPage;
