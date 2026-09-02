'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tour } from '@/types';
import { Clock, MapPin, ArrowRight, Shield } from 'lucide-react';
import { formatUSD, formatINR } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface TourCardProps {
  tour: Tour;
  onContactSpecialist?: (tour: Tour) => void;
}

export default function TourCard({ tour, onContactSpecialist }: TourCardProps) {
  return (
    <article className="card-monograph group bg-surface-container-lowest border border-silk-border rounded-lg overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-72 w-full media-container bg-surface-dim">
        <Image
          src={tour.hero_image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="media-reveal object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/70 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Badge variant="default">
            {tour.travel_style}
          </Badge>
          {tour.is_featured && (
            <Badge variant="accent">
              Signature
            </Badge>
          )}
        </div>

        {/* Bottom Image Info */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-alabaster-cream font-label-caps text-[11px] tracking-wider">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 opacity-80" />
            <span>{tour.duration_days} Days / {tour.duration_nights} Nights</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 opacity-80" />
            <span>{tour.destination_name || 'India'}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-label-caps text-[10px] tracking-widest text-slate-taupe uppercase">
            <Shield className="w-3 h-3" />
            <span>{tour.group_type} • {tour.activity_level}</span>
          </div>

          <h3 className="font-headline-lg text-headline-lg text-ink-black leading-snug group-hover:text-bronze-hover transition-colors duration-300 line-clamp-2">
            <Link href={`/tours/${tour.slug}`}>
              {tour.title}
            </Link>
          </h3>

          <p className="font-body-base text-body-base text-slate-taupe line-clamp-3">
            {tour.subtitle}
          </p>

          {/* Highlights Preview */}
          <div className="space-y-1.5 pt-1">
            {tour.highlights.slice(0, 2).map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 font-body-base text-sm text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze-hover mt-1.5 shrink-0" />
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA Footer */}
        <div className="pt-6 border-t border-silk-border flex items-center justify-between mt-auto">
          <div>
            <span className="block font-label-caps text-[10px] tracking-widest text-slate-taupe uppercase">
              From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-body-base font-medium text-ink-black">
                {formatUSD(tour.price_usd)}
              </span>
              <span className="text-sm text-slate-taupe">/ person</span>
            </div>
            <span className="text-[10px] text-slate-taupe block">
              approx. {formatINR(tour.price_inr)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onContactSpecialist && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onContactSpecialist(tour)}
              >
                Speak to a Specialist
              </Button>
            )}
            <Link href={`/tours/${tour.slug}`}>
              <Button size="sm" variant="default" className="gap-1.5">
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
