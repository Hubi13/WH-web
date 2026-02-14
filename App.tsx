import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { PageProvider, usePage } from './contexts/PageContext';
import { updateSeoTags, PageKey } from './utils/seo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ModelSelector from './components/ModelSelector';
import Stats from './components/Stats';
import ShowcaseSection from './components/ShowcaseSection';
import MaterialLab from './components/MaterialLab';
import ProcessTimeline from './components/ProcessTimeline';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import AcousticDemo from './components/AcousticDemo';
import GlobalRoam from './components/GlobalRoam';
import DealerPage from './components/DealerPage';
import DealerLocator from './components/DealerLocator';
import CataloguePage from './components/CataloguePage';
import CatalogsHub from './components/CatalogsHub';
import CertificatesPage from './components/CertificatesPage';
import TechnicalCatalogPage from './components/TechnicalCatalogPage';
import LegalPage from './components/LegalPage';
import PhilosophyPage from './components/PhilosophyPage';
import CareersPage from './components/CareersPage';
import FaqPage from './components/FaqPage';
import NewsPage from './components/NewsPage';
import AtelierPage from './components/AtelierPage';

const MainContent = () => (
  <main className="w-full flex-grow relative" id="main-content" role="main">
    <Hero />
    <Stats />
    <Philosophy />
    <ShowcaseSection /> 
    <ModelSelector />
    <AcousticDemo />
    <GlobalRoam />
    <MaterialLab />
    <ProcessTimeline />
    <CTA />
  </main>
);

const AppContent = () => {
  const [showDealerLocator, setShowDealerLocator] = useState(false);
  const { currentPage } = usePage();

  useEffect(() => {
    updateSeoTags(currentPage as PageKey);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 'home') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { 
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
      });

      const elements = document.querySelectorAll('.reveal-on-scroll, .clip-reveal, .scale-reveal');
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen font-sans selection:bg-white selection:text-black bg-[#050505] flex flex-col">
        <CustomCursor />
        <aside aria-label="Dealer Locator Modal">
          <DealerLocator isOpen={showDealerLocator} onClose={() => setShowDealerLocator(false)} />
        </aside>

        <div className="opacity-100 flex flex-col min-h-screen w-full">
            {currentPage === 'home' && (
              <header className="fixed top-0 w-full z-50">
                 <Navbar onOpenDealer={() => setShowDealerLocator(true)} />
              </header>
            )}
            
            {currentPage === 'home' && <MainContent />}
            
            {currentPage === 'dealer' && (
              <main className="w-full flex-grow"><DealerPage /></main>
            )}
            {currentPage === 'catalogue' && (
              <main className="w-full flex-grow"><CataloguePage /></main>
            )}
            {currentPage === 'catalogs' && (
              <main className="w-full flex-grow"><CatalogsHub /></main>
            )}
            {currentPage === 'certificates' && (
              <main className="w-full flex-grow"><CertificatesPage /></main>
            )}
            {currentPage === 'rhomebook' && (
              <main className="w-full flex-grow"><TechnicalCatalogPage /></main>
            )}
            {currentPage === 'faq' && (
              <main className="w-full flex-grow"><FaqPage /></main>
            )}
            {currentPage === 'news' && (
              <main className="w-full flex-grow"><NewsPage /></main>
            )}
            {currentPage === 'legal' && (
              <main className="w-full flex-grow"><LegalPage /></main>
            )}
            {currentPage === 'philosophy' && (
              <main className="w-full flex-grow"><PhilosophyPage /></main>
            )}
            {currentPage === 'careers' && (
              <main className="w-full flex-grow"><CareersPage /></main>
            )}
            {currentPage === 'atelier' && (
              <main className="w-full flex-grow"><AtelierPage /></main>
            )}

            {currentPage === 'home' && <Footer />}
        </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <PageProvider>
        <AppContent />
      </PageProvider>
    </LanguageProvider>
  );
}

export default App;