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
      precisionVal: 'Â±1mm Tolerance',
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
      col1Desc: 'Automated fabrication allows for tolerances previously impossible in construction (Â±1mm).',
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
      desc: "Experience the difference of our decoupled wall systems. Toggle to hear the West Home sanctuary standard.",
      outside: "Urban Chaos (80dB)",
      inside: "West Home Sanctuary (35dB)"
    },
    globalRoam: {
      badge: "Deployment",
      title: "Global Capability.",
      desc: "Designed to be deployed anywhere. From Alpine peaks to coastal cliffs, West Home adapts to the environment.",
      locations: [
        { title: "Alpine", desc: "Thermal retention in extreme cold." },
        { title: "Coastal", desc: "Corrosion resistance and wind load stability." },
        { title: "Forest", desc: "Seamless integration with organic topography." }
      ],
      coverageTitle: "Build Regions",
      coverageDesc: "Our engineered system enables West Home construction on prepared sites across every major world region.",
      regions: ["North America", "Europe", "Middle East", "Asia-Pacific"]
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
            { label: 'Load', value: '450kg/mÂł' },
            { label: 'Carbon', value: 'Negative' },
            { label: 'Finish', value: 'Honed' }
          ]
        },
        facade: {
          title: 'Vision Glass',
          subtitle: 'Pure Transparency',
          desc: 'Triple-glazed argon-filled units with low-E coating. Maximizing light while maintaining Passive House thermal standards.',
          specs: [
            { label: 'Ug', value: '0.5 W/mÂ˛K' },
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
            { label: 'Density', value: '2.6g/cmÂł' },
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
            { label: 'Coating', value: '25ÎĽm Anod.' }
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
      desc: 'We donâ€™t just design homes; we engineer environments based on first principles.',
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
      address: 'ZĹ‚ota 44\n00-120 Warsaw, Poland',
      fleet: 'Collection',
      company: 'Company',
      connect: 'Connect',
      philosophy: 'Philosophy',
      technology: 'Technology',
      careers: 'Careers',
      press: 'Press',
      rights: 'Â© 2025 West Home Systems.',
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
      findDealer: 'ZnajdĹş Dealera',
      menu: 'Menu',
      close: 'Zamknij',
      navigation: 'Nawigacja',
      headquarters: 'Siedziba',
      social: 'SpoĹ‚ecznoĹ›Ä‡',
      manifesto: 'Manifest',
      fleet: 'Kolekcja',
      systems: 'Systemy',
      lifecycle: 'Cykl Ĺ»ycia'
    },
    hero: {
      status: 'Bespoke Architecture',
      titleLine1: 'Automotive',
      titleLine2: 'Architecture.',
      subtitle: 'ModuĹ‚owe domy klasy automotive Ĺ‚Ä…czÄ…ce minimalistyczny design, technologiÄ™ net-zero i szwajcarskÄ… precyzjÄ™.',
      configure: 'Konfiguruj',
      watch: 'Zobacz Film',
      precision: 'Precyzja',
      precisionVal: 'Tolerancja Â±1mm',
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
      titleLine1: 'InĹĽynieria',
      titleLine2: 'Ciszy.',
      desc: 'Oddzielamy przestrzeĹ„ ĹĽyciowÄ… od chaosu Ĺ›wiata zewnÄ™trznego, tworzÄ…c hermetycznÄ… barierÄ™ spokoju dziÄ™ki zaawansowanym materiaĹ‚om.',
      col1Title: 'Precyzja',
      col1Desc: 'Automatyzacja produkcji pozwala na tolerancje niemoĹĽliwe w tradycyjnym budownictwie (Â±1mm).',
      col2Title: 'TrwaĹ‚oĹ›Ä‡',
      col2Desc: 'Struktury monocoque inspirowane lotnictwem zapewniajÄ… dĹ‚ugowiecznoĹ›Ä‡ i odpornoĹ›Ä‡ sejsmicznÄ….',
      col3Title: 'Inteligencja',
      col3Desc: 'Zintegrowane sieci neuronowe zarzÄ…dzajÄ… klimatem, energiÄ… i bezpieczeĹ„stwem.'
    },
    story: {
      chapter1: {
        title: "Architektura Ciszy",
        text: "Prawdziwy luksus to brak haĹ‚asu. Nasze Ĺ›ciany nie tylko blokujÄ… dĹşwiÄ™k, ale go absorbujÄ…."
      },
      chapter2: {
        title: "Radykalna PrzejrzystoĹ›Ä‡",
        text: "SzkĹ‚o od podĹ‚ogi do sufitu, ktĂłre izoluje jak lita Ĺ›ciana. Zacieramy granicÄ™ miÄ™dzy sanktuarium a naturÄ…."
      },
      chapter3: {
        title: "Kontrola Atmosfery",
        text: "Szpitalna filtracja powietrza i oĹ›wietlenie cyrkadialne adaptujÄ…ce siÄ™ do Twojej biologii."
      }
    },
    models: {
      badge: 'Kolekcja 2025',
      title: 'Flota',
      titleBold: 'ModuĹ‚owa.',
      available: 'DostÄ™pne 2025',
      configure: 'Konfiguruj',
      area: 'Powierzchnia',
      efficiency: 'WydajnoĹ›Ä‡',
      acoustics: 'Akustyka',
      mobileClass: 'Klasa',
      mobileSilence: 'Cisza',
      details: {
        CORE: {
          tagline: "Esencja Luksusu",
          highlight: "Czysta Forma.",
          features: ["RdzeĹ„ Smart-Ready", "PĹ‚aszcz Termiczny A++", "WykoĹ„czenie Sosnowe"]
        },
        PRIME: {
          tagline: "WyĹĽszy Standard",
          highlight: "Systemy Zaawansowane.",
          features: ["Integracja R-OS", "Opcje Kamiennego Forniru", "WygĹ‚uszenie Studio"]
        },
        ZENITH: {
          tagline: "Absolutne Bespoke",
          highlight: "Bez KompromisĂłw.",
          features: ["PeĹ‚na Autonomia", "Rama Monocoque", "MateriaĹ‚y Bespoke"]
        }
      }
    },
    acousticDemo: {
      title: "Izolacja DĹşwiÄ™ku",
      desc: "DoĹ›wiadcz rĂłĹĽnicy naszych odsprzÄ™glonych systemĂłw Ĺ›ciennych. PrzeĹ‚Ä…cz, aby usĹ‚yszeÄ‡ standard ciszy West Home.",
      outside: "Miejski Chaos (80dB)",
      inside: "Sanktuarium West Home (35dB)"
    },
    globalRoam: {
      badge: "WdroĹĽenie",
      title: "Globalna ZdolnoĹ›Ä‡.",
      desc: "Zaprojektowane do wdroĹĽenia wszÄ™dzie. Od alpejskich szczytĂłw po wybrzeĹĽa, West Home adaptuje siÄ™ do otoczenia.",
      locations: [
        { title: "Alpy", desc: "Retencja ciepĹ‚a w ekstremalnym zimnie." },
        { title: "WybrzeĹĽe", desc: "OdpornoĹ›Ä‡ na korozjÄ™ i obciÄ…ĹĽenie wiatrem." },
        { title: "Las", desc: "PĹ‚ynna integracja z organicznÄ… topografiÄ…." }
      ],
      coverageTitle: "Regiony Budowy",
      coverageDesc: "Nasz system inĹĽynieryjny umoĹĽliwia budowÄ™ domĂłw West Home na przygotowanych dziaĹ‚kach w gĹ‚Ăłwnych regionach Ĺ›wiata.",
      regions: ["Ameryka PĂłĹ‚nocna", "Europa", "Bliski WschĂłd", "Azja i Pacyfik"]
    },
    materials: {
      badge: 'MaterialnoĹ›Ä‡',
      title: 'Inteligencja',
      titleBold: 'MateriaĹ‚owa.',
      desc: 'UĹĽywamy materiaĹ‚Ăłw, ktĂłre starzejÄ… siÄ™ z godnoĹ›ciÄ…. Drewno CLT, anodowane aluminium i szlifowany kamieĹ„.',
      items: {
        structural: {
          title: 'Nordic CLT',
          subtitle: 'RdzeĹ„ Konstrukcyjny',
          desc: 'Drewno CLT o wysokiej gÄ™stoĹ›ci z zarzÄ…dzanych lasĂłw pĂłĹ‚nocnych. Oferuje doskonaĹ‚Ä… masÄ™ termicznÄ… i ujemny Ĺ›lad wÄ™glowy.',
          specs: [
            { label: 'Klasa', value: 'C24 PEFC' },
            { label: 'NoĹ›noĹ›Ä‡', value: '450kg/mÂł' },
            { label: 'WÄ™giel', value: 'Ujemny' },
            { label: 'Szlif', value: 'GĹ‚adki' }
          ]
        },
        facade: {
          title: 'SzkĹ‚o Vision',
          subtitle: 'Czysta PrzejrzystoĹ›Ä‡',
          desc: 'PotrĂłjne pakiety szybowe wypeĹ‚nione argonem z powĹ‚okÄ… niskoemisyjnÄ…. Maksymalizacja Ĺ›wiatĹ‚a przy standardach Passive House.',
          specs: [
            { label: 'Ug', value: '0.5 W/mÂ˛K' },
            { label: 'ĹšwiatĹ‚o', value: '72% VT' },
            { label: 'Bezpiecz.', value: 'Hartowane' },
            { label: 'Gaz', value: 'Argon' }
          ]
        },
        tactile: {
          title: 'KamieĹ„ Szlifowany',
          subtitle: 'Masa Termiczna',
          desc: 'WykoĹ„czenia z kamienia naturalnego szlifowane na mat. Zintegrowane z podĹ‚ogami i Ĺ›cianami dla trwaĹ‚oĹ›ci i akumulacji ciepĹ‚a.',
          specs: [
            { label: 'ĹąrĂłdĹ‚o', value: 'EU Quota' },
            { label: 'Dotyk', value: 'Matowy Jedwab' },
            { label: 'GÄ™stoĹ›Ä‡', value: '2.6g/cmÂł' },
            { label: 'LZO', value: 'Zero VOC' }
          ]
        },
        detail: {
          title: 'Stop Anodowany',
          subtitle: 'Precyzyjny Detal',
          desc: 'Aluminium lotnicze uĹĽywane w ramach i okuciach. Zaprojektowane z milimetrowÄ… precyzjÄ… i wykoĹ„czone dla ekstremalnej trwaĹ‚oĹ›ci.',
          specs: [
            { label: 'Klasa', value: '6061-T6' },
            { label: 'Toler.', value: '0.1mm' },
            { label: 'Recykling', value: '100% Rec.' },
            { label: 'PowĹ‚oka', value: '25ÎĽm Anod.' }
          ]
        }
      }
    },
    process: {
      badge: 'Cykl Ĺ»ycia',
      title: 'Liniowy. Przewidywalny.',
      titleItalic: 'InĹĽynieryjny.',
      desc: 'Proces produkcji inspirowany przemysĹ‚em motoryzacyjnym. Zero opĂłĹşnieĹ„ pogodowych, staĹ‚e koszty.'
    },
    cta: {
      badge: 'Sloty produkcyjne 2025 otwarte',
      title: 'Zaprojektowany dla',
      titleBold: 'Sanktuarium.',
      desc: 'Zarezerwuj swĂłj slot produkcyjny na rok modelowy 2025. Ograniczona dostÄ™pnoĹ›Ä‡ konfiguracji Zenith.',
      btn: 'Konfiguruj',
      download: 'Pobierz Katalog'
    },
    features: {
      badge: 'Specyfikacja Techniczna',
      title: 'MoĹĽliwoĹ›ci Systemu',
      c1Mono: '01 - Konstrukcja',
      c1Title: 'Mass Timber CLT',
      c1Desc: 'Ujemny wÄ™glowo rdzeĹ„ konstrukcyjny zapewniajÄ…cy ogromnÄ… wytrzymaĹ‚oĹ›Ä‡.',
      c2Mono: '02 - Inteligencja',
      c2Title: 'R-OS Core',
      c2Neural: 'SieÄ‡ Neuronowa',
      c2Uptime: '99.9% Czasu Pracy',
      c3Mono: '03 - Akustyka',
      c3Label: 'OdsprzÄ™glona',
      c4Mono: '04 - WydajnoĹ›Ä‡',
      c4Label: 'Net Zero',
      c5Title: 'Ochrona Perymetru',
      c5Secure: 'Zabezpieczony'
    },
    identity: {
      badge: 'ToĹĽsamoĹ›Ä‡',
      title: 'Zdefiniowane przez',
      titleBold: 'FizykÄ™.',
      desc: 'Nie projektujemy tylko domĂłw; inĹĽynierujemy Ĺ›rodowiska oparte na pierwszych zasadach.',
      card1Title: 'Precyzja',
      card1Desc: 'Tolerancje produkcyjne +/- 1mm zapewniajÄ… szczelnoĹ›Ä‡ i wydajnoĹ›Ä‡.',
      card2Title: 'TrwaĹ‚oĹ›Ä‡',
      card2Desc: 'MateriaĹ‚y dobrane na 100-letni cykl ĹĽycia z minimalnÄ… konserwacjÄ….',
      card3Title: 'Inteligencja',
      card3Desc: 'Systemy pasywne, ktĂłre pracujÄ… dla Ciebie, a nie przeciwko Tobie.'
    },
    gallery: {
      badge: 'Detal',
      title: 'Interfejs MateriaĹ‚owy',
      caption1: 'Wolumen WnÄ™trza / R-Sequence',
      caption2: 'Anodowany Interfejs / Detal'
    },
    bespoke: {
      badge: 'Program Bespoke',
      title: 'Poza',
      titleBold: 'Standard.',
      desc: 'Dla klientĂłw wymagajÄ…cych unikalnych rozwiÄ…zaĹ„, nasz zespĂłĹ‚ inĹĽynierĂłw oferuje peĹ‚ne usĹ‚ugi bespoke.',
      step1: 'Konsultacja',
      step2: 'Cyfrowy BliĹşniak',
      step3: 'Fabrykacja',
      cta: 'Zapytaj o Bespoke'
    },
    footer: {
      address: 'ZĹ‚ota 44\n00-120 Warszawa, Polska',
      fleet: 'Kolekcja',
      company: 'Firma',
      connect: 'Kontakt',
      philosophy: 'Filozofia',
      technology: 'Technologia',
      careers: 'Kariera',
      press: 'Prasa',
      rights: 'Â© 2025 West Home Systems.',
      privacy: 'PrywatnoĹ›Ä‡',
      terms: 'Regulamin',
      cookies: 'Cookies',
      tagline: 'Zaprojektowane dla Ciszy'
    },
    dealer: {
      title: 'ZnajdĹş Dealera',
      subtitle: 'Autoryzowani Sprzedawcy',
      searchPlaceholder: 'Szukaj miasta, nazwy lub kodu...',
      found: 'znalezionych lokalizacji',
      notFound: 'Nie znaleziono dealerĂłw dla',
      hours: 'Godziny Otwarcia',
      contact: 'Kontakt',
      mapBtn: 'Mapa',
      callBtn: 'ZadzwoĹ„'
    }
  },
  ES: {
    nav: {
      philosophy: 'FilosofĂ­a',
      models: 'Modelos',
      technology: 'TecnologĂ­a',
      process: 'Proceso',
      findDealer: 'Buscar Distribuidor',
      menu: 'MenĂş',
      close: 'Cerrar',
      navigation: 'NavegaciĂłn',
      headquarters: 'Sede Central',
      social: 'Social',
      manifesto: 'Manifiesto',
      fleet: 'ColecciĂłn',
      systems: 'Sistemas',
      lifecycle: 'Ciclo de Vida'
    },
    hero: {
      status: 'Bespoke Architecture',
      titleLine1: 'Automotive',
      titleLine2: 'Architecture.',
      subtitle: 'Casas modulares de grado automotriz que combinan diseĂ±o minimalista, tecnologĂ­a net-zero y precisiĂłn suiza.',
      configure: 'Configurar',
      watch: 'Ver PelĂ­cula',
      precision: 'PrecisiĂłn',
      precisionVal: 'Tolerancia Â±1mm',
      acoustics: 'AcĂşstica',
      acousticsVal: 'Grado de Estudio ISO',
      thermal: 'TĂ©rmica',
      thermalVal: 'Certificado Pasivo'
    },
    stats: {
      energy: 'ClasificaciĂłn EnergĂ©tica',
      acoustic: 'ReducciĂłn AcĂşstica',
      production: 'Tiempo de ProducciĂłn',
      warranty: 'GarantĂ­a Estructural',
      weeks: 'sem',
      years: 'aĂ±os'
    },
    philosophy: {
      badge: 'Nuestra FilosofĂ­a',
      titleLine1: 'IngenierĂ­a',
      titleLine2: 'Silencio.',
      desc: 'Desacoplamos el espacio vital del caos exterior, creando un sello hermĂ©tico de tranquilidad mediante materiales avanzados.',
      col1Title: 'PrecisiĂłn',
      col1Desc: 'La fabricaciĂłn automatizada permite tolerancias imposibles en la construcciĂłn tradicional (Â±1mm).',
      col2Title: 'Durabilidad',
      col2Desc: 'Estructuras monocasco inspiradas en el diseĂ±o aeroespacial aseguran longevidad generacional.',
      col3Title: 'Inteligencia',
      col3Desc: 'Redes neuronales integradas gestionan el clima, la energĂ­a y la seguridad.'
    },
    story: {
      chapter1: {
        title: "Arquitectura del Silencio",
        text: "El verdadero lujo es la ausencia de ruido. Nuestras paredes no solo bloquean el sonido, lo absorben."
      },
      chapter2: {
        title: "Transparencia Radical",
        text: "Vidrio de piso a techo que aĂ­sla como una pared sĂłlida. Difumina la lĂ­nea entre santuario y naturaleza."
      },
      chapter3: {
        title: "Control AtmosfĂ©rico",
        text: "FiltraciĂłn de aire de grado hospitalario e iluminaciĂłn circadiana que se adapta a tu biologĂ­a."
      }
    },
    models: {
      badge: 'ColecciĂłn 2025',
      title: 'Flota',
      titleBold: 'Modular.',
      available: 'Disponible 2025',
      configure: 'Configurar',
      area: 'Ărea',
      efficiency: 'Eficiencia',
      acoustics: 'AcĂşstica',
      mobileClass: 'Clase',
      mobileSilence: 'Silencio',
      details: {
        CORE: {
          tagline: "Lujo Esencial",
          highlight: "Forma Pura.",
          features: ["NĂşcleo Smart-Ready", "Envolvente TĂ©rmica A++", "Acabado de Pino TĂˇctil"]
        },
        PRIME: {
          tagline: "Vida Elevada",
          highlight: "Sistemas Avanzados.",
          features: ["IntegraciĂłn R-OS", "Opciones de Chapa de Piedra", "InsonorizaciĂłn de Estudio"]
        },
        ZENITH: {
          tagline: "Absoluto Bespoke",
          highlight: "Sin Compromisos.",
          features: ["AutonomĂ­a Total", "Bastidor Monocasco", "Materialidad a Medida"]
        }
      }
    },
    acousticDemo: {
      title: "Aislamiento SĂłnico",
      desc: "Experimenta la diferencia de nuestros sistemas de paredes desacopladas.",
      outside: "Caos Urbano (80dB)",
      inside: "Santuario West Home (35dB)"
    },
    globalRoam: {
      badge: "Despliegue",
      title: "Capacidad Global.",
      desc: "DiseĂ±ado para desplegarse en cualquier lugar. Desde picos alpinos hasta acantilados costeros.",
      locations: [
        { title: "Alpino", desc: "RetenciĂłn tĂ©rmica en frĂ­o extremo." },
        { title: "Costero", desc: "Resistencia a la corrosiĂłn y carga de viento." },
        { title: "Bosque", desc: "IntegraciĂłn perfecta con topografĂ­a orgĂˇnica." }
      ],
      coverageTitle: "Regiones de ConstrucciĂłn",
      coverageDesc: "Nuestro sistema de ingenierĂ­a permite construir hogares West Home en sitios preparados de las principales regiones del mundo.",
      regions: ["NorteamĂ©rica", "Europa", "Oriente Medio", "Asia-PacĂ­fico"]
    },
    materials: {
      badge: 'Materialidad',
      title: 'Inteligencia',
      titleBold: 'Material.',
      desc: 'Usamos materiales que envejecen con gracia. Madera contralaminada, aluminio anodizado y piedra pulida.',
      items: {
        structural: {
          title: 'CLT NĂłrdico',
          subtitle: 'NĂşcleo Estructural',
          desc: 'Madera contralaminada de alta densidad procedente de bosques nĂłrdicos gestionados. Ofrece una masa tĂ©rmica superior.',
          specs: [
            { label: 'Grado', value: 'C24 PEFC' },
            { label: 'Carga', value: '450kg/mÂł' },
            { label: 'Carbono', value: 'Negativo' },
            { label: 'Acabado', value: 'Pulido' }
          ]
        },
        facade: {
          title: 'Vidrio Vision',
          subtitle: 'Transparencia Pura',
          desc: 'Unidades de triple acristalamiento rellenas de argĂłn con revestimiento de baja emisividad para estĂˇndares Passive House.',
          specs: [
            { label: 'Ug', value: '0.5 W/mÂ˛K' },
            { label: 'Luz', value: '72% VT' },
            { label: 'Segurid.', value: 'Templado' },
            { label: 'Gas', value: 'ArgĂłn' }
          ]
        },
        tactile: {
          title: 'Piedra Pulida',
          subtitle: 'Masa TĂ©rmica',
          desc: 'Acabados de piedra natural pulidos para un tacto mate y sedoso. Integrados para durabilidad y almacenamiento tĂ©rmico.',
          specs: [
            { label: 'Origen', value: 'EU Quota' },
            { label: 'Tacto', value: 'Mate Seda' },
            { label: 'Densidad', value: '2.6g/cmÂł' },
            { label: 'COV', value: 'Cero VOC' }
          ]
        },
        detail: {
          title: 'AleaciĂłn Anodizada',
          subtitle: 'Detalle de PrecisiĂłn',
          desc: 'Aluminio de grado aeronĂˇutico utilizado en marcos y herrajes. DiseĂ±ado con precisiĂłn milimĂ©trica.',
          specs: [
            { label: 'Grado', value: '6061-T6' },
            { label: 'Toler.', value: '0.1mm' },
            { label: 'Ciclo', value: '100% Rec.' },
            { label: 'Recub.', value: '25ÎĽm Anod.' }
          ]
        }
      }
    },
    process: {
      badge: 'Ciclo de Vida',
      title: 'Lineal. Predecible.',
      titleItalic: 'IngenierĂ­a.',
      desc: 'Proceso de fabricaciĂłn inspirado en la industria automotriz. Cero retrasos, costos fijos.'
    },
    cta: {
      badge: 'Espacios de producciĂłn 2025 abiertos',
      title: 'DiseĂ±ado para',
      titleBold: 'Santuario.',
      desc: 'Asegura tu espacio de producciĂłn para el aĂ±o modelo 2025.',
      btn: 'Configurar',
      download: 'Descargar CatĂˇlogo'
    },
    features: {
      badge: 'Especificaciones TĂ©cnicas',
      title: 'Capacidades del Sistema',
      c1Mono: '01 - Estructura',
      c1Title: 'Madera Masiva CLT',
      c1Desc: 'NĂşcleo estructural carbono negativo que proporciona inmensa fuerza.',
      c2Mono: '02 - Inteligencia',
      c2Title: 'NĂşcleo Integrado',
      c2Neural: 'Red Neuronal',
      c2Uptime: '99.9% Tiempo de Actividad',
      c3Mono: '03 - AcĂşstica',
      c3Label: 'Desacoplado',
      c4Mono: '04 - Eficiencia',
      c4Label: 'Neto Cero',
      c5Title: 'Defensa Perimetral',
      c5Secure: 'Seguro'
    },
    identity: {
      badge: 'Identidad',
      title: 'Definido por',
      titleBold: 'FĂ­sica.',
      desc: 'No solo diseĂ±amos casas; diseĂ±amos entornos basados en primeros principios.',
      card1Title: 'PrecisiĂłn',
      card1Desc: 'Tolerancias de fabricaciĂłn de +/- 1mm aseguran eficiencia hermĂ©tica.',
      card2Title: 'Durabilidad',
      card2Desc: 'Materiales elegidos para un ciclo de vida de 100 aĂ±os con mantenimiento mĂ­nimo.',
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
      title: 'MĂˇs AllĂˇ',
      titleBold: 'del EstĂˇndar.',
      desc: 'Para clientes que requieren adaptaciones Ăşnicas, nuestro equipo ofrece servicios completos a medida.',
      step1: 'Consulta',
      step2: 'Gemelo Digital',
      step3: 'FabricaciĂłn',
      cta: 'Consultar A Medida'
    },
    footer: {
      address: 'ZĹ‚ota 44\n00-120 Varsovia, Polonia',
      fleet: 'ColecciĂłn',
      company: 'CompaĂ±Ă­a',
      connect: 'Conectar',
      philosophy: 'FilosofĂ­a',
      technology: 'TecnologĂ­a',
      careers: 'Carreras',
      press: 'Prensa',
      rights: 'Â© 2025 West Home Systems.',
      privacy: 'Privacidad',
      terms: 'TĂ©rminos',
      cookies: 'Cookies',
      tagline: 'DiseĂ±ado para el Silencio'
    },
    dealer: {
      title: 'Buscar Distribuidor',
      subtitle: 'Minoristas Autorizados',
      searchPlaceholder: 'Buscar ciudad, nombre o cĂłdigo...',
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
