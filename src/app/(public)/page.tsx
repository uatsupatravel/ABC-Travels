'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroSearchBar from '@/components/tours/HeroSearchBar';
import TourCard from '@/components/tours/TourCard';
import TourInquiryDrawer from '@/components/inquiry/TourInquiryDrawer';
import { mockTours } from '@/lib/mock-data/tours';
import { mockDestinations } from '@/lib/mock-data/destinations';
import { mockReviews } from '@/lib/mock-data/reviews';
import { Tour } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import {
  ShieldCheck,
  Award,
  Crown,
  Compass,
  ArrowRight,
  Star,
  Sparkles,
  PhoneCall,
} from 'lucide-react';

export default function HomePage() {
  const [selectedTourForInquiry, setSelectedTourForInquiry] = useState<Tour | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const featuredTours = mockTours.filter((t) => t.is_featured);

  const handleQuickInquire = (tour: Tour) => {
    setSelectedTourForInquiry(tour);
    setIsDrawerOpen(true);
  };

  return (
    <div className="relative">
      {/* 1. HERO SECTION (EDITORIAL ASYMMETRIC LAYOUT) */}
      <section className="relative min-h-[90vh] flex flex-col justify-center text-white px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85"
            alt="Udaipur Lake Palace Rajasthan"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="secondary" className="bg-white/10 backdrop-blur-md text-white border-white/20 text-[11px] uppercase tracking-widest">
              Private Inbound Journeys in India
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Where Ancient Heritage Meets <span className="italic font-normal">Modern Luxury</span>
            </h1>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
              Private palace sanctuaries in Rajasthan, dawn Bengal tiger tracking with master naturalists, high-pass Himalayan glamping, and restorative Ayurvedic backwaters tailored for the discerning global traveler.
            </p>
          </div>

          {/* Search Bar Container */}
          <div className="pt-2">
            <HeroSearchBar />
          </div>

          {/* Trust Markers Bar */}
          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-white/80 max-w-4xl">
            <div className="flex items-center gap-2 border-l border-white/30 pl-3">
              <span className="font-semibold text-white">100% Tailored</span>
              <span className="text-white/60">• Private Departures</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/30 pl-3">
              <span className="font-semibold text-white">5-Star Heritage</span>
              <span className="text-white/60">• Verified Stays</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/30 pl-3">
              <span className="font-semibold text-white">VIP Chauffeurs</span>
              <span className="text-white/60">• Executive Fleets</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/30 pl-3">
              <span className="font-semibold text-white">24/7 Concierge</span>
              <span className="text-white/60">• Local Dedicated Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE CURATED JOURNEYS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
              Handcrafted Portfolios
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Signature Journeys Across India
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
              Each itinerary is an unhurried, private exploration with luxury heritage accommodations and master local guides.
            </p>
          </div>

          <Link href="/tours">
            <Button variant="outline" size="sm" className="text-xs gap-1.5 font-semibold uppercase tracking-wider">
              <span>View All Itineraries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onQuickInquire={handleQuickInquire}
            />
          ))}
        </div>
      </section>

      {/* 3. DESTINATIONS & REGIONS EXPLORER */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
                Iconic Geographies
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                The Regions of India
              </h2>
            </div>
            <Link href="/destinations">
              <Button variant="outline" size="sm" className="text-xs gap-1.5 font-semibold uppercase tracking-wider">
                <span>All Destination Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDestinations.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group relative h-80 rounded-lg overflow-hidden border border-border flex flex-col justify-end p-6 text-white bg-card"
              >
                <Image
                  src={dest.hero_image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="relative z-10 space-y-1.5">
                  <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm text-white border-0 text-[10px]">
                    {dest.region}
                  </Badge>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-primary-foreground transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-white/80 text-xs line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-white">
                    <span>Discover Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE ABC TRAVELS STANDARD (EDITORIAL PILLARS) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            The Inbound Standard
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            The ABC Travels Distinction
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            We eliminate the complexity of traveling across the subcontinent, orchestrating aristocratic comfort, vetted safety, and authentic local immersion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-muted-foreground block">01 / STAYS</span>
            <h3 className="font-serif text-base font-bold text-foreground">Palace & Sanctuary Stays</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Stay in original royal suites at the Taj Lake Palace, Oberoi Amarvilas, and private tea estates.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-muted-foreground block">02 / FLEET</span>
            <h3 className="font-serif text-base font-bold text-foreground">Chauffeured Luxury Fleets</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Executive Mercedes, BMW, and 4x4 SUVs with vetted, English-speaking professional chauffeurs.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-muted-foreground block">03 / SCHOLARS</span>
            <h3 className="font-serif text-base font-bold text-foreground">Academic Historians</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Guided by licensed university art historians in heritage sites and veteran naturalists in tiger reserves.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-muted-foreground block">04 / CONCIERGE</span>
            <h3 className="font-serif text-base font-bold text-foreground">Dedicated Concierge</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A single senior travel designer oversees your journey from initial visa consultation to departure.
            </p>
          </Card>
        </div>
      </section>

      {/* 5. CUSTOM TRIP BUILDER PROMO BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-primary-foreground rounded-lg p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-border shadow-md">
          <div className="space-y-3 max-w-xl">
            <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-0 text-[10px] uppercase tracking-widest">
              Tailormade Journeys
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Have a Specific Vision for India?
            </h2>
            <p className="text-xs sm:text-sm text-primary-foreground/80 leading-relaxed">
              Whether you wish to combine Rajasthan’s desert forts with Kerala’s backwaters, or seek a private tiger safari charter, our senior designers craft every detail to your preferences.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link href="/plan-your-trip">
              <Button variant="secondary" className="text-xs uppercase tracking-wider font-semibold">
                Start Custom Itinerary
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-xs uppercase tracking-wider font-semibold">
                Speak with Concierge
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED TRAVELER REVIEWS */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12 space-y-1">
            <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
              Guest Reflections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Voices from Our Global Travelers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockReviews.map((review) => (
              <Card key={review.id} className="p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-foreground">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-muted-foreground">{review.trip_date}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-foreground">
                    &ldquo;{review.title}&rdquo;
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-foreground text-xs block">
                      {review.traveler_name}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {review.traveler_country}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    Verified Journey
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Inquiry Modal Drawer */}
      <TourInquiryDrawer
        tour={selectedTourForInquiry}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
