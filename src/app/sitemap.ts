import { MetadataRoute } from 'next';
import { mockTours } from '@/lib/mock-data/tours';
import { mockDestinations } from '@/lib/mock-data/destinations';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abctravels.com';

  const staticPages = [
    '',
    '/about',
    '/tours',
    '/destinations',
    '/plan-your-trip',
    '/contact',
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const tourPages = mockTours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const destinationPages = mockDestinations.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [...staticPages, ...tourPages, ...destinationPages];
}
