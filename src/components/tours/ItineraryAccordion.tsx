'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ItineraryDay } from '@/types';
import { ChevronDown, MapPin, BedDouble, Utensils } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface ItineraryAccordionProps {
  itinerary: ItineraryDay[];
}

export default function ItineraryAccordion({ itinerary }: ItineraryAccordionProps) {
  const [openDays, setOpenDays] = useState<number[]>([1, 2]);

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const expandAll = () => setOpenDays(itinerary.map((d) => d.day));
  const collapseAll = () => setOpenDays([]);

  return (
    <div className="space-y-4">
      {/* Top Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-border text-xs">
        <span className="font-semibold uppercase tracking-wider text-muted-foreground">
          {itinerary.length} Days Itinerary Schedule
        </span>
        <div className="flex items-center gap-3 font-medium text-foreground">
          <button onClick={expandAll} className="hover:underline">
            Expand All
          </button>
          <span className="text-muted-foreground">•</span>
          <button onClick={collapseAll} className="hover:underline">
            Collapse All
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-3">
        {itinerary.map((item) => {
          const isOpen = openDays.includes(item.day);

          return (
            <Card
              key={item.day}
              className={`transition-colors duration-200 overflow-hidden ${
                isOpen ? 'border-foreground/30 bg-card' : 'border-border bg-card/60'
              }`}
            >
              {/* Trigger */}
              <button
                onClick={() => toggleDay(item.day)}
                className="w-full p-4 flex items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4 flex-grow">
                  {/* Day Badge */}
                  <div
                    className={`w-10 h-10 rounded-md flex flex-col items-center justify-center font-serif shrink-0 transition-colors duration-200 ${
                      isOpen
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <span className="text-[8px] uppercase tracking-wider font-sans font-semibold">DAY</span>
                    <span className="text-sm font-bold leading-none">{item.day}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span>{item.location}</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-foreground">
                      {item.title}
                    </h4>
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center bg-muted text-foreground transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-foreground text-background' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Collapsed Details */}
              {isOpen && (
                <div className="px-4 pb-5 pt-1 border-t border-border space-y-3 animate-fadeIn">
                  <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>

                  {/* Day Image */}
                  {item.image && (
                    <div className="relative h-48 sm:h-60 w-full rounded-md overflow-hidden my-2">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Highlights Tags */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.highlights.map((h, hIdx) => (
                        <Badge key={hIdx} variant="secondary" className="text-[11px] font-normal">
                          <span>{h}</span>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Stay & Meals Info Footer */}
                  {(item.stay || item.meals) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-border bg-muted/40 p-3 rounded-md text-xs">
                      {item.stay && (
                        <div className="flex items-center gap-2 text-foreground/80">
                          <BedDouble className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <div>
                            <span className="font-semibold block">Curated Stay:</span>
                            <span className="text-muted-foreground">{item.stay}</span>
                          </div>
                        </div>
                      )}
                      {item.meals && (
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Utensils className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <div>
                            <span className="font-semibold block">Dining:</span>
                            <span className="text-muted-foreground">{item.meals}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
