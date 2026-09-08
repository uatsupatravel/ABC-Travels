'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface WordProps {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}

function Word({ children, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(progress, range, ['#A39E98', '#1C1917']);

  return (
    <span className="relative inline-block mr-[0.28em] my-[0.08em]">
      <motion.span style={{ opacity, color }} className="transition-colors duration-150">
        {children}
      </motion.span>
    </span>
  );
}

interface MonographReadingLightProps {
  paragraph: string;
  className?: string;
}

export default function MonographReadingLight({
  paragraph,
  className = '',
}: MonographReadingLightProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const words = paragraph.split(' ');
  const totalWords = words.length;

  return (
    <p ref={containerRef} className={`font-serif leading-[1.7] select-none ${className}`}>
      {words.map((word, i) => {
        const start = i / totalWords;
        const end = start + 1 / totalWords;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
