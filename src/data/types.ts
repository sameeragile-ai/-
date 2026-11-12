export type GigType = 
  | 'Trailer Move' 
  | 'Point A→B' 
  | 'Drop & Hook' 
  | 'Yard Move' 
  | 'Hotshot' 
  | 'Team Run';

export type EquipmentType = 
  | 'Dry Van' 
  | 'Reefer' 
  | 'Flatbed' 
  | 'Step Deck' 
  | 'Power Only';

export type UrgencyTag = 'Urgent' | 'Today' | 'This Week';

export interface LocationPoint {
  city: string;
  state: string;
  facilityName?: string;
  zip?: string;
  lat?: number;
  lng?: number;
}

export interface CarrierSummary {
  id: string;
  name: string;
  dotNumber: string;
  mcNumber?: string;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  yearsActive: number;
  phone: string;
  email: string;
  location: string;
  logoInitials: string;
  gradient: [string, string];
}

export interface GigRequirements {
  cdlClass: 'CDL-A' | 'CDL-B' | 'Non-CDL';
  minExperienceYears: number;
  endorsements: string[];
  twicRequired?: boolean;
  medicalCardRequired?: boolean;
  cleanMVR?: boolean;
}

export interface Gig {
  id: string;
  title: string;
  company: CarrierSummary;
  gigType: GigType;
  equipment: EquipmentType;
  pickup: LocationPoint;
  dropoff: LocationPoint;
  miles: number;
  date: string;
  pickupTimeWindow: string;
  estDuration: string;
  pay: number;
  ratePerMile: number;
  requirements: GigRequirements;
  urgencyTag: UrgencyTag;
  image: string;
  description: string;
  settlementTerms: string;
  cargoWeight?: string;
  palletCount?: number;
  liveUnload?: boolean;
  postedAt: string;
}

export interface Carrier extends CarrierSummary {
  tagline: string;
  fleetSize: number;
  safetyScore: string;
  activeGigsCount: number;
  specializations: string[];
  about: string;
}

export interface Driver {
  id: string;
  name: string;
  avatarUrl: string;
  initials: string;
  cdlClass: 'CDL-A' | 'CDL-B';
  experienceYears: number;
  endorsements: string[];
  homeBase: string;
  rating: number;
  completedGigs: number;
  safetyScore: string;
  bio: string;
  verifiedCdl: boolean;
  availableNow: boolean;
}

export interface CartGig extends Gig {
  addedAt: number;
}

export interface FilterState {
  searchQuery: string;
  pickupCity: string;
  dropoffCity: string;
  gigTypes: GigType[];
  equipmentTypes: EquipmentType[];
  minPay: number;
  maxPay: number;
  maxDistance: number;
  cdlClass: string;
  endorsements: string[];
  urgency: string;
  verifiedOnly: boolean;
  sortBy: 'highest_pay' | 'rate_per_mile' | 'nearest_date' | 'newest' | 'shortest_distance';
}
