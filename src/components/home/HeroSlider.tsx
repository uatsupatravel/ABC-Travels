'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, MotionValue } from 'framer-motion';

const HERO_IMAGES = [
  '/images/heroImages/pic-kaca-gcc6B3p2FzE-unsplash.jpg',
  '/images/heroImages/rishi-sreekar-eDCDtWFnR4s-unsplash.jpg',
  '/images/hero/taj-dawn-mist.jpg',
  '/images/hero/kashmir-shikara-floating.jpg',
  '/images/hero/lake-palace-udaipur.jpg',
  '/images/hero/ladakh-monastery-clouds.jpg',
  
];

interface HeroSliderProps {
  scale: MotionValue<number>;
  y: MotionValue<string>;
}

export default function HeroSlider({ scale, y }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Change image every 7 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      style={{ scale, y }}
      className="absolute inset-0 z-0 origin-center bg-ink-black"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }} // Very slow, luxurious crossfade
          className="absolute inset-0 w-full h-full"
        >
          {/* 
            Ken Burns effect: the wrapper slowly scales up over the image's lifetime.
            We use a 10s duration here so it continues scaling even while fading out.
          */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 10, ease: 'linear' }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={HERO_IMAGES[currentIndex]}
              alt={`India Luxury Travel ${currentIndex + 1}`}
              fill
              priority={currentIndex === 0}
              quality={90}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Subtle cinematic gradient overlays for pristine readability (rendered ON TOP of the fading images) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink-black/90 via-ink-black/30 to-ink-black/50 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-radial-gradient from-transparent via-black/10 to-black/50 pointer-events-none" />
    </motion.div>
  );
}
