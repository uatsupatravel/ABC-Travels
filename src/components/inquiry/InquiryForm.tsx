'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema, InquiryFormValues } from '@/lib/validators/inquiry';
import { createInquiry } from '@/lib/data-service';
import { CheckCircle2, Loader2, Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface InquiryFormProps {
  tourId?: string;
  tourTitle?: string;
  defaultDuration?: number;
  onSuccess?: () => void;
  isCompact?: boolean;
}

export default function InquiryForm({
  tourId,
  tourTitle,
  defaultDuration = 7,
  onSuccess,
  isCompact = false,
}: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      tour_id: tourId || '',
      tour_title: tourTitle || (tourId ? '' : 'Custom Tailormade Journey'),
      departure_date: '',
      duration_days: defaultDuration,
      guests_count: 2,
      budget_tier: 'Premium Luxury ($3k-$5k)',
      travel_styles: [],
      special_requests: '',
    },
  });

  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true);
    try {
      await createInquiry({
        tour_id: tourId,
        tour_title: tourTitle || data.tour_title || 'Custom India Journey',
        traveler_name: data.traveler_name,
        email: data.email,
        phone: data.phone,
        country: data.country,
        departure_date: data.departure_date,
        duration_days: Number(data.duration_days),
        guests_count: Number(data.guests_count),
        budget_tier: data.budget_tier,
        travel_styles: data.travel_styles,
        special_requests: data.special_requests,
      });

      setIsSuccess(true);
      reset();
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center border border-border space-y-4 animate-fadeIn">
        <div className="w-12 h-12 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center mx-auto text-primary-foreground">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-xl font-bold">Trip Inquiry Received</h3>
        <p className="text-primary-foreground/80 text-xs leading-relaxed max-w-md mx-auto">
          Thank you. Your dedicated Senior Concierge at ABC Travels has received your trip parameters and is crafting your customized itinerary proposal. We will contact you within 12 hours.
        </p>
        
        <div className="bg-primary-foreground/5 rounded-md p-3 border border-primary-foreground/10 max-w-sm mx-auto text-xs space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-semibold">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Need immediate priority assistance?</span>
          </div>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-accent font-bold hover:underline"
          >
            Chat directly on WhatsApp VIP Concierge
          </a>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsSuccess(false)}
          className="text-xs uppercase tracking-wider font-semibold"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      {tourTitle && (
        <div className="bg-muted/60 border border-border p-3 rounded-md flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-accent shrink-0" />
          <div className="text-xs">
            <span className="text-muted-foreground font-medium block uppercase tracking-wider text-[10px]">Inquiring for Journey:</span>
            <span className="font-serif font-bold text-foreground line-clamp-1">{tourTitle}</span>
          </div>
        </div>
      )}

      {/* Name & Email */}
      <div className={`grid grid-cols-1 ${isCompact ? '' : 'sm:grid-cols-2'} gap-4`}>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Full Name *
          </label>
          <Input
            type="text"
            placeholder="e.g. Lord Henry Kensington"
            {...register('traveler_name')}
          />
          {errors.traveler_name && (
            <p className="text-red-500 text-[11px] mt-1">{errors.traveler_name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Email Address *
          </label>
          <Input
            type="email"
            placeholder="e.g. henry@domain.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-[11px] mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone & Country */}
      <div className={`grid grid-cols-1 ${isCompact ? '' : 'sm:grid-cols-2'} gap-4`}>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Phone / WhatsApp *
          </label>
          <Input
            type="tel"
            placeholder="e.g. +44 7700 900123"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-red-500 text-[11px] mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Country of Residence *
          </label>
          <Input
            type="text"
            placeholder="e.g. United Kingdom, USA"
            {...register('country')}
          />
          {errors.country && (
            <p className="text-red-500 text-[11px] mt-1">{errors.country.message}</p>
          )}
        </div>
      </div>

      {/* Travel Date, Duration, Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Estimated Date *
          </label>
          <Input
            type="date"
            {...register('departure_date')}
            className="text-xs"
          />
          {errors.departure_date && (
            <p className="text-red-500 text-[11px] mt-1">{errors.departure_date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Duration (Days)
          </label>
          <Input
            type="number"
            min={3}
            max={60}
            {...register('duration_days')}
            className="text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Travelers
          </label>
          <select
            {...register('guests_count')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-200"
          >
            <option value={1}>1 Solo Explorer</option>
            <option value={2}>2 Travelers (Couple/Pair)</option>
            <option value={3}>3-4 Small Family / Group</option>
            <option value={5}>5-8 Private Group</option>
            <option value={9}>9+ Delegation</option>
          </select>
        </div>
      </div>

      {/* Budget Tier */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Experience & Accommodation Tier
        </label>
        <select
          {...register('budget_tier')}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-200"
        >
          <option value="Premium Luxury ($3k-$5k)">
            Premium Luxury (5-Star Heritage, Private Chauffeur, Dedicated Historians)
          </option>
          <option value="Ultra Luxury ($5k-$10k+)">
            Ultra Luxury (Oberoi / Taj Lake Palace Suites, Private Charters, VIP Concierge)
          </option>
          <option value="Custom Tailormade">
            Tailormade Custom Budget / Open Plan
          </option>
        </select>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Special Requests or Preferences
        </label>
        <Textarea
          rows={3}
          placeholder="Tell us about any specific interests (e.g. photography, royal history, dietary requirements, anniversary celebrations)..."
          {...register('special_requests')}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 text-xs font-semibold uppercase tracking-wider gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing Proposal Request...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Request Custom Proposal & Quote</span>
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />
        <span>100% Confidential • No Obligation • Senior Concierge Care</span>
      </div>
    </form>
  );
}
