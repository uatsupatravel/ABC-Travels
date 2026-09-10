'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Tour, ItineraryDay, TransitType } from '@/types';
import { Card } from '@/components/ui/Card';
import {
  MapPin,
  Car,
  Plane,
  Ship,
  Train,
  Footprints,
  Bed,
  Utensils,
  ChevronDown,
  Compass,
} from 'lucide-react';

interface TransitTimelineAccordionProps {
  tour: Tour;
}

export default function TransitTimelineAccordion({ tour }: TransitTimelineAccordionProps) {
  const itinerary: ItineraryDay[] = tour.itinerary || [];
  const [openDays, setOpenDays] = useState<number[]>([1]);
  const [activeRibbonDay, setActiveRibbonDay] = useState<number>(1);

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
    setActiveRibbonDay(dayNum);
  };

  const expandAll = () => setOpenDays(itinerary.map((d) => d.day));
  const collapseAll = () => setOpenDays([]);

  const handleRibbonClick = (dayNum: number) => {
    setActiveRibbonDay(dayNum);
    if (!openDays.includes(dayNum)) {
      setOpenDays((prev) => [...prev, dayNum]);
    }
    const elem = document.getElementById('day-accordion-' + dayNum);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const getTransport = (idx: number) => {
    const curr = itinerary[idx];

    if (idx >= itinerary.length - 1) {
      return { isIntercity: false, label: 'VIP Departure', time: 'VIP Airport Departure', icon: Plane };
    }

    if (curr.transit) {
      if (curr.transit.type === 'none') {
        return { isIntercity: false, label: 'Palace Stay & Leisure', time: 'City Exploration & Palace Leisure', icon: Footprints };
      }
      const iconMap: Record<TransitType, any> = {
        none: Footprints,
        drive: Car,
        flight: Plane,
        boat: Ship,
        train: Train,
        safari: Compass,
      };
      const labelMap: Record<TransitType, string> = {
        none: 'City Exploration',
        drive: 'Private Chauffeur',
        flight: 'Domestic Flight',
        boat: 'Private Boat',
        train: 'Express Rail',
        safari: '4x4 Game Drive',
      };
      return {
        isIntercity: true,
        label: labelMap[curr.transit.type] || 'Intercity Transit',
        time: curr.transit.duration ? (curr.transit.duration + (curr.transit.route_notes ? ' • ' + curr.transit.route_notes : '')) : 'Intercity Transfer',
        icon: iconMap[curr.transit.type] || Car,
      };
    }

    const next = itinerary[idx + 1];
    if (curr.location === next.location) {
      return { isIntercity: false, label: 'City Exploration', time: 'City Exploration & Palace Leisure', icon: Footprints };
    }
    return { isIntercity: true, label: 'Private Chauffeur', time: '3.5 - 4.5 hrs', icon: Car };
  };

  if (itinerary.length === 0) return null;

  return (
    <Card className="p-6 space-y-6 border-border shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground block mb-1">
            Curated Schedule & Logistics
          </span>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Day-by-Day Journey & Route Milestones
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click any milestone node along the transit ribbon or expand individual days below.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={expandAll}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground underline decoration-dotted"
          >
            Expand All
          </button>
          <span className="text-muted-foreground/40">•</span>
          <button
            onClick={collapseAll}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground underline decoration-dotted"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* OPTION 2: THE LUXURY TRANSIT RIBBON */}
      <div className="bg-muted/30 p-4 rounded-xl border border-border overflow-x-auto select-none">
        <div className="flex items-start min-w-[650px] gap-0 pt-2 pb-1">
          {itinerary.map((day, idx) => {
            const isSelected = day.day === activeRibbonDay;
            const trans = getTransport(idx);
            const TransIcon = trans.icon;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center relative group">
                {/* Connecting Line */}
                {idx < itinerary.length - 1 && (
                  <div className="hidden md:block absolute top-4 left-1/2 w-full h-1 bg-border/80 -z-0">
                    {trans.isIntercity && (
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background border border-border rounded-full p-1 shadow-sm text-foreground group-hover:scale-110 transition-transform"
                        title={trans.label + ' (' + trans.time + ')'}
                      >
                        <TransIcon className="w-3 h-3 text-accent" />
                      </div>
                    )}
                  </div>
                )}

                {/* Milestone Node Button */}
                <button
                  onClick={() => handleRibbonClick(day.day)}
                  className={'relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-serif text-xs font-bold transition-all ' + (
                    isSelected
                      ? 'bg-foreground text-background scale-110 shadow-md ring-2 ring-foreground/30'
                      : 'bg-card text-muted-foreground border border-border hover:border-foreground hover:text-foreground'
                  )}
                >
                  {day.day}
                </button>

                {/* City & Transit Label */}
                <div className="text-center mt-2 px-1">
                  <span className="font-serif text-[11px] font-bold text-foreground block line-clamp-1">
                    {day.location}
                  </span>
                  <span className={'text-[9px] block line-clamp-1 ' + (trans.isIntercity ? 'text-accent font-semibold' : 'text-muted-foreground')}>
                    {trans.isIntercity ? trans.label : 'Palace Stay'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DAY-BY-DAY EDITORIAL ACCORDION LIST */}
      <div className="space-y-4 pt-2">
        {itinerary.map((day, idx) => {
          const isOpen = openDays.includes(day.day);
          const trans = getTransport(idx);
          const TransIcon = trans.icon;

          return (
            <div
              key={day.day}
              id={'day-accordion-' + day.day}
              className={'rounded-xl border transition-all ' + (
                isOpen ? 'border-border bg-card shadow-sm' : 'border-border/60 bg-muted/20 hover:border-border'
              )}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleDay(day.day)}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 select-none"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-foreground text-background font-serif text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {day.day}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-accent" />
                        <span>{day.location}</span>
                      </span>

                      {trans.isIntercity && (
                        <span className="bg-accent/15 text-accent-foreground px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1">
                          <TransIcon className="w-3 h-3 text-accent" />
                          <span>{trans.time}</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-base sm:text-lg font-bold text-foreground">
                      {day.title}
                    </h4>
                  </div>
                </div>

                <div className="p-1 rounded-full text-muted-foreground hover:text-foreground shrink-0 mt-1">
                  <ChevronDown
                    className={'w-4 h-4 transition-transform duration-300 ' + (
                      isOpen ? 'rotate-180 text-foreground' : ''
                    )}
                  />
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4 border-t border-border/50 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    {/* Day Photo */}
                    {day.image && (
                      <div className="md:col-span-4 relative h-44 w-full rounded-lg overflow-hidden bg-muted border border-border">
                        <Image src={day.image} alt={day.title} fill className="object-cover" />
                      </div>
                    )}

                    {/* Day Description & Highlights */}
                    <div className={'space-y-3 ' + (day.image ? 'md:col-span-8' : 'md:col-span-12')}>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {day.description}
                      </p>

                      {day.highlights && day.highlights.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/90 block font-label-caps">
                            Day Highlights
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {day.highlights.map((h, i) => (
                              <span
                                key={i}
                                className="text-[11px] font-medium bg-muted/70 hover:bg-muted text-foreground border border-border/80 px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors shadow-2xs"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                <span>{h}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Day Footer: Palace Stay & Meals */}
                  {(day.stay || day.meals) && (
                    <div className="pt-3 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {day.stay && (
                        <div className="p-2.5 rounded-lg bg-muted/40 border border-border flex items-start gap-2">
                          <Bed className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                              Palace Accommodation
                            </span>
                            <span className="font-semibold text-foreground">{day.stay}</span>
                          </div>
                        </div>
                      )}

                      {day.meals && (
                        <div className="p-2.5 rounded-lg bg-muted/40 border border-border flex items-start gap-2">
                          <Utensils className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                              Curated Dining
                            </span>
                            <span className="font-semibold text-foreground">{day.meals}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
