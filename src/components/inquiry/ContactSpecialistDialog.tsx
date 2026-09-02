'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Loader2, Phone, MessageCircle, X, Compass } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Tour } from '@/types';

interface ContactSpecialistDialogProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
}

interface CallRequestFormValues {
  traveler_name: string;
  email: string;
  phone: string;
  time_to_call: string;
}

export default function ContactSpecialistDialog({ tour, isOpen, onClose }: ContactSpecialistDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [view, setView] = useState<'options' | 'form'>('options');

  const { register, handleSubmit, reset } = useForm<CallRequestFormValues>();

  const WHATSAPP_NUMBER = '918700406415';
  
  const handleWhatsAppClick = () => {
    const text = tour 
      ? `Hello ABC Travels Concierge, I am interested in the ${tour.title} journey and would love to speak to a specialist.`
      : `Hello ABC Travels Concierge, I would love to speak to a specialist about planning a journey.`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
  };

  const onSubmit = async (data: CallRequestFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        tour_id: tour?.id || null,
        tour_title: tour?.title || null,
        traveler_name: data.traveler_name,
        email: data.email,
        phone: data.phone,
        country: 'Not Specified (Call Request)',
        guests_count: 2,
        special_requests: `CALL REQUEST. Preferred time: ${data.time_to_call}`,
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setView('options');
        reset();
        onClose();
      }, 3000);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again or use WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <Card
          className="relative bg-surface-container-lowest text-ink-black rounded-lg max-w-md w-full p-6 sm:p-8 text-left shadow-xl border-silk-border my-8 animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-silk-border mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-silk-border flex items-center justify-center bg-surface-dim text-ink-black">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-ink-black">
                  Speak to a Specialist
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-slate-taupe font-semibold">
                  ABC Travels Concierge
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-surface-dim text-slate-taupe hover:text-ink-black transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center mx-auto text-ink-black mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-ink-black font-semibold">Request Received</h3>
              <p className="text-slate-taupe text-sm">
                Our Senior Concierge will call you at your preferred time.
              </p>
            </div>
          ) : view === 'options' ? (
            <div className="py-6 space-y-4">
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full py-6 text-base bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-3 shadow-md border-0"
              >
                <MessageCircle className="w-5 h-5" />
                Chat instantly on WhatsApp
              </Button>
              
              <div className="relative py-2 flex items-center">
                <div className="flex-grow border-t border-silk-border"></div>
                <span className="flex-shrink-0 mx-4 text-xs text-slate-taupe font-label-caps uppercase tracking-widest">or</span>
                <div className="flex-grow border-t border-silk-border"></div>
              </div>

              <Button 
                variant="outline"
                onClick={() => setView('form')}
                className="w-full py-6 text-base border-ink-black/20 text-ink-black hover:bg-ink-black/5 flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Request a Callback
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4 animate-fadeIn">
              <div className="space-y-2">
                <label htmlFor="traveler_name" className="text-xs uppercase tracking-wider font-semibold text-ink-black">Full Name</label>
                <Input
                  id="traveler_name"
                  {...register('traveler_name', { required: true })}
                  className="bg-white/50 border-silk-border focus-visible:ring-secondary-container"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs uppercase tracking-wider font-semibold text-ink-black">Phone Number (with country code)</label>
                <Input
                  id="phone"
                  {...register('phone', { required: true })}
                  className="bg-white/50 border-silk-border focus-visible:ring-secondary-container"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-ink-black">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', { required: true })}
                  className="bg-white/50 border-silk-border focus-visible:ring-secondary-container"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="time_to_call" className="text-xs uppercase tracking-wider font-semibold text-ink-black">Preferred Time to Call</label>
                <Input
                  id="time_to_call"
                  {...register('time_to_call', { required: true })}
                  className="bg-white/50 border-silk-border focus-visible:ring-secondary-container"
                  placeholder="e.g., Tomorrow morning (EST)"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setView('options')}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  variant="accent" 
                  className="flex-1 shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </span>
                  ) : (
                    'Request Call'
                  )}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
