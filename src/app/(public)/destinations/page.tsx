import React from 'react';
import { getDestinations } from '@/lib/data-service';
import DestinationsCatalogClient from '@/components/destinations/DestinationsCatalogClient';

export const metadata = {
  title: 'Destinations of India | ABC Travels Luxury Monograph Portfolio',
  description:
    'Explore twelve sovereign realms across the Indian subcontinent: Rajasthan, Kerala, Ladakh, Kashmir, Varanasi, Ranthambore, Goa, Central India, Tamil Nadu, Hampi, Gujarat, and Sikkim & Darjeeling.',
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="w-full min-h-screen bg-alabaster-cream text-ink-black pt-28 pb-24 px-margin-mobile md:px-margin-desktop selection:bg-secondary-container selection:text-ink-black">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-px bg-bronze-hover" />
            <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
              Subcontinent Monograph Portfolio
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink-black leading-[1.15]">
            The Twelve Realms of <span className="italic font-light">India</span>
          </h1>
          <p className="font-body-base text-slate-taupe text-sm sm:text-base leading-relaxed">
            From the fortress citadels of Rajasthan and misty tea estates of the Eastern Himalayas to the living granite temples of the Chola Kings. Each destination monograph offers comprehensive cultural narratives, verified luxury stays, seasonal advice, and curated private encounters.
          </p>
        </div>

        {/* Client Interactive Catalog with Filters */}
        <DestinationsCatalogClient destinations={destinations} />
      </div>
    </div>
  );
}
