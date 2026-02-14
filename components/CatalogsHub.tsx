import React, { useState } from 'react';
import { ArrowLeft, Download, FileText, BookOpen, Layers, ChevronRight, Info } from 'lucide-react';
import { usePage } from '../contexts/PageContext';

const CatalogsHub: React.FC = () => {
  const { setPage } = usePage();
  const [activeCategory, setActiveCategory] = useState('all');

  const handleBack = () => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const categories = [
    { id: 'all', label: 'Wszystkie materiały', icon: Layers },
    { id: 'brand', label: 'Wizerunkowe', icon: BookOpen },
    { id: 'tech', label: 'Techniczne', icon: Info },
    { id: 'models', label: 'Kolekcje Domów', icon: FileText },
  ];

  const modelCatalogs = [
    {
      model: "R-ONE",
      desc: "Minimalizm technologiczny w czystej formie.",
      files: [
        { name: "Broszura Modelu 2025", size: "12MB", type: "PDF" },
        { name: "Standardy Wykończenia", size: "4MB", type: "PDF" },
        { name: "Rzuty i Warianty", size: "8MB", type: "PDF" }
      ]
    },
    {
      model: "R-SEQUENCE",
      desc: "Elegancja i doskonała akustyka.",
      files: [
        { name: "Broszura Modelu 2025", size: "15MB", type: "PDF" },
        { name: "Specyfikacja Prime", size: "5MB", type: "PDF" },
        { name: "Dokumentacja Projektowa", size: "10MB", type: "PDF" }
      ]
    },
    {
      model: "R-INFINITY",
      desc: "Absolutna precyzja i luksusowe materiały.",
      files: [
        { name: "Broszura Kolekcji", size: "18MB", type: "PDF" },
        { name: "Księga Standardów Zenith", size: "7MB", type: "PDF" },
        { name: "Detale Wykończenia Bespoke", size: "12MB", type: "PDF" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] pt-24 pb-24 font-sans selection:bg-[#1D1D1F] selection:text-white">
      
      {/* Navigation Header - Consistent with internal pages */}
      <div className="fixed top-0 left-0 w-full bg-[#F5F5F7]/90 backdrop-blur-md border-b border-[#1D1D1F]/10 z-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-[#666] hover:text-black transition-colors text-xs font-bold uppercase tracking-[0.2em]"
            >
                <ArrowLeft size={14} /> Powrót
            </button>
            <span className="text-sm font-medium tracking-tight">R-Home Book — Library</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-1/4">
                <div className="sticky top-32 space-y-2">
                    <div className="mb-8 px-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666]">Filtruj dokumenty</span>
                    </div>
                    {categories.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveCategory(item.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-300 ${
                                activeCategory === item.id 
                                ? 'bg-[#1D1D1F] text-white shadow-lg' 
                                : 'text-[#666] hover:bg-white hover:text-black hover:shadow-sm'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <item.icon size={18} />
                                <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                            </div>
                            {activeCategory === item.id && <ChevronRight size={14} />}
                        </button>
                    ))}

                    <div className="mt-12 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-[#1D1D1F]">Potrzebujesz pomocy?</h4>
                        <p className="text-xs text-[#666] leading-relaxed mb-6">Jeśli nie znalazłeś szukanego dokumentu, skontaktuj się z naszym działem technicznym.</p>
                        <a href="mailto:support@r-home.systems" className="text-xs font-bold border-b border-black pb-1 hover:opacity-60 transition-opacity">support@r-home.systems</a>
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <main className="w-full lg:w-3/4 animate-fade-in-up">
                
                {/* Header Section */}
                <header className="mb-20">
                    <h1 className="font-display text-5xl md:text-7xl font-light mb-8 tracking-tighter">
                        Katalogi <span className="text-[#1D1D1F]/30 italic font-serif">Firmowe.</span>
                    </h1>
                    <p className="text-[#666] text-xl font-light max-w-2xl leading-relaxed">
                        Centrum dokumentacji R-Home Systems. Pobierz specyfikacje techniczne, broszury modeli oraz standardy wykończenia.
                    </p>
                </header>

                {/* Global Publications */}
                {(activeCategory === 'all' || activeCategory === 'brand' || activeCategory === 'tech') && (
                    <section className="mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(activeCategory === 'all' || activeCategory === 'brand') && (
                                <div className="group bg-white p-10 rounded-[2.5rem] border border-gray-200 hover:shadow-xl transition-all duration-500 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[400px]">
                                    <div>
                                        <div className="w-12 h-12 bg-[#F5F5F7] rounded-2xl flex items-center justify-center mb-8">
                                            <BookOpen size={24} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-3xl font-display font-light mb-4">Katalog R-Home</h3>
                                        <p className="text-[#666] text-sm leading-relaxed max-w-xs">Poznaj naszą filozofię, standardy projektowe i podejście do architektury modułowej.</p>
                                    </div>
                                    <button className="flex items-center gap-3 mt-8 text-[10px] font-bold uppercase tracking-widest border-b border-black/10 group-hover:border-black transition-all w-max pb-2">
                                        Pobierz PDF (24MB) <Download size={14} />
                                    </button>
                                </div>
                            )}

                            {(activeCategory === 'all' || activeCategory === 'tech') && (
                                <div className="group bg-white p-10 rounded-[2.5rem] border border-gray-200 hover:shadow-xl transition-all duration-500 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[400px]" onClick={() => setPage('rhomebook')}>
                                    <div>
                                        <div className="w-12 h-12 bg-[#F5F5F7] rounded-2xl flex items-center justify-center mb-8">
                                            <Layers size={24} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-3xl font-display font-light mb-4">R-Home Book</h3>
                                        <p className="text-[#666] text-sm leading-relaxed max-w-xs">Kompletna dokumentacja techniczna, detale konstrukcyjne i systemy R-OS.</p>
                                    </div>
                                    <button className="flex items-center gap-3 mt-8 text-[10px] font-bold uppercase tracking-widest border-b border-black/10 group-hover:border-black transition-all w-max pb-2">
                                        Otwórz specyfikację <ChevronRight size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Models Section */}
                {(activeCategory === 'all' || activeCategory === 'models') && (
                    <section className="space-y-24">
                        <div className="border-b border-gray-200 pb-6 mb-12">
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#666]">Kategorie i Modele</h2>
                        </div>

                        {modelCatalogs.map((cat, idx) => (
                            <div key={idx} className="space-y-10">
                                <div className="max-w-xl">
                                    <h3 className="text-4xl font-display font-light mb-3 tracking-tight">{cat.model}</h3>
                                    <p className="text-[#666] text-sm font-light uppercase tracking-widest">{cat.desc}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {cat.files.map((file, fIdx) => (
                                        <div key={fIdx} className="group flex items-center justify-between p-8 bg-white border border-gray-200 rounded-2xl hover:bg-[#1D1D1F] hover:text-white transition-all duration-500 cursor-pointer shadow-sm hover:shadow-lg">
                                            <div className="flex items-center gap-6">
                                                <div className="w-10 h-10 bg-[#F5F5F7] group-hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors">
                                                    <FileText size={18} className="text-[#1D1D1F]/40 group-hover:text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[11px] font-bold uppercase tracking-widest mb-1">{file.name}</h4>
                                                    <span className="text-[9px] font-mono opacity-40 uppercase tracking-widest">{file.type} • {file.size}</span>
                                                </div>
                                            </div>
                                            <Download size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Footer Section */}
                <footer className="mt-40 pt-16 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#1D1D1F]/20">
                        © R-Home Systems 2025 • Wszystkie materiały są chronione prawem autorskim
                    </p>
                    <div className="flex gap-8">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#1D1D1F]/40">POLSKA / EU</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#1D1D1F]/40">VER 4.2</span>
                    </div>
                </footer>

            </main>
        </div>
      </div>
    </div>
  );
};

export default CatalogsHub;