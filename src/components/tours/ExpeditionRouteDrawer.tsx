'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Tour } from '@/types';
import InteractiveRouteMap from './InteractiveRouteMap';
import { Compass, X, MapPin, Navigation, ArrowLeft } from 'lucide-react';

interface ExpeditionRouteDrawerProps {
  tour: Tour;
}

export default function ExpeditionRouteDrawer({ tour }: ExpeditionRouteDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcut (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[99999] flex items-center justify-end">
      {/* Dark Blur Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      />

      {/* Slide-Out Drawer Panel (Slides in from Right on desktop) */}
      <div
        className="relative z-10 w-full lg:w-[88vw] xl:w-[82vw] max-w-6xl max-h-[92vh] overflow-y-auto bg-background/95 border border-border/80 shadow-2xl rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl my-auto lg:my-0 lg:mr-0 transition-transform duration-500 animate-in slide-in-from-bottom lg:slide-in-from-right p-4 sm:p-6 lg:p-7 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header Bar */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent block">
                Expedition Logistics & Cartography
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground truncate max-w-[280px] sm:max-w-md">
                {tour.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/60 flex items-center gap-1.5 text-xs font-semibold px-3"
              title="Close Drawer (Esc)"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Map Explorer Content */}
        <div className="w-full">
          <InteractiveRouteMap tour={tour} />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* 1. DESKTOP VERTICAL HANGING DOCK TAB (Right Viewport Edge - Visible on lg+) */}
      <aside aria-label="Expedition Route Drawer" className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-[#0e1420]/90 hover:bg-[#0e1420] text-amber-200/90 hover:text-amber-100 border-y border-l border-amber-500/30 hover:border-amber-400/60 shadow-xl backdrop-blur-md rounded-l-xl px-2.5 py-4 transition-all duration-300 hover:-translate-x-1 hover:shadow-amber-500/10 cursor-pointer"
          style={{ writingMode: 'vertical-rl' }}
          title="Open Interactive Route Map & Logistics"
        >
          {/* Compass Icon */}
          <div className="rotate-90 text-amber-300 group-hover:scale-110 transition-transform my-1">
            <Compass className="w-4 h-4" />
          </div>

          {/* Vertical Label */}
          <span className="text-[11px] font-bold tracking-widest uppercase font-serif rotate-180">
            Route & Logistics Map
          </span>
        </button>
      </aside>

      {/* 2. MOBILE & TABLET FLOATING ACTION PILL (Bottom Viewport - Visible on <lg) */}
      <aside aria-label="Mobile Expedition Route Trigger" className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#0e1420]/95 hover:bg-[#0e1420] text-amber-200 border border-amber-500/40 shadow-2xl backdrop-blur-lg px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all active:scale-95 cursor-pointer"
        >
          <Compass className="w-4 h-4 text-amber-300" />
          <span>View Route & Map</span>
        </button>
      </aside>

      {/* Render Portal Modal Drawer */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
