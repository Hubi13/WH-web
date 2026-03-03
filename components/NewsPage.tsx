import React, { useState } from 'react';
import { ArrowLeft, Newspaper, Lightbulb, Building, MapPin, Calendar, User, ArrowRight } from 'lucide-react';
import { usePage } from '../contexts/PageContext';
import { sanitizeString, validateEmail, globalRateLimiter } from '../utils/security';

interface Article {
  id: string;
  category: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string[];
  image: string;
}

const NewsPage: React.FC = () => {
  const { setPage } = usePage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleBack = () => {
    if (selectedArticle) {
      setSelectedArticle(null);
    } else {
      setPage('home');
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus(null);

    // Rate Limit: 3 attempts per 5 minutes
    if (!globalRateLimiter.isAllowed('newsletter_subscription', 3, 300000)) {
      setNewsletterStatus({ type: 'error', message: 'Zbyt wiele prób. Spróbuj ponownie za 5 minut.' });
      return;
    }

    const cleanEmail = sanitizeString(email, 254);
    if (!validateEmail(cleanEmail)) {
      setNewsletterStatus({ type: 'error', message: 'Wprowadź poprawny adres e-mail.' });
      return;
    }

    // Simulate API call
    console.log('Subscribing:', cleanEmail);
    setNewsletterStatus({ type: 'success', message: 'Dziękujemy za zapisanie się!' });
    setEmail('');
  };

  const categories = [
    { id: 'all', label: 'Wszystkie wpisy', icon: Newspaper },
    { id: 'innovation', label: 'Innowacje', icon: Lightbulb },
    { id: 'architecture', label: 'Architektura', icon: Building },
    { id: 'locations', label: 'Realizacje', icon: MapPin },
  ];

  const articles: Article[] = [
    {
      id: 'clt-future',
      category: 'innovation',
      title: "West Home integruje nową generację paneli CLT z izolacją próżniową",
      author: "Marek Kowalski",
      date: "12 Luty 2025",
      excerpt: "Nasz zespół badawczy we współpracy z ETH Zurich opracował system ścian o grubości zaledwie 18cm, które osiągają parametry izolacyjności standardu pasywnego.",
      image: "https://i.imgur.com/H4BsEqJ.jpeg",
      content: [
        "Innowacja polega na połączeniu wysokiej gęstości drewna klejonego CLT z rdzeniem z paneli próżniowych (VIP). To przełom w architekturze modułowej, gdzie każdy centymetr powierzchni użytkowej ma znaczenie.",
        "Nowe panele będą standardem w linii R-Infinity od połowy roku 2025.",
        "Dzięki tej technologii, dom o powierzchni 120m² zyskuje dodatkowe 4m² przestrzeni wewnętrznej przy zachowaniu tych samych wymiarów zewnętrznych modułu transportowego."
      ]
    },
    {
      id: 'alps-project',
      category: 'locations',
      title: "Ukończenie ekstremalnej realizacji w Alpach Szwajcarskich",
      author: "Anna Nowak",
      date: "05 Luty 2025",
      excerpt: "Relacja z montażu modelu R-Sequence na wysokości 2100 m n.p.m. Zobacz jak poradziliśmy sobie z logistyką helikopterową.",
      image: "https://i.imgur.com/dGFCeEU.jpeg",
      content: [
        "Projekt 'Summit House' był jednym z najtrudniejszych wyzwań w historii West Home. Moduły musiały zostać zaprojektowane tak, aby wytrzymać obciążenie śniegiem przekraczające 800 kg/m².",
        "Montaż trwał zaledwie 3 dni, pomimo ekstremalnych warunków pogodowych.",
        "Budynek jest w pełni autonomiczny, korzystając z paneli PVT zintegrowanych z elewacją oraz systemów odzysku wody."
      ]
    },
    {
      id: 'minimalist-trends',
      category: 'architecture',
      title: "Psychologia ciszy: Dlaczego wybieramy minimalizm technologiczny?",
      author: "Dr Elena Rossi",
      date: "28 Styczeń 2025",
      excerpt: "Esej o tym, jak architektura wpływa na nasz układ nerwowy i dlaczego system R-OS dba nie tylko o temperaturę, ale i o Twój spokój.",
      image: "https://i.imgur.com/ay5UUWQ.jpeg",
      content: [
        "Współczesny dom powinien być filtrem dla przebodźcowanego świata. Minimalizm to nie tylko estetyka, to higiena umysłu.",
        "Analizujemy jak ukryta technologia w domach West Home redukuje poziom stresu u mieszkańców.",
        "Systemy cyrkadialnego oświetlenia to klucz do lepszego snu i regeneracji w domowym zaciszu."
      ]
    }
  ];

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] pt-24 pb-12 font-sans">
      
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full bg-[#F5F5F7]/90 backdrop-blur-md border-b border-[#1D1D1F]/10 z-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-[#666] hover:text-black transition-colors text-xs font-bold uppercase tracking-[0.2em]"
            >
                <ArrowLeft size={14} /> {selectedArticle ? 'Powrót do listy' : 'Wróć na stronę główną'}
            </button>
            <span className="text-sm font-medium">News & Journal</span>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-1/5">
                <div className="sticky top-32 space-y-1.5">
                    <div className="mb-6 px-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#666]">Kategorie</span>
                    </div>
                    {categories.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveCategory(sanitizeString(item.id)); setSelectedArticle(null); }}
                            className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl text-left transition-all duration-300 ${
                                activeCategory === item.id && !selectedArticle
                                ? 'bg-[#1D1D1F] text-white shadow-lg' 
                                : 'text-[#666] hover:bg-white hover:text-black hover:shadow-sm'
                            }`}
                        >
                            <item.icon size={16} />
                            <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
                        </button>
                    ))}

                    <div className="mt-16 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hidden lg:block">
                        <Calendar size={20} className="mb-4 text-[#1D1D1F]" />
                        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-[#1D1D1F]">Newsletter</h4>
                        <p className="text-[11px] text-[#666] leading-relaxed mb-4">Otrzymuj najnowsze projekty i innowacje bezpośrednio na maila.</p>
                        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                            <div className="relative">
                                <input 
                                  type="email" 
                                  placeholder="Twój e-mail" 
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="w-full bg-[#F5F5F7] border-none rounded-lg p-3 text-[10px] focus:ring-1 focus:ring-black" 
                                  required
                                  maxLength={254}
                                />
                            </div>
                            <button 
                              type="submit" 
                              className="w-full py-2.5 bg-black text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#333] transition-colors"
                            >
                              Zapisz się
                            </button>
                            {newsletterStatus && (
                              <p className={`text-[9px] mt-2 font-medium ${newsletterStatus.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                {newsletterStatus.message}
                              </p>
                            )}
                        </form>
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <main className="w-full lg:w-4/5 min-h-[60vh] animate-fade-in-up">
                
                {!selectedArticle ? (
                    // BLOG LIST VIEW
                    <>
                        <header className="mb-12">
                            <h1 className="font-display text-4xl md:text-5xl font-light mb-4 tracking-tight">Aktualności</h1>
                            <p className="text-[#666] max-w-2xl text-base font-light leading-relaxed">
                                Śledź postępy w naszych badaniach nad architekturą modułową i zobacz najnowsze realizacje West Home.
                            </p>
                        </header>
                        
                        <div className="space-y-10">
                            {filteredArticles.map((article) => (
                                <article 
                                    key={article.id} 
                                    onClick={() => setSelectedArticle(article)}
                                    className="group bg-white rounded-2xl border border-gray-200 hover:shadow-2xl transition-all cursor-pointer overflow-hidden flex flex-col md:flex-row h-auto md:h-[350px]"
                                >
                                    <div className="w-full md:w-2/5 h-[240px] md:h-full overflow-hidden">
                                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                                    </div>
                                    <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-between">
                                        <div>
                                            <div className="flex gap-4 mb-4 text-[9px] font-bold uppercase tracking-widest text-[#666]">
                                                <span className="text-[#1D1D1F]">{article.date}</span>
                                                <span>•</span>
                                                <span className="opacity-40">{article.category}</span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-display font-light text-[#1D1D1F] mb-6 transition-all leading-tight">
                                                {article.title}
                                            </h3>
                                            <p className="text-[14px] text-[#666] font-light leading-relaxed line-clamp-3">
                                                {article.excerpt}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#1D1D1F] mt-8">
                                            Czytaj artykuł <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                ) : (
                    // ARTICLE DETAIL VIEW
                    <div className="animate-fade-in-up">
                        <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl overflow-hidden max-w-5xl">
                            <div className="aspect-[21/9] w-full relative">
                                <img src={selectedArticle.image} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-10 left-10 text-white">
                                     <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block opacity-80">{selectedArticle.category}</span>
                                     <h1 className="text-3xl md:text-5xl font-display font-light leading-tight drop-shadow-lg">{selectedArticle.title}</h1>
                                </div>
                            </div>

                            <div className="p-8 md:p-16">
                                <div className="flex flex-wrap items-center gap-8 mb-12 pb-8 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                                            <User size={18} className="text-[#1D1D1F]/40" />
                                        </div>
                                        <div>
                                            <span className="block text-[9px] font-bold uppercase tracking-widest text-[#666]">Autor</span>
                                            <span className="text-[13px] font-medium">{selectedArticle.author}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar size={18} className="text-[#1D1D1F]/40" />
                                        <div>
                                            <span className="block text-[9px] font-bold uppercase tracking-widest text-[#666]">Data Publikacji</span>
                                            <span className="text-[13px] font-medium">{selectedArticle.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8 max-w-3xl">
                                    <p className="text-2xl font-light leading-relaxed text-[#1D1D1F] italic">
                                        {selectedArticle.excerpt}
                                    </p>
                                    
                                    {selectedArticle.content.map((para, i) => (
                                        <p key={i} className="text-lg leading-relaxed text-[#666] font-light">
                                            {para}
                                        </p>
                                    ))}
                                </div>

                                <footer className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#666]">Journal / {selectedArticle.id.toUpperCase()}</span>
                                    <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:underline">
                                        Wróć do listy <ArrowLeft size={14} />
                                    </button>
                                </footer>
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

export default NewsPage;
