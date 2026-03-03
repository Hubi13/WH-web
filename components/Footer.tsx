import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePage } from '../contexts/PageContext';

interface FooterLink {
  label: string;
  href: string;
  page?: 'home' | 'dealer' | 'catalogue' | 'legal' | 'philosophy' | 'careers' | 'atelier' | 'test' | 'rhomebook' | 'catalogs' | 'certificates' | 'faq' | 'news';
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { setPage } = usePage();

  const handleLegalNav = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    window.location.hash = section;
    setPage('legal');
  };

  const handleNav = (e: React.MouseEvent, page: any, href: string) => {
    if (href.startsWith('http')) return; 
    e.preventDefault();
    setPage(page);
    const hashIndex = href.indexOf('#');
    if (hashIndex >= 0) {
      const hash = href.substring(hashIndex);
      setTimeout(() => {
        window.location.hash = hash;
      }, 450);
    }
  };

  const footerColumns: FooterColumn[] = [
    {
      title: 'COMPANY',
      links: [
        { label: 'PHILOSOPHY', href: '/philosophy', page: 'philosophy' },
        { label: 'FAQ', href: '/faq', page: 'faq' }
      ]
    },
    {
      title: 'MATERIAŁY',
      links: [
        { label: 'KATALOGI', href: '/catalogs', page: 'catalogs' },
        { label: 'CERTYFIKATY', href: '/certificates', page: 'certificates' },
      ]
    },
    {
      title: 'CONNECT',
      links: [
        { label: 'INSTAGRAM', href: 'https://instagram.com', external: true },
        { label: 'LINKEDIN', href: 'https://linkedin.com', external: true },
      ]
    }
  ];

  return (
    <footer id="footer" className="bg-[#050505] text-white pt-24 pb-12 w-full border-t border-white/10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16 pb-16 border-b border-white/20">

          <div className="col-span-2 md:col-span-3 lg:col-span-2 pr-8 mb-8 lg:mb-0">
            <div className="flex items-center gap-3 mb-6">
               <span className="font-display text-2xl font-bold uppercase tracking-[0.15em] text-white">
                  West Home
               </span>
            </div>
            <p className="text-white/30 text-[10px] uppercase tracking-widest leading-relaxed font-light font-sans max-w-[220px]">
              {t.footer.address}
            </p>
          </div>

          {footerColumns.map((column, idx) => (
            <div key={idx} className="flex flex-col">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-10 h-4">
                {column.title}
              </h4>
              <ul className="space-y-5">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={link.href} 
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={(e) => link.page ? handleNav(e, link.page, link.href) : undefined}
                      className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-end pt-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 mb-8 md:mb-0">
            <a href="/legal#privacy" onClick={(e) => handleLegalNav(e, 'privacy')} className="text-[9px] uppercase tracking-widest text-white/30 hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="/legal#terms" onClick={(e) => handleLegalNav(e, 'terms')} className="text-[9px] uppercase tracking-widest text-white/30 hover:text-white transition-colors">{t.footer.terms}</a>
            <a href="/legal#cookies" onClick={(e) => handleLegalNav(e, 'cookies')} className="text-[9px] uppercase tracking-widest text-white/30 hover:text-white transition-colors">{t.footer.cookies}</a>
            <a href="/legal#eu-labels" onClick={(e) => handleLegalNav(e, 'eu-labels')} className="text-[9px] uppercase tracking-widest text-white/30 hover:text-white transition-colors">EU Labels</a>
          </div>
          
          <div className="text-center md:text-right">
             <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
               {t.footer.rights}
             </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
