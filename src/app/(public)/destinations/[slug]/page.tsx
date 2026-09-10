import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, getTours } from '@/lib/data-service';
import TourCard from '@/components/tours/TourCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, Sun, Clock } from 'lucide-react';

interface DestinationDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
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
  const linkedTours = allTours.filter(
    (t) => t.destination_id === destination.id || t.destination_name === destination.name
  );

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.description,
    touristType: ['Luxury Travelers', 'Cultural Explorers'],
    image: destination.hero_image,
  };

  return (
    <div className="pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      {/* 1. HERO SECTION */}
      <section className="relative h-96 sm:h-[480px] flex items-end justify-center text-white mb-12">
        <Image
          src={destination.hero_image}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full space-y-2">
          <div className="flex items-center gap-2 text-xs text-white/70 mb-2 font-medium">
            <Link href="/destinations" className="hover:underline">Destinations</Link>
            <span>/</span>
            <span>{destination.region}</span>
          </div>

          <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm text-white border-0 text-[10px] uppercase tracking-widest">
            {destination.region}
          </Badge>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {destination.name}
          </h1>
          <p className="text-white/90 font-serif italic text-sm sm:text-lg max-w-2xl">
            &ldquo;{destination.tagline}&rdquo;
          </p>
        </div>
      </section>

      {/* 2. OVERVIEW & TRAVEL ESSENTIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Description & Highlights */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6 space-y-3">
              <h2 className="font-serif text-xl font-bold text-foreground">
                About {destination.name}
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {destination.description}
              </p>
            </Card>

            {/* Highlights Grid */}
            <Card className="p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-foreground">
                Signature Experiences in {destination.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {destination.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-muted/40 p-3 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                    <span className="text-xs text-foreground font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Gallery Thumbs */}
            {destination.gallery && destination.gallery.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Visual Impressions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {destination.gallery.map((img, idx) => (
                    <div key={idx} className="relative h-36 rounded-md overflow-hidden border border-border">
                      <Image
                        src={img}
                        alt={`${destination.name} impression ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Travel Essentials Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 space-y-5">
              <h3 className="font-serif text-lg font-bold text-foreground border-b border-border pb-3">
                Travel Essentials
              </h3>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-foreground">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Best Time to Visit</span>
                  </div>
                  <p className="text-muted-foreground pl-5 leading-relaxed">
                    {destination.best_time_to_visit}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-foreground">
                    <Sun className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Climate & Weather</span>
                  </div>
                  <p className="text-muted-foreground pl-5 leading-relaxed">
                    {destination.weather_info}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-foreground">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Recommended Duration</span>
                  </div>
                  <p className="text-muted-foreground pl-5 leading-relaxed">
                    {destination.ideal_duration}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <Link href={`/plan-your-trip?destination=${destination.name}`}>
                  <Button size="sm" className="w-full text-xs uppercase tracking-wider font-semibold">
                    Plan a Trip to {destination.name}
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. LINKED TOURS IN THIS DESTINATION */}
      {linkedTours.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-border">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground block mb-1">
              Curated Portfolios
            </span>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
              Journeys Featuring {destination.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {linkedTours.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
