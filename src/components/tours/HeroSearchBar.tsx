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
      className="bg-surface-container-lowest border border-silk-border p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between text-left"
    >
      {/* Destination / Region Selector */}
      <div className="flex items-center gap-2.5 flex-1 w-full">
        <MapPin className="w-4 h-4 text-slate-taupe shrink-0" />
        <div className="flex flex-col w-full">
          <label className="font-label-caps text-[10px] tracking-widest text-slate-taupe uppercase">
            Region
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="minimal-input w-full py-1 font-body-base text-sm text-ink-black bg-transparent focus:outline-none cursor-pointer appearance-none"
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

      {/* Vertical Divider */}
      <div className="hidden md:block w-px h-8 bg-silk-border" />

      {/* Travel Style Selector */}
      <div className="flex items-center gap-2.5 flex-1 w-full">
        <Sparkles className="w-4 h-4 text-slate-taupe shrink-0" />
        <div className="flex flex-col w-full">
          <label className="font-label-caps text-[10px] tracking-widest text-slate-taupe uppercase">
            Experience Style
          </label>
          <select
            value={travelStyle}
            onChange={(e) => setTravelStyle(e.target.value)}
            className="minimal-input w-full py-1 font-body-base text-sm text-ink-black bg-transparent focus:outline-none cursor-pointer appearance-none"
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

      {/* Vertical Divider */}
      <div className="hidden md:block w-px h-8 bg-silk-border" />

      {/* Duration Selector */}
      <div className="flex items-center gap-2.5 flex-1 w-full">
        <Calendar className="w-4 h-4 text-slate-taupe shrink-0" />
        <div className="flex flex-col w-full">
          <label className="font-label-caps text-[10px] tracking-widest text-slate-taupe uppercase">
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="minimal-input w-full py-1 font-body-base text-sm text-ink-black bg-transparent focus:outline-none cursor-pointer appearance-none"
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
        className="w-full md:w-auto h-11 gap-2 px-8"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Explore</span>
      </Button>
    </form>
  );
}
