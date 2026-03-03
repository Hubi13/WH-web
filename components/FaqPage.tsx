import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, MessageCircle } from 'lucide-react';
import { usePage } from '../contexts/PageContext';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  details: string[];
}

const FaqPage: React.FC = () => {
  const { setPage } = usePage();
  const [openId, setOpenId] = useState<string | null>(null);

  const handleBack = () => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const faqs: FaqItem[] = [
    {
      id: 'clt-life',
      question: "Jaka jest żywotność konstrukcji CLT w domach West Home?",
      answer: "Konstrukcje z drewna klejonego krzyżowo (CLT) są projektowane na minimum 100 lat eksploatacji. Wykorzystujemy najwyższej jakości świerk skandynawski, poddawany precyzyjnej obróbce termicznej i mechanicznej.",
      details: [
        "Naturalna odporność na wilgoć dzięki precyzyjnemu suszeniu komorowemu.",
        "Stabilność wymiarowa znacznie wyższa niż w tradycyjnym budownictwie szkieletowym.",
        "Certyfikacja CLT Nordic potwierdzająca brak osiadania budynku.",
        "Doskonałe właściwości ognioodporne (powolne zwęglanie warstwy zewnętrznej)."
      ]
    },
    {
      id: 'ros-offline',
      question: "Czy system R-OS działa bez połączenia z Internetem?",
      answer: "Tak, kluczowe funkcje domu (ogrzewanie, oświetlenie, bezpieczeństwo) działają w trybie lokalnym offline. System został zaprojektowany z myślą o pełnej autonomii i bezpieczeństwie danych.",
      details: [
        "Lokalna jednostka obliczeniowa Core Neural przetwarza dane wewnątrz budynku.",
        "Połączenie 5G/Starlink wymagane jest jedynie do zdalnego sterowania i aktualizacji.",
        "Prywatność danych: statystyki zużycia energii nie opuszczają Twojej sieci lokalnej.",
        "Redundantne zasilanie dla jednostki sterującej z akumulatorów Powerwall."
      ]
    },
    {
      id: 'permits',
      question: "Czy budowa domu West Home wymaga pozwolenia na budowę?",
      answer: "W większości przypadków tak, domy West Home są pełnoprawnymi budynkami mieszkalnymi i wymagają standardowych formalności prawnych.",
      details: [
        "Dostarczamy pełną dokumentację projektową niezbędną do uzyskania pozwolenia.",
        "Nasze projekty są zgodne z aktualnymi warunkami technicznymi (WT2021).",
        "Współpracujemy z lokalnymi architektami adaptującymi projekt do Twojej działki.",
        "Możliwa jest realizacja w procedurze zgłoszenia dla mniejszych metraży (zależnie od lokalnych przepisów)."
      ]
    },
    {
      id: 'modular-move',
      question: "Czy dom West Home można przenieść w inne miejsce?",
      answer: "Tak, system modularny West Home pozwala na demontaż i ponowny montaż modułów na nowym fundamencie. To unikalna cecha naszej inżynierii, pozwalająca budynkowi podążać za właścicielem.",
      details: [
        "Unikalne złącza systemowe R-Connect zaprojektowane do wielokrotnego użytku.",
        "Transport standardowymi platformami niskopodwoziowymi.",
        "Czas relokacji to zazwyczaj około 14-21 dni roboczych.",
        "Wymaga przygotowania nowej płyty fundamentowej zgodnie ze specyfikacją."
      ]
    },
    {
      id: 'foundations',
      question: "Jakiego rodzaju fundamentu wymagają domy West Home?",
      answer: "Najbardziej rekomendowanym rozwiązaniem jest płyta fundamentowa, która zapewnia idealną stabilność i izolację termiczną.",
      details: [
        "Możliwość posadowienia na ławach fundamentowych lub palach śrubowych w trudnym terenie.",
        "Płyta fundamentowa integruje przyłącza mediów zgodnie z naszym projektem technologicznym.",
        "Fundament musi być wykonany z tolerancją +/- 10mm dla poprawnego montażu modułów.",
        "Oferujemy nadzór inżynierski nad procesem przygotowania podłoża."
      ]
    },
    {
      id: 'interior-finish',
      question: "W jakim stanie wykończenia dostarczane są domy?",
      answer: "Standardem West Home jest stan deweloperski premium, z możliwością pełnego wykończenia pod klucz w fabryce.",
      details: [
        "Instalacje (elektryczna, wod-kan, HVAC) są całkowicie ukryte w strukturze ścian.",
        "W opcji 'Turn-key' montujemy łazienki, kuchnie oraz oświetlenie przed transportem.",
        "Ściany CLT mogą pozostać eksponowane (standard wizualny) lub zostać wykończone płytami.",
        "Podłogi montowane są na miejscu w celu uniknięcia uszkodzeń podczas transportu."
      ]
    },
    {
      id: 'energy-efficiency',
      question: "Jak dom West Home radzi sobie z ekstremalnymi mrozami?",
      answer: "Dzięki zastosowaniu konstrukcji CLT oraz izolacji o wysokiej gęstości, nasze domy posiadają ogromną bezwładność cieplną, utrzymując stabilną temperaturę nawet przy -30°C.",
      details: [
        "Brak mostków termicznych dzięki precyzyjnemu pasowaniu modułów.",
        "Trzyszybowe pakiety Vision Glass z argonem o Ug = 0.5 W/m²K.",
        "System odzysku ciepła (rekuperacja) o sprawności powyżej 90%.",
        "Inteligentne sterowanie ogrzewaniem R-OS optymalizujące zużycie energii."
      ]
    },
    {
      id: 'acoustics-standard',
      question: "Jaki poziom wyciszenia oferują ściany w systemie West Home?",
      answer: "Stosujemy odsprzęglone systemy warstwowe, które redukują hałas zewnętrzny o średnio 45-50 dB, tworząc wewnątrz prawdziwe 'sanktuarium ciszy'.",
      details: [
        "Zastosowanie elastycznych łączników wibroakustycznych.",
        "Wielowarstwowa struktura ściany pochłaniająca szeroki zakres częstotliwości.",
        "Ciche systemy kanalizacyjne w standardzie.",
        "Drzwi i okna o podwyższonych parametrach izolacyjności sferycznej."
      ]
    },
    {
      id: 'warranty-scope',
      question: "Jaki jest zakres gwarancji na domy modułowe?",
      answer: "Oferujemy jedną z najdłuższych gwarancji w branży: 25 lat na konstrukcję i 5 lat na systemy. Nasze standardy wykraczają poza wymogi ustawowe.",
      details: [
        "25 lat gwarancji na sztywność i trwałość szkieletu CLT.",
        "10 lat gwarancji na szczelność pokrycia dachowego i stolarkę.",
        "5 lat gwarancji na systemy R-OS oraz instalacje wewnętrzne.",
        "Bezpłatne przeglądy techniczne co 24 miesiące w okresie gwarancyjnym."
      ]
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] pt-24 pb-24 font-sans selection:bg-black selection:text-white">
      
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full bg-[#F5F5F7]/80 backdrop-blur-xl border-b border-black/5 z-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors text-[11px] font-bold uppercase tracking-[0.2em]"
            >
                <ArrowLeft size={14} /> Powrót
            </button>
            <span className="text-sm font-medium tracking-tight text-[#1D1D1F]/60 uppercase text-[10px] tracking-widest">Wsparcie</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-24">
        {/* Header Section */}
        <header className="mb-32 text-center animate-fade-in-up">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#86868B] block mb-8">Centrum Pomocy</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 tracking-tight text-[#1D1D1F]">
                Często zadawane pytania
            </h1>
            <p className="text-[#86868B] max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed">
                Wszystko, co musisz wiedzieć o technologii, procesie i Twoim nowym domu West Home.
            </p>
        </header>
        
        {/* FAQ List */}
        <div className="space-y-4">
            {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                    <div 
                        key={faq.id} 
                        className={`bg-white transition-all duration-500 overflow-hidden rounded-2xl border border-black/5 ${isOpen ? 'shadow-lg ring-1 ring-black/5' : 'hover:border-black/10'}`}
                    >
                        {/* Question Trigger */}
                        <button 
                            onClick={() => toggleFaq(faq.id)}
                            className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                        >
                            <h3 className="text-[17px] md:text-[19px] font-medium tracking-tight text-[#1D1D1F]">
                                {faq.question}
                            </h3>
                            <div className={`w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center transition-all duration-500 shrink-0 ml-4 ${isOpen ? 'bg-black text-white rotate-180' : 'text-[#86868B] group-hover:text-black'}`}>
                                <ChevronDown size={16} strokeWidth={2.5} />
                            </div>
                        </button>

                        {/* Answer Content */}
                        <div 
                            className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                            <div className="overflow-hidden">
                                <div className="p-6 md:p-8 pt-0 md:pt-0">
                                    <div className="max-w-3xl space-y-6">
                                        <div className="h-[1px] w-full bg-[#F5F5F7] mb-6"></div>
                                        <p className="text-[#1D1D1F]/80 text-[15px] md:text-[16px] leading-relaxed font-normal">
                                            {faq.answer}
                                        </p>

                                        <ul className="space-y-3 pt-2">
                                            {faq.details.map((detail, i) => (
                                                <li key={i} className="flex items-start gap-3 text-[#86868B] text-[14px] leading-relaxed font-medium">
                                                    <div className="mt-2 w-1 h-1 rounded-full bg-[#1D1D1F]/30 shrink-0" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Contact Tile */}
        <div className="mt-40 p-14 bg-white rounded-[3rem] border border-black/5 text-center shadow-sm">
            <div className="w-20 h-20 bg-[#F5F5F7] rounded-[2rem] flex items-center justify-center mx-auto mb-10">
                <MessageCircle size={36} className="text-black" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-light mb-4 tracking-tight">Nadal potrzebujesz wsparcia?</h3>
            <p className="text-[#86868B] mb-12 font-light text-lg max-w-md mx-auto leading-relaxed">Nasi doradcy techniczni są gotowi odpowiedzieć na każde pytanie dotyczące Twojej inwestycji.</p>
            <button className="px-12 py-5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
                Skontaktuj się z ekspertem
            </button>
        </div>

        <footer className="mt-40 pt-12 border-t border-black/5 flex justify-center opacity-30">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1D1D1F]">West Home Systems Engineering</span>
        </footer>
      </div>
    </div>
  );
};

export default FaqPage;