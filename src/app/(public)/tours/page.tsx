'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TourCard from '@/components/tours/TourCard';
import ContactSpecialistDialog from '@/components/inquiry/ContactSpecialistDialog';
import { getTours, getDestinations } from '@/lib/data-service';
import { Tour, TravelStyle, ActivityLevel, Region, Destination } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Filter, RotateCcw, Search, Compass, SlidersHorizontal, Loader2 } from 'lucide-react';

function ToursContent() {
  const searchParams = useSearchParams();

  const initialRegion = searchParams.get('region') || 'all';
  const initialStyle = searchParams.get('style') || 'all';
  const initialDuration = searchParams.get('duration') || 'all';

  const [tours, setTours] = useState<Tour[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [regionFilter, setRegionFilter] = useState(initialRegion);
  const [styleFilter, setStyleFilter] = useState(initialStyle);
  const [durationFilter, setDurationFilter] = useState(initialDuration);
  const [activityFilter, setActivityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [selectedTourForInquiry, setSelectedTourForInquiry] = useState<Tour | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedTours, fetchedDestinations] = await Promise.all([
          getTours(),
          getDestinations()
        ]);
        setTours(fetchedTours);
        setDestinations(fetchedDestinations);
      } catch (err) {
        console.error('Error fetching catalog data:', err);
      } finally {
        setIsLoadingData(false);
      }
    }
    loadData();
  }, []);

  const handleContactSpecialist = (tour: Tour) => {
    setSelectedTourForInquiry(tour);
    setIsDrawerOpen(true);
  };

  const resetFilters = () => {
    setRegionFilter('all');
    setStyleFilter('all');
    setDurationFilter('all');
    setActivityFilter('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const filteredTours = useMemo(() => {
    let result = tours.filter((tour) => {
      if (regionFilter !== 'all') {
        const dest = destinations.find((d) => d.id === tour.destination_id || d.name === tour.destination_name);
        if (!dest || dest.region !== regionFilter) return false;
      }
      if (styleFilter !== 'all' && tour.travel_style !== styleFilter) return false;
      if (activityFilter !== 'all' && tour.activity_level !== activityFilter) return false;
      if (durationFilter === 'short' && tour.duration_days > 5) return false;
      if (durationFilter === 'medium' && (tour.duration_days < 6 || tour.duration_days > 9)) return false;
      if (durationFilter === 'long' && tour.duration_days < 10) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = tour.title.toLowerCase().includes(q);
        const matchSubtitle = tour.subtitle.toLowerCase().includes(q);
        const matchDest = tour.destination_name?.toLowerCase().includes(q) ?? false;
        const matchStyle = tour.travel_style.toLowerCase().includes(q);
        if (!matchTitle && !matchSubtitle && !matchDest && !matchStyle) return false;
      }

      return true;
    });

    if (sortBy === 'price-asc') result.sort((a, b) => a.price_usd - b.price_usd);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price_usd - a.price_usd);
    else if (sortBy === 'duration-asc') result.sort((a, b) => a.duration_days - b.duration_days);
    else if (sortBy === 'duration-desc') result.sort((a, b) => b.duration_days - a.duration_days);

    return result;
  }, [regionFilter, styleFilter, durationFilter, activityFilter, searchQuery, sortBy, tours, destinations]);

  const travelStyles: TravelStyle[] = [
    'Heritage & Palaces',
    'Wildlife Safari',
    'Himalayan Exploration',
    'Spiritual & Wellness',
    'Coastal & Luxury Stays',
  ];

  const regions: Region[] = [
    'North India',
    'South India',
    'Himalayas & Ladakh',
    'Central India',
    'Western India',
  ];

  if (isLoadingData) {
    return (
      <div className="pt-32 pb-20 min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-taupe">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="font-label-caps tracking-widest text-xs uppercase">Loading Portfolios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="max-w-3xl mb-12 space-y-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
          Curated Private Journeys
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Curated Itineraries Across India
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Filter by geographical region, travel style, and duration. All itineraries are 100% customizable.
        </p>
      </div>

      {/* Main Grid: Sidebar + Tours List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between pb-4 border-b border-border">
          <Button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            variant="outline"
            size="sm"
            className="text-xs font-semibold uppercase tracking-wider gap-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isMobileFilterOpen ? 'Hide Filters' : 'Filter Itineraries'}</span>
          </Button>
          <span className="text-xs text-muted-foreground font-medium">
            Showing {filteredTours.length} of {tours.length} Journeys
          </span>
        </div>

        {/* Filter Sidebar */}
        <aside
          className={`lg:block ${
            isMobileFilterOpen ? 'block' : 'hidden'
          } lg:col-span-1 space-y-6 h-fit sticky top-28`}
        >
          <Card className="p-5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span>Refine Search</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Search Query */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Keyword
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="e.g. Udaipur, Tiger..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 text-xs"
                />
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-3" />
              </div>
            </div>

            {/* Region */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Region
              </label>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-200"
              >
                <option value="all">All Regions</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Travel Style
              </label>
              <select
                value={styleFilter}
                onChange={(e) => setStyleFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-200"
              >
                <option value="all">All Styles</option>
                {travelStyles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Duration
              </label>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value="all"
                    checked={durationFilter === 'all'}
                    onChange={() => setDurationFilter('all')}
                    className="accent-primary"
                  />
                  <span>All Durations</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value="short"
                    checked={durationFilter === 'short'}
                    onChange={() => setDurationFilter('short')}
                    className="accent-primary"
                  />
                  <span>3 – 5 Days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value="medium"
                    checked={durationFilter === 'medium'}
                    onChange={() => setDurationFilter('medium')}
                    className="accent-primary"
                  />
                  <span>6 – 9 Days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value="long"
                    checked={durationFilter === 'long'}
                    onChange={() => setDurationFilter('long')}
                    className="accent-primary"
                  />
                  <span>10+ Days</span>
                </label>
              </div>
            </div>

            {/* Custom Trip Prompt */}
            <div className="pt-3 border-t border-border space-y-2">
              <span className="font-semibold text-xs text-foreground block">Looking for a custom route?</span>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                We craft multi-city itineraries tailored to your exact dates.
              </p>
              <a
                href="/plan-your-trip"
                className="inline-block text-xs font-semibold text-foreground hover:underline"
              >
                Launch Planner Wizard →
              </a>
            </div>
          </Card>
        </aside>

        {/* Tours Listing Column */}
        <main className="lg:col-span-3 space-y-6">
          {/* Top Bar: Results Count & Sort */}
          <div className="hidden lg:flex items-center justify-between pb-3 border-b border-border text-xs">
            <span className="text-muted-foreground font-medium">
              Showing <span className="text-foreground font-bold">{filteredTours.length}</span> curated luxury itineraries
            </span>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-8 rounded-md border border-input bg-background px-2.5 text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration-asc">Duration: Short to Long</option>
                <option value="duration-desc">Duration: Long to Short</option>
              </select>
            </div>
          </div>

          {/* Tours Grid */}
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  onContactSpecialist={handleContactSpecialist}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center space-y-4">
              <Compass className="w-10 h-10 text-muted-foreground mx-auto" />
              <h3 className="font-serif text-xl font-bold text-foreground">
                No matching itineraries found
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                We couldn't find any tours matching your exact filters, but our Concierge can craft this exact route for you.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <Button onClick={resetFilters} variant="outline" size="sm" className="text-xs">
                  Reset Filters
                </Button>
                <a href="/plan-your-trip">
                  <Button variant="default" size="sm" className="text-xs">
                    Custom Route Request
                  </Button>
                </a>
              </div>
            </Card>
          )}
        </main>
      </div>

      <ContactSpecialistDialog
        tour={selectedTourForInquiry}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-muted-foreground text-xs">Loading catalog...</div>}>
      <ToursContent />
    </Suspense>
  );
}
