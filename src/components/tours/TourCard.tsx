'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tour } from '@/types';
import { Clock, MapPin, ArrowRight, Shield } from 'lucide-react';
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
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-label-caps text-[10px] tracking-widest text-slate-taupe uppercase">
            <Shield className="w-3 h-3" />
            <span>{tour.group_type} • {tour.activity_level}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-ink-black font-semibold leading-snug group-hover:text-bronze-hover transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
            <Link href={`/tours/${tour.slug}`}>
              {tour.title}
            </Link>
          </h3>

          <p className="font-body-base text-body-base text-slate-taupe line-clamp-2 sm:line-clamp-3 leading-relaxed">
            {tour.subtitle}
          </p>

          {/* Highlights Preview */}
          <div className="space-y-1.5 pt-1">
            {tour.highlights.slice(0, 2).map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 font-body-base text-xs sm:text-sm text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze-hover mt-1.5 shrink-0" />
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer (Bespoke Private Journeys) */}
        <div className="pt-4 border-t border-silk-border mt-auto">
          <div className="grid grid-cols-2 gap-2.5">
            {onContactSpecialist && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onContactSpecialist(tour)}
                className="w-full text-xs h-10 border-silk-border hover:bg-cream-container font-medium"
              >
                Inquire
              </Button>
            )}
            <Link
              href={`/tours/${tour.slug}`}
              className={onContactSpecialist ? 'w-full' : 'col-span-2 w-full'}
            >
              <Button
                size="sm"
                variant="default"
                className="w-full gap-1.5 text-xs h-10 shadow-xs font-medium"
              >
                <span>View Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
