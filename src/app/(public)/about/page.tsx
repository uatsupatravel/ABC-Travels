import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Compass,
  ShieldCheck,
  Award,
  HeartHandshake,
  MapPin,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-alabaster-cream text-ink-black selection:bg-secondary-container selection:text-ink-black">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER: PURPOSE & POSITIONING                                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-20">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-px bg-bronze-hover" />
            <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
              Our Story & Philosophy
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ink-black leading-[1.1] text-balance">
            Born from a Passion to Unveil the <span className="italic font-light">Soul of India</span>
          </h1>

          <p className="font-body-base text-slate-taupe text-sm sm:text-lg leading-relaxed pt-2">
            Headquartered in New Delhi, ABC Travels was founded with a singular purpose: to offer international travelers an intimate, dignified, and unhurried gateway into the extraordinary heritage and landscapes of the Indian subcontinent.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE GENESIS: WHY WE BEGAN (STORY SPLIT)                                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-label-caps text-xs tracking-[0.25em] text-slate-taupe uppercase block">
              The Genesis
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-ink-black font-normal leading-tight">
              Beyond Commercial Tourism: An Intimate Invitation
            </h2>

            <p className="font-body-base text-slate-taupe text-sm sm:text-base leading-relaxed">
              India is one of the most culturally profound and emotionally evocative lands on Earth. Yet for international travelers, planning a journey across the subcontinent can involve logistical friction, including rigid mass-market itineraries, indirect transit routing, and inconsistent service standards.
            </p>

            <p className="font-body-base text-slate-taupe text-sm sm:text-base leading-relaxed">
              We built ABC Travels as an antidote to mass tourism. We believe that true luxury in India is not gold leaf or crowded spectacles; it is <strong className="text-ink-black font-medium">space, unhurried time, authenticity, and peace of mind</strong>.
            </p>

            <p className="font-body-base text-slate-taupe text-sm sm:text-base leading-relaxed">
              As your on-ground host headquartered in the capital, we curate private journeys where you are treated not as a tourist in a database, but as an honored guest. From private heritage palace suites and sunrise boat rides on sacred rivers to dawn tiger safaris with veteran naturalists, every single itinerary is custom-sculpted around your personal rhythm.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-silk-border text-ink-black">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold block text-ink-black">100%</span>
                <span className="font-label-caps text-[10px] text-slate-taupe tracking-wider uppercase">Tailor-Made Departures</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold block text-ink-black">New Delhi</span>
                <span className="font-label-caps text-[10px] text-slate-taupe tracking-wider uppercase">Headquarters & Ops</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold block text-ink-black">24/7</span>
                <span className="font-label-caps text-[10px] text-slate-taupe tracking-wider uppercase">On-Ground Concierge</span>
              </div>
            </div>
          </div>

          {/* Image Slot 1 (Landscape Format) */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-lg overflow-hidden border border-silk-border shadow-sm group">
              <Image
                src="/images/aboutUsPage/image1.jpg"
                alt="Amber Fort Jaipur & Heritage Lake"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 4 TENETS OF THE BOUTIQUE STANDARD                                  */}
      {/* ========================================================================= */}
      <section className="w-full py-20 bg-cream-container border-y border-silk-border mb-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
              The Boutique Distinction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink-black">
              The Four Tenets of Our Craft
            </h2>
            <p className="font-body-base text-slate-taupe text-sm leading-relaxed">
              How our boutique, high-touch approach elevates your journey across the Indian subcontinent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tenet 1 */}
            <div className="bg-alabaster-cream border border-silk-border p-8 rounded-lg space-y-4 shadow-sm">
              <span className="font-label-caps text-xs tracking-widest text-bronze-hover block pb-2 border-b border-silk-border">
                01 / INTIMACY
              </span>
              <h3 className="font-serif text-xl font-semibold text-ink-black">
                Intimacy Over Volume
              </h3>
              <p className="text-xs sm:text-sm text-slate-taupe leading-relaxed">
                We consciously limit the number of active departures we manage. You are never passed down to automated systems; your journey is directly overseen by senior travel designers.
              </p>
            </div>

            {/* Tenet 2 */}
            <div className="bg-alabaster-cream border border-silk-border p-8 rounded-lg space-y-4 shadow-sm">
              <span className="font-label-caps text-xs tracking-widest text-bronze-hover block pb-2 border-b border-silk-border">
                02 / SANCTUARY
              </span>
              <h3 className="font-serif text-xl font-semibold text-ink-black">
                Hand-Vetted Sanctuaries
              </h3>
              <p className="text-xs sm:text-sm text-slate-taupe leading-relaxed">
                We personally inspect every partner property, from historic Taj and Oberoi palace suites to private spice plantation estates and high-altitude Himalayan camps.
              </p>
            </div>

            {/* Tenet 3 */}
            <div className="bg-alabaster-cream border border-silk-border p-8 rounded-lg space-y-4 shadow-sm">
              <span className="font-label-caps text-xs tracking-widest text-bronze-hover block pb-2 border-b border-silk-border">
                03 / SCHOLARS
              </span>
              <h3 className="font-serif text-xl font-semibold text-ink-black">
                Historians & Naturalists
              </h3>
              <p className="text-xs sm:text-sm text-slate-taupe leading-relaxed">
                We don&apos;t use generic tourist guides. You are accompanied by licensed academic historians at monuments and veteran trackers in national wildlife reserves.
              </p>
            </div>

            {/* Tenet 4 */}
            <div className="bg-alabaster-cream border border-silk-border p-8 rounded-lg space-y-4 shadow-sm">
              <span className="font-label-caps text-xs tracking-widest text-bronze-hover block pb-2 border-b border-silk-border">
                04 / GUARDIAN
              </span>
              <h3 className="font-serif text-xl font-semibold text-ink-black">
                Your On-Ground Guardian
              </h3>
              <p className="text-xs sm:text-sm text-slate-taupe leading-relaxed">
                From arrival at Indira Gandhi International Airport to your final flight home, travel in private luxury vehicles with vetted English-speaking chauffeurs and 24/7 concierge backup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. VISUAL EDITORIAL SHOWCASE (3 IMAGE SLOTS WITH GUIDELINES)               */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-24">
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover block">
            Visual Storytelling
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink-black">
            The Tapestry of India We Celebrate
          </h2>
          <p className="font-body-base text-slate-taupe text-sm">
            Three visual chapters illustrating the diversity and dignity of the journeys we sculpt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Image Slot 2 */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-80 rounded-lg overflow-hidden border border-silk-border shadow-sm group">
              <Image
                src="/images/aboutUsPage/image2.jpg"
                alt="Royal Heritage & Dynasties"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/40 via-transparent to-transparent" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-ink-black">Royal Heritage & Dynasties</h4>
              <p className="text-xs text-slate-taupe leading-relaxed">
                Centuries-old living fortresses, palace suites, and royal polo traditions of North India.
              </p>
            </div>
          </div>

          {/* Image Slot 3 */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-80 rounded-lg overflow-hidden border border-silk-border shadow-sm group">
              <Image
                src="/images/aboutUsPage/image3.jpg"
                alt="Sacred Rivers & Traditions"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/40 via-transparent to-transparent" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-ink-black">Sacred Rivers & Traditions</h4>
              <p className="text-xs text-slate-taupe leading-relaxed">
                Witnessing ancient rituals, sacred music, and dawn river contemplation with cultural scholars.
              </p>
            </div>
          </div>

          {/* Image Slot 4 */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-80 rounded-lg overflow-hidden border border-silk-border shadow-sm group">
              <Image
                src="/images/aboutUsPage/image4.jpg"
                alt="Sanctuaries & Untamed Flora"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/40 via-transparent to-transparent" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-ink-black">Sanctuaries & Untamed Flora</h4>
              <p className="text-xs text-slate-taupe leading-relaxed">
                Exclusive open-top wildlife tracking in tiger reserves and luxury glamping in high alpine valleys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUR PLEDGE TO TRAVELERS (TRANSPARENCY & INTEGRITY)                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-24">
        <div className="bg-cream-container border border-silk-border rounded-xl p-8 sm:p-12">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover block">
              Our Code of Integrity
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink-black">
              The ABC Travels Pledge
            </h2>
            <p className="font-body-base text-slate-taupe text-xs sm:text-sm">
              Principles we hold sacred on every single itinerary we craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-ink-black font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-bronze-hover" />
                <span>Zero Commission Tourist Traps</span>
              </div>
              <p className="text-xs text-slate-taupe leading-relaxed">
                We never force unwanted &apos;shopping stops&apos; or kickback tourist emporiums. Your time is precious and 100% dedicated to genuine cultural exploration.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-ink-black font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-bronze-hover" />
                <span>Transparent Direct Rates</span>
              </div>
              <p className="text-xs text-slate-taupe leading-relaxed">
                Direct on-ground partnerships with royal heritage palaces, licensed naturalist teams, and private transport fleets ensure transparent pricing without hidden intermediary fees.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-ink-black font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-bronze-hover" />
                <span>Patronage of Living Heritage</span>
              </div>
              <p className="text-xs text-slate-taupe leading-relaxed">
                A portion of our itineraries supports traditional artisan communities, restoration of historic havelis, and tiger habitat conservation initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CLOSING INVITATION (THE CONCIERGE CALL)                                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-ink-black text-alabaster-cream rounded-xl p-10 sm:p-14 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 border border-silk-border shadow-xl">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <Badge
              variant="secondary"
              className="bg-white/10 text-alabaster-cream border-0 text-[10px] uppercase tracking-widest font-label-caps"
            >
              Private Consultation
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
              Let Us Introduce You to India
            </h2>
            <p className="font-body-base text-white/70 text-sm sm:text-base leading-relaxed">
              Whether you are planning your first voyage to the Golden Triangle or returning to explore the monasteries of Ladakh, our New Delhi concierge desk is at your service.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <Link href="/plan-your-trip" className="w-full sm:w-auto">
              <Button variant="accent" size="lg" className="w-full sm:w-auto px-8 shadow-md">
                Build Custom Itinerary
              </Button>
            </Link>
            <a
              href="https://wa.me/918700406415?text=Hello%20ABC%20Travels%2C%20I%20would%20like%20to%20speak%20with%20your%20concierge%20about%20traveling%20to%20India."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
