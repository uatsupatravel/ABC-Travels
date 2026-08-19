'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { inquirySchema, InquiryFormValues } from '@/lib/validators/inquiry';
import { createInquiry } from '@/lib/data-service';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { COUNTRIES, CountryOption } from '@/lib/constants/countries';

const POPULAR_DESTINATIONS = [
  'Rajasthan (Jaipur & Udaipur)',
  'Golden Triangle & Taj Mahal',
  'Kerala Backwaters & Munnar',
  'Ladakh & Himalayas',
  'Ranthambore Tiger Safari',
  'Varanasi & Sacred Ganges',
  'Goa Heritage Coast',
  'Custom Multi-City Route',
];

const GROUP_OPTIONS = [
  { id: 'Solo', title: 'Solo Explorer', subtitle: '1 traveler', defaultGuests: 1 },
  { id: 'Couple', title: 'Couple / Duo', subtitle: '2 travelers', defaultGuests: 2 },
  { id: 'Family', title: 'Family', subtitle: '3 to 5 travelers', defaultGuests: 4 },
  { id: 'Friends', title: 'Friends / Group', subtitle: '4+ travelers', defaultGuests: 6 },
];

const VIBE_PILLS = [
  'Adventure',
  'Relax',
  'Culture',
  'Luxury',
  'Nightlife',
  'Nature',
  'Culinary',
  'Wellness',
];

const DURATION_RANGES = [
  { id: 'short', min: 3, max: 5, defaultDays: 5, label: '3 – 5 Days', note: 'Short Escape' },
  { id: 'week', min: 6, max: 9, defaultDays: 8, label: '6 – 9 Days', note: '1 Week Signature' },
  { id: 'grand', min: 10, max: 13, defaultDays: 12, label: '10 – 13 Days', note: 'Grand Discovery' },
  { id: 'comprehensive', min: 14, max: 60, defaultDays: 16, label: '14+ Days', note: 'Comprehensive' },
];

const FLEXIBLE_SEASONS = [
  'October 2026 (Royal Rajasthan Season Starts)',
  'November 2026 (Pleasant Pan-India Weather)',
  'December 2026 (Holiday & Festival Season)',
  'January 2027 (Peak Winter & Heritage Fairs)',
  'February 2027 (Prime Tiger Safari Season)',
  'March 2027 (Spring & Colors of Holi)',
  'April – June 2027 (High Himalayas & Ladakh)',
  'Summer / Autumn 2027',
];

const BUDGET_TIERS = [
  {
    id: '$ Budget',
    label: '$ Budget',
    title: 'Comfort Heritage',
    desc: '4-star boutique havelis, private sedan transfers, local heritage guides.',
  },
  {
    id: '$$ Moderate',
    label: '$$ Moderate',
    title: 'Premium 5-Star',
    desc: 'Oberoi & Taj 5-star properties, executive SUV fleet, senior historians.',
  },
  {
    id: '$$$ Luxury',
    label: '$$$ Luxury',
    title: 'Ultra-Luxury & Palaces',
    desc: 'Original royal palace suites, private charters, 24/7 dedicated concierge.',
  },
];

const CONTACT_METHODS = [
  {
    id: 'WhatsApp',
    label: 'WhatsApp',
    desc: 'Fastest response with PDF proposal on mobile',
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: 'Email',
    label: 'Email',
    desc: 'Detailed itinerary documentation & quote',
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 'Phone Call',
    label: 'Phone Call',
    desc: 'Direct consultation with Senior Travel Designer',
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

export default function PlanYourTripPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Date Mode: 'exact' vs 'flexible' (default: 'exact')
  const [dateMode, setDateMode] = useState<'flexible' | 'exact'>('exact');
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Country & Dial Code state
  const [selectedCountryObj, setSelectedCountryObj] = useState<CountryOption>(COUNTRIES[0]);
  const [selectedDialCode, setSelectedDialCode] = useState<string>(COUNTRIES[0].dialCode);
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      tour_title: '',
      group_type: 'Couple',
      guests_count: 2,
      travel_styles: ['Luxury', 'Culture'],
      departure_date: '',
      duration_days: 8,
      budget_tier: '$$ Moderate',
      preferred_contact: 'WhatsApp',
      traveler_name: '',
      email: '',
      phone: '',
      country: 'United States',
      special_requests: '',
    },
  });

  const selectedDestination = watch('tour_title');
  const selectedGroup = watch('group_type');
  const selectedStyles = watch('travel_styles') || [];
  const selectedDurationDays = watch('duration_days') || 8;
  const selectedBudget = watch('budget_tier');
  const selectedContactMethod = watch('preferred_contact');
  const selectedDepartureDate = watch('departure_date');

  // Dynamic active duration category sync based on number range
  const activeDurationCategory = useMemo(() => {
    const days = Number(selectedDurationDays) || 8;
    const found = DURATION_RANGES.find((r) => days >= r.min && days <= r.max);
    return found ? found.id : days >= 14 ? 'comprehensive' : 'short';
  }, [selectedDurationDays]);

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRIES;
    const q = countrySearch.toLowerCase();
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dialCode.includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [countrySearch]);

  const handleSelectCountry = (country: CountryOption) => {
    setSelectedCountryObj(country);
    setSelectedDialCode(country.dialCode);
    setValue('country', country.name, { shouldValidate: true });
    setIsCountryDropdownOpen(false);
  };

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setValue(
        'travel_styles',
        selectedStyles.filter((s) => s !== style)
      );
    } else {
      setValue('travel_styles', [...selectedStyles, style]);
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      const valid = await trigger(['tour_title', 'group_type']);
      if (valid) setCurrentStep(2);
    } else if (currentStep === 2) {
      const valid = await trigger(['departure_date', 'duration_days', 'budget_tier']);
      if (valid) setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const openNativeDatePicker = () => {
    if (dateInputRef.current) {
      try {
        if ('showPicker' in HTMLInputElement.prototype) {
          dateInputRef.current.showPicker();
        } else {
          dateInputRef.current.focus();
        }
      } catch {
        dateInputRef.current.focus();
      }
    }
  };

  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true);
    try {
      const fullPhone = data.phone.startsWith('+') ? data.phone : `${selectedDialCode} ${data.phone}`;
      await createInquiry({
        tour_title: data.tour_title,
        traveler_name: data.traveler_name,
        email: data.email,
        phone: fullPhone,
        country: data.country,
        departure_date: data.departure_date,
        duration_days: Number(data.duration_days),
        guests_count: Number(data.guests_count),
        budget_tier: data.budget_tier,
        travel_styles: data.travel_styles,
        preferred_contact: data.preferred_contact,
        special_requests: data.special_requests || '',
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-left mb-8 space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground block">
            Custom Trip Builder
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Plan Your Custom Journey
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Share your travel vision to receive an unhurried, private custom itinerary with verified 5-star heritage stays and dedicated concierge care.
          </p>
        </div>

        {/* Progress Bar (Strict 3 Steps) */}
        {!isSuccess && (
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">
                Step {currentStep} of 3: {currentStep === 1 ? 'Trip Basics' : currentStep === 2 ? 'Dates & Budget' : 'Get Your Plan'}
              </span>
              <span className="text-muted-foreground text-[11px]">
                {currentStep === 1 ? 'Next: Dates & Budget' : currentStep === 2 ? 'Next: Traveler Details' : 'Final Step'}
              </span>
            </div>

            {/* Segmented Progress Line */}
            <div className="grid grid-cols-3 gap-2">
              <div
                className={`h-1.5 rounded-full transition-colors duration-300 ${
                  currentStep >= 1 ? 'bg-foreground' : 'bg-muted'
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-colors duration-300 ${
                  currentStep >= 2 ? 'bg-foreground' : 'bg-muted'
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-colors duration-300 ${
                  currentStep >= 3 ? 'bg-foreground' : 'bg-muted'
                }`}
              />
            </div>
          </div>
        )}

        {/* Success Confirmation View */}
        {isSuccess ? (
          <Card className="p-8 sm:p-10 border-border text-left space-y-6 shadow-lg animate-fadeIn">
            <div className="space-y-2 border-b border-border pb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                Confirmed Proposal Request
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                We Are Crafting Your Itinerary
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Thank you. Your request has been assigned to a Senior Concierge. We will deliver a complete customized daily proposal within 12 hours via your preferred contact channel.
              </p>
            </div>

            <div className="bg-muted/40 p-4 rounded-lg border border-border space-y-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-muted-foreground text-[10px] block">
                Quick Action for VIP Travelers
              </span>
              <p className="text-foreground font-medium">
                Prefer immediate consultation on room availability or private aviation?
              </p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-1 font-bold text-foreground underline hover:opacity-80"
              >
                Chat directly with Executive Concierge on WhatsApp
              </a>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a
                href="/"
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Return to Home
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsSuccess(false);
                  setCurrentStep(1);
                }}
                className="text-xs"
              >
                Plan Another Trip
              </Button>
            </div>
          </Card>
        ) : (
          /* Multi-Step Card Form */
          <Card className="p-6 sm:p-8 border-border shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {/* STEP 1: TRIP BASICS */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Destination Input */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Where would you like to travel? *
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. Rajasthan, Kerala, Ladakh, or Custom Route"
                        {...register('tour_title')}
                        className="h-12 text-sm font-medium"
                      />
                      {errors.tour_title && (
                        <p className="text-destructive text-xs mt-1">{errors.tour_title.message}</p>
                      )}

                      {/* Quick Destination Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {POPULAR_DESTINATIONS.map((dest) => (
                          <button
                            key={dest}
                            type="button"
                            onClick={() => setValue('tour_title', dest, { shouldValidate: true })}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                              selectedDestination === dest
                                ? 'bg-foreground text-background border-foreground'
                                : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border'
                            }`}
                          >
                            {dest}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Who is Traveling? Selection Cards */}
                    <div className="space-y-2.5 pt-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Who is traveling? *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {GROUP_OPTIONS.map((grp) => {
                          const isSelected = selectedGroup === grp.id;
                          return (
                            <div
                              key={grp.id}
                              onClick={() => {
                                setValue('group_type', grp.id);
                                setValue('guests_count', grp.defaultGuests);
                              }}
                              className={`p-3.5 rounded-lg border cursor-pointer text-left transition-all duration-200 ${
                                isSelected
                                  ? 'border-foreground bg-foreground/5 ring-1 ring-foreground'
                                  : 'border-border hover:border-foreground/40 bg-card'
                              }`}
                            >
                              <span className="font-semibold text-xs text-foreground block">
                                {grp.title}
                              </span>
                              <span className="text-[11px] text-muted-foreground block mt-0.5">
                                {grp.subtitle}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* What's the Vibe? Multi-Select Pills */}
                    <div className="space-y-2.5 pt-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        What&apos;s the vibe? (Select all that apply)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {VIBE_PILLS.map((vibe) => {
                          const isSelected = selectedStyles.includes(vibe);
                          return (
                            <button
                              key={vibe}
                              type="button"
                              onClick={() => toggleStyle(vibe)}
                              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                                isSelected
                                  ? 'bg-foreground text-background border-foreground shadow-sm'
                                  : 'bg-card text-foreground hover:bg-muted border-border'
                              }`}
                            >
                              {vibe}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Navigation CTA */}
                    <div className="pt-6 border-t border-border flex justify-end">
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="h-11 px-6 text-xs font-semibold uppercase tracking-wider"
                      >
                        Continue to Dates & Budget →
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: DATES & BUDGET */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Date Selector Header & Mode Toggle */}
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Estimated Travel Timing *
                        </label>
                        <div className="flex items-center rounded-lg border border-border bg-muted/40 p-0.5 text-xs w-fit">
                          <button
                            type="button"
                            onClick={() => {
                              setDateMode('flexible');
                              if (selectedDepartureDate?.includes('-')) {
                                setValue('departure_date', FLEXIBLE_SEASONS[0], { shouldValidate: true });
                              }
                            }}
                            className={`px-3 py-1 rounded-md font-medium transition-colors ${
                              dateMode === 'flexible'
                                ? 'bg-card text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            Flexible Season / Month
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDateMode('exact');
                              if (!selectedDepartureDate?.includes('-')) {
                                setValue('departure_date', '', { shouldValidate: false });
                              }
                            }}
                            className={`px-3 py-1 rounded-md font-medium transition-colors ${
                              dateMode === 'exact'
                                ? 'bg-card text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            Specific Date
                          </button>
                        </div>
                      </div>

                      {/* Date Mode: Flexible Season Grid */}
                      {dateMode === 'flexible' ? (
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {FLEXIBLE_SEASONS.map((season) => {
                              const isSelected = selectedDepartureDate === season;
                              return (
                                <div
                                  key={season}
                                  onClick={() => setValue('departure_date', season, { shouldValidate: true })}
                                  className={`p-3 rounded-lg border cursor-pointer text-left text-xs transition-all ${
                                    isSelected
                                      ? 'border-foreground bg-foreground/5 font-semibold text-foreground ring-1 ring-foreground'
                                      : 'border-border text-muted-foreground hover:text-foreground bg-card'
                                  }`}
                                >
                                  {season}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        /* Date Mode: Modern Clickable Calendar Trigger (Custom Compact Width) */
                        <div className="space-y-2">
                          <div
                            onClick={openNativeDatePicker}
                            className="flex items-center justify-between h-12 w-full max-w-sm rounded-lg border border-input bg-background px-4 py-2 text-sm cursor-pointer hover:border-foreground/40 transition-colors focus-within:ring-2 focus-within:ring-ring"
                          >
                            <div className="flex items-center gap-3">
                              <svg className="w-4 h-4 text-foreground/70 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                                <line x1="16" x2="16" y1="2" y2="6"/>
                                <line x1="8" x2="8" y1="2" y2="6"/>
                                <line x1="3" x2="21" y1="10" y2="10"/>
                              </svg>
                              <span className={selectedDepartureDate && selectedDepartureDate.includes('-') ? 'text-foreground font-semibold text-xs sm:text-sm' : 'text-muted-foreground text-xs sm:text-sm'}>
                                {selectedDepartureDate && selectedDepartureDate.includes('-')
                                  ? new Date(selectedDepartureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                  : 'Pick Departure Date'}
                              </span>
                            </div>
                            <input
                              ref={dateInputRef}
                              type="date"
                              min={todayStr}
                              value={selectedDepartureDate && selectedDepartureDate.includes('-') ? selectedDepartureDate : ''}
                              onChange={(e) => setValue('departure_date', e.target.value, { shouldValidate: true })}
                              className="opacity-0 w-0 h-0 absolute pointer-events-none"
                            />
                            <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider hover:text-foreground">
                              {selectedDepartureDate && selectedDepartureDate.includes('-') ? 'Change' : 'Select'}
                            </span>
                          </div>

                          <span className="text-[11px] text-muted-foreground block">
                            Past dates are disabled. Click anywhere on the box to choose your departure day.
                          </span>
                        </div>
                      )}

                      {errors.departure_date && (
                        <p className="text-destructive text-xs mt-1">{errors.departure_date.message}</p>
                      )}
                    </div>

                    {/* Unified Duration Selector with Dynamic Category Sync */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Trip Duration: <span className="text-foreground font-bold">{selectedDurationDays} Days</span>
                        </label>

                        {/* Interactive Stepper Counter (+ and - syncs category automatically) */}
                        <div className="flex items-center gap-2 border border-border rounded-lg p-1 bg-card">
                          <button
                            type="button"
                            onClick={() => {
                              const next = Math.max(3, Number(selectedDurationDays) - 1);
                              setValue('duration_days', next, { shouldValidate: true });
                            }}
                            className="w-7 h-7 rounded flex items-center justify-center text-sm font-bold bg-muted/60 hover:bg-muted text-foreground transition-colors"
                            aria-label="Decrease days"
                          >
                            –
                          </button>
                          <span className="text-xs font-bold px-1 min-w-8 text-center">{selectedDurationDays}d</span>
                          <button
                            type="button"
                            onClick={() => {
                              const next = Math.min(60, Number(selectedDurationDays) + 1);
                              setValue('duration_days', next, { shouldValidate: true });
                            }}
                            className="w-7 h-7 rounded flex items-center justify-center text-sm font-bold bg-muted/60 hover:bg-muted text-foreground transition-colors"
                            aria-label="Increase days"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Duration Category Chips (Dynamically Highlights Active Range) */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {DURATION_RANGES.map((range) => {
                          const isCategoryActive = activeDurationCategory === range.id;
                          return (
                            <button
                              key={range.id}
                              type="button"
                              onClick={() => setValue('duration_days', range.defaultDays, { shouldValidate: true })}
                              className={`p-3 rounded-lg border text-left transition-all ${
                                isCategoryActive
                                  ? 'border-foreground bg-foreground/5 ring-1 ring-foreground text-foreground shadow-sm'
                                  : 'border-border text-muted-foreground hover:text-foreground bg-card'
                              }`}
                            >
                              <span className="font-semibold text-xs block">{range.label}</span>
                              <span className="text-[10px] text-muted-foreground block mt-0.5">{range.note}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget Segmented Selector */}
                    <div className="space-y-2.5 pt-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Comfort & Hotel Tier *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {BUDGET_TIERS.map((tier) => {
                          const isSelected = selectedBudget === tier.id;
                          return (
                            <div
                              key={tier.id}
                              onClick={() => setValue('budget_tier', tier.id, { shouldValidate: true })}
                              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? 'border-foreground bg-foreground/5 ring-1 ring-foreground'
                                  : 'border-border hover:border-foreground/40 bg-card'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-xs font-bold text-foreground">
                                  {tier.label}
                                </span>
                              </div>
                              <span className="font-serif font-bold text-sm text-foreground block">
                                {tier.title}
                              </span>
                              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                {tier.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Optional Textarea */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Specific requests or preferences (Optional)
                      </label>
                      <Textarea
                        rows={3}
                        placeholder="e.g. Celebrating an anniversary in Udaipur, interest in private tiger tracking, dietary needs..."
                        {...register('special_requests')}
                      />
                    </div>

                    {/* Step 2 Controls */}
                    <div className="pt-6 border-t border-border flex items-center justify-between">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleBack}
                        className="text-xs"
                      >
                        ← Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="h-11 px-6 text-xs font-semibold uppercase tracking-wider"
                      >
                        Continue to Contact →
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: GET YOUR PLAN */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Traveler Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g. Lord Henry Kensington"
                          {...register('traveler_name')}
                          className="h-12 text-sm"
                        />
                        {errors.traveler_name && (
                          <p className="text-destructive text-xs mt-1">{errors.traveler_name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="e.g. henry@domain.com"
                          {...register('email')}
                          className="h-12 text-sm"
                        />
                        {errors.email && (
                          <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Country of Residence Autocomplete & Integrated Dial-Code Phone Input */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Country of Residence Autocomplete Selector */}
                      <div className="space-y-2 relative">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Country of Residence *
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                            className="flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <span className="flex items-center gap-2">
                              <span>{selectedCountryObj.flag}</span>
                              <span>{selectedCountryObj.name}</span>
                            </span>
                            <span className="text-xs text-muted-foreground">▾</span>
                          </button>

                          {/* Searchable Country Dropdown Menu */}
                          {isCountryDropdownOpen && (
                            <div className="absolute top-14 left-0 w-full bg-card border border-border rounded-lg shadow-xl z-50 p-2 space-y-2 max-h-64 overflow-y-auto">
                              <Input
                                type="text"
                                placeholder="Search country or code..."
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                className="h-9 text-xs"
                                autoFocus
                              />
                              <div className="space-y-1">
                                {filteredCountries.map((c) => (
                                  <div
                                    key={c.code}
                                    onClick={() => handleSelectCountry(c)}
                                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted text-xs cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span>{c.flag}</span>
                                      <span className="font-medium text-foreground">{c.name}</span>
                                    </div>
                                    <span className="text-muted-foreground font-mono">{c.dialCode}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Phone / WhatsApp Field with Integrated Country-Code Flag Selector */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Phone / WhatsApp Number *
                        </label>
                        <div className="flex items-center rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-ring transition-colors">
                          {/* Dial Code Selector */}
                          <select
                            value={selectedDialCode}
                            onChange={(e) => setSelectedDialCode(e.target.value)}
                            className="h-12 bg-muted/40 border-r border-input rounded-l-md px-2.5 text-xs font-semibold text-foreground focus:outline-none cursor-pointer"
                          >
                            {COUNTRIES.map((c) => (
                              <option key={`${c.code}-${c.dialCode}`} value={c.dialCode}>
                                {c.flag} {c.dialCode} ({c.code})
                              </option>
                            ))}
                          </select>

                          {/* Direct Phone Number Input */}
                          <input
                            type="tel"
                            placeholder="7700 900123"
                            {...register('phone')}
                            className="flex-1 h-12 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Radio Options: Preferred Method of Contact */}
                    <div className="space-y-2.5 pt-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Preferred Method of Contact *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {CONTACT_METHODS.map((method) => {
                          const isSelected = selectedContactMethod === method.id;
                          return (
                            <div
                              key={method.id}
                              onClick={() => setValue('preferred_contact', method.id)}
                              className={`p-3.5 rounded-lg border cursor-pointer transition-all duration-200 flex items-start gap-3 ${
                                isSelected
                                  ? 'border-foreground bg-foreground/5 ring-1 ring-foreground'
                                  : 'border-border hover:border-foreground/40 bg-card'
                              }`}
                            >
                              <div className="mt-0.5 text-foreground shrink-0">{method.svg}</div>
                              <div>
                                <span className="font-semibold text-xs text-foreground block">
                                  {method.label}
                                </span>
                                <span className="text-[10px] text-muted-foreground block mt-0.5 leading-tight">
                                  {method.desc}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Submit Section & Trust Reassurance */}
                    <div className="pt-6 border-t border-border space-y-4">
                      <div className="flex items-center justify-between">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleBack}
                          className="text-xs"
                        >
                          ← Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-12 px-8 text-xs font-semibold uppercase tracking-wider"
                        >
                          {isSubmitting ? 'Submitting Trip Inquiry...' : 'Submit Trip Inquiry'}
                        </Button>
                      </div>

                      {/* Trust & Privacy Reassurance Badge */}
                      <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-muted-foreground">
                        <svg className="w-3.5 h-3.5 text-muted-foreground shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>100% Confidential • Zero Spam Guarantee • Direct Concierge Care • GDPR Compliant</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
