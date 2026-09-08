import { Tour } from '@/types';

export const mockTours: Tour[] = [
  {
    "id": "tour-1",
    "slug": "golden-triangle-royal-palaces",
    "destination_id": "dest-1",
    "destination_name": "Rajasthan",
    "title": "The Royal Odyssey: Golden Triangle & Palaces of Udaipur",
    "subtitle": "An opulent journey through Delhi, Agra, Jaipur & the Lake City of Udaipur in true Maharaja style.",
    "duration_days": 10,
    "duration_nights": 9,
    "price_usd": 4200,
    "price_inr": 350000,
    "activity_level": "Leisurely",
    "travel_style": "Heritage & Palaces",
    "group_type": "100% Private Custom",
    "is_featured": true,
    "hero_image": "/images/tours/royal-odyssey/hero.jpg",
    "gallery": [
      "/images/tours/royal-odyssey/hero.jpg",
      "/images/tours/royal-odyssey/day1-delhi-imperial.jpg",
      "/images/tours/royal-odyssey/day2-delhi-monuments.jpg",
      "/images/tours/royal-odyssey/day2-agra-amarvilas.jpg",
      "/images/tours/royal-odyssey/day4-taj-sunrise.jpg",
      "/images/tours/royal-odyssey/day3-jaipur-rambagh.jpg",
      "/images/tours/royal-odyssey/day6-lake-palace-arrival.jpg",
      "/images/tours/royal-odyssey/day4-udaipur-pichola.jpg",
      "/images/tours/royal-odyssey/day8-ranakpur-temple.jpg",
      "/images/tours/royal-odyssey/day9-royal-dining.jpg"
    ],
    "overview": "Step into the timeless grandeur of royal India. From the majestic Mughal domes of Delhi and the ethereal ivory marble of the Taj Mahal at sunrise to the rose-pink courtyards of Jaipur and the fairytale floating palaces of Lake Pichola. Enjoy private chauffeur-driven luxury sedans, premier heritage palace suites, skip-the-line VIP entrances, and dinners hosted in private royal quarters.",
    "highlights": [
      "VIP sunrise private viewing of the Taj Mahal with expert architectural historian",
      "Exclusive high-tea in the private living quarters of the Jaipur Royal Family",
      "Champagne sunset cruise aboard a royal barge on Lake Pichola, Udaipur",
      "Stay in world-renowned palace hotels: The Oberoi Amarvilas & Taj Lake Palace",
      "Private culinary masterclass with a royal Rajasthani chef in a restored haveli"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in New Delhi – The Grand Welcome",
        "location": "Delhi",
        "description": "Arrive at Indira Gandhi International Airport where your private airport concierge greets you at the jet bridge and whisks you through VIP immigration. Transfer in a private luxury chauffeur-driven Mercedes to The Imperial, New Delhi. Unwind with an evening welcome cocktail in the historic 1911 Bar.",
        "stay": "The Imperial, New Delhi (Heritage Suite)",
        "meals": "Dinner Included",
        "highlights": [
          "VIP Airport Fast-Track",
          "Welcome Champagne"
        ],
        "image": "/images/tours/royal-odyssey/day1-delhi-imperial.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 2,
        "title": "Imperial Delhi: Monuments of Empires",
        "location": "Delhi",
        "description": "Explore Old Delhi’s labyrinthine bazaars via custom vintage rickshaw, visiting the Jama Masjid and the Red Fort. In the afternoon, transition to the grand tree-lined avenues of Lutyens’ New Delhi, visiting Humayun’s Tomb and Qutub Minar with your private historian guide.",
        "stay": "The Imperial, New Delhi",
        "meals": "Breakfast & Gourmet Lunch",
        "highlights": [
          "Private Rickshaw Spice Market Safari",
          "UNESCO Heritage Monuments"
        ],
        "image": "/images/tours/royal-odyssey/day2-delhi-monuments.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 3,
        "title": "Agra – The Monument to Eternal Love",
        "location": "Agra",
        "description": "Travel in comfort along the Yamuna Expressway to Agra. Check into The Oberoi Amarvilas, where every single room enjoys uninterrupted views of the Taj Mahal. In the late afternoon, witness the sunset over the Taj Mahal from the lush Mehtab Bagh gardens across the river.",
        "stay": "The Oberoi Amarvilas, Agra (Premier Room with Taj View)",
        "meals": "Breakfast & Dinner",
        "highlights": [
          "Uninterrupted Taj Mahal views from private balcony",
          "Sunset riverbank viewpoint"
        ],
        "image": "/images/tours/royal-odyssey/day2-agra-amarvilas.jpg",
        "transit": {
          "type": "drive",
          "duration": "3.5 hrs",
          "route_notes": "Via Yamuna Expressway"
        }
      },
      {
        "day": 4,
        "title": "Sunrise at Taj Mahal & Royal Drive to Jaipur",
        "location": "Agra to Jaipur",
        "description": "Enter the Taj Mahal at dawn before the crowds arrive. Watch the morning sun bathe the white marble in warm pink and amber hues. After a lavish breakfast, embark on the scenic drive to Jaipur, stopping at the stunning 16th-century ghost capital of Fatehpur Sikri and the 9th-century Chand Baori stepwell in Abhaneri.",
        "stay": "Rambagh Palace, Jaipur (Palace Room)",
        "meals": "Breakfast & Traditional Lunch",
        "highlights": [
          "Sunrise Taj Mahal Experience",
          "Fatehpur Sikri & Abhaneri Stepwell"
        ],
        "image": "/images/tours/royal-odyssey/day4-taj-sunrise.jpg",
        "transit": {
          "type": "drive",
          "duration": "4.5 hrs",
          "route_notes": "Via Fatehpur Sikri & Abhaneri"
        }
      },
      {
        "day": 5,
        "title": "Jaipur – The Pink City & Amber Fort in Royal Splendor",
        "location": "Jaipur",
        "description": "Ascend to the hilltop Amber Fort for an exclusive tour of the Sheesh Mahal (Mirror Palace). Return to the city to visit the Hawa Mahal (Palace of Winds), the royal Jantar Mantar astronomical observatory, and the opulent City Palace, culminating in an exclusive afternoon high-tea in the private royal apartments.",
        "stay": "Rambagh Palace, Jaipur",
        "meals": "Breakfast & High-Tea Dinner",
        "highlights": [
          "Amber Fort VIP Access",
          "Private Royal Family Quarters High-Tea"
        ],
        "image": "/images/tours/royal-odyssey/day3-jaipur-rambagh.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 6,
        "title": "Jaipur to Udaipur – The Venice of the East",
        "location": "Jaipur to Udaipur",
        "description": "Board a short luxury flight to Udaipur. Arrive at the iconic Taj Lake Palace, floating majestically in the middle of Lake Pichola. Check in via private royal boat transfer with rose-petal blessings. Relax by the marble pool as the sun dips behind the Aravalli Hills.",
        "stay": "Taj Lake Palace, Udaipur (Lake View Luxury Room)",
        "meals": "Breakfast & Candlelight Dinner",
        "highlights": [
          "Royal Boat Transfer",
          "Iconic Floating Palace Experience"
        ],
        "image": "/images/tours/royal-odyssey/day6-lake-palace-arrival.jpg",
        "transit": {
          "type": "flight",
          "duration": "1h 15m",
          "route_notes": "Direct Flight to Udaipur"
        }
      },
      {
        "day": 7,
        "title": "Udaipur – City Palace & Sunset Royal Barge Cruise",
        "location": "Udaipur",
        "description": "Tour the sprawling Udaipur City Palace complex overlooking the lake. Browse artisan miniature painting studios with a master craftsman. In the evening, step aboard a 150-year-old ceremonial royal barge for a private sunset champagne cruise past Jag Mandir Island.",
        "stay": "Taj Lake Palace, Udaipur",
        "meals": "Breakfast & Royal Barge Drinks",
        "highlights": [
          "Udaipur City Palace",
          "Private Royal Barge Sunset Cruise"
        ],
        "image": "/images/tours/royal-odyssey/day4-udaipur-pichola.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 8,
        "title": "Rural Udaipur & Ranakpur Marble Temples",
        "location": "Udaipur",
        "description": "Drive into the surrounding Aravalli countryside to visit the architectural masterpiece of Ranakpur Jain Temples, supported by 1,444 uniquely hand-carved marble pillars. Return for an exclusive lakeside gala dinner with live Sufi musicians.",
        "stay": "Taj Lake Palace, Udaipur",
        "meals": "Breakfast & Gala Farewell Dinner",
        "highlights": [
          "Ranakpur 1,444 Marble Pillars",
          "Lakeside Gala Dinner with Live Sufi Music"
        ],
        "image": "/images/tours/royal-odyssey/day8-ranakpur-temple.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 9,
        "title": "Udaipur to Delhi – Farewell Royal Reception",
        "location": "Udaipur to Delhi",
        "description": "Enjoy a leisurely morning breakfast on the palace lily pond terrace. Board your flight back to New Delhi. Check into The Imperial for a farewell tasting dinner celebrating the royal culinary heritage of India.",
        "stay": "The Imperial, New Delhi",
        "meals": "Breakfast & Farewell Dinner",
        "highlights": [
          "Palace Morning Leisure",
          "Farewell Royal Feast"
        ],
        "image": "/images/tours/royal-odyssey/day9-royal-dining.jpg",
        "transit": {
          "type": "flight",
          "duration": "1h 20m",
          "route_notes": "Domestic Flight to Delhi"
        }
      },
      {
        "day": 10,
        "title": "Delhi – VIP Departure",
        "location": "Delhi",
        "description": "Enjoy a final morning at your own pace before your private chauffeur transfers you to Indira Gandhi International Airport with VIP departure lounge assistance for your international flight home.",
        "stay": "Day Room Available",
        "meals": "Breakfast Included",
        "highlights": [
          "VIP Airport Chauffeur & Departure Assistance"
        ],
        "image": "/images/tours/royal-odyssey/day1-delhi-imperial.jpg",
        "transit": {
          "type": "none"
        }
      }
    ],
    "inclusions": [
      "9 nights in premier 5-star legend palace hotels (Oberoi Amarvilas, Rambagh Palace, Taj Lake Palace, The Imperial)",
      "All internal domestic flights in premium class (Jaipur to Udaipur, Udaipur to Delhi)",
      "Dedicated private chauffeur and luxury executive sedan (Toyota Innova Crysta / BMW) throughout",
      "Daily champagne breakfasts, 3 curated royal dining experiences & private high-tea at Jaipur City Palace",
      "All monument entrance tickets with VIP skip-the-line passes and battery-cart transfers at Taj Mahal",
      "Expert licensed academic historians and private English-speaking scholar guides in each city",
      "24/7 dedicated New Delhi concierge assistance with direct WhatsApp channel"
    ],
    "exclusions": [
      "International roundtrip airfare to/from New Delhi (DEL)",
      "Indian tourist visa fees",
      "Comprehensive international travel insurance",
      "Discretionary personal expenses, laundry, and guide gratuities"
    ],
    "accommodations": [
      {
        "name": "The Imperial",
        "location": "New Delhi",
        "tier": "Heritage Legend 5-Star",
        "image": "/images/tours/royal-odyssey/day1-delhi-imperial.jpg",
        "description": "1930s Art Deco masterpiece set in 8 acres of lush gardens in Lutyens’ Delhi."
      },
      {
        "name": "The Oberoi Amarvilas",
        "location": "Agra",
        "tier": "Ultra Luxury 5-Star",
        "image": "/images/tours/royal-odyssey/day2-agra-amarvilas.jpg",
        "description": "Every room enjoys uninterrupted direct views of the Taj Mahal just 600m away."
      },
      {
        "name": "Rambagh Palace",
        "location": "Jaipur",
        "tier": "Royal Palace 5-Star",
        "image": "/images/tours/royal-odyssey/day3-jaipur-rambagh.jpg",
        "description": "Former official residence of the Maharaja of Jaipur with 47 acres of manicured gardens."
      },
      {
        "name": "Taj Lake Palace",
        "location": "Udaipur",
        "tier": "Floating Palace 5-Star",
        "image": "/images/tours/royal-odyssey/day4-udaipur-pichola.jpg",
        "description": "18th-century white marble palace floating in the serene waters of Lake Pichola."
      }
    ]
  },
  {
    "id": "tour-2",
    "slug": "kerala-backwaters-ayurveda-sanctuary",
    "destination_id": "dest-2",
    "destination_name": "Kerala & The Spice Coast",
    "title": "Kerala Sanctuary: Private Houseboats, Spice Hills & Ayurvedic Bliss",
    "subtitle": "Immerse your senses in emerald tea plantations, private backwater cruises, and restorative holistic wellness.",
    "duration_days": 8,
    "duration_nights": 7,
    "price_usd": 3450,
    "price_inr": 288000,
    "activity_level": "Leisurely",
    "travel_style": "Spiritual & Wellness",
    "group_type": "100% Private Custom",
    "is_featured": true,
    "hero_image": "/images/tours/kerala-sanctuary/hero.jpg",
    "gallery": [
      "/images/tours/kerala-sanctuary/hero.jpg",
      "/images/tours/kerala-sanctuary/day1-kochi-heritage.jpg",
      "/images/tours/kerala-sanctuary/day2-munnar-plantations.jpg",
      "/images/tours/kerala-sanctuary/day3-alleppey-kettuvallam.jpg"
    ],
    "overview": "Discover the serene rhythm of Southern India. Stroll colonial Fort Kochi, ascend misty Munnar tea hills, walk through organic spice forests, and cruise aboard a private, air-conditioned luxury Kettuvallam houseboat through palm-fringed canals. Conclude with doctor-curated Ayurvedic rejuvenation overlooking Lake Vembanad.",
    "highlights": [
      "24-hour private cruise aboard a luxury air-conditioned Kettuvallam with private chef",
      "Doctor-prescribed daily Ayurvedic herbal oil therapies and wellness consultations",
      "Private Kathakali classical dance performance & backstage makeup masterclass",
      "Single-estate organic tea sommelier walk in Munnar hills",
      "Stays in boutique heritage properties: Brunton Boatyard & Kumarakom Lake Resort"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Fort Kochi – Heritage Harbor Gateway",
        "location": "Kochi",
        "description": "Arrive at Cochin International Airport (COK) and transfer in a private air-conditioned vehicle to Brunton Boatyard, set on the historic harbor of Fort Kochi. Evening private Kathakali performance showcasing Kerala’s 400-year-old dance drama.",
        "stay": "Brunton Boatyard, Fort Kochi",
        "meals": "Dinner Included",
        "highlights": [
          "Harbor View Check-in",
          "Private Kathakali Performance"
        ],
        "image": "/images/tours/kerala-sanctuary/day1-kochi-heritage.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 2,
        "title": "Colonial Kochi & Sunset Harbor Cruise",
        "location": "Kochi",
        "description": "Explore Fort Kochi with a private historian: the 16th-century Jewish Synagogue, Mattancherry Dutch Palace, and the iconic Chinese fishing nets. Evening private harbor cruise at golden hour.",
        "stay": "Brunton Boatyard, Fort Kochi",
        "meals": "Breakfast & Seafood Lunch",
        "highlights": [
          "Jewish Synagogue & Dutch Palace",
          "Chinese Fishing Nets Sunset"
        ],
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 3,
        "title": "Ascending to Munnar – Emerald Tea Plantations",
        "location": "Munnar",
        "description": "Drive through winding mountain roads into the Western Ghats to Munnar (5,200 ft). Check into Windermere Estate, a boutique colonial plantation retreat nestled among tea bushes and cardamom orchards.",
        "stay": "Windermere Estate, Munnar",
        "meals": "Breakfast & Estate Dinner",
        "highlights": [
          "Western Ghats Mountain Drive",
          "Plantation Estate Stay"
        ],
        "transit": {
          "type": "drive",
          "duration": "3.5 hrs",
          "route_notes": "Scenic Mountain Pass"
        }
      },
      {
        "day": 4,
        "title": "Munnar – Tea Sommelier Trails & Eravikulam",
        "location": "Munnar",
        "description": "Morning private walk with a resident tea expert through colonial tea gardens. Visit the Lock Hart Tea Factory for a private tasting of orthodox black and green teas. Afternoon wildlife spotting in Eravikulam National Park.",
        "stay": "Windermere Estate, Munnar",
        "meals": "Breakfast & High-Tea Lunch",
        "highlights": [
          "Tea Sommelier Masterclass",
          "Nilgiri Tahr Wildlife Sanctuary"
        ],
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 5,
        "title": "Thekkady – Periyar Spice Sanctuaries",
        "location": "Thekkady",
        "description": "Scenic drive south to Thekkady. Check into Spice Village. Afternoon sensory walk through an organic spice plantation with an expert botanist, discovering cardamom, vanilla, cinnamon, and black pepper.",
        "stay": "Spice Village, Thekkady",
        "meals": "Breakfast & Organic Dinner",
        "highlights": [
          "Organic Spice Sanctuary Walk",
          "Eco-Luxury Forest Chalet"
        ],
        "transit": {
          "type": "drive",
          "duration": "2.5 hrs",
          "route_notes": "Cardamom Hills Highway"
        }
      },
      {
        "day": 6,
        "title": "Alleppey – Private Luxury Houseboat Cruise",
        "location": "Alleppey",
        "description": "Descend to the backwaters of Alleppey and board your private, handcrafted luxury Kettuvallam houseboat. Cruise through narrow canals shaded by coconut palms. Your onboard private chef prepares fresh Karimeen fish and Malabar delicacies.",
        "stay": "Private Luxury Air-Conditioned Houseboat",
        "meals": "All Meals Included Onboard",
        "highlights": [
          "24-Hour Private Houseboat Charter",
          "Sunset Backwater Gliding"
        ],
        "image": "/images/tours/kerala-sanctuary/day3-alleppey-kettuvallam.jpg",
        "transit": {
          "type": "boat",
          "duration": "24-hr Cruise",
          "route_notes": "Private Backwaters Navigation"
        }
      },
      {
        "day": 7,
        "title": "Kumarakom – Ayurvedic Rejuvenation",
        "location": "Kumarakom",
        "description": "Disembark at Kumarakom Lake Resort on Lake Vembanad. Enjoy a personalized Ayurvedic doctor consultation followed by traditional Abhyanga and Shirodhara therapies. Farewell lakeside candlelight dinner.",
        "stay": "Kumarakom Lake Resort (Heritage Villa with Private Pool)",
        "meals": "Breakfast & Farewell Dinner",
        "highlights": [
          "Authentic Ayurvedic Spa Therapies",
          "Lake Vembanad Pool Villa"
        ],
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 8,
        "title": "Kochi – Departure",
        "location": "Kochi",
        "description": "Morning breakfast overlooking the lake. Private chauffeur transfer to Cochin International Airport (COK) for your onward journey.",
        "stay": "Departure",
        "meals": "Breakfast Included",
        "highlights": [
          "Private Airport Chauffeur Transfer"
        ],
        "transit": {
          "type": "none"
        }
      }
    ],
    "inclusions": [
      "7 nights in luxury eco-resorts & 24-hour private air-conditioned luxury houseboat charter",
      "Dedicated private air-conditioned vehicle and chauffeur throughout Kerala",
      "All meals included during the houseboat cruise & daily gourmet breakfasts",
      "Doctor-curated Ayurvedic spa therapy session at Kumarakom Lake Resort",
      "All entrance passes, plantation permits, and local naturalist guides"
    ],
    "exclusions": [
      "International and domestic flights",
      "Alcoholic beverages and personal laundry",
      "Travel insurance and optional wellness treatment upgrades"
    ],
    "accommodations": [
      {
        "name": "Brunton Boatyard",
        "location": "Fort Kochi",
        "tier": "Heritage 5-Star",
        "image": "/images/tours/kerala-sanctuary/day1-kochi-heritage.jpg",
        "description": "Restored Victorian shipyard hotel overlooking Fort Kochi harbor."
      },
      {
        "name": "Windermere Estate",
        "location": "Munnar",
        "tier": "Boutique Plantation Luxury",
        "image": "/images/tours/kerala-sanctuary/day2-munnar-plantations.jpg",
        "description": "Intimate colonial retreat set inside a working tea and cardamom estate."
      },
      {
        "name": "Private Luxury Houseboat",
        "location": "Alleppey Backwaters",
        "tier": "Exclusive Charter",
        "image": "/images/tours/kerala-sanctuary/day3-alleppey-kettuvallam.jpg",
        "description": "Handcrafted air-conditioned wooden barge with private crew and master chef."
      },
      {
        "name": "Kumarakom Lake Resort",
        "location": "Kumarakom",
        "tier": "Luxury Ayurvedic Resort",
        "image": "/images/destinations/kerala/hero.jpg",
        "description": "Award-winning lakeside sanctuary with heritage villas and Ayurvedic center."
      }
    ]
  },
  {
    "id": "tour-3",
    "slug": "ladakh-high-himalayas-expedition",
    "destination_id": "dest-3",
    "destination_name": "Ladakh & High Himalayas",
    "title": "Himalayan High Passes: Monasteries, Glacial Valleys & Luxury Glamping",
    "subtitle": "Venture into the mystical mountain desert of Ladakh, crossing the highest motorable roads on earth.",
    "duration_days": 9,
    "duration_nights": 8,
    "price_usd": 3950,
    "price_inr": 330000,
    "activity_level": "Active Adventure",
    "travel_style": "Himalayan Exploration",
    "group_type": "100% Private Custom",
    "is_featured": true,
    "hero_image": "/images/tours/himalayan-expedition/hero.jpg",
    "gallery": [
      "/images/tours/himalayan-expedition/hero.jpg",
      "/images/tours/himalayan-expedition/day1-leh-palace.jpg",
      "/images/tours/himalayan-expedition/day2-nubra-valley.jpg",
      "/images/destinations/ladakh/pangong-lake-azure.jpg"
    ],
    "overview": "An exhilarating high-comfort expedition across the Trans-Himalayan mountain desert. Discover 1,000-year-old cliffside Buddhist monasteries, cross the legendary Khardung La pass (17,582 ft) in private 4x4 SUVs, sleep under heated luxury yurt domes in Nubra Valley, and gaze into the sapphire infinity of Pangong Lake.",
    "highlights": [
      "Private dawn prayer blessing at Thiksey Gompa with senior Buddhist lamas",
      "Crossing Khardung La Pass (17,582 ft) in luxury 4x4 Toyota Fortuner with expert driver",
      "Heated luxury glamping domes at Hunder Sand Dunes & Pangong Lake (14,270 ft)",
      "Bactrian two-humped camel safari across high-altitude dunes in Nubra Valley",
      "Stargazing under Bortle Class 1 Himalayan night skies with astronomical telescope"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Leh – Acclimatization in the High Desert",
        "location": "Leh",
        "description": "Fly over the snow-crested Himalayas into Leh (11,500 ft). Check into The Grand Dragon Ladakh. Mandatory 24-hour gentle rest for acclimatization with warm Kashmiri Kahwa tea.",
        "stay": "The Grand Dragon Ladakh (Royal Suite)",
        "meals": "Dinner Included",
        "highlights": [
          "Spectacular Himalayan Mountain Flight",
          "Gentle High-Altitude Acclimatization"
        ],
        "image": "/images/tours/himalayan-expedition/day1-leh-palace.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 2,
        "title": "Leh Heritage – Shanti Stupa & Old Town Bazaar",
        "location": "Leh",
        "description": "Gentle walking tour of 17th-century Leh Palace, the serene Shanti Stupa with 360-degree mountain views, and the Tibetan handicraft markets.",
        "stay": "The Grand Dragon Ladakh",
        "meals": "Breakfast & Gourmet Lunch",
        "highlights": [
          "Leh Palace & Shanti Stupa",
          "Tibetan Artisan Market"
        ],
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 3,
        "title": "Indus Valley Monasteries – Thiksey & Hemis Gompas",
        "location": "Leh",
        "description": "Attend early morning chanting at Thiksey Monastery, home to the 49-ft Maitreya Buddha statue. Continue to Hemis Monastery, the wealthiest and largest Buddhist monastery in Ladakh.",
        "stay": "The Grand Dragon Ladakh",
        "meals": "Breakfast & Monastery Picnic",
        "highlights": [
          "Morning Lama Chanting",
          "Hemis Museum Royal Relics"
        ],
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 4,
        "title": "Over Khardung La (17,582 ft) to Nubra Valley",
        "location": "Nubra",
        "description": "Drive up the world’s highest motorable highway over Khardung La Pass (17,582 ft). Descend into the dramatic Nubra Valley and check into luxury heated yurt camp.",
        "stay": "Luxury Chamba Glamping Yurts, Nubra",
        "meals": "Breakfast & Camp Dinner",
        "highlights": [
          "Khardung La High Mountain Pass",
          "Heated Luxury Glamping"
        ],
        "transit": {
          "type": "drive",
          "duration": "4.5 hrs",
          "route_notes": "Via Khardung La Pass (17,582 ft)"
        }
      },
      {
        "day": 5,
        "title": "Nubra Valley – Diskit Monastery & Camel Safari",
        "location": "Nubra",
        "description": "Visit the 106-ft outdoor statue of Maitreya Buddha at Diskit Monastery. Afternoon two-humped Bactrian camel ride across the white sand dunes of Hunder.",
        "stay": "Luxury Chamba Glamping Yurts, Nubra",
        "meals": "Breakfast & Barbecue Dinner",
        "highlights": [
          "Diskit 106-ft Buddha",
          "Bactrian Camel Safari in Sand Dunes"
        ],
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 6,
        "title": "To Sapphire Pangong Lake (14,270 ft)",
        "location": "Pangong",
        "description": "Drive along the wild Shyok River canyon to Pangong Tso, a 134-km long sapphire lake spanning India and Tibet. Check into heated lakefront glamping domes.",
        "stay": "Pangong Luxury Lakefront Glamping Domes",
        "meals": "All Meals Included",
        "highlights": [
          "Sapphire Pangong Lake Sunset",
          "Heated Shoreline Domes"
        ],
        "image": "/images/destinations/ladakh/pangong-lake-azure.jpg",
        "transit": {
          "type": "drive",
          "duration": "4.0 hrs",
          "route_notes": "Along Shyok River Canyon"
        }
      },
      {
        "day": 7,
        "title": "Pangong Sunrise & Return to Leh via Chang La",
        "location": "Leh",
        "description": "Watch the turquoise hues shift at dawn. Return to Leh crossing Chang La Pass (17,688 ft). Return to The Grand Dragon Ladakh for hot stone spa relaxation.",
        "stay": "The Grand Dragon Ladakh",
        "meals": "Breakfast & Dinner",
        "highlights": [
          "Pangong Dawn Reflection",
          "Chang La Pass Crossing"
        ],
        "transit": {
          "type": "drive",
          "duration": "5.0 hrs",
          "route_notes": "Via Chang La Pass (17,688 ft)"
        }
      },
      {
        "day": 8,
        "title": "Leh – Pashmina Weaving & Farewell Banquet",
        "location": "Leh",
        "description": "Private masterclass on authentic Ladakhi Pashmina wool spinning and weaving. Evening farewell traditional Ladakhi banquet.",
        "stay": "The Grand Dragon Ladakh",
        "meals": "Breakfast & Farewell Banquet",
        "highlights": [
          "Pashmina Artisan Masterclass",
          "Traditional Ladakhi Feast"
        ],
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 9,
        "title": "Leh – Departure",
        "location": "Leh",
        "description": "Private transfer to Leh Airport for your morning flight over the Himalayas back to Delhi.",
        "stay": "Departure",
        "meals": "Breakfast Included",
        "highlights": [
          "VIP Airport Chauffeur Transfer"
        ],
        "transit": {
          "type": "none"
        }
      }
    ],
    "inclusions": [
      "8 nights in premier luxury hotels & heated glamping domes with private bathrooms",
      "Private 4x4 Toyota Fortuner with veteran high-altitude mountain driver and oxygen equipment",
      "All Inner Line Permits, Wildlife Sanctuary fees, and monastery entrance tickets",
      "All meals throughout the expedition, including gourmet heated dining in Nubra and Pangong",
      "Specialist Ladakhi cultural guide and local scholar"
    ],
    "exclusions": [
      "Flights to/from Leh (IXL)",
      "High-altitude thermal mountain gear (can be rented locally)",
      "Discretionary guide and driver gratuities"
    ],
    "accommodations": [
      {
        "name": "The Grand Dragon Ladakh",
        "location": "Leh",
        "tier": "Luxury 5-Star Hotel",
        "image": "/images/tours/himalayan-expedition/day1-leh-palace.jpg",
        "description": "Premier eco-luxury hotel with oxygen-enriched suites and solar underfloor heating."
      },
      {
        "name": "Chamba Glamping Yurts",
        "location": "Nubra Valley",
        "tier": "Luxury Heated Glamping",
        "image": "/images/tours/himalayan-expedition/day2-nubra-valley.jpg",
        "description": "Heated luxury yurt chalets nestled in an organic apricot orchard."
      }
    ]
  },
  {
    "id": "tour-4",
    "slug": "ranthambore-tiger-safari-expedition",
    "destination_id": "dest-4",
    "destination_name": "Central India & Wildlife",
    "title": "The Royal Tiger Sanctuary & Wilderness Expedition",
    "subtitle": "Track wild Royal Bengal tigers in Ranthambore with veteran naturalists and stay in opulent jungle palace tents.",
    "duration_days": 7,
    "duration_nights": 6,
    "price_usd": 3650,
    "price_inr": 305000,
    "activity_level": "Moderate",
    "travel_style": "Wildlife Safari",
    "group_type": "100% Private Custom",
    "is_featured": true,
    "hero_image": "/images/tours/sovereign-wild/hero.jpg",
    "gallery": [
      "/images/tours/sovereign-wild/hero.jpg",
      "/images/tours/sovereign-wild/day1-delhi-safari-transit.jpg",
      "/images/tours/sovereign-wild/day2-ranthambore-morning-drive.jpg",
      "/images/destinations/ranthambore/tiger-stalking-banyan.jpg"
    ],
    "overview": "An intimate wilderness journey tracking the majestic Royal Bengal tiger in Ranthambore National Park. Embark on 4 private open-top 4x4 Gypsy safaris across prime core zones with a dedicated senior naturalist, stay in the opulent tented luxury of The Oberoi Vanyavilas, and conclude with royal palace relaxation in Jaipur.",
    "highlights": [
      "4 private exclusive open-top 4x4 Gypsy game drives in Ranthambore Core Zones 1–5",
      "Senior wildlife naturalist tracking tigers, leopards, sloth bears, and marsh crocodiles",
      "3 nights at The Oberoi Vanyavilas in triple-canopied luxury air-conditioned tents",
      "Private excursion to the 10th-century UNESCO Ranthambore Hill Fort",
      "Grand palace finale at The Oberoi Rajvilas, Jaipur"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Delhi – Lutyens Luxury Retreat",
        "location": "Delhi",
        "description": "Arrive at New Delhi IGI Airport and transfer in a private luxury chauffeur sedan to The Oberoi, New Delhi. Unwind overlooking the serene Delhi Golf Club.",
        "stay": "The Oberoi, New Delhi",
        "meals": "Dinner Included",
        "highlights": [
          "VIP Airport Transfer",
          "The Oberoi Luxury Suite"
        ],
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 2,
        "title": "To Ranthambore – Jungle Palace Arrival",
        "location": "Ranthambore",
        "description": "Executive express train / private drive to Sawai Madhopur. Check into The Oberoi Vanyavilas luxury jungle tents with private walled gardens. Evening briefing with senior naturalist.",
        "stay": "The Oberoi Vanyavilas (Luxury Tented Suite)",
        "meals": "Breakfast & Jungle Dinner",
        "highlights": [
          "Oberoi Vanyavilas Check-in",
          "Senior Naturalist Wilderness Briefing"
        ],
        "image": "/images/tours/sovereign-wild/day2-ranthambore-morning-drive.jpg",
        "transit": {
          "type": "train",
          "duration": "3.5 hrs",
          "route_notes": "First Class Kota Jan Shatabdi"
        }
      },
      {
        "day": 3,
        "title": "Ranthambore – Dawn & Dusk Tiger Safaris",
        "location": "Ranthambore",
        "description": "Two private 4x4 Gypsy safaris (Sunrise & Sunset) across Core Zones 1–5. Track tiger pugmarks, alarm calls of spotted deer, and discover ancient ruins reclaimed by the jungle.",
        "stay": "The Oberoi Vanyavilas",
        "meals": "All Meals Included",
        "highlights": [
          "2 Private Core Zone Safaris",
          "Tiger & Leopard Tracking"
        ],
        "transit": {
          "type": "safari",
          "duration": "Private Game Drives"
        }
      },
      {
        "day": 4,
        "title": "Ranthambore – Fort Excursion & Spa Leisure",
        "location": "Ranthambore",
        "description": "Morning private safari in rocky cliff ravines. Afternoon guided walk through the 10th-century Ranthambore Fort. Evening poolside campfire dining.",
        "stay": "The Oberoi Vanyavilas",
        "meals": "All Meals Included",
        "highlights": [
          "UNESCO Ranthambore Fort",
          "Oberoi Campfire Dining"
        ],
        "transit": {
          "type": "safari",
          "duration": "Morning Safari"
        }
      },
      {
        "day": 5,
        "title": "To Jaipur – The Oberoi Rajvilas Oasis",
        "location": "Jaipur",
        "description": "Scenic chauffeured drive to Jaipur (3 hrs). Check into The Oberoi Rajvilas, set within 32 acres of peacocks, fountains, and traditional Rajasthani architecture.",
        "stay": "The Oberoi Rajvilas, Jaipur",
        "meals": "Breakfast & Royal Dinner",
        "highlights": [
          "Chauffeured Countryside Drive",
          "The Oberoi Rajvilas Estate"
        ],
        "transit": {
          "type": "drive",
          "duration": "3.0 hrs",
          "route_notes": "Chauffeured Countryside Drive"
        }
      },
      {
        "day": 6,
        "title": "Jaipur – Amber Fort & Royal Textile Masterclass",
        "location": "Jaipur",
        "description": "Private morning tour of Amber Fort and the Jantar Mantar observatory. Afternoon private block-printing textile masterclass with a master craftsman.",
        "stay": "The Oberoi Rajvilas, Jaipur",
        "meals": "Breakfast & High-Tea Dinner",
        "highlights": [
          "Amber Fort VIP Access",
          "Artisan Textile Masterclass"
        ],
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 7,
        "title": "Return to Delhi – Departure",
        "location": "Delhi",
        "description": "Private chauffeur drive / flight back to New Delhi IGI Airport for your onward international flight.",
        "stay": "Departure",
        "meals": "Breakfast Included",
        "highlights": [
          "VIP Airport Chauffeur Transfer"
        ],
        "transit": {
          "type": "drive",
          "duration": "4.0 hrs",
          "route_notes": "Chauffeured Return to Delhi"
        }
      }
    ],
    "inclusions": [
      "6 nights in premier 5-star luxury hotels (The Oberoi Vanyavilas & The Oberoi Rajvilas)",
      "4 exclusive private 4x4 open-top Gypsy safaris with dedicated veteran naturalist guide",
      "All government tiger reserve zone permits, forest conservation taxes, and tracker fees",
      "All gourmet dining at The Oberoi Vanyavilas & daily breakfasts throughout",
      "Private chauffeur luxury transport between Delhi, Ranthambore, and Jaipur"
    ],
    "exclusions": [
      "International flights",
      "Alcoholic beverages and personal laundry",
      "Discretionary naturalist and driver gratuities"
    ],
    "accommodations": [
      {
        "name": "The Oberoi Vanyavilas",
        "location": "Ranthambore",
        "tier": "Ultra Luxury Jungle Resort",
        "image": "/images/tours/sovereign-wild/hero.jpg",
        "description": "Triple-canopied luxury air-conditioned tents with teak floors and private gardens."
      },
      {
        "name": "The Oberoi Rajvilas",
        "location": "Jaipur",
        "tier": "Royal Luxury 5-Star",
        "image": "/images/tours/royal-odyssey/day3-jaipur-rambagh.jpg",
        "description": "32-acre fort-style luxury palace estate surrounded by landscaped gardens."
      }
    ]
  },
  {
    "id": "tour-5",
    "slug": "varanasi-sacred-ganges-spiritual",
    "destination_id": "dest-5",
    "destination_name": "North India & Ganges",
    "title": "Sacred Ganges & Timeless Varanasi: A Spiritual Monograph",
    "subtitle": "An intimate, authentic encounter with the world’s oldest living city, dawn Ganges rituals, and Sarnath.",
    "duration_days": 6,
    "duration_nights": 5,
    "price_usd": 2850,
    "price_inr": 238000,
    "activity_level": "Leisurely",
    "travel_style": "Spiritual & Wellness",
    "group_type": "100% Private Custom",
    "is_featured": true,
    "hero_image": "/images/destinations/varanasi/hero.jpg",
    "gallery": [
      "/images/destinations/varanasi/hero.jpg",
      "/images/destinations/varanasi/sunrise-boat-ghats.jpg",
      "/images/destinations/varanasi/evening-ganga-aarti.jpg"
    ],
    "overview": "Varanasi is the timeless beating heart of spiritual India. Arrive by private boat directly to BrijRama Palace floating above Darbhanga Ghat, drift along the sacred river at dawn with classical flute music during Subah-e-Banaras, witness the electrifying evening Ganga Aarti ceremony from a private royal boat, and visit Sarnath where Lord Buddha gave his first sermon.",
    "highlights": [
      "Stay at BrijRama Palace (18th-century palace situated directly on Darbhanga Ghat)",
      "Subah-e-Banaras private dawn wooden rowboat with resident classical musician",
      "Front-row private boat for the evening Ganga Aarti fire ceremony at Dashashwamedh Ghat",
      "Private scholar excursion to Sarnath deer park & 5th-century Dhamek Stupa",
      "Guided walking exploration of the ancient silk-weaving haveli alleys of Varanasi"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Delhi – The Imperial Retreat",
        "location": "Delhi",
        "description": "Arrive at New Delhi IGI Airport, private transfer to The Imperial. Welcome cocktail and orientation dinner.",
        "stay": "The Imperial, New Delhi",
        "meals": "Dinner Included",
        "highlights": [
          "VIP Airport Fast-Track",
          "The Imperial Heritage Stay"
        ],
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 2,
        "title": "Flight to Varanasi – Royal Boat Arrival",
        "location": "Varanasi",
        "description": "Domestic flight to Varanasi (1h 15m). Board a private wooden boat to arrive directly at BrijRama Palace floating above Darbhanga Ghat. Evening private front-row boat for the Ganga Aarti ceremony.",
        "stay": "BrijRama Palace, Varanasi (Darbhanga Room)",
        "meals": "Breakfast & Palace Dinner",
        "highlights": [
          "Private Boat Arrival at Darbhanga Ghat",
          "Front-Row Ganga Aarti Boat"
        ],
        "image": "/images/destinations/varanasi/evening-ganga-aarti.jpg",
        "transit": {
          "type": "flight",
          "duration": "1h 15m",
          "route_notes": "Direct Flight & Royal Boat Transfer"
        }
      },
      {
        "day": 3,
        "title": "Subah-e-Banaras & Old City Silk Haveli Trail",
        "location": "Varanasi",
        "description": "Private dawn rowboat along the ghats as the city wakes with sacred hymns and classical flute. Guided walking exploration through the ancient silk-weaving alleys of Varanasi.",
        "stay": "BrijRama Palace, Varanasi",
        "meals": "Breakfast & Traditional Lunch",
        "highlights": [
          "Subah-e-Banaras Dawn Boat",
          "Ancient Silk Weaving Alleys"
        ],
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 4,
        "title": "Sarnath – In the Footsteps of the Buddha",
        "location": "Varanasi",
        "description": "Private excursion to Sarnath where Buddha gave his first sermon 2,500 years ago. Visit the Dhamek Stupa, the Ashoka Pillar, and the renowned archaeological museum.",
        "stay": "BrijRama Palace, Varanasi",
        "meals": "Breakfast & Palace Dinner",
        "highlights": [
          "Sarnath Buddhist Sanctuary",
          "Ashoka Pillar Archaeological Museum"
        ],
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 5,
        "title": "Varanasi to Delhi – Farewell Evening",
        "location": "Delhi",
        "description": "Morning private boat ride. Transfer to airport for flight back to Delhi. Farewell tasting dinner at The Imperial.",
        "stay": "The Imperial, New Delhi",
        "meals": "Breakfast & Farewell Dinner",
        "highlights": [
          "Flight to Delhi",
          "Farewell Royal Feast"
        ],
        "transit": {
          "type": "flight",
          "duration": "1h 15m",
          "route_notes": "Return Flight to Delhi"
        }
      },
      {
        "day": 6,
        "title": "Delhi – Departure",
        "location": "Delhi",
        "description": "Private chauffeur transfer to New Delhi IGI Airport for your onward international flight.",
        "stay": "Departure",
        "meals": "Breakfast Included",
        "highlights": [
          "VIP Airport Chauffeur Transfer"
        ],
        "transit": {
          "type": "none"
        }
      }
    ],
    "inclusions": [
      "5 nights in premier 5-star heritage hotels (BrijRama Palace & The Imperial)",
      "All internal flights in premium class (Delhi to Varanasi roundtrip)",
      "Private boat transfers on the Ganges for arrival, dawn tours, and evening Aarti ceremonies",
      "All meals, private scholar guide fees, and Sarnath monument entrance tickets",
      "24/7 dedicated concierge assistance with direct WhatsApp channel"
    ],
    "exclusions": [
      "International flights",
      "Travel insurance and Indian visa",
      "Discretionary guide gratuities"
    ],
    "accommodations": [
      {
        "name": "BrijRama Palace",
        "location": "Varanasi (Darbhanga Ghat)",
        "tier": "Heritage Palace 5-Star",
        "image": "/images/destinations/varanasi/hero.jpg",
        "description": "18th-century royal palace situated directly on the sacred Darbhanga Ghat."
      },
      {
        "name": "The Imperial",
        "location": "New Delhi",
        "tier": "Heritage Legend 5-Star",
        "image": "/images/tours/royal-odyssey/day1-delhi-imperial.jpg",
        "description": "1930s Art Deco masterpiece set in 8 acres of lush gardens in Lutyens’ Delhi."
      }
    ]
  }
];