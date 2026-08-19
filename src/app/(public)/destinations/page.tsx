import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDestinations } from '@/lib/data-service';
import { ArrowRight, Calendar, Sun } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12 space-y-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
          Subcontinent Exploration
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Destinations of India
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          From the royal sandstone forts of Rajasthan and serene backwaters of Kerala to the celestial heights of Ladakh. Explore in-depth destination guides and seasonal best times to visit.
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <Card
            key={dest.id}
            className="group overflow-hidden flex flex-col justify-between hover:border-foreground/30 transition-colors duration-200"
          >
            {/* Image */}
            <div className="relative h-60 w-full overflow-hidden bg-muted">
              <Image
                src={dest.hero_image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm text-white border-0 text-[10px]">
                  {dest.region}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-serif text-xl font-bold">{dest.name}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2.5">
                <p className="text-muted-foreground text-xs italic">
                  &ldquo;{dest.tagline}&rdquo;
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                  {dest.description}
                </p>

                {/* Best time & weather info */}
                <div className="pt-2 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span>Best Season: {dest.best_time_to_visit.split('(')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span>Climate: {dest.weather_info}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-border">
                <Link href={`/destinations/${dest.slug}`}>
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 font-semibold">
                    <span>Explore {dest.name} Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
