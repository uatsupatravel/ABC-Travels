'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tour } from '@/types';
import { Clock, MapPin, ArrowRight, Shield } from 'lucide-react';
import { formatUSD, formatINR } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface TourCardProps {
  tour: Tour;
  onQuickInquire?: (tour: Tour) => void;
}

export default function TourCard({ tour, onQuickInquire }: TourCardProps) {
  return (
    <Card className="group overflow-hidden flex flex-col h-full hover:border-foreground/30 transition-colors duration-200">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-muted">
        <Image
          src={tour.hero_image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm text-white border-0 text-[11px]">
            {tour.travel_style}
          </Badge>
          {tour.is_featured && (
            <Badge variant="accent" className="bg-accent text-accent-foreground text-[11px]">
              Signature
            </Badge>
          )}
        </div>

        {/* Bottom Image Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 opacity-80" />
            <span>{tour.duration_days} Days / {tour.duration_nights} Nights</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 opacity-80" />
            <span>{tour.destination_name || 'India'}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="w-3 h-3" />
            <span>{tour.group_type} • {tour.activity_level}</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
            <Link href={`/tours/${tour.slug}`}>
              {tour.title}
            </Link>
          </h3>

          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
            {tour.subtitle}
          </p>

          {/* Highlights Preview */}
          <div className="space-y-1 pt-1">
            {tour.highlights.slice(0, 2).map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-foreground/80">
                <span className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
              From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-lg font-bold text-foreground">
                {formatUSD(tour.price_usd)}
              </span>
              <span className="text-[11px] text-muted-foreground">/ person</span>
            </div>
            <span className="text-[10px] text-muted-foreground block">
              approx. {formatINR(tour.price_inr)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onQuickInquire && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onQuickInquire(tour)}
                className="text-xs"
              >
                Inquire
              </Button>
            )}
            <Link href={`/tours/${tour.slug}`}>
              <Button size="sm" variant="default" className="text-xs gap-1">
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
