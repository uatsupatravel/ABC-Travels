import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl space-y-3">
          <Badge variant="secondary" className="text-xs uppercase tracking-widest">
            Our Purpose & Heritage
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Tailormade Inbound Luxury Travel Across India
          </h1>
          <p className="text-muted-foreground text-xs sm:text-base leading-relaxed">
            Founded with a singular vision: to unlock the aristocratic heritage, untamed biodiversity, and ancient traditions of India with unprecedented intimacy, elegance, and ease.
          </p>
        </div>
      </section>

      {/* Editorial Story Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 sm:h-[480px] rounded-lg overflow-hidden border border-border">
            <Image
              src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
              alt="Rajasthan Lake Palace Story"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-5">
            <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground block">
              The ABC Travels Philosophy
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
              Beyond Commercial Tourism: Genuine Royal Hospitality
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              India is a land of staggering contrasts and infinite layers. For the discerning international voyager, navigating these wonders should never feel overwhelming.
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              At ABC Travels, we curate journeys that feel like personal aristocratic invitations. From the moment you clear VIP immigration at New Delhi to the silent dawn rows on the sacred Ganges and private dinners in Jaipur havelis, every detail is orchestrated with white-glove precision.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border text-xs">
              <div className="space-y-0.5">
                <span className="font-serif text-2xl font-bold text-foreground block">100%</span>
                <span className="text-muted-foreground">Tailormade Departures</span>
              </div>
              <div className="space-y-0.5">
                <span className="font-serif text-2xl font-bold text-foreground block">5-Star</span>
                <span className="text-muted-foreground">Heritage Luxury Partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of Excellence */}
      <section className="bg-muted/30 py-20 border-y border-border mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12 space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Our 4 Pillars of Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 space-y-2">
              <span className="font-mono text-xs font-bold text-muted-foreground block">01 / ACCESS</span>
              <h3 className="font-serif font-bold text-base text-foreground">Royal Access</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Private living quarter high-teas, after-hours monument visits, and chartered royal barges.
              </p>
            </Card>

            <Card className="p-6 space-y-2">
              <span className="font-mono text-xs font-bold text-muted-foreground block">02 / SECURITY</span>
              <h3 className="font-serif font-bold text-base text-foreground">Seamless Care</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pre-vetted luxury transport, sanitized 5-star kitchens, and 24/7 dedicated local managers.
              </p>
            </Card>

            <Card className="p-6 space-y-2">
              <span className="font-mono text-xs font-bold text-muted-foreground block">03 / SCHOLARS</span>
              <h3 className="font-serif font-bold text-base text-foreground">Academic Historians</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every guide is an accredited scholar, architect, or master wildlife tracker.
              </p>
            </Card>

            <Card className="p-6 space-y-2">
              <span className="font-mono text-xs font-bold text-muted-foreground block">04 / ETHICS</span>
              <h3 className="font-serif font-bold text-base text-foreground">Sustainable Luxury</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Direct patron support for artisan weavers, tiger habitat conservation, and local communities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-5">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Ready to Curate Your India Itinerary?
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
          Contact our Senior Concierge Desk for a private consultation.
        </p>
        <div className="flex items-center justify-center gap-3 pt-1">
          <Link href="/plan-your-trip">
            <Button size="sm" className="text-xs uppercase tracking-wider font-semibold">
              Launch Itinerary Planner
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="sm" className="text-xs uppercase tracking-wider font-semibold">
              Contact Concierge Desk
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
