export type Region =
  | 'North India'
  | 'South India'
  | 'Himalayas & Ladakh'
  | 'Western India'
  | 'Central India';

export type ActivityLevel = 'Leisurely' | 'Moderate' | 'Active Adventure' | 'Challenging';

export type TravelStyle =
  | 'Heritage & Palaces'
  | 'Wildlife Safari'
  | 'Himalayan Exploration'
  | 'Spiritual & Wellness'
  | 'Culinary & Culture'
  | 'Coastal & Luxury Stays';

export type InquiryStatus = 'NEW' | 'CONTACTED' | 'PROPOSAL_SENT' | 'CONFIRMED' | 'ARCHIVED';

export type TransitType = 'none' | 'drive' | 'flight' | 'train' | 'boat' | 'safari';

export interface ItineraryTransit {
  type: TransitType;
  from_city?: string;
  to_city?: string;
  duration?: string;
  route_notes?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  description: string;
  stay?: string;
  meals?: string;
  highlights?: string[];
  image?: string;
  transit?: ItineraryTransit;
}

export interface Accommodation {
  name: string;
  location: string;
  tier: string;
  image: string;
  description?: string;
}

export interface DetailedHighlight {
  title: string;
  category: string;
  description: string;
  duration?: string;
}

export interface DestinationMonographChapter {
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  caption?: string;
}

export interface DestinationAccommodation {
  name: string;
  property_type: string;
  location: string;
  room_category: string;
  description: string;
  image: string;
  amenities: string[];
}

export interface DestinationSeason {
  season_name: string;
  months: string;
  climate_type: string;
  temperature: string;
  description: string;
  highlights: string[];
}

export interface CulinarySpecialty {
  name: string;
  description: string;
  origins?: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: Region;
  tagline: string;
  hero_image: string;
  description: string;
  best_time_to_visit: string;
  weather_info: string;
  ideal_duration: string;
  highlights: string[];
  gallery: string[];
  is_featured: boolean;
  overview_extended?: string;
  monograph_chapters?: DestinationMonographChapter[];
  signature_experiences?: DetailedHighlight[];
  luxury_accommodations?: DestinationAccommodation[];
  culinary_heritage?: {
    overview: string;
    signature_dishes: CulinarySpecialty[];
    private_dining_rituals?: string[];
  };
  seasonal_compass?: DestinationSeason[];
  insider_logistics?: {
    nearest_airports: string;
    private_aviation?: string;
    luxury_rail?: string;
    scenic_drives?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface Tour {
  id: string;
  slug: string;
  destination_id?: string;
  destination_name?: string;
  title: string;
  subtitle: string;
  duration_days: number;
  duration_nights: number;
  price_usd: number;
  price_inr: number;
  activity_level: ActivityLevel;
  travel_style: TravelStyle;
  group_type: string;
  is_featured: boolean;
  hero_image: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  accommodations: Accommodation[];
  created_at?: string;
}

export interface Inquiry {
  id: string;
  tour_id?: string;
  tour_title?: string;
  traveler_name: string;
  email: string;
  phone?: string;
  country: string;
  departure_date?: string;
  duration_days?: number;
  guests_count: number;
  group_type?: string;
  budget_tier?: string;
  travel_styles?: string[];
  preferred_contact?: string;
  special_requests?: string;
  status: InquiryStatus;
  admin_notes?: string;
  created_at: string;
}

export interface Review {
  id: string;
  tour_id?: string;
  tour_title?: string;
  traveler_name: string;
  traveler_country: string;
  traveler_avatar?: string;
  rating: number;
  title?: string;
  comment: string;
  trip_date?: string;
  is_approved: boolean;
  created_at?: string;
}

export interface FilterState {
  region: string;
  travelStyle: string;
  duration: string; // 'all' | 'short' (1-5) | 'medium' (6-10) | 'long' (11+)
  activityLevel: string;
  search: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc';
}

export * from './site-notes';
