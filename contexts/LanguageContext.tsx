import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'EN' | 'PL' | 'ES';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const translations = {
  EN: {
    nav: {
      philosophy: 'Philosophy',
      models: 'Models',
      technology: 'Technology',
      process: 'Process',
      findDealer: 'Find Dealer',
      menu: 'Menu',
      close: 'Close',
      navigation: 'Navigation',
      headquarters: 'Headquarters',
      social: 'Social',
      manifesto: 'Manifesto',
      fleet: 'Collection',
      systems: 'Systems',
      lifecycle: 'Lifecycle'
    },
    hero: {
      status: 'Bespoke Modular',
      titleLine1: 'Automotive',
      titleLine2: 'Architecture.',
      subtitle: 'Engineered modular homes combining minimalist design, net-zero technology, and Swiss-precision manufacturing.',
      configure: 'Configure',
      watch: 'Watch Film',
      precision: 'Precision',
      precisionVal: '±1mm Tolerance',
      acoustics: 'Acoustics',
      acousticsVal: 'Studio Grade ISO',
      thermal: 'Thermal',
      thermalVal: 'Passive Certified'
    },
    stats: {
      energy: 'Energy Rating',
      acoustic: 'Acoustic Reduction',
      production: 'Production Time',
      warranty: 'Structure Warranty',
      weeks: 'wks',
      years: 'yr'
    },
    philosophy: {
      badge: 'Our Philosophy',
      titleLine1: 'Engineering',
      titleLine2: 'Silence.',
      desc: 'We decouple the living space from the chaotic exterior world, creating a hermetic seal of tranquility through advanced materials and physics.',
      col1Title: 'Precision',
      col1Desc: 'Automated fabrication allows for tolerances previously impossible in construction (±1mm).',
      col2Title: 'Durability',
      col2Desc: 'Monocoque structures inspired by aerospace design ensure generational longevity and seismic resilience.',
      col3Title: 'Intelligence',
      col3Desc: 'Integrated neural networks manage climate, energy, and security without user intervention.'
    },
    story: {
      chapter1: {
        title: "Architecture of Silence",
        text: "True luxury is the absence of noise. Our walls are engineered not just to block sound, but to absorb and cancel frequencies."
      },
      chapter2: {
        title: "Radical Transparency",
        text: "Floor-to-ceiling vision glass that insulates like a solid wall. Blur the line between sanctuary and nature."
      },
      chapter3: {
        title: "Atmospheric Control",
        text: "Hospital-grade air filtration and circadian lighting systems that adapt to your biology."
      }
    },
    models: {
      badge: 'The 2025 Collection',
      title: 'Modular',
      titleBold: 'Fleets.',
      available: 'Available 2025',
      configure: 'Configure',
      area: 'Area',
      efficiency: 'Efficiency',
      acoustics: 'Acoustics',
      mobileClass: 'Class',
      mobileSilence: 'Silence',
      details: {
        CORE: {
          tagline: "Essential Luxury",
          highlight: "Pure Form.",
          features: ["Smart-Ready Core", "A++ Thermal Envelope", "Tactile Pine Finish"]
        },
        PRIME: {
          tagline: "Elevated Living",
          highlight: "Advanced Systems.",
          features: ["R-OS Integration", "Stone Veneer Options", "Studio Soundproofing"]
        },
        ZENITH: {
          tagline: "Absolute Bespoke",
          highlight: "Uncompromised.",
          features: ["Full Autonomy", "Monocoque Frame", "Bespoke Materiality"]
        }
      }
    },
    acousticDemo: {
      title: "Sonic Isolation",
      desc: "Experience the difference of our decoupled wall systems. Toggle to hear the R-Home sanctuary standard.",
      outside: "Urban Chaos (80dB)",
      inside: "R-Home Sanctuary (35dB)"
    },
    globalRoam: {
      badge: "Deployment",
      title: "Global Capability.",
      desc: "Designed to be deployed anywhere. From Alpine peaks to coastal cliffs, R-Home adapts to the environment.",
      locations: [
        { title: "Alpine", desc: "Thermal retention in extreme cold." },
        { title: "Coastal", desc: "Corrosion resistance and wind load stability." },
        { title: "Forest", desc: "Seamless integration with organic topography." }
      ]
    },
    materials: {
      badge: 'Materiality',
      title: 'Material',
      titleBold: 'Intelligence.',
      desc: 'We use materials that age gracefully. Cross-laminated timber, anodized aluminum, and honed stone.',
      items: {
        structural: {
          title: 'Nordic CLT',
          subtitle: 'Structural Core',
          desc: 'High-density cross-laminated timber sourced from managed Nordic forests. Offering superior thermal mass and a carbon-negative footprint.',
          specs: [
            { label: 'Grade', value: 'C24 PEFC' },
            { label: 'Load', value: '450kg/m³' },
            { label: 'Carbon', value: 'Negative' },
            { label: 'Finish', value: 'Honed' }
          ]
        },
        facade: {
          title: 'Vision Glass',
          subtitle: 'Pure Transparency',
          desc: 'Triple-glazed argon-filled units with low-E coating. Maximizing light while maintaining Passive House thermal standards.',
          specs: [
            { label: 'Ug', value: '0.5 W/m²K' },
            { label: 'Light', value: '72% VT' },
            { label: 'Safety', value: 'Tempered' },
            { label: 'Fill', value: 'Argon' }
          ]
        },
        tactile: {
          title: 'Honed Stone',
          subtitle: 'Thermal Mass',
          desc: 'Natural stone finishes honed for a matte, silken touch. Integrated into floors and walls for durability and passive heat storage.',
          specs: [
            { label: 'Source', value: 'EU Quota' },
            { label: 'Touch', value: 'Silk Matte' },
            { label: 'Density', value: '2.6g/cm³' },
            { label: 'LZO', value: 'Zero VOC' }
          ]
        },
        detail: {
          title: 'Anodized Alloy',
          subtitle: 'Precision Detail',
          desc: 'Aircraft-grade aluminum used in frames and hardware. Engineered to millimetric precision and finished for extreme longevity.',
          specs: [
            { label: 'Grade', value: '6061-T6' },
            { label: 'Toler.', value: '0.1mm' },
            { label: 'Cycle', value: '100% Rec.' },
            { label: 'Coating', value: '25μm Anod.' }
          ]
        }
      }
    },
    process: {
      badge: 'The Lifecycle',
      title: 'Linear. Predictable.',
      titleItalic: 'Engineered.',
      desc: 'A manufacturing process inspired by the automotive industry. Zero weather delays, fixed costs, and guaranteed timelines.'
    },
    cta: {
      badge: 'Production slots 2025 open',
      title: 'Designed for',
      titleBold: 'Sanctuary.',
      desc: 'Secure your production slot for the 2025 model year. Limited availability for Zenith configuration.',
      btn: 'Configure Now',
      download: 'Download Catalog'
    },
    features: {
      badge: 'Technical Specifications',
      title: 'System Capabilities',
      c1Mono: '01 - Structure',
      c1Title: 'Mass Timber CLT',
      c1Desc: 'Carbon-negative structural core providing immense strength and thermal mass.',
      c2Mono: '02 - Intelligence',
      c2Title: 'Integrated Core',
      c2Neural: 'Neural Net',
      c2Uptime: '99.9% Uptime',
      c3Mono: '03 - Acoustics',
      c3Label: 'Decoupled',
      c4Mono: '04 - Efficiency',
      c4Label: 'Net Zero',
      c5Title: 'Perimeter Defense',
      c5Secure: 'Secure'
    },
    identity: {
      badge: 'Identity',
      title: 'Defined by',
      titleBold: 'Physics.',
      desc: 'We don’t just design homes; we engineer environments based on first principles.',
      card1Title: 'Precision',
      card1Desc: 'Manufacturing tolerances of +/- 1mm ensure airtight efficiency.',
      card2Title: 'Durability',
      card2Desc: 'Materials chosen for a 100-year lifecycle with minimal maintenance.',
      card3Title: 'Intelligence',
      card3Desc: 'Passive systems that work for you, not against you.'
    },
    gallery: {
      badge: 'Detail',
      title: 'Material Interface',
      caption1: 'Interior Volume / R-Sequence',
      caption2: 'Anodized Interface / Detail'
    },
    bespoke: {
      badge: 'Bespoke Program',
      title: 'Beyond',
      titleBold: 'Standard.',
      desc: 'For clients requiring unique footprints or specific site adaptations, our engineering team offers full bespoke services.',
      step1: 'Consultation',
      step2: 'Digital Twin',
      step3: 'Fabrication',
      cta: 'Inquire Bespoke'
    },
    footer: {
      address: 'Złota 44\n00-120 Warsaw, Poland',
      fleet: 'Collection',
      company: 'Company',
      connect: 'Connect',
      philosophy: 'Philosophy',
      technology: 'Technology',
      careers: 'Careers',
      press: 'Press',
      rights: '© 2025 R-Home Systems.',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies',
      tagline: 'Engineered for Silence'
    },
    dealer: {
      title: 'Find a Dealer',
      subtitle: 'Authorised Retailers',
      searchPlaceholder: 'Search city, name or zip...',
      found: 'locations found',
      notFound: 'No dealers found matching',
      hours: 'Opening Hours',
      contact: 'Contact',
      mapBtn: 'Map',
      callBtn: 'Call'
    }
  },
  PL: {
    nav: {
      philosophy: 'Filozofia',
      models: 'Modele',
      technology: 'Technologia',
      process: 'Proces',
      findDealer: 'Znajdź Dealera',
      menu: 'Menu',
      close: 'Zamknij',
      navigation: 'Nawigacja',
      headquarters: 'Siedziba',
      social: 'Społeczność',
      manifesto: 'Manifest',
      fleet: 'Kolekcja',
      systems: 'Systemy',
      lifecycle: 'Cykl Życia'
    },
    hero: {
      status: 'Bespoke Architecture',
      titleLine1: 'Automotive',
      titleLine2: 'Architecture.',
      subtitle: 'Modułowe domy klasy automotive łączące minimalistyczny design, technologię net-zero i szwajcarską precyzję.',
      configure: 'Konfiguruj',
      watch: 'Zobacz Film',
      precision: 'Precyzja',
      precisionVal: 'Tolerancja ±1mm',
      acoustics: 'Akustyka',
      acousticsVal: 'Studio Grade ISO',
      thermal: 'Termika',
      thermalVal: 'Certyfikat Passive'
    },
    stats: {
      energy: 'Klasa Energetyczna',
      acoustic: 'Redukcja Akustyczna',
      production: 'Czas Produkcji',
      warranty: 'Gwarancja Konstrukcji',
      weeks: 'tyg',
      years: 'lat'
    },
    philosophy: {
      badge: 'Nasza Filozofia',
      titleLine1: 'Inżynieria',
      titleLine2: 'Ciszy.',
      desc: 'Oddzielamy przestrzeń życiową od chaosu świata zewnętrznego, tworząc hermetyczną barierę spokoju dzięki zaawansowanym materiałom.',
      col1Title: 'Precyzja',
      col1Desc: 'Automatyzacja produkcji pozwala na tolerancje niemożliwe w tradycyjnym budownictwie (±1mm).',
      col2Title: 'Trwałość',
      col2Desc: 'Struktury monocoque inspirowane lotnictwem zapewniają długowieczność i odporność sejsmiczną.',
      col3Title: 'Inteligencja',
      col3Desc: 'Zintegrowane sieci neuronowe zarządzają klimatem, energią i bezpieczeństwem.'
    },
    story: {
      chapter1: {
        title: "Architektura Ciszy",
        text: "Prawdziwy luksus to brak hałasu. Nasze ściany nie tylko blokują dźwięk, ale go absorbują."
      },
      chapter2: {
        title: "Radykalna Przejrzystość",
        text: "Szkło od podłogi do sufitu, które izoluje jak lita ściana. Zacieramy granicę między sanktuarium a naturą."
      },
      chapter3: {
        title: "Kontrola Atmosfery",
        text: "Szpitalna filtracja powietrza i oświetlenie cyrkadialne adaptujące się do Twojej biologii."
      }
    },
    models: {
      badge: 'Kolekcja 2025',
      title: 'Flota',
      titleBold: 'Modułowa.',
      available: 'Dostępne 2025',
      configure: 'Konfiguruj',
      area: 'Powierzchnia',
      efficiency: 'Wydajność',
      acoustics: 'Akustyka',
      mobileClass: 'Klasa',
      mobileSilence: 'Cisza',
      details: {
        CORE: {
          tagline: "Esencja Luksusu",
          highlight: "Czysta Forma.",
          features: ["Rdzeń Smart-Ready", "Płaszcz Termiczny A++", "Wykończenie Sosnowe"]
        },
        PRIME: {
          tagline: "Wyższy Standard",
          highlight: "Systemy Zaawansowane.",
          features: ["Integracja R-OS", "Opcje Kamiennego Forniru", "Wygłuszenie Studio"]
        },
        ZENITH: {
          tagline: "Absolutne Bespoke",
          highlight: "Bez Kompromisów.",
          features: ["Pełna Autonomia", "Rama Monocoque", "Materiały Bespoke"]
        }
      }
    },
    acousticDemo: {
      title: "Izolacja Dźwięku",
      desc: "Doświadcz różnicy naszych odsprzęglonych systemów ściennych. Przełącz, aby usłyszeć standard ciszy R-Home.",
      outside: "Miejski Chaos (80dB)",
      inside: "Sanktuarium R-Home (35dB)"
    },
    globalRoam: {
      badge: "Wdrożenie",
      title: "Globalna Zdolność.",
      desc: "Zaprojektowane do wdrożenia wszędzie. Od alpejskich szczytów po wybrzeża, R-Home adaptuje się do otoczenia.",
      locations: [
        { title: "Alpy", desc: "Retencja ciepła w ekstremalnym zimnie." },
        { title: "Wybrzeże", desc: "Odporność na korozję i obciążenie wiatrem." },
        { title: "Las", desc: "Płynna integracja z organiczną topografią." }
      ]
    },
    materials: {
      badge: 'Materialność',
      title: 'Inteligencja',
      titleBold: 'Materiałowa.',
      desc: 'Używamy materiałów, które starzeją się z godnością. Drewno CLT, anodowane aluminium i szlifowany kamień.',
      items: {
        structural: {
          title: 'Nordic CLT',
          subtitle: 'Rdzeń Konstrukcyjny',
          desc: 'Drewno CLT o wysokiej gęstości z zarządzanych lasów północnych. Oferuje doskonałą masę termiczną i ujemny ślad węglowy.',
          specs: [
            { label: 'Klasa', value: 'C24 PEFC' },
            { label: 'Nośność', value: '450kg/m³' },
            { label: 'Węgiel', value: 'Ujemny' },
            { label: 'Szlif', value: 'Gładki' }
          ]
        },
        facade: {
          title: 'Szkło Vision',
          subtitle: 'Czysta Przejrzystość',
          desc: 'Potrójne pakiety szybowe wypełnione argonem z powłoką niskoemisyjną. Maksymalizacja światła przy standardach Passive House.',
          specs: [
            { label: 'Ug', value: '0.5 W/m²K' },
            { label: 'Światło', value: '72% VT' },
            { label: 'Bezpiecz.', value: 'Hartowane' },
            { label: 'Gaz', value: 'Argon' }
          ]
        },
        tactile: {
          title: 'Kamień Szlifowany',
          subtitle: 'Masa Termiczna',
          desc: 'Wykończenia z kamienia naturalnego szlifowane na mat. Zintegrowane z podłogami i ścianami dla trwałości i akumulacji ciepła.',
          specs: [
            { label: 'Źródło', value: 'EU Quota' },
            { label: 'Dotyk', value: 'Matowy Jedwab' },
            { label: 'Gęstość', value: '2.6g/cm³' },
            { label: 'LZO', value: 'Zero VOC' }
          ]
        },
        detail: {
          title: 'Stop Anodowany',
          subtitle: 'Precyzyjny Detal',
          desc: 'Aluminium lotnicze używane w ramach i okuciach. Zaprojektowane z milimetrową precyzją i wykończone dla ekstremalnej trwałości.',
          specs: [
            { label: 'Klasa', value: '6061-T6' },
            { label: 'Toler.', value: '0.1mm' },
            { label: 'Recykling', value: '100% Rec.' },
            { label: 'Powłoka', value: '25μm Anod.' }
          ]
        }
      }
    },
    process: {
      badge: 'Cykl Życia',
      title: 'Liniowy. Przewidywalny.',
      titleItalic: 'Inżynieryjny.',
      desc: 'Proces produkcji inspirowany przemysłem motoryzacyjnym. Zero opóźnień pogodowych, stałe koszty.'
    },
    cta: {
      badge: 'Sloty produkcyjne 2025 otwarte',
      title: 'Zaprojektowany dla',
      titleBold: 'Sanktuarium.',
      desc: 'Zarezerwuj swój slot produkcyjny na rok modelowy 2025. Ograniczona dostępność konfiguracji Zenith.',
      btn: 'Konfiguruj',
      download: 'Pobierz Katalog'
    },
    features: {
      badge: 'Specyfikacja Techniczna',
      title: 'Możliwości Systemu',
      c1Mono: '01 - Konstrukcja',
      c1Title: 'Mass Timber CLT',
      c1Desc: 'Ujemny węglowo rdzeń konstrukcyjny zapewniający ogromną wytrzymałość.',
      c2Mono: '02 - Inteligencja',
      c2Title: 'R-OS Core',
      c2Neural: 'Sieć Neuronowa',
      c2Uptime: '99.9% Czasu Pracy',
      c3Mono: '03 - Akustyka',
      c3Label: 'Odsprzęglona',
      c4Mono: '04 - Wydajność',
      c4Label: 'Net Zero',
      c5Title: 'Ochrona Perymetru',
      c5Secure: 'Zabezpieczony'
    },
    identity: {
      badge: 'Tożsamość',
      title: 'Zdefiniowane przez',
      titleBold: 'Fizykę.',
      desc: 'Nie projektujemy tylko domów; inżynierujemy środowiska oparte na pierwszych zasadach.',
      card1Title: 'Precyzja',
      card1Desc: 'Tolerancje produkcyjne +/- 1mm zapewniają szczelność i wydajność.',
      card2Title: 'Trwałość',
      card2Desc: 'Materiały dobrane na 100-letni cykl życia z minimalną konserwacją.',
      card3Title: 'Inteligencja',
      card3Desc: 'Systemy pasywne, które pracują dla Ciebie, a nie przeciwko Tobie.'
    },
    gallery: {
      badge: 'Detal',
      title: 'Interfejs Materiałowy',
      caption1: 'Wolumen Wnętrza / R-Sequence',
      caption2: 'Anodowany Interfejs / Detal'
    },
    bespoke: {
      badge: 'Program Bespoke',
      title: 'Poza',
      titleBold: 'Standard.',
      desc: 'Dla klientów wymagających unikalnych rozwiązań, nasz zespół inżynierów oferuje pełne usługi bespoke.',
      step1: 'Konsultacja',
      step2: 'Cyfrowy Bliźniak',
      step3: 'Fabrykacja',
      cta: 'Zapytaj o Bespoke'
    },
    footer: {
      address: 'Złota 44\n00-120 Warszawa, Polska',
      fleet: 'Kolekcja',
      company: 'Firma',
      connect: 'Kontakt',
      philosophy: 'Filozofia',
      technology: 'Technologia',
      careers: 'Kariera',
      press: 'Prasa',
      rights: '© 2025 R-Home Systems.',
      privacy: 'Prywatność',
      terms: 'Regulamin',
      cookies: 'Cookies',
      tagline: 'Zaprojektowane dla Ciszy'
    },
    dealer: {
      title: 'Znajdź Dealera',
      subtitle: 'Autoryzowani Sprzedawcy',
      searchPlaceholder: 'Szukaj miasta, nazwy lub kodu...',
      found: 'znalezionych lokalizacji',
      notFound: 'Nie znaleziono dealerów dla',
      hours: 'Godziny Otwarcia',
      contact: 'Kontakt',
      mapBtn: 'Mapa',
      callBtn: 'Zadzwoń'
    }
  },
  ES: {
    nav: {
      philosophy: 'Filosofía',
      models: 'Modelos',
      technology: 'Tecnología',
      process: 'Proceso',
      findDealer: 'Buscar Distribuidor',
      menu: 'Menú',
      close: 'Cerrar',
      navigation: 'Navegación',
      headquarters: 'Sede Central',
      social: 'Social',
      manifesto: 'Manifiesto',
      fleet: 'Colección',
      systems: 'Sistemas',
      lifecycle: 'Ciclo de Vida'
    },
    hero: {
      status: 'Bespoke Architecture',
      titleLine1: 'Automotive',
      titleLine2: 'Architecture.',
      subtitle: 'Casas modulares de grado automotriz que combinan diseño minimalista, tecnología net-zero y precisión suiza.',
      configure: 'Configurar',
      watch: 'Ver Película',
      precision: 'Precisión',
      precisionVal: 'Tolerancia ±1mm',
      acoustics: 'Acústica',
      acousticsVal: 'Grado de Estudio ISO',
      thermal: 'Térmica',
      thermalVal: 'Certificado Pasivo'
    },
    stats: {
      energy: 'Clasificación Energética',
      acoustic: 'Reducción Acústica',
      production: 'Tiempo de Producción',
      warranty: 'Garantía Estructural',
      weeks: 'sem',
      years: 'años'
    },
    philosophy: {
      badge: 'Nuestra Filosofía',
      titleLine1: 'Ingeniería',
      titleLine2: 'Silencio.',
      desc: 'Desacoplamos el espacio vital del caos exterior, creando un sello hermético de tranquilidad mediante materiales avanzados.',
      col1Title: 'Precisión',
      col1Desc: 'La fabricación automatizada permite tolerancias imposibles en la construcción tradicional (±1mm).',
      col2Title: 'Durabilidad',
      col2Desc: 'Estructuras monocasco inspiradas en el diseño aeroespacial aseguran longevidad generacional.',
      col3Title: 'Inteligencia',
      col3Desc: 'Redes neuronales integradas gestionan el clima, la energía y la seguridad.'
    },
    story: {
      chapter1: {
        title: "Arquitectura del Silencio",
        text: "El verdadero lujo es la ausencia de ruido. Nuestras paredes no solo bloquean el sonido, lo absorben."
      },
      chapter2: {
        title: "Transparencia Radical",
        text: "Vidrio de piso a techo que aísla como una pared sólida. Difumina la línea entre santuario y naturaleza."
      },
      chapter3: {
        title: "Control Atmosférico",
        text: "Filtración de aire de grado hospitalario e iluminación circadiana que se adapta a tu biología."
      }
    },
    models: {
      badge: 'Colección 2025',
      title: 'Flota',
      titleBold: 'Modular.',
      available: 'Disponible 2025',
      configure: 'Configurar',
      area: 'Área',
      efficiency: 'Eficiencia',
      acoustics: 'Acústica',
      mobileClass: 'Clase',
      mobileSilence: 'Silencio',
      details: {
        CORE: {
          tagline: "Lujo Esencial",
          highlight: "Forma Pura.",
          features: ["Núcleo Smart-Ready", "Envolvente Térmica A++", "Acabado de Pino Táctil"]
        },
        PRIME: {
          tagline: "Vida Elevada",
          highlight: "Sistemas Avanzados.",
          features: ["Integración R-OS", "Opciones de Chapa de Piedra", "Insonorización de Estudio"]
        },
        ZENITH: {
          tagline: "Absoluto Bespoke",
          highlight: "Sin Compromisos.",
          features: ["Autonomía Total", "Bastidor Monocasco", "Materialidad a Medida"]
        }
      }
    },
    acousticDemo: {
      title: "Aislamiento Sónico",
      desc: "Experimenta la diferencia de nuestros sistemas de paredes desacopladas.",
      outside: "Caos Urbano (80dB)",
      inside: "Santuario R-Home (35dB)"
    },
    globalRoam: {
      badge: "Despliegue",
      title: "Capacidad Global.",
      desc: "Diseñado para desplegarse en cualquier lugar. Desde picos alpinos hasta acantilados costeros.",
      locations: [
        { title: "Alpino", desc: "Retención térmica en frío extremo." },
        { title: "Costero", desc: "Resistencia a la corrosión y carga de viento." },
        { title: "Bosque", desc: "Integración perfecta con topografía orgánica." }
      ]
    },
    materials: {
      badge: 'Materialidad',
      title: 'Inteligencia',
      titleBold: 'Material.',
      desc: 'Usamos materiales que envejecen con gracia. Madera contralaminada, aluminio anodizado y piedra pulida.',
      items: {
        structural: {
          title: 'CLT Nórdico',
          subtitle: 'Núcleo Estructural',
          desc: 'Madera contralaminada de alta densidad procedente de bosques nórdicos gestionados. Ofrece una masa térmica superior.',
          specs: [
            { label: 'Grado', value: 'C24 PEFC' },
            { label: 'Carga', value: '450kg/m³' },
            { label: 'Carbono', value: 'Negativo' },
            { label: 'Acabado', value: 'Pulido' }
          ]
        },
        facade: {
          title: 'Vidrio Vision',
          subtitle: 'Transparencia Pura',
          desc: 'Unidades de triple acristalamiento rellenas de argón con revestimiento de baja emisividad para estándares Passive House.',
          specs: [
            { label: 'Ug', value: '0.5 W/m²K' },
            { label: 'Luz', value: '72% VT' },
            { label: 'Segurid.', value: 'Templado' },
            { label: 'Gas', value: 'Argón' }
          ]
        },
        tactile: {
          title: 'Piedra Pulida',
          subtitle: 'Masa Térmica',
          desc: 'Acabados de piedra natural pulidos para un tacto mate y sedoso. Integrados para durabilidad y almacenamiento térmico.',
          specs: [
            { label: 'Origen', value: 'EU Quota' },
            { label: 'Tacto', value: 'Mate Seda' },
            { label: 'Densidad', value: '2.6g/cm³' },
            { label: 'COV', value: 'Cero VOC' }
          ]
        },
        detail: {
          title: 'Aleación Anodizada',
          subtitle: 'Detalle de Precisión',
          desc: 'Aluminio de grado aeronáutico utilizado en marcos y herrajes. Diseñado con precisión milimétrica.',
          specs: [
            { label: 'Grado', value: '6061-T6' },
            { label: 'Toler.', value: '0.1mm' },
            { label: 'Ciclo', value: '100% Rec.' },
            { label: 'Recub.', value: '25μm Anod.' }
          ]
        }
      }
    },
    process: {
      badge: 'Ciclo de Vida',
      title: 'Lineal. Predecible.',
      titleItalic: 'Ingeniería.',
      desc: 'Proceso de fabricación inspirado en la industria automotriz. Cero retrasos, costos fijos.'
    },
    cta: {
      badge: 'Espacios de producción 2025 abiertos',
      title: 'Diseñado para',
      titleBold: 'Santuario.',
      desc: 'Asegura tu espacio de producción para el año modelo 2025.',
      btn: 'Configurar',
      download: 'Descargar Catálogo'
    },
    features: {
      badge: 'Especificaciones Técnicas',
      title: 'Capacidades del Sistema',
      c1Mono: '01 - Estructura',
      c1Title: 'Madera Masiva CLT',
      c1Desc: 'Núcleo estructural carbono negativo que proporciona inmensa fuerza.',
      c2Mono: '02 - Inteligencia',
      c2Title: 'Núcleo Integrado',
      c2Neural: 'Red Neuronal',
      c2Uptime: '99.9% Tiempo de Actividad',
      c3Mono: '03 - Acústica',
      c3Label: 'Desacoplado',
      c4Mono: '04 - Eficiencia',
      c4Label: 'Neto Cero',
      c5Title: 'Defensa Perimetral',
      c5Secure: 'Seguro'
    },
    identity: {
      badge: 'Identidad',
      title: 'Definido por',
      titleBold: 'Física.',
      desc: 'No solo diseñamos casas; diseñamos entornos basados en primeros principios.',
      card1Title: 'Precisión',
      card1Desc: 'Tolerancias de fabricación de +/- 1mm aseguran eficiencia hermética.',
      card2Title: 'Durabilidad',
      card2Desc: 'Materiales elegidos para un ciclo de vida de 100 años con mantenimiento mínimo.',
      card3Title: 'Inteligencia',
      card3Desc: 'Sistemas pasivos que trabajan para ti, no contra ti.'
    },
    gallery: {
      badge: 'Detalle',
      title: 'Interfaz Material',
      caption1: 'Volumen Interior / R-Sequence',
      caption2: 'Interfaz Material / Detalle'
    },
    bespoke: {
      badge: 'Programa A Medida',
      title: 'Más Allá',
      titleBold: 'del Estándar.',
      desc: 'Para clientes que requieren adaptaciones únicas, nuestro equipo ofrece servicios completos a medida.',
      step1: 'Consulta',
      step2: 'Gemelo Digital',
      step3: 'Fabricación',
      cta: 'Consultar A Medida'
    },
    footer: {
      address: 'Złota 44\n00-120 Varsovia, Polonia',
      fleet: 'Colección',
      company: 'Compañía',
      connect: 'Conectar',
      philosophy: 'Filosofía',
      technology: 'Tecnología',
      careers: 'Carreras',
      press: 'Prensa',
      rights: '© 2025 R-Home Systems.',
      privacy: 'Privacidad',
      terms: 'Términos',
      cookies: 'Cookies',
      tagline: 'Diseñado para el Silencio'
    },
    dealer: {
      title: 'Buscar Distribuidor',
      subtitle: 'Minoristas Autorizados',
      searchPlaceholder: 'Buscar ciudad, nombre o código...',
      found: 'ubicaciones encontradas',
      notFound: 'No se encontraron distribuidores para',
      hours: 'Horario de Apertura',
      contact: 'Contacto',
      mapBtn: 'Mapa',
      callBtn: 'Llamar'
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};