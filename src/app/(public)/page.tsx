'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import TourCard from '@/components/tours/TourCard';
import ContactSpecialistDialog from '@/components/inquiry/ContactSpecialistDialog';
import HeroSlider from '@/components/home/HeroSlider';
import { getTours, getDestinations, getReviews } from '@/lib/data-service';
import { Tour, Destination, Review } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowRight,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  HeartHandshake,
  Loader2,
  Compass,
  PhoneCall,
} from 'lucide-react';

export default function HomePage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [selectedTourForInquiry, setSelectedTourForInquiry] = useState<Tour | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [fetchedTours, fetchedDestinations, fetchedReviews] = await Promise.all([
          getTours(),
          getDestinations(),
          getReviews(),
        ]);
        setTours(fetchedTours);
        setDestinations(fetchedDestinations);
        setReviews(fetchedReviews);
      } catch (err) {
        console.error('Error fetching initial data:', err);
      } finally {
        setIsLoadingData(false);
      }
    }
    loadInitialData();
  }, []);

  // Parallax & Fade Transforms for Hero (Untouched)
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  const handleContactSpecialist = (tour: Tour) => {
    setSelectedTourForInquiry(tour);
    setIsDrawerOpen(true);
  };

  // Select 3 standout signature tours for the homepage showcase
  const signatureTours = tours.slice(0, 3);

  return (
    <>
      {isLoadingData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-alabaster-cream">
          <div className="flex flex-col items-center gap-4 text-slate-taupe">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="font-label-caps tracking-widest text-xs uppercase">Loading Portfolios...</p>
          </div>
        </div>
      )}

      <div
        className={`relative bg-alabaster-cream text-ink-black selection:bg-secondary-container selection:text-ink-black ${
          isLoadingData ? 'h-screen overflow-hidden opacity-0' : 'opacity-100 transition-opacity duration-500'
        }`}
      >
        {/* ========================================================================= */}
        {/* 1. CINEMATIC HERO SECTION (100% UNTOUCHED)                                */}
        {/* ========================================================================= */}
        <section
          ref={heroRef}
          className="relative h-screen min-h-[720px] max-h-[1100px] w-full flex items-center justify-center overflow-hidden bg-ink-black"
        >
          <HeroSlider scale={heroImageScale} y={heroImageY} />

          <motion.div
            style={{ opacity: heroOpacity, y: heroTextY }}
            className="relative z-10 w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center justify-center space-y-6 pt-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-label-caps text-label-caps text-secondary-container tracking-[0.35em] uppercase"
            >
              Inbound Luxury
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display-2xl text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-medium tracking-tight text-white leading-[1.05] drop-shadow-sm"
            >
              Heritage Meets <span className="italic font-normal font-serif">Luxury</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-subhead text-white/80 text-sm sm:text-base font-light tracking-widest uppercase text-balance"
            >
              Private palace stays & curated expeditions
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4"
            >
              <a href="#welcome-section">
                <Button size="lg" variant="accent" className="gap-2 px-8 shadow-md">
                  <span>Explore Journeys</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          </motion.div>

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

        {/* ========================================================================= */}
        {/* 2. SENSORY WELCOME: "AN INVITATION TO INDIA"                               */}
        {/* ========================================================================= */}
        <section id="welcome-section" className="w-full py-24 px-margin-mobile md:px-margin-desktop bg-alabaster-cream border-b border-silk-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Text Editorial */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-px bg-bronze-hover" />
                  <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
                    An Invitation to the Subcontinent
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink-black font-normal leading-[1.15] text-balance">
                  Where Ancient Heritage Meets <span className="italic font-light">Serene Splendor</span>
                </h2>

                <p className="font-body-base text-slate-taupe text-base sm:text-lg leading-relaxed">
                  India is not merely a destination—it is a tapestry of royal lineages, sacred river ghats, mist-cloaked mountain monasteries, and secluded palm sanctuaries. 
                </p>

                <p className="font-body-base text-slate-taupe text-sm sm:text-base leading-relaxed">
                  At ABC Travels, we invite you to experience the subcontinent unhurried and elevated. Far from crowded tour buses, we orchestrate intimate encounters: dining under lantern-lit palace ramparts, tracing Bengal tigers through dawn mist with veteran naturalists, and sleeping in original royal chambers where maharajas once hosted world royalty.
                </p>

                <div className="pt-2 flex items-center gap-6">
                  <Link href="/about">
                    <Button variant="outline" className="border-ink-black/20 text-ink-black hover:bg-ink-black/5 gap-2">
                      <span>Our Heritage & Philosophy</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <a href="#realms" className="text-xs font-label-caps uppercase tracking-widest text-slate-taupe hover:text-ink-black transition-colors">
                    Explore Landscapes ↓
                  </a>
                </div>
              </div>

              {/* Magazine Style Visual Pairing */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
                <div className="space-y-4">
                  <div className="relative h-64 sm:h-72 rounded-lg overflow-hidden border border-silk-border shadow-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop"
                      alt="Taj Mahal Balcony View"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4 bg-cream-container border border-silk-border rounded-lg text-center">
                    <span className="font-serif text-2xl text-ink-black font-bold block">100%</span>
                    <span className="font-label-caps text-[10px] text-slate-taupe tracking-wider uppercase">Private Custom Journeys</span>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="p-4 bg-ink-black text-alabaster-cream border border-silk-border rounded-lg text-center">
                    <span className="font-serif text-2xl text-secondary-container font-bold block">24/7</span>
                    <span className="font-label-caps text-[10px] text-white/70 tracking-wider uppercase">On-Ground Concierge</span>
                  </div>
                  <div className="relative h-64 sm:h-72 rounded-lg overflow-hidden border border-silk-border shadow-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop"
                      alt="Kerala Backwaters Palm Trees"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. THE ABC TRAVELS DISTINCTION (CLEAN EDITORIAL PILLARS)                   */}
        {/* ========================================================================= */}
        <section className="w-full py-20 px-margin-mobile md:px-margin-desktop bg-cream-container border-b border-silk-border">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-slate-taupe">
                The ABC Travels Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink-black">
                How We Host You in India
              </h2>
              <p className="font-body-base text-slate-taupe text-sm leading-relaxed">
                We remove the complexities of international travel across the subcontinent, ensuring seamless comfort from your arrival gate to your return departure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-alabaster-cream border border-silk-border p-8 rounded-lg space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-label-caps text-xs tracking-widest text-bronze-hover block pb-2 border-b border-silk-border">
                  01 / Bespoke Pace
                </span>
                <h3 className="font-serif text-xl font-semibold text-ink-black">
                  Unhurried, Private Departures
                </h3>
                <p className="text-sm text-slate-taupe leading-relaxed">
                  No rigid group schedules or rushing. Every morning departure, museum visit, and afternoon tea is tailored completely around your personal rhythm and comfort.
                </p>
              </div>

              <div className="bg-alabaster-cream border border-silk-border p-8 rounded-lg space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-label-caps text-xs tracking-widest text-bronze-hover block pb-2 border-b border-silk-border">
                  02 / Palace & Heritage Stays
                </span>
                <h3 className="font-serif text-xl font-semibold text-ink-black">
                  Authentic Royal Residencies
                </h3>
                <p className="text-sm text-slate-taupe leading-relaxed">
                  We hand-select iconic heritage palace hotels, Oberoi sanctuaries, and boutique tea estates that reflect true architectural elegance and refined hospitality.
                </p>
              </div>

              <div className="bg-alabaster-cream border border-silk-border p-8 rounded-lg space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-label-caps text-xs tracking-widest text-bronze-hover block pb-2 border-b border-silk-border">
                  03 / Dedicated Concierge Host
                </span>
                <h3 className="font-serif text-xl font-semibold text-ink-black">
                  Executive Chauffeurs & 24/7 Care
                </h3>
                <p className="text-sm text-slate-taupe leading-relaxed">
                  Travel in private luxury vehicles with vetted English-speaking chauffeurs, accompanied by licensed academic guides and a 24/7 dedicated senior concierge on call.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. THE FOUR REALMS OF THE SUBCONTINENT (VISUAL CHAPTERS)                   */}
        {/* ========================================================================= */}
        <section id="realms" className="w-full py-24 px-margin-mobile md:px-margin-desktop bg-alabaster-cream border-b border-silk-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
              <div className="max-w-2xl space-y-3">
                <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover block">
                  Geographic Contrast
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink-black">
                  The Four Realms of India
                </h2>
                <p className="font-body-base text-slate-taupe text-sm sm:text-base">
                  From high alpine serenity to tropical backwaters and royal desert kingdoms.
                </p>
              </div>

              <Link href="/destinations">
                <Button variant="outline" className="border-ink-black/20 text-ink-black hover:bg-ink-black/5 gap-2">
                  <span>View All Destinations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Realm 1: Rajasthan & North India */}
              <Link
                href="/destinations/rajasthan"
                className="group relative h-[420px] rounded-lg overflow-hidden border border-silk-border flex flex-col justify-end p-8 sm:p-10 text-white bg-surface-dim shadow-sm"
              >
                <Image
                  src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop"
                  alt="Rajasthan Fortresses"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/40 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-0 text-[10px] uppercase tracking-widest font-label-caps">
                    Heritage & Palaces
                  </Badge>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium group-hover:text-secondary-container transition-colors">
                    Royal Rajasthan & The Golden Triangle
                  </h3>
                  <p className="text-white/80 font-body-base text-xs sm:text-sm max-w-md line-clamp-2 leading-relaxed">
                    Centuries-old fortress walls, private lakeside palace dining, vibrant bazaars, and aristocratic heritage suites.
                  </p>
                  <div className="pt-2 flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-secondary-container">
                    <span>Explore Itineraries</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Realm 2: High Himalayas & Ladakh */}
              <Link
                href="/destinations/ladakh"
                className="group relative h-[420px] rounded-lg overflow-hidden border border-silk-border flex flex-col justify-end p-8 sm:p-10 text-white bg-surface-dim shadow-sm"
              >
                <Image
                  src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop"
                  alt="Ladakh Himalayas"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/40 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-0 text-[10px] uppercase tracking-widest font-label-caps">
                    Alpine Expeditions
                  </Badge>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium group-hover:text-secondary-container transition-colors">
                    The High Himalayas & Ladakh
                  </h3>
                  <p className="text-white/80 font-body-base text-xs sm:text-sm max-w-md line-clamp-2 leading-relaxed">
                    Cliffside Buddhist monasteries, dramatic mountain passes, pristine azure lakes, and secluded luxury glamping under starry skies.
                  </p>
                  <div className="pt-2 flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-secondary-container">
                    <span>Explore Itineraries</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Realm 3: Emerald South & Kerala */}
              <Link
                href="/destinations/kerala"
                className="group relative h-[420px] rounded-lg overflow-hidden border border-silk-border flex flex-col justify-end p-8 sm:p-10 text-white bg-surface-dim shadow-sm"
              >
                <Image
                  src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop"
                  alt="Kerala Backwaters"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/40 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-0 text-[10px] uppercase tracking-widest font-label-caps">
                    Sanctuary & Wellness
                  </Badge>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium group-hover:text-secondary-container transition-colors">
                    The Emerald South & Kerala
                  </h3>
                  <p className="text-white/80 font-body-base text-xs sm:text-sm max-w-md line-clamp-2 leading-relaxed">
                    Private thatched houseboats gliding through palm-fringed backwaters, organic spice plantations, and authentic Ayurvedic wellness retreats.
                  </p>
                  <div className="pt-2 flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-secondary-container">
                    <span>Explore Itineraries</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Realm 4: Ranthambore & Tiger Sanctuaries */}
              <Link
                href="/destinations/ranthambore"
                className="group relative h-[420px] rounded-lg overflow-hidden border border-silk-border flex flex-col justify-end p-8 sm:p-10 text-white bg-surface-dim shadow-sm"
              >
                <Image
                  src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1200&auto=format&fit=crop"
                  alt="Royal Bengal Tiger Safari"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/40 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-0 text-[10px] uppercase tracking-widest font-label-caps">
                    Wildlife & Safaris
                  </Badge>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium group-hover:text-secondary-container transition-colors">
                    The Royal Bengal Tiger Sanctuaries
                  </h3>
                  <p className="text-white/80 font-body-base text-xs sm:text-sm max-w-md line-clamp-2 leading-relaxed">
                    Exclusive open-top 4x4 jungle expeditions through ancient banyan forests, led by veteran naturalists in premier national parks.
                  </p>
                  <div className="pt-2 flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-secondary-container">
                    <span>Explore Itineraries</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CURATED SIGNATURE COLLECTIONS (NO CLUTTER - JUST 3 ICONIC JOURNEYS)    */}
        {/* ========================================================================= */}
        <section className="w-full py-24 px-margin-mobile md:px-margin-desktop bg-cream-container border-b border-silk-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
              <div className="max-w-2xl space-y-3">
                <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover block">
                  Curated Portfolios
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink-black">
                  Signature Curated Journeys
                </h2>
                <p className="font-body-base text-slate-taupe text-sm sm:text-base">
                  Three handcrafted itineraries representing the pinnacle of private Indian travel. Every departure is customizable to your exact dates.
                </p>
              </div>

              <Link href="/tours">
                <Button variant="accent" className="gap-2 shadow-md">
                  <span>View All Portfolios ({tours.length || 6})</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Pristine 3-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {signatureTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  onContactSpecialist={handleContactSpecialist}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-xs text-slate-taupe font-label-caps tracking-widest uppercase">
                Looking for a custom route? Our Concierge builds 100% bespoke private itineraries.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. ACCREDITATIONS & TRUST (GOVT. RECOGNITION & AFFILIATIONS)              */}
        {/* ========================================================================= */}
        <section className="w-full py-16 px-margin-mobile md:px-margin-desktop bg-alabaster-cream border-b border-silk-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-ink-black">
              <div className="p-6 border border-silk-border rounded-lg bg-surface-container-lowest flex flex-col items-center gap-2">
                <Award className="w-6 h-6 text-bronze-hover opacity-90" />
                <span className="font-serif font-bold text-sm">Ministry of Tourism</span>
                <span className="font-label-caps text-[10px] text-slate-taupe uppercase tracking-wider">Govt. of India Recognized</span>
              </div>

              <div className="p-6 border border-silk-border rounded-lg bg-surface-container-lowest flex flex-col items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-bronze-hover opacity-90" />
                <span className="font-serif font-bold text-sm">IATA Accredited</span>
                <span className="font-label-caps text-[10px] text-slate-taupe uppercase tracking-wider">Global Standards & Safety</span>
              </div>

              <div className="p-6 border border-silk-border rounded-lg bg-surface-container-lowest flex flex-col items-center gap-2">
                <HeartHandshake className="w-6 h-6 text-bronze-hover opacity-90" />
                <span className="font-serif font-bold text-sm">100% Tailormade</span>
                <span className="font-label-caps text-[10px] text-slate-taupe uppercase tracking-wider">Private Custom Travel</span>
              </div>

              <div className="p-6 border border-silk-border rounded-lg bg-surface-container-lowest flex flex-col items-center gap-2">
                <Compass className="w-6 h-6 text-bronze-hover opacity-90" />
                <span className="font-serif font-bold text-sm">Inbound Specialists</span>
                <span className="font-label-caps text-[10px] text-slate-taupe uppercase tracking-wider">25+ Years Experience</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. VERIFIED TRAVELER REFLECTIONS                                          */}
        {/* ========================================================================= */}
        <section className="w-full py-24 px-margin-mobile md:px-margin-desktop bg-cream-container border-b border-silk-border">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-xl mb-14 space-y-3">
              <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover block">
                Guest Reflections
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink-black">
                Words from Discerning Travelers
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-silk-border bg-alabaster-cream p-8 sm:p-10 rounded-lg space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-bronze-hover">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      {review.tour_title && (
                        <Badge variant="secondary" className="text-[10px] bg-secondary-container/50 text-ink-black border-0 font-label-caps tracking-wider">
                          {review.tour_title}
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-ink-black font-medium leading-snug">
                      &ldquo;{review.title}&rdquo;
                    </h3>
                    <p className="font-body-base text-slate-taupe text-sm sm:text-base leading-relaxed italic">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-silk-border flex items-center justify-between">
                    <div>
                      <span className="font-serif font-semibold text-ink-black text-sm sm:text-base block">
                        {review.traveler_name}
                      </span>
                      <span className="text-xs text-slate-taupe flex items-center gap-1.5 pt-0.5">
                        <MapPin className="w-3 h-3 text-bronze-hover opacity-80" />
                        {review.traveler_country}
                      </span>
                    </div>
                    <span className="font-label-caps text-[11px] text-slate-taupe tracking-wider uppercase">
                      {review.trip_date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. QUIET CLOSING CALL TO ACTION                                           */}
        {/* ========================================================================= */}
        <section className="w-full py-20 px-margin-mobile md:px-margin-desktop bg-alabaster-cream">
          <div className="max-w-7xl mx-auto">
            <div className="bg-ink-black text-alabaster-cream rounded-xl p-10 sm:p-14 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 border border-silk-border shadow-xl">
              <div className="space-y-4 max-w-2xl text-center lg:text-left">
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-alabaster-cream border-0 text-[10px] uppercase tracking-widest font-label-caps"
                >
                  Tailormade Journeys
                </Badge>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
                  Begin Sculpting Your Indian Odyssey
                </h2>
                <p className="font-body-base text-white/70 text-sm sm:text-base leading-relaxed">
                  Whether you wish to combine Rajasthan’s desert fortresses with Kerala’s backwaters, or seek a private tiger safari charter, our senior concierge sculpts every detail to your preferences.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
                <Link href="/plan-your-trip" className="w-full sm:w-auto">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto px-8 shadow-md">
                    Start Custom Itinerary
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
                  >
                    Speak with Concierge
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Specialist Contact Dialog */}
        <ContactSpecialistDialog
          tour={selectedTourForInquiry}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </>
  );
}
