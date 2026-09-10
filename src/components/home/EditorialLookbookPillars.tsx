'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

interface PillarDetail {
  num: string;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  specifications: { label: string; detail: string }[];
  provisions: string[];
}

const PILLARS: PillarDetail[] = [
  {
    num: '01',
    tag: 'Private Departures',
    title: 'Unhurried, Private Departures',
    subtitle: 'Move at your personal circadian rhythm without rigid schedules or rushing.',
    desc: 'True luxury is the unhurried ownership of time. Whether lingering over morning Darjeeling tea on a misty palace verandah or tracking royal Bengal tigers at dawn in a private open-top rover, every hour is shaped around your comfort.',
    image: '/images/distinction/safari-pace.jpg',
    specifications: [
      {
        label: 'Wildlife & Private Rovers',
        detail: 'Private open-top 4x4 safari rovers in national tiger reserves with veteran senior naturalists.',
      },
      {
        label: 'Flexible Scheduling',
        detail: 'Daily start times tailored to your preferences, avoiding crowded peak hours completely.',
      },
      {
        label: 'Exclusive Charters',
        detail: 'Private sunset boat barges, secluded glamping pavilions, and executive private rail options.',
      },
      {
        label: 'Curated Mid-Journey Pauses',
        detail: 'Private high-tea receptions and culinary stops at historic royal havelis along driving routes.',
      },
    ],
    provisions: [
      '100% private ground logistics tailored to your exact travel dates',
      'Dedicated executive vehicle with professional English-speaking chauffeur',
      'VIP fast-track entries to all UNESCO monuments and heritage sites',
    ],
  },
  {
    num: '02',
    tag: 'Heritage Stays',
    title: 'Authentic Royal Residencies',
    subtitle: 'Resting in original maharaja suites and historic estate bungalows.',
    desc: 'We curate stays in genuine architectural marvels: the floating white marble Taj Lake Palace in Udaipur, the golden sandstone pavilions of Rambagh Palace, and secluded 100-year-old tea estates in the Western Ghats.',
    image: '/images/distinction/taj-balcony.jpg',
    specifications: [
      {
        label: 'Historic Royal Suites',
        detail: 'Guaranteed historic palace suite categories with private jali balconies and antique heritage furnishings.',
      },
      {
        label: 'Monument Panoramas',
        detail: 'Private terraces framing world wonders including the Taj Mahal and Lake Pichola in serene light.',
      },
      {
        label: 'Sanctuary Retreats',
        detail: 'Doctor-curated Ayurvedic wellness therapies at secluded coastal and spice hill wellness sanctuaries.',
      },
      {
        label: 'Palace Dining & Butler Service',
        detail: '24-hour aristocratic butler service and private dining setups on historic palace ramparts.',
      },
    ],
    provisions: [
      'Daily champagne breakfasts and curated private royal dinners',
      'Private palace courtyard and museum tours with resident estate curators',
      'Complimentary wellness & spa credits at partner heritage estates',
    ],
  },
  {
    num: '03',
    tag: 'Concierge Care',
    title: 'Dedicated Concierge Host',
    subtitle: 'A single senior travel designer overseeing every moment from arrival to departure.',
    desc: 'From the moment your flight lands in Delhi or Mumbai, our dedicated concierge team handles airside VIP meet-and-greets, luggage handling, restaurant table reservations, and seamless route coordination.',
    image: '/images/distinction/tea-host.jpg',
    specifications: [
      {
        label: 'Executive Fleet',
        detail: 'Vetted, uniformed English-speaking chauffeurs in Mercedes, BMW, and 4x4 SUVs.',
      },
      {
        label: 'Academic Scholars',
        detail: 'Licensed university art historians and veteran naturalists guiding all excursions.',
      },
      {
        label: '24/7 Concierge Desk',
        detail: 'Dedicated WhatsApp and direct phone concierge desk active throughout your journey.',
      },
      {
        label: 'Airside Meet & Greet',
        detail: 'Immigration fast-track, luggage assistance, and private tarmac transfers.',
      },
    ],
    provisions: [
      'One dedicated travel designer from initial consultation to return flight',
      'Real-time itinerary adjustments on ground as your preferences evolve',
      'Comprehensive on-ground emergency assistance and medical concierge support',
    ],
  },
];

export default function EditorialLookbookPillars() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [selectedPillarForModal, setSelectedPillarForModal] = useState<PillarDetail | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPillarForModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="w-full py-section-gap-lg px-margin-mobile md:px-margin-desktop bg-cream-container border-b border-silk-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-slate-taupe block">
            The Inbound Standard
          </span>
          <h2 className="font-display-2xl-mobile md:font-display-2xl text-display-2xl-mobile md:text-display-2xl text-ink-black font-medium">
            How We Host You in India
          </h2>
          <p className="font-subhead text-subhead text-slate-taupe">
            We eliminate the complexity of traveling across the subcontinent, orchestrating aristocratic comfort, vetted safety, and authentic local immersion.
          </p>
        </div>

        {/* Horizontal Accordion Lookbook */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[480px]">
          {PILLARS.map((pillar, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <motion.div
                key={idx}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                layout
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded overflow-hidden border transition-all cursor-pointer select-none p-6 sm:p-8 lg:p-9 flex flex-col justify-end bg-surface-dim ${
                  isSelected
                    ? 'min-h-[320px] sm:min-h-[360px] lg:min-h-0 lg:flex-[2.6] shadow-[0_12px_40px_rgba(0,0,0,0.06)] border-ink-black'
                    : 'min-h-[140px] sm:min-h-[160px] lg:min-h-0 lg:flex-[1] border-silk-border hover:border-ink-black/40'
                }`}
              >
                {/* Background Photo */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className={`object-cover transition-all duration-700 ease-out ${
                      isSelected
                        ? 'opacity-100 scale-105 filter-none'
                        : 'opacity-40 scale-100 grayscale-[20%] hover:opacity-60'
                    }`}
                  />
                  {/* Scrim Gradient */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isSelected
                        ? 'bg-gradient-to-t from-ink-black/95 via-ink-black/40 via-45% to-transparent'
                        : 'bg-gradient-to-t from-ink-black/95 via-ink-black/60 to-black/30'
                    }`}
                  />
                </div>

                {/* Pillar Content */}
                <div className="relative z-10 space-y-3">
                  <h3 className="font-headline-lg text-2xl sm:text-3xl text-alabaster-cream font-normal leading-tight drop-shadow-sm">
                    {pillar.title}
                  </h3>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="space-y-4 pt-1"
                    >
                      <p className="font-body-base text-sm text-alabaster-cream/90 max-w-xl leading-relaxed">
                        {pillar.desc}
                      </p>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPillarForModal(pillar);
                        }}
                        className="group/btn inline-flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-alabaster-cream border-b border-alabaster-cream pb-0.5 hover:text-secondary-container hover:border-secondary-container transition-colors cursor-pointer"
                      >
                        <span>Discover this standard</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GRAND MODERN MONOGRAPH EDITORIAL MODAL (SPACIOUS & EXPANSIVE)             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedPillarForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPillarForModal(null)}
              className="fixed inset-0 bg-ink-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Expansive Editorial Card Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl lg:max-w-5xl bg-alabaster-cream border border-silk-border rounded shadow-[0_25px_70px_rgba(0,0,0,0.25)] overflow-hidden z-10 my-auto flex flex-col text-ink-black max-h-[90vh]"
            >
              {/* Cinema-Ratio Balanced Banner */}
              <div className="relative h-44 sm:h-48 md:h-56 w-full shrink-0 overflow-hidden bg-ink-black">
                <Image
                  src={selectedPillarForModal.image}
                  alt={selectedPillarForModal.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-ink-black/50 to-black/30" />

                {/* Minimalist Close Button */}
                <button
                  onClick={() => setSelectedPillarForModal(null)}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 bg-ink-black/70 hover:bg-ink-black text-alabaster-cream border border-silk-border/40 rounded transition-colors z-20 flex items-center justify-center cursor-pointer shadow-md"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Headline Overlay */}
                <div className="absolute bottom-5 left-6 right-6 sm:bottom-6 sm:left-8 sm:right-8 text-white space-y-1.5">
                  <h3 className="font-display-2xl text-2xl sm:text-3xl md:text-4xl text-alabaster-cream font-medium leading-tight drop-shadow-sm">
                    {selectedPillarForModal.title}
                  </h3>
                </div>
              </div>

              {/* Expansive Content Body */}
              <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-8 sm:space-y-10">
                {/* Dossier Intro */}
                <div className="space-y-2.5 max-w-3xl">
                  <p className="font-subhead text-ink-black text-base sm:text-lg md:text-xl font-normal leading-relaxed text-balance">
                    {selectedPillarForModal.subtitle}
                  </p>
                  <p className="font-body-base text-slate-taupe text-sm sm:text-base leading-relaxed">
                    {selectedPillarForModal.desc}
                  </p>
                </div>

                {/* Chapter 01: Specifications */}
                <div className="space-y-6">
                  <span className="font-label-caps text-xs sm:text-sm text-bronze-hover tracking-[0.3em] uppercase block border-b border-silk-border pb-3 font-semibold">
                    01 / The Hosting Standard
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                    {selectedPillarForModal.specifications.map((spec, i) => (
                      <div key={i} className="space-y-2">
                        <span className="font-headline-lg text-lg sm:text-xl text-ink-black font-normal block leading-snug">
                          {spec.label}
                        </span>
                        <p className="font-body-base text-sm sm:text-base text-slate-taupe leading-relaxed">
                          {spec.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chapter 02: Provisions */}
                <div className="space-y-6">
                  <span className="font-label-caps text-xs sm:text-sm text-bronze-hover tracking-[0.3em] uppercase block border-b border-silk-border pb-3 font-semibold">
                    02 / Standard Provisions
                  </span>
                  <div className="space-y-4">
                    {selectedPillarForModal.provisions.map((prov, i) => (
                      <div key={i} className="flex items-start gap-4 font-body-base text-sm sm:text-base text-ink-black">
                        <span className="w-2 h-2 rounded-full bg-bronze-hover mt-2 shrink-0" />
                        <span className="leading-relaxed">{prov}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
