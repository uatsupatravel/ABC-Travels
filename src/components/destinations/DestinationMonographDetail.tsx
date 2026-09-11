'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Destination, Tour } from '@/types';
import TourCard from '@/components/tours/TourCard';
import { Button } from '@/components/ui/Button';
import {
  Calendar,
  Sun,
  Clock,
  Plane,
  Compass,
  Utensils,
  Bed,
  Sparkles,
  MapPin,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Train,
  Car,
  Camera,
  Layers,
  PhoneCall,
} from 'lucide-react';
import ConciergeCallbackModal from '@/components/inquiry/ConciergeCallbackModal';

interface DestinationMonographDetailProps {
  destination: Destination;
  linkedTours: Tour[];
}

const SECTION_LINKS = [
  { id: 'overview', label: 'Spirit of Place' },
  { id: 'chapters', label: 'Cultural Chapters' },
  { id: 'experiences', label: 'Signature Encounters' },
  { id: 'accommodations', label: 'Iconic Stays' },
  { id: 'culinary', label: 'Epicurean Heritage' },
  { id: 'seasons', label: 'Seasonal Compass' },
  { id: 'logistics', label: 'Insider Logistics' },
  { id: 'journeys', label: 'Curated Portfolios' },
];

export default function DestinationMonographDetail({
  destination,
  linkedTours,
}: DestinationMonographDetailProps) {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [isCallbackOpen, setIsCallbackOpen] = useState<boolean>(false);

  const galleryList = React.useMemo(() => {
    const list = Array.from(new Set(destination.gallery?.filter(Boolean) || []));
    return list.length > 0 ? list : [destination.hero_image];
  }, [destination.gallery, destination.hero_image]);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const overviewParagraphs = (destination.overview_extended || destination.description)
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="w-full min-h-screen bg-alabaster-cream text-ink-black selection:bg-secondary-container selection:text-ink-black">
      {/* 1. HERO SECTION */}
      <section className="relative h-[520px] sm:h-[600px] lg:h-[680px] w-full flex items-end justify-center text-white overflow-hidden">
        <Image
          src={destination.hero_image}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Layered cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/95 via-ink-black/45 to-ink-black/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full space-y-4">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-white/70 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link href="/destinations" className="hover:text-white transition-colors">
              Destinations
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white/90">{destination.region}</span>
          </nav>

          {/* Region Badge */}
          <div className="inline-flex items-center px-3.5 py-1 rounded bg-black/45 backdrop-blur-md text-white border border-white/25 font-label-caps text-[11px] uppercase tracking-widest font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] shadow-xs select-none">
            <span>{destination.region}</span>
          </div>

          {/* Destination Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight max-w-4xl">
            {destination.name}
          </h1>

          {/* Tagline */}
          <p className="font-serif italic text-base sm:text-xl text-white/90 max-w-3xl leading-relaxed">
            &ldquo;{destination.tagline}&rdquo;
          </p>

          {/* Key Facts Quick Compass Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs max-w-4xl">
            <div className="bg-black/40 backdrop-blur-md border border-white/15 rounded-md p-3">
              <div className="flex items-center gap-1.5 text-white/60 mb-1 font-label-caps text-[10px] uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-bronze-hover" />
                <span>Best Season</span>
              </div>
              <p className="text-white font-medium truncate">
                {destination.best_time_to_visit.split('(')[0].trim()}
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-white/15 rounded-md p-3">
              <div className="flex items-center gap-1.5 text-white/60 mb-1 font-label-caps text-[10px] uppercase tracking-wider">
                <Sun className="w-3.5 h-3.5 text-bronze-hover" />
                <span>Climate</span>
              </div>
              <p className="text-white font-medium truncate">{destination.weather_info}</p>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-white/15 rounded-md p-3">
              <div className="flex items-center gap-1.5 text-white/60 mb-1 font-label-caps text-[10px] uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-bronze-hover" />
                <span>Ideal Pace</span>
              </div>
              <p className="text-white font-medium truncate">{destination.ideal_duration}</p>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-white/15 rounded-md p-3">
              <div className="flex items-center gap-1.5 text-white/60 mb-1 font-label-caps text-[10px] uppercase tracking-wider">
                <Plane className="w-3.5 h-3.5 text-bronze-hover" />
                <span>Gateway</span>
              </div>
              <p className="text-white font-medium truncate">
                {destination.insider_logistics?.nearest_airports.split(',')[0].trim() || 'Regional Airport'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY IN-PAGE MONOGRAPH NAVIGATION BAR */}
      <div className="sticky top-16 z-30 bg-surface-container-lowest/95 backdrop-blur-md border-y border-silk-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1 py-2.5 min-w-max">
            {SECTION_LINKS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-label-caps uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === sec.id
                    ? 'bg-ink-black text-white'
                    : 'text-slate-taupe hover:text-ink-black hover:bg-surface-container'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* MAIN MONOGRAPH CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* CHAPTER 1: THE SPIRIT OF PLACE (OVERVIEW) */}
        <section id="overview" className="space-y-8 scroll-mt-28">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-px bg-bronze-hover" />
              <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
                Monograph Introduction
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ink-black">
              The Spirit of <span className="italic font-light">{destination.name}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Editorial Prose Column */}
            <div className="lg:col-span-7 space-y-5">
              {overviewParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className={`font-body-base text-slate-taupe leading-relaxed text-sm sm:text-base ${
                    idx === 0
                      ? 'first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:leading-none first-letter:pr-3 first-letter:pt-1 first-letter:text-ink-black first-letter:font-bold'
                      : ''
                  }`}
                >
                  {para}
                </p>
              ))}

              {/* Highlights Bullet Plaque */}
              {destination.highlights && destination.highlights.length > 0 && (
                <div className="pt-4 border-t border-silk-border space-y-3">
                  <h3 className="font-serif text-lg font-medium text-ink-black">
                    Signature Hallmarks
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {destination.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-taupe">
                        <span className="w-1.5 h-1.5 rounded-full bg-bronze-hover shrink-0 mt-1.5" />
                        <span className="leading-normal">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Visual Impressions Column */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative h-80 sm:h-96 rounded-lg overflow-hidden border border-silk-border shadow-sm bg-surface-container">
                <Image
                  src={galleryList[activeGalleryIndex] || destination.hero_image}
                  alt={`${destination.name} Impression Plate ${activeGalleryIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-all duration-300"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-label-caps tracking-widest text-white/90 uppercase border border-white/15 shadow-xs">
                  Plate {activeGalleryIndex + 1} of {galleryList.length}
                </div>
              </div>

              {/* Thumbnails Showcase */}
              {galleryList.length > 1 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-label-caps uppercase tracking-wider text-slate-taupe px-0.5">
                    <span>Curated Gallery</span>
                    <span className="text-[10px] text-bronze-hover lowercase italic">click to preview</span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {galleryList.map((img, i) => {
                      const isActive = i === activeGalleryIndex;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveGalleryIndex(i)}
                          className={`relative h-16 sm:h-20 rounded-md overflow-hidden border transition-all duration-200 text-left cursor-pointer ${
                            isActive
                              ? 'ring-2 ring-bronze-hover ring-offset-2 border-bronze-hover opacity-100 scale-[1.03]'
                              : 'border-silk-border opacity-70 hover:opacity-100 hover:border-ink-black/40'
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${destination.name} perspective ${i + 1}`}
                            fill
                            sizes="100px"
                            className="object-cover"
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-bronze-hover/10 pointer-events-none" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CHAPTER 2: CULTURAL & ARCHITECTURAL CHAPTERS */}
        {destination.monograph_chapters && destination.monograph_chapters.length > 0 && (
          <section id="chapters" className="space-y-12 scroll-mt-28 border-t border-silk-border pt-16">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-bronze-hover" />
                <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
                  Cultural In-Depth Narratives
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ink-black">
                Historical & Artistic <span className="italic font-light">Monographs</span>
              </h2>
            </div>

            <div className="space-y-16">
              {destination.monograph_chapters.map((ch, idx) => (
                <article
                  key={idx}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`lg:col-span-7 space-y-4 ${
                      idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded bg-surface-container text-bronze-hover font-label-caps text-[10px] uppercase tracking-widest font-semibold">
                      Chapter {['I', 'II', 'III', 'IV'][idx] || idx + 1}
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink-black leading-snug">
                      {ch.title}
                    </h3>
                    {ch.subtitle && (
                      <p className="font-serif italic text-sm sm:text-base text-bronze-hover">
                        {ch.subtitle}
                      </p>
                    )}
                    <p className="font-body-base text-slate-taupe text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {ch.content}
                    </p>
                  </div>

                  <div
                    className={`lg:col-span-5 ${
                      idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="relative h-72 sm:h-84 rounded-lg overflow-hidden border border-silk-border shadow-sm">
                      <Image
                        src={ch.image || destination.gallery[idx % destination.gallery.length]}
                        alt={ch.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                    {ch.caption && (
                      <p className="text-[11px] font-label-caps uppercase tracking-wider text-muted-foreground mt-2 text-center">
                        {ch.caption}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CHAPTER 3: CURATED SIGNATURE EXPERIENCES */}
        {destination.signature_experiences && destination.signature_experiences.length > 0 && (
          <section id="experiences" className="space-y-10 scroll-mt-28 border-t border-silk-border pt-16">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-bronze-hover" />
                <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
                  Exclusive Encounters
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ink-black">
                Signature <span className="italic font-light">Experiences</span>
              </h2>
              <p className="font-body-base text-slate-taupe text-sm sm:text-base">
                Curated encounters led by architectural scholars, royal historians, and wilderness trackers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.signature_experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg bg-surface-container-lowest border border-silk-border hover:border-ink-black/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] font-label-caps uppercase tracking-wider">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-bronze-hover font-semibold">
                        {exp.category}
                      </span>
                      {exp.duration && (
                        <span className="text-muted-foreground">{exp.duration}</span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-medium text-ink-black leading-snug">
                      {exp.title}
                    </h3>
                    <p className="font-body-base text-slate-taupe text-xs sm:text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-silk-border/60 flex items-center gap-1 text-bronze-hover text-[11px] font-label-caps uppercase tracking-wider font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>Exclusive Access</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CHAPTER 4: ICONIC LUXURY ACCOMMODATIONS */}
        {destination.luxury_accommodations && destination.luxury_accommodations.length > 0 && (
          <section id="accommodations" className="space-y-10 scroll-mt-28 border-t border-silk-border pt-16">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-bronze-hover" />
                <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
                  Palaces, Retreats & Tented Camps
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ink-black">
                Iconic <span className="italic font-light">Accommodations</span>
              </h2>
              <p className="font-body-base text-slate-taupe text-sm sm:text-base">
                Each property in our portfolio is selected for its architectural pedigree, heritage conservation, and aristocratic hospitality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {destination.luxury_accommodations.map((hotel, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden bg-surface-container-lowest border border-silk-border hover:border-ink-black/40 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <Image
                      src={hotel.image || destination.gallery[idx % destination.gallery.length]}
                      alt={hotel.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded bg-black/50 backdrop-blur-md text-white text-[10px] font-label-caps uppercase tracking-wider font-semibold">
                        {hotel.property_type}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-bronze-hover" />
                        <span>{hotel.location}</span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-medium text-ink-black">
                        {hotel.name}
                      </h3>
                      <p className="text-xs font-label-caps uppercase tracking-wider text-bronze-hover font-semibold">
                        Signature Suite: {hotel.room_category}
                      </p>
                      <p className="font-body-base text-slate-taupe text-xs sm:text-sm leading-relaxed">
                        {hotel.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-silk-border space-y-2">
                      <span className="text-[10px] font-label-caps uppercase tracking-wider text-muted-foreground block">
                        Signature Amenities
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {hotel.amenities.map((am, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-surface-container text-[10px] text-ink-black font-body-base"
                          >
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CHAPTER 5: ROYAL GASTRONOMY & EPICUREAN HERITAGE */}
        {destination.culinary_heritage && (
          <section id="culinary" className="space-y-10 scroll-mt-28 border-t border-silk-border pt-16">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-bronze-hover" />
                <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
                  Regional Gastronomy
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ink-black">
                Epicurean <span className="italic font-light">Heritage</span>
              </h2>
              <p className="font-body-base text-slate-taupe text-sm sm:text-base leading-relaxed">
                {destination.culinary_heritage.overview}
              </p>
            </div>

            {/* Signature Dishes Grid */}
            {destination.culinary_heritage.signature_dishes &&
              destination.culinary_heritage.signature_dishes.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {destination.culinary_heritage.signature_dishes.map((dish, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-lg bg-surface-container-lowest border border-silk-border space-y-2"
                    >
                      <span className="text-[10px] font-label-caps uppercase tracking-wider text-bronze-hover font-semibold block">
                        Dish {idx + 1}
                      </span>
                      <h4 className="font-serif text-lg font-medium text-ink-black">
                        {dish.name}
                      </h4>
                      <p className="font-body-base text-slate-taupe text-xs leading-relaxed">
                        {dish.description}
                      </p>
                      {dish.origins && (
                        <p className="text-[10px] font-label-caps uppercase text-muted-foreground pt-2 border-t border-silk-border/60">
                          Origins: {dish.origins}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

            {/* Ancestral Private Dining Ritual Callout Plaque */}
            {destination.culinary_heritage.private_dining_rituals &&
              destination.culinary_heritage.private_dining_rituals.length > 0 && (
                <div className="p-6 sm:p-8 rounded-lg bg-surface-container border border-bronze-hover/30 space-y-3">
                  <div className="flex items-center gap-2 text-bronze-hover">
                    <Utensils className="w-4 h-4" />
                    <span className="font-label-caps text-xs uppercase tracking-widest font-semibold">
                      Ancestral Dining Ritual
                    </span>
                  </div>
                  <p className="font-body-base text-ink-black text-sm sm:text-base leading-relaxed italic">
                    {destination.culinary_heritage.private_dining_rituals[0]}
                  </p>
                </div>
              )}
          </section>
        )}

        {/* CHAPTER 6: SEASONAL CLIMATE COMPASS */}
        {destination.seasonal_compass && destination.seasonal_compass.length > 0 && (
          <section id="seasons" className="space-y-10 scroll-mt-28 border-t border-silk-border pt-16">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-bronze-hover" />
                <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
                  Annual Weather Cycle
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ink-black">
                Seasonal <span className="italic font-light">Compass</span>
              </h2>
              <p className="font-body-base text-slate-taupe text-sm sm:text-base">
                Detailed temperature bands and atmospheric conditions to time your expedition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destination.seasonal_compass.map((sea, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg bg-surface-container-lowest border border-silk-border space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-label-caps uppercase tracking-wider text-bronze-hover font-semibold block">
                      {sea.months}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-ink-black">
                      {sea.season_name}
                    </h3>
                  </div>

                  <div className="py-2 px-3 rounded bg-surface-container text-xs text-ink-black font-semibold flex items-center gap-2">
                    <Sun className="w-3.5 h-3.5 text-bronze-hover" />
                    <span>{sea.temperature}</span>
                  </div>

                  <p className="font-body-base text-slate-taupe text-xs sm:text-sm leading-relaxed">
                    {sea.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CHAPTER 7: INSIDER LOGISTICS & ACCESS */}
        {destination.insider_logistics && (
          <section id="logistics" className="space-y-10 scroll-mt-28 border-t border-silk-border pt-16">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-bronze-hover" />
                <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
                  Arrival & Transit Logistics
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ink-black">
                Gateway <span className="italic font-light">Access</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-lg bg-surface-container-lowest border border-silk-border space-y-2">
                <div className="flex items-center gap-2 text-bronze-hover">
                  <Plane className="w-4 h-4" />
                  <span className="font-label-caps text-xs uppercase tracking-wider font-semibold">
                    Airports
                  </span>
                </div>
                <p className="font-body-base text-slate-taupe text-xs leading-relaxed">
                  {destination.insider_logistics.nearest_airports}
                </p>
              </div>

              <div className="p-5 rounded-lg bg-surface-container-lowest border border-silk-border space-y-2">
                <div className="flex items-center gap-2 text-bronze-hover">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-label-caps text-xs uppercase tracking-wider font-semibold">
                    Private Aviation
                  </span>
                </div>
                <p className="font-body-base text-slate-taupe text-xs leading-relaxed">
                  {destination.insider_logistics.private_aviation ||
                    'Executive charter handling and private jet ramp access available.'}
                </p>
              </div>

              <div className="p-5 rounded-lg bg-surface-container-lowest border border-silk-border space-y-2">
                <div className="flex items-center gap-2 text-bronze-hover">
                  <Train className="w-4 h-4" />
                  <span className="font-label-caps text-xs uppercase tracking-wider font-semibold">
                    Luxury Rail
                  </span>
                </div>
                <p className="font-body-base text-slate-taupe text-xs leading-relaxed">
                  {destination.insider_logistics.luxury_rail ||
                    'Connects with premium express trains and royal luxury tourist trains.'}
                </p>
              </div>

              <div className="p-5 rounded-lg bg-surface-container-lowest border border-silk-border space-y-2">
                <div className="flex items-center gap-2 text-bronze-hover">
                  <Car className="w-4 h-4" />
                  <span className="font-label-caps text-xs uppercase tracking-wider font-semibold">
                    Scenic Chauffeur
                  </span>
                </div>
                <p className="font-body-base text-slate-taupe text-xs leading-relaxed">
                  {destination.insider_logistics.scenic_drives ||
                    'Dedicated private luxury chauffeured vehicle with professional escort.'}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* CHAPTER 8: CURATED PORTFOLIOS (LINKED JOURNEYS) */}
        <section id="journeys" className="space-y-8 scroll-mt-28 border-t border-silk-border pt-16">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-px bg-bronze-hover" />
              <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
                Curated Expeditions
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ink-black">
              Journeys Featuring <span className="italic font-light">{destination.name}</span>
            </h2>
            <p className="font-body-base text-slate-taupe text-sm sm:text-base">
              Explore our master-crafted private itineraries that integrate {destination.name} into seamless subcontinent expeditions.
            </p>
          </div>

          {linkedTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {linkedTours.map((t) => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-12 rounded-lg bg-surface-container border border-silk-border text-center space-y-4 max-w-2xl mx-auto">
              <Compass className="w-8 h-8 text-bronze-hover mx-auto" />
              <h3 className="font-serif text-2xl font-medium text-ink-black">
                Custom Routes for {destination.name}
              </h3>
              <p className="font-body-base text-slate-taupe text-sm leading-relaxed">
                We design tailored private journeys incorporating {destination.name} with dedicated palace access, private aviation charters, and private naturalists.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href={`/plan-your-trip?destination=${encodeURIComponent(destination.name)}`}
                >
                  <Button className="bg-ink-black text-white hover:bg-bronze-hover transition-colors text-xs font-label-caps uppercase tracking-widest h-11 px-6 gap-2">
                    <span>Design Custom Itinerary</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsCallbackOpen(true)}
                  className="h-11 px-5 rounded-lg border border-silk-border bg-surface-container-lowest hover:bg-surface-container text-ink-black text-xs font-label-caps uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-bronze-hover" />
                  <span>Request Callback</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 9. UNDERSTATED PRIVATE ATELIER BANNER */}
        <div className="rounded-xl p-8 sm:p-12 bg-ink-black text-white space-y-5 text-center max-w-4xl mx-auto shadow-xl">
          <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-secondary-container block">
            Private Subcontinent Atelier
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-normal text-white max-w-2xl mx-auto leading-snug">
            Experience {destination.name} at Your Own Pace
          </h3>
          <p className="font-body-base text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our private travel specialists arrange custom journeys tailored to your exact dates, passions, and travel tempo.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href={`/plan-your-trip?destination=${encodeURIComponent(destination.name)}`}>
              <Button className="bg-secondary-container text-ink-black hover:bg-white transition-colors text-xs font-label-caps uppercase tracking-widest h-12 px-8 gap-2 cursor-pointer font-semibold shadow-md">
                <span>Design Custom Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setIsCallbackOpen(true)}
              className="h-12 px-6 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-label-caps uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-secondary-container" />
              <span>Request Callback</span>
            </button>
          </div>
        </div>
      </div>

      {/* Direct Concierge Callback Modal */}
      <ConciergeCallbackModal
        destinationName={destination.name}
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
      />
    </div>
  );
}
