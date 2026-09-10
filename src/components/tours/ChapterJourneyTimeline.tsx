'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Tour, ItineraryDay, TransitType } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
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
  ArrowDown,
} from 'lucide-react';

interface ChapterJourneyTimelineProps {
  tour: Tour;
}

interface JourneyChapter {
  id: string;
  chapterNumber: number;
  cityName: string;
  days: ItineraryDay[];
  nightCount: number;
  primaryStay?: string;
  transitToNext?: {
    type: TransitType;
    duration?: string;
    route_notes?: string;
    label: string;
    icon: any;
  };
}

export default function ChapterJourneyTimeline({ tour }: ChapterJourneyTimelineProps) {
  const itinerary: ItineraryDay[] = tour.itinerary || [];
  const [expandedChapters, setExpandedChapters] = useState<string[]>(['chapter-1']); // First chapter open by default

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  const expandAll = () => setExpandedChapters(chapters.map((c) => c.id));
  const collapseAll = () => setExpandedChapters([]);

  // Transit Icon & Label Helper
  const getTransitDetails = (day: ItineraryDay) => {
    if (!day.transit || day.transit.type === 'none') return null;

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
      boat: 'Private Boat Transfer',
      train: 'Executive Rail',
      safari: '4x4 Game Drive',
    };

    return {
      type: day.transit.type,
      duration: day.transit.duration,
      route_notes: day.transit.route_notes,
      label: labelMap[day.transit.type] || 'Intercity Transit',
      icon: iconMap[day.transit.type] || Car,
    };
  };

  // Group itinerary into Destination Chapters
  const chapters = React.useMemo<JourneyChapter[]>(() => {
    if (itinerary.length === 0) return [];

    const grouped: JourneyChapter[] = [];
    let currentChapter: JourneyChapter | null = null;

    itinerary.forEach((day, idx) => {
      // Clean city name (e.g. "Agra to Jaipur" -> extract destination)
      const cleanCity = day.location.includes(' to ')
        ? day.location.split(' to ')[1]?.trim() || day.location
        : day.location.trim();

      if (!currentChapter || currentChapter.cityName.toLowerCase() !== cleanCity.toLowerCase()) {
        // If previous chapter had a transit at its last day
        if (currentChapter && currentChapter.days.length > 0) {
          const lastDayOfPrev = currentChapter.days[currentChapter.days.length - 1];
          currentChapter.transitToNext = getTransitDetails(lastDayOfPrev) || undefined;
        }

        currentChapter = {
          id: 'chapter-' + (grouped.length + 1),
          chapterNumber: grouped.length + 1,
          cityName: cleanCity,
          days: [day],
          nightCount: 1,
          primaryStay: day.stay,
        };
        grouped.push(currentChapter);
      } else {
        currentChapter.days.push(day);
        currentChapter.nightCount += 1;
        if (!currentChapter.primaryStay && day.stay) {
          currentChapter.primaryStay = day.stay;
        }
      }

      // Check if this day has a transit
      const transit = getTransitDetails(day);
      if (transit && currentChapter) {
        currentChapter.transitToNext = transit;
      }
    });

    return grouped;
  }, [itinerary]);

  if (itinerary.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-accent block mb-1">
            Curated Route & Chapters
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Destination Chapters & Day-by-Day Journey
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Organized across {chapters.length} curated destination hubs and private intercity transit legs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs font-semibold">
          <button
            onClick={expandAll}
            className="text-muted-foreground hover:text-foreground underline decoration-dotted"
          >
            Expand All Chapters
          </button>
          <span className="text-muted-foreground/40">•</span>
          <button
            onClick={collapseAll}
            className="text-muted-foreground hover:text-foreground underline decoration-dotted"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* CHAPTERS VOYAGE FLOW */}
      <div className="space-y-0">
        {chapters.map((chapter, chapIdx) => {
          const isExpanded = expandedChapters.includes(chapter.id);
          const startDay = chapter.days[0].day;
          const endDay = chapter.days[chapter.days.length - 1].day;
          const dayRangeStr = startDay === endDay ? 'Day ' + startDay : 'Days ' + startDay + '–' + endDay;
          const nightStr = chapter.nightCount + (chapter.nightCount === 1 ? ' Night' : ' Nights');

          return (
            <React.Fragment key={chapter.id}>
              {/* CHAPTER CARD */}
              <Card className="p-0 overflow-hidden border-border shadow-sm transition-all bg-card">
                {/* Chapter Top Bar / Header Trigger */}
                <div
                  onClick={() => toggleChapter(chapter.id)}
                  className="p-5 sm:p-6 cursor-pointer select-none hover:bg-muted/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50"
                >
                  <div className="flex items-start gap-4">
                    {/* Chapter Number Badge */}
                    <div className="w-10 h-10 rounded-xl bg-foreground text-background font-serif text-sm font-bold flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      0{chapter.chapterNumber}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-accent">
                          Chapter {chapter.chapterNumber}
                        </span>
                        <span className="text-muted-foreground/40">•</span>
                        <span className="text-xs font-semibold text-muted-foreground">
                          {dayRangeStr} ({nightStr})
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                        {chapter.cityName}
                      </h3>

                      {chapter.primaryStay && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-0.5">
                          <Bed className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>Stay: <strong className="text-foreground">{chapter.primaryStay}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <span className="text-xs font-semibold text-accent underline decoration-dotted hidden sm:inline">
                      {isExpanded ? 'Hide Schedule' : 'View ' + chapter.days.length + ' Days Schedule'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground transition-transform">
                      <ChevronDown
                        className={'w-4 h-4 transition-transform duration-300 ' + (
                          isExpanded ? 'rotate-180 text-foreground' : 'text-muted-foreground'
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* CHAPTER EXPANDABLE DAILY EXPERIENCES */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 space-y-6 bg-muted/10 animate-fadeIn">
                    <div className="space-y-6">
                      {chapter.days.map((day) => (
                        <div
                          key={day.day}
                          className="bg-card p-5 rounded-xl border border-border/80 shadow-sm space-y-4"
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                            <div className="flex items-center gap-2.5">
                              <Badge variant="default" className="text-xs font-serif font-bold px-2.5 py-0.5">
                                Day {day.day}
                              </Badge>
                              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-accent" />
                                <span>{day.location}</span>
                              </span>
                            </div>

                            {day.meals && (
                              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                <Utensils className="w-3 h-3 text-accent" />
                                <span>{day.meals}</span>
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                            {day.image && (
                              <div className="md:col-span-4 relative h-48 w-full rounded-lg overflow-hidden bg-muted border border-border">
                                <Image src={day.image} alt={day.title} fill className="object-cover" />
                              </div>
                            )}

                            <div className={'space-y-3 ' + (day.image ? 'md:col-span-8' : 'md:col-span-12')}>
                              <h4 className="font-serif text-lg font-bold text-foreground">
                                {day.title}
                              </h4>

                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {day.description}
                              </p>

                              {day.highlights && day.highlights.length > 0 && (
                                <div className="pt-1">
                                  <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/90 block mb-1.5 font-label-caps">
                                    Day Highlights
                                  </span>
                                  <div className="flex flex-wrap gap-2">
                                    {day.highlights.map((h, hIdx) => (
                                      <span
                                        key={hIdx}
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

                          {day.stay && day.stay !== chapter.primaryStay && (
                            <div className="pt-3 border-t border-border/60 flex items-center gap-2 text-xs">
                              <Bed className="w-3.5 h-3.5 text-accent" />
                              <span className="text-muted-foreground">Stay: <strong className="text-foreground">{day.stay}</strong></span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* TRANSIT BRIDGE TO NEXT CHAPTER */}
              {chapter.transitToNext && chapIdx < chapters.length - 1 && (
                <div className="py-4 px-6 flex flex-col items-center select-none">
                  {/* Vertical Line */}
                  <div className="w-0.5 h-4 bg-border" />

                  {/* Transit Bridge Capsule */}
                  <div className="my-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-card border border-border shadow-sm flex items-center justify-center flex-wrap sm:flex-nowrap gap-2 text-xs text-foreground font-medium hover:border-foreground/40 transition-colors max-w-full text-center">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                      {React.createElement(chapter.transitToNext.icon, { className: 'w-3.5 h-3.5' })}
                    </div>
                    <span className="font-bold text-foreground">
                      {chapter.transitToNext.label}
                    </span>
                    <span className="text-muted-foreground hidden sm:inline">•</span>
                    <span className="text-muted-foreground text-[11px]">
                      {chapter.transitToNext.duration}
                      {chapter.transitToNext.route_notes ? ' (' + chapter.transitToNext.route_notes + ')' : ''}
                    </span>
                  </div>

                  {/* Vertical Line */}
                  <div className="w-0.5 h-4 bg-border" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
