'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTours } from '@/lib/data-service';
import { Tour } from '@/types';
import { formatUSD, formatINR } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ExternalLink } from 'lucide-react';

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    getTours().then(setTours);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          Tour Packages Catalog CMS
        </h1>
        <p className="text-muted-foreground text-xs mt-1">
          Review live packages, duration, pricing in USD/INR, and daily itinerary structures.
        </p>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card
            key={tour.id}
            className="overflow-hidden flex flex-col justify-between"
          >
            <div className="relative h-44 w-full bg-muted">
              <Image
                src={tour.hero_image}
                alt={tour.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5">
                <Badge variant="secondary" className="bg-black/60 text-white border-0 text-[10px]">
                  {tour.travel_style}
                </Badge>
              </div>
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-xs flex items-center justify-between">
                <span>{tour.duration_days} Days / {tour.duration_nights} Nights</span>
                <span>{tour.destination_name}</span>
              </div>
            </div>

            <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-bold text-foreground line-clamp-1 mb-1">
                  {tour.title}
                </h3>
                <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                  {tour.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block">Starting From</span>
                  <span className="font-serif font-bold text-foreground text-base">
                    {formatUSD(tour.price_usd)}
                  </span>
                  <span className="text-[10px] text-muted-foreground block">
                    ({formatINR(tour.price_inr)})
                  </span>
                </div>

                <Link href={`/tours/${tour.slug}`} target="_blank">
                  <Button variant="outline" size="sm" className="text-xs h-8 gap-1">
                    <span>Preview</span>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
