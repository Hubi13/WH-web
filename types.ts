import { LucideIcon } from "lucide-react";

export enum ProductLine {
  CORE = 'CORE',   // Line A
  PRIME = 'PRIME', // Line B
  ZENITH = 'ZENITH' // Line C
}

export interface HouseModel {
  id: string;
  name: string;
  line: ProductLine;
  description: string;
  descriptionPL: string;
  descriptionES: string;
  specs: {
    area: string;
    efficiency: string;
    acoustics: string;
  };
  image: string;
}

export interface LifecycleStep {
  id: number;
  title: string;
  titlePL: string;
  titleES: string;
  description: string;
  descriptionPL: string;
  descriptionES: string;
  icon: LucideIcon;
}

export interface FeaturePoint {
  title: string;
  value: string;
  unit?: string;
  description?: string;
}

export interface Dealer {
  id: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  openingHours: string;
  coordinates: { x: number; y: number }; // Percentage on the map
  badgeLabel?: string;
}

export interface MaterialElement {
  id: string;
  title: string;
  titlePL: string;
  titleES: string;
  subtitle: string;
  subtitlePL: string;
  subtitleES: string;
  desc: string;
  descPL: string;
  descES: string;
  specs: string[];
  specsPL: string[];
  specsES: string[];
  image: string;
}