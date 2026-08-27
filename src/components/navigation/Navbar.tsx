'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, PhoneCall, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Curated Journeys', href: '/tours' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Plan Your Trip', href: '/plan-your-trip' },
    { name: 'Our Heritage', href: '/about' },
    { name: 'Concierge', href: '/contact' },
  ];

  const isDarkHero = pathname === '/' || pathname.startsWith('/destinations/') || pathname.startsWith('/tours/');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-alabaster-cream/95 backdrop-blur-md border-b border-silk-border py-3 shadow-sm text-ink-black'
          : isDarkHero
          ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 text-white'
          : 'bg-alabaster-cream border-b border-silk-border py-4 text-ink-black'
      }`}
    >
      <div className="flex items-center justify-between w-full px-margin-mobile md:px-margin-desktop">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-300 ${
              isScrolled || !isDarkHero
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
                isScrolled || !isDarkHero ? 'text-slate-taupe' : 'text-white/70'
              }`}
            >
              Inbound India Luxury
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-label-caps text-label-caps uppercase tracking-widest transition-colors duration-300 ${
                  isActive
                    ? isScrolled || !isDarkHero
                      ? 'text-ink-black border-b-2 border-ink-black pb-1'
                      : 'text-white border-b-2 border-white pb-1'
                    : isScrolled || !isDarkHero
                    ? 'text-on-surface-variant hover:text-bronze-hover'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA & Actions */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:+918700406415"
            className={`flex items-center gap-2 font-body-base text-sm transition-colors duration-300 ${
              isScrolled || !isDarkHero
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
              variant={isScrolled || !isDarkHero ? 'default' : 'secondary'}
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
            className="p-2 text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-black/20 rounded"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-silk-border bg-alabaster-cream px-margin-mobile py-6 shadow-lg text-ink-black">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-label-caps text-label-caps tracking-widest uppercase py-1 transition-colors duration-300 ${
                    isActive ? 'text-ink-black font-bold' : 'text-on-surface-variant hover:text-bronze-hover'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-silk-border flex flex-col gap-3">
              <Link href="/plan-your-trip">
                <Button className="w-full">
                  Start Custom Itinerary
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-2 font-body-base text-sm text-slate-taupe">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Concierge Desk: +91 87004 06415</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
