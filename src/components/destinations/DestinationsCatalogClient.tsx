'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Destination, Region } from '@/types';
import { ArrowRight, Calendar, Sun, Clock, Compass, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DestinationsCatalogClientProps {
  destinations: Destination[];
}

const REGION_TABS: { label: string; value: 'All' | Region }[] = [
  { label: 'All Realms', value: 'All' },
  { label: 'North India', value: 'North India' },
  { label: 'South India', value: 'South India' },
  { label: 'Himalayas & Ladakh', value: 'Himalayas & Ladakh' },
  { label: 'Central India', value: 'Central India' },
  { label: 'Western India', value: 'Western India' },
];

export default function DestinationsCatalogClient({ destinations }: DestinationsCatalogClientProps) {
  const [selectedRegion, setSelectedRegion] = useState<'All' | Region>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
      const matchesQuery =
        !searchQuery ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesQuery;
    });
  }, [destinations, selectedRegion, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-silk-border">
        {/* Region Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {REGION_TABS.map((tab) => {
            const count =
              tab.value === 'All'
                ? destinations.length
                : destinations.filter((d) => d.region === tab.value).length;
            const isActive = selectedRegion === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => setSelectedRegion(tab.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-label-caps uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-ink-black text-white shadow-sm'
                    : 'bg-surface-container text-slate-taupe hover:text-ink-black hover:bg-surface-container-high'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-silk-border/60 text-muted-foreground'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface-container-lowest border border-silk-border rounded-md text-ink-black placeholder:text-muted-foreground focus:outline-none focus:border-ink-black transition-colors"
          />
        </div>
      </div>

      {/* Destinations Grid */}
      {filteredDestinations.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="font-serif text-lg text-ink-black">No destinations found matching your criteria.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedRegion('All');
              setSearchQuery('');
            }}
            className="text-xs uppercase tracking-wider font-label-caps"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <article
              key={dest.id}
              className="card-monograph group bg-surface-container-lowest border border-silk-border rounded-lg overflow-hidden flex flex-col h-full hover:border-ink-black/40 hover:shadow-lg transition-all duration-300"
            >
              {/* Media Container */}
              <div className="relative h-64 sm:h-72 w-full media-container bg-surface-dim overflow-hidden">
                <Image
                  src={dest.hero_image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="media-reveal object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Bottom deep gradient for title legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/95 via-ink-black/40 via-45% to-transparent pointer-events-none" />

                {/* Refined Frosted Glass Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="inline-flex items-center px-3 py-1 rounded bg-black/45 backdrop-blur-md text-white border border-white/25 shadow-xs font-label-caps text-[10px] uppercase tracking-widest font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] select-none">
                    <span>{dest.region}</span>
                  </div>
                </div>

                {/* Destination Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-alabaster-cream space-y-1 z-10">
                  <h2 className="font-serif text-2xl sm:text-[26px] font-semibold leading-tight group-hover:text-secondary-container transition-colors">
                    <Link href={`/destinations/${dest.slug}`}>{dest.name}</Link>
                  </h2>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow justify-between gap-5">
                <div className="space-y-3.5">
                  {/* Tagline: Generous editorial serif quote with high contrast */}
                  <p className="font-serif italic text-base sm:text-lg text-ink-black font-normal line-clamp-2 min-h-[3.25rem] leading-snug">
                    &ldquo;{dest.tagline}&rdquo;
                  </p>

                  {/* Description: Comfortable readable body text */}
                  <p className="font-body-base text-slate-taupe text-xs sm:text-sm leading-relaxed line-clamp-3 min-h-[4rem]">
                    {dest.description}
                  </p>

                  {/* Travel Essentials Metadata */}
                  <div className="pt-3.5 border-t border-silk-border/70 space-y-2 text-xs sm:text-sm text-slate-taupe font-body-base">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-bronze-hover shrink-0" />
                      <span className="truncate">
                        <strong className="font-semibold text-ink-black">Best Season:</strong>{' '}
                        {dest.best_time_to_visit.split('(')[0].trim()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-bronze-hover shrink-0" />
                      <span className="truncate">
                        <strong className="font-semibold text-ink-black">Climate:</strong> {dest.weather_info}
                      </span>
                    </div>
                    {dest.ideal_duration && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-bronze-hover shrink-0" />
                        <span className="truncate">
                          <strong className="font-semibold text-ink-black">Pace:</strong> {dest.ideal_duration}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-4 border-t border-silk-border mt-auto">
                  <Link href={`/destinations/${dest.slug}`} className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full h-10 border-silk-border hover:border-ink-black hover:bg-ink-black hover:text-white transition-all text-xs font-label-caps uppercase tracking-widest gap-2 whitespace-nowrap group/btn cursor-pointer"
                    >
                      <span>Explore Monograph</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
