import { Destination, Tour, Review, Inquiry, InquiryStatus, FilterState } from '@/types';
import { createClient } from './supabase/client';
import { mockTours } from './mock-data/tours';
import { mockDestinations } from './mock-data/destinations';

export async function getDestinations(): Promise<Destination[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error || !data || data.length === 0) {
      return mockDestinations;
    }
    return data as Destination[];
  } catch (error) {
    console.error('Error in getDestinations:', error);
    return mockDestinations;
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const destinations = await getDestinations();
  return destinations.find((d) => d.slug === slug) || null;
}

export async function getTours(filters?: Partial<FilterState>): Promise<Tour[]> {
  let tours: Tour[] = [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error || !data || data.length === 0) {
      tours = mockTours;
    } else {
      // Hydrate with detailed mock itinerary if database record has empty itinerary
      tours = (data as Tour[]).map((t) => {
        const mock = mockTours.find((m) => m.slug === t.slug || m.id === t.id);
        return {
          ...t,
          gallery: t.gallery?.length ? t.gallery : (mock?.gallery || [t.hero_image]),
          itinerary: t.itinerary?.length ? t.itinerary : (mock?.itinerary || []),
          accommodations: t.accommodations?.length ? t.accommodations : (mock?.accommodations || []),
          highlights: t.highlights?.length ? t.highlights : (mock?.highlights || []),
          inclusions: t.inclusions?.length ? t.inclusions : (mock?.inclusions || []),
          exclusions: t.exclusions?.length ? t.exclusions : (mock?.exclusions || []),
        };
      });
    }
  } catch (error) {
    console.error('Error in getTours:', error);
    tours = mockTours;
  }

  if (!filters) return tours;

  // For region filter, we need the destinations to map tour.destination_id
  let destinations: Destination[] = [];
  if (filters.region && filters.region !== 'all') {
    destinations = await getDestinations();
  }

  return tours.filter((tour) => {
    // Region Filter
    if (filters.region && filters.region !== 'all') {
      const dest = destinations.find((d) => d.id === tour.destination_id || d.name === tour.destination_name);
      if (!dest || dest.region !== filters.region) {
        return false;
      }
    }

    // Travel Style Filter
    if (filters.travelStyle && filters.travelStyle !== 'all') {
      if (tour.travel_style !== filters.travelStyle) {
        return false;
      }
    }

    // Activity Level Filter
    if (filters.activityLevel && filters.activityLevel !== 'all') {
      if (tour.activity_level !== filters.activityLevel) {
        return false;
      }
    }

    // Duration Filter
    if (filters.duration && filters.duration !== 'all') {
      if (filters.duration === 'short' && tour.duration_days > 5) return false;
      if (filters.duration === 'medium' && (tour.duration_days < 6 || tour.duration_days > 9)) return false;
      if (filters.duration === 'long' && tour.duration_days < 10) return false;
    }

    // Search Query Filter
    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase();
      const matchTitle = tour.title.toLowerCase().includes(q);
      const matchSubtitle = tour.subtitle.toLowerCase().includes(q);
      const matchDest = tour.destination_name?.toLowerCase().includes(q) ?? false;
      const matchStyle = tour.travel_style.toLowerCase().includes(q);
      if (!matchTitle && !matchSubtitle && !matchDest && !matchStyle) {
        return false;
      }
    }

    return true;
  });
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const tours = await getTours();
  return tours.find((t) => t.slug === slug) || null;
}

export async function getFeaturedTours(): Promise<Tour[]> {
  const tours = await getTours();
  return tours.filter((t) => t.is_featured);
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    traveler_name: 'Eleanor & Sir Arthur Davies',
    traveler_country: 'London, United Kingdom',
    tour_title: 'The Royal Golden Triangle & Taj',
    rating: 5,
    title: 'An immaculate, aristocratic voyage across Rajasthan',
    comment: 'As first-time visitors from the UK, we were mindful of logistics, food standards, and transport safety. ABC Travels orchestrated two weeks of absolute perfection. From our private arrival greeting at New Delhi to the tranquil palace suites in Udaipur, every detail was white-glove. Our private chauffeur was remarkably courteous, and having 24/7 direct WhatsApp access to the New Delhi concierge gave us complete peace of mind.',
    trip_date: 'Autumn Departure',
    is_approved: true,
  },
  {
    id: 'rev-2',
    traveler_name: 'Dr. Marcus & Helen Vance',
    traveler_country: 'San Francisco, United States',
    tour_title: 'Royal Bengal Tiger Safari & Sanctuaries',
    rating: 5,
    title: 'Unrivaled wildlife access and master naturalists',
    comment: 'Tracking tigers in Ranthambore with ABC Travels’ veteran naturalist was an unforgettable privilege. The private open-top 4x4, sunrise park entries, and luxury tented camp were handled with immense precision. Even more impressive was the dining: every meal across our 10-day journey was exquisitely curated, sanitized, and authentic. Truly the benchmark for bespoke travel in India.',
    trip_date: 'Winter Departure',
    is_approved: true,
  },
  {
    id: 'rev-3',
    traveler_name: 'Jean-Pierre & Claire Laurent',
    traveler_country: 'Paris, France',
    tour_title: 'Kerala Backwaters & Ayurveda Sanctuary',
    rating: 5,
    title: 'Pure tranquility and authentic royal hospitality',
    comment: 'Gliding through the backwaters of Alleppey aboard a private thatched houseboat, followed by a week at a secluded heritage spice estate, was deeply restorative. The team eliminated every possible travel headache. Unhurried, dignified, and exceptionally organized. We are already planning our return to explore Ladakh with them.',
    trip_date: 'Winter Departure',
    is_approved: true,
  },
  {
    id: 'rev-4',
    traveler_name: 'Sophia & Christian Weber',
    traveler_country: 'Zurich, Switzerland',
    tour_title: 'Ladakh & High Himalayas Expedition',
    rating: 5,
    title: 'Exceptional safety, private comfort, and deep heritage',
    comment: 'Exploring high-altitude monasteries in Leh and the Nubra Valley requires serious logistical rigor. ABC Travels delivered beyond expectations—our luxury 4x4 was pristine, our mountain guide was an accredited scholar of Buddhist art, and our accommodations were stunning. You can trust them with your eyes closed.',
    trip_date: 'Summer Expedition',
    is_approved: true,
  },
];

export async function getReviews(): Promise<Review[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', true);
      
    if (error || !data || data.length === 0) {
      return DEFAULT_REVIEWS;
    }
    return data as Review[];
  } catch (error) {
    console.error('Error in getReviews, falling back to curated reviews:', error);
    return DEFAULT_REVIEWS;
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching inquiries:', error);
      return [];
    }
    return data as Inquiry[];
  } catch (error) {
    console.error('Error in getInquiries:', error);
    return [];
  }
}

export async function createInquiry(payload: Omit<Inquiry, 'id' | 'created_at' | 'status'>): Promise<Inquiry | null> {
  try {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const result = await res.json();
      if (result.success && result.inquiry) {
        return result.inquiry as Inquiry;
      }
    }
    
    console.error('Failed to create inquiry via API route');
    return null;
  } catch (err) {
    console.error('Error creating inquiry:', err);
    return null;
  }
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  admin_notes?: string
): Promise<Inquiry | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status, ...(admin_notes ? { admin_notes } : {}), updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Error updating inquiry status:', error);
      return null;
    }
    
    if (data && data.length > 0) {
      return data[0] as Inquiry;
    }
    return null;
  } catch (error) {
    console.error('Error in updateInquiryStatus:', error);
    return null;
  }
}

export async function getAdminStats() {
  const inquiries = await getInquiries();
  const tours = await getTours();
  const destinations = await getDestinations();

  const newLeads = inquiries.filter((i) => i.status === 'NEW').length;
  const contacted = inquiries.filter((i) => i.status === 'CONTACTED').length;
  const proposals = inquiries.filter((i) => i.status === 'PROPOSAL_SENT').length;
  const confirmed = inquiries.filter((i) => i.status === 'CONFIRMED').length;

  return {
    totalInquiries: inquiries.length,
    newLeads,
    contacted,
    proposals,
    confirmed,
    totalTours: tours.length,
    totalDestinations: destinations.length,
    recentInquiries: inquiries.slice(0, 5),
  };
}
