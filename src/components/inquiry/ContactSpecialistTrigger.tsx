'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import ContactSpecialistDialog from './ContactSpecialistDialog';
import { Tour } from '@/types';

interface ContactSpecialistTriggerProps {
  tour: Tour | null;
  buttonText?: string;
  className?: string;
}

export default function ContactSpecialistTrigger({ tour, buttonText = "Speak to a Specialist", className }: ContactSpecialistTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        className={className || "w-full text-base py-6 shadow-md"}
      >
        {buttonText}
      </Button>

      <ContactSpecialistDialog
        tour={tour}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
