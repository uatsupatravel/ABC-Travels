import React from 'react';
import InquiryForm from '@/components/inquiry/InquiryForm';
import { Mail, Phone, MapPin, PhoneCall } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12 space-y-2">
        <Badge variant="secondary" className="text-xs uppercase tracking-widest">
          Global Concierge
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Contact ABC Travels Concierge Desk
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Whether you have specific departure dates in mind or seek guidance on seasons in Rajasthan, Kerala, or Ladakh, our Senior Concierge is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          {/* Direct Concierge Box */}
          <Card className="bg-primary text-primary-foreground p-6 space-y-4 border-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center text-primary-foreground">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold">24/7 VIP Concierge</h3>
                <span className="text-[11px] opacity-80 font-medium">WhatsApp Priority Desk</span>
              </div>
            </div>

            <p className="text-xs opacity-80 leading-relaxed">
              International travelers can reach our executive team directly on WhatsApp for immediate trip consultation.
            </p>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs font-semibold uppercase tracking-wider"
              >
                Chat on WhatsApp: +91 98765 43210
              </Button>
            </a>
          </Card>

          {/* Regional Offices */}
          <Card className="p-6 space-y-5 text-xs text-muted-foreground">
            <h3 className="font-serif text-base font-bold text-foreground border-b border-border pb-2">
              Offices in India
            </h3>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>New Delhi Headquarters</span>
              </div>
              <p className="pl-5 text-muted-foreground">
                Janpath, Connaught Place, New Delhi 110001
              </p>
              <p className="pl-5 text-muted-foreground">
                Direct: +91 (0) 11 4567 8900
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-border">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>South India Concierge (Kerala)</span>
              </div>
              <p className="pl-5 text-muted-foreground">
                Calvathy Road, Fort Kochi, Kerala 682001
              </p>
              <p className="pl-5 text-muted-foreground">
                Direct: +91 (0) 484 221 4500
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-border">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                <Mail className="w-3.5 h-3.5" />
                <span>Email Enquiries</span>
              </div>
              <p className="pl-5 text-foreground font-semibold">
                concierge@abctravels.com
              </p>
            </div>
          </Card>
        </div>

        {/* General Inquiry Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground block mb-1">
                Travel Inquiry
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Send an Inquiry to Our Travel Designers
              </h2>
            </div>

            <InquiryForm />
          </Card>
        </div>
      </div>
    </div>
  );
}
