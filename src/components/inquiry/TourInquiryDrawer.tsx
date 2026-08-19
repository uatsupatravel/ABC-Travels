'use client';

import React from 'react';
import { Tour } from '@/types';
import InquiryForm from './InquiryForm';
import { X, Compass } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface TourInquiryDrawerProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TourInquiryDrawer({ tour, isOpen, onClose }: TourInquiryDrawerProps) {
  if (!isOpen || !tour) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <Card
          className="relative bg-card text-card-foreground rounded-lg max-w-2xl w-full p-6 sm:p-8 text-left shadow-xl border-border my-8 animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-muted text-foreground">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Private Trip Inquiry
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  ABC Travels Concierge
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <InquiryForm
            tourId={tour.id}
            tourTitle={tour.title}
            defaultDuration={tour.duration_days}
            onSuccess={onClose}
          />
        </Card>
      </div>
    </div>
  );
}
