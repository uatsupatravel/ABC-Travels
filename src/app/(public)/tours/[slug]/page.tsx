import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTourBySlug, getTours } from '@/lib/data-service';
import TourDetailExperience from '@/components/tours/TourDetailExperience';
import HeroStoryTrigger from '@/components/tours/HeroStoryTrigger';
import TourConciergeCard from '@/components/inquiry/TourConciergeCard';
import TourCard from '@/components/tours/TourCard';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import {
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Crown,
} from 'lucide-react';

interface TourDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: 'Tour Not Found | ABC Travels' };

  return {
    title: `${tour.title} | ABC Travels Luxury India`,
    description: tour.subtitle || tour.overview?.slice(0, 160),
    openGraph: {
      title: tour.title,
      description: tour.subtitle,
      images: [{ url: tour.hero_image, width: 1200, height: 630, alt: tour.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tour.title,
      description: tour.subtitle,
      images: [tour.hero_image],
    },
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const allTours = await getTours();
  const relatedTours = allTours.filter((t) => t.id !== tour.id).slice(0, 2);

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.subtitle,
    touristType: ['Luxury Travelers', 'Private Expeditions'],
    offers: {
      '@type': 'Offer',
      price: tour.price_usd,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: tour.itinerary.length,
      itemListElement: tour.itinerary.map((day, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: day.title,
        description: day.description,
      })),
    },
  };

  return (
    <div className="pt-24 pb-28 lg:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      {/* 1. HERO GALLERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 font-medium">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/tours" className="hover:text-foreground">Curated Journeys</Link>
          <span>/</span>
          <span className="text-foreground font-semibold line-clamp-1">{tour.title}</span>
        </div>

        {/* Title Header */}
        <div className="mb-6 max-w-4xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="text-xs">
              {tour.travel_style}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {tour.group_type}
            </Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {tour.title}
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            {tour.subtitle}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 h-72 sm:h-96 md:h-[460px] lg:h-[500px]">
          {/* Main Hero Featured Frame */}
          <div className="md:col-span-2 relative h-full rounded-xl overflow-hidden border border-border/80 bg-muted group cursor-pointer shadow-xs">
            <Image
              src={tour.hero_image}
              alt={tour.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 67vw, 900px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle Gradient Overlay for depth & button legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            
            {/* Frosted-Glass Hero Story Button */}
            <HeroStoryTrigger tour={tour} />
          </div>

          {/* Right Side Stacked Frames */}
          <div className="hidden md:grid grid-rows-2 gap-3.5 sm:gap-4 h-full">
            {tour.gallery.slice(1, 3).map((img, idx) => (
              <div
                key={idx}
                className="relative h-full rounded-xl overflow-hidden border border-border/80 bg-muted group cursor-pointer shadow-xs"
              >
                <Image
                  src={img}
                  alt={`${tour.title} gallery ${idx + 1}`}
                  fill
                  sizes="(max-width: 1280px) 33vw, 450px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Specs Bar (Responsive Grid & Clean Dividers) */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border border-border/80 bg-card text-center text-xs divide-y sm:divide-y-0 sm:divide-x divide-border/60 shadow-xs">
          <div className="pb-2 sm:pb-0">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground block font-semibold">
              Duration
            </span>
            <span className="font-semibold text-foreground text-xs sm:text-sm">
              {tour.duration_days} Days / {tour.duration_nights} Nights
            </span>
          </div>
          <div className="pb-2 sm:pb-0">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground block font-semibold">
              Region
            </span>
            <span className="font-semibold text-foreground text-xs sm:text-sm">
              {tour.destination_name || 'India'}
            </span>
          </div>
          <div className="pt-2 sm:pt-0">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground block font-semibold">
              Activity Level
            </span>
            <span className="font-semibold text-foreground text-xs sm:text-sm">
              {tour.activity_level}
            </span>
          </div>
          <div className="pt-2 sm:pt-0">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground block font-semibold">
              Group Type
            </span>
            <span className="font-semibold text-foreground text-xs sm:text-sm">
              100% Private Custom
            </span>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT & STICKY INQUIRY SIDEBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* 1. Curated Chapter Journey Timeline & Persistent Route Drawer */}
            <TourDetailExperience tour={tour} />

            {/* 2. Executive Journey Overview & Signature Highlights */}
            <Card className="p-6 space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground block mb-0.5">
                Executive Monograph
              </span>
              <h2 className="font-serif text-xl font-bold text-foreground">
                Journey Overview
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {tour.overview}
              </p>

              {/* Signature Highlights */}
              <div className="pt-4 border-t border-border space-y-2.5">
                <h3 className="font-serif text-base font-bold text-foreground">
                  Signature Highlights
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {tour.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-muted/40 p-2.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                      <span className="text-xs text-foreground font-medium leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Accommodations Showcase */}
            {tour.accommodations && tour.accommodations.length > 0 && (
              <Card className="p-6 space-y-5">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground block mb-1">
                    Stays
                  </span>
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    Curated Palace & Sanctuary Stays
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tour.accommodations.map((acc, idx) => (
                    <div
                      key={idx}
                      className="rounded-md border border-border overflow-hidden bg-card flex flex-col justify-between"
                    >
                      <div className="relative h-40 w-full bg-muted">
                        <Image
                          src={acc.image}
                          alt={acc.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="text-[10px] bg-black/60 text-white border-0">
                            {acc.tier}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3.5 space-y-1.5">
                        <h4 className="font-serif text-sm font-bold text-foreground">
                          {acc.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{acc.location}</span>
                        </div>
                        {acc.description && (
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            {acc.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Inclusions & Exclusions */}
            <Card className="p-6 space-y-5">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Inclusions & Exclusions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Included in Journey</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {tour.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-muted-foreground" />
                    <span>Not Included</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {tour.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Sticky Concierge Card */}
          <div className="lg:col-span-1">
            <TourConciergeCard tour={tour} />
          </div>
        </div>
      </section>

      {/* 3. SIMILAR RECOMMENDED */}
      {relatedTours.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground block">
                More Portfolios
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                You May Also Admire
              </h3>
            </div>
            <Link href="/tours" className="text-xs uppercase tracking-wider font-semibold text-foreground hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedTours.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
