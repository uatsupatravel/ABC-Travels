'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tour } from '@/types';
import { Card } from '@/components/ui/Card';
import { CheckCircle2, MessageCircle, PhoneCall, ArrowUpRight } from 'lucide-react';
import ConciergeCallbackModal from './ConciergeCallbackModal';

interface TourConciergeCardProps {
  tour: Tour;
}

export default function TourConciergeCard({ tour }: TourConciergeCardProps) {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  const WHATSAPP_NUMBER = '918700406415';
  const whatsappMessage = `Hello ABC Travels Concierge, I am inquiring about the "${tour.title}" journey.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Card className="sticky top-24 p-6 space-y-5 bg-card border-border shadow-xs">
        {/* Header */}
        <div className="pb-3 border-b border-border">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-accent block mb-1">
            Private Tailored Journey
          </span>
          <h3 className="font-serif text-lg font-bold text-foreground">
            Crafted Exclusively For You
          </h3>
        </div>

        {/* 3 Luxury Journey Pillars */}
        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold text-foreground block">100% Tailored Itinerary</span>
              <span className="text-muted-foreground leading-relaxed block text-[11px]">
                Flexible pacing, travel dates, and palace suite choices.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold text-foreground block">Private Chauffeur & Transfers</span>
              <span className="text-muted-foreground leading-relaxed block text-[11px]">
                Dedicated luxury vehicle, domestic flights, and boat transfers.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold text-foreground block">24/7 On-Ground Concierge</span>
              <span className="text-muted-foreground leading-relaxed block text-[11px]">
                Direct private host access from arrival to departure.
              </span>
            </div>
          </div>
        </div>

        {/* Primary Action: Start Custom Itinerary */}
        <Link
          href={`/plan-your-trip?tour=${encodeURIComponent(tour.title)}`}
          className="w-full py-3.5 px-4 rounded-lg bg-foreground hover:bg-accent text-background hover:text-accent-foreground font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer text-center"
        >
          <span>Start Custom Itinerary</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {/* DIRECT ACTIONS: WHATSAPP & CALLBACK SIDE-BY-SIDE */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* 1. Direct Instant WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer text-center"
            title="Chat Instantly on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white shrink-0" />
            <span>WhatsApp</span>
          </a>

          {/* 2. Direct Request Callback Button */}
          <button
            onClick={() => setIsCallbackOpen(true)}
            className="py-3 px-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] border border-primary/20 cursor-pointer text-center"
            title="Request a Private Callback"
          >
            <PhoneCall className="w-4 h-4 shrink-0" />
            <span>Callback</span>
          </button>
        </div>

        {/* Clean Experiential Footer */}
        <div className="pt-3 border-t border-border/60 text-center space-y-0.5">
          <span className="text-xs text-foreground font-medium block">
            Tailored to your dates, rhythm & celebrations
          </span>
          <span className="text-[11px] text-muted-foreground block">
            We will connect with you within 24 hours
          </span>
        </div>
      </Card>

      {/* Concierge Callback Modal */}
      <ConciergeCallbackModal
        tour={tour}
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
      />
    </>
  );
}
