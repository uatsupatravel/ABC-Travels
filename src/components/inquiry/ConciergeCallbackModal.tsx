'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { Tour } from '@/types';
import CountryPhoneInput from '@/components/ui/CountryPhoneInput';
import { COUNTRIES } from '@/lib/constants/countries';
import { X, Check, Loader2 } from 'lucide-react';

interface ConciergeCallbackModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
}

interface CallbackFormValues {
  traveler_name: string;
  email: string;
  phone: string;
  notes: string;
}

const TIME_WINDOWS = [
  { id: 'asap', label: 'Soonest', subtext: 'Within 2 hrs' },
  { id: 'morning', label: 'Morning', subtext: '9am – 12pm' },
  { id: 'afternoon', label: 'Afternoon', subtext: '12pm – 5pm' },
  { id: 'evening', label: 'Evening', subtext: '5pm – 9pm' },
];

export default function ConciergeCallbackModal({ tour, isOpen, onClose }: ConciergeCallbackModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('morning');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('US');
  const [selectedDialCode, setSelectedDialCode] = useState<string>('+1');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CallbackFormValues>({
    defaultValues: {
      traveler_name: '',
      email: '',
      phone: '',
      notes: '',
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcut (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const onSubmit = async (data: CallbackFormValues) => {
    setIsSubmitting(true);
    try {
      const chosenWindow = TIME_WINDOWS.find((w) => w.id === selectedTimeSlot);
      const rawPhone = data.phone.trim();
      const fullPhone = rawPhone.startsWith('+') ? rawPhone : `${selectedDialCode} ${rawPhone}`;

      const payload = {
        tour_id: tour?.id || null,
        tour_title: tour?.title || null,
        traveler_name: data.traveler_name,
        email: data.email,
        phone: fullPhone,
        country: 'Direct Callback Request',
        guests_count: 2,
        special_requests: `PRIVATE CONSULTATION REQUEST. Preferred Window: ${chosenWindow?.label || 'Flexible'} (${chosenWindow?.subtext || ''}). Notes: ${data.notes || 'None'}`,
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed');

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        reset();
        onClose();
      }, 3500);
    } catch (err) {
      console.error(err);
      alert('Unable to submit request. Please connect with us directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !mounted) return null;

  const content = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Calm, Diffused Stone Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#161311]/70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      {/* Editorial Modal Card (Aman / Four Seasons Tactile Aesthetic) */}
      <div
        className="relative z-10 w-full max-w-lg bg-[#FAF8F5] text-[#2A2421] rounded-none shadow-2xl border border-[#E3DDD5] overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Editorial Header with Generous Breathing Room */}
        <div className="pt-6 sm:pt-8 pb-4 sm:pb-5 px-5 sm:px-8 border-b border-[#EAE4DC] relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 text-[#8C827A] hover:text-[#2A2421] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>

          <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-[#9E7D53] block mb-1.5 sm:mb-2">
            Private Consultation
          </span>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-[#2A2421] tracking-tight">
            Speak with a Specialist
          </h3>

          {tour && (
            <p className="text-xs text-[#706A65] mt-1 sm:mt-1.5 font-light tracking-wide truncate">
              Regarding:{' '}
              <span className="text-[#2A2421] font-serif italic">{tour.title}</span>
              <span className="text-[#9E7D53] font-mono ml-2 text-[11px]">
                ({tour.duration_days}D / {tour.duration_nights}N)
              </span>
            </p>
          )}
        </div>

        {/* Form Body */}
        <div className="px-5 py-5 sm:px-8 sm:py-6 bg-[#FAF8F5]">
          {isSuccess ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-10 h-10 rounded-full border border-[#9E7D53] flex items-center justify-center mx-auto text-[#9E7D53]">
                <Check className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-2xl font-normal text-[#2A2421]">
                Request Confirmed
              </h4>
              <p className="text-xs text-[#706A65] leading-relaxed max-w-sm mx-auto font-light">
                An India specialist will connect with you during your chosen window to curate your journey.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
              {/* Full Name (Clean Minimalist Underline) */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#706A65] block">
                  Full Name *
                </label>
                <input
                  {...register('traveler_name', { required: 'Full name is required' })}
                  placeholder="e.g. Alistair Vance"
                  className="w-full h-9 bg-transparent border-b border-[#D8CFBE] focus:border-[#2C241D] text-sm text-[#2A2421] placeholder:text-[#A8A096] placeholder:font-light outline-none transition-colors"
                />
                {errors.traveler_name && (
                  <span className="text-[10px] text-red-700 block mt-1">{errors.traveler_name.message}</span>
                )}
              </div>

              {/* Grid: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Standardized International Phone */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#706A65] block">
                    Phone Number *
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: 'Phone number is required',
                      minLength: { value: 5, message: 'Valid number required' },
                    }}
                    render={({ field }) => (
                      <CountryPhoneInput
                        variant="underline"
                        value={field.value}
                        onChange={field.onChange}
                        selectedDialCode={selectedDialCode}
                        selectedCountryCode={selectedCountryCode}
                        onDialCodeChange={setSelectedDialCode}
                        onCountryChange={(country) => {
                          setSelectedCountryCode(country.code);
                          setSelectedDialCode(country.dialCode);
                        }}
                        placeholder="555 123 4567"
                        error={errors.phone?.message}
                      />
                    )}
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#706A65] block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Valid email required',
                      },
                    })}
                    placeholder="name@domain.com"
                    className="w-full h-9 bg-transparent border-b border-[#D8CFBE] focus:border-[#2C241D] text-sm text-[#2A2421] placeholder:text-[#A8A096] placeholder:font-light outline-none transition-colors"
                  />
                  {errors.email && (
                    <span className="text-[10px] text-red-700 block mt-1">{errors.email.message}</span>
                  )}
                </div>
              </div>

              {/* Time Slots: Responsive 2-Col Mobile / 4-Col Desktop Strip */}
              <div className="space-y-2 pt-1">
                <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#706A65] block">
                  Preferred Time Window
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_WINDOWS.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot.id)}
                        className={`py-2 sm:py-2.5 px-2 text-center transition-all cursor-pointer border ${
                          isSelected
                            ? 'border-[#2C241D] bg-[#2C241D] text-[#FAF8F5]'
                            : 'border-[#E3DDD5] bg-[#FAF8F5] text-[#706A65] hover:border-[#2C241D]/40 hover:text-[#2A2421]'
                        }`}
                      >
                        <span className="text-xs font-medium block">{slot.label}</span>
                        <span className={`text-[9px] block mt-0.5 ${isSelected ? 'text-[#D8CFBE]' : 'text-[#8C827A]'}`}>
                          {slot.subtext}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Desires / Notes (Underline-only Textarea) */}
              <div className="space-y-1 pt-1">
                <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#706A65] block">
                  Celebrations or Preferences (Optional)
                </label>
                <textarea
                  {...register('notes')}
                  placeholder="e.g. Traveling in November, suite preferences, anniversary..."
                  rows={2}
                  className="w-full bg-transparent border-b border-[#D8CFBE] focus:border-[#2C241D] py-1.5 text-xs text-[#2A2421] placeholder:text-[#A8A096] placeholder:font-light outline-none transition-colors resize-none"
                />
              </div>

              {/* Primary Action Button: Refined Dark Bronze Rectangle */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#2C241D] hover:bg-[#3E342B] text-[#FAF8F5] text-[11px] uppercase tracking-[0.2em] font-medium transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Scheduling...
                    </span>
                  ) : (
                    "Let's Plan The Journey"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
