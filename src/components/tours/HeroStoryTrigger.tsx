'use client';

import React, { useState } from 'react';
import { Tour } from '@/types';
import VisualStoryModal from './VisualStoryModal';
import { Play } from 'lucide-react';

interface HeroStoryTriggerProps {
  tour: Tour;
}

export default function HeroStoryTrigger({ tour }: HeroStoryTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white font-serif text-xs font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer select-none"
        title="Experience 60-Second Visual Story"
      >
        <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shrink-0">
          <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
        </span>
        <span className="tracking-wide">60-Sec Visual Story</span>
      </button>

      <VisualStoryModal
        tour={tour}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
