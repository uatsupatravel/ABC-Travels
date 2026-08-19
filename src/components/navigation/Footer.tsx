import React from 'react';
import Link from 'next/link';
import { Compass, Mail, Phone, MapPin, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { Separator } from '@/components/ui/Separator';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Intro & Accreditations */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-primary-foreground/30 flex items-center justify-center bg-primary-foreground/10">
                <Compass className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">
                ABC <span className="font-normal text-xs uppercase tracking-widest opacity-80">Travels</span>
              </span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-md">
              Specialists in private, high-touch inbound luxury travel across India. We curate palace stays, tiger safaris, Himalayan expeditions, and secluded wellness retreats for discerning travelers worldwide.
            </p>
            
            {/* Trust Accreditations */}
            <div className="pt-2 grid grid-cols-3 gap-2 text-center text-primary-foreground/90">
              <div className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-md p-2 flex flex-col items-center gap-1">
                <Award className="w-4 h-4 opacity-80" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">Virtuoso Partner</span>
              </div>
              <div className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-md p-2 flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 opacity-80" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">Govt. Accredited</span>
              </div>
              <div className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-md p-2 flex flex-col items-center gap-1">
                <HeartHandshake className="w-4 h-4 opacity-80" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">100% Tailormade</span>
              </div>
            </div>
          </div>

          {/* Featured Journeys */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase opacity-90">
              Curated Journeys
            </h3>
            <ul className="space-y-2 text-xs text-primary-foreground/80">
              <li>
                <Link href="/tours/golden-triangle-royal-palaces" className="hover:text-primary-foreground transition-colors">
                  The Royal Golden Triangle
                </Link>
              </li>
              <li>
                <Link href="/tours/kerala-backwaters-ayurveda-sanctuary" className="hover:text-primary-foreground transition-colors">
                  Kerala Ayurveda Sanctuary
                </Link>
              </li>
              <li>
                <Link href="/tours/ladakh-high-himalayas-expedition" className="hover:text-primary-foreground transition-colors">
                  Ladakh & High Himalayas
                </Link>
              </li>
              <li>
                <Link href="/tours/royal-bengal-tiger-safari" className="hover:text-primary-foreground transition-colors">
                  Royal Bengal Tiger Safari
                </Link>
              </li>
              <li>
                <Link href="/tours/spiritual-ganges-varanasi-odyssey" className="hover:text-primary-foreground transition-colors">
                  Varanasi Spiritual Odyssey
                </Link>
              </li>
            </ul>
          </div>

          {/* Regions of India */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase opacity-90">
              Destinations
            </h3>
            <ul className="space-y-2 text-xs text-primary-foreground/80">
              <li>
                <Link href="/destinations/rajasthan" className="hover:text-primary-foreground transition-colors">
                  Rajasthan Heritage
                </Link>
              </li>
              <li>
                <Link href="/destinations/kerala" className="hover:text-primary-foreground transition-colors">
                  Kerala Backwaters
                </Link>
              </li>
              <li>
                <Link href="/destinations/ladakh" className="hover:text-primary-foreground transition-colors">
                  Ladakh & Himalayas
                </Link>
              </li>
              <li>
                <Link href="/destinations/ranthambore" className="hover:text-primary-foreground transition-colors">
                  Ranthambore Wildlife
                </Link>
              </li>
              <li>
                <Link href="/destinations/goa" className="hover:text-primary-foreground transition-colors">
                  Goa Portuguese Estates
                </Link>
              </li>
            </ul>
          </div>

          {/* Private Concierge Contacts */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase opacity-90">
              Private Concierge
            </h3>
            <ul className="space-y-2.5 text-xs text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 opacity-80 shrink-0 mt-0.5" />
                <span>Janpath, New Delhi & Fort Kochi, Kerala, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 opacity-80 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary-foreground transition-colors">
                  +91 (0) 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 opacity-80 shrink-0" />
                <a href="mailto:concierge@abctravels.com" className="hover:text-primary-foreground transition-colors">
                  concierge@abctravels.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-primary-foreground/15 mb-8" />

        {/* Bottom copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-primary-foreground/60 gap-4">
          <p>© {new Date().getFullYear()} ABC Travels India. Crafted for exceptional inbound luxury journeys.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-primary-foreground transition-colors">
              Our Story
            </Link>
            <Link href="/contact" className="hover:text-primary-foreground transition-colors">
              Contact Concierge
            </Link>
            <Link href="/plan-your-trip" className="hover:text-primary-foreground transition-colors">
              Custom Itinerary Builder
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
