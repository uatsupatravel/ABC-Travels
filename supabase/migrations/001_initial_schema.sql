-- =========================================================
-- ABC TRAVELS - SUPABASE POSTGRESQL INITIAL SCHEMA
-- =========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Destinations Table
CREATE TABLE IF NOT EXISTS public.destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    region VARCHAR(100) NOT NULL,
    tagline VARCHAR(255),
    hero_image TEXT NOT NULL,
    description TEXT NOT NULL,
    best_time_to_visit VARCHAR(255),
    weather_info VARCHAR(255),
    ideal_duration VARCHAR(100),
    highlights JSONB DEFAULT '[]'::jsonb,
    gallery JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tours / Packages Table
CREATE TABLE IF NOT EXISTS public.tours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
    destination_name VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(500),
    duration_days INT NOT NULL,
    duration_nights INT NOT NULL,
    price_usd NUMERIC(10, 2) NOT NULL,
    price_inr NUMERIC(12, 2) NOT NULL,
    activity_level VARCHAR(50) NOT NULL,
    travel_style VARCHAR(100) NOT NULL,
    group_type VARCHAR(100) DEFAULT 'Private Tailormade',
    is_featured BOOLEAN DEFAULT false,
    hero_image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    overview TEXT NOT NULL,
    highlights JSONB DEFAULT '[]'::jsonb,
    itinerary JSONB DEFAULT '[]'::jsonb,
    inclusions JSONB DEFAULT '[]'::jsonb,
    exclusions JSONB DEFAULT '[]'::jsonb,
    accommodations JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Inquiries / Leads Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tour_id UUID REFERENCES public.tours(id) ON DELETE SET NULL,
    tour_title VARCHAR(255),
    traveler_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    country VARCHAR(100) NOT NULL,
    departure_date DATE,
    duration_days INT,
    guests_count INT DEFAULT 2,
    budget_tier VARCHAR(100),
    travel_styles JSONB DEFAULT '[]'::jsonb,
    special_requests TEXT,
    status VARCHAR(50) DEFAULT 'NEW',
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Reviews / Testimonials Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tour_id UUID REFERENCES public.tours(id) ON DELETE SET NULL,
    tour_title VARCHAR(255),
    traveler_name VARCHAR(255) NOT NULL,
    traveler_country VARCHAR(100) NOT NULL,
    traveler_avatar TEXT,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT NOT NULL,
    trip_date VARCHAR(100),
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies
CREATE POLICY "Allow public read destinations" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Allow public read tours" ON public.tours FOR SELECT USING (true);
CREATE POLICY "Allow public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read own or all inquiries" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Allow update inquiries" ON public.inquiries FOR UPDATE USING (true);
