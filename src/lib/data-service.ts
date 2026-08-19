import { mockDestinations } from './mock-data/destinations';
import { mockTours } from './mock-data/tours';
import { mockReviews } from './mock-data/reviews';
import { mockInquiries } from './mock-data/inquiries';
import { Destination, Tour, Review, Inquiry, InquiryStatus, FilterState } from '@/types';
import { createClient } from './supabase/client';

let localInquiries: Inquiry[] = [...mockInquiries];

export async function getDestinations(): Promise<Destination[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from('destinations').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as Destination[];
      }
    }
  } catch {
    // Fallback to mock data
  }
  return mockDestinations;
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const destinations = await getDestinations();
  return destinations.find((d) => d.slug === slug) || null;
}

export async function getTours(filters?: Partial<FilterState>): Promise<Tour[]> {
  let tours: Tour[] = [];
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from('tours').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        tours = data as Tour[];
      }
    }
  } catch {
    // Fallback
  }

  if (tours.length === 0) {
    tours = [...mockTours];
  }

  if (!filters) return tours;

  return tours.filter((tour) => {
    // Region Filter
    if (filters.region && filters.region !== 'all') {
      const dest = mockDestinations.find((d) => d.id === tour.destination_id || d.name === tour.destination_name);
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

export async function getReviews(): Promise<Review[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from('reviews').select('*').eq('is_approved', true);
      if (!error && data && data.length > 0) {
        return data as Review[];
      }
    }
  } catch {
    // Fallback
  }
  return mockReviews;
}

export async function getInquiries(): Promise<Inquiry[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as Inquiry[];
      }
    }
  } catch {
    // Fallback
  }
  return localInquiries;
}

export async function createInquiry(payload: Omit<Inquiry, 'id' | 'created_at' | 'status'>): Promise<Inquiry> {
  try {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const result = await res.json();
      if (result.success && result.inquiry) {
        localInquiries = [result.inquiry, ...localInquiries];
        return result.inquiry as Inquiry;
      }
    }
  } catch (err) {
    console.error('Failed to submit via API route, falling back to local:', err);
  }

  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    ...payload,
    status: 'NEW',
    created_at: new Date().toISOString(),
  };

  localInquiries = [newInquiry, ...localInquiries];
  return newInquiry;
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  admin_notes?: string
): Promise<Inquiry | null> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ status, ...(admin_notes ? { admin_notes } : {}), updated_at: new Date().toISOString() })
        .eq('id', id)
        .select();
      if (!error && data && data.length > 0) {
        return data[0] as Inquiry;
      }
    }
  } catch {
    // Fallback
  }

  const index = localInquiries.findIndex((inq) => inq.id === id);
  if (index !== -1) {
    localInquiries[index] = {
      ...localInquiries[index],
      status,
      ...(admin_notes !== undefined ? { admin_notes } : {}),
    };
    return localInquiries[index];
  }
  return null;
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
