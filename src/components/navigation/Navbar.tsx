'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Menu,
  X,
  PhoneCall,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NavDestination {
  name: string;
  slug: string;
  tagline: string;
  heroImage: string;
}

interface NavRegion {
  region: string;
  subtitle: string;
  destinations: NavDestination[];
}

const DESTINATION_REGIONS: NavRegion[] = [
  {
    region: 'North India',
    subtitle: 'Imperial Citadels',
    destinations: [
      {
        name: 'Rajasthan',
        slug: 'rajasthan',
        tagline: 'Fortresses & Lake Palaces',
        heroImage: '/images/destinations/rajasthan/hero.jpg',
      },
      {
        name: 'Varanasi & Sacred Ganges',
        slug: 'varanasi',
        tagline: 'Dawn River Rites & Ancient Spires',
        heroImage: '/images/destinations/varanasi/hero.jpg',
      },
    ],
  },
  {
    region: 'South India',
    subtitle: 'Living Dynasties',
    destinations: [
      {
        name: 'Kerala & Spice Coast',
        slug: 'kerala',
        tagline: 'Backwaters & Ayurvedic Hills',
        heroImage: '/images/destinations/kerala/hero.jpg',
      },
      {
        name: 'Tamil Nadu',
        slug: 'tamil-nadu',
        tagline: 'Living Chola Temples & Chettinad',
        heroImage: '/images/destinations/tamil-nadu/hero.jpg',
      },
      {
        name: 'Hampi',
        slug: 'hampi',
        tagline: 'Vijayanagara Ruins & Coracles',
        heroImage: '/images/destinations/hampi/hero.jpg',
      },
    ],
  },
  {
    region: 'Himalayas & Ladakh',
    subtitle: 'Alpine Frontiers',
    destinations: [
      {
        name: 'Ladakh & High Passes',
        slug: 'ladakh',
        tagline: 'Cliff Gompas & Azure Lakes',
        heroImage: '/images/destinations/ladakh/hero.jpg',
      },
      {
        name: 'Kashmir & Srinagar',
        slug: 'kashmir',
        tagline: 'Cedar Shikaras & Mughal Gardens',
        heroImage: '/images/destinations/kashmir/hero.jpg',
      },
      {
        name: 'Sikkim & Darjeeling',
        slug: 'sikkim-darjeeling',
        tagline: 'Planter Terroirs & Kanchenjunga',
        heroImage: '/images/destinations/sikkim-darjeeling/hero.jpg',
      },
    ],
  },
  {
    region: 'Central India',
    subtitle: 'Wild Sanctuaries',
    destinations: [
      {
        name: 'Ranthambore',
        slug: 'ranthambore',
        tagline: 'Bengal Tigers & Banyan Forests',
        heroImage: '/images/destinations/ranthambore/hero.jpg',
      },
      {
        name: 'Central India & Khajuraho',
        slug: 'central-india',
        tagline: 'Chandela Spires & National Parks',
        heroImage: '/images/destinations/central-india/hero.jpg',
      },
    ],
  },
  {
    region: 'Western India',
    subtitle: 'Coastal & Deserts',
    destinations: [
      {
        name: 'Goa & Portuguese Coast',
        slug: 'goa',
        tagline: 'Latin Quarters & Mandovi Estuaries',
        heroImage: '/images/destinations/goa/hero.jpg',
      },
      {
        name: 'The White Desert of Gujarat',
        slug: 'gujarat',
        tagline: 'Great Rann Salt & Asiatic Lions',
        heroImage: '/images/destinations/gujarat/hero.jpg',
      },
    ],
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDestinationsOpen, setIsMobileDestinationsOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeSpotlight, setActiveSpotlight] = useState<NavDestination>(
    DESTINATION_REGIONS[0].destinations[0]
  );

  const pathname = usePathname();
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    setIsMobileDestinationsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Escape key closes mega menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMegaMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnterDestinations = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeaveDestinations = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 180);
  };

  const isDarkHero =
    pathname === '/' ||
    pathname.startsWith('/destinations/') ||
    pathname.startsWith('/tours/');
  const isHeaderOpaque =
    isScrolled || isMobileMenuOpen || isMegaMenuOpen || !isDarkHero;

  const getDesktopNavLinkClasses = (isActive: boolean) => {
    const base =
      'inline-flex items-center gap-1.5 h-8 font-label-caps text-label-caps uppercase tracking-widest transition-colors duration-300 border-b-2 cursor-pointer';

    if (isActive) {
      return `${base} ${
        isHeaderOpaque
          ? 'text-ink-black border-ink-black'
          : 'text-white border-white'
      }`;
    }

    return `${base} border-transparent ${
      isHeaderOpaque
        ? 'text-on-surface-variant hover:text-bronze-hover'
        : 'text-white/80 hover:text-white'
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isHeaderOpaque
          ? 'bg-[#FAF8F5] border-b border-silk-border py-3 shadow-sm text-ink-black'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 text-white'
      }`}
    >
      <div className="flex items-center justify-between w-full px-margin-mobile md:px-margin-desktop">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-300 ${
              isHeaderOpaque
                ? 'border-silk-border bg-cream-container text-ink-black'
                : 'border-white/30 bg-black/40 text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-display-xl text-lg font-bold tracking-tight">
              ABC <span className="font-normal tracking-widest text-xs uppercase opacity-80">Travels</span>
            </span>
            <span
              className={`text-[9px] tracking-widest uppercase font-label-caps ${
                isHeaderOpaque ? 'text-slate-taupe' : 'text-white/70'
              }`}
            >
              Inbound India Luxury
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Curated Journeys */}
          <Link
            href="/tours"
            className={getDesktopNavLinkClasses(pathname === '/tours')}
          >
            <span>Curated Journeys</span>
          </Link>

          {/* Destinations with Mega-Menu Trigger */}
          <div
            className="relative flex items-center h-8"
            onMouseEnter={handleMouseEnterDestinations}
            onMouseLeave={handleMouseLeaveDestinations}
          >
            <button
              type="button"
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className={getDesktopNavLinkClasses(
                pathname.startsWith('/destinations') || isMegaMenuOpen
              )}
              aria-expanded={isMegaMenuOpen}
              aria-haspopup="true"
            >
              <span>Destinations</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isMegaMenuOpen ? 'rotate-180 text-bronze-hover' : ''
                }`}
              />
            </button>
          </div>

          {/* Our Heritage */}
          <Link
            href="/about"
            className={getDesktopNavLinkClasses(pathname === '/about')}
          >
            <span>Our Heritage</span>
          </Link>

          {/* Concierge */}
          <Link
            href="/contact"
            className={getDesktopNavLinkClasses(pathname === '/contact')}
          >
            <span>Concierge</span>
          </Link>
        </nav>

        {/* CTA & Actions */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:+918700406415"
            className={`flex items-center gap-2 font-body-base text-sm transition-colors duration-300 ${
              isHeaderOpaque
                ? 'text-slate-taupe hover:text-ink-black'
                : 'text-white/80 hover:text-white'
            }`}
            aria-label="Direct Concierge Hotline"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>+91 87004 06415</span>
          </a>

          <Link href="/plan-your-trip">
            <Button
              size="sm"
              variant={isHeaderOpaque ? 'default' : 'secondary'}
              className="gap-1.5"
            >
              <span>Plan Journey</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/plan-your-trip">
            <Button size="sm" variant="default">
              Plan
            </Button>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-black/20 rounded cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP DESTINATIONS MEGA-MENU DROPDOWN                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <>
            {/* Backdrop Scrim - Dims and blurs the underlying page content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block fixed inset-0 top-0 bg-black/60 backdrop-blur-xs -z-10 pointer-events-auto"
              onClick={() => setIsMegaMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute top-full left-0 right-0 w-full bg-[#FAF8F5] border-b border-silk-border shadow-2xl text-ink-black z-50"
              onMouseEnter={handleMouseEnterDestinations}
              onMouseLeave={handleMouseLeaveDestinations}
            >
              <div className="max-w-7xl mx-auto px-margin-desktop py-8">
                <div className="grid grid-cols-12 gap-8 items-start">
                  {/* Left 9 Columns: 5 Geographic Regions with 12 Destinations */}
                  <div className="col-span-9 grid grid-cols-5 gap-6 border-r border-silk-border/60 pr-6">
                    {DESTINATION_REGIONS.map((reg) => (
                      <div key={reg.region} className="space-y-4">
                        {/* Region Header */}
                        <div className="space-y-0.5 border-b border-silk-border/60 pb-2">
                          <span className="font-label-caps text-[11px] font-bold uppercase tracking-wider text-ink-black block">
                            {reg.region}
                          </span>
                          <span className="font-serif italic text-[11px] text-slate-taupe block">
                            {reg.subtitle}
                          </span>
                        </div>

                        {/* Destinations List */}
                        <div className="space-y-3">
                          {reg.destinations.map((dest) => (
                            <Link
                              key={dest.slug}
                              href={`/destinations/${dest.slug}`}
                              onMouseEnter={() => setActiveSpotlight(dest)}
                              onClick={() => setIsMegaMenuOpen(false)}
                              className="group block space-y-0.5 transition-all"
                            >
                              <span className="font-serif text-sm font-medium text-ink-black group-hover:text-bronze-hover transition-colors flex items-center gap-1">
                                <span>{dest.name}</span>
                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-bronze-hover" />
                              </span>
                              <span className="font-body-base text-[11px] text-slate-taupe group-hover:text-ink-black transition-colors block leading-tight">
                                {dest.tagline}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right 3 Columns: Interactive Visual Spotlight Plate */}
                  <div className="col-span-3 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="font-label-caps text-[10px] tracking-[0.25em] uppercase text-bronze-hover font-semibold block">
                          Realm Spotlight
                        </span>
                        <h4 className="font-serif text-lg font-normal text-ink-black">
                          {activeSpotlight.name}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="p-1 rounded-full hover:bg-black/5 text-slate-taupe hover:text-ink-black transition-colors cursor-pointer"
                        title="Close Menu (Esc)"
                        aria-label="Close Destinations Menu"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                  {/* Spotlight Image Card - Clickable directly to the destination monograph */}
                  <Link
                    href={`/destinations/${activeSpotlight.slug}`}
                    onClick={() => setIsMegaMenuOpen(false)}
                    className="group block relative h-48 rounded-lg overflow-hidden border border-silk-border bg-surface-dim shadow-xs transition-all hover:border-bronze-hover focus:outline-hidden focus:ring-2 focus:ring-bronze-hover cursor-pointer"
                    aria-label={`Open ${activeSpotlight.name} monograph`}
                  >
                    <Image
                      src={activeSpotlight.heroImage}
                      alt={activeSpotlight.name}
                      fill
                      sizes="(max-width: 1280px) 25vw, 300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity" />

                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-label-caps uppercase tracking-wider text-ink-black shadow-xs font-semibold">
                        <span>Open Monograph</span>
                        <ArrowUpRight className="w-2.5 h-2.5 text-bronze-hover" />
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                      <p className="font-serif italic text-xs leading-tight line-clamp-2 text-white/90">
                        &ldquo;{activeSpotlight.tagline}&rdquo;
                      </p>
                      <div className="flex items-center gap-1 text-[10px] font-label-caps uppercase tracking-wider text-sand-accent font-medium pt-0.5">
                        <span>Explore {activeSpotlight.name}</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>

                  {/* Primary CTA Button: View All Sovereign Realms */}
                  <div className="pt-1">
                    <Link
                      href="/destinations"
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="w-full py-2.5 px-4 rounded-md bg-ink-black hover:bg-bronze-hover text-white text-xs font-label-caps uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer text-center group"
                    >
                      <span>View All 12 Sovereign Realms</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

      {/* ========================================================================= */}
      {/* MOBILE MENU DRAWER WITH ACCORDION                                         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-b border-silk-border bg-alabaster-cream px-margin-mobile py-6 shadow-xl text-ink-black max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col">
              {/* 1. Curated Journeys */}
              <Link
                href="/tours"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-label-caps text-xs tracking-[0.2em] uppercase py-3.5 border-b border-silk-border/40 flex items-center justify-between transition-colors duration-200 ${
                  pathname === '/tours' ? 'text-ink-black font-bold text-bronze-hover' : 'text-slate-taupe hover:text-ink-black'
                }`}
              >
                <span>Curated Journeys</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </Link>

              {/* 2. Destinations Accordion */}
              <div className="border-b border-silk-border/40">
                <button
                  type="button"
                  onClick={() => setIsMobileDestinationsOpen(!isMobileDestinationsOpen)}
                  className="w-full font-label-caps text-xs tracking-[0.2em] uppercase py-3.5 flex items-center justify-between transition-colors duration-200 text-slate-taupe hover:text-ink-black cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Destinations (12 Realms)</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isMobileDestinationsOpen ? 'rotate-180 text-bronze-hover' : 'opacity-60'
                    }`}
                  />
                </button>

                {/* Collapsible Destination List */}
                <AnimatePresence>
                  {isMobileDestinationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pb-4 pl-3 space-y-4"
                    >
                      <Link
                        href="/destinations"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-label-caps text-[11px] uppercase tracking-wider text-bronze-hover font-semibold block py-1"
                      >
                        All 12 Sovereign Realms Monograph Index →
                      </Link>

                      {DESTINATION_REGIONS.map((reg) => (
                        <div key={reg.region} className="space-y-1.5 pt-1">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-taupe block">
                            {reg.region}
                          </span>
                          <div className="pl-2 space-y-1.5 border-l border-silk-border">
                            {reg.destinations.map((dest) => (
                              <Link
                                key={dest.slug}
                                href={`/destinations/${dest.slug}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-xs text-ink-black hover:text-bronze-hover py-1"
                              >
                                <span className="font-serif font-medium">{dest.name}</span>
                                <span className="text-[10px] text-slate-taupe block">{dest.tagline}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Our Heritage */}
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-label-caps text-xs tracking-[0.2em] uppercase py-3.5 border-b border-silk-border/40 flex items-center justify-between transition-colors duration-200 ${
                  pathname === '/about' ? 'text-ink-black font-bold text-bronze-hover' : 'text-slate-taupe hover:text-ink-black'
                }`}
              >
                <span>Our Heritage</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </Link>

              {/* 4. Concierge */}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-label-caps text-xs tracking-[0.2em] uppercase py-3.5 border-b border-silk-border/40 flex items-center justify-between transition-colors duration-200 ${
                  pathname === '/contact' ? 'text-ink-black font-bold text-bronze-hover' : 'text-slate-taupe hover:text-ink-black'
                }`}
              >
                <span>Concierge</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </Link>

              {/* Direct Actions */}
              <div className="pt-5 flex flex-col gap-3">
                <Link href="/plan-your-trip" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full py-5 text-xs font-semibold shadow-md">
                    Start Custom Itinerary
                  </Button>
                </Link>
                <a
                  href="tel:+918700406415"
                  className="py-2.5 flex items-center justify-center gap-2 font-body-base text-xs text-slate-taupe hover:text-ink-black"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-bronze-hover" />
                  <span>Concierge Desk: +91 87004 06415</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
