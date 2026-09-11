import React from 'react';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, getTours, getDestinations } from '@/lib/data-service';
import DestinationMonographDetail from '@/components/destinations/DestinationMonographDetail';

interface DestinationDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: DestinationDetailPageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return { title: 'Destination Not Found | ABC Travels' };

  return {
    title: `${destination.name} | ABC Travels Luxury India`,
    description: destination.tagline || destination.description?.slice(0, 160),
    openGraph: {
      title: destination.name,
      description: destination.tagline,
      images: [{ url: destination.hero_image, width: 1200, height: 630, alt: destination.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: destination.name,
      description: destination.tagline,
      images: [destination.hero_image],
    },
  };
}

export default async function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const allTours = await getTours();
  const linkedTours = allTours.filter((t) => {
    if (t.destination_id === destination.id) return true;
    if (t.destination_name === destination.name) return true;
    const destLower = destination.name.toLowerCase();
    const slugLower = destination.slug.toLowerCase();
    const titleLower = t.title.toLowerCase();
    const subLower = t.subtitle.toLowerCase();
    const overviewLower = t.overview.toLowerCase();
    return (
      titleLower.includes(destLower) ||
      titleLower.includes(slugLower) ||
      subLower.includes(destLower) ||
      overviewLower.includes(destLower)
    );
  });

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.description,
    touristType: ['Luxury Travelers', 'Cultural Explorers'],
    image: destination.hero_image,
  };

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <DestinationMonographDetail destination={destination} linkedTours={linkedTours} />
    </div>
  );
}
