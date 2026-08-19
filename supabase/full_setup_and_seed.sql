-- =========================================================
-- ABC TRAVELS - COMPLETE SUPABASE SETUP & SEED DATA
-- Copy and paste this entire script into your Supabase SQL Editor and click 'Run'.
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

-- Public can read destinations, tours, and reviews
CREATE POLICY "Allow public read destinations" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Allow public read tours" ON public.tours FOR SELECT USING (true);
CREATE POLICY "Allow public read reviews" ON public.reviews FOR SELECT USING (true);

-- Public can submit new leads / inquiries
CREATE POLICY "Allow public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read own or all inquiries" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Allow update inquiries" ON public.inquiries FOR UPDATE USING (true);

-- =========================================================
-- SEED DATA: DESTINATIONS
-- =========================================================

INSERT INTO public.destinations (slug, name, region, tagline, hero_image, description, best_time_to_visit, weather_info, ideal_duration, highlights, gallery, is_featured)
VALUES
(
    'rajasthan',
    'Rajasthan',
    'North India',
    'Land of Maharajas, Desert Fortresses & Golden Opulence',
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80',
    'Immerse yourself in royal India. Sandstone forts, glistening marble lake palaces, and desert glamping under starry skies.',
    'October to March (Pleasant winter climate)',
    '20°C - 28°C Day / 10°C - 15°C Night',
    '7 to 12 Days',
    '["Sunset cruise on Lake Pichola", "Private City Palace courtyards", "Desert glamping under Thar skies", "Step-well dining"]'::jsonb,
    '["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1920&q=80"]'::jsonb,
    true
),
(
    'kerala',
    'Kerala & The Spice Coast',
    'South India',
    'God''s Own Country: Tranquil Backwaters, Tea Mist & Ayurvedic Sanctuary',
    'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80',
    'Glide down palm-fringed canals aboard private luxury houseboats, wake to misty tea hills, and rejuvenate with doctor-curated Ayurveda.',
    'September to April',
    '24°C - 30°C Tropical Breeze',
    '6 to 10 Days',
    '["Private luxury houseboat cruise in Alleppey", "Sensory spice plantation walks", "Doctor-curated Ayurvedic wellness", "Kathakali art performances"]'::jsonb,
    '["https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1920&q=80"]'::jsonb,
    true
),
(
    'ladakh',
    'Ladakh & High Himalayas',
    'Himalayas & Ladakh',
    'The Roof of the World: Glacial Valleys, Monasteries & Stargazing',
    'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&q=80',
    'A mythical high-altitude desert. Ancient Buddhist gompas perched on dramatic cliffs, azure high-altitude lakes, and heated geodesic glamping domes.',
    'May to September',
    '12°C - 22°C Day / 2°C - 8°C Mountain Night',
    '7 to 10 Days',
    '["Private blessings at Thiksey Monastery", "Cross Khardung La Pass (17,582 ft)", "Luxury glamping beside Pangong Tso Lake", "Telescope stargazing sessions"]'::jsonb,
    '["https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=80"]'::jsonb,
    true
)
ON CONFLICT (slug) DO NOTHING;

-- =========================================================
-- SEED DATA: TOURS
-- =========================================================

INSERT INTO public.tours (slug, destination_name, title, subtitle, duration_days, duration_nights, price_usd, price_inr, activity_level, travel_style, group_type, is_featured, hero_image, overview, highlights, inclusions, exclusions)
VALUES
(
    'golden-triangle-royal-palaces',
    'Rajasthan',
    'The Royal Odyssey: Golden Triangle & Palaces of Udaipur',
    'An opulent journey through Delhi, Agra, Jaipur & the Lake City of Udaipur in true Maharaja style.',
    9,
    8,
    3850.00,
    320000.00,
    'Leisurely',
    'Heritage & Palaces',
    'Private Bespoke Journey',
    true,
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80',
    'Step into the timeless grandeur of royal India. From the Mughal monuments of Delhi and the ethereal ivory marble of the Taj Mahal at dawn to Jaipur pink palaces and Udaipur floating marble sanctuaries.',
    '["VIP sunrise viewing of Taj Mahal", "Exclusive high-tea in private Jaipur royal quarters", "Champagne sunset cruise on Lake Pichola", "Oberoi Amarvilas & Taj Lake Palace stays"]'::jsonb,
    '["8 nights in premier 5-star palace hotels", "Daily champagne breakfasts & 3 bespoke gourmet dinners", "Private chauffeur Mercedes E-Class/BMW", "All internal domestic flights in premium class", "Expert licensed academic historians"]'::jsonb,
    '["International airfare", "Indian tourist visa", "Travel insurance"]'::jsonb
),
(
    'kerala-backwaters-ayurveda-sanctuary',
    'Kerala & The Spice Coast',
    'Kerala Sanctuary: Private Houseboats, Spice Hills & Ayurvedic Bliss',
    'Immerse your senses in emerald tea plantations, private backwater cruises, and restorative holistic wellness.',
    8,
    7,
    3200.00,
    265000.00,
    'Leisurely',
    'Spiritual & Wellness',
    'Private Wellness Journey',
    true,
    'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80',
    'Discover the serene pace of Southern India. Stroll colonial Fort Kochi, ascend misty Munnar tea hills, and cruise aboard private luxury houseboats.',
    '["2 nights aboard private luxury houseboat", "Doctor-prescribed daily Ayurvedic therapies", "Private Kathakali dance performance", "Single-estate tea tasting in Munnar"]'::jsonb,
    '["7 nights luxury retreats & private air-conditioned houseboat", "Private car & chauffeur throughout Kerala", "All meals on houseboat & wellness dining", "Full Ayurvedic regime"]'::jsonb,
    '["International flights", "Travel insurance"]'::jsonb
),
(
    'ladakh-high-himalayas-expedition',
    'Ladakh & High Himalayas',
    'Himalayan High Passes: Glacial Valleys, Monasteries & Luxury Glamping',
    'Venture into the mystical mountain desert of Ladakh, crossing the highest motorable roads on earth.',
    8,
    7,
    3450.00,
    285000.00,
    'Active Adventure',
    'Himalayan Exploration',
    'Private Expedition',
    true,
    'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&q=80',
    'An exhilarating high-comfort expedition across the Trans-Himalayan desert. Ancient monasteries, heated glamping domes, and turquoise Pangong Lake.',
    '["Morning blessing at Thiksey Gompa", "Crossing Khardung La Pass (17,582 ft) in 4x4 SUVs", "Heated luxury glamping at Hunder & Pangong", "Stargazing under Bortle Class 1 night skies"]'::jsonb,
    '["7 nights luxury hotels & heated glamping domes", "Private 4x4 Toyota Fortuner with Himalayan driver", "All expedition meals", "Inner Line & Wildlife permits"]'::jsonb,
    '["International airfare", "Thermal outerwear"]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Done!
