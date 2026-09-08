'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Tour, ItineraryDay, TransitType } from '@/types';
import {
  Car,
  Plane,
  Ship,
  Train,
  Footprints,
  Bed,
  Play,
  Pause,
  X,
  Compass,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface VisualStoryModalProps {
  tour: Tour;
  isOpen: boolean;
  onClose: () => void;
  initialDayIdx?: number;
}

const SLIDE_DURATION_MS = 5500; // 5.5 seconds per slide
const TICK_MS = 25; // 40fps smooth tick

export default function VisualStoryModal({
  tour,
  isOpen,
  onClose,
  initialDayIdx = 0,
}: VisualStoryModalProps) {
  const [mounted, setMounted] = useState(false);
  const itinerary: ItineraryDay[] = tour.itinerary || [];
  const [currentIdx, setCurrentIdx] = useState<number>(initialDayIdx);
  const [progressMs, setProgressMs] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isHolding, setIsHolding] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset states on open and lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentIdx(Math.min(initialDayIdx, itinerary.length - 1));
      setProgressMs(0);
      setIsPaused(false);
      setIsHolding(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialDayIdx, itinerary.length]);

  const currentDay = itinerary[currentIdx] || itinerary[0];

  const handleNext = useCallback(() => {
    setProgressMs(0);
    setCurrentIdx((prev) => {
      if (prev < itinerary.length - 1) {
        return prev + 1;
      } else {
        return 0;
      }
    });
  }, [itinerary.length]);

  const handlePrev = useCallback(() => {
    setProgressMs(0);
    setCurrentIdx((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleJumpToDay = useCallback((idx: number) => {
    setProgressMs(0);
    setCurrentIdx(idx);
  }, []);

  // Frame-accurate progress timer engine
  useEffect(() => {
    if (!isOpen || isPaused || isHolding || itinerary.length === 0) return;

    const timer = setInterval(() => {
      setProgressMs((prev) => {
        if (prev + TICK_MS >= SLIDE_DURATION_MS) {
          handleNext();
          return 0;
        }
        return prev + TICK_MS;
      });
    }, TICK_MS);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, isHolding, itinerary.length, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Transport details helper
  const getTransport = (idx: number) => {
    const curr = itinerary[idx];
    if (!curr) return { isIntercity: false, label: 'Palace Leisure', time: 'Palace Stay', icon: Bed };

    if (idx >= itinerary.length - 1) {
      return { isIntercity: false, label: 'VIP Departure', time: 'VIP Airport Transfer', icon: Plane };
    }

    if (curr.transit) {
      if (curr.transit.type === 'none') {
        return { isIntercity: false, label: 'Palace Leisure', time: 'Palace Stay & City Excursions', icon: Footprints };
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
    if (next && curr.location === next.location) {
      return { isIntercity: false, label: 'City Exploration', time: 'City Exploration & Palace Leisure', icon: Footprints };
    }
    return { isIntercity: true, label: 'Private Chauffeur', time: '3.5 - 4.5 hrs', icon: Car };
  };

  if (!isOpen || !mounted || itinerary.length === 0 || !currentDay) return null;

  const transport = getTransport(currentIdx);
  const TransIcon = transport.icon;

  const modalContent = (
    <div className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-0 sm:p-4 select-none animate-fadeIn">
      {/* Desktop Floating Previous Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        disabled={currentIdx === 0}
        className="hidden md:flex absolute left-8 lg:left-16 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white items-center justify-center backdrop-blur-md transition-all border border-white/15 hover:scale-110 active:scale-95 cursor-pointer"
        title="Previous Day (Left Arrow)"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Desktop Floating Next Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="hidden md:flex absolute right-8 lg:right-16 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center backdrop-blur-md transition-all border border-white/15 hover:scale-110 active:scale-95 cursor-pointer"
        title="Next Day (Right Arrow)"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main 9:16 Story Card Container */}
      <div
        className="relative w-full max-w-[440px] h-full sm:h-[88vh] sm:max-h-[850px] bg-zinc-950 sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-white/15"
        onMouseDown={() => setIsHolding(true)}
        onMouseUp={() => setIsHolding(false)}
        onTouchStart={() => setIsHolding(true)}
        onTouchEnd={() => setIsHolding(false)}
      >
        {/* Background Image with Ambient Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            key={currentIdx}
            src={
              currentDay.image ||
              tour.hero_image ||
              '/images/destinations/rajasthan/hero.jpg'
            }
            alt={currentDay.title}
            fill
            priority
            className="object-cover animate-kenburns transition-all duration-700"
          />
          {/* Subtle Multi-Stop Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        </div>

        {/* Top Header: Story Segment Bars & Controls */}
        <div className="relative z-30 p-4 sm:p-5 space-y-3.5">
          {/* Synchronized Clickable Progress Segments */}
          <div className="flex items-center gap-1.5 w-full">
            {itinerary.map((_, idx) => {
              let fillPercent = 0;
              if (idx < currentIdx) {
                fillPercent = 100;
              } else if (idx === currentIdx) {
                fillPercent = (progressMs / SLIDE_DURATION_MS) * 100;
              }

              return (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJumpToDay(idx);
                  }}
                  className="flex-1 h-1.5 bg-white/25 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all"
                  title={'Jump to Day ' + (idx + 1)}
                >
                  <div
                    className="h-full bg-white transition-[width] duration-75 ease-linear rounded-full"
                    style={{ width: fillPercent + '%' }}
                  />
                </div>
              );
            })}
          </div>

          {/* Header Title & Controls Bar */}
          <div className="flex items-center justify-between text-white gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-serif text-sm font-bold tracking-wide truncate">
                {tour.title}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused(!isPaused);
                }}
                className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer"
                title={isPaused ? 'Resume (Space)' : 'Pause (Space)'}
              >
                {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Screen Tap Zones (Left 40% = Prev, Right 60% = Next) */}
        <div className="relative z-20 flex-1 grid grid-cols-2">
          <div
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="cursor-pointer"
            title="Previous Day"
          />
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="cursor-pointer"
            title="Next Day"
          />
        </div>

        {/* Bottom Content Card (Clean & Focused on Story Content) */}
        <div className="relative z-30 p-5 sm:p-6 space-y-3.5 text-white">
          {/* Day & Transit Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-white border border-white/10">
              Day {currentDay.day} of {itinerary.length} • {currentDay.location}
            </span>

            {transport.isIntercity && (
              <span className="bg-accent/30 text-amber-200 border border-amber-300/20 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5">
                <TransIcon className="w-3.5 h-3.5" />
                <span>{transport.time}</span>
              </span>
            )}
          </div>

          {/* Day Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug drop-shadow-md text-white">
            {currentDay.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-zinc-200 leading-relaxed line-clamp-3 drop-shadow">
            {currentDay.description}
          </p>

          {/* Palace Accommodation */}
          {currentDay.stay && (
            <div className="p-3 rounded-lg bg-black/50 border border-white/10 flex items-center gap-2.5 text-xs text-amber-200 backdrop-blur-md">
              <Bed className="w-4 h-4 shrink-0 text-amber-300" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-semibold">
                  Palace Stay
                </span>
                <span className="font-semibold text-zinc-100 truncate block">
                  {currentDay.stay}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
