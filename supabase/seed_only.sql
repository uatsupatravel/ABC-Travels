-- =========================================================
-- ABC TRAVELS - ROBUST SEED SCRIPT (DOLLAR-QUOTED)
-- =========================================================

-- 1. Ensure columns exist
ALTER TABLE public.tours ADD COLUMN IF NOT EXISTS destination_name VARCHAR(255);

-- 2. Insert Destinations First
INSERT INTO public.destinations (slug, name, region, tagline, hero_image, description, best_time_to_visit, weather_info, ideal_duration, highlights, gallery, is_featured)
VALUES
(
    'rajasthan',
    'Rajasthan',
    'North India',
    $$Land of Maharajas, Desert Fortresses & Golden Opulence$$,
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80',
    $$Immerse yourself in royal India. Sandstone forts, glistening marble lake palaces, and desert glamping under starry skies.$$,
    $$October to March (Pleasant winter climate)$$,
    $$20°C - 28°C Day / 10°C - 15°C Night$$,
    $$7 to 12 Days$$,
    $$["Sunset cruise on Lake Pichola", "Private City Palace courtyards", "Desert glamping under Thar skies", "Step-well dining"]$$::jsonb,
    $$["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1920&q=80"]$$::jsonb,
    true
),
(
    'kerala',
    'Kerala & The Spice Coast',
    'South India',
    $$God's Own Country: Tranquil Backwaters, Tea Mist & Ayurvedic Sanctuary$$,
    'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80',
    $$Glide down palm-fringed canals aboard private luxury houseboats, wake to misty tea hills, and rejuvenate with doctor-curated Ayurveda.$$,
    $$September to April$$,
    $$24°C - 30°C Tropical Breeze$$,
    $$6 to 10 Days$$,
    $$["Private luxury houseboat cruise in Alleppey", "Sensory spice plantation walks", "Doctor-curated Ayurvedic wellness", "Kathakali art performances"]$$::jsonb,
    $$["https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1920&q=80"]$$::jsonb,
    true
),
(
    'ladakh',
    'Ladakh & High Himalayas',
    'Himalayas & Ladakh',
    $$The Roof of the World: Glacial Valleys, Monasteries & Stargazing$$,
    'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&q=80',
    $$A mythical high-altitude desert. Ancient Buddhist gompas perched on dramatic cliffs, azure high-altitude lakes, and heated geodesic glamping domes.$$,
    $$May to September$$,
    $$12°C - 22°C Day / 2°C - 8°C Mountain Night$$,
    $$7 to 10 Days$$,
    $$["Private blessings at Thiksey Monastery", "Cross Khardung La Pass (17,582 ft)", "Luxury glamping beside Pangong Tso Lake", "Telescope stargazing sessions"]$$::jsonb,
    $$["https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=80"]$$::jsonb,
    true
),
(
    'varanasi',
    'Varanasi & Sacred Ganges',
    'North India',
    $$The Eternal Spiritual Heart of Ancient India$$,
    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1920&q=80',
    $$Experience the transcendent power of dawn boat rides along the sacred river ghats and evening Ganga Aarti fire rituals.$$,
    $$October to March$$,
    $$18°C - 26°C Pleasant$$,
    $$3 to 5 Days$$,
    $$["Sunrise wooden boat glide along ghats", "VIP seating for Ganga Aarti", "Private silk weavers atelier", "Sarnath exploration"]$$::jsonb,
    $$["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1920&q=80"]$$::jsonb,
    false
),
(
    'ranthambore',
    'Ranthambore & Royal Wilds',
    'Central India',
    $$Private Bengal Tiger Safaris in Ancient Jungle Ruins$$,
    'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1920&q=80',
    $$Exclusive 4x4 private safaris with elite naturalists, staying at ultra-luxurious safari tented camps.$$,
    $$October to May$$,
    $$20°C - 32°C Forest & Dry Deciduous$$,
    $$4 to 6 Days$$,
    $$["Private open-top safari jeeps", "Royal Bengal Tiger tracking", "Sunset cocktails at Ranthambore Fort", "Lantern bush dinners"]$$::jsonb,
    $$["https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1920&q=80"]$$::jsonb,
    true
),
(
    'goa',
    'Goa & The Portuguese Heritage Coast',
    'Western India',
    $$Colonial Mansions, Private Catamarans & Coastal Haute Cuisine$$,
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&q=80',
    $$Restored 18th-century baroque mansions in Latin Quarters, private yacht charters along the Arabian Sea, and coastal gastronomy.$$,
    $$November to April$$,
    $$26°C - 31°C Tropical Breeze$$,
    $$4 to 7 Days$$,
    $$["Private luxury catamaran sunset sail", "Fontainhas Latin Quarter walk", "Fine-dining seafood tasting", "Beachfront heritage estates"]$$::jsonb,
    $$["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80"]$$::jsonb,
    false
)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Tours linked to Destinations
INSERT INTO public.tours (slug, destination_name, title, subtitle, duration_days, duration_nights, price_usd, price_inr, activity_level, travel_style, group_type, is_featured, hero_image, overview, highlights, inclusions, exclusions)
VALUES
(
    'golden-triangle-royal-palaces',
    'Rajasthan',
    $$The Royal Odyssey: Golden Triangle & Palaces of Udaipur$$,
    $$An opulent journey through Delhi, Agra, Jaipur & the Lake City of Udaipur in true Maharaja style.$$,
    9,
    8,
    3850.00,
    320000.00,
    'Leisurely',
    'Heritage & Palaces',
    'Private Tailormade Journey',
    true,
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80',
    $$Step into the timeless grandeur of royal India. From the Mughal monuments of Delhi and the ethereal ivory marble of the Taj Mahal at dawn to Jaipur pink palaces and Udaipur floating marble sanctuaries.$$,
    $$["VIP sunrise viewing of Taj Mahal", "Exclusive high-tea in private Jaipur royal quarters", "Champagne sunset cruise on Lake Pichola", "Oberoi Amarvilas & Taj Lake Palace stays"]$$::jsonb,
    $$["8 nights in premier 5-star palace hotels", "Daily champagne breakfasts & 3 curated gourmet dinners", "Private chauffeur Mercedes E-Class/BMW", "All internal domestic flights in premium class", "Expert licensed academic historians"]$$::jsonb,
    $$["International airfare", "Indian tourist visa", "Travel insurance"]$$::jsonb
),
(
    'kerala-backwaters-ayurveda-sanctuary',
    'Kerala & The Spice Coast',
    $$Kerala Sanctuary: Private Houseboats, Spice Hills & Ayurvedic Bliss$$,
    $$Immerse your senses in emerald tea plantations, private backwater cruises, and restorative holistic wellness.$$,
    8,
    7,
    3200.00,
    265000.00,
    'Leisurely',
    'Spiritual & Wellness',
    'Private Wellness Journey',
    true,
    'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80',
    $$Discover the serene pace of Southern India. Stroll colonial Fort Kochi, ascend misty Munnar tea hills, and cruise aboard private luxury houseboats.$$,
    $$["2 nights aboard private luxury houseboat", "Doctor-prescribed daily Ayurvedic therapies", "Private Kathakali dance performance", "Single-estate tea tasting in Munnar"]$$::jsonb,
    $$["7 nights luxury retreats & private air-conditioned houseboat", "Private car & chauffeur throughout Kerala", "All meals on houseboat & wellness dining", "Full Ayurvedic regime"]$$::jsonb,
    $$["International flights", "Travel insurance"]$$::jsonb
),
(
    'ladakh-high-himalayas-expedition',
    'Ladakh & High Himalayas',
    $$Himalayan High Passes: Glacial Valleys, Monasteries & Luxury Glamping$$,
    $$Venture into the mystical mountain desert of Ladakh, crossing the highest motorable roads on earth.$$,
    8,
    7,
    3450.00,
    285000.00,
    'Active Adventure',
    'Himalayan Exploration',
    'Private Expedition',
    true,
    'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&q=80',
    $$An exhilarating high-comfort expedition across the Trans-Himalayan desert. Ancient monasteries, heated glamping domes, and turquoise Pangong Lake.$$,
    $$["Morning blessing at Thiksey Gompa", "Crossing Khardung La Pass (17,582 ft) in 4x4 SUVs", "Heated luxury glamping at Hunder & Pangong", "Stargazing under Bortle Class 1 night skies"]$$::jsonb,
    $$["7 nights luxury hotels & heated glamping domes", "Private 4x4 Toyota Fortuner with Himalayan driver", "All expedition meals", "Inner Line & Wildlife permits"]$$::jsonb,
    $$["International airfare", "Thermal outerwear"]$$::jsonb
),
(
    'royal-bengal-tiger-safari',
    'Ranthambore & Royal Wilds',
    $$The Sovereign Wild: Royal Bengal Tiger Safari & Jungle Lodges$$,
    $$Exclusive private game drives in Ranthambore with India's foremost naturalists.$$,
    7,
    6,
    3600.00,
    298000.00,
    'Moderate',
    'Wildlife Safari',
    'Private Safari Expedition',
    true,
    'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1920&q=80',
    $$Track the elusive Royal Bengal Tiger through the ancient ruins, watering holes, and deciduous jungles of India's premier national parks.$$,
    $$["6 private exclusive jeep safaris in core zones", "Stay at luxury tented camp with private butler", "Sunset bush dinners under the canopy", "10th-century Ranthambore Fort walk"]$$::jsonb,
    $$["6 nights in premier 5-star luxury tented villas", "6 private exclusive 4x4 safari game drives", "All meals, soft beverages & bush dining", "Conservation permits & private transfers"]$$::jsonb,
    $$["International airfare", "Gratuities", "Personal insurance"]$$::jsonb
),
(
    'spiritual-ganges-varanasi-odyssey',
    'Varanasi & Sacred Ganges',
    $$Ganges Illumination: Varanasi, Sarnath & The Golden Temple$$,
    $$A transformative spiritual and cultural pilgrimage through India's oldest sacred cities.$$,
    6,
    5,
    2450.00,
    205000.00,
    'Leisurely',
    'Spiritual & Wellness',
    'Private Cultural Tour',
    false,
    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1920&q=80',
    $$Immerse yourself in 3,000 years of living spirituality along the sacred River Ganges. Dawn wooden boats, evening Aarti fire ceremonies, and Sarnath.$$,
    $$["Private dawn and twilight wooden boat cruises", "VIP front-row seating for Ganga Aarti", "Guided meditation with Buddhist monk in Sarnath", "Stay at BrijRama Palace on the ghats"]$$::jsonb,
    $$["5 nights at BrijRama Palace (Ghat View Suite)", "All private boat excursions with historians", "Daily breakfast & curated dining", "VIP temple & Aarti arrangements"]$$::jsonb,
    $$["Airfare", "Discretionary tips"]$$::jsonb
),
(
    'coastal-goa-portuguese-villas',
    'Goa & The Portuguese Heritage Coast',
    $$Goan Grandeur: Private Catamarans, Latin Quarters & Heritage Stays$$,
    $$Experience the refined aristocratic side of Goa with private yachts, boutique villas, and haute cuisine.$$,
    6,
    5,
    2850.00,
    235000.00,
    'Leisurely',
    'Coastal & Luxury Stays',
    'Private Coastal Getaway',
    false,
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&q=80',
    $$Discover Goa beyond the ordinary. Restored 18th-century Portuguese estates, private catamaran sails, and 5-course Indo-Portuguese gastronomy.$$,
    $$["Private sunset catamaran charter with champagne", "Exclusive Fontainhas Latin Quarter walk", "5-course seafood tasting menu", "Private beach villas at Ahilya by the Sea"]$$::jsonb,
    $$["5 nights luxury seaside villa accommodation", "Private catamaran sunset charter", "Private air-conditioned car & chauffeur", "Curated heritage tours"]$$::jsonb,
    $$["Airfare", "Personal spa therapies"]$$::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- 4. Automatically link foreign keys (destination_id)
UPDATE public.tours t
SET destination_id = d.id
FROM public.destinations d
WHERE t.destination_name = d.name;
