'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import TourCard from '@/components/tours/TourCard';
import ContactSpecialistDialog from '@/components/inquiry/ContactSpecialistDialog';
import HeroSlider from '@/components/home/HeroSlider';
import EditorialLookbookPillars from '@/components/home/EditorialLookbookPillars';
import GuestReflectionsSlider from '@/components/home/GuestReflectionsSlider';
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

  // Section 2: Direct 1:1 Parallax Coupling (Hardware-synchronized with scroll)
  const welcomeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: welcomeScrollY } = useScroll({
    target: welcomeRef,
    offset: ['start end', 'end start'],
  });

  // Pure numeric transforms directly coupled to scroll progress for crisp, instantaneous response
  const leftPhotoY = useTransform(welcomeScrollY, [0, 1], [15, -20]);
  const rightPhotoY = useTransform(welcomeScrollY, [0, 1], [-12, 24]);

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

  const handleAnchorScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const targetY = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
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
              <a
                href="#welcome-section"
                onClick={(e) => handleAnchorScroll(e, 'welcome-section')}
              >
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
        {/* 2. SENSORY WELCOME: "AN INVITATION TO INDIA" (OPTION B: ASYMMETRIC PARALLAX) */}
        {/* ========================================================================= */}
        <section
          id="welcome-section"
          ref={welcomeRef}
          className="w-full py-24 px-margin-mobile md:px-margin-desktop bg-alabaster-cream border-b border-silk-border overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Text Editorial with Staggered Upward Reveals */}
              <div className="lg:col-span-7 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-6 h-px bg-bronze-hover" />
                  <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
                    An Invitation to the Subcontinent
                  </span>
                </motion.div>

                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink-black font-normal leading-[1.15] text-balance"
                  >
                    Where Ancient Heritage Meets <span className="italic font-light">Serene Splendor</span>
                  </motion.h2>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-body-base text-slate-taupe text-base sm:text-lg leading-relaxed"
                >
                  The Indian subcontinent encompasses an extraordinary breadth of geography and living history, where centuries-old palace lineages, dawn river rituals along sacred ghats, and high Himalayan valleys exist in parallel rhythms.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="font-body-base text-slate-taupe text-sm sm:text-base leading-relaxed"
                >
                  At ABC Travels, we curate private, unhurried journeys shaped around personal comfort and genuine cultural depth. Operating from our headquarters in New Delhi, we coordinate private suites in historic residences, wildlife safaris led by dedicated field naturalists, and privileged access to private palace collections across the country.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6"
                >
                  <Link href="/about">
                    <Button variant="outline" className="border-ink-black/20 text-ink-black hover:bg-ink-black/5 gap-2 shadow-xs">
                      <span>Our Heritage & Philosophy</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <a
                    href="#realms"
                    onClick={(e) => handleAnchorScroll(e, 'realms')}
                    className="text-xs font-label-caps uppercase tracking-widest text-slate-taupe hover:text-ink-black transition-colors"
                  >
                    Explore Landscapes ↓
                  </a>
                </motion.div>
              </div>

              {/* Asymmetric Magazine Image Pairing (Style 5: Cinematic Warm Light Sweep & Film Shimmer) */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4 relative py-4 sm:py-6">
                {/* Left Column: Taj Balcony (Card Elevation + Direct Glide + Golden Dawn Light Sweep) */}
                <motion.div
                  style={{ y: leftPhotoY }}
                  className="will-change-transform transform-gpu"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-3 sm:space-y-4"
                  >
                    <div className="relative h-56 sm:h-72 rounded-lg overflow-hidden border border-silk-border shadow-sm group bg-surface-dim">
                      <Image
                        src="/images/welcome/taj-balcony-sunrise.jpg"
                        alt="Taj Mahal Balcony View at Dawn"
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Subtle Ambient Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-black/25 via-transparent to-transparent pointer-events-none" />

                      {/* Style 5: Cinematic Warm Light Sweep & Film Shimmer (Dawn Breaking Flare) */}
                      <motion.div
                        initial={{ x: '-160%', opacity: 0.95 }}
                        whileInView={{ x: '160%', opacity: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/55 via-50% via-[#FEDEB1]/65 to-transparent skew-x-12 pointer-events-none transform-gpu will-change-transform z-10"
                      />
                    </div>

                    {/* Accompanying Stat Badge */}
                    <div className="p-3 sm:p-4 bg-cream-container border border-silk-border rounded-lg text-center shadow-xs">
                      <span className="font-serif text-xl sm:text-2xl text-ink-black font-bold block">100%</span>
                      <span className="font-label-caps text-[9px] sm:text-[10px] text-slate-taupe tracking-wider uppercase">
                        Private Custom Journeys
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Column: Kerala Backwaters (Card Elevation + Direct Counter-Glide + Staggered Golden Sweep) */}
                <motion.div
                  style={{ y: rightPhotoY }}
                  className="pt-6 sm:pt-8 will-change-transform transform-gpu"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="space-y-3 sm:space-y-4"
                  >
                    {/* Accompanying Dark Stat Badge */}
                    <div className="p-3 sm:p-4 bg-ink-black text-alabaster-cream border border-silk-border rounded-lg text-center shadow-md">
                      <span className="font-serif text-xl sm:text-2xl text-secondary-container font-bold block">24/7</span>
                      <span className="font-label-caps text-[9px] sm:text-[10px] text-white/70 tracking-wider uppercase">
                        On-Ground Concierge
                      </span>
                    </div>

                    <div className="relative h-56 sm:h-72 rounded-lg overflow-hidden border border-silk-border shadow-sm group bg-surface-dim">
                      <Image
                        src="/images/welcome/backwaters-twilight.jpg"
                        alt="Kerala Backwaters Palm Trees at Twilight"
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Subtle Ambient Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-black/25 via-transparent to-transparent pointer-events-none" />

                      {/* Style 5: Cinematic Warm Light Sweep & Film Shimmer (Dawn Breaking Flare) */}
                      <motion.div
                        initial={{ x: '-160%', opacity: 0.95 }}
                        whileInView={{ x: '160%', opacity: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/55 via-50% via-[#FEDEB1]/65 to-transparent skew-x-12 pointer-events-none transform-gpu will-change-transform z-10"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. THE ABC TRAVELS DISTINCTION (EXPANDING EDITORIAL LOOKBOOK)             */}
        {/* ========================================================================= */}
        <EditorialLookbookPillars />

        {/* ========================================================================= */}
        {/* 4. THE SIX REALMS OF THE SUBCONTINENT (VISUAL CHAPTERS)                   */}
        {/* ========================================================================= */}
        <section id="realms" className="w-full py-24 px-margin-mobile md:px-margin-desktop bg-alabaster-cream border-b border-silk-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
              <div className="max-w-2xl space-y-3">
                <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover block">
                  Geographic Diversity
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink-black">
                  The Six Realms of India
                </h2>
                <p className="font-body-base text-slate-taupe text-sm sm:text-base">
                  From high alpine passes and tiger sanctuaries to sacred river ghats, royal palaces, and serene Portuguese coastlines.
                </p>
              </div>

              <Link href="/destinations">
                <Button variant="outline" className="border-ink-black/20 text-ink-black hover:bg-ink-black/5 gap-2">
                  <span>View All Destinations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Realm 1: Rajasthan & North India (Wide Feature) */}
              <Link
                href="/destinations/rajasthan"
                className="lg:col-span-2 group relative h-[420px] rounded-lg overflow-hidden border border-silk-border flex flex-col justify-end p-8 sm:p-10 text-white bg-surface-dim shadow-sm"
              >
                <Image
                  src="/images/realms/amber-fort-jaipur.jpg"
                  alt="Amber Fort Jaipur Courtyard"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 60vw"
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
                  <p className="text-white/80 font-body-base text-xs sm:text-sm max-w-lg line-clamp-2 leading-relaxed">
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
                className="lg:col-span-1 group relative h-[420px] rounded-lg overflow-hidden border border-silk-border flex flex-col justify-end p-8 sm:p-10 text-white bg-surface-dim shadow-sm"
              >
                <Image
                  src="/images/realms/ladakh-himalayas-pass.jpg"
                  alt="Ladakh Himalayas"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
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

              {/* Realm 3: Sacred Ganges & Timeless Varanasi */}
              <Link
                href="/destinations/varanasi"
                className="lg:col-span-1 group relative h-[420px] rounded-lg overflow-hidden border border-silk-border flex flex-col justify-end p-8 sm:p-10 text-white bg-surface-dim shadow-sm"
              >
                <Image
                  src="/images/destinations/varanasi/sunrise-boat-ghats.jpg"
                  alt="Sacred Ganges Dawn Boat Glide"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/40 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-0 text-[10px] uppercase tracking-widest font-label-caps">
                    Spiritual & Antiquity
                  </Badge>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium group-hover:text-secondary-container transition-colors">
                    Sacred Ganges & Timeless Varanasi
                  </h3>
                  <p className="text-white/80 font-body-base text-xs sm:text-sm max-w-md line-clamp-2 leading-relaxed">
                    Dawn wooden boat glides along the ancient 84 ghats, private riverfront evening Aarti vantage points, and 3rd-century Buddhist heritage at Sarnath.
                  </p>
                  <div className="pt-2 flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-secondary-container">
                    <span>Explore Itineraries</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Realm 4: Central India & Tiger Sanctuaries */}
              <Link
                href="/destinations/ranthambore"
                className="lg:col-span-1 group relative h-[420px] rounded-lg overflow-hidden border border-silk-border flex flex-col justify-end p-8 sm:p-10 text-white bg-surface-dim shadow-sm"
              >
                <Image
                  src="/images/realms/ranthambore-tiger-wild.jpg"
                  alt="Royal Bengal Tiger Safari"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/40 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-0 text-[10px] uppercase tracking-widest font-label-caps">
                    Wildlife & Safaris
                  </Badge>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium group-hover:text-secondary-container transition-colors">
                    Central India & Tiger Sanctuaries
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

              {/* Realm 5: Emerald South & Kerala */}
              <Link
                href="/destinations/kerala"
                className="lg:col-span-1 group relative h-[420px] rounded-lg overflow-hidden border border-silk-border flex flex-col justify-end p-8 sm:p-10 text-white bg-surface-dim shadow-sm"
              >
                <Image
                  src="/images/realms/kerala-tea-backwaters.jpg"
                  alt="Kerala Backwaters"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
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

              {/* Realm 6: The Portuguese Coast & Goa (Wide Feature) */}
              <Link
                href="/destinations/goa"
                className="lg:col-span-2 group relative h-[420px] rounded-lg overflow-hidden border border-silk-border flex flex-col justify-end p-8 sm:p-10 text-white bg-surface-dim shadow-sm"
              >
                <Image
                  src="/images/destinations/goa/hero.jpg"
                  alt="Ahilya by the Sea Nerul Dolphin Bay"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/40 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-0 text-[10px] uppercase tracking-widest font-label-caps">
                    Coastal & Heritage Mansions
                  </Badge>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium group-hover:text-secondary-container transition-colors">
                    Goa & The Portuguese Heritage Coast
                  </h3>
                  <p className="text-white/80 font-body-base text-xs sm:text-sm max-w-lg line-clamp-2 leading-relaxed">
                    Pastel-toned 18th-century mansions in Fontainhas, private catamaran sunset cruises on the Mandovi estuary, and secluded oceanfront villa sanctuaries.
                  </p>
                  <div className="pt-2 flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-secondary-container">
                    <span>Explore Itineraries</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Minimalist Destination Archive Gateway Plaque */}
              <Link
                href="/destinations"
                className="lg:col-span-1 group relative h-[420px] rounded-lg overflow-hidden border border-silk-border/60 hover:border-secondary-container/50 flex flex-col justify-between p-8 sm:p-10 bg-ink-black text-alabaster-cream shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {/* Header */}
                <div className="space-y-4">
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-secondary-container border border-secondary-container/20 text-[10px] uppercase tracking-widest font-label-caps"
                  >
                    The Archive
                  </Badge>

                  <h3 className="font-serif text-3xl sm:text-[32px] text-white font-normal leading-[1.15] group-hover:text-secondary-container transition-colors">
                    Beyond the Six Realms
                  </h3>

                  <p className="text-white/70 font-body-base text-sm leading-relaxed">
                    Private palace residencies, high Himalayan passes, and sacred river sanctuaries catalogued across all 28 states of India.
                  </p>
                </div>

                {/* Footer Metadata & Curatorial Link */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-[11px] text-white/50 font-label-caps uppercase tracking-widest">
                    <span>28 States & Territories</span>
                    <span>42 UNESCO Sites</span>
                  </div>

                  <div className="flex items-center justify-between text-secondary-container font-label-caps text-xs uppercase tracking-widest pt-1">
                    <span>Explore Complete Directory</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
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
                Looking for a custom route? Our Concierge builds 100% tailored private itineraries.
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
        {/* 7. VERIFIED TRAVELER REFLECTIONS (SINGLE ROW EDITORIAL AUTO-SLIDER)        */}
        {/* ========================================================================= */}
        <GuestReflectionsSlider reviews={reviews} />

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
