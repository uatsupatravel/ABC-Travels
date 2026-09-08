'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Tour, ItineraryDay, TransitType } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  MapPin,
  Car,
  Plane,
  Ship,
  Train,
  Footprints,
  Bed,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Compass,
  RotateCcw,
} from 'lucide-react';

interface InteractiveRouteMapProps {
  tour: Tour;
}

// REGIONAL PRESETS — Strictly Non-Collinear Geometry with Generous Canvas Breathing Room
interface RegionConfig {
  name: string;
  viewBox: string;
  terrainType: 'rajasthan' | 'kerala' | 'ladakh' | 'central' | 'ganges';
  cities: Record<string, { x: number; y: number; labelPos: 'top' | 'bottom' | 'left' | 'right' }>;
}

const REGION_CONFIGS: Record<string, RegionConfig> = {
  rajasthan: {
    name: 'Rajasthan & Northern Royal Corridor',
    viewBox: '-12 -10 124 120',
    terrainType: 'rajasthan',
    cities: {
      Delhi: { x: 58, y: 16, labelPos: 'top' },
      Agra: { x: 82, y: 34, labelPos: 'right' },
      Jaipur: { x: 40, y: 46, labelPos: 'left' },
      Udaipur: { x: 22, y: 78, labelPos: 'bottom' },
      Jodhpur: { x: 18, y: 48, labelPos: 'left' },
      Ranthambore: { x: 58, y: 54, labelPos: 'right' },
    },
  },
  kerala: {
    name: 'Kerala & Malabar Coastline',
    viewBox: '-12 -10 124 120',
    terrainType: 'kerala',
    cities: {
      Kochi: { x: 30, y: 28, labelPos: 'left' },
      Munnar: { x: 70, y: 22, labelPos: 'right' },
      Thekkady: { x: 76, y: 52, labelPos: 'right' },
      Kumarakom: { x: 46, y: 58, labelPos: 'top' },
      Alleppey: { x: 32, y: 68, labelPos: 'left' },
    },
  },
  ladakh: {
    name: 'Ladakh High Himalayas & Trans-Himalayan Valleys',
    viewBox: '-12 -10 124 120',
    terrainType: 'ladakh',
    cities: {
      Leh: { x: 36, y: 62, labelPos: 'bottom' },
      Nubra: { x: 48, y: 18, labelPos: 'top' },
      Pangong: { x: 78, y: 44, labelPos: 'right' },
    },
  },
  central: {
    name: 'Central Wildlife Sanctuaries & Palaces',
    viewBox: '-12 -10 124 120',
    terrainType: 'central',
    cities: {
      Delhi: { x: 54, y: 18, labelPos: 'top' },
      Ranthambore: { x: 62, y: 62, labelPos: 'right' },
      Jaipur: { x: 32, y: 46, labelPos: 'left' },
    },
  },
  ganges: {
    name: 'Sacred Ganges Corridor',
    viewBox: '-12 -10 124 120',
    terrainType: 'ganges',
    cities: {
      Delhi: { x: 26, y: 30, labelPos: 'left' },
      Varanasi: { x: 74, y: 60, labelPos: 'right' },
      Sarnath: { x: 82, y: 48, labelPos: 'top' },
    },
  },
};

export default function InteractiveRouteMap({ tour }: InteractiveRouteMapProps) {
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const itinerary: ItineraryDay[] = tour.itinerary || [];
  const activeDay = itinerary[selectedDayIdx] || itinerary[0];

  const activeRegionKey = React.useMemo(() => {
    const slug = (tour.slug + ' ' + (tour.destination_name || '')).toLowerCase();
    if (slug.includes('kerala') || slug.includes('alleppey') || slug.includes('munnar')) return 'kerala';
    if (slug.includes('ladakh') || slug.includes('himalaya') || slug.includes('leh') || slug.includes('nubra')) return 'ladakh';
    if (slug.includes('ranthambore') || slug.includes('tiger') || slug.includes('wildlife')) return 'central';
    if (slug.includes('varanasi') || slug.includes('ganges')) return 'ganges';
    return 'rajasthan';
  }, [tour.slug, tour.destination_name]);

  const regionConfig = REGION_CONFIGS[activeRegionKey] || REGION_CONFIGS.rajasthan;

  const getCleanCity = (locationStr: string): string => {
    if (locationStr.includes(' to ')) {
      return locationStr.split(' to ')[1]?.trim() || locationStr;
    }
    return locationStr.trim();
  };

  const matchCity = (locationStr: string): string | null => {
    for (const city of Object.keys(regionConfig.cities)) {
      if (locationStr.toLowerCase().includes(city.toLowerCase())) {
        return city;
      }
    }
    return null;
  };

  const getOneLineTeaser = (desc: string): string => {
    if (!desc) return '';
    const firstSentence = desc.split('. ')[0];
    return firstSentence.endsWith('.') ? firstSentence : firstSentence + '.';
  };

  const getTransport = (idx: number) => {
    const curr = itinerary[idx];
    if (!curr) return { isIntercity: false, label: 'Palace Stay', time: 'Palace Leisure', icon: Bed };

    if (idx >= itinerary.length - 1) {
      return { isIntercity: false, label: 'VIP Departure', time: 'VIP Airport Transfer', icon: Plane };
    }

    if (curr.transit) {
      if (curr.transit.type === 'none') {
        return { isIntercity: false, label: 'Palace Stay & Leisure', time: 'City Exploration & Palace Leisure', icon: Footprints };
      }
      const iconMap: Record<TransitType, any> = {
        none: Footprints, drive: Car, flight: Plane, boat: Ship, train: Train, safari: Compass,
      };
      const labelMap: Record<TransitType, string> = {
        none: 'City Exploration', drive: 'Private Chauffeur', flight: 'Domestic Flight',
        boat: 'Private Boat', train: 'Express Rail', safari: '4x4 Game Drive',
      };
      return {
        isIntercity: true,
        label: labelMap[curr.transit.type] || 'Intercity Transit',
        time: curr.transit.duration ? (curr.transit.duration + (curr.transit.route_notes ? ' • ' + curr.transit.route_notes : '')) : 'Intercity Transfer',
        icon: iconMap[curr.transit.type] || Car,
      };
    }

    const next = itinerary[idx + 1];
    if (next && curr.location === next.location) {
      return { isIntercity: false, label: 'City Exploration', time: 'City Exploration & Palace Leisure', icon: Footprints };
    }
    return { isIntercity: true, label: 'Private Chauffeur', time: 'Intercity Transfer', icon: Car };
  };

  // Build ordered sequence of unique destination hubs
  const journeySequence = React.useMemo(() => {
    const sequence: { city: string; dayRange: [number, number]; dayIdxRange: [number, number] }[] = [];
    let currentCity: string | null = null;
    let startDay = 0;
    let startIdx = 0;

    itinerary.forEach((day, idx) => {
      const city = matchCity(day.location) || getCleanCity(day.location);
      if (city !== currentCity) {
        if (currentCity !== null) {
          sequence.push({
            city: currentCity,
            dayRange: [startDay, itinerary[idx - 1].day],
            dayIdxRange: [startIdx, idx - 1],
          });
        }
        currentCity = city;
        startDay = day.day;
        startIdx = idx;
      }
    });
    if (currentCity !== null) {
      sequence.push({
        city: currentCity,
        dayRange: [startDay, itinerary[itinerary.length - 1].day],
        dayIdxRange: [startIdx, itinerary.length - 1],
      });
    }
    return sequence;
  }, [itinerary]);

  // Route LEGS: Exact transit day for each leg
  const routeLegs = React.useMemo(() => {
    const legs: { from: string; to: string; legIdx: number; isFlight: boolean; transitDayIdx: number }[] = [];
    for (let i = 0; i < journeySequence.length - 1; i++) {
      const from = journeySequence[i].city;
      const to = journeySequence[i + 1].city;
      if (from !== to) {
        // The day on which travel to the new city starts
        const transitDayIdx = journeySequence[i + 1].dayIdxRange[0];
        const transitDay = itinerary[transitDayIdx];
        const isFlight = transitDay?.transit?.type === 'flight' || (from === 'Jaipur' && to === 'Udaipur') || (from === 'Udaipur' && to === 'Delhi');
        legs.push({ from, to, legIdx: i, isFlight, transitDayIdx });
      }
    }
    return legs;
  }, [journeySequence, itinerary]);

  // Active City: based on current day location
  const currentCityName = React.useMemo(() => {
    const dayLocation = activeDay.location;
    return matchCity(dayLocation) || getCleanCity(dayLocation);
  }, [activeDay, regionConfig]);

  const cityPins = React.useMemo(() => {
    const seen = new Set<string>();
    return journeySequence
      .filter((seg) => {
        if (seen.has(seg.city)) return false;
        seen.add(seg.city);
        return true;
      })
      .map((seg) => {
        const pos = regionConfig.cities[seg.city] || { x: 50, y: 50, labelPos: 'top' as const };
        return { city: seg.city, ...pos };
      });
  }, [journeySequence, regionConfig]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isPlaying && itinerary.length > 0) {
      timer = setInterval(() => {
        setSelectedDayIdx((prev) => (prev + 1) % itinerary.length);
      }, 3500);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isPlaying, itinerary.length]);

  if (itinerary.length === 0) return null;

  const currentTransport = getTransport(selectedDayIdx);
  const TransIcon = currentTransport.icon;
  const oneLineTeaser = getOneLineTeaser(activeDay.description);
  const isLastDay = selectedDayIdx === itinerary.length - 1;

  const displayImage = activeDay.image || tour.hero_image || '/images/destinations/rajasthan/hero.jpg';

  return (
    <div className="p-0 overflow-hidden border border-border/80 rounded-xl shadow-sm bg-card">
      {/* CONSOLIDATED TOP HEADER: TITLE + UNIFIED STAGE CONTROLS */}
      <div className="p-4 sm:p-5 bg-muted/40 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-accent block mb-0.5">
            {regionConfig.name}
          </span>
          <h3 className="font-serif text-lg font-bold text-foreground">
            Regional Route & Logistics Explorer
          </h3>
        </div>

        {/* UNIFIED STAGE CONTROLS IN TOP HEADER */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-between sm:justify-start w-full sm:w-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`text-xs h-8 px-2.5 sm:px-3 rounded-md gap-1.5 flex items-center font-medium transition-all border cursor-pointer ${
              isPlaying
                ? 'bg-accent/15 border-accent text-accent shadow-xs'
                : 'bg-background border-border/80 text-foreground hover:border-accent/60 hover:text-accent'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-accent" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Auto-Play'}</span>
            <span className="hidden sm:inline">Journey</span>
          </button>

          {/* Unified Previous / Day Counter / Next / Replay Control */}
          <div className="flex items-center gap-1 border border-border rounded-lg p-0.5 bg-background shadow-xs">
            <button
              onClick={() => setSelectedDayIdx((prev) => Math.max(prev - 1, 0))}
              disabled={selectedDayIdx === 0}
              className="px-2.5 py-1 rounded-md text-xs font-semibold text-muted-foreground hover:text-foreground disabled:opacity-25 transition-colors flex items-center gap-1"
              title="Previous Day"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <span className="text-xs font-mono font-bold px-3 py-1 bg-muted/60 rounded text-foreground whitespace-nowrap">
              Day {selectedDayIdx + 1} of {itinerary.length}
            </span>

            {isLastDay ? (
              <button
                onClick={() => setSelectedDayIdx(0)}
                className="px-2.5 py-1 rounded-md text-xs font-semibold text-accent hover:text-foreground transition-colors flex items-center gap-1"
                title="Replay from Day 1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Replay</span>
              </button>
            ) : (
              <button
                onClick={() => setSelectedDayIdx((prev) => Math.min(prev + 1, itinerary.length - 1))}
                className="px-2.5 py-1 rounded-md text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                title="Next Day"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* STRICT FIXED-HEIGHT 2-COLUMN BODY (ZERO VERTICAL JUMPING BETWEEN SLIDES) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:h-[460px]">
        {/* BESPOKE REGIONAL EDITORIAL VECTOR CANVAS */}
        <div className="lg:col-span-7 relative h-[360px] lg:h-full bg-[#0c121e] p-6 sm:p-8 flex items-center justify-center overflow-hidden select-none">
          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />

          <svg
            viewBox={regionConfig.viewBox}
            className="w-full h-full max-h-[380px] drop-shadow-2xl overflow-visible"
          >
            <defs>
              <linearGradient id="goldRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3e5ab" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#aa7c11" />
              </linearGradient>

              <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <filter id="activeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor="#d4af37" floodOpacity="0.5" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
              </filter>
            </defs>

            {/* REGIONAL CONTOUR TERRAIN VECTORS */}
            {regionConfig.terrainType === 'rajasthan' && (
              <g opacity="0.12" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="0.8">
                <path d="M 18 80 Q 34 56 46 32 T 62 12" strokeDasharray="3 3" />
                <path d="M 12 85 Q 28 60 42 36 T 58 18" strokeDasharray="2 4" />
                <path d="M 52 8 Q 58 22 76 34 T 92 46" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1" />
                <circle cx="22" cy="78" r="6" fill="rgba(147, 197, 253, 0.06)" stroke="rgba(147, 197, 253, 0.2)" />
              </g>
            )}

            {regionConfig.terrainType === 'kerala' && (
              <g opacity="0.15" stroke="rgba(255,255,255,0.4)" fill="none" strokeWidth="0.8">
                <path d="M 22 10 Q 26 40 28 65 T 38 95" stroke="rgba(147, 197, 253, 0.5)" strokeWidth="1.4" />
                <path d="M 30 48 Q 36 60 33 75" stroke="rgba(147, 197, 253, 0.6)" strokeWidth="2" />
                <path d="M 60 15 Q 70 45 75 80" strokeDasharray="3 3" />
              </g>
            )}

            {regionConfig.terrainType === 'ladakh' && (
              <g opacity="0.15" stroke="rgba(255,255,255,0.4)" fill="none" strokeWidth="0.8">
                <path d="M 15 80 Q 40 50 70 30" strokeDasharray="4 4" />
                <path d="M 25 30 Q 45 20 85 20" strokeDasharray="2 3" />
                <path d="M 68 46 Q 78 52 92 48" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="2.5" />
              </g>
            )}

            {/* ROUTE LEGS: ONLY ILLUMINATED WHEN ACTUALLY TRAVELED UP TO THIS DAY */}
            {routeLegs.map((leg, i) => {
              const fromPos = regionConfig.cities[leg.from] || { x: 50, y: 50 };
              const toPos = regionConfig.cities[leg.to] || { x: 50, y: 50 };

              // A leg is illuminated ONLY if the traveler has reached/passed that transit day
              const isTraveled = selectedDayIdx >= leg.transitDayIdx;
              const isCurrentTransitDay = selectedDayIdx === leg.transitDayIdx;

              let controlX = (fromPos.x + toPos.x) / 2;
              let controlY = (fromPos.y + toPos.y) / 2;

              if (leg.from === 'Delhi' && leg.to === 'Agra') {
                controlX = 72; controlY = 22;
              } else if (leg.from === 'Agra' && leg.to === 'Jaipur') {
                controlX = 60; controlY = 48;
              } else if (leg.from === 'Jaipur' && leg.to === 'Udaipur') {
                controlX = 28; controlY = 60;
              } else if (leg.from === 'Udaipur' && leg.to === 'Delhi') {
                controlX = 4; controlY = 40;
              } else {
                controlX = (fromPos.x + toPos.x) / 2 + (leg.isFlight ? -16 : (i % 2 === 0 ? 6 : -6));
                controlY = (fromPos.y + toPos.y) / 2 + (leg.isFlight ? -8 : -4);
              }

              const pathD = `M ${fromPos.x} ${fromPos.y} Q ${controlX} ${controlY} ${toPos.x} ${toPos.y}`;

              const glyphX = 0.25 * fromPos.x + 0.5 * controlX + 0.25 * toPos.x;
              const glyphY = 0.25 * fromPos.y + 0.5 * controlY + 0.25 * toPos.y;

              const tanX = toPos.x - fromPos.x;
              const tanY = toPos.y - fromPos.y;
              const glyphAngle = Math.atan2(tanY, tanX) * (180 / Math.PI) - 45;

              return (
                <g key={'leg-' + i}>
                  {/* Subtle Inactive Guide Path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1.2"
                  />

                  {/* Golden Glowing Vector — ONLY WHEN TRAVELED ON OR BEFORE THIS DAY */}
                  {isTraveled && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke="url(#goldRouteGrad)"
                      strokeWidth={isCurrentTransitDay ? '2.8' : '1.8'}
                      filter={isCurrentTransitDay ? 'url(#goldGlow)' : undefined}
                      className="transition-all duration-700"
                    />
                  )}

                  {/* Airplane Glyph — ONLY APPEARS ONCE THE FLIGHT LEG HAS ACTUALLY OCCURRED */}
                  {leg.isFlight && isTraveled && (
                    <g transform={`translate(${glyphX}, ${glyphY})`}>
                      <circle r="3.2" fill="#0c121e" stroke="#d4af37" strokeWidth="0.8" />
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="3.2"
                        fill="#f3e5ab"
                        transform={`rotate(${glyphAngle})`}
                      >
                        ✈
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* DESTINATION PINS — Clean dots + city names */}
            {cityPins.map((pin) => {
              const isActive = pin.city === currentCityName;
              // A pin is marked visited if its segment was reached on or before this day
              const visitedSegments = journeySequence.filter((s) => s.city === pin.city);
              const hasBeenVisited = visitedSegments.some((s) => s.dayIdxRange[0] <= selectedDayIdx);

              let textX = pin.x;
              let textY = pin.y - 5;
              let anchor: 'middle' | 'start' | 'end' = 'middle';

              if (pin.labelPos === 'left') {
                textX = pin.x - 5.5;
                textY = pin.y + 1;
                anchor = 'end';
              } else if (pin.labelPos === 'right') {
                textX = pin.x + 5.5;
                textY = pin.y + 1;
                anchor = 'start';
              } else if (pin.labelPos === 'bottom') {
                textX = pin.x;
                textY = pin.y + 7;
                anchor = 'middle';
              }

              return (
                <g
                  key={'pin-' + pin.city}
                  onClick={() => {
                    const seg = journeySequence.find((s) => s.city === pin.city);
                    if (seg) setSelectedDayIdx(seg.dayIdxRange[0]);
                  }}
                  className="cursor-pointer group"
                >
                  {isActive && (
                    <circle cx={pin.x} cy={pin.y} r="6.5" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.35" />
                  )}

                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={isActive ? '3.5' : '2.5'}
                    fill={isActive ? '#d4af37' : hasBeenVisited ? '#e2e8f0' : '#64748b'}
                    stroke={isActive ? '#f3e5ab' : '#0c121e'}
                    strokeWidth={isActive ? '1.5' : '1'}
                    filter={isActive ? 'url(#activeGlow)' : undefined}
                    className="transition-all duration-500"
                  />

                  <text
                    x={textX}
                    y={textY}
                    textAnchor={anchor}
                    fontSize={isActive ? '3.2' : '2.8'}
                    fill={isActive ? '#f3e5ab' : '#94a3b8'}
                    fontWeight={isActive ? 'bold' : 'normal'}
                    className="transition-all duration-500 font-serif drop-shadow"
                    style={{ letterSpacing: '0.02em' }}
                  >
                    {pin.city}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Live Transit Badge (Bottom-Left) */}
          <div className="absolute bottom-4 left-4 z-20 bg-black/85 backdrop-blur-md border border-white/15 px-3 py-2 rounded-lg text-white text-xs flex items-center gap-2.5 shadow-xl max-w-[85%]">
            <div className="w-6 h-6 rounded-full bg-accent/25 flex items-center justify-center text-amber-300 shrink-0">
              <TransIcon className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] text-zinc-400 block uppercase tracking-wider font-semibold">
                {currentTransport.isIntercity ? 'Intercity Transit' : 'Stage Status'}
              </span>
              <span className="font-semibold text-xs text-zinc-100 truncate block">
                {currentTransport.time}
              </span>
            </div>
          </div>
        </div>

        {/* STAGE FOCUS CARD (STRICT FIXED HEIGHT, BALANCED LAYOUT, NO BOTTOM BUTTONS) */}
        <div className="lg:col-span-5 p-6 h-full flex flex-col justify-start space-y-3.5 bg-card overflow-hidden">
          {/* Stage Day & Location */}
          <div className="flex items-center justify-between shrink-0">
            <Badge variant="default" className="text-xs font-serif font-bold px-2.5 py-0.5">
              Day {activeDay.day} of {itinerary.length}
            </Badge>
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>{activeDay.location}</span>
            </span>
          </div>

          {/* Stage Title */}
          <h4 className="font-serif text-lg font-bold text-foreground leading-snug line-clamp-2 shrink-0">
            {activeDay.title}
          </h4>

          {/* Fixed-Height High-Resolution Image */}
          <div className="relative h-32 w-full rounded-lg overflow-hidden border border-border bg-muted shrink-0 shadow-xs">
            <Image src={displayImage} alt={activeDay.title} fill className="object-cover" />
          </div>

          {/* 1-Line Poetic Teaser */}
          <p className="text-xs text-muted-foreground italic leading-relaxed line-clamp-2 shrink-0">
            &ldquo;{oneLineTeaser}&rdquo;
          </p>

          {/* Curated Highlights Pills */}
          {activeDay.highlights && activeDay.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {activeDay.highlights.slice(0, 3).map((highlight, hIdx) => (
                <span
                  key={hIdx}
                  className="text-[10px] bg-secondary/80 text-secondary-foreground font-medium px-2 py-0.5 rounded flex items-center gap-1 border border-border/50"
                >
                  <span className="w-1 h-1 rounded-full bg-accent inline-block shrink-0" />
                  <span>{highlight}</span>
                </span>
              ))}
            </div>
          )}

          {/* Palace Stay Prestige Marker */}
          {activeDay.stay && (
            <div className="p-2.5 rounded-lg bg-muted/40 border border-border flex items-start gap-2 text-xs shrink-0 mt-auto">
              <Bed className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-bold text-muted-foreground block">Palace Accommodation</span>
                <span className="font-semibold text-foreground truncate block">{activeDay.stay}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
