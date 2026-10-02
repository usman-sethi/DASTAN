export type DestinationId = 'swat' | 'kalam' | 'chitral' | 'hunza' | 'skardu';

export interface Destination {
  id: DestinationId;
  name: string;
  tagline: string;
  urduName: string;
  region: string;
  province: string;
  description: string;
  heroImage: string;
  rating: number;
  reviewsCount: number;
  verifiedProvidersCount: number;
  experiencesCount: number;
  startingPricePKR: number;
  bestSeason: string;
  altitude: string;
  roadStatus: 'open' | 'advisory' | 'restricted';
  roadNote: string;
  weatherSummary: {
    tempC: number;
    condition: string;
    icon: string;
  };
  highlights: string[];
  stays: {
    id: string;
    name: string;
    type: string;
    pricePerNight: number;
    rating: number;
    reviewsCount: number;
    verified: boolean;
    location: string;
    features: string[];
  }[];
  movementOptions: {
    id: string;
    type: string;
    providerName: string;
    vehicleModel: string;
    dailyRatePKR: number;
    rating: number;
    verified: boolean;
  }[];
  culturalCustoms: string[];
}

export interface Provider {
  id: string;
  name: string;
  role: string;
  destinationId: DestinationId;
  destinationName: string;
  avatarUrl: string;
  rating: number;
  tripsCount: number;
  yearsExperience: number;
  verifiedBadges: {
    identity: boolean;
    location: boolean;
    business: boolean;
    community: boolean;
  };
  languages: string[];
  bio: string;
  specialties: string[];
  dailyRatePKR: number;
  recentReview: {
    author: string;
    city: string;
    rating: number;
    text: string;
    date: string;
  };
}

export interface Experience {
  id: string;
  title: string;
  urduTitle: string;
  category: 'culinary' | 'nature' | 'heritage' | 'artisan' | 'community';
  categoryLabel: string;
  destinationId: DestinationId;
  destinationName: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  pricePKR: number;
  hostName: string;
  hostRole: string;
  hostAvatar: string;
  hostVerified: boolean;
  shortDesc: string;
  fullDesc: string;
  whatIsIncluded: string[];
  maxGroupSize: number;
  image: string;
  culturalInsight: string;
}

export interface LanguagePhrase {
  id: string;
  category: 'greetings' | 'hospitality' | 'food' | 'transport' | 'shopping' | 'emergency';
  categoryLabel: string;
  language: 'Pashto' | 'Khowar' | 'Urdu';
  phraseLocal: string;
  phraseScript: string;
  pronunciation: string;
  englishMeaning: string;
  urduMeaning: string;
  culturalTip: string;
  audioVoicePitch?: number;
}

export interface CultureTopic {
  id: string;
  title: string;
  urduSubtitle: string;
  category: string;
  summary: string;
  practicalAdvice: string[];
  culturalImportance: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  subtitle: string;
  morning: {
    time: string;
    activity: string;
    location: string;
  };
  afternoon: {
    time: string;
    activity: string;
    location: string;
  };
  evening: {
    time: string;
    activity: string;
    location: string;
  };
  culturalHighlight: string;
  recommendedLocalDish: string;
}

export interface TripPlanConfig {
  destinationId: DestinationId;
  days: number;
  travelerType: 'solo' | 'couple' | 'family' | 'friends';
  budgetTier: 'budget' | 'comfort' | 'luxury';
  interests: string[];
  customServices: {
    includeStay: boolean;
    includeDriver: boolean;
    includeGuide: boolean;
    includeExperiences: boolean;
  };
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  urduTitle: string;
  destination: Destination;
  days: ItineraryDay[];
  costBreakdown: {
    stay: number;
    transport: number;
    guide: number;
    experiences: number;
    dastanFee: number;
    total: number;
  };
  economicDistribution: {
    localProvidersPct: number;
    communityFundPct: number;
    dastanPlatformPct: number;
  };
}

export interface BookingRecord {
  id: string;
  createdAt: string;
  destinationName: string;
  destinationId: DestinationId;
  tripTitle: string;
  days: number;
  travelerType: string;
  travelerName: string;
  travelerEmail: string;
  travelerPhone: string;
  startDate: string;
  servicesIncluded: string[];
  costBreakdown: {
    stay: number;
    transport: number;
    guide: number;
    experiences: number;
    dastanFee: number;
    total: number;
  };
  status: 'confirmed' | 'planning';
  progressPercentage: number;
  assignedGuide?: string;
  assignedDriver?: string;
  assignedStay?: string;
}

export interface HostApplication {
  fullName: string;
  phone: string;
  cityRegion: string;
  serviceType: string;
  languages: string;
  experienceYears: number;
  storyDescription: string;
  pricingEstimate: string;
  verificationAgreed: boolean;
}
