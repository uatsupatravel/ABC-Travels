import React from 'react';
import Link from 'next/link';
import { Compass, Mail, Phone, MapPin, ShieldCheck, Award, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-tertiary-container w-full border-t border-outline-variant pt-16 pb-8 px-margin-mobile md:px-margin-desktop mt-section-gap-lg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Intro & Accreditations */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-primary-fixed/30 flex items-center justify-center bg-primary-fixed/10">
                <Compass className="w-4 h-4 text-primary-fixed" />
              </div>
              <span className="font-display-xl text-xl font-bold tracking-tight text-primary-fixed">
                ABC <span className="font-normal text-xs uppercase tracking-widest opacity-80">Travels</span>
              </span>
            </div>
            <p className="text-on-primary-container text-sm leading-relaxed max-w-md">
              Specialists in private, high-touch inbound luxury travel across India. We curate palace stays, tiger safaris, Himalayan expeditions, and secluded wellness retreats for discerning travelers worldwide.
            </p>

            {/* Trust Accreditations */}
            <div className="pt-2 grid grid-cols-3 gap-2 text-center text-primary-fixed/90">
              <div className="bg-primary-fixed/5 border border-primary-fixed/15 rounded p-2 flex flex-col items-center gap-1">
                <Award className="w-4 h-4 opacity-80" />
                <span className="text-[10px] uppercase tracking-wider font-label-caps">Virtuoso Partner</span>
              </div>
              <div className="bg-primary-fixed/5 border border-primary-fixed/15 rounded p-2 flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 opacity-80" />
                <span className="text-[10px] uppercase tracking-wider font-label-caps">Govt. Accredited</span>
              </div>
              <div className="bg-primary-fixed/5 border border-primary-fixed/15 rounded p-2 flex flex-col items-center gap-1">
                <HeartHandshake className="w-4 h-4 opacity-80" />
                <span className="text-[10px] uppercase tracking-wider font-label-caps">100% Tailormade</span>
              </div>
            </div>
          </div>

          {/* Featured Journeys */}
          <div className="space-y-3">
            <h3 className="font-label-caps text-label-caps tracking-widest uppercase text-primary-fixed/90">
              Curated Journeys
            </h3>
            <ul className="space-y-2 text-xs text-on-primary-container">
              <li>
                <Link href="/tours/golden-triangle-royal-palaces" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  The Royal Golden Triangle
                </Link>
              </li>
              <li>
                <Link href="/tours/kerala-backwaters-ayurveda-sanctuary" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  Kerala Ayurveda Sanctuary
                </Link>
              </li>
              <li>
                <Link href="/tours/ladakh-high-himalayas-expedition" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  Ladakh & High Himalayas
                </Link>
              </li>
              <li>
                <Link href="/tours/ranthambore-tiger-safari-expedition" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  Royal Bengal Tiger Safari
                </Link>
              </li>
              <li>
                <Link href="/tours/varanasi-sacred-ganges-spiritual" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  Varanasi Sacred Ganges
                </Link>
              </li>
              <li>
                <Link href="/tours/goa-portuguese-heritage-coastal-sanctuary" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  Goa & Portuguese Coast
                </Link>
              </li>
            </ul>
          </div>

          {/* Regions of India */}
          <div className="space-y-3">
            <h3 className="font-label-caps text-label-caps tracking-widest uppercase text-primary-fixed/90">
              Destinations
            </h3>
            <ul className="space-y-2 text-xs text-on-primary-container">
              <li>
                <Link href="/destinations/rajasthan" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  Rajasthan Heritage
                </Link>
              </li>
              <li>
                <Link href="/destinations/kerala" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  Kerala Backwaters
                </Link>
              </li>
              <li>
                <Link href="/destinations/ladakh" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  Ladakh & Himalayas
                </Link>
              </li>
              <li>
                <Link href="/destinations/ranthambore" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  Ranthambore Wildlife
                </Link>
              </li>
              <li>
                <Link href="/destinations/varanasi" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  Varanasi & Sacred Ganges
                </Link>
              </li>
              <li>
                <Link href="/destinations/goa" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  Goa Portuguese Estates
                </Link>
              </li>
            </ul>
          </div>

          {/* Private Concierge Contacts */}
          <div className="space-y-3">
            <h3 className="font-label-caps text-label-caps tracking-widest uppercase text-primary-fixed/90">
              Private Concierge
            </h3>
            <ul className="space-y-2.5 text-xs text-on-primary-container">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 opacity-80 shrink-0 mt-0.5" />
                <span>Janpath, New Delhi & Fort Kochi, Kerala, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 opacity-80 shrink-0" />
                <a href="tel:+918700406415" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  +91 87004 06415
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 opacity-80 shrink-0" />
                <a href="mailto:concierge@abctravels.com" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
                  concierge@abctravels.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-outline-variant/30 mb-8" />

        {/* Bottom copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between font-label-caps text-[10px] tracking-widest uppercase text-on-primary-container gap-4 text-center md:text-left">
          <span>© {new Date().getFullYear()} ABC Travels India. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
            <Link href="/about" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
              Our Story
            </Link>
            <Link href="/contact" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
              Contact Concierge
            </Link>
            <Link href="/plan-your-trip" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
              Itinerary Builder
            </Link>
            <Link href="/privacy-policy" className="hover:text-primary-fixed transition-opacity duration-300 opacity-80 hover:opacity-100">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
