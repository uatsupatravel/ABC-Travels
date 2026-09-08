import { Review } from '@/types';

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    tour_id: 'tour-1',
    tour_title: 'The Royal Odyssey: Golden Triangle & Palaces of Udaipur',
    traveler_name: 'Sir Alexander & Lady Montgomery',
    traveler_country: 'United Kingdom',
    traveler_avatar: '/images/reviews/avatars/montgomery.jpg',
    rating: 5,
    title: 'An unforgettable royal journey of a lifetime',
    comment:
      'ABC Travels provided unmatched luxury from the moment we touched down in Delhi. Having a private viewing of the Taj Mahal at dawn without crowds, followed by champagne on Lake Pichola in Udaipur, exceeded our highest expectations. The level of concierge care was truly five-star.',
    trip_date: 'February 2026',
    is_approved: true,
  },
  {
    id: 'rev-2',
    tour_id: 'tour-2',
    tour_title: 'Kerala Sanctuary: Private Houseboats, Spice Hills & Ayurvedic Bliss',
    traveler_name: 'Elena & Marcus Vance',
    traveler_country: 'Switzerland',
    traveler_avatar: '/images/reviews/avatars/vance.jpg',
    rating: 5,
    title: 'Pure serenity and transformative wellness',
    comment:
      'The private luxury kettuvallam through Alleppey backwaters was the most peaceful experience of our lives. The Ayurvedic doctor at Kumarakom was exceptional, and every transfer was effortless. We are already planning our return to Ladakh with ABC Travels.',
    trip_date: 'January 2026',
    is_approved: true,
  },
  {
    id: 'rev-3',
    tour_id: 'tour-4',
    tour_title: 'The Sovereign Wild: Royal Bengal Tiger Safari & Jungle Lodges',
    traveler_name: 'David Sterling',
    traveler_country: 'United States',
    traveler_avatar: '/images/reviews/avatars/sterling.jpg',
    rating: 5,
    title: 'Four tiger sightings in three days!',
    comment:
      'Our senior naturalist in Ranthambore was a master of his craft. The luxury tents at Oberoi Vanyavilas were breathtaking. This is the only way to experience wildlife in India.',
    trip_date: 'March 2026',
    is_approved: true,
  },
  {
    id: 'rev-4',
    tour_id: 'tour-3',
    tour_title: 'Himalayan High Passes: Glacial Valleys, Monasteries & Luxury Glamping',
    traveler_name: 'Charlotte & Antoine Dubois',
    traveler_country: 'France',
    traveler_avatar: '/images/reviews/avatars/dubois.jpg',
    rating: 5,
    title: 'Mesmerizing high-altitude luxury',
    comment:
      'The heated geodesic domes at Pangong Lake and the private blessings at Thiksey Monastery were deeply moving. ABC Travels took care of every altitude safety detail so we could simply immerse ourselves in the Himalayas.',
    trip_date: 'August 2025',
    is_approved: true,
  },
];
