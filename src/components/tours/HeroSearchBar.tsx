'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Sparkles, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HeroSearchBar() {
  const router = useRouter();
  const [region, setRegion] = useState('all');
  const [travelStyle, setTravelStyle] = useState('all');
  const [duration, setDuration] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (region !== 'all') params.set('region', region);
    if (travelStyle !== 'all') params.set('style', travelStyle);
    if (duration !== 'all') params.set('duration', duration);

    router.push(`/tours?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-card text-card-foreground border border-border rounded-lg p-2 shadow-md max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-2 items-center text-left"
    >
      {/* Destination / Region Selector */}
      <div className="flex items-center gap-2.5 px-3 py-2 sm:border-r border-border">
        <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Region
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer w-full py-0.5"
          >
            <option value="all">All India</option>
            <option value="North India">North (Rajasthan & Delhi)</option>
            <option value="South India">South (Kerala & Spice Coast)</option>
            <option value="Himalayas & Ladakh">Himalayas & Ladakh</option>
            <option value="Central India">Central (Tiger Reserves)</option>
            <option value="Western India">Western (Goa Coast)</option>
          </select>
        </div>
      </div>

      {/* Travel Style Selector */}
      <div className="flex items-center gap-2.5 px-3 py-2 sm:border-r border-border">
        <Sparkles className="w-4 h-4 text-muted-foreground shrink-0" />
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Experience Style
          </label>
          <select
            value={travelStyle}
            onChange={(e) => setTravelStyle(e.target.value)}
            className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer w-full py-0.5"
          >
            <option value="all">Any Style</option>
            <option value="Heritage & Palaces">Heritage & Palaces</option>
            <option value="Wildlife Safari">Royal Bengal Safari</option>
            <option value="Himalayan Exploration">Himalayan Expeditions</option>
            <option value="Spiritual & Wellness">Ayurveda & Wellness</option>
            <option value="Coastal & Luxury Stays">Coastal & Private Villas</option>
          </select>
        </div>
      </div>

      {/* Duration Selector */}
      <div className="flex items-center gap-2.5 px-3 py-2">
        <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer w-full py-0.5"
          >
            <option value="all">Any Duration</option>
            <option value="short">3 – 5 Days</option>
            <option value="medium">6 – 9 Days</option>
            <option value="long">10+ Days</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        variant="default"
        className="w-full h-11 text-xs uppercase tracking-wider font-semibold gap-2"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Explore</span>
      </Button>
    </form>
  );
}
