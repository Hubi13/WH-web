import { ProductLine, HouseModel, LifecycleStep, Dealer, MaterialElement } from './types';
import { Scan, Layers, Ruler, FileCheck, Factory, Settings2, ShieldCheck, Zap, CircleDashed } from 'lucide-react';

export const HOUSE_MODELS: HouseModel[] = [
  {
    id: 'm-core',
    name: 'R-One',
    line: ProductLine.CORE,
    description: 'Technological minimalism. Pure form, high energy efficiency. No compromises on structural safety.',
    descriptionPL: 'Technologiczny minimalizm. Czysta forma, wysoka efektywność energetyczna. Bez kompromisów w bezpieczeństwie konstrukcji.',
    descriptionES: 'Minimalismo tecnológico. Forma pura, alta eficiencia energética. Sin compromisos en la seguridad estructural.',
    specs: {
      area: '120-160m²',
      efficiency: 'A++',
      acoustics: 'Standard+'
    },
    image: 'https://i.imgur.com/tojGEVa.jpeg'
  },
  {
    id: 'm-prime',
    name: 'R-Sequence',
    line: ProductLine.PRIME,
    description: 'Classical elegance with superior acoustic isolation and advanced installation standards.',
    descriptionPL: 'Klasyczna elegancja z doskonałą izolacją akustyczną i zaawansowanymi standardami instalacyjnymi.',
    descriptionES: 'Elegancia clásica con aislamiento acústico superior y estándares de instalación avanzados.',
    specs: {
      area: '180-240m²',
      efficiency: 'Passive Ready',
      acoustics: 'Studio Grade'
    },
    image: 'https://i.imgur.com/476tMHr.jpeg'
  },
  {
    id: 'm-zenith',
    name: 'R-Infinity',
    line: ProductLine.ZENITH,
    description: 'The Rolls-Royce effect. Technology operates in the background. Absolute precision and luxury materials.',
    descriptionPL: 'Efekt Rolls-Royce\'a. Technologia działa w tle. Absolutna precyzja i luksusowe materiały.',
    descriptionES: 'El efecto Rolls-Royce. La tecnología opera en segundo plano. Precisión absoluta y materiales de lujo.',
    specs: {
      area: '300m²+',
      efficiency: 'Net Zero',
      acoustics: 'Isolation Chamber'
    },
    image: 'https://i.imgur.com/iWyQPX1.jpeg'
  }
];

// Reduced to 4 steps for better grid alignment
export const LIFECYCLE_STEPS: LifecycleStep[] = [
  {
    id: 1,
    title: 'Analyze',
    titlePL: 'Analiza',
    titleES: 'Análisis',
    description: 'We map lifestyle patterns & data, not just aesthetic preferences.',
    descriptionPL: 'Mapujemy wzorce stylu życia i dane, a nie tylko preferencje estetyczne.',
    descriptionES: 'Mapeamos patrones de estilo de vida y datos, no solo preferencias estéticas.',
    icon: Scan
  },
  {
    id: 2,
    title: 'Configure',
    titlePL: 'Konfiguracja',
    titleES: 'Configuración',
    description: 'Selection within the Core, Prime, or Zenith technological class.',
    descriptionPL: 'Wybór w ramach klasy technologicznej Core, Prime lub Zenith.',
    descriptionES: 'Selección dentro de la clase tecnológica Core, Prime o Zenith.',
    icon: Settings2
  },
  {
    id: 3,
    title: 'Fabricate',
    titlePL: 'Produkcja',
    titleES: 'Fabricación',
    description: 'Manufacturing in a controlled lab environment. Zero weather delays.',
    descriptionPL: 'Produkcja w kontrolowanym środowisku laboratoryjnym. Zero opóźnień pogodowych.',
    descriptionES: 'Fabricación en entorno de laboratorio controlado. Cero retrasos climáticos.',
    icon: Factory
  },
  {
    id: 4,
    title: 'Calibrate',
    titlePL: 'Kalibracja',
    titleES: 'Calibración',
    description: 'Final on-site assembly and systems commissioning.',
    descriptionPL: 'Ostateczny montaż na miejscu i uruchomienie systemów.',
    descriptionES: 'Montaje final in situ y puesta en marcha de sistemas.',
    icon: CircleDashed
  }
];

export const MATERIAL_ELEMENTS: MaterialElement[] = [
  {
    id: 'structural',
    title: 'Nordic CLT',
    titlePL: 'Nordyckie CLT',
    titleES: 'CLT Nórdico',
    subtitle: 'Structural Core',
    subtitlePL: 'Rdzeń Konstrukcyjny',
    subtitleES: 'Núcleo Estructural',
    desc: 'Cross-laminated timber sourced from sustainable Scandinavian forests. Engineered for seismic stability and carbon capture.',
    descPL: 'Drewno klejone krzyżowo ze zrównoważonych lasów skandynawskich. Zaprojektowane dla stabilności sejsmicznej i wiązania węgla.',
    descES: 'Madera contralaminada de bosques escandinavos sostenibles. Diseñada para estabilidad sísmica y captura de carbono.',
    specs: ['C24 Grade', 'Carbon Negative', 'Precision Milled'],
    specsPL: ['Klasa C24', 'Węgiel Ujemny', 'Frezowanie Precyzyjne'],
    specsES: ['Grado C24', 'Carbono Negativo', 'Fresado de Precisión'],
    image: 'https://i.imgur.com/H4BsEqJ.jpeg'
  },
  {
    id: 'facade',
    title: 'Vision Glass',
    titlePL: 'Szkło Wizyjne',
    titleES: 'Vidrio Visión',
    subtitle: 'Thermal Shield',
    subtitlePL: 'Tarcza Termiczna',
    subtitleES: 'Escudo Térmico',
    desc: 'Triple-glazed architectural units with argon fill. Provides maximum transparency with Passive House standard insulation.',
    descPL: 'Trzyszybowe jednostki architektoniczne wypełnione argonem. Maksymalna przejrzystość przy izolacji standardu Passive House.',
    descES: 'Unidades arquitectónicas de triple acristalamiento con argón. Transparencia máxima con aislamiento estándar Passive House.',
    specs: ['Ug 0.5 W/m²K', 'Solar Control', 'Safety Tempered'],
    specsPL: ['Ug 0.5 W/m²K', 'Kontrola Solarna', 'Hartowane'],
    specsES: ['Ug 0.5 W/m²K', 'Control Solar', 'Templado de Seguridad'],
    image: 'https://i.imgur.com/fNQn8nP.jpeg'
  },
  {
    id: 'tactile',
    title: 'Honed Stone',
    titlePL: 'Szlifowany Kamień',
    titleES: 'Piedra Pulida',
    subtitle: 'Tactile Surface',
    subtitlePL: 'Powierzchnia Dotykowa',
    subtitleES: 'Superficie Táctil',
    desc: 'Natural stone finishes honed for a matte, warm touch. Used in high-traffic zones for durability and thermal mass.',
    descPL: 'Wykończenia z kamienia naturalnego szlifowane na mat. Używane w strefach ruchu dla trwałości i masy termicznej.',
    descES: 'Acabados de piedra natural pulidos mate. Usados en zonas de alto tráfico para durabilidad y masa térmica.',
    specs: ['Zero VOC', 'Thermal Mass', 'Hand Finished'],
    specsPL: ['Zero LZO', 'Masa Termiczna', 'Ręcznie Wykończone'],
    specsES: ['Cero COV', 'Masa Térmica', 'Acabado a Mano'],
    image: 'https://i.imgur.com/476tMHr.jpeg'
  },
  {
    id: 'detail',
    title: 'Anodized Alloy',
    titlePL: 'Anodowane Stop',
    titleES: 'Aleación Anodizada',
    subtitle: 'Precision Detail',
    subtitlePL: 'Precyzyjny Detal',
    subtitleES: 'Detalle de Precisión',
    desc: 'Aircraft-grade aluminum detailing for window frames and hardware. Weather-resistant and engineered to 0.1mm tolerance.',
    descPL: 'Lotnicze aluminium w detalach ram okiennych i okuć. Odporne na pogodę, tolerancja 0.1mm.',
    descES: 'Detalles de aluminio de grado aeronáutico para marcos y herrajes. Resistente a la intemperie, tolerancia de 0.1mm.',
    specs: ['Marine Grade', 'Recyclable', 'Scratch Resistant'],
    specsPL: ['Klasa Morska', 'Recykling', 'Odporne na Rysy'],
    specsES: ['Grado Marino', 'Reciclable', 'Resistente a Rayones'],
    image: 'https://i.imgur.com/7ou8tEP.jpeg'
  }
];

export const DEALERS: Dealer[] = [
  {
    id: 'd-warsaw',
    name: 'West Home Warsaw',
    address: 'Elektrownia Powiśle',
    city: 'Warsaw',
    zip: '00-375',
    country: 'Poland',
    phone: '+48 22 9876543',
    email: 'warsaw@r-home.systems',
    openingHours: 'Mon-Sat: 10:00 - 20:00',
    // Adjusted for Europe Map (LAEA Projection approx)
    coordinates: { x: 56.5, y: 48.0 }, 
    badgeLabel: 'Dealer - HQ'
  },
  {
    id: 'd-krakow',
    name: 'West Home Kraków',
    address: 'Pawia 5',
    city: 'Kraków',
    zip: '31-154',
    country: 'Poland',
    phone: '+48 12 3456789',
    email: 'krakow@r-home.systems',
    openingHours: 'Mon-Fri: 09:00 - 18:00',
    // Adjusted for Europe Map (LAEA Projection approx)
    coordinates: { x: 55.5, y: 52.0 },
    badgeLabel: 'Dealer'
  }
];