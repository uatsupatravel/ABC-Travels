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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border py-3 shadow-sm text-foreground'
          : isDarkHero
          ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 text-white'
          : 'bg-background border-b border-border py-4 text-foreground'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                isScrolled || !isDarkHero
                  ? 'border-border bg-muted text-foreground'
                  : 'border-white/30 bg-black/40 text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-tight">
                ABC <span className="font-normal tracking-widest text-xs uppercase opacity-80">Travels</span>
              </span>
              <span
                className={`text-[9px] tracking-widest uppercase font-medium ${
                  isScrolled || !isDarkHero ? 'text-muted-foreground' : 'text-white/70'
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
                  className={`text-xs font-medium uppercase tracking-widest transition-colors duration-200 ${
                    isActive
                      ? isScrolled || !isDarkHero
                        ? 'text-primary font-bold'
                        : 'text-white font-bold'
                      : isScrolled || !isDarkHero
                      ? 'text-muted-foreground hover:text-foreground'
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
              href="tel:+919876543210"
              className={`flex items-center gap-2 text-xs font-medium transition-colors duration-200 ${
                isScrolled || !isDarkHero
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-white/80 hover:text-white'
              }`}
              aria-label="Direct Concierge Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+91 98765 43210</span>
            </a>

            <Link href="/plan-your-trip">
              <Button
                size="sm"
                variant={isScrolled || !isDarkHero ? 'default' : 'secondary'}
                className="text-xs uppercase tracking-wider font-semibold gap-1.5"
              >
                <span>Plan Journey</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/plan-your-trip">
              <Button size="sm" variant="default" className="text-xs">
                Plan
              </Button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-background px-6 py-6 shadow-lg text-foreground animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm tracking-wide uppercase py-1 ${
                    isActive ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Link href="/plan-your-trip">
                <Button className="w-full text-xs uppercase tracking-wider font-semibold">
                  Start Custom Itinerary
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Concierge Desk: +91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
