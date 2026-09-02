'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface SimpleContactFormValues {
  traveler_name: string;
  email: string;
  phone: string;
  message: string;
}

export default function SimpleContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset } = useForm<SimpleContactFormValues>();

  const onSubmit = async (data: SimpleContactFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        traveler_name: data.traveler_name,
        email: data.email,
        phone: data.phone,
        country: 'Not Specified (Contact Page)',
        guests_count: 2,
        special_requests: `GENERAL INQUIRY:\n\n${data.message}`,
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again or use WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-secondary-container text-ink-black rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-serif text-2xl text-ink-black font-semibold mb-2">Message Sent</h3>
          <p className="text-slate-taupe">Our Concierge desk will reach out to you shortly.</p>
        </div>
        <Button variant="outline" onClick={() => setIsSuccess(false)} className="mt-4">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="traveler_name" className="text-xs uppercase tracking-wider font-semibold text-ink-black flex gap-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="traveler_name"
            {...register('traveler_name', { required: true })}
            className="bg-white/50 border-silk-border focus-visible:ring-secondary-container"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs uppercase tracking-wider font-semibold text-ink-black flex gap-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            {...register('phone', { required: true })}
            className="bg-white/50 border-silk-border focus-visible:ring-secondary-container"
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-ink-black flex gap-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          {...register('email', { required: true })}
          className="bg-white/50 border-silk-border focus-visible:ring-secondary-container"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs uppercase tracking-wider font-semibold text-ink-black flex gap-1">
          How can we help you? <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          rows={5}
          {...register('message', { required: true })}
          className="bg-white/50 border-silk-border focus-visible:ring-secondary-container resize-none"
          placeholder="I'm interested in..."
        />
      </div>

      <Button 
        type="submit" 
        variant="accent" 
        className="w-full sm:w-auto shadow-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Sending Message...
          </span>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
}
