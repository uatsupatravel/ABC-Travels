'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  RotateCcw,
  Sliders,
  Layers,
  Eye,
  ArrowRight,
  Maximize2,
  Zap,
  Film,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type AnimationStyleId = 'curtain' | 'float3d' | 'hairline' | 'fanout' | 'exposure';

interface AnimationStyle {
  id: AnimationStyleId;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  timing: string;
}

const STYLES: AnimationStyle[] = [
  {
    id: 'curtain',
    name: '1. Editorial Silk Curtain & Focus Bloom',
    tagline: 'High-fashion architectural unmasking',
    description:
      'The images are concealed behind a warm silk-cream curtain that smoothly slides away (clip-path wipe) while the photo gently blossoms from a soft blur and 1.15x scale into crisp focus.',
    badge: 'Editorial Vogue',
    timing: '1.2s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  {
    id: 'float3d',
    name: '2. Asymmetric 3D Parallax & Float Drift',
    tagline: 'Organic floating depth with subtle 3D rotational tilt',
    description:
      'The two images enter from different depths with gentle opposing rotations (-3° and +3°) and floating elevation, creating an immersive, layered magazine feel.',
    badge: 'Aman / Orient Luxury',
    timing: '1.0s Spring physics',
  },
  {
    id: 'hairline',
    name: '3. Monograph Hairline Border & Aperture Reveal',
    tagline: 'Architectural line drawing followed by photo expansion',
    description:
      'A refined bronze hairline border draws itself around each frame first, followed by the photograph expanding smoothly within the container like a camera lens aperture.',
    badge: 'Modern Monograph',
    timing: '0.9s Staggered sequenced',
  },
  {
    id: 'fanout',
    name: '4. Magazine Overlap & Fan-Out Split',
    tagline: 'Stacked cards that elegantly fan apart into asymmetrical columns',
    description:
      'The two photographs start slightly overlapping in the center, and on view trigger, they smoothly glide outward into their staggered positions with subtle bounce.',
    badge: 'Kinfolk Gallery',
    timing: '1.1s Smooth spring',
  },
  {
    id: 'exposure',
    name: '5. Cinematic Warm Light Sweep & Film Shimmer',
    tagline: 'Warm golden sunrise flare with scale settling',
    description:
      'A warm golden light shimmer sweeps across the diagonal of each image as they elevate, evoking the feeling of dawn breaking over Lake Pichola and the backwaters.',
    badge: 'Cinematic Heritage',
    timing: '1.3s Multi-layer sweep',
  },
];

export default function AnimationLabPage() {
  const [selectedStyle, setSelectedStyle] = useState<AnimationStyleId>('curtain');
  const [replayKey, setReplayKey] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1); // 1 = normal, 0.5 = slow mo
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');

  const triggerReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-alabaster-cream text-ink-black pt-28 pb-32 px-margin-mobile md:px-margin-desktop selection:bg-secondary-container selection:text-ink-black">
      {/* HEADER & CONTROLS */}
      <div className="max-w-7xl mx-auto mb-12">
        {/* Lab Badge & Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-silk-border">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cream-container border border-silk-border rounded text-xs font-label-caps tracking-widest uppercase text-bronze-hover">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Animation Studio</span>
            </div>
            <h1 className="font-display-2xl text-3xl sm:text-5xl font-normal text-ink-black tracking-tight">
              Invitation Images: Animation Suite
            </h1>
            <p className="font-subhead text-slate-taupe text-sm sm:text-base leading-relaxed">
              Preview and test high-quality luxury animation variations for the 2-image pairing in the{' '}
              <strong className="text-ink-black">&ldquo;An Invitation to the Subcontinent&rdquo;</strong> section below the Hero.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={triggerReplay}
              className="gap-2 border-ink-black/20 text-ink-black hover:bg-ink-black/5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Animation</span>
            </Button>

            <div className="flex items-center gap-1 bg-surface-container-lowest border border-silk-border rounded p-1">
              <button
                onClick={() => setSpeed(1)}
                className={`px-2.5 py-1 text-xs font-label-caps tracking-wider uppercase rounded transition-colors ${
                  speed === 1
                    ? 'bg-ink-black text-alabaster-cream'
                    : 'text-slate-taupe hover:text-ink-black'
                }`}
              >
                1.0x
              </button>
              <button
                onClick={() => setSpeed(0.5)}
                className={`px-2.5 py-1 text-xs font-label-caps tracking-wider uppercase rounded transition-colors ${
                  speed === 0.5
                    ? 'bg-ink-black text-alabaster-cream'
                    : 'text-slate-taupe hover:text-ink-black'
                }`}
              >
                0.5x (Slow-Mo)
              </button>
            </div>

            <Button
              variant={viewMode === 'compare' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode(viewMode === 'single' ? 'compare' : 'single')}
              className="gap-2"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{viewMode === 'compare' ? 'Single View' : 'Compare All 5'}</span>
            </Button>
          </div>
        </div>

        {/* STYLE TABS (Single View Mode) */}
        {viewMode === 'single' && (
          <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar border-b border-silk-border">
            {STYLES.map((style) => {
              const isSelected = selectedStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => {
                    setSelectedStyle(style.id);
                    triggerReplay();
                  }}
                  className={`relative px-4 py-2 rounded text-xs font-label-caps tracking-widest uppercase transition-all duration-300 shrink-0 ${
                    isSelected
                      ? 'bg-ink-black text-alabaster-cream shadow-sm'
                      : 'bg-surface-container-lowest border border-silk-border text-slate-taupe hover:text-ink-black hover:border-ink-black/40'
                  }`}
                >
                  <span>{style.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* STAGE CONTAINER */}
      <div className="max-w-7xl mx-auto">
        {viewMode === 'single' ? (
          <SingleStage
            key={`${selectedStyle}-${replayKey}-${speed}`}
            styleId={selectedStyle}
            speed={speed}
            styleInfo={STYLES.find((s) => s.id === selectedStyle)!}
            onReplay={triggerReplay}
          />
        ) : (
          <div className="space-y-24">
            {STYLES.map((style) => (
              <div key={`${style.id}-${replayKey}-${speed}`} className="space-y-6 pt-8 border-t border-silk-border">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-label-caps text-xs tracking-widest text-bronze-hover uppercase">
                      {style.badge}
                    </span>
                    <h2 className="font-serif text-2xl text-ink-black">{style.name}</h2>
                    <p className="font-body-base text-slate-taupe text-xs">{style.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedStyle(style.id);
                      setViewMode('single');
                    }}
                  >
                    Select This Style
                  </Button>
                </div>
                <div className="bg-surface-container-lowest border border-silk-border rounded-xl p-8 shadow-sm">
                  <MockInvitationSection styleId={style.id} speed={speed} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// SINGLE STAGE PREVIEW (WITH FULL SECTION SIMULATION)
// =========================================================================

function SingleStage({
  styleId,
  speed,
  styleInfo,
  onReplay,
}: {
  styleId: AnimationStyleId;
  speed: number;
  styleInfo: AnimationStyle;
  onReplay: () => void;
}) {
  return (
    <div className="space-y-8">
      {/* Information Header */}
      <div className="bg-surface-container-lowest border border-silk-border p-6 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-xs tracking-widest text-bronze-hover uppercase font-semibold">
              {styleInfo.badge}
            </span>
            <span className="text-slate-taupe text-xs">• {styleInfo.timing}</span>
          </div>
          <h2 className="font-serif text-2xl text-ink-black font-medium">{styleInfo.name}</h2>
          <p className="font-body-base text-slate-taupe text-sm max-w-3xl">{styleInfo.description}</p>
        </div>

        <Button size="sm" variant="accent" onClick={onReplay} className="shrink-0 gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Trigger Animation</span>
        </Button>
      </div>

      {/* Live In-Situ Simulation Box */}
      <div className="bg-alabaster-cream border border-silk-border rounded-2xl p-6 sm:p-12 shadow-sm overflow-hidden relative">
        <div className="absolute top-4 right-4 bg-ink-black/5 text-slate-taupe font-label-caps text-[9px] uppercase tracking-widest px-2.5 py-1 rounded">
          Live Section Simulation
        </div>
        <MockInvitationSection styleId={styleId} speed={speed} />
      </div>
    </div>
  );
}

// =========================================================================
// MOCK "AN INVITATION TO THE SUBCONTINENT" SECTION
// =========================================================================

function MockInvitationSection({
  styleId,
  speed,
}: {
  styleId: AnimationStyleId;
  speed: number;
}) {
  // Speed multipliers
  const durationFactor = 1 / speed;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
      {/* Left Column (Editorial Text) */}
      <div className="lg:col-span-6 space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-px bg-bronze-hover" />
          <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover font-semibold">
            An Invitation to the Subcontinent
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-ink-black leading-[1.15] text-balance">
          Where Ancient Heritage Meets <span className="italic font-light font-serif">Serene Splendor</span>
        </h2>

        <p className="font-body-base text-slate-taupe text-sm sm:text-base leading-relaxed">
          The Indian subcontinent encompasses an extraordinary breadth of geography and living history, where centuries-old palace lineages, dawn river rituals along sacred ghats, and high Himalayan valleys exist in parallel rhythms.
        </p>

        <p className="font-body-base text-slate-taupe text-xs sm:text-sm leading-relaxed">
          At ABC Travels, we orchestrate intimate encounters: dining under lantern-lit palace ramparts, tracing Bengal tigers through dawn mist with veteran naturalists, and sleeping in original royal chambers where maharajas once hosted world royalty.
        </p>

        <div className="pt-2 flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2 border-ink-black/20 text-ink-black hover:bg-ink-black/5">
            <span>Our Heritage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
          <span className="font-label-caps text-xs tracking-widest text-slate-taupe uppercase">
            Curated Departures ↓
          </span>
        </div>
      </div>

      {/* Right Column: 2 ANIMATED IMAGES + STATS */}
      <div className="lg:col-span-6 relative">
        {styleId === 'curtain' && <CurtainAnimation durationFactor={durationFactor} />}
        {styleId === 'float3d' && <Float3DAnimation durationFactor={durationFactor} />}
        {styleId === 'hairline' && <HairlineAnimation durationFactor={durationFactor} />}
        {styleId === 'fanout' && <FanOutAnimation durationFactor={durationFactor} />}
        {styleId === 'exposure' && <ExposureAnimation durationFactor={durationFactor} />}
      </div>
    </div>
  );
}

// =========================================================================
// STYLE 1: EDITORIAL SILK CURTAIN & FOCUS BLOOM
// =========================================================================

function CurtainAnimation({ durationFactor }: { durationFactor: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 relative py-4">
      {/* Image 1 (Left: Taj Mahal Balcony) */}
      <div className="space-y-4">
        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-silk-border bg-surface-dim shadow-sm group">
          {/* Animated Image */}
          <motion.div
            initial={{ scale: 1.2, filter: 'blur(10px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2 * durationFactor, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            <Image
              src="/images/welcome/taj-balcony-sunrise.jpg"
              alt="Taj Mahal Balcony View"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Sliding Silk Curtain Mask (Wipes away bottom-to-top) */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.9 * durationFactor, ease: [0.77, 0, 0.175, 1], delay: 0.1 * durationFactor }}
            style={{ originY: 0 }}
            className="absolute inset-0 bg-cream-container z-20"
          />
        </div>

        {/* Accompanying Stat Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 * durationFactor, delay: 0.4 * durationFactor }}
          className="p-4 bg-cream-container border border-silk-border rounded-lg text-center"
        >
          <span className="font-serif text-2xl text-ink-black font-bold block">100%</span>
          <span className="font-label-caps text-[9px] text-slate-taupe tracking-wider uppercase">
            Private Tailormade Journeys
          </span>
        </motion.div>
      </div>

      {/* Image 2 (Right: Kerala Backwaters - Staggered) */}
      <div className="space-y-4 pt-8">
        {/* Accompanying Dark Stat Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 * durationFactor, delay: 0.3 * durationFactor }}
          className="p-4 bg-ink-black text-alabaster-cream border border-silk-border rounded-lg text-center shadow-md"
        >
          <span className="font-serif text-2xl text-secondary-container font-bold block">24/7</span>
          <span className="font-label-caps text-[9px] text-white/70 tracking-wider uppercase">
            Dedicated Concierge Care
          </span>
        </motion.div>

        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-silk-border bg-surface-dim shadow-sm group">
          {/* Animated Image */}
          <motion.div
            initial={{ scale: 1.2, filter: 'blur(10px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2 * durationFactor, delay: 0.25 * durationFactor, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            <Image
              src="/images/welcome/backwaters-twilight.jpg"
              alt="Kerala Backwaters Palm Trees"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Sliding Silk Curtain Mask (Wipes away top-to-bottom) */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.9 * durationFactor, ease: [0.77, 0, 0.175, 1], delay: 0.35 * durationFactor }}
            style={{ originY: 1 }}
            className="absolute inset-0 bg-ink-black z-20"
          />
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// STYLE 2: ASYMMETRIC 3D PARALLAX & FLOAT DRIFT
// =========================================================================

function Float3DAnimation({ durationFactor }: { durationFactor: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 relative py-4 perspective-1000">
      {/* Left Column */}
      <motion.div
        initial={{ opacity: 0, y: 60, rotateZ: -4, rotateY: 8 }}
        animate={{ opacity: 1, y: 0, rotateZ: -1.5, rotateY: 0 }}
        transition={{ duration: 1.1 * durationFactor, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-silk-border shadow-md group">
          <Image
            src="/images/welcome/taj-balcony-sunrise.jpg"
            alt="Taj Mahal Balcony View"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-black/40 to-transparent opacity-60" />
        </div>
        <div className="p-4 bg-cream-container border border-silk-border rounded-lg text-center">
          <span className="font-serif text-2xl text-ink-black font-bold block">100%</span>
          <span className="font-label-caps text-[9px] text-slate-taupe tracking-wider uppercase">
            Private Tailormade Journeys
          </span>
        </div>
      </motion.div>

      {/* Right Column */}
      <motion.div
        initial={{ opacity: 0, y: -60, rotateZ: 4, rotateY: -8 }}
        animate={{ opacity: 1, y: 0, rotateZ: 1.5, rotateY: 0 }}
        transition={{ duration: 1.1 * durationFactor, delay: 0.15 * durationFactor, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 pt-8"
      >
        <div className="p-4 bg-ink-black text-alabaster-cream border border-silk-border rounded-lg text-center shadow-md">
          <span className="font-serif text-2xl text-secondary-container font-bold block">24/7</span>
          <span className="font-label-caps text-[9px] text-white/70 tracking-wider uppercase">
            Dedicated Concierge Care
          </span>
        </div>
        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-silk-border shadow-md group">
          <Image
            src="/images/welcome/backwaters-twilight.jpg"
            alt="Kerala Backwaters Palm Trees"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-black/40 to-transparent opacity-60" />
        </div>
      </motion.div>
    </div>
  );
}

// =========================================================================
// STYLE 3: MONOGRAPH HAIRLINE BORDER & APERTURE REVEAL
// =========================================================================

function HairlineAnimation({ durationFactor }: { durationFactor: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 relative py-4">
      {/* Left Column */}
      <div className="space-y-4">
        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-transparent p-1 relative">
          {/* Animated Gold Frame */}
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1 * durationFactor }}
            className="absolute inset-0 rounded-lg border-2 border-bronze-hover pointer-events-none z-10"
          />

          {/* Aperture Scale Reveal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 * durationFactor, delay: 0.2 * durationFactor, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative rounded overflow-hidden"
          >
            <Image
              src="/images/welcome/taj-balcony-sunrise.jpg"
              alt="Taj Mahal Balcony View"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 * durationFactor, delay: 0.4 * durationFactor }}
          className="p-4 bg-cream-container border border-silk-border rounded-lg text-center"
        >
          <span className="font-serif text-2xl text-ink-black font-bold block">100%</span>
          <span className="font-label-caps text-[9px] text-slate-taupe tracking-wider uppercase">
            Private Tailormade Journeys
          </span>
        </motion.div>
      </div>

      {/* Right Column */}
      <div className="space-y-4 pt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 * durationFactor, delay: 0.3 * durationFactor }}
          className="p-4 bg-ink-black text-alabaster-cream border border-silk-border rounded-lg text-center shadow-md"
        >
          <span className="font-serif text-2xl text-secondary-container font-bold block">24/7</span>
          <span className="font-label-caps text-[9px] text-white/70 tracking-wider uppercase">
            Dedicated Concierge Care
          </span>
        </motion.div>

        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-transparent p-1 relative">
          {/* Animated Gold Frame */}
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1 * durationFactor, delay: 0.2 * durationFactor }}
            className="absolute inset-0 rounded-lg border-2 border-bronze-hover pointer-events-none z-10"
          />

          {/* Aperture Scale Reveal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 * durationFactor, delay: 0.4 * durationFactor, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative rounded overflow-hidden"
          >
            <Image
              src="/images/welcome/backwaters-twilight.jpg"
              alt="Kerala Backwaters Palm Trees"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// STYLE 4: MAGAZINE OVERLAP & FAN-OUT SPLIT
// =========================================================================

function FanOutAnimation({ durationFactor }: { durationFactor: number }) {
  return (
    <div className="relative py-4 h-96 flex items-center justify-center">
      {/* Left Card (Fans out to Left) */}
      <motion.div
        initial={{ x: 60, y: 0, scale: 0.9, zIndex: 10 }}
        animate={{ x: -70, y: -20, scale: 1, zIndex: 1 }}
        transition={{ duration: 1.1 * durationFactor, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-56 sm:w-64 h-72 rounded-xl overflow-hidden border border-silk-border shadow-xl bg-cream-container"
      >
        <Image
          src="/images/welcome/taj-balcony-sunrise.jpg"
          alt="Taj Mahal Balcony View"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-3 left-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded text-center text-white">
          <span className="font-serif text-lg font-bold block">100% Private</span>
          <span className="font-label-caps text-[8px] uppercase tracking-wider text-white/80">Tailored Route</span>
        </div>
      </motion.div>

      {/* Right Card (Fans out to Right) */}
      <motion.div
        initial={{ x: -60, y: 0, scale: 0.9, zIndex: 10 }}
        animate={{ x: 70, y: 20, scale: 1, zIndex: 2 }}
        transition={{ duration: 1.1 * durationFactor, delay: 0.1 * durationFactor, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-56 sm:w-64 h-72 rounded-xl overflow-hidden border border-silk-border shadow-2xl bg-ink-black"
      >
        <Image
          src="/images/welcome/backwaters-twilight.jpg"
          alt="Kerala Backwaters Palm Trees"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-3 left-3 right-3 p-2 bg-ink-black/85 backdrop-blur-md rounded text-center text-alabaster-cream border border-white/10">
          <span className="font-serif text-lg font-bold text-secondary-container block">24/7 Care</span>
          <span className="font-label-caps text-[8px] uppercase tracking-wider text-white/70">Dedicated Concierge</span>
        </div>
      </motion.div>
    </div>
  );
}

// =========================================================================
// STYLE 5: CINEMATIC WARM LIGHT SWEEP & FILM SHIMMER
// =========================================================================

function ExposureAnimation({ durationFactor }: { durationFactor: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 relative py-4">
      {/* Image 1 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 * durationFactor }}
        className="space-y-4"
      >
        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-silk-border shadow-sm group">
          <Image
            src="/images/welcome/taj-balcony-sunrise.jpg"
            alt="Taj Mahal Balcony View"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Golden Sun Flare Light Sweep */}
          <motion.div
            initial={{ x: '-150%', opacity: 0.9 }}
            animate={{ x: '150%', opacity: 0 }}
            transition={{ duration: 1.4 * durationFactor, ease: 'easeOut', delay: 0.2 * durationFactor }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent skew-x-12 pointer-events-none"
          />
        </div>

        <div className="p-4 bg-cream-container border border-silk-border rounded-lg text-center">
          <span className="font-serif text-2xl text-ink-black font-bold block">100%</span>
          <span className="font-label-caps text-[9px] text-slate-taupe tracking-wider uppercase">
            Private Tailormade Journeys
          </span>
        </div>
      </motion.div>

      {/* Image 2 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 * durationFactor, delay: 0.2 * durationFactor }}
        className="space-y-4 pt-8"
      >
        <div className="p-4 bg-ink-black text-alabaster-cream border border-silk-border rounded-lg text-center shadow-md">
          <span className="font-serif text-2xl text-secondary-container font-bold block">24/7</span>
          <span className="font-label-caps text-[9px] text-white/70 tracking-wider uppercase">
            Dedicated Concierge Care
          </span>
        </div>

        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-silk-border shadow-sm group">
          <Image
            src="/images/welcome/backwaters-twilight.jpg"
            alt="Kerala Backwaters Palm Trees"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Golden Sun Flare Light Sweep */}
          <motion.div
            initial={{ x: '-150%', opacity: 0.9 }}
            animate={{ x: '150%', opacity: 0 }}
            transition={{ duration: 1.4 * durationFactor, ease: 'easeOut', delay: 0.4 * durationFactor }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent skew-x-12 pointer-events-none"
          />
        </div>
      </motion.div>
    </div>
  );
}
