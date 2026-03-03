import React, { useState, useEffect } from 'react';
import { Search, MapPin, ArrowRight, ArrowLeft, Phone, Mail, Clock } from 'lucide-react';
import { DEALERS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { usePage } from '../contexts/PageContext';

const DealerPage: React.FC = () => {
    const { t } = useLanguage();
    const { setPage } = usePage();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDealerId, setActiveDealerId] = useState<string | null>(null);

    // Filter logic
    const filteredDealers = DEALERS.filter(d =>
        d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 100) {
            setSearchQuery(e.target.value);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-12 px-6 md:px-12 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <img
                    src="https://imgur.com/dGFCeEU.jpeg"
                    alt="Background"
                    className="w-full h-full object-cover grayscale"
                />
            </div>

            <div className="max-w-[1600px] mx-auto relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/20 pb-8">
                    <div className="animate-fade-in-up">
                        <h1 className="font-display text-5xl md:text-7xl font-light mb-4">
                            {t.dealer.title}
                        </h1>
                        <p className="text-[#888] max-w-xl text-lg font-light">
                            To maintain the highest standards of assembly and delivery, West Home configurations are finalized exclusively through our authorized partners.
                        </p>
                    </div>

                    <div className="w-full md:w-auto mt-8 md:mt-0 animate-fade-in-up delay-100">
                        <div className="relative group w-full md:w-[400px]">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[#666] group-focus-within:text-white transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder={t.dealer.searchPlaceholder}
                                value={searchQuery}
                                onChange={handleSearch}
                                maxLength={100}
                                autoComplete="off"
                                className="w-full bg-transparent border-b border-white/40 py-4 pl-10 text-white focus:outline-none focus:border-white transition-all font-light text-lg rounded-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Dealers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDealers.map((dealer, idx) => (
                        <div
                            key={dealer.id}
                            className="group bg-white/5 backdrop-blur-[2px] border border-white/10 p-10 hover:bg-white/10 transition-all duration-500 cursor-pointer animate-fade-in-up rounded-2xl"
                            style={{ animationDelay: `${idx * 100}ms` }}
                            onMouseEnter={() => setActiveDealerId(dealer.id)}
                            onMouseLeave={() => setActiveDealerId(null)}
                            onClick={() => setActiveDealerId(dealer.id)}
                        >
                            <div className="flex justify-between items-start mb-12">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] border border-white/20 px-3 py-1 rounded-full">
                                    {dealer.badgeLabel || 'Authorized'}
                                </span>
                                <MapPin size={20} className={`${activeDealerId === dealer.id ? 'text-white' : 'text-[#333]'} transition-colors`} />
                            </div>

                            <h3 className="text-3xl font-display font-light mb-2">{dealer.city}</h3>
                            <p className="text-[#888] text-sm mb-8 font-light">{dealer.name}</p>

                            <div className={`space-y-4 overflow-hidden transition-all duration-500 ${activeDealerId === dealer.id ? 'max-h-[300px] opacity-100' : 'max-h-[100px] opacity-60'}`}>
                                <div className="flex items-start gap-4">
                                    <MapPin size={16} className="mt-1 text-[#666]" />
                                    <p className="text-sm text-[#ccc] font-light leading-relaxed">
                                        {dealer.address}<br />{dealer.zip} {dealer.city}, {dealer.country}
                                    </p>
                                </div>

                                <div className={`space-y-4 pt-6 border-t border-white/20 transition-all duration-500 ${activeDealerId === dealer.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                    <div className="flex items-center gap-4">
                                        <Phone size={16} className="text-[#666]" />
                                        <a href={`tel:${dealer.phone}`} className="text-sm text-white hover:text-[#ccc] transition-colors">{dealer.phone}</a>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Mail size={16} className="text-[#666]" />
                                        <a href={`mailto:${dealer.email}`} className="text-sm text-white hover:text-[#ccc] transition-colors">{dealer.email}</a>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Clock size={16} className="mt-1 text-[#666]" />
                                        <p className="text-sm text-[#888] whitespace-pre-line">{dealer.openingHours}</p>
                                    </div>

                                    <a
                                        href={`mailto:${dealer.email}?subject=West%20Home%20Inquiry%20from%20Website&body=I%20am%20interested%20in%20configuring%20an%20West%20Home...`}
                                        className="w-full mt-6 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 rounded-xl"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Contact Dealer <ArrowRight size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredDealers.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-[#666] text-xl font-light">No authorized partners found in this region.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default DealerPage;
