'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDestinations } from '@/lib/data-service';
import { Destination } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, ExternalLink } from 'lucide-react';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    getDestinations().then(setDestinations);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          Destination Guides CMS
        </h1>
        <p className="text-muted-foreground text-xs mt-1">
          Manage regional destination articles, best times to visit, and linked experiences.
        </p>
      </div>

      {/* Destinations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <Card
            key={dest.id}
            className="overflow-hidden flex flex-col justify-between"
          >
            <div className="relative h-40 w-full bg-muted">
              <Image
                src={dest.hero_image}
                alt={dest.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5">
                <Badge variant="secondary" className="bg-black/60 text-white border-0 text-[10px]">
                  {dest.region}
                </Badge>
              </div>
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <h3 className="font-serif text-base font-bold">{dest.name}</h3>
              </div>
            </div>

            <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
              <div className="space-y-1.5">
                <p className="text-muted-foreground text-xs italic line-clamp-1">
                  &ldquo;{dest.tagline}&rdquo;
                </p>
                <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{dest.ideal_duration} • {dest.best_time_to_visit.split('(')[0]}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex justify-end">
                <Link href={`/destinations/${dest.slug}`} target="_blank">
                  <Button variant="outline" size="sm" className="text-xs h-8 gap-1">
                    <span>Preview Guide</span>
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
