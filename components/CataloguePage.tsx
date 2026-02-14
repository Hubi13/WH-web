import React, { useRef, useEffect, useState } from 'react';
import { X, ArrowRight, ArrowLeft, Download, Loader2 } from 'lucide-react';
import { usePage } from '../contexts/PageContext';
import { useLanguage } from '../contexts/LanguageContext';

declare global {
  interface Window {
    html2canvas: any;
    jspdf: any;
  }
}

const catalogueTranslations = {
  EN: {
    cover: { title: "Collectio MMXXV", subtitle: "Catalogus Technicus", meta: "Model 02 / Blue Hour" },
    manifesto: { chapter: "01 — PHILOSOPHIA", title: "Lorem Ipsum Dolor", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
    rOne: { title: "R-ONE", subtitle: "Lorem Ipsum", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    rOneSpread: { model: "R-ONE", spec: "Editio Silva", desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", stats: ["120m² Area", "A++ Rating", "3 Cubicula"] },
    rOneDetail: { title: "Connexio Naturalis", text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam." },
    rSeq: { title: "R-SEQUENCE", subtitle: "Dolor Sit Amet", desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores." },
    rSeqSpread: { model: "R-SEQUENCE", spec: "Volumen Interior", desc: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", stats: ["180m² Area", "Certificatus", "4 Cubicula"] },
    featMat: { title: "Veritas Materiae", desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti." },
    featDet: { title: "Resolutio Detail", desc: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere." },
    rInf: { title: "R-INFINITY", subtitle: "Luxuria Automotiva", desc: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint." },
    rInfSpread: { model: "R-INFINITY", spec: "Gradus Automotiva", desc: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.", stats: ["300m²+ Area", "Net Zero", "Bespoke"] },
    blueprint: { title: "Sequentia Adventus", desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?", specs: [{ label: "Pondus", val: "250kg" }, { label: "Sera", val: "Biometric" }, { label: "Limen", val: "Zero-Step" }] },
    featThresh: { title: "Limen", desc: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur." },
    back: { title: "R-HOME", subtitle: "Ad Aeternitatem." },
    ui: { download: "Download PDF", generating: "Generating...", close: "Close", edition: "Edition" }
  },
  PL: {
    cover: { title: "Collectio MMXXV", subtitle: "Catalogus Technicus", meta: "Model 02 / Blue Hour" },
    manifesto: { chapter: "01 — PHILOSOPHIA", title: "Lorem Ipsum Dolor", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
    rOne: { title: "R-ONE", subtitle: "Lorem Ipsum", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    rOneSpread: { model: "R-ONE", spec: "Editio Silva", desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", stats: ["120m² Area", "Klasa A++", "3 Cubicula"] },
    rOneDetail: { title: "Connexio Naturalis", text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam." },
    rSeq: { title: "R-SEQUENCE", subtitle: "Dolor Sit Amet", desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores." },
    rSeqSpread: { model: "R-SEQUENCE", spec: "Volumen Interior", desc: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", stats: ["180m² Area", "Certyfikat", "4 Cubicula"] },
    featMat: { title: "Veritas Materiae", desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti." },
    featDet: { title: "Resolutio Detail", desc: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere." },
    rInf: { title: "R-INFINITY", subtitle: "Luxuria Automotiva", desc: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint." },
    rInfSpread: { model: "R-INFINITY", spec: "Gradus Automotiva", desc: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.", stats: ["300m²+ Area", "Net Zero", "Bespoke"] },
    blueprint: { title: "Sequentia Adventus", desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?", specs: [{ label: "Pondus", val: "250kg" }, { label: "Sera", val: "Biometric" }, { label: "Limen", val: "Zero-Step" }] },
    featThresh: { title: "Limen", desc: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur." },
    back: { title: "R-HOME", subtitle: "Ad Aeternitatem." },
    ui: { download: "Pobierz PDF", generating: "Generowanie...", close: "Zamknij", edition: "Edycja" }
  },
  ES: {
    cover: { title: "Collectio MMXXV", subtitle: "Catalogus Technicus", meta: "Model 02 / Blue Hour" },
    manifesto: { chapter: "01 — PHILOSOPHIA", title: "Lorem Ipsum Dolor", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
    rOne: { title: "R-ONE", subtitle: "Lorem Ipsum", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    rOneSpread: { model: "R-ONE", spec: "Editio Silva", desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", stats: ["120m² Area", "Clasificación A++", "3 Cubicula"] },
    rOneDetail: { title: "Connexio Naturalis", text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam." },
    rSeq: { title: "R-SEQUENCE", subtitle: "Dolor Sit Amet", desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores." },
    rSeqSpread: { model: "R-SEQUENCE", spec: "Volumen Interior", desc: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", stats: ["180m² Area", "Certificado", "4 Cubicula"] },
    featMat: { title: "Veritas Materiae", desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti." },
    featDet: { title: "Resolutio Detail", desc: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere." },
    rInf: { title: "R-INFINITY", subtitle: "Luxuria Automotiva", desc: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint." },
    rInfSpread: { model: "R-INFINITY", spec: "Gradus Automotiva", desc: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.", stats: ["300m²+ Area", "Net Zero", "Bespoke"] },
    blueprint: { title: "Sequentia Adventus", desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?", specs: [{ label: "Pondus", val: "250kg" }, { label: "Sera", val: "Biometric" }, { label: "Limen", val: "Zero-Step" }] },
    featThresh: { title: "Limen", desc: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur." },
    back: { title: "R-HOME", subtitle: "Ad Aeternitatem." },
    ui: { download: "Descargar PDF", generating: "Generando...", close: "Cerrar", edition: "Edición" }
  }
};

const CataloguePage: React.FC = () => {
  const { setPage } = usePage();
  const { language } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Get current translations based on language
  // @ts-ignore
  const t = catalogueTranslations[language] || catalogueTranslations['EN'];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const width = window.innerWidth;
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -width : width,
            behavior: 'smooth'
        });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') scroll('right');
        if (e.key === 'ArrowLeft') scroll('left');
        if (e.key === 'Escape') setPage('home');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setPage]);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('l', 'px', [1920, 1080]); // Landscape 1080p
        const pages = document.querySelectorAll('.catalogue-page');

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            
            // Temporary styles to ensure clean capture
            const originalStyle = page.style.transform;
            page.style.transform = 'none'; // Remove any potential scroll snap transforms if capturing individually
            
            const canvas = await window.html2canvas(page, {
                scale: 1, // High res but manageable
                useCORS: true,
                logging: false,
                width: 1920,
                height: 1080,
                windowWidth: 1920,
                windowHeight: 1080
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.9);
            
            if (i > 0) pdf.addPage([1920, 1080], 'l');
            pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
        }

        pdf.save('R-Home_Collection_2025.pdf');
    } catch (error) {
        console.error("PDF Generation failed", error);
        alert("Could not generate PDF. Please check your connection.");
    } finally {
        setIsDownloading(false);
    }
  };

  const pages = [
      // 01. COVER (Model 2 Blue Hour)
      {
          type: 'cover',
          title: t.cover.title,
          subtitle: t.cover.subtitle,
          img: "https://i.imgur.com/2F3Wsc8.jpeg",
          meta: t.cover.meta
      },
      // 02. MANIFESTO
      {
          type: 'text',
          chapter: t.manifesto.chapter,
          title: t.manifesto.title,
          text: t.manifesto.text,
          bg: "#050505",
          textCol: "white"
      },
      
      // --- R-ONE SECTION ---
      {
          type: 'title-spread',
          title: t.rOne.title,
          subtitle: t.rOne.subtitle,
          desc: t.rOne.desc,
          bgImg: "https://i.imgur.com/fNQn8nP.jpg", 
          textCol: "#FFFFFF"
      },
      {
          type: 'spread',
          model: t.rOneSpread.model,
          spec: t.rOneSpread.spec,
          desc: t.rOneSpread.desc,
          img: "https://i.imgur.com/jhpGZkh.jpg", 
          stats: t.rOneSpread.stats
      },
      {
          type: 'detail-grid',
          title: t.rOneDetail.title,
          text: t.rOneDetail.text,
          img1: "https://i.imgur.com/dGFCeEU.jpg", 
          img2: "https://i.imgur.com/fNQn8nP.jpg"  
      },

      // --- R-SEQUENCE SECTION ---
      {
          type: 'title-spread',
          title: t.rSeq.title,
          subtitle: t.rSeq.subtitle,
          desc: t.rSeq.desc,
          bgImg: "https://i.imgur.com/tojGEVa.jpg", 
          textCol: "#FFFFFF"
      },
      {
          type: 'spread',
          model: t.rSeqSpread.model,
          spec: t.rSeqSpread.spec,
          desc: t.rSeqSpread.desc,
          img: "https://i.imgur.com/8l2ocYA.jpg", 
          stats: t.rSeqSpread.stats
      },
      {
          type: 'feature-full',
          title: t.featMat.title,
          desc: t.featMat.desc,
          img: "https://i.imgur.com/rp0K1YQ.jpeg" 
      },
      {
          type: 'feature-full',
          title: t.featDet.title,
          desc: t.featDet.desc,
          img: "https://i.imgur.com/uzEXWr4.jpg" 
      },

      // --- R-INFINITY SECTION ---
      {
          type: 'title-spread',
          title: t.rInf.title,
          subtitle: t.rInf.subtitle,
          desc: t.rInf.desc,
          bgImg: "https://i.imgur.com/iWyQPX1.jpg", 
          textCol: "#FFFFFF"
      },
      {
          type: 'spread',
          model: t.rInfSpread.model,
          spec: t.rInfSpread.spec,
          desc: t.rInfSpread.desc,
          img: "https://i.imgur.com/ay5UUWQ.jpg", 
          stats: t.rInfSpread.stats
      },
       {
          type: 'blueprint',
          model: "R-INFINITY",
          title: t.blueprint.title,
          desc: t.blueprint.desc,
          specs: t.blueprint.specs,
          extraImg: "https://i.imgur.com/476tMHr.jpg" 
      },

      // --- FEATURE: THRESHOLD ---
      {
          type: 'feature-full',
          title: t.featThresh.title,
          desc: t.featThresh.desc,
          img: "https://i.imgur.com/7ou8tEP.jpg" 
      },
      
      // BACK COVER
      {
          type: 'cover',
          title: t.back.title,
          subtitle: t.back.subtitle,
          img: "https://i.imgur.com/iWyQPX1.jpg" 
      }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-white">
        
        {/* Navigation Controls */}
        <div className="absolute top-0 left-0 w-full p-4 md:p-8 lg:p-12 flex justify-between items-start z-50 mix-blend-difference pointer-events-none">
            <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em]">R-Home Systems</span>
                <span className="text-[10px] font-mono opacity-60">CATALOGUE v2025.4</span>
            </div>
            <div className="flex gap-4 pointer-events-auto">
                 <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="hidden md:flex items-center gap-2 px-4 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                        {isDownloading ? t.ui.generating : t.ui.download}
                    </span>
                 </button>
                <button 
                    onClick={() => setPage('home')}
                    className="group flex items-center gap-3 hover:opacity-60 transition-opacity bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
                >
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em]">{t.ui.close}</span>
                    <X size={14} />
                </button>
            </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
            ref={scrollContainerRef}
            className="w-full h-full overflow-x-auto flex snap-x snap-mandatory hide-scrollbar"
        >
            {pages.map((page, i) => (
                <div 
                    key={i} 
                    className="catalogue-page w-screen h-screen flex-shrink-0 snap-center relative overflow-hidden bg-[#050505]"
                >
                    
                    {/* --- TYPE: COVER --- */}
                    {page.type === 'cover' && (
                        <div className="w-full h-full relative">
                            <img 
                                src={page.img} 
                                className="w-full h-full object-cover" 
                                crossOrigin="anonymous" 
                                referrerPolicy="no-referrer"
                            />
                            {/* Gradient for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            
                            {/* Top Right Badge */}
                            <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20 hidden md:block">
                                <div className="flex flex-col items-end text-right text-white/60">
                                     <span className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1">{t.ui.edition}</span>
                                     <span className="text-sm font-mono text-white">v2025.4</span>
                                </div>
                            </div>

                            {/* Bottom Left Content */}
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-24 w-full flex flex-col justify-end items-start text-left z-20">
                                <span className="inline-block px-3 py-1 border border-white/50 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 mb-4 md:mb-6 backdrop-blur-md">
                                    {page.subtitle}
                                </span>
                                <h1 className="font-display text-5xl sm:text-6xl md:text-9xl font-light tracking-tight mb-6 md:mb-8 drop-shadow-2xl text-white leading-none">
                                    {page.title}
                                </h1>
                                
                                {(page as any).meta && (
                                    <div className="flex flex-wrap items-center gap-4 text-white/50 text-xs font-mono uppercase tracking-widest border-t border-white/30 pt-6 w-full max-w-xl">
                                        <span>{(page as any).meta}</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span>R-Home Systems</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- TYPE: TEXT --- */}
                    {page.type === 'text' && (
                        <div className="w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-32" style={{ backgroundColor: page.bg, color: page.textCol }}>
                            <div className="max-w-4xl">
                                <span className="block text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-8 md:mb-12">{page.chapter}</span>
                                <h2 className="font-display text-2xl sm:text-3xl md:text-5xl leading-tight font-light">{page.text}</h2>
                            </div>
                        </div>
                    )}

                    {/* --- TYPE: TITLE SPREAD (Model Intro) --- */}
                    {page.type === 'title-spread' && (
                        <div className="w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-32 relative group" style={{ backgroundColor: page.bgImg ? '#000' : page.bg, color: page.textCol }}>
                            {page.bgImg && (
                                <>
                                    <img 
                                        src={page.bgImg} 
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[3s]"
                                        crossOrigin="anonymous" 
                                        referrerPolicy="no-referrer"
                                    />
                                    {/* Gradient Overlay instead of flat */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                                </>
                            )}
                            <div className="relative z-10">
                                <span className="block text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-6">{(page as any).title}</span>
                                <h2 className="font-display text-5xl md:text-6xl lg:text-8xl font-light mb-8 drop-shadow-lg">{page.subtitle}</h2>
                                <div className="w-24 h-[1px] bg-white mb-8"></div>
                                <p className="text-lg md:text-xl lg:text-2xl font-light max-w-xl leading-relaxed opacity-90 drop-shadow-md">{(page as any).desc}</p>
                            </div>
                        </div>
                    )}

                    {/* --- TYPE: SPREAD (Visual + Stats) --- */}
                    {page.type === 'spread' && (
                        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
                            <div className="h-[40vh] lg:h-full relative border-b lg:border-b-0 lg:border-r border-white/20 group overflow-hidden">
                                <img 
                                    src={page.img} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] ease-out scale-100 group-hover:scale-105" 
                                    crossOrigin="anonymous" 
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12">
                                    <h2 className="text-4xl lg:text-5xl xl:text-7xl font-display font-light text-white mix-blend-difference">{(page as any).model}</h2>
                                </div>
                            </div>
                            <div className="h-[60vh] lg:h-full bg-[#111] p-8 lg:p-24 flex flex-col justify-center">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#666] mb-6">{(page as any).spec}</span>
                                <p className="text-lg lg:text-3xl font-light text-white mb-12 leading-relaxed">{(page as any).desc}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 border-t border-white/20 pt-8">
                                    {(page as any).stats?.map((stat: string, s: number) => (
                                        <div key={s}>
                                            <span className="block text-base lg:text-xl font-light text-white/90">{stat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TYPE: BLUEPRINT (Technical) --- */}
                    {page.type === 'blueprint' && (
                        <div className="w-full h-full bg-[#0A0A0A] text-white p-8 lg:p-32 flex flex-col justify-center relative overflow-hidden">
                            {/* Blueprint Grid Background */}
                            <div className="absolute inset-0 opacity-10" 
                                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                            </div>

                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                                <div>
                                    <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[#444] mb-4">Technical Data</span>
                                    <h2 className="text-3xl lg:text-6xl font-light mb-8">{page.title}</h2>
                                    <p className="text-base lg:text-lg text-[#888] font-light leading-relaxed mb-12">{(page as any).desc}</p>
                                </div>
                                <div className="space-y-6">
                                    {(page as any).extraImg && (
                                        <div className="mb-8 w-full h-40 lg:h-48 overflow-hidden border border-white/30">
                                            <img 
                                                src={(page as any).extraImg} 
                                                className="w-full h-full object-cover" 
                                                crossOrigin="anonymous"
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                    )}
                                    {(page as any).specs?.map((spec: any, s: number) => (
                                        <div key={s} className="flex justify-between items-end border-b border-white/20 pb-4">
                                            <span className="text-xs font-bold uppercase tracking-widest text-[#666]">{spec.label}</span>
                                            <span className="font-mono text-lg lg:text-xl">{spec.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TYPE: FEATURE FULL (Single Feature Image) --- */}
                    {page.type === 'feature-full' && (
                        <div className="w-full h-full relative group overflow-hidden">
                            <img 
                                src={page.img} 
                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                                crossOrigin="anonymous" 
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-12 lg:bottom-24 left-6 lg:left-24 max-w-xl text-white p-4 lg:p-0">
                                <h3 className="text-3xl lg:text-6xl font-display font-light mb-6">{page.title}</h3>
                                <div className="w-16 h-[1px] bg-white mb-6"></div>
                                <p className="text-base lg:text-xl font-light opacity-90 leading-relaxed">{(page as any).desc}</p>
                            </div>
                        </div>
                    )}

                    {/* --- TYPE: DETAIL GRID (Updated 2/3 Split with Overlay) --- */}
                    {page.type === 'detail-grid' && (
                        <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 bg-[#F5F5F7]">
                             {/* Part 1 & 2 combined (8 cols) - Image + Overlay Text */}
                             <div className="col-span-12 md:col-span-8 relative overflow-hidden group h-[60vh] md:h-full">
                                 <img 
                                    src={(page as any).img1} 
                                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                                    crossOrigin="anonymous"
                                    referrerPolicy="no-referrer"
                                 />
                                 
                                 {/* Strong Gradient for Text Visibility */}
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity"></div>
                                 
                                 {/* Overlay Text */}
                                 <div className="absolute bottom-0 left-0 p-8 md:p-24 max-w-3xl z-20">
                                     <h2 className="text-3xl md:text-5xl font-light mb-6 text-white drop-shadow-lg">{page.title}</h2>
                                     <p className="text-base md:text-xl leading-relaxed font-light text-white/90 border-l-2 border-white pl-6 drop-shadow-md">
                                        {(page as any).text}
                                     </p>
                                 </div>
                             </div>

                             {/* Part 3 (4 cols) - Second Image */}
                             <div className="col-span-12 md:col-span-4 relative border-l border-white/20 overflow-hidden group h-[40vh] md:h-full">
                                 <img 
                                    src={(page as any).img2} 
                                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                                    crossOrigin="anonymous"
                                    referrerPolicy="no-referrer"
                                 />
                                 <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md px-4 py-2 text-[10px] uppercase tracking-widest text-white border border-white/30">
                                    Detail View
                                 </div>
                             </div>
                        </div>
                    )}

                    {/* Page Number */}
                    <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-xs font-mono opacity-50 mix-blend-difference text-white">
                        {i + 1} <span className="mx-2">/</span> {pages.length}
                    </div>
                </div>
            ))}
        </div>

        {/* Scroll Hints */}
        <div className="fixed bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-50 mix-blend-difference">
            <button onClick={() => scroll('left')} className="p-3 md:p-4 rounded-full border border-white/40 hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                <ArrowLeft size={18} />
            </button>
            <button onClick={() => scroll('right')} className="p-3 md:p-4 rounded-full border border-white/40 hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                <ArrowRight size={18} />
            </button>
        </div>

    </div>
  );
};

export default CataloguePage;