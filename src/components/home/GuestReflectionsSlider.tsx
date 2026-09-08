'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from 'lucide-react';

const REVIEWS_DATA = [
  {
    id: 'rev-1',
    tourTitle: 'The Royal Odyssey',
    tourSlug: 'golden-triangle-royal-palaces',
    travelerName: 'Sir Alexander & Lady Montgomery',
    travelerCountry: 'United Kingdom',
    tripDate: 'February 2026',
    avatar: '/images/reviews/avatars/montgomery.jpg',
    headline: 'An unforgettable royal journey of a lifetime.',
    quote:
      'Having a private viewing of the Taj Mahal at dawn without crowds, followed by champagne on Lake Pichola in Udaipur, exceeded our highest expectations. The level of concierge care was truly five-star.',
    image: '/images/reviews/montgomery-udaipur-barge.jpg',
    destination: 'Rajasthan & Golden Triangle',
  },
  {
    id: 'rev-2',
    tourTitle: 'Kerala Ayurveda Sanctuary',
    tourSlug: 'kerala-backwaters-ayurveda-sanctuary',
    travelerName: 'Elena & Marcus Vance',
    travelerCountry: 'Switzerland',
    tripDate: 'January 2026',
    avatar: '/images/reviews/avatars/vance.jpg',
    headline: 'Pure serenity and transformative wellness.',
    quote:
      'The private luxury kettuvallam through Alleppey backwaters was the most peaceful experience of our lives. The Ayurvedic doctor was exceptional, and every transfer was completely effortless.',
    image: '/images/reviews/vance-kerala-houseboat.jpg',
    destination: 'Kerala & Backwaters',
  },
  {
    id: 'rev-3',
    tourTitle: 'The Sovereign Wild',
    tourSlug: 'royal-bengal-tiger-safari',
    travelerName: 'David Sterling',
    travelerCountry: 'United States',
    tripDate: 'March 2026',
    avatar: '/images/reviews/avatars/sterling.jpg',
    headline: 'Four tiger sightings in three days.',
    quote:
      'Our senior naturalist in Ranthambore was a master of his craft. The luxury tents at Oberoi Vanyavilas were breathtaking. This is the only way to experience wildlife in India.',
    image: '/images/reviews/sterling-tiger-safari.jpg',
    destination: 'Ranthambore Tiger Reserve',
  },
  {
    id: 'rev-4',
    tourTitle: 'Himalayan High Passes',
    tourSlug: 'ladakh-high-himalayas-expedition',
    travelerName: 'Charlotte & Antoine Dubois',
    travelerCountry: 'France',
    tripDate: 'August 2025',
    avatar: '/images/reviews/avatars/dubois.jpg',
    headline: 'Mesmerizing high-altitude luxury.',
    quote:
      'The heated geodesic domes at Pangong Lake and the private blessings at Thiksey Monastery were deeply moving. ABC Travels took care of every altitude safety detail so we could simply immerse ourselves.',
    image: '/images/reviews/dubois-himalayan-domes.jpg',
    destination: 'Ladakh & High Himalayas',
  },
];

const AUTOPLAY_INTERVAL = 7500; // 7.5 seconds

export default function GuestReflectionsSlider({ reviews }: { reviews?: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = REVIEWS_DATA.length;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Effortless, silent autoplay
  useEffect(() => {
    timerRef.current = setInterval(handleNext, AUTOPLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  const current = REVIEWS_DATA[currentIndex];

  return (
    <section className="w-full py-24 px-margin-mobile md:px-margin-desktop bg-alabaster-cream border-b border-silk-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Minimalist Editorial Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover block">
            Guest Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink-black font-normal leading-tight">
            Words from Discerning Travelers
          </h2>
          <p className="font-body-base text-slate-taupe text-sm sm:text-base leading-relaxed">
            Real stories from guests who trusted ABC Travels with their most cherished journeys across India.
          </p>
        </div>

        {/* 2-Column Editorial Magazine Spread */}
        <div className="bg-cream-container border border-silk-border rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Left Column: Visual Proof / Atmosphere Photo */}
          <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[300px] overflow-hidden bg-ink-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={current.image}
                  alt={current.tourTitle}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/80 via-ink-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-cream-container/40" />
              </motion.div>
            </AnimatePresence>

            {/* Destination Pill Badge over Photo */}
            <div className="absolute bottom-5 left-5 z-10 text-white drop-shadow-md">
              <span className="font-label-caps text-[11px] uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                {current.destination}
              </span>
            </div>
          </div>

          {/* Right Column: High-Impact Editorial Testimonial */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative bg-cream-container">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* 5-Star Rating & Tour Link */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-bronze-hover">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <Link
                    href={`/tours/${current.tourSlug}`}
                    className="inline-flex items-center gap-1.5 font-label-caps text-[11px] uppercase tracking-widest text-bronze-hover hover:text-ink-black transition-colors"
                  >
                    <span>{current.tourTitle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* The Emotional Quote */}
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] text-ink-black font-medium leading-snug">
                    &ldquo;{current.headline}&rdquo;
                  </h3>
                  <p className="font-body-base text-slate-taupe text-base sm:text-lg leading-relaxed italic font-light">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                </div>

                {/* Guest Profile Signature */}
                <div className="pt-6 border-t border-silk-border flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-bronze-hover/40 shadow-xs shrink-0">
                    <Image
                      src={current.avatar}
                      alt={current.travelerName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-ink-black text-base sm:text-lg leading-tight">
                      {current.travelerName}
                    </h4>
                    <span className="text-xs text-slate-taupe flex items-center gap-1.5 pt-0.5 font-body-base">
                      <MapPin className="w-3 h-3 text-bronze-hover opacity-80" />
                      {current.travelerCountry} • Traveled {current.tripDate}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Seamless, Natural Navigation Footer (Clean & Frictionless) */}
            <div className="pt-8 mt-6 border-t border-silk-border/60 flex items-center justify-between">
              {/* Story Dot Indicators */}
              <div className="flex items-center gap-2">
                {REVIEWS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className="p-1 cursor-pointer"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-500 ${
                        idx === currentIndex
                          ? 'w-8 bg-bronze-hover'
                          : 'w-2 bg-silk-border hover:bg-slate-taupe/40'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Minimalist Prev/Next Arrow Pair */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="w-9 h-9 rounded-full border border-silk-border bg-alabaster-cream hover:bg-ink-black hover:text-white hover:border-ink-black flex items-center justify-center text-ink-black transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next review"
                  className="w-9 h-9 rounded-full border border-silk-border bg-alabaster-cream hover:bg-ink-black hover:text-white hover:border-ink-black flex items-center justify-center text-ink-black transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
