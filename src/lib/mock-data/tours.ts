import { Tour } from '@/types';

export const mockTours: Tour[] = [
  {
    "id": "tour-1",
    "slug": "golden-triangle-royal-palaces",
    "destination_id": "dest-1",
    "destination_name": "Rajasthan",
    "title": "The Royal Odyssey: Golden Triangle & Palaces of Udaipur",
    "subtitle": "Ten days through the imperial capitals and royal lake kingdoms of North India, staying at legendary palace properties in Delhi, Agra, Jaipur, and Udaipur.",
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
      "/images/tours/royal-odyssey/day9-royal-dining.jpg",
      "/images/tours/royal-odyssey/day10-delhi-departure.jpg"
    ],
    "overview": "From the Mughal architecture of Delhi and Agra to the desert citadels of Jaipur and the island palaces of Lake Pichola, this ten-day journey follows the classic royal circuit of North India at an unhurried pace.\n\nYou travel by private chauffeured luxury sedan and short domestic flights, guided throughout by architectural historians and regional curators. In Agra, stay at The Oberoi Amarvilas with direct views of the Taj Mahal from your private balcony, entering the monument at dawn before public gates open to study its 17th-century pietra dura marble inlays. In Jaipur, stay at Rambagh Palace, former home of the Maharaja of Jaipur, with private access to the royal family's residential quarters inside the City Palace. The journey concludes on Lake Pichola in Udaipur, where private boat transfers bring you to the 18th-century white marble Taj Lake Palace, accompanied by sunset cruises aboard a ceremonial royal barge and a day trip into the Aravalli hills to examine the 1,444 carved marble pillars of Ranakpur.",
    "highlights": [
      "Dawn private viewing of the Taj Mahal with an architectural historian, entering before the public gates open",
      "Stays at premier palace hotels: The Imperial New Delhi, The Oberoi Amarvilas, Rambagh Palace, and Taj Lake Palace",
      "Private access to the Maharaja's residential apartments (Chandra Mahal) inside the Jaipur City Palace",
      "Sunset cruise on Lake Pichola aboard a 150-year-old ceremonial royal barge with live folk musicians",
      "Curator-led explorations of 16th-century Mughal monuments including Humayun's Tomb, Agra Fort, and Fatehpur Sikri",
      "Visit to the 8th-century Chand Baori stepwell in Abhaneri with its 3,500 geometric stone steps",
      "Full-day excursion into the Aravalli hills to the 15th-century Ranakpur Jain temple and its 1,444 carved marble pillars",
      "Fine dining in historic royal banquet halls, including Suvarna Mahal in Jaipur and Neel Kamal in Udaipur"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in New Delhi and Heritage Welcome at The Imperial",
        "location": "Delhi",
        "description": "Arrive at Indira Gandhi International Airport, where a dedicated airport concierge meets you at the jet bridge to guide you through fast-track customs and immigration. A private chauffeur transfers you in a Mercedes-Benz S-Class to The Imperial New Delhi. Opened in 1936 along Janpath, the hotel retains South Asia's largest private collection of colonial-era British Raj artwork. Settle into your Heritage Suite, then take a private curator-led walk through the property's galleries, viewing late-18th-century aquatints by Thomas and William Daniell. The evening begins with welcome drinks in the historic 1911 Bar, followed by dinner at The Spice Route, set beneath hand-carved timber pillars transported from Kerala temples.",
        "stay": "The Imperial, New Delhi (Heritage Suite)",
        "meals": "Welcome Dinner at The Spice Route",
        "highlights": [
          "Jet-bridge tarmac reception, customs fast-track, and private Mercedes transfer",
          "Curator-led walk through The Imperial's 5,000-piece colonial art collection",
          "Welcome dinner at The Spice Route"
        ],
        "image": "/images/tours/royal-odyssey/day1-delhi-imperial.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 2,
        "title": "Historic Old Delhi and the Monuments of Lutyens",
        "location": "Delhi",
        "description": "Begin the morning in Old Delhi (the 17th-century Mughal capital of Shahjahanabad) with a cycle-rickshaw ride through the spice bazaar of Khari Baoli, climbing to a spice trader's rooftop for views over the market alleys. Visit the red sandstone Jama Masjid, India's largest congregational mosque, commissioned by Emperor Shah Jahan in 1656, and walk the historic jewelry lane of Dariba Kalan in Chandni Chowk. After lunch at a restored heritage haveli, your architectural historian guides you through the tree-lined avenues of Lutyens' New Delhi. Tour Humayun's Tomb, the 16th-century Persian-style red sandstone precursor to the Taj Mahal, and the 12th-century Qutub Minar complex with its 4th-century rust-resistant Gupta iron pillar.",
        "stay": "The Imperial, New Delhi",
        "meals": "Breakfast & Heritage Haveli Lunch",
        "highlights": [
          "Cycle-rickshaw ride through the 17th-century spice market of Khari Baoli",
          "Private visits to Jama Masjid and the historic silver bazaar of Dariba Kalan",
          "Historian-led tours of Humayun's Tomb and the Qutub Minar complex"
        ],
        "image": "/images/tours/royal-odyssey/day2-delhi-monuments.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 3,
        "title": "The Royal Road to Agra, Agra Fort, and Sunset at Mehtab Bagh",
        "location": "Agra",
        "description": "Following breakfast on the verandah at The Imperial, your chauffeur drives you south along the Yamuna Expressway to Agra in a private executive sedan (approximately 3.5 hours). Arrive at The Oberoi Amarvilas, where every room and private terrace overlooks the Taj Mahal from just 600 meters away. Check in to your Premier Taj View Room, greeted by traditional flute players and chilled rose-water towels. In the afternoon, visit Agra Fort, the red sandstone citadel of the Mughal emperors. Walk through the Jahangiri Mahal, the Diwan-i-Khas, and the octagonal Musamman Burj marble tower where Shah Jahan spent his final years gazing toward the Taj Mahal across the river. At dusk, cross the Yamuna River to Mehtab Bagh (the Moonlight Garden) to watch the sunset illuminate the white marble of the Taj Mahal without crowds. Dinner this evening is served at Esphahan, accompanied by live santoor music and royal Awadhi recipes.",
        "stay": "The Oberoi Amarvilas, Agra (Premier Room with Taj View)",
        "meals": "Breakfast & Royal Awadhi Dinner at Esphahan",
        "highlights": [
          "Chauffeured executive transfer to Agra via the Yamuna Expressway",
          "Check-in to The Oberoi Amarvilas with unobstructed Taj Mahal views",
          "Guided exploration of Agra Fort and the marble Musamman Burj tower",
          "Sunset viewing of the Taj Mahal across the Yamuna from Mehtab Bagh"
        ],
        "image": "/images/tours/royal-odyssey/day2-agra-amarvilas.jpg",
        "transit": {
          "type": "drive",
          "duration": "3.5 hrs",
          "route_notes": "Private chauffeured drive via Yamuna Expressway to Agra"
        }
      },
      {
        "day": 4,
        "title": "Dawn at the Taj Mahal, Fatehpur Sikri, and Chand Baori Stepwell",
        "location": "Agra to Jaipur",
        "description": "Depart The Oberoi Amarvilas at dawn via private electric golf cart, entering the Taj Mahal through the VIP gate before the grounds open to the general public. Guided by a senior Mughal scholar, inspect the intricate 17th-century pietra dura (parchin kari) craftsmanship, in which semi-precious lapis lazuli, jasper, carnelian, and mother-of-pearl are set into polished Makrana marble. Return to Amarvilas for breakfast on the garden terrace with views of the dome. Continue by road toward Jaipur, stopping first at Fatehpur Sikri, the preserved 1571 red sandstone capital built by Emperor Akbar, to tour the Buland Darwaza and the white marble shrine of Sufi saint Sheikh Salim Chishti. Farther west, stop at Abhaneri to walk the perimeter of Chand Baori, an 8th-century stepwell descending 13 stories through 3,500 geometrically aligned stone steps. Arrive in Jaipur by late afternoon and check in to Rambagh Palace, the former residence of the Maharaja of Jaipur, welcomed by royal trumpets and marigold garlands.",
        "stay": "Rambagh Palace, Jaipur (Palace Room)",
        "meals": "Breakfast & Heritage Lunch En Route",
        "highlights": [
          "Early dawn entrance to the Taj Mahal before public crowds arrive",
          "Architectural examination of 17th-century pietra dura marble inlays",
          "Guided walk through the 16th-century ghost capital of Fatehpur Sikri",
          "Visit to the 8th-century Chand Baori stepwell at Abhaneri"
        ],
        "image": "/images/tours/royal-odyssey/day4-taj-sunrise.jpg",
        "transit": {
          "type": "drive",
          "duration": "4.5 hrs",
          "route_notes": "Scenic drive to Jaipur via Fatehpur Sikri and Abhaneri Stepwell"
        }
      },
      {
        "day": 5,
        "title": "Amber Fort, Royal City Palace Courtyards, and Suvarna Mahal Banquet",
        "location": "Jaipur",
        "description": "Morning drive to the rugged Aravalli hills above Jaipur to explore Amber Fort, the 16th-century stronghold of the Kachwaha Rajputs. Walk through the Ganesh Pol ceremonial gateway into the Sheesh Mahal (Palace of Mirrors), where thousands of convex glass mirrors inlaid into the plaster illuminate the royal chambers. On the drive back into the city, pause for photographs of the Jal Mahal (Water Palace) resting in the waters of Man Sagar Lake. In the afternoon, enjoy private curator access to the Jaipur City Palace, including the Maharaja's residential apartments (Chandra Mahal), normally closed to the public: Sukh Niwas (the blue dining room), Shobha Niwas (the Hall of Beauty adorned with mirrorwork), and Chhavi Niwas (the rooftop monsoon retreat). High tea is served on the private palace terrace. Conclude with a visit to the Jantar Mantar, a 1734 astronomical observatory housing the world's largest stone sundial. In the evening, dine at Suvarna Mahal, the former royal banquet hall of Rambagh Palace, with Italian crystal chandeliers, gold cutlery, and recipes from the princely states of Rajasthan.",
        "stay": "Rambagh Palace, Jaipur",
        "meals": "Breakfast, Private High Tea & Royal Banquet Dinner",
        "highlights": [
          "Private tour of Amber Fort and the 16th-century Sheesh Mahal mirror palace",
          "Exclusive access to the private Chandra Mahal suites inside the City Palace",
          "Private royal high tea on the City Palace terrace",
          "Dinner at Suvarna Mahal beneath Florentine ceiling frescoes"
        ],
        "image": "/images/tours/royal-odyssey/day3-jaipur-rambagh.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 6,
        "title": "Bagru Artisan Masterclass, Flight to Udaipur, and Lake Pichola Arrival",
        "location": "Jaipur to Udaipur",
        "description": "Spend the morning exploring Jaipur's living craft traditions. Travel to an artisan workshop in Bagru to see traditional wooden hand-block printing using vegetable and mineral dyes, followed by a visit with hereditary gem cutters in Johari Bazaar to learn how emeralds and rubies are cut and polished for royal jewelry. Transfer to Jaipur Airport for the 60-minute flight south to Udaipur. Upon arrival at Maharana Pratap Airport, a private chauffeur drives you to the Bansi Ghat jetty on Lake Pichola. Step aboard a private ceremonial Mewari boat to cross the water to Taj Lake Palace, built between 1743 and 1746 by Maharana Jagat Singh II as a summer pleasure retreat (Jag Niwas). You are welcomed with rose petals and chilled hibiscus sherbet before being escorted to your Luxury Lake View Room. Spend the evening at leisure beside the marble lily pond, taking in views of the lit City Palace across the water.",
        "stay": "Taj Lake Palace, Udaipur (Luxury Lake View Room)",
        "meals": "Breakfast & Lakeside Welcome Dinner",
        "highlights": [
          "Traditional hand-block printing and natural dye masterclass in Bagru",
          "Short domestic flight to Udaipur and private road transfer",
          "Private ceremonial Mewari boat arrival at the floating Taj Lake Palace",
          "Evening views across Lake Pichola from the palace courtyards"
        ],
        "image": "/images/tours/royal-odyssey/day6-lake-palace-arrival.jpg",
        "transit": {
          "type": "flight",
          "duration": "1h 00m Flight + 30m Drive + 15m Boat",
          "route_notes": "Domestic flight from Jaipur to Udaipur followed by private boat arrival"
        }
      },
      {
        "day": 7,
        "title": "Udaipur City Palace, Miniature Painting Atelier, and Sunset Royal Barge",
        "location": "Udaipur",
        "description": "After breakfast overlooking the Aravalli hills, take a private boat across to the Udaipur City Palace, the largest palace complex in Rajasthan, built over four centuries on the eastern ridge of Lake Pichola. Tour the Mor Chowk (Peacock Courtyard) with its 5,000 glass mosaic tiles, the Zenana Mahal, and the Crystal Gallery, which houses the world's largest private crystal collection, ordered in 1877 from F&C Osler of London by Maharana Sajjan Singh. Later, visit a studio of master miniature painters to observe traditional Mewar court art created with single-hair squirrel brushes and pigments ground from semi-precious stones. At sunset, board a 150-year-old ceremonial royal barge (Gangaur) for a private champagne cruise past Jag Mandir Island and the old city ghats as folk musicians play the ravanahatha on deck. Dinner is served at Neel Kamal at Taj Lake Palace, featuring traditional Mewari thalis prepared over wood-fired stoves.",
        "stay": "Taj Lake Palace, Udaipur",
        "meals": "Breakfast & Mewari Tasting Dinner at Neel Kamal",
        "highlights": [
          "Private guided tour of Udaipur City Palace and the 1877 Osler Crystal Gallery",
          "Masterclass with hereditary Mewar miniature painters using natural pigments",
          "Sunset champagne cruise aboard a 150-year-old royal barge on Lake Pichola",
          "Traditional Mewari dinner prepared over wood-fired hearths at Neel Kamal"
        ],
        "image": "/images/tours/royal-odyssey/day4-udaipur-pichola.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 8,
        "title": "Excursion to the 1,444 Marble Pillars of Ranakpur",
        "location": "Udaipur",
        "description": "Embark on a 2.5-hour scenic chauffeured drive north into the forested valleys of the Aravalli mountains to visit Ranakpur. Guided by an architectural historian, explore the 15th-century Chaturmukha Jain Temple, built entirely of pale amber-white marble. Study its 1,444 uniquely hand-carved pillars, no two of which share the same motif, and admire the intricate ceiling domes depicting dancing celestial nymphs (apsaras). Enjoy a relaxed country lunch at a heritage estate in the hills before driving back to Udaipur in the late afternoon. Unwind at the palace spa or enjoy a quiet evening cocktail on the rooftop terrace, watching lanterns float along the lake as evening prayers echo from the Jagdish Temple.",
        "stay": "Taj Lake Palace, Udaipur",
        "meals": "Breakfast, Country Estate Lunch & Palace Dinner",
        "highlights": [
          "Scenic drive through the Aravalli mountain passes to Ranakpur",
          "Architectural study of the 15th-century Ranakpur temple and its 1,444 marble pillars",
          "Traditional lunch at a countryside heritage estate",
          "Evening relaxation on the terrace of Taj Lake Palace"
        ],
        "image": "/images/tours/royal-odyssey/day8-ranakpur-temple.jpg",
        "transit": {
          "type": "drive",
          "duration": "2.5 hrs each way",
          "route_notes": "Chauffeured countryside excursion to Ranakpur Jain Temple"
        }
      },
      {
        "day": 9,
        "title": "Return Flight to New Delhi and Connoisseur Farewell Dinner",
        "location": "Udaipur to Delhi",
        "description": "Enjoy a final morning watching the early sunlight touch Lake Pichola from the palace terrace. After breakfast, a private boat transfers you back to the mainland jetty, where your driver meets you for the transfer to Udaipur Airport. Take the 80-minute flight back to New Delhi and check back in to The Imperial for your final evening in India. The afternoon is at leisure to shop for handicrafts along Janpath or visit the landscaped Mughal monuments at Sundar Nursery. In the evening, gather for a celebratory multi-course farewell dinner showcasing regional royal recipes from across India, paired with fine wines in a private dining room at The Imperial.",
        "stay": "The Imperial, New Delhi (Heritage Suite)",
        "meals": "Breakfast & Multi-Course Farewell Dinner",
        "highlights": [
          "Morning boat departure from Taj Lake Palace across Lake Pichola",
          "Domestic flight from Udaipur to New Delhi with private airport transfers",
          "Leisure afternoon in Lutyens' Delhi or Sundar Nursery heritage gardens",
          "Celebratory farewell dinner celebrating regional Indian royal recipes"
        ],
        "image": "/images/tours/royal-odyssey/day9-royal-dining.jpg",
        "transit": {
          "type": "flight",
          "duration": "1h 20m Flight",
          "route_notes": "Domestic flight from Udaipur to New Delhi IGI Airport"
        }
      },
      {
        "day": 10,
        "title": "VIP Tarmac Departure from New Delhi",
        "location": "Delhi",
        "description": "After breakfast in the palm-filled courtyard of The Imperial, spend your final morning resting or enjoying the hotel spa. Your private chauffeur transfers you in an executive sedan to Indira Gandhi International Airport. Dedicated airport concierge personnel assist with baggage handling, tax refunds, and fast-track clearance to the international departures lounge, ensuring a calm, seamless transition for your flight home.",
        "stay": "Day room available prior to evening flights",
        "meals": "Breakfast Included",
        "highlights": [
          "Private chauffeured Mercedes transfer to Indira Gandhi International Airport",
          "Airport concierge assistance through luggage check-in and priority departure",
          "Access to the international business lounge prior to departure"
        ],
        "image": "/images/tours/royal-odyssey/day10-delhi-departure.jpg",
        "transit": {
          "type": "none"
        }
      }
    ],
    "inclusions": [
      "VIP arrival and departure fast-track concierge assistance at Delhi (DEL) and Udaipur (UDR) airports",
      "9 nights in premier heritage palace accommodations: The Imperial New Delhi, The Oberoi Amarvilas Agra, Rambagh Palace Jaipur, and Taj Lake Palace Udaipur",
      "Daily gourmet breakfast, 3 curated royal dining experiences, private high tea at Jaipur City Palace, and farewell banquet dinner",
      "Dedicated private chauffeur and executive luxury vehicles (Mercedes-Benz / BMW / Toyota Crysta) for all intercity journeys, city sightseeing, and airport transfers",
      "Internal domestic flights in premium class: Jaipur (JAI) to Udaipur (UDR) and Udaipur (UDR) to New Delhi (DEL)",
      "Private electric golf-cart transfers directly to the VIP gate of the Taj Mahal from The Oberoi Amarvilas",
      "Dawn private viewing of the Taj Mahal with a senior Mughal architectural scholar before public gate opening",
      "Private cycle-rickshaw exploration through the 17th-century Shahjahanabad spice market in Khari Baoli",
      "Private curator-led tour of the 5,000-piece colonial British Raj art collection at The Imperial New Delhi",
      "Exclusive private curator access to the Maharaja's residential apartments (Chandra Mahal) inside Jaipur City Palace",
      "Private sunset positioning at Mehtab Bagh across the Yamuna River overlooking the Taj Mahal",
      "Private ceremonial Mewari boat transfers across Lake Pichola to and from the Taj Lake Palace",
      "Sunset private cruise aboard a 150-year-old ceremonial royal barge on Lake Pichola with live folk musicians",
      "Excursions to UNESCO World Heritage monuments: Humayun's Tomb, Qutub Minar, Agra Fort, Fatehpur Sikri, and Jantar Mantar",
      "Excursion to the 8th-century Chand Baori stepwell in Abhaneri",
      "Full-day chauffeured countryside excursion to Ranakpur Jain Temple, including architectural study of the 1,444 carved marble pillars",
      "Hands-on traditional wooden hand-block printing and natural dye masterclass in Bagru",
      "Mewar court miniature painting studio visit with master craftsmen using single-hair squirrel brushes and stone pigments",
      "All monument entrance fees, camera permissions, archaeological site tickets, boat docking taxes, and local road tolls",
      "24/7 dedicated private concierge service and direct operational support throughout the itinerary"
    ],
    "exclusions": [
      "International roundtrip airfare to and from New Delhi (DEL)",
      "Indian tourist e-Visa fees",
      "Comprehensive personal travel, medical, and cancellation insurance",
      "Discretionary gratuities for private chauffeurs, scholar guides, boatmen, and palace staff",
      "Alcoholic beverages and vintage wines outside of specified curated meals",
      "Personal spa therapies, beauty treatments, and boutique artisan purchases"
    ],
    "accommodations": [
      {
        "name": "The Imperial, New Delhi",
        "location": "New Delhi (Janpath, Lutyens' Delhi)",
        "tier": "Heritage Legend 5-Star",
        "image": "/images/tours/royal-odyssey/day1-delhi-imperial.jpg",
        "description": "Opened in 1936 along Janpath, The Imperial was designed by F.B. Blomfield and served as a regular meeting place for Indian and British leaders before independence. Set within eight acres of gardens in Lutyens' Delhi, the property houses over 5,000 prints, maps, and paintings from the colonial period, including 18th-century Daniell aquatints. Heritage Suites feature high ceilings, Burma teak flooring, Persian rugs, and Italian marble en-suites, with dining options that include The Spice Route and the historic 1911 Bar."
      },
      {
        "name": "The Oberoi Amarvilas, Agra",
        "location": "Agra (Taj East Gate Road)",
        "tier": "Ultra-Luxury 5-Star (Oberoi)",
        "image": "/images/tours/royal-odyssey/day2-agra-amarvilas.jpg",
        "description": "Located just 600 meters from the Taj Mahal, The Oberoi Amarvilas is designed around Moorish and Mughal architecture, with terraced lawns, tiered fountains, and reflection pools. Every guest room and private terrace enjoys direct, unobstructed views of the monument. Premier Rooms are finished with teak armoires, hand-woven Indian fabrics, and white marble bathrooms. Dining at Esphahan features Awadhi specialties served beneath vaulted domes with live santoor music, and private golf carts provide direct access to the monument gates."
      },
      {
        "name": "Rambagh Palace, Jaipur",
        "location": "Jaipur (Bhawani Singh Road)",
        "tier": "Royal Palace 5-Star Heritage (Taj)",
        "image": "/images/tours/royal-odyssey/day3-jaipur-rambagh.jpg",
        "description": "Built in 1835 and later the official residence of Maharaja Sawai Man Singh II and Maharani Gayatri Devi, Rambagh Palace spans 47 acres of Mughal gardens where peacocks roam freely. Palace Rooms and Historical Suites retain period furniture, four-poster beds, and arched jharokha windows. The property is home to Suvarna Mahal, the former royal banquet hall with Italian crystal chandeliers and Florentine ceiling frescoes, alongside the Polo Bar, which showcases royal equestrian memorabilia."
      },
      {
        "name": "Taj Lake Palace, Udaipur",
        "location": "Udaipur (Lake Pichola)",
        "tier": "Floating Heritage Palace 5-Star (Taj)",
        "image": "/images/tours/royal-odyssey/day4-udaipur-pichola.jpg",
        "description": "Commissioned in 1743 by Maharana Jagat Singh II as a summer pleasure palace (Jag Niwas), Taj Lake Palace sits on a natural four-acre rock foundation in the center of Lake Pichola. Reached only by private boat, the white marble structure features open courtyards with lily ponds, cusped arches, and stained-glass windows overlooking the water toward the City Palace. Rooms feature Mewari frescoes, silk bolsters, and carved wood furnishings, with dining at Neel Kamal celebrating regional Rajasthani dishes."
      }
    ]
  },
  {
    "id": "tour-2",
    "slug": "kerala-backwaters-ayurveda-sanctuary",
    "destination_id": "dest-2",
    "destination_name": "Kerala & The Spice Coast",
    "title": "Kerala Sanctuary: Private Houseboats, Spice Hills & Ayurvedic Bliss",
    "subtitle": "Eight days through the spice coast of South India, from historic Fort Kochi and the tea hills of Munnar to private backwater houseboats and classical Ayurvedic therapies on Lake Vembanad.",
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
      "/images/tours/kerala-sanctuary/day3-munnar-eravikulam.jpg",
      "/images/tours/kerala-sanctuary/day4-thekkady-spice.jpg",
      "/images/tours/kerala-sanctuary/day3-alleppey-kettuvallam.jpg",
      "/images/tours/kerala-sanctuary/day7-kumarakom-pool.jpg",
      "/images/tours/kerala-sanctuary/day7-kumarakom-mohiniyattam.jpg",
      "/images/tours/kerala-sanctuary/day8-kerala-departure.jpg"
    ],
    "overview": "From the historic trading ports of the Arabian Sea to the high tea estates of the Western Ghats and the interconnected backwaters of Alleppey, this eight-day journey explores Kerala by road and water at a measured, restful pace.\n\nYou begin in Fort Kochi, walking through 16th-century synagogues, Dutch palaces, and harbor spice godowns before watching the slow, two-hour makeup preparation for an evening Kathakali dance performance. Travel inland into the Western Ghats to stay on a 60-acre working tea and cardamom plantation at 5,200 feet, exploring orthodox tea production and the high grasslands of Eravikulam National Park. In Thekkady, an organic spice botanist guides you through vanilla, pepper, and nutmeg groves, followed by bamboo rafting with indigenous guides inside Periyar Tiger Reserve. The journey transitions to the water aboard a private, crewed Kettuvallam houseboat on the Alleppey canals, culminating at Kumarakom Lake Resort on Lake Vembanad with doctor-guided Ayurvedic treatments including Abhyanga, Shirodhara, and Pizhichil.",
    "highlights": [
      "Kathakali dance performance in Fort Kochi with private access to the traditional two-hour makeup ritual",
      "Single-estate tea sommelier walk and orthodox manufacturing tour at a 5,200-foot Munnar plantation",
      "Botanist-led walk through organic cardamom, pepper, and vanilla groves in Thekkady",
      "Dawn bamboo rafting in Periyar Tiger Reserve accompanied by indigenous Muthuvan trackers",
      "Exclusive charter of a handcrafted Kettuvallam houseboat with private chef, navigating the Alleppey canals",
      "Doctor-guided Ayurvedic consultations and treatments including Abhyanga, Shirodhara, and Pizhichil at Kumarakom",
      "Dawn wooden canoe birding expedition through the Kumarakom Bird Sanctuary with an ornithologist",
      "Private lakeside Mohiniyattam classical dance recital and traditional Malabar seafood feast"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Fort Kochi and Harbor Heritage",
        "location": "Kochi",
        "description": "Arrive at Cochin International Airport, where your private chauffeur meets you for the drive to Brunton Boatyard on the Fort Kochi waterfront. Built on the site of a 19th-century Victorian shipyard, the hotel overlooks the shipping channel where cargo vessels, country craft, and local fishing boats pass into the Arabian Sea. In the afternoon, an architectural historian leads you through the old quarter, visiting the 16th-century Mattancherry Dutch Palace with its mythological murals, the Paradesi Synagogue in Jew Town, and the cantilevered Chinese fishing nets along the waterfront. In the evening, attend a private Kathakali performance at a riverside pavilion. Arrive early for access to the green room, where actors spend two hours applying elaborate natural mineral pigments, rice-paste borders (chutti), and facial contours before taking the stage. Dinner is served at Brunton Boatyard, featuring traditional Malabar coastal seafood and coastal curries.",
        "stay": "Brunton Boatyard, Fort Kochi",
        "meals": "Dinner Included",
        "highlights": [
          "Airport chauffeur transfer to Brunton Boatyard on the Kochi waterfront",
          "Historian-led walk through Mattancherry Palace, Jew Town, and the Chinese fishing nets",
          "Private Kathakali performance with green-room makeup observation"
        ],
        "image": "/images/tours/kerala-sanctuary/day1-kochi-heritage.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 2,
        "title": "Paradesi Synagogue, Spice Warehouses, and Ascent to Munnar",
        "location": "Kochi to Munnar",
        "description": "Spend the morning exploring the spice godowns and antique houses of Jew Town, visiting the 1568 Paradesi Synagogue with its floor of 18th-century hand-painted Chinese willow-pattern tiles and Belgian glass chandeliers. By late morning, begin the drive eastward into the Western Ghats mountain range. As the road climbs through hairpin turns, tropical rubber and coconut groves give way to cool highland air and rolling slopes covered in neatly pruned tea bushes. Arrive at Windermere Estate, a heritage retreat set privately within 60 acres of working tea and cardamom plantations at 5,200 feet. In the late afternoon, join the resident planter on the terrace for a tasting of estate-grown teas, comparing delicate Silver Needle white tea, green infusions, and brisk orthodox black Pekoe served with fresh shortbread.",
        "stay": "Windermere Estate, Munnar",
        "meals": "Breakfast & Estate Dinner",
        "highlights": [
          "Visit to the 1568 Paradesi Synagogue and historic spice trading lanes",
          "Scenic mountain drive climbing into the Western Ghats to 5,200 feet",
          "Guided estate tea tasting overlooking the cardamom hills"
        ],
        "image": "/images/tours/kerala-sanctuary/day2-munnar-plantations.jpg",
        "transit": {
          "type": "drive",
          "duration": "4.0 hrs",
          "route_notes": "Scenic mountain drive via Western Ghats passes to Munnar"
        }
      },
      {
        "day": 3,
        "title": "Tea Factory Processing, Eravikulam Grasslands, and Nilgiri Tahr",
        "location": "Munnar",
        "description": "Begin the morning with an estate planter walking through the tea terraces. Learn how harvesters pluck 'two leaves and a bud' by hand, and see how altitude, morning mist, and soil composition influence leaf quality. At the estate's orthodox factory, observe the full processing sequence: withering, mechanical rolling, oxidation, and wood-fired drying. Enjoy a picnic lunch arranged in a forest clearing surrounded by native ferns and wild cardamom. In the afternoon, your naturalist escorts you into Eravikulam National Park, home to the largest surviving wild population of Nilgiri Tahr. Walk along high-altitude shola grasslands beneath Anamudi, South India's highest peak, observing these agile wild mountain goats grazing on the open granite cliffs. Return to the estate for a quiet evening by the fire.",
        "stay": "Windermere Estate, Munnar",
        "meals": "Breakfast, Forest Picnic Lunch & Dinner",
        "highlights": [
          "Walk through plantation tea terraces and orthodox manufacturing factory",
          "Forest picnic lunch among cardamom groves",
          "Wildlife excursion into Eravikulam National Park to observe the Nilgiri Tahr"
        ],
        "image": "/images/tours/kerala-sanctuary/day3-munnar-eravikulam.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 4,
        "title": "Descent to Thekkady, Organic Spice Groves, and Syrian Christian Cooking",
        "location": "Munnar to Thekkady",
        "description": "Drive south through the Cardamom Hills toward Thekkady, situated along the edge of the Periyar Tiger Reserve. The landscape changes from open tea slopes to dense canopies of teak, bamboo, and wild pepper vines. Check in to Spice Village, an eco-retreat built in the style of indigenous Muthuvan tribal settlements, with hand-thatched elephant grass roofs and stone cottages surrounded by organic gardens. In the afternoon, a botanist guides you through a private 50-acre organic spice estate. Inspect black pepper vines clinging to silver oak trees, green cardamom pods growing at root level, and flowering vanilla orchid vines, learning how spices are harvested and dried. In the evening, join a chef for a private cooking demonstration, preparing traditional Syrian Christian and coastal dishes with freshly crushed spices, coconut milk, and curry leaves.",
        "stay": "Spice Village, Thekkady",
        "meals": "Breakfast & Organic Spice Dinner",
        "highlights": [
          "Drive through the Cardamom Hills to Thekkady",
          "Botanist-led exploration of organic pepper, cardamom, and vanilla plantations",
          "Hands-on Syrian Christian spice cooking masterclass"
        ],
        "image": "/images/tours/kerala-sanctuary/day4-thekkady-spice.jpg",
        "transit": {
          "type": "drive",
          "duration": "3.0 hrs",
          "route_notes": "Drive via Cardamom Hills Highway to Thekkady"
        }
      },
      {
        "day": 5,
        "title": "Periyar Lake Bamboo Rafting and Boarding the Private Houseboat",
        "location": "Thekkady to Alleppey",
        "description": "At dawn, enter Periyar Tiger Reserve for a silent bamboo rafting excursion accompanied by tribal trackers from the indigenous Muthuvan community. Punting quietly along the forested inlets of Periyar Lake, you watch for wild Asian elephants feeding along the grassy banks, Indian bison (gaur), wild otters, and kingfishers perching on half-submerged tree trunks. Return to the lodge for breakfast before driving down to the lowland backwaters of Alleppey. At a private river landing, step aboard your private Kettuvallam houseboat. Handcrafted from anjili hardwood planks tied together with coir rope without nails, the vessel features an air-conditioned cabin, private bath, observation deck, and a dedicated crew of captain, pilot, and private chef. Cruise through narrow canals lined with coconut palms and small village settlements, stopping as your chef prepares lunch: fresh karimeen (pearl spot) fried in coconut oil and wrapped in banana leaves with red Matta rice.",
        "stay": "Private Luxury Houseboat, Alleppey Backwaters",
        "meals": "Breakfast, Houseboat Lunch & Onboard Dinner",
        "highlights": [
          "Early morning bamboo rafting with Muthuvan tribal trackers in Periyar Reserve",
          "Boarding a private handcrafted Kettuvallam houseboat at Alleppey",
          "Cruising palm-shaded rural backwater canals with freshly prepared local meals"
        ],
        "image": "/images/tours/kerala-sanctuary/day3-alleppey-kettuvallam.jpg",
        "transit": {
          "type": "boat",
          "duration": "3.5 hrs drive + 4 hrs boat cruise",
          "route_notes": "Descent to Alleppey followed by private houseboat charter"
        }
      },
      {
        "day": 6,
        "title": "Crossing Lake Vembanad and Ayurvedic Care at Kumarakom Lake Resort",
        "location": "Alleppey to Kumarakom",
        "description": "Wake as village life along the canals begins: local canoes delivering fresh milk, children boarding school ferries, and duck herders steering their flocks with bamboo poles. Enjoy breakfast on the forward deck as the boat navigates into the broad expanse of Lake Vembanad, the longest lake in India. By noon, your houseboat docks directly at the private jetty of Kumarakom Lake Resort. The resort's villas are reconstructed from 16th-century Nalukettu family homes, dismantled from rural villages across Kerala and rebuilt with carved teak rafters and open central courtyards. In the afternoon, meet with the resident Ayurvedic doctor for an initial constitution (dosha) consultation. Begin your wellness treatments with an Abhyanga full-body warm herbal oil massage, followed by Shirodhara, where a rhythmic stream of warm herbal oil flows over the forehead. At sunset, take a private cruise in an open wooden snake boat along the quiet lake channels.",
        "stay": "Kumarakom Lake Resort (Heritage Villa with Private Pool)",
        "meals": "Breakfast & Lakeside Dinner",
        "highlights": [
          "Morning boat crossing of Lake Vembanad",
          "Direct dock arrival at Kumarakom Lake Resort's reconstructed 16th-century heritage villas",
          "Private Ayurvedic doctor consultation, Abhyanga massage, and Shirodhara therapy",
          "Sunset excursion aboard a traditional open snake boat"
        ],
        "image": "/images/tours/kerala-sanctuary/day7-kumarakom-pool.jpg",
        "transit": {
          "type": "boat",
          "duration": "3 hrs backwater crossing",
          "route_notes": "Houseboat cruise across Lake Vembanad to Kumarakom"
        }
      },
      {
        "day": 7,
        "title": "Kumarakom Bird Sanctuary by Canoe and Mohiniyattam Recital",
        "location": "Kumarakom",
        "description": "Board an open wooden canoe at dawn with an ornithologist to explore the mangrove waterways of the Kumarakom Bird Sanctuary. Padded silently under hanging branches, observe resident wetland birds such as the purple heron, egrets, darter, and kingfishers, alongside migratory species including painted storks that winter here. Return to the resort for breakfast overlooking the water. In the afternoon, continue your wellness schedule with a customized Pizhichil therapy, an oil bath treatment where therapists pour warm medicated herbal oil rhythmically across the body to ease joint stiffness and improve circulation. In the evening, gather on the lakeside lawn for a private performance of Mohiniyattam, Kerala's classical dance of the enchantress, characterized by graceful swaying movements, white and gold kasavu dress, and delicate facial expressions. Conclude with a farewell dinner of grilled seafood and traditional coconut-milk payasam.",
        "stay": "Kumarakom Lake Resort",
        "meals": "Breakfast & Farewell Lakeside Dinner",
        "highlights": [
          "Dawn wooden canoe safari through the Kumarakom Bird Sanctuary with an ornithologist",
          "Classical Pizhichil warm-oil therapy session at the Ayurvedic center",
          "Private lakeside performance of Mohiniyattam dance",
          "Farewell Malabar dinner beneath the trees"
        ],
        "image": "/images/tours/kerala-sanctuary/day7-kumarakom-mohiniyattam.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 8,
        "title": "Departure from Cochin International Airport",
        "location": "Kochi",
        "description": "Spend a quiet final morning taking in the views across Lake Vembanad or walking the resort's garden pathways. Following breakfast, your private chauffeur collects you at the lobby for the 1.5-hour drive north to Cochin International Airport. On the way, stop briefly at an artisanal coir workshop or heritage handloom weaving center if flight schedules allow. Your chauffeur assists with luggage at the departures terminal, completing your journey through the spice coast and backwaters of Kerala.",
        "stay": "Departure",
        "meals": "Breakfast Included",
        "highlights": [
          "Morning views over Lake Vembanad",
          "Private chauffeured transfer to Cochin International Airport",
          "Baggage assistance and airport departure coordination"
        ],
        "image": "/images/tours/kerala-sanctuary/day8-kerala-departure.jpg",
        "transit": {
          "type": "drive",
          "duration": "1.5 hrs",
          "route_notes": "Chauffeured drive from Kumarakom to Cochin Airport (COK)"
        }
      }
    ],
    "inclusions": [
      "VIP meet-and-greet arrival assistance with private porterage at Cochin International Airport",
      "7 nights in luxury heritage accommodations: Brunton Boatyard (Fort Kochi), Windermere Estate (Munnar), Spice Village (Thekkady), and Kumarakom Lake Resort Heritage Villa",
      "24-hour exclusive charter of a private handcrafted Kettuvallam houseboat with captain, pilot, and private chef",
      "Dedicated private chauffeur and air-conditioned executive vehicle throughout all road transfers in Kerala",
      "Historian-led walking tour of Fort Kochi, including the 1568 Paradesi Synagogue and Mattancherry Palace",
      "Private VIP Kathakali dance performance with green-room access to observe the two-hour mineral makeup ritual",
      "Resident planter-led walk through working tea terraces and orthodox processing factory at Windermere Estate",
      "Guided single-estate tea tasting of Silver Needle, green, and orthodox black teas",
      "Botanist-guided exploration of a 50-acre organic spice estate in Thekkady",
      "Private Syrian Christian culinary masterclass with estate chefs in Thekkady",
      "Dawn bamboo rafting and wildlife walk in Periyar Tiger Reserve with indigenous Muthuvan trackers",
      "All freshly cooked meals on board the private houseboat, featuring regional Malabar and backwater specialties",
      "Personalized Ayurvedic doctor consultation at Kumarakom Lake Resort",
      "Classical Ayurvedic therapy sessions including Abhyanga herbal oil massage, Shirodhara, and Pizhichil",
      "Private sunset cruise aboard an open wooden snake boat on Lake Vembanad",
      "Dawn wooden canoe safari through the Kumarakom Bird Sanctuary with an expert ornithologist",
      "Private lakeside Mohiniyattam classical dance recital during the farewell dinner",
      "All national park permits, bird sanctuary admissions, monument entrance tickets, and boat landing levies",
      "24/7 private concierge support and operational coordination throughout the journey"
    ],
    "exclusions": [
      "International and domestic flights to and from Cochin International Airport (COK)",
      "Indian tourist e-Visa fees",
      "Comprehensive personal travel, medical, and cancellation insurance",
      "Discretionary gratuities for private chauffeurs, guides, boatmen, and resort staff",
      "Alcoholic beverages and personal bar items",
      "Elective spa and salon treatments outside the specified Ayurvedic sessions"
    ],
    "accommodations": [
      {
        "name": "Brunton Boatyard",
        "location": "Fort Kochi",
        "tier": "Heritage 5-Star",
        "image": "/images/tours/kerala-sanctuary/day1-kochi-heritage.jpg",
        "description": "Built on the site of a 19th-century Victorian shipyard, Brunton Boatyard reflects the Dutch, Portuguese, and British colonial influences of Kochi's maritime past. Sea-facing rooms overlook the active harbor channel where cargo ships and local fishing boats pass into the Arabian Sea. The property is decorated with antique nautical artifacts, terracotta tile floors, and punkah fans, with dining at History celebrating traditional community recipes of Kochi."
      },
      {
        "name": "Windermere Estate",
        "location": "Munnar",
        "tier": "Boutique Plantation Luxury",
        "image": "/images/tours/kerala-sanctuary/day2-munnar-plantations.jpg",
        "description": "Set within 60 acres of working tea and cardamom plantations at 5,200 feet in the Western Ghats, Windermere Estate is an intimate planter retreat. Rooms in the Planter's Villa and Garden Cottages feature cedar wood beams, wrap-around verandahs, and period furniture, looking out over rows of manicured tea slopes. The property is known for personalized planter hospitality, fireside dinners, and guided estate walks."
      },
      {
        "name": "Private Luxury Kettuvallam Houseboat",
        "location": "Alleppey Backwaters",
        "tier": "Exclusive 24-Hour Charter",
        "image": "/images/tours/kerala-sanctuary/day3-alleppey-kettuvallam.jpg",
        "description": "Constructed using traditional boatbuilding methods, this private luxury Kettuvallam is crafted from anjili timber planks bound with coir ropes and coated with cashew-nut resin. The vessel features an air-conditioned cabin, private bathroom, open-air sun deck, and upper observation deck. A private crew of three (captain, pilot, and chef) manages the boat, preparing regional dishes like karimeen pollichathu with ingredients sourced from waterside markets along the canal."
      },
      {
        "name": "Kumarakom Lake Resort",
        "location": "Kumarakom",
        "tier": "Luxury Ayurvedic Heritage Resort",
        "image": "/images/destinations/kerala/hero.jpg",
        "description": "Located along the eastern shore of Lake Vembanad, Kumarakom Lake Resort is built with traditional Nalukettu family homesteads dating to the 16th century, carefully dismantled from villages across Kerala and reassembled on site. Heritage Villas feature private plunge pools, open-air courtyards, and teakwood decks. The resort's Ayurvedic center provides doctor-guided therapies in classical Panchakarma settings."
      }
    ]
  },
  {
    "id": "tour-3",
    "slug": "ladakh-high-himalayas-expedition",
    "destination_id": "dest-3",
    "destination_name": "Ladakh & High Himalayas",
    "title": "Himalayan High Passes: Monasteries, Glacial Valleys & Luxury Glamping",
    "subtitle": "Nine days across the high-altitude desert of Ladakh, from 17th-century palaces and monastic dawn chants in Leh, across Khardung La into the Nubra Valley, to the shore of Pangong Tso at 14,270 feet.",
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
      "/images/tours/himalayan-expedition/day1-leh-acclimatization.jpg",
      "/images/tours/himalayan-expedition/day2-leh-palace.jpg",
      "/images/tours/himalayan-expedition/day3-thiksey-monastery.jpg",
      "/images/tours/himalayan-expedition/day4-khardungla-pass.jpg",
      "/images/tours/himalayan-expedition/day5-hunder-bactrian.jpg",
      "/images/tours/himalayan-expedition/day6-pangong-lake.jpg",
      "/images/tours/himalayan-expedition/day7-changthang-plateau.jpg",
      "/images/tours/himalayan-expedition/day8-indus-zanskar-sangam.jpg",
      "/images/tours/himalayan-expedition/day9-leh-flight-departure.jpg"
    ],
    "overview": "Set between the Great Himalaya and the Karakoram ranges, Ladakh is a high-altitude desert plateau defined by glaciated passes, ancient Tibetan Buddhist gompas, and river valleys that once carried central Asian caravan trade.\n\nThis nine-day private expedition moves across the region at a measured pace designed for proper altitude adjustment. You begin in Leh at 11,500 feet, taking time to acclimatize at The Grand Dragon before visiting the 17th-century Leh Palace, observing dawn prayers with telescoping copper horns at Thiksey Monastery, and examining 11th-century Buddhist frescoes at Alchi. Travel north across the Khardung La pass at 17,582 feet into the Nubra Valley, where apricot orchards and sand dunes frame double-humped Bactrian camels, with an optional visit to the border village of Turtuk. The journey continues along the remote Shyok River route to Pangong Tso, a 134-kilometer lake sitting at 14,270 feet across the Tibetan border, staying in heated lakeside yurts before returning to Leh across the Chang La pass.",
    "highlights": [
      "Pre-dawn prayer ceremony at Thiksey Monastery, listening to monks sound the copper dungchen horns and chants",
      "Crossing Khardung La pass at 17,582 feet in a heated, climate-controlled 4x4 with a veteran mountain driver",
      "Bactrian two-humped camel ride through the high-altitude sand dunes of Hunder in Nubra Valley",
      "Visit to Turtuk, India's northernmost village, known for its distinct Balti culture and stone apricot orchards",
      "Lakeside stay in insulated, heated yurts at Pangong Tso at 14,270 feet with uninterrupted mountain views",
      "Private study of the 11th-century Indo-Tibetan wall frescoes inside Alchi Choskor in the Sham Valley",
      "Observing the confluence of the green Zanskar and silt-laden Indus rivers at Nimmu",
      "Stargazing under unpolluted night skies across the high plateaus of Nubra and Pangong"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Flight into Leh and Altitude Acclimatization",
        "location": "Leh",
        "description": "The journey begins with an early morning flight from Delhi over the snowbound ridges of the Great Himalaya, descending into Kushok Bakula Rimpochee Airport in Leh at 11,500 feet. You are met on the tarmac with a traditional silk Khatak scarf and transferred by private 4x4 to The Grand Dragon Ladakh. Because rapid ascent to high altitude requires careful physiological adjustment, the first day is dedicated entirely to rest. The hotel's on-site medical staff checks your blood oxygen levels with a pulse oximeter and sets up supplemental oxygen in your suite if desired. Meals are light and hydrating, featuring fresh apricot juice, hot ginger-lemon tea, and traditional thukpa soup, with views of the snow-capped Stok Kangri range from your window.",
        "stay": "The Grand Dragon Ladakh (Royal Suite)",
        "meals": "Dinner Included",
        "highlights": [
          "Himalayan mountain views on the flight from Delhi into Leh",
          "Traditional Ladakhi silk Khatak welcome",
          "Medical pulse-oximeter check and rest day for altitude acclimatization"
        ],
        "image": "/images/tours/himalayan-expedition/day1-leh-acclimatization.jpg",
        "transit": {
          "type": "flight",
          "duration": "1h 15m",
          "route_notes": "Morning flight from Delhi (DEL) to Leh (IXL)"
        }
      },
      {
        "day": 2,
        "title": "Leh Palace, Shanti Stupa, and Old Bazaar Alleys",
        "location": "Leh",
        "description": "Following a quiet morning to complete your 24-hour acclimatization, a Ladakhi cultural scholar accompanies you on a walking exploration of Leh. Begin at the 17th-century Leh Palace, a nine-story stone and timber citadel built by King Sengge Namgyal that towers above the old town in a style closely resembling the Potala Palace in Lhasa. Walk through the royal prayer rooms and wooden balconies for sweeping views over the Indus Valley. Down in the valley, wander through the historic Leh Bazaar, where trade caravans from Yarkand, Tibet, and Kashmir once exchanged pashmina wool, turquoise, tea bricks, and silk. In the late afternoon, drive up to the white-domed Shanti Stupa on Changspa hill to watch the sunset cast long shadows across the valley. Dinner at the hotel introduces regional Ladakhi dishes alongside North Indian specialties.",
        "stay": "The Grand Dragon Ladakh",
        "meals": "Breakfast & Dinner",
        "highlights": [
          "Guided visit through the 17th-century royal apartments of Leh Palace",
          "Walk through the historic bazaar lanes of Leh",
          "Sunset panorama of the Indus Valley from Shanti Stupa"
        ],
        "image": "/images/tours/himalayan-expedition/day2-leh-palace.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 3,
        "title": "Dawn Chants at Thiksey and Monastic Art at Hemis",
        "location": "Leh",
        "description": "Depart before sunrise for the 30-minute drive down the Indus Valley to Thiksey Monastery, a multi-tiered complex of temples and monk quarters rising above a rocky hillside. Enter the main prayer hall as the morning puja begins with the sounding of copper telescoping horns (dungchen), cymbals, and low resonant chanting. Sit quietly near the butter lamps while monks serve warm butter tea. Afterward, visit the monastery's two-story clay statue of the Maitreya Buddha, consecrated in 1980. Drive farther upriver to Hemis Monastery, established in the 1630s and historically the wealthiest gompa in Ladakh, where you view its museum collection of centuries-old thangka scroll paintings and gilded bronze statues. Enjoy a quiet riverside lunch in a shaded willow grove along the Indus before returning to Leh for the afternoon.",
        "stay": "The Grand Dragon Ladakh",
        "meals": "Breakfast, Riverside Picnic Lunch & Dinner",
        "highlights": [
          "Early morning attendance at the Thiksey Monastery prayer ceremony with dungchen horns",
          "Inspection of the 30-foot gold-leaf Maitreya Buddha at Thiksey",
          "Museum visit at Hemis Monastery to view historic thangkas and bronze sculptures"
        ],
        "image": "/images/tours/himalayan-expedition/day3-thiksey-monastery.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 4,
        "title": "Crossing Khardung La Pass into the Nubra Valley",
        "location": "Leh to Nubra Valley",
        "description": "Set out by private 4x4 for the drive north across the Ladakh Range. The road climbs steadily through switchbacks, passing alpine grazing pastures and glacial moraines until reaching the summit of Khardung La at 17,582 feet. Pause briefly at the pass to observe prayer flag arches fluttering against the Karakoram horizon before starting the long descent into the Nubra Valley. Known historically as Ldumra (the Valley of Flowers), Nubra sits at a lower altitude of approximately 10,000 feet, where glacier-fed streams support groves of sea buckthorn, blooming roses, and green barley fields. Arrive at Chamba Camp in Diskit, where luxury safari tents are fitted with four-poster beds, private bathrooms, and covered verandahs looking out toward the mountains. Dine outdoors beneath unpolluted night skies.",
        "stay": "Chamba Camp Diskit by TUTC (Luxury Suite Tent)",
        "meals": "Breakfast, Picnic Lunch & Camp Dinner",
        "highlights": [
          "Drive over the 17,582-foot Khardung La mountain pass",
          "Descent into the greener, lower-altitude landscapes of the Nubra Valley",
          "Check-in to luxury heated glamping tents with private mountain views"
        ],
        "image": "/images/tours/himalayan-expedition/day4-khardungla-pass.jpg",
        "transit": {
          "type": "drive",
          "duration": "4.5 hrs",
          "route_notes": "Mountain drive across Khardung La (17,582 ft) in private 4x4"
        }
      },
      {
        "day": 5,
        "title": "Hunder Sand Dunes, Diskit Monastery, and Turtuk Village",
        "location": "Nubra Valley",
        "description": "Early morning at the Hunder Sand Dunes, an unusual cold-desert formation where fine sand sits against snowcapped granite peaks. Mount a double-humped Bactrian camel, a heritage breed originally brought to Ladakh along the Karakoram caravan trails from Central Asia, for a gentle ride across the dunes in the morning light. After breakfast, visit the 14th-century Diskit Monastery to stand before its 106-foot statue of the Maitreya Buddha, consecrated by the Dalai Lama in 2010. Continue westward along the Shyok River toward Turtuk, a village located near the Line of Control that was opened to visitors in 2010. Turtuk's inhabitants belong to the Balti ethnic group and speak an archaic dialect of Tibetan with Persian loanwords. Walk through stone-walled lanes shaded by apricot trees, visit a traditional watermill, and enjoy a lunch of Balti specialties including fresh walnut paste and buckwheat pancakes before returning to camp.",
        "stay": "Chamba Camp Diskit by TUTC",
        "meals": "Breakfast, Traditional Balti Lunch & Camp Dinner",
        "highlights": [
          "Morning Bactrian camel ride across the cold-desert dunes of Hunder",
          "Visit to Diskit Monastery and the 106-foot Maitreya Buddha statue",
          "Cultural walk and traditional lunch in the border village of Turtuk"
        ],
        "image": "/images/tours/himalayan-expedition/day5-hunder-bactrian.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 6,
        "title": "The Shyok River Route to Pangong Tso",
        "location": "Nubra Valley to Pangong Tso",
        "description": "Depart camp and head east along the rugged Agham-Shyok road, which follows the gorge of the Shyok River. The route winds through sheer granite canyon walls and across rocky riverbeds, offering an unvarnished look at the geological forces that shaped the Trans-Himalaya. Stop for an expedition lunch in a quiet river valley before the gorge opens to reveal the turquoise waters of Pangong Tso. Sitting at 14,270 feet, this 134-kilometer lake spans the border between India and western Tibet. Check into Pangong Hermitage, where insulated yurt-style tents are equipped with heating, electric blankets, and private bathrooms right by the shore. In the late afternoon, sit by the water as the fading sunlight changes the lake surface from bright turquoise to cobalt and deep indigo.",
        "stay": "Pangong Hermitage Premium Camp (Lakeside Yurt Suite)",
        "meals": "Breakfast, Expedition Lunch & Camp Dinner",
        "highlights": [
          "Scenic drive along the rugged canyon of the Shyok River",
          "First view of the 134-kilometer Pangong Tso at 14,270 feet",
          "Sunset lakeside tea observing the changing water hues against Tibetan peaks"
        ],
        "image": "/images/tours/himalayan-expedition/day6-pangong-lake.jpg",
        "transit": {
          "type": "drive",
          "duration": "5.5 hrs",
          "route_notes": "Scenic overland drive via the Agham-Shyok river corridor"
        }
      },
      {
        "day": 7,
        "title": "Sunrise on the Lake, Chang La Pass, and Return to Leh",
        "location": "Pangong to Leh",
        "description": "Step outside before dawn to watch the first light illuminate the ridgelines across Pangong Tso. The calm morning water reflects the mountains with mirror clarity before a breeze ripples the surface into brilliant blue. After breakfast, begin the 150-kilometer drive back to Leh. The road climbs across the Changthang plateau, a high-altitude grazing ground where you may see herds of domestic Pashmina goats guarded by Changpa nomads, alongside wild Tibetan ass (kiang). Cross Chang La pass at 17,586 feet before winding down into the upper Indus Valley. Arrive back in Leh by late afternoon and check back in to The Grand Dragon Ladakh, where you can relax with a warm foot bath and a quiet evening.",
        "stay": "The Grand Dragon Ladakh",
        "meals": "Breakfast, En-Route Lunch & Dinner",
        "highlights": [
          "Dawn light over Pangong Tso from the camp terrace",
          "Wildlife sightings of wild Tibetan ass (kiang) on the Changthang plateau",
          "High-altitude crossing of Chang La pass at 17,586 feet"
        ],
        "image": "/images/tours/himalayan-expedition/day7-changthang-plateau.jpg",
        "transit": {
          "type": "drive",
          "duration": "5.5 hrs",
          "route_notes": "Overland drive from Pangong Tso to Leh via Chang La pass"
        }
      },
      {
        "day": 8,
        "title": "11th-Century Murals at Alchi and the Indus-Zanskar Confluence",
        "location": "Leh",
        "description": "Spend your final full day in Ladakh exploring the lower Sham Valley along the Indus River west of Leh. Drive through the river gorge to Nimmu, pausing at an elevated viewpoint to observe the confluence (Sangam) of the clear, green Zanskar River and the darker, silt-bearing Indus. Continue to Alchi Choskor, a monastic enclave founded in the 11th century by the great translator Rinchen Zangpo. Unlike Ladakh's hilltop fortress monasteries, Alchi sits in a village courtyard by the river. Inside the Dukhang and Sumtsek temples are remarkable Kashmiri-influenced Buddhist wall paintings, wood carvings, and mandalas that have survived untouched for nearly a thousand years. Return to Leh in the late afternoon for a farewell dinner featuring regional cuisine.",
        "stay": "The Grand Dragon Ladakh",
        "meals": "Breakfast, Valley Lunch & Farewell Dinner",
        "highlights": [
          "Viewpoint stop at the confluence of the Zanskar and Indus rivers at Nimmu",
          "Guided visit to Alchi Monastery to view 11th-century Kashmiri-Buddhist wall murals",
          "Farewell dinner of traditional Ladakhi and North Indian dishes"
        ],
        "image": "/images/tours/himalayan-expedition/day8-indus-zanskar-sangam.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 9,
        "title": "Morning Flight from Leh to New Delhi",
        "location": "Leh",
        "description": "Enjoy an early breakfast at the hotel, with a final view of the morning sun lighting the Stok Kangri peaks. Your private chauffeur transfers you to Kushok Bakula Rimpochee Airport for your morning flight over the Himalayas back to Delhi. From the air, watch the glaciated peaks give way to the green foothills and northern plains, concluding nine days through the high passes and monasteries of Ladakh.",
        "stay": "Departure",
        "meals": "Breakfast Included",
        "highlights": [
          "Final morning views of the Stok Kangri mountain range",
          "Private chauffeur transfer to Leh Airport",
          "Morning mountain flight from Leh to Delhi"
        ],
        "image": "/images/tours/himalayan-expedition/day9-leh-flight-departure.jpg",
        "transit": {
          "type": "flight",
          "duration": "1h 15m",
          "route_notes": "Return flight from Leh (IXL) to Delhi (DEL)"
        }
      }
    ],
    "inclusions": [
      "Round-trip domestic flights between Delhi and Leh in premium class",
      "VIP arrival meet-and-greet with private luggage assistance at Leh Airport",
      "8 nights in premier accommodations: The Grand Dragon Ladakh, Chamba Camp Diskit by TUTC, and Pangong Hermitage",
      "All meals throughout the journey, including hotel dining and tailored expedition picnics",
      "Dedicated private climate-controlled 4x4 Toyota Fortuner with an experienced mountain driver",
      "Private English-speaking Ladakhi scholar-guide throughout the itinerary",
      "On-call medical support in Leh with daily pulse-oximeter health monitoring",
      "Supplemental oxygen equipment in private vehicles and hotel suites",
      "All Inner Line Permits (ILP) and environmental fees for Nubra Valley and Pangong Tso",
      "All monastery entrance fees, wildlife sanctuary admissions, and local donations",
      "Private Bactrian camel ride across the Hunder Sand Dunes",
      "Entry and access for the morning prayer ceremony at Thiksey Monastery",
      "Guided village walk and traditional meal in Turtuk",
      "Guided art historical visit to the 11th-century Alchi Monastery complex",
      "Stargazing sessions with high-powered binoculars under unpolluted high-altitude skies",
      "Complimentary hydration drinks, mineral water, and emergency travel kit in the vehicle",
      "24/7 private concierge support and operational assistance throughout the journey"
    ],
    "exclusions": [
      "International flights to and from New Delhi (DEL)",
      "Mandatory personal high-altitude travel, medical, and evacuation insurance",
      "Indian tourist e-Visa fees",
      "Discretionary gratuities for mountain drivers, scholar guides, camp staff, and monastery attendants",
      "Alcoholic beverages and personal bar expenses",
      "Elective spa treatments outside the standard wellness services",
      "Personal camera permits where required by individual monasteries"
    ],
    "accommodations": [
      {
        "name": "The Grand Dragon Ladakh",
        "location": "Leh",
        "tier": "Luxury 5-Star Heritage Hotel",
        "image": "/images/tours/himalayan-expedition/day1-leh-palace.jpg",
        "description": "The premier permanent hotel in Leh, featuring centralized heating, double-glazed panoramic windows, and oxygen-enriched rooms with pulse-oximeter monitoring. Royal Suites look out toward the 20,187-foot Stok Kangri mountain peak. Solar-assisted underfloor heating, carved stone details, and hand-knotted Tibetan carpets provide a warm retreat at 11,500 feet, with restaurants serving both traditional Ladakhi dishes and international fare."
      },
      {
        "name": "Chamba Camp Diskit by TUTC",
        "location": "Nubra Valley",
        "tier": "Luxury Himalayan Glamping",
        "image": "/images/tours/himalayan-expedition/chamba-camp-diskit.jpg",
        "description": "Operated by The Ultimate Travelling Camp, this seasonal glamping retreat in the Nubra Valley features luxury canvas tents with four-poster beds, campaign-style furnishings, and private en-suite bathrooms with hot water showers. Private wooden verandahs face the surrounding mountain slopes, while an on-site culinary team prepares meals using organic ingredients grown in local orchards."
      },
      {
        "name": "Pangong Hermitage",
        "location": "Pangong Tso Lakeshore",
        "tier": "High-Altitude Wilderness Camp",
        "image": "/images/destinations/ladakh/pangong-lake-azure.jpg",
        "description": "Because permanent building is restricted to protect Pangong's sensitive shoreline, this eco-camp provides an insulated way to stay by the water at 14,270 feet. Heated yurt-style tents include electric blankets, private bathrooms, and supplemental oxygen. Outdoor seating on the private deck faces west across the lake, capturing the shifting colors of the water as the sun sets over the surrounding ridges."
      },
      {
        "name": "Lchang Nang Retreat",
        "location": "Nubra Valley (Alternative)",
        "tier": "Eco-Boutique Luxury Wilderness Retreat",
        "image": "/images/tours/himalayan-expedition/lchang-nang-retreat.jpg",
        "description": "Set within organic apricot and willow orchards in Hunder, Lchang Nang is an eco-conscious boutique retreat powered by solar energy. Stone-and-timber cottages feature local poplar woodwork, underfloor heating, and private gardens, with meals created from estate-grown produce and regional grains."
      }
    ]
  },
  {
    "id": "tour-4",
    "slug": "ranthambore-tiger-safari-expedition",
    "destination_id": "dest-5",
    "destination_name": "Central India & Wildlife",
    "title": "The Royal Tiger Sanctuary & Wilderness Expedition",
    "subtitle": "Seven days of private wildlife exploration, tracking the Royal Bengal tiger through Ranthambore's forest ruins, cruising the Chambal River for rare gharials, and concluding at Jaipur's historic Rambagh Palace.",
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
      "/images/tours/sovereign-wild/day2-sujan-sher-bagh.jpg",
      "/images/tours/sovereign-wild/day3-padam-talao-safari.jpg",
      "/images/tours/sovereign-wild/day4-ranthambore-fort.jpg",
      "/images/tours/sovereign-wild/day5-chambal-sanctuary.jpg",
      "/images/tours/sovereign-wild/day6-jaipur-rambagh.jpg",
      "/images/tours/sovereign-wild/day7-jaipur-chandra-mahal.jpg"
    ],
    "overview": "In the dry deciduous forests of southeastern Rajasthan, Ranthambore preserves an extraordinary convergence of natural history and medieval architecture. Royal Bengal tigers navigate the perimeter walls of 10th-century Chauhan fortresses, while marsh mugger crocodiles bask along the lake margins of Padam Talao and Rajbagh. Led by a dedicated senior naturalist with decades of field tracking experience across Core Zones 1 through 5, each morning and late-afternoon drive is conducted in a private open-top 4x4 Gypsy. Accommodations center on the Edwardian campaign aesthetic of Suján Sher Bagh, a Relais & Châteaux property of twelve hand-stitched canvas tents, or the private walled enclosures of The Oberoi Vanyavilas. Beyond the tiger reserve, a river safari on the protected Chambal River reveals critically endangered gharials and South Asian river dolphins, before the expedition concludes with two nights at Rambagh Palace in Jaipur.",
    "highlights": [
      "Four private open-top 4x4 Gypsy game drives across Ranthambore Core Zones 1 through 5 with a dedicated senior naturalist",
      "Private motorized river safari on the National Chambal Sanctuary to observe gharials, river dolphins, and Red-crowned roof turtles",
      "Luxury tented stay at Suján Sher Bagh, featuring 1920s campaign furniture, private plunge pools, and nightly campfire dining",
      "Guided exploration of the 10th-century UNESCO Ranthambore Hill Fort, overlooking lakes and forest canopies",
      "Two nights at Rambagh Palace in Jaipur, the former residence of Maharaja Sawai Man Singh II and Maharani Gayatri Devi",
      "Exclusive curator-arranged access to the private Chandra Mahal residential wing of City Palace, Jaipur"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Delhi: The Capital Launchpad",
        "location": "Delhi",
        "description": "Arrive at Indira Gandhi International Airport, met at the aerobridge by our airport representative for expedited immigration and customs clearance before meeting your private chauffeur. Transfer by luxury sedan (BMW 7-Series or Mercedes S-Class) to The Oberoi, New Delhi, situated on Dr. Zakir Hussain Road overlooking the Delhi Golf Club and Humayun's Tomb in Lutyens' Delhi. Settle into your Premier Plus suite overlooking the fairways. In the evening, your chauffeur escorts you to Indian Accent at The Lodhi, where chef Manish Mehrotra's pioneering tasting menu presents inventive interpretations of regional Indian flavors, featuring courses such as winter daulat ki chaat with black truffle and tender Galawati kebabs. The evening serves as a restful introduction before traveling south into Rajasthan's wilderness.",
        "stay": "The Oberoi, New Delhi (Premier Plus Suite)",
        "meals": "Tasting Menu Dinner at Indian Accent",
        "highlights": [
          "Expedited airport assistance and private luxury sedan transfer",
          "Welcome tasting menu dinner at Indian Accent",
          "Overnight stay at The Oberoi, New Delhi overlooking the Delhi Golf Club"
        ],
        "image": "/images/tours/sovereign-wild/day1-delhi-safari-transit.jpg",
        "transit": {
          "type": "drive",
          "duration": "45 min",
          "route_notes": "Private luxury sedan transfer from Delhi IGI Airport to The Oberoi"
        }
      },
      {
        "day": 2,
        "title": "Rail Journey to Sawai Madhopur & Arrival at Suján Sher Bagh",
        "location": "Ranthambore",
        "description": "Following breakfast at The Oberoi, your private concierge escorts you to New Delhi Railway Station to board the first-class executive carriage of the Kota Jan Shatabdi or Vande Bharat Express to Sawai Madhopur. The four-and-a-half-hour rail journey crosses the agricultural plains of Haryana and eastern Rajasthan. Upon arrival at Sawai Madhopur junction, your senior naturalist and private camp vehicle await on the platform. A short drive through rural farmland and thorn-scrub forest brings you to Suján Sher Bagh, a pioneering Relais & Châteaux tented camp bordering the national park. Styled in the tradition of 1920s safari encampments, the twelve white canvas tents feature Edwardian rosewood campaign chests, brass fittings, private verandas, and stone-tiled outdoor showers. In the late afternoon, your naturalist reviews topography maps, recent territory movements across Core Zones 1 to 5, and tiger identification records during a private briefing. The evening unfolds beside the central campfire with traditional Rajasthani folk musicians and a four-course dinner prepared from the camp's organic vegetable garden.",
        "stay": "Suján Sher Bagh (Royal Campaign Suite)",
        "meals": "Breakfast, Camp Lunch & Fireside Dinner",
        "highlights": [
          "First-class executive rail journey from New Delhi to Sawai Madhopur",
          "Arrival at Suján Sher Bagh, an intimate Relais & Châteaux tented retreat",
          "Orientation and territory movement briefing with your senior naturalist"
        ],
        "image": "/images/tours/sovereign-wild/day2-sujan-sher-bagh.jpg",
        "transit": {
          "type": "train",
          "duration": "4.5 hrs",
          "route_notes": "First Class Executive Rail from New Delhi to Sawai Madhopur"
        }
      },
      {
        "day": 3,
        "title": "Core Zone Safaris: Dawn Tracking & Padam Talao",
        "location": "Ranthambore",
        "description": "An early morning call at 5:30 AM is accompanied by hot French press coffee, fresh pastries, and fleece-lined blankets in your private open-top 4x4 Gypsy. Entry permits are registered for Core Zone 2 or Zone 3 as the forest gates open at sunrise. Your naturalist and tracker analyze the road for overnight signs: fresh pugmarks along the tire ruts, alarm barks from chital deer and northern plains gray langurs, and fresh scrape marks on dhok trees (Anogeissus pendula). Zone 3 centers on Padam Talao, Rajbagh, and Malik Talao, three interconnected lakes framed by 10th-century stone hunting pavilions and giant banyan trees. Marsh mugger crocodiles bask on the sand spits while herds of sambar deer feed in the lily shallows. These lakes form the core territory of resident tigresses, descended from the famed matriarch Machali. Return to camp by mid-morning for a farm-to-table brunch under the neem trees, followed by time to rest or swim. At 3:00 PM, embark on your afternoon game drive into Zone 4, focusing on the dense ravines and perennial stream beds favored by leopards, sloth bears, and Indian striped hyenas before sunset.",
        "stay": "Suján Sher Bagh",
        "meals": "Breakfast, Farm Brunch & Multi-Course Camp Dinner",
        "highlights": [
          "Two private 4x4 game drives in Core Zones 2, 3, or 4 with senior naturalist",
          "Tracking Bengal tigers along the lake margins of Padam Talao and Rajbagh",
          "Observation of marsh crocodiles, sambar deer herds, and birdlife among medieval ruins"
        ],
        "image": "/images/tours/sovereign-wild/day3-padam-talao-safari.jpg",
        "transit": {
          "type": "safari",
          "duration": "Morning Safari (3.5 hrs) + Afternoon Safari (3.5 hrs)"
        }
      },
      {
        "day": 4,
        "title": "Zone 5 Wilderness Drive & 10th-Century Ranthambore Hill Fort",
        "location": "Ranthambore",
        "description": "Set out at dawn into Zone 5, known for its steep rocky escarpments, deep nullahs (seasonal stream gorges), and dramatic sandstone cliffs beneath the fort walls. This rugged terrain provides prime territory for dominant male tigers and solitary leopards that hunt along the cliff crevices. Your naturalist examines claw markings on arjun trees and explains the territorial dynamics and camera-trap monitoring protocols used across the 1,334-square-kilometer reserve. Returning to camp for lunch, the midday heat gives way to an afternoon ascent of Ranthambore Fort, a UNESCO World Heritage site founded in 944 AD by the Nagil Jats and expanded by Chauhan Rajputs. Rising 700 feet on an isolated plateau, the citadel preserves massive stone gates, stepwells, the Hammir Palace ruins, and the active 10th-century Trinetra Ganesha Temple, where thousands of wedding invitations arrive daily by post from across India seeking divine blessings. From the western ramparts, take in panoramic views stretching across Padam Talao and the vast expanse of dry deciduous forest below. Return to camp for an open-hearth dinner prepared over wood embers.",
        "stay": "Suján Sher Bagh",
        "meals": "Breakfast, Lunch & Open-Hearth Camp Dinner",
        "highlights": [
          "Morning safari in the rugged sandstone ravines of Core Zone 5",
          "Private historian walk through the 10th-century UNESCO Ranthambore Hill Fort",
          "Trinetra Ganesha Temple visit and sweeping rampart views over the jungle canopy"
        ],
        "image": "/images/tours/sovereign-wild/day4-ranthambore-fort.jpg",
        "transit": {
          "type": "safari",
          "duration": "Morning Safari (3.5 hrs) + Afternoon Fort Excursion (3 hrs)"
        }
      },
      {
        "day": 5,
        "title": "National Chambal Sanctuary: River Safari for Gharials & Dolphins",
        "location": "Ranthambore",
        "description": "Depart after an early breakfast for a scenic 90-minute private drive southeast to the National Chambal Sanctuary, located at the tri-junction of Rajasthan, Madhya Pradesh, and Uttar Pradesh. The Chambal is one of northern India's cleanest and least disturbed river ecosystems, protected under federal law as a dedicated aquatic sanctuary. Board a private motorized riverboat with an aquatic biologist to navigate between dramatic 50-foot clay bluffs and gravel sandbanks. The sanctuary is the primary global refuge for the critically endangered gharial (Gavialis gangeticus), an ancient, narrow-snouted crocodilian that can grow beyond five meters in length. You will also look for marsh muggers, the critically endangered Red-crowned roof turtle (Batagur kachuga), and the elusive Ganges river dolphin (Platanista gangetica), which surfaces briefly to breathe with an audible blow. Birdlife is abundant, including Indian skimmers, bar-headed geese, and black-bellied terns. Enjoy a curated picnic lunch prepared by Sher Bagh's culinary team on a shaded river embankment before driving back to camp. The evening features an intimate farewell dinner served beneath canopies of wild trees lit by hurricane lanterns.",
        "stay": "Suján Sher Bagh",
        "meals": "Breakfast, Riverside Picnic Lunch & Lantern-Lit Jungle Dinner",
        "highlights": [
          "Private boat safari on the protected waters of the National Chambal Sanctuary",
          "Up-close sightings of critically endangered gharials, river turtles, and river dolphins",
          "Riverside field lunch and lantern-lit farewell dinner in the wilderness"
        ],
        "image": "/images/tours/sovereign-wild/day5-chambal-sanctuary.jpg",
        "transit": {
          "type": "drive",
          "duration": "90 min each way",
          "route_notes": "Private 4x4 SUV drive between Ranthambore and the Chambal River"
        }
      },
      {
        "day": 6,
        "title": "Drive to Jaipur: Arrival at Rambagh Palace & Bazaars",
        "location": "Jaipur",
        "description": "Enjoy a relaxed morning at Sher Bagh, walking the camp's organic vegetable beds or sampling fresh honey from local hives before departing by private air-conditioned vehicle for Jaipur, a three-and-a-half-hour drive northwest across the Rajasthan countryside. Arrive in the Pink City and check into Rambagh Palace, set within 47 acres of landscaped Mughal gardens. Originally built in 1835 and expanded into the official royal residence of Maharaja Sawai Man Singh II and Maharani Gayatri Devi, the palace is now maintained by Taj Hotels. Check into your Grand Luxury Suite, adorned with arched marble doorways, antique canopied beds, hand-painted floral motifs, and private views across peacock-filled lawns. In the late afternoon, your cultural guide leads a private visit to the heritage jeweler quarter around Johari Bazaar, providing access to generational master ateliers specializing in uncut diamond Polki, Meenakari enameling, and 22-karat gold Jadau jewelry. The evening culminates in dinner at Suvarna Mahal, the palace's former state banquet hall, dining under Florentine ceilings, gold-leaf wall panels, and crystal chandeliers while enjoying regional royal Rajasthani recipes served on silver platters.",
        "stay": "Rambagh Palace, Jaipur (Grand Luxury Suite)",
        "meals": "Breakfast & Royal Rajasthani Dinner at Suvarna Mahal",
        "highlights": [
          "Scenic private overland transfer from Ranthambore to the Pink City of Jaipur",
          "Check-in to a Grand Luxury Suite at Rambagh Palace, former royal residence",
          "Private atelier visit to Johari Bazaar for heritage Polki and Jadau jewelry craftsmanship",
          "Grand dining experience at Suvarna Mahal under Florentine ceiling frescoes"
        ],
        "image": "/images/tours/sovereign-wild/day6-jaipur-rambagh.jpg",
        "transit": {
          "type": "drive",
          "duration": "3.5 hrs",
          "route_notes": "Private chauffeured drive from Ranthambore to Jaipur"
        }
      },
      {
        "day": 7,
        "title": "Amber Fort, Chandra Mahal Private Wing & Departure",
        "location": "Jaipur to Delhi",
        "description": "Your final morning begins with an architectural exploration of Amber Fort, the 16th-century hilltop stronghold of the Kachwaha Rajputs situated 11 kilometers north of the city. Ascend directly to the upper ramparts by private four-wheel-drive vehicle, bypassing the conventional visitor lines. Your architectural historian guides you through the public courtyards of the Diwan-i-Aam, the royal apartments of the Sukh Niwas with their historical water-cooled channels, and the celebrated Sheesh Mahal, where thousands of convex Belgian mirrors illuminate the vaulted ceiling. Returning to the old walled city, proceed to the Jaipur City Palace for curator-led entry to the Chandra Mahal. This seven-story private wing remains the active residence of the titular royal family of Jaipur. Accompanied by the palace archivist, visit private ceremonial chambers including the mirror-inlaid Chhavi Niwas, the blue-and-white dining rooms, and the private terrace with unobstructed perspectives across Jantar Mantar and the city grid. Following lunch at a courtyard restaurant, your private chauffeur drives you along the Delhi-Jaipur highway to Indira Gandhi International Airport in New Delhi for your evening international flight.",
        "stay": "Departure",
        "meals": "Breakfast & Private Farewell Lunch",
        "highlights": [
          "Upper-gate Jeep access to Amber Fort, including the Sheesh Mahal and Zenana courtyards",
          "Private curator-led access to the living Chandra Mahal royal quarters within City Palace",
          "Chauffeured luxury highway transfer directly to New Delhi IGI Airport for onward departures"
        ],
        "image": "/images/tours/sovereign-wild/day7-jaipur-chandra-mahal.jpg",
        "transit": {
          "type": "drive",
          "duration": "4.0 hrs",
          "route_notes": "Private chauffeured transfer from Jaipur to New Delhi IGI Airport"
        }
      }
    ],
    "inclusions": [
      "VIP meet-and-assist upon arrival at Delhi Indira Gandhi International Airport with fast-track immigration and luggage handling",
      "Private luxury sedan transfers in New Delhi via BMW 7-Series or Mercedes-Benz S-Class",
      "One night in a Premier Plus Suite at The Oberoi, New Delhi, overlooking the Delhi Golf Club",
      "Welcome five-course modern Indian tasting menu dinner at Indian Accent at The Lodhi",
      "First-class executive carriage rail tickets aboard the Shatabdi or Vande Bharat Express from New Delhi to Sawai Madhopur",
      "Four nights in a Royal Campaign Suite at Suján Sher Bagh, a Relais & Châteaux luxury wildlife camp",
      "One night in a Grand Luxury Suite at Rambagh Palace, Jaipur, the former official residence of the Maharaja of Jaipur",
      "Four private open-top 4x4 Gypsy game drives in Ranthambore National Park across Core Zones 1 to 5",
      "Services of a dedicated senior wildlife naturalist and professional tracker on all game drives",
      "All government Core Zone forest permits, vehicle entry fees, wildlife conservation cess, and commercial photography permissions",
      "Full board dining at Suján Sher Bagh including afternoon teas, fireside dinners, and organic estate-grown produce",
      "Private motorized river safari on the National Chambal Sanctuary with an accompanying freshwater biologist",
      "Curated outdoor picnic lunch on the banks of the Chambal River beneath native acacia trees",
      "Private guided walking exploration of the 10th-century UNESCO World Heritage Ranthambore Hill Fort and Trinetra Ganesha Temple",
      "Chauffeured private SUV transfer from Ranthambore to Jaipur",
      "Private atelier visit to heritage jewelers in Johari Bazaar showcasing traditional Jadau, Polki, and Meenakari enamelwork",
      "Royal Rajasthani banquet dinner at Suvarna Mahal in Rambagh Palace served on sterling silver dinnerware",
      "Private vehicle access to the upper gates of Amber Fort with specialized architectural historian guidance",
      "Curator-arranged private access to the residential Chandra Mahal wing within Jaipur City Palace",
      "Private chauffeured luxury transfer from Jaipur directly to New Delhi Indira Gandhi International Airport, with chilled refreshments and Wi-Fi"
    ],
    "exclusions": [
      "International airfare and Indian visa fees",
      "Discretionary gratuities for wildlife naturalists, private drivers, hotel staff, and heritage guides",
      "Alcoholic beverages, premium spirits, and vintage cellars (bar packages available upon request)",
      "Comprehensive travel, medical, and emergency evacuation insurance (mandatory for wildlife expeditions)",
      "Spa treatments, personal laundry, and incidental room charges beyond included meals"
    ],
    "accommodations": [
      {
        "name": "Suján Sher Bagh",
        "location": "Ranthambore",
        "tier": "Relais & Châteaux Ultra-Luxury Wildlife Camp",
        "image": "/images/tours/sovereign-wild/sujan-sher-bagh.jpg",
        "description": "Pioneering the luxury tented camp experience in India, Suján Sher Bagh is an intimate Relais & Châteaux property bordering Ranthambore National Park. Twelve custom white canvas tents recall the Edwardian campaign expeditions of the 1920s, fitted with rosewood furniture, hand-stitched canvas walls, monogrammed linen, and open-air stone-tiled bathrooms. Royal Suites feature private heated plunge pools and dedicated outdoor verandas. The camp's naturalist team represents decades of resident field experience in tiger and leopard tracking. Dining is centered on organic produce harvested daily from the camp's farm, served family-style or in private lantern-lit forest clearings around open log fires."
      },
      {
        "name": "The Oberoi, New Delhi",
        "location": "New Delhi",
        "tier": "Urban Luxury 5-Star",
        "image": "/images/tours/sovereign-wild/oberoi-new-delhi.jpg",
        "description": "Located on Dr. Zakir Hussain Road in the diplomatic enclave of Lutyens' Delhi, The Oberoi overlooks the verdant expanses of the Delhi Golf Club and the 16th-century dome of Humayun's Tomb. Thoroughly redesigned to state-of-the-art standards with hospital-grade clean-air filtration systems throughout, the property combines modernist Italian furnishings with traditional teak and marble accents. Premier Plus suites offer expansive views over the manicured greens, private butler service, and deep soaking bathtubs. The property provides an exceptionally peaceful sanctuary before embarking on the train journey south to Ranthambore."
      },
      {
        "name": "Rambagh Palace",
        "location": "Jaipur",
        "tier": "Historic Palace 5-Star (Taj)",
        "image": "/images/tours/royal-odyssey/day3-jaipur-rambagh.jpg",
        "description": "Spanning 47 acres of manicured formal gardens in the heart of Jaipur, Rambagh Palace served as the principal residence of Maharaja Sawai Man Singh II and Maharani Gayatri Devi until 1957. Now meticulously managed by Taj Hotels, the palace retains its authentic royal architecture, featuring hand-carved marble jalis, cupolas, and sandstone balustrades. Grand Luxury Suites are appointed with authentic period antiques, arched alcoves, Florentine chandeliers, and private walk-out terraces where resident peacocks roam freely. The hotel's flagship restaurant, Suvarna Mahal, occupies the palace's former state banquet hall under gilded ceilings and crystal chandeliers."
      },
      {
        "name": "The Oberoi Vanyavilas Wildlife Resort",
        "location": "Ranthambore",
        "tier": "Ultra-Luxury Jungle Resort & Spa",
        "image": "/images/tours/sovereign-wild/oberoi-vanyavilas.jpg",
        "description": "Spread across twenty acres of landscaped gardens, watercourses, and indigenous fruit orchards on the edge of the tiger reserve, The Oberoi Vanyavilas offers twenty-five luxury tents with triple-canopied roofs designed to regulate ambient temperature. Each tent covers 790 square feet, featuring teakwood flooring, embroidered cotton canopies, freestanding claw-foot bathtubs, separate glass-enclosed rain showers, and private walled courtyard gardens. The Oberoi Spa overlooks a central water lily pond and provides classical Ayurvedic therapies, while a multi-tiered observation tower offers panoramic sunset views across the surrounding Aravalli hills."
      }
    ]
  },
  {
    "id": "tour-5",
    "slug": "varanasi-sacred-ganges-spiritual",
    "destination_id": "dest-4",
    "destination_name": "North India & Ganges",
    "title": "Sacred Ganges & Timeless Varanasi: A Spiritual Monograph",
    "subtitle": "Six days along the northern bend of the Ganges, from dawn ragas drifting over the water to private riverfront Aarti, Sarnath's 3rd-century antiquities, and stays in historic riverside palaces.",
    "duration_days": 6,
    "duration_nights": 5,
    "price_usd": 3150,
    "price_inr": 265000,
    "activity_level": "Leisurely",
    "travel_style": "Spiritual & Wellness",
    "group_type": "100% Private Custom",
    "is_featured": true,
    "hero_image": "/images/tours/sacred-ganges/hero.jpg",
    "gallery": [
      "/images/tours/sacred-ganges/hero.jpg",
      "/images/tours/sacred-ganges/day1-delhi-imperial.jpg",
      "/images/tours/sacred-ganges/day2-brijrama-river-arrival.jpg",
      "/images/tours/sacred-ganges/day3-subah-e-banaras.jpg",
      "/images/tours/sacred-ganges/day4-sarnath-dhamek.jpg",
      "/images/tours/sacred-ganges/day5-ramnagar-fort.jpg",
      "/images/tours/sacred-ganges/taj-nadesar-palace.jpg",
      "/images/tours/sacred-ganges/day6-ganges-morning-departure.jpg"
    ],
    "overview": "Where the Ganges curves north toward the Himalayas, Varanasi has maintained an unbroken daily rhythm along its riverfront for nearly three millennia. Life here unfolds on 84 stone ghats that step down into the water, from morning ablutions at Assi to the cremation fires at Manikarnika.\n\nThis six-day journey explores the city by water and on foot. You travel by private wooden bajra at dawn, listening to sitar and bansuri musicians from the Benares Gharana play morning ragas across the mist. At dusk, your boat moors directly in front of Dashashwamedh Ghat for the fire ceremony, with alternative access to a private haveli terrace above the crowds. On land, an architectural historian leads you through the narrow alleys of Pucca Mahal, and a half-day excursion to Sarnath brings you to the 5th-century Dhamek Stupa and the original Ashoka Lion Capital. Evenings are divided between BrijRama Palace, an 1812 Maratha fortress on Darbhanga Ghat, and the 40-acre mango orchards of Taj Nadesar Palace.",
    "highlights": [
      "Subah-e-Banaras dawn cruise on a private wooden bajra with sitar and bansuri musicians from the Benares Gharana",
      "Front-row boat mooring and private haveli rooftop access for the evening Dashashwamedh Ghat Ganga Aarti",
      "Stays at BrijRama Palace on Darbhanga Ghat and the 40-acre grounds of Taj Nadesar Palace",
      "Guided walk through Sarnath, visiting the 5th-century Dhamek Stupa and the original Ashoka Lion Capital",
      "Madanpura silk quarter visits to observe handloom Kadwa brocade weaving with Katan silk and silver-gold zari",
      "Private boat crossing to 18th-century Ramnagar Fort to inspect the royal armory and 1852 celestial clock",
      "Regional tastings including dawn kachori-jalebi, winter Malaiyyo, Banarasi paan, and a formal Satvik thali on silver service"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in New Delhi and Art Heritage at The Imperial",
        "location": "Delhi",
        "description": "Arrive at Delhi's Indira Gandhi International Airport, with tarmac assistance and customs fast-track before a chauffeured transfer to The Imperial. Built in 1936 along Janpath, the hotel was a central meeting point during negotiations leading up to Indian independence. Settle into your Heritage Royal Suite, then take a 90-minute walk through the property with the resident curator. The hotel's 5,000-piece art collection includes Thomas and William Daniell's original late-18th-century aquatints of Varanasi's ghats, offering an early historical view of the city you will visit tomorrow. The afternoon is free to rest or visit the spa. Dinner is served at The Spice Route, set beneath carved timber pillars transported from historic Kerala temples.",
        "stay": "The Imperial, New Delhi (Heritage Royal Suite)",
        "meals": "Welcome Dinner at The Spice Route",
        "highlights": [
          "Airport tarmac welcome, customs fast-track, and private chauffeur transfer",
          "Curator-led tour of 18th-century Daniell aquatints of Varanasi at The Imperial",
          "Dinner at The Spice Route with Kerala heritage temple woodwork"
        ],
        "image": "/images/tours/sacred-ganges/day1-delhi-imperial.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 2,
        "title": "Flight to Varanasi, Teak Bajra Arrival, and Dashashwamedh Ghat Aarti",
        "location": "Delhi to Varanasi",
        "description": "After breakfast at The Imperial, transfer to the airport for the 75-minute morning flight to Varanasi. On arrival at Lal Bahadur Shastri Airport, meet your private driver and head toward the river, avoiding central city traffic by approaching via Rajghat.\n\nHere you board a canopied teak-wood bajra. The boat travels upriver along the full crescent of Varanasi's riverfront, giving you your first view of the stone palisades, bathing pavilions, and temple spires of the 84 ghats. You step ashore directly at the private river landing of BrijRama Palace, an 1812 sandstone fortress built by the Maratha dynasty on Darbhanga Ghat, welcomed with shehnai music and fresh saffron sherbet.\n\nAt dusk, return to the water on your chartered boat, which is positioned in a reserved front-row mooring facing the priests at Dashashwamedh Ghat. You watch the evening Agni Puja fire ritual from the river, followed by the Deep Daan offering of oil and marigold lamps set adrift on the current.",
        "stay": "BrijRama Palace, Varanasi (Varuna Burj Suite)",
        "meals": "Breakfast & Palace Welcome Dinner",
        "highlights": [
          "Upriver approach by teak bajra past the 84 ghats",
          "Direct river landing and check-in at BrijRama Palace on Darbhanga Ghat",
          "Front-row boat mooring for the evening Dashashwamedh Ghat fire ceremony"
        ],
        "image": "/images/tours/sacred-ganges/day2-brijrama-river-arrival.jpg",
        "transit": {
          "type": "flight",
          "duration": "1h 15m Flight + 45m Riverboat",
          "route_notes": "Delhi to Varanasi Flight followed by Private Riverboat Arrival"
        }
      },
      {
        "day": 3,
        "title": "Subah-e-Banaras Dawn Ragas, Vedic Traditions, and Old City Alleys",
        "location": "Varanasi",
        "description": "Board your wooden bajra before sunrise, around 5:15 AM, as bells and conch shells begin sounding along the ghats. The boat is fitted with bolsters, linen mattresses, and wool blankets for the cool morning air. Travelling with you are a Sanskrit scholar and classical musicians trained in the Benares Gharana tradition.\n\nAs sitar and bansuri players perform morning ragas such as Raga Bhairav, the scholar explains the rituals taking place along the water: pilgrims offering prayers at Assi Ghat, morning dips, and the cremation fires at Manikarnika Ghat, which have burned continuously for centuries.\n\nBack on land, breakfast features local morning specialties: freshly fried kachoris, saffron jalebis, and, during winter months, Malaiyyo (a light, saffron-infused milk foam garnished with pistachios). Later in the afternoon, an architectural historian guides you through Pucca Mahal, the dense residential core of the old city. You walk through Vishwanath Gali and Thatheri Bazaar, where metalsmiths hand-hammer brass vessels, visit inner haveli courtyards, and stop for a demonstration by a hereditary Banarasi paan maker.",
        "stay": "BrijRama Palace, Varanasi",
        "meals": "Dawn Heritage Breakfast, Traditional Lunch & Palace Dinner",
        "highlights": [
          "Subah-e-Banaras dawn boat ride with live sitar and bansuri players",
          "Sanskrit scholar guidance on riverfront rituals and Manikarnika history",
          "Architectural walk through Pucca Mahal and Thatheri Bazaar brass workshops",
          "Tastings of local kachori, winter Malaiyyo, and handmade Banarasi paan"
        ],
        "image": "/images/tours/sacred-ganges/day3-subah-e-banaras.jpg",
        "transit": {
          "type": "boat",
          "duration": "2.5 hrs",
          "route_notes": "Dawn Private Bajra Glide from Assi Ghat to Manikarnika Ghat"
        }
      },
      {
        "day": 4,
        "title": "Sarnath Buddhist Antiquities and Madanpura Handloom Weavers",
        "location": "Varanasi",
        "description": "A 30-minute drive north brings you to Sarnath, historically known as Isipatana Deer Park, where Gautama Buddha gave his first teaching. Accompanied by a Buddhist art historian, you visit the 5th-century Dhamek Stupa, examining its carved Gupta stone friezes of lotus medallions and geometric bands.\n\nAt the adjacent Sarnath Archaeological Museum, you view the original 3rd-century BCE Lion Capital erected by Emperor Ashoka. Carved from polished Chunar sandstone, its mirror-like finish remains intact after more than two millennia, and the sculpture now serves as India's national emblem. Nearby at Mulagandha Kuti Vihara, you can view the 1930s wall murals painted by Japanese artist Kosetsu Nosu, depicting key episodes of the Buddha's life.\n\nIn the afternoon, travel to the weaver settlements of Sarai Mohana and Madanpura. Varanasi's handloom industry is famous for pure mulberry Katan silk and brocades made with silver and gold zari threads. In a master weaver's workshop, you see pit-looms in action and observe the traditional Kadwa technique, where each floral or paisley motif is individually hand-woven into the warp without leaving loose threads on the reverse side.",
        "stay": "BrijRama Palace, Varanasi (or Taj Nadesar Palace)",
        "meals": "Breakfast, Cantonment Garden Lunch & Royal Dinner",
        "highlights": [
          "Historian-led visit to Sarnath and the 5th-century Dhamek Stupa",
          "Original 3rd-century BCE Ashoka Lion Capital at Sarnath Museum",
          "1930s Buddhist murals by Kosetsu Nosu at Mulagandha Kuti Vihara",
          "Pit-loom weaving demonstration of Katan silk and Kadwa zari brocade in Madanpura"
        ],
        "image": "/images/tours/sacred-ganges/day4-sarnath-dhamek.jpg",
        "transit": {
          "type": "drive",
          "duration": "30 min each way",
          "route_notes": "Chauffeured Excursion to Sarnath and Weaver Enclaves"
        }
      },
      {
        "day": 5,
        "title": "Ramnagar Fort, Royal Collections, and Satvik Dinner",
        "location": "Varanasi",
        "description": "Cross to the eastern bank of the Ganges by wooden riverboat to visit Ramnagar Fort, a sandstone river fortress built in 1750 by Maharaja Balwant Singh. The fort still serves as the ancestral home of the Kashi Naresh (the titular Maharaja of Benares). Inside the Saraswati Bhawan Museum, a historian walks you through collections of carved elephant howdahs, palanquins, and historic weaponry. A highlight is the Dharohar astronomical clock, built in 1852 by court astronomers to show the time alongside the day of the week, lunar phases, and zodiac positions.\n\nReturn across the river for a quiet afternoon. In the evening, dinner is a multi-course Satvik feast served on traditional silver platters in a private pavilion overlooking the water, using recipes developed in regional royal kitchens without onion or garlic. The meal is accompanied by a private baithak performance of classical Thumri and Dadra vocals, two vocal forms closely associated with the musical heritage of Benares.",
        "stay": "BrijRama Palace, Varanasi (or Taj Nadesar Palace)",
        "meals": "Breakfast, High Tea & Grand Royal Satvik Imperial Feast",
        "highlights": [
          "Riverboat crossing to 18th-century Ramnagar Fort on the eastern bank",
          "Inspection of the 1852 Dharohar astronomical clock and royal museum collections",
          "Traditional Satvik dinner served on silver thalis in a riverside pavilion",
          "Private baithak performance of Benares Gharana Thumri and Dadra vocal music"
        ],
        "image": "/images/tours/sacred-ganges/day5-ramnagar-fort.jpg",
        "transit": {
          "type": "boat",
          "duration": "45 min river crossing",
          "route_notes": "Private River Crossing to Ramnagar Citadel"
        }
      },
      {
        "day": 6,
        "title": "Morning River View and Return Flight to New Delhi",
        "location": "Varanasi to Delhi",
        "description": "Spend your final morning watching the early sunlight across the Ganges from the palace terrace or join an optional rooftop yoga and breathing session. After breakfast, a private boat takes you back downstream to Rajghat. Your driver meets you at the jetty for the transfer to Lal Bahadur Shastri Airport.\n\nTake the midday flight back to Delhi, where airport staff will assist with luggage transfer and direct you toward your international departure gate or transit lounge.",
        "stay": "Departure",
        "meals": "Celebratory Breakfast Included",
        "highlights": [
          "Early morning river views and optional rooftop yoga session",
          "Downriver boat transfer to Rajghat and chauffeured drive to the airport",
          "Flight to Delhi with transit assistance for connecting flights"
        ],
        "image": "/images/tours/sacred-ganges/day6-ganges-morning-departure.jpg",
        "transit": {
          "type": "flight",
          "duration": "1h 15m Flight",
          "route_notes": "Return Flight from Varanasi to New Delhi IGI Airport"
        }
      }
    ],
    "inclusions": [
      "Airport fast-track arrival and departure assistance at Delhi and Varanasi",
      "5 nights at heritage hotels: The Imperial New Delhi and BrijRama Palace (or Taj Nadesar Palace)",
      "Chauffeured road transfers and local transport in private premium vehicles",
      "Private chartered teak-wood bajra transfers on the Ganges, including luggage boat",
      "Subah-e-Banaras dawn boat excursion with linen mattresses, bolsters, and wool throws",
      "Live morning raga performances on board by sitar and bansuri musicians from the Benares Gharana",
      "Dedicated English-speaking cultural scholar and guide throughout the stay in Varanasi",
      "Reserved front-row boat mooring directly facing Dashashwamedh Ghat for the evening Aarti",
      "Access to a private haveli terrace overlooking Dashashwamedh Ghat",
      "Earthen lamps and marigolds for the Deep Daan river offering",
      "Guided walking tour of Pucca Mahal, Vishwanath Gali, and Thatheri Bazaar",
      "Banarasi paan making demonstration with a hereditary maker",
      "Sarnath guided visit to Deer Park, Dhamek Stupa, and Mulagandha Kuti Vihara",
      "Museum entry and viewing of the 3rd-century BCE Ashoka Lion Capital at Sarnath",
      "Madanpura silk workshop visit with pit-loom demonstrations, pure Katan silk, and Kadwa zari weaving",
      "Private boat crossing to Ramnagar Fort, including Saraswati Bhawan Museum and the 1852 Dharohar clock",
      "Traditional multi-course Satvik dinner served on silver thalis in a private riverside pavilion",
      "Private baithak performance of classical Thumri and Dadra vocal music",
      "Curator-led gallery walk through the 5,000-piece art collection at The Imperial New Delhi",
      "All monument entrance fees, boat docking fees, and local taxes"
    ],
    "exclusions": [
      "International flights to and from India",
      "Domestic flights (Delhi to Varanasi round trip; can be booked on request)",
      "Indian visa fees",
      "Gratuities for drivers, guides, boatmen, and hotel staff",
      "Alcoholic drinks during meals",
      "Personal spa treatments outside complimentary hotel facilities",
      "Personal purchases of textiles, jewelry, or art",
      "Travel and medical insurance"
    ],
    "accommodations": [
      {
        "name": "BrijRama Palace",
        "location": "Varanasi (Darbhanga Ghat)",
        "tier": "Heritage Fortress Palace 5-Star",
        "image": "/images/tours/sacred-ganges/hero.jpg",
        "description": "Built in 1812 by the Maratha dynasty of Nagpur and later acquired by the Maharaja of Darbhanga, BrijRama Palace sits directly above the stone steps of Darbhanga Ghat. The property is reached by riverboat and retains a working 1918 elevator, one of the earliest installed in South Asia. Rooms in the river-facing Varuna Burj Suites occupy the semi-circular stone bastions, with arched windows looking out over the water, hand-painted wall motifs, and an all-vegetarian menu served at Darbhanga restaurant."
      },
      {
        "name": "Taj Nadesar Palace",
        "location": "Varanasi (Nadesar)",
        "tier": "Royal Palace 5-Star Heritage (Taj)",
        "image": "/images/tours/sacred-ganges/taj-nadesar-palace.jpg",
        "description": "Built in 1782 and later acquired by Maharaja Prabhu Narain Singh, Nadesar Palace has just ten suites set within 40 acres of mango orchards, marigold fields, and jasmine gardens in the Varanasi cantonment. Guests arrive from the gates by horse-drawn carriage. Rooms feature four-poster beds, high ceilings, and original period furniture, supported by dedicated butler service and the hotel's Jiva Spa."
      },
      {
        "name": "The Imperial, New Delhi",
        "location": "New Delhi (Janpath)",
        "tier": "Heritage Legend 5-Star",
        "image": "/images/tours/sacred-ganges/day1-delhi-imperial.jpg",
        "description": "Opened in 1936 along Janpath, The Imperial was designed by F.B. Blomfield and served as a regular gathering place for Indian and British political figures before independence. The property houses more than 5,000 prints, maps, and paintings from the colonial period, including late-18th-century Daniell aquatints. Suites are finished with teak flooring, Persian carpets, and high ceilings, with dining options that include The Spice Route."
      },
      {
        "name": "Taj Ganges, Varanasi",
        "location": "Varanasi (Nadesar Estate)",
        "tier": "Luxury Garden Resort 5-Star (Taj)",
        "image": "/images/destinations/varanasi/hero.jpg",
        "description": "Located within the same 40-acre estate as Nadesar Palace, Taj Ganges is built around stepped terraces reminiscent of riverfront ghats. Rooms look out onto mature gardens and lawns where peacocks roam. The property includes a large outdoor pool, walking paths shaded by neem trees, and dining at Varuna, which draws on regional Awadhi and Bhojpuri culinary traditions."
      }
    ]
  },
  {
    "id": "tour-6",
    "slug": "goa-portuguese-heritage-coastal-sanctuary",
    "destination_id": "dest-6",
    "destination_name": "Goa & The Portuguese Heritage Coast",
    "title": "The Portuguese Coast & Heritage Estuaries: Goa & Konkan Sanctuary",
    "subtitle": "Six days of private coastal exploration, from 18th-century baroque mansions in Fontainhas and private catamaran sails along the Arabian Sea to organic spice estates and secluded oceanfront villa retreats.",
    "duration_days": 6,
    "duration_nights": 5,
    "price_usd": 3200,
    "price_inr": 270000,
    "activity_level": "Leisurely",
    "travel_style": "Coastal & Luxury Stays",
    "group_type": "100% Private Custom",
    "is_featured": true,
    "hero_image": "/images/tours/goa-portuguese-sanctuary/hero.jpg",
    "gallery": [
      "/images/tours/goa-portuguese-sanctuary/hero.jpg",
      "/images/tours/goa-portuguese-sanctuary/day2-fontainhas.jpg",
      "/images/tours/goa-portuguese-sanctuary/day3-catamaran-mandovi.jpg",
      "/images/tours/goa-portuguese-sanctuary/day4-taj-exotica.jpg",
      "/images/tours/goa-portuguese-sanctuary/the-leela-goa.jpg",
      "/images/tours/goa-portuguese-sanctuary/postcard-moira.jpg"
    ],
    "overview": "Along the western coast of the Konkan subcontinent, Goa preserves a distinct cultural and architectural rhythm shaped by four centuries of maritime Portuguese rule. Journeys begin in the serene enclave of Nerul at Ahilya by the Sea, an intimate Relais & Châteaux style property constructed from local red laterite stone overlooking Dolphin Bay. Accompanied by a conservation architect, you walk the cobblestone lanes of Fontainhas and Sao Tome in Panaji, where pastel-toned villas feature wrought-iron balconies and translucent oyster-shell window panes. An afternoon private catamaran charter sails along the Mandovi estuary at golden hour, followed by private access to the 16th-century Manueline cathedrals of Old Goa. Moving south to the white sands of Benaulim, stay at Taj Exotica Resort & Spa, exploring certified organic spice estates in the Western Ghats foothills, sampling small-batch cashew feni with a hereditary distiller, and dining on fresh coastal seafood under open skies.",
    "highlights": [
      "Three nights at Ahilya by the Sea overlooking Dolphin Bay and two nights in a Luxury Villa at Taj Exotica Benaulim",
      "Private architectural walking tour of Fontainhas Latin Quarter with a heritage conservation specialist",
      "Exclusive sunset charter aboard a luxury catamaran cruising the Mandovi and Zuari estuaries with champagne",
      "Private scholar-led visit to the UNESCO World Heritage cathedrals of Old Goa, including the Basilica of Bom Jesus",
      "Excursion to an organic heritage spice plantation in Ponda with a traditional Saraswat banquet on banana leaves",
      "Private tasting and masterclass with a generational pot-still cashew and coconut feni distiller"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in North Goa: Welcome to Ahilya by the Sea",
        "location": "North Goa (Nerul)",
        "description": "Arrive at Goa International Airport (Dabolim or Manohar International Airport Mopa), met at the terminal by our airport representative and private chauffeur. Transfer by luxury air-conditioned sedan to Ahilya by the Sea, an intimate retreat positioned at the quiet corner of Dolphin Bay in Nerul. Built with hand-carved local red laterite stone across three private villas, the property is framed by 200-year-old banyan trees and lush frangipani gardens. Check into your sea-facing Music Room or Sunrise Villa suite, featuring antique Goan furnishings, curated art collections, and private verandas looking out across the Arabian Sea. Spend the late afternoon relaxing beside the saltwater infinity pool cantilevered over the seawall. At sunset, enjoy chilled wine and Goan appetizers on the sea terrace as local fishing outriggers return under the evening light.",
        "stay": "Ahilya by the Sea (Sunrise Suite / Music Room)",
        "meals": "Welcome Dinner on the Sea Terrace",
        "highlights": [
          "Private airport meet-and-assist and chauffeured luxury transfer",
          "Check-in at Ahilya by the Sea, an intimate Relais & Châteaux boutique property",
          "Sunset drinks on the seawall overlooking Dolphin Bay"
        ],
        "image": "/images/tours/goa-portuguese-sanctuary/hero.jpg",
        "transit": {
          "type": "drive",
          "duration": "45 min",
          "route_notes": "Private chauffeured airport transfer to Nerul"
        }
      },
      {
        "day": 2,
        "title": "Fontainhas Latin Quarter & Indo-Portuguese Gastronomy",
        "location": "Panaji",
        "description": "After breakfast served in the courtyard garden, your private chauffeur drives you 20 minutes across the river to Panaji, the capital of Goa. Meet a local architectural historian for a private walking tour of Fontainhas, the oldest Latin Quarter in Asia, established in the late 18th century. Walk through quiet cobblestone alleys lined with heritage homes painted in vivid shades of ochre yellow, cobalt blue, and burnt sienna according to Portuguese municipal decrees. Inspect ornate wrought-iron railings, azulejo ceramic house plaques, and translucent oyster-shell window panes (carepas) designed to diffuse harsh sunlight. Visit the 1880 Chapel of Saint Sebastian and stop at a historic Portuguese patisserie for warm pasteis de nata and Goan artisanal coffee. In the afternoon, enjoy a curated lunch at a restored colonial townhouse, tasting Goan Catholic dishes such as pork vindaloo, prawn balchao, and coconut-milk-based curries prepared from family recipes.",
        "stay": "Ahilya by the Sea",
        "meals": "Breakfast & Heritage Indo-Portuguese Lunch",
        "highlights": [
          "Private architectural walking tour through Fontainhas and Sao Tome",
          "Detailed study of Portuguese colonial domestic architecture and oyster-shell windows",
          "Curated Indo-Portuguese heritage lunch in a restored 19th-century townhouse"
        ],
        "image": "/images/tours/goa-portuguese-sanctuary/day2-fontainhas.jpg",
        "transit": {
          "type": "drive",
          "duration": "25 min each way",
          "route_notes": "Private chauffeured city transit"
        }
      },
      {
        "day": 3,
        "title": "Old Goa UNESCO Cathedrals & Sunset Catamaran Charter",
        "location": "Old Goa & Mandovi Estuary",
        "description": "This morning journeys ten kilometers east along the river to Old Goa (Velha Goa), the former 16th-century administrative center of Portuguese India once known as the 'Rome of the East.' Accompanied by your historian guide, explore the Basilica of Bom Jesus, a UNESCO World Heritage monument constructed in 1605, housing the sacred silver reliquary of St. Francis Xavier. Cross the plaza to the Se Cathedral, one of the largest churches in Asia, built in Portuguese-Manueline style and famous for its Golden Bell. Continue to the Church of St. Cajetan, modeled on St. Peter's Basilica in Rome. Return to Ahilya for a restful midday pause. In the late afternoon, your chauffeur escorts you to the jetty to board a private chartered catamaran. Cruise along the serene waters of the Mandovi estuary toward the Arabian Sea at golden hour, enjoying chilled champagne and coastal canapes as the sun sinks into the horizon.",
        "stay": "Ahilya by the Sea",
        "meals": "Breakfast & Sunset Champagne Canapes on Board",
        "highlights": [
          "Private historian-led tour of Old Goa's UNESCO World Heritage cathedrals",
          "Viewing the baroque altar and sacred reliquary at the Basilica of Bom Jesus",
          "Private sunset catamaran charter on the Mandovi estuary with champagne"
        ],
        "image": "/images/tours/goa-portuguese-sanctuary/day3-catamaran-mandovi.jpg",
        "transit": {
          "type": "boat",
          "duration": "2.5 hrs on water",
          "route_notes": "Private catamaran cruise along the Mandovi estuary"
        }
      },
      {
        "day": 4,
        "title": "Organic Spice Estates of Ponda & South Goa Sanctuary",
        "location": "Ponda to Benaulim",
        "description": "Depart North Goa after breakfast, traveling southeast toward the lush foothills of Ponda, renowned for centuries as the spice-growing heartland of Goa. Arrive at a certified organic heritage spice plantation set across forty acres of tropical greenery. Guided by an estate botanist, walk along shaded pathways among tall betel palms, black pepper vines, cardamom bushes, vanilla pods, and nutmeg trees, learning about traditional cultivation and medicinal uses in classical Ayurveda. Conclude the walk with a traditional Goan Saraswat lunch served on fresh plantain leaves, accompanied by fresh kokum juice. In the afternoon, your chauffeur continues south to the tranquil coastal district of Salcete. Check into Taj Exotica Resort & Spa in Benaulim, situated within 56 acres of landscaped gardens directly fronting a pristine stretch of Benaulim Beach. Check into your private Luxury Villa with a private plunge pool and unwind to the sound of breaking waves.",
        "stay": "Taj Exotica Resort & Spa, Benaulim (Luxury Villa with Plunge Pool)",
        "meals": "Breakfast, Estate Spice Lunch & Resort Dinner",
        "highlights": [
          "Private guided botanical walk through a certified organic heritage spice estate",
          "Traditional Goan Saraswat plantation lunch served on fresh plantain leaves",
          "Check-in at Taj Exotica Resort & Spa in South Goa with private plunge pool villa"
        ],
        "image": "/images/tours/goa-portuguese-sanctuary/day4-taj-exotica.jpg",
        "transit": {
          "type": "drive",
          "duration": "1.5 hrs",
          "route_notes": "Private chauffeured drive from Ponda to Benaulim"
        }
      },
      {
        "day": 5,
        "title": "Classical Ayurveda, Feni Masterclass & Secluded Beach Dining",
        "location": "South Goa (Benaulim)",
        "description": "A day devoted to coastal stillness and deep cultural craft. Begin the morning with a doctor-guided consultation and restorative 90-minute classical Abhyanga massage at the Jiva Spa, utilizing cold-pressed sesame oils and herbal poultices. Later in the morning, join a private masterclass with a fourth-generation hereditary distiller to learn the art of single-distillation cashew and coconut feni. Witness the traditional clay-pot distillation equipment, learn how cashew apples (kaju) are crushed in stone basins (culmi), and sample single-origin aged feni paired with local botanical infusions. Spend the afternoon swimming in the Arabian Sea or walking the wide, uncrowded sands of Benaulim. In the evening, a private table is prepared directly on the beach beneath a canopy of palm fronds, illuminated by hurricane lanterns, featuring freshly caught red snapper, king prawns, and lobster grilled with coastal spices.",
        "stay": "Taj Exotica Resort & Spa, Benaulim",
        "meals": "Breakfast & Private Beachfront Seafood Dinner",
        "highlights": [
          "90-minute Ayurvedic restorative treatment at the award-winning Jiva Spa",
          "Masterclass and tasting with a generational heritage feni distiller",
          "Lantern-lit private multi-course seafood dinner on the white sands of Benaulim Beach"
        ],
        "image": "/images/tours/goa-portuguese-sanctuary/day5-benaulim-sunset-dining.jpg",
        "transit": {
          "type": "none"
        }
      },
      {
        "day": 6,
        "title": "Unhurried Coastal Morning & VIP Airport Departure",
        "location": "Benaulim to Goa Airport",
        "description": "Enjoy a leisurely morning on the villa terrace with fresh tropical fruits, Goan poi bread, and French press coffee. Take a final barefoot walk along the quiet shoreline of Benaulim or a morning swim in your private villa plunge pool. At the designated hour, your private chauffeur assists with luggage and transfers you in a private luxury sedan to Goa International Airport (Dabolim or Mopa) for your domestic flight connecting to Mumbai or Delhi for your international departure, carrying memories of coastal tranquility and living Portuguese heritage.",
        "stay": "Departure",
        "meals": "Breakfast",
        "highlights": [
          "Leisurely morning at your beachfront villa sanctuary",
          "Private luxury sedan transfer to Goa International Airport",
          "Fast-track airport departure assistance"
        ],
        "image": "/images/tours/goa-portuguese-sanctuary/day6-heritage-coastal-departure.jpg",
        "transit": {
          "type": "drive",
          "duration": "45 min",
          "route_notes": "Private chauffeured transfer to Goa International Airport"
        }
      }
    ],
    "inclusions": [
      "VIP meet-and-assist upon arrival at Goa Airport with private luxury sedan transfer",
      "Three nights in a sea-facing suite at Ahilya by the Sea, Nerul",
      "Two nights in a private Luxury Villa with Plunge Pool at Taj Exotica Resort & Spa, Benaulim",
      "Private air-conditioned executive vehicle with dedicated English-speaking chauffeur throughout the itinerary",
      "Private walking tour of Fontainhas Latin Quarter with a licensed heritage conservation architect",
      "Specialized curator-guided tour of the UNESCO World Heritage cathedrals of Old Goa",
      "Private two-and-a-half-hour sunset catamaran charter on the Mandovi and Zuari estuaries with champagne and canapes",
      "Private botanical walk and Saraswat lunch at a certified organic heritage spice estate in Ponda",
      "Private tasting and masterclass with a fourth-generation hereditary cashew and coconut feni distiller",
      "One 90-minute signature Ayurvedic therapy per guest at Jiva Spa, Taj Exotica",
      "Multi-course welcome dinner on the sea terrace at Ahilya by the Sea",
      "Private lantern-lit beachfront seafood banquet on Benaulim Beach",
      "Curated Indo-Portuguese lunch in a restored 19th-century private townhouse in Panaji",
      "Daily gourmet breakfasts featuring organic fruits, local baked breads, and farm eggs",
      "All monument entrance permits, boat charter fees, and local coastal conservation levies",
      "All interstate road tolls, fuel, chauffeur allowances, and airport parking fees",
      "Complimentary high-speed Wi-Fi, mineral water, and cold towels in your private vehicle throughout",
      "Full access to resort facilities, swimming pools, tennis courts, and private beach accesses",
      "Dedicated 24/7 on-ground concierge support managed directly from our New Delhi headquarters",
      "Private airport departure transfer with luggage handling"
    ],
    "exclusions": [
      "International and domestic commercial airfare to and from Goa",
      "Indian visa fees and travel documentation",
      "Discretionary gratuities for private chauffeurs, heritage guides, and spa therapists",
      "Alcoholic beverages and cellar purchases beyond included tasting sessions and catamaran champagne",
      "Comprehensive personal travel and emergency medical evacuation insurance"
    ],
    "accommodations": [
      {
        "name": "Ahilya by the Sea",
        "location": "Nerul (Dolphin Bay, North Goa)",
        "tier": "Relais & Châteaux Luxury Boutique Retreat",
        "image": "/images/tours/goa-portuguese-sanctuary/hero.jpg",
        "description": "Tucked away in a secluded corner of Dolphin Bay where the Mandovi River meets the Arabian Sea, Ahilya by the Sea is an intimate nine-room boutique haven constructed from hand-chiseled red laterite stone. Three independent villas are set amidst lush gardens shaded by 200-year-old banyan trees, frangipani blossoms, and exotic palms. Two infinity swimming pools, one cantilevered dramatically over the sea wall, offer tranquil vantage points to observe traditional Goan fishermen and resident dolphins at play. Rooms are individually adorned with antique Portuguese-Goan furniture, fine textiles, and curated art from the owner's personal collection."
      },
      {
        "name": "Taj Exotica Resort & Spa",
        "location": "Benaulim (South Goa)",
        "tier": "Luxury 5-Star Beachfront Resort",
        "image": "/images/tours/goa-portuguese-sanctuary/day4-taj-exotica.jpg",
        "description": "Spread across 56 acres of manicured rolling lawns and tropical gardens bordering the pristine white sands of Benaulim Beach, Taj Exotica offers a secluded sanctuary in tranquil South Goa. Mediterranean-influenced architecture with wide verandas, terracotta-tiled roofs, and flower-lined stone pathways creates an atmosphere of unhurried elegance. Luxury Villas feature private plunge pools, deep soaking tubs, and private garden sit-outs. The resort is renowned for its Jiva Spa, which offers authentic Ayurvedic treatments, and exceptional coastal seafood dining under swaying coconut palms."
      },
      {
        "name": "The Postcard Moira",
        "location": "Moira (Bardez, North Goa)",
        "tier": "Heritage Boutique Estate",
        "image": "/images/tours/goa-portuguese-sanctuary/postcard-moira.jpg",
        "description": "An intimate nine-room sanctuary occupying a meticulously restored 214-year-old Portuguese colonial mansion in the protected heritage village of Moira. The estate retains its original architectural soul: soaring timber ceilings, hand-rubbed red oxide floors, wrought-iron four-poster beds, and large oyster-shell windows looking out onto banana groves and verdant paddy fields. With no rigid check-in times or standardized menus, guests enjoy personalized Goan home-style cuisine prepared with farm-fresh local produce and personalized concierge service."
      },
      {
        "name": "The Leela Goa",
        "location": "Cavelossim (South Goa)",
        "tier": "Luxury 5-Star Riverside & Ocean Resort",
        "image": "/images/tours/goa-portuguese-sanctuary/the-leela-goa.jpg",
        "description": "Positioned where the serene River Sal meets the Arabian Sea, The Leela Goa spans 75 acres of lush lagoons, lotus ponds, and manicured gardens in Cavelossim. The resort's architecture pays homage to the 18th-century Vijayanagara empire blended with Portuguese colonial motifs. Royal Villas and Lagoon Suites feature marble bathrooms, private plunge pools, and expansive private balconies. Amenities include a private 12-hole par-3 golf course, Ayurvedic spa sanctuaries, and private access to the quiet sands of Mobor Beach."
      }
    ]
  }
];
