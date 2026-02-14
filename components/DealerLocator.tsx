import React, { useState, useEffect, useCallback } from 'react';
import { X, Search, Phone, Navigation, ArrowRight } from 'lucide-react';
import { DEALERS } from '../constants';
import { Dealer } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { sanitizeString, debounce } from '../utils/security';

interface DealerLocatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const DealerLocator: React.FC<DealerLocatorProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDealerId, setSelectedDealerId] = useState<string | null>(null);
  const [filteredDealers, setFilteredDealers] = useState<Dealer[]>(DEALERS);
  
  const { t } = useLanguage();

  const filterDealers = useCallback((query: string) => {
    const cleanQuery = sanitizeString(query).toLowerCase();
    const filtered = DEALERS.filter(d =>
      d.city.toLowerCase().includes(cleanQuery) ||
      d.name.toLowerCase().includes(cleanQuery) ||
      d.zip.includes(cleanQuery) ||
      d.country.toLowerCase().includes(cleanQuery)
    );
    setFilteredDealers(filtered);
  }, []);

  // Debounced filter to prevent excessive processing
  const debouncedFilter = useCallback(
    debounce((query: string) => filterDealers(query), 300),
    [filterDealers]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setSearchQuery('');
        setFilteredDealers(DEALERS);
        setSelectedDealerId(null);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Strict input length limit
    if (value.length > 100) return;
    
    setSearchQuery(value);
    debouncedFilter(value);
  };

  const handleDealerClick = (id: string) => {
    setSelectedDealerId(selectedDealerId === id ? null : id);
  };

  const handleDirections = (e: React.MouseEvent, dealer: Dealer) => {
    e.stopPropagation();
    const query = encodeURIComponent(`${dealer.address}, ${dealer.zip} ${dealer.city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handlePhone = (e: React.MouseEvent, phone: string) => {
    e.stopPropagation();
    window.location.href = `tel:${phone.replace(/\s/g, '')}`;
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex justify-end ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dealer-locator-title"
    >
       
       {/* Backdrop */}
       <div 
         className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-700 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
         onClick={onClose}
         aria-hidden="true"
       ></div>

      {/* Right Panel */}
      <div 
        className={`
          relative w-full md:w-1/2 h-full 
          bg-[#050505]/85 backdrop-blur-2xl 
          border-l border-white/20 shadow-2xl 
          transform transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)
          flex flex-col md:rounded-l-3xl
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
         
         {/* Header */}
         <div className="p-8 md:p-12 border-b border-white/20 flex justify-between items-start shrink-0">
             <div>
                <span className="block text-xs font-bold text-white/60 uppercase tracking-[0.25em] mb-4">{t.dealer.subtitle}</span>
                <h2 id="dealer-locator-title" className="font-display text-4xl text-white font-light tracking-wide">{t.dealer.title}</h2>
             </div>
             
             <button
                onClick={onClose}
                className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close Dealer Locator"
             >
                <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest">{t.nav.close}</span>
                <X size={24} strokeWidth={1} aria-hidden="true" />
             </button>
         </div>

         {/* Search */}
         <div className="p-8 md:px-12 md:py-8 shrink-0">
              <div className="relative group">
                <label htmlFor="dealer-search" className="sr-only">{t.dealer.searchPlaceholder}</label>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors" size={18} strokeWidth={1.5} aria-hidden="true" />
                <input
                  id="dealer-search"
                  type="text"
                  placeholder={t.dealer.searchPlaceholder}
                  className="w-full h-[50px] pl-10 pr-4 bg-white/5 border border-white/25 text-white placeholder-white/30 font-sans text-sm tracking-wide focus:outline-none focus:border-white transition-all rounded-xl"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  maxLength={100}
                  autoComplete="off"
                />
              </div>
         </div>

         {/* Dealer List */}
         <div className="flex-1 overflow-y-auto custom-scrollbar-dark" role="list">
             {filteredDealers.length > 0 ? (
               filteredDealers.map((dealer, index) => {
                 const isSelected = selectedDealerId === dealer.id;
                 return (
                   <div
                      key={dealer.id}
                      onClick={() => handleDealerClick(dealer.id)}
                      onKeyPress={(e) => { if(e.key === 'Enter' || e.key === ' ') handleDealerClick(dealer.id) }}
                      role="listitem"
                      tabIndex={0}
                      className={`
                        border-b border-white/20 p-8 md:px-12 cursor-pointer group transition-all duration-500
                        ${isSelected ? 'bg-white/5' : 'hover:bg-white/[0.02]'}
                      `}
                      style={{ transitionDelay: `${index * 50}ms` }}
                   >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-4">
                           {dealer.badgeLabel && (
                             <span className={`inline-block px-6 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] mb-3 border rounded-full ${isSelected ? 'border-white text-white' : 'border-white/20 text-white/50'}`}>
                                {dealer.badgeLabel}
                             </span>
                           )}
                           <h3 className="font-display text-2xl text-white font-light mb-2 group-hover:pl-2 transition-all duration-300">
                             {dealer.name}
                           </h3>
                           <p className="font-sans text-xs text-white/60 font-light group-hover:pl-2 transition-all duration-300">{dealer.city}, {dealer.country}</p>
                        </div>
                        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-white text-black rotate-90' : 'text-white/40 group-hover:border-white group-hover:text-white'}`}>
                            <ArrowRight size={14} aria-hidden="true" />
                        </div>
                      </div>

                      {/* Expanded Content */}
                      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isSelected ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0'}`}>
                         <div className="min-h-0 space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                               <div>
                                  <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold block mb-2">{t.dealer.hours}</span>
                                  <div className="text-sm text-white/90 font-light whitespace-pre-line">{dealer.openingHours}</div>
                               </div>
                               <div>
                                  <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold block mb-2">{t.dealer.contact}</span>
                                  <div className="text-sm text-white/90 font-light">{dealer.phone}</div>
                                  <div className="text-sm text-white/90 font-light mt-1">{dealer.email}</div>
                               </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/20">
                               <button 
                                  onClick={(e) => handleDirections(e, dealer)} 
                                  className="flex-1 py-4 border border-white/30 text-white hover:bg-white hover:text-black hover:border-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 rounded-xl"
                                  aria-label={`Get directions to ${dealer.name}`}
                               >
                                  <Navigation size={14} aria-hidden="true" /> {t.dealer.mapBtn}
                               </button>
                               <button 
                                  onClick={(e) => handlePhone(e, dealer.phone)} 
                                  className="flex-1 py-4 border border-white/30 text-white hover:bg-white hover:text-black hover:border-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 rounded-xl"
                                  aria-label={`Call ${dealer.name}`}
                               >
                                  <Phone size={14} aria-hidden="true" /> {t.dealer.callBtn}
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>
                 );
               })
             ) : (
                <div className="p-12 text-center">
                    <p className="text-white/40 font-light">{t.dealer.notFound} "{sanitizeString(searchQuery)}"</p>
                </div>
             )}
         </div>

         <div className="p-8 md:px-12 border-t border-white/20 bg-black/20 text-right">
             <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                 {filteredDealers.length} {t.dealer.found}
             </span>
         </div>
         
      </div>

      <style>{`
        .custom-scrollbar-dark::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar-dark::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
      `}</style>
    </div>
  );
};

export default DealerLocator;
