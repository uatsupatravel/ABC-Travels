'use client';

import React, { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import TourCard from '@/components/tours/TourCard';
import TourInquiryDrawer from '@/components/inquiry/TourInquiryDrawer';
import { mockTours } from '@/lib/mock-data/tours';
import { mockDestinations } from '@/lib/mock-data/destinations';
import { mockReviews } from '@/lib/mock-data/reviews';
import { Tour, TravelStyle } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  ArrowRight,
  Star,
  SlidersHorizontal,
  Search,
  RotateCcw,
  Sparkles,
  MapPin,
  Calendar,
  ChevronDown,
} from 'lucide-react';

const CATEGORY_TABS: { label: string; value: 'all' | TravelStyle }[] = [
  { label: 'All Portfolios', value: 'all' },
  { label: 'Heritage & Palaces', value: 'Heritage & Palaces' },
  { label: 'Wildlife Safari', value: 'Wildlife Safari' },
  { label: 'Spiritual & Wellness', value: 'Spiritual & Wellness' },
  { label: 'Himalayan Exploration', value: 'Himalayan Exploration' },
];

export default function HomePage() {
  const [selectedTourForInquiry, setSelectedTourForInquiry] = useState<Tour | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | TravelStyle>('all');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Search/filter controls
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax & Fade Transforms for Hero
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  const handleQuickInquire = (tour: Tour) => {
    setSelectedTourForInquiry(tour);
    setIsDrawerOpen(true);
  };

  const resetFilters = () => {
    setActiveTab('all');
    setSelectedRegion('all');
    setSelectedDuration('all');
    setSearchKeyword('');
  };

  // Filtered journeys for homepage
  const displayedTours = useMemo(() => {
    return mockTours.filter((tour) => {
      // Category Tab
      if (activeTab !== 'all' && tour.travel_style !== activeTab) return false;

      // Region
      if (selectedRegion !== 'all') {
        const dest = mockDestinations.find(
          (d) => d.id === tour.destination_id || d.name === tour.destination_name
        );
        if (!dest || dest.region !== selectedRegion) return false;
      }

      // Duration
      if (selectedDuration === 'short' && tour.duration_days > 5) return false;
      if (selectedDuration === 'medium' && (tour.duration_days < 6 || tour.duration_days > 9))
        return false;
      if (selectedDuration === 'long' && tour.duration_days < 10) return false;

      // Keyword
      if (searchKeyword.trim() !== '') {
        const q = searchKeyword.toLowerCase();
        const matchTitle = tour.title.toLowerCase().includes(q);
        const matchSubtitle = tour.subtitle.toLowerCase().includes(q);
        const matchDest = tour.destination_name?.toLowerCase().includes(q) ?? false;
        if (!matchTitle && !matchSubtitle && !matchDest) return false;
      }

      return true;
    });
  }, [activeTab, selectedRegion, selectedDuration, searchKeyword]);

  const hasActiveFilters =
    activeTab !== 'all' ||
    selectedRegion !== 'all' ||
    selectedDuration !== 'all' ||
    searchKeyword.trim() !== '';

  return (
    <div className="relative bg-alabaster-cream text-ink-black selection:bg-secondary-container selection:text-ink-black">
      {/* 1. CINEMATIC HERO SECTION (SPACIOUS & MESMERIZING) */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[720px] max-h-[1100px] w-full flex items-center justify-center overflow-hidden bg-ink-black"
      >
        {/* Parallax Background Media */}
        <motion.div
          style={{ scale: heroImageScale, y: heroImageY }}
          className="absolute inset-0 z-0 origin-center"
        >
          <Image
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=90"
            alt="Udaipur Lake Palace & Aravalli Hills"
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          {/* Subtle cinematic gradient overlays for pristine readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/40 to-ink-black/60" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60" />
        </motion.div>

        {/* Hero Content Container */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroTextY }}
          className="relative z-10 w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center justify-center space-y-6 pt-16"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-label-caps text-label-caps text-secondary-container tracking-[0.35em] uppercase"
          >
            Inbound Luxury
          </motion.span>

          {/* Majestic Minimal Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display-2xl text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-medium tracking-tight text-white leading-[1.05] drop-shadow-sm"
          >
            Heritage Meets <span className="italic font-normal font-serif">Luxury</span>
          </motion.h1>

          {/* Minimal 6-word Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-subhead text-white/80 text-sm sm:text-base font-light tracking-widest uppercase text-balance"
          >
            Private palace stays & curated expeditions
          </motion.p>

          {/* Single Minimal Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4"
          >
            <a href="#journeys-section">
              <Button size="lg" variant="accent" className="gap-2 px-8 shadow-md">
                <span>Explore Journeys</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-label-caps text-[9px] tracking-[0.25em] text-white/60 uppercase">
            Scroll to Discover
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* 2. REFINED VALUE PROPOSITION & TRUST BAR */}
      <div className="w-full bg-cream-container border-b border-silk-border py-10 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-6 font-label-caps text-label-caps tracking-widest text-slate-taupe">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-bronze-hover" /> 100% Tailored Private Departures
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-bronze-hover" /> 5-Star Heritage & Palace Suites
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-bronze-hover" /> Dedicated English-Speaking Chauffeurs
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-bronze-hover" /> 24/7 Personal Senior Concierge
          </span>
        </div>
      </div>

      {/* 3. SIGNATURE JOURNEYS & INTERACTIVE DISCOVERY SUITE */}
      <main id="journeys-section" className="w-full px-margin-mobile md:px-margin-desktop py-section-gap-lg">
        <section className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="block font-label-caps text-label-caps tracking-widest text-slate-taupe uppercase">
                Handcrafted Portfolios
              </span>
              <h2 className="font-display-2xl-mobile md:font-display-2xl text-display-2xl-mobile md:text-display-2xl text-ink-black">
                Signature Journeys Across India
              </h2>
              <p className="font-subhead text-subhead text-slate-taupe">
                Each itinerary is an unhurried, private exploration with luxury heritage accommodations and master local guides.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={isSearchExpanded ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{isSearchExpanded ? 'Hide Filters' : 'Refine & Filter'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isSearchExpanded ? 'rotate-180' : ''
                  }`}
                />
              </Button>

              <Link href="/tours">
                <Button variant="ghost" size="sm" className="gap-1.5 group">
                  <span>Full Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-silk-border no-scrollbar">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`relative px-5 py-2.5 rounded font-label-caps text-label-caps tracking-widest uppercase transition-colors duration-300 shrink-0 ${
                    isActive ? 'text-alabaster-cream' : 'text-slate-taupe hover:text-ink-black'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-ink-black rounded"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Expandable Refinement Panel with Smooth Spring Animation */}
          <AnimatePresence>
            {isSearchExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="overflow-hidden mb-12"
              >
                <div className="bg-surface-container-lowest border border-silk-border p-6 rounded-lg shadow-sm space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Region Selector */}
                    <div className="space-y-1.5">
                      <label className="font-label-caps text-[10px] tracking-widest text-slate-taupe uppercase flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> Region
                      </label>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="minimal-input w-full py-2 font-body-base text-sm text-ink-black bg-transparent cursor-pointer"
                      >
                        <option value="all">All Regions Across India</option>
                        <option value="North India">North India (Rajasthan & Delhi)</option>
                        <option value="South India">South India (Kerala Coast)</option>
                        <option value="Himalayas & Ladakh">Himalayas & Ladakh</option>
                        <option value="Central India">Central India (Tiger Reserves)</option>
                        <option value="Western India">Western India (Goa & Mumbai)</option>
                      </select>
                    </div>

                    {/* Duration Selector */}
                    <div className="space-y-1.5">
                      <label className="font-label-caps text-[10px] tracking-widest text-slate-taupe uppercase flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> Duration
                      </label>
                      <select
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="minimal-input w-full py-2 font-body-base text-sm text-ink-black bg-transparent cursor-pointer"
                      >
                        <option value="all">Any Duration</option>
                        <option value="short">3 to 5 Days (Short Escapes)</option>
                        <option value="medium">6 to 9 Days (Classic Journeys)</option>
                        <option value="long">10+ Days (Grand Expeditions)</option>
                      </select>
                    </div>

                    {/* Search Keyword */}
                    <div className="space-y-1.5">
                      <label className="font-label-caps text-[10px] tracking-widest text-slate-taupe uppercase flex items-center gap-1.5">
                        <Search className="w-3 h-3" /> Destination / Keyword
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Udaipur, Houseboat, Tiger..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="minimal-input w-full py-2 font-body-base text-sm text-ink-black"
                      />
                    </div>
                  </div>

                  {/* Reset Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-silk-border text-xs text-slate-taupe">
                    <span>
                      Displaying <strong className="text-ink-black">{displayedTours.length}</strong> matching portfolios
                    </span>
                    {hasActiveFilters && (
                      <button
                        onClick={resetFilters}
                        className="flex items-center gap-1 font-label-caps text-label-caps uppercase tracking-widest text-ink-black hover:text-bronze-hover transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset Filters
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Staggered Animated Tour Cards Grid */}
          {displayedTours.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop"
            >
              <AnimatePresence>
                {displayedTours.map((tour) => (
                  <motion.div
                    key={tour.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <TourCard tour={tour} onQuickInquire={handleQuickInquire} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="border border-silk-border bg-surface-container-lowest p-16 rounded-lg text-center space-y-4 max-w-xl mx-auto">
              <Sparkles className="w-8 h-8 text-bronze-hover mx-auto" />
              <h3 className="font-headline-lg text-headline-lg text-ink-black">
                No matching portfolios found
              </h3>
              <p className="font-body-base text-slate-taupe text-sm">
                We craft 100% tailormade private itineraries customized to your exact dates and preferences.
              </p>
              <div className="pt-2 flex items-center justify-center gap-4">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Clear All Filters
                </Button>
                <Link href="/plan-your-trip">
                  <Button variant="default" size="sm">
                    Custom Route Request
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-silk-border my-section-gap-lg max-w-7xl mx-auto" />

        {/* 4. DESTINATIONS & REGIONS OF INDIA */}
        <section className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="block font-label-caps text-label-caps tracking-widest text-slate-taupe uppercase">
                Subcontinent Exploration
              </span>
              <h2 className="font-display-2xl-mobile md:font-display-2xl text-display-2xl-mobile md:text-display-2xl text-ink-black">
                The Regions of India
              </h2>
              <p className="font-subhead text-subhead text-slate-taupe">
                From the golden sandstone fortresses of Rajasthan to the serene backwaters of Kerala.
              </p>
            </div>
            <Link href="/destinations">
              <Button variant="outline" size="sm" className="gap-2">
                <span>All Destination Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
            {mockDestinations.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="card-monograph group relative h-96 rounded-lg overflow-hidden border border-silk-border flex flex-col justify-end p-8 text-white bg-surface-dim"
              >
                <Image
                  src={dest.hero_image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="media-reveal object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/85 via-ink-black/30 to-transparent" />

                <div className="relative z-10 space-y-2">
                  <Badge variant="secondary" className="bg-ink-black/60 backdrop-blur-md text-alabaster-cream border-0 text-[10px]">
                    {dest.region}
                  </Badge>
                  <h3 className="font-headline-lg text-2xl text-alabaster-cream group-hover:text-secondary-container transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-white/80 font-body-base text-xs line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>
                  <div className="pt-2 flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-alabaster-cream group-hover:text-secondary-container">
                    <span>Discover Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-silk-border my-section-gap-lg max-w-7xl mx-auto" />

        {/* 5. THE ABC TRAVELS DISTINCTION (EDITORIAL PILLARS) */}
        <section className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-3xl space-y-3">
            <span className="block font-label-caps text-label-caps tracking-widest text-slate-taupe uppercase">
              The Inbound Standard
            </span>
            <h2 className="font-display-2xl-mobile md:font-display-2xl text-display-2xl-mobile md:text-display-2xl text-ink-black">
              The ABC Travels Distinction
            </h2>
            <p className="font-subhead text-subhead text-slate-taupe">
              We eliminate the complexity of traveling across the subcontinent, orchestrating aristocratic comfort, vetted safety, and authentic local immersion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-silk-border p-8 rounded-lg bg-surface-container-lowest space-y-4">
              <span className="block font-label-caps text-label-caps tracking-widest text-slate-taupe pb-2 border-b border-silk-border">
                01 / Stays
              </span>
              <h4 className="font-headline-lg text-xl text-ink-black">Palace & Sanctuary Stays</h4>
              <p className="font-body-base text-sm text-slate-taupe leading-relaxed">
                Stay in original royal suites at the Taj Lake Palace, Oberoi Amarvilas, and private tea estates.
              </p>
            </div>

            <div className="border border-silk-border p-8 rounded-lg bg-surface-container-lowest space-y-4">
              <span className="block font-label-caps text-label-caps tracking-widest text-slate-taupe pb-2 border-b border-silk-border">
                02 / Fleet
              </span>
              <h4 className="font-headline-lg text-xl text-ink-black">Chauffeured Luxury Fleets</h4>
              <p className="font-body-base text-sm text-slate-taupe leading-relaxed">
                Executive Mercedes, BMW, and robust 4x4 SUVs with vetted, English-speaking professional chauffeurs.
              </p>
            </div>

            <div className="border border-silk-border p-8 rounded-lg bg-surface-container-lowest space-y-4">
              <span className="block font-label-caps text-label-caps tracking-widest text-slate-taupe pb-2 border-b border-silk-border">
                03 / Scholars
              </span>
              <h4 className="font-headline-lg text-xl text-ink-black">Academic Historians</h4>
              <p className="font-body-base text-sm text-slate-taupe leading-relaxed">
                Guided by licensed university art historians in heritage sites and veteran naturalists in tiger reserves.
              </p>
            </div>

            <div className="border border-silk-border p-8 rounded-lg bg-surface-container-lowest space-y-4">
              <span className="block font-label-caps text-label-caps tracking-widest text-slate-taupe pb-2 border-b border-silk-border">
                04 / Concierge
              </span>
              <h4 className="font-headline-lg text-xl text-ink-black">Dedicated Concierge</h4>
              <p className="font-body-base text-sm text-slate-taupe leading-relaxed">
                A single senior travel designer oversees your journey from initial consultation to return departure.
              </p>
            </div>
          </div>
        </section>

        {/* 6. TAILORMADE TRIP BUILDER PROMO BANNER */}
        <section className="mt-section-gap-lg max-w-7xl mx-auto">
          <div className="bg-ink-black text-alabaster-cream rounded-lg p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-silk-border">
            <div className="space-y-4 max-w-xl">
              <Badge variant="secondary" className="bg-white/10 text-alabaster-cream border-0 text-[10px] uppercase tracking-widest font-label-caps">
                Tailormade Journeys
              </Badge>
              <h2 className="font-display-xl text-3xl md:text-4xl text-alabaster-cream font-bold">
                Have a Specific Vision for India?
              </h2>
              <p className="font-body-base text-slate-taupe text-sm leading-relaxed">
                Whether you wish to combine Rajasthan’s desert fortresses with Kerala’s backwaters, or seek a private tiger safari charter, our senior designers craft every detail to your preferences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Link href="/plan-your-trip">
                <Button variant="accent" size="lg">
                  Start Custom Itinerary
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white/30 text-alabaster-cream hover:bg-white/10">
                  Speak with Concierge
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 7. VERIFIED TRAVELER REVIEWS */}
        <section className="mt-section-gap-lg max-w-7xl mx-auto">
          <div className="max-w-xl mb-12 space-y-3">
            <span className="block font-label-caps text-label-caps tracking-widest text-slate-taupe uppercase">
              Guest Reflections
            </span>
            <h2 className="font-display-2xl-mobile md:font-display-2xl text-display-2xl-mobile md:text-display-2xl text-ink-black">
              Voices from Our Global Travelers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className="border border-silk-border bg-surface-container-lowest p-8 rounded-lg space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-bronze-hover">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-label-caps text-[11px] text-slate-taupe">{review.trip_date}</span>
                  </div>

                  <h3 className="font-headline-lg text-xl text-ink-black leading-snug">
                    &ldquo;{review.title}&rdquo;
                  </h3>
                  <p className="font-body-base text-slate-taupe text-sm leading-relaxed italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-silk-border flex items-center justify-between">
                  <div>
                    <span className="font-medium text-ink-black text-sm block">
                      {review.traveler_name}
                    </span>
                    <span className="text-xs text-slate-taupe">
                      {review.traveler_country}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    Verified Journey
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Quick Inquiry Modal Drawer */}
      <TourInquiryDrawer
        tour={selectedTourForInquiry}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
