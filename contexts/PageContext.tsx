import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Page = 'home' | 'dealer' | 'catalogue' | 'legal' | 'philosophy' | 'careers' | 'atelier' | 'test' | 'rhomebook' | 'catalogs' | 'certificates' | 'faq' | 'news';

interface PageContextType {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const handleInitialNavigation = () => {
      try {
        const path = window.location.pathname;
        if (path.includes('dealer')) setCurrentPage('dealer');
        else if (path.includes('catalogue')) setCurrentPage('catalogue');
        else if (path.includes('catalogs')) setCurrentPage('catalogs');
        else if (path.includes('certificates')) setCurrentPage('certificates');
        else if (path.includes('rhomebook')) setCurrentPage('rhomebook');
        else if (path.includes('faq')) setCurrentPage('faq');
        else if (path.includes('news')) setCurrentPage('news');
        else if (path.includes('legal')) setCurrentPage('legal');
        else if (path.includes('philosophy')) setCurrentPage('philosophy');
        else if (path.includes('careers')) setCurrentPage('careers');
        else if (path.includes('atelier')) setCurrentPage('atelier');
        else if (path.includes('test')) setCurrentPage('test');
        else setCurrentPage('home');
      } catch (e) {
        setCurrentPage('home');
      }
    };
    handleInitialNavigation();
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && state.page) {
        setCurrentPage(state.page);
      } else {
        const path = window.location.pathname;
        if (path.includes('catalogs')) setCurrentPage('catalogs');
        else if (path.includes('certificates')) setCurrentPage('certificates');
        else if (path.includes('faq')) setCurrentPage('faq');
        else if (path.includes('news')) setCurrentPage('news');
        else setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'auto' });

    let route = '/';
    if (page === 'dealer') route = '/dealer';
    if (page === 'catalogue') route = '/catalogue';
    if (page === 'catalogs') route = '/catalogs';
    if (page === 'certificates') route = '/certificates';
    if (page === 'rhomebook') route = '/rhomebook';
    if (page === 'faq') route = '/faq';
    if (page === 'news') route = '/news';
    if (page === 'legal') route = '/legal';
    if (page === 'philosophy') route = '/philosophy';
    if (page === 'careers') route = '/careers';
    if (page === 'atelier') route = '/atelier';
    if (page === 'test') route = '/test';

    try {
      window.history.pushState({ page }, '', route);
    } catch (e) {}
  };

  return (
    <PageContext.Provider value={{ currentPage, setPage: navigate }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};