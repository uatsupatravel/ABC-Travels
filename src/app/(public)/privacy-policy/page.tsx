import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy & Data Governance | ABC Travels India',
  description: 'Learn how ABC Travels protects and handles personal information in accordance with international data privacy standards for travelers worldwide.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-24 bg-alabaster-cream text-ink-black selection:bg-secondary-container selection:text-ink-black">
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-xs font-label-caps uppercase tracking-wider text-slate-taupe hover:text-ink-black transition-colors"
          >
            ← Return to Home
          </Link>
        </div>

        {/* Page Header */}
        <header className="space-y-3 pb-8 border-b border-silk-border mb-12">
          <span className="font-label-caps text-xs tracking-[0.25em] uppercase text-slate-taupe block">
            Legal & Data Governance
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink-black leading-tight">
            Privacy Policy & Data Governance
          </h1>

          <p className="font-body-base text-slate-taupe text-xs sm:text-sm leading-relaxed">
            Last updated: September 2026 • ABC Travels Private Limited, New Delhi, India
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-10 text-slate-taupe font-body-base leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ink-black font-medium">
              1. Global Scope & Our Commitment
            </h2>
            <p>
              ABC Travels (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is an inbound luxury Destination Management Company (DMC) headquartered in New Delhi, India. We warmly welcome and serve discerning travelers from every continent and nation across the globe.
            </p>
            <p>
              To ensure the highest standard of international transparency and security, our data governance practices are built to align with leading global privacy benchmarks, including the General Data Protection Regulation (EU/UK GDPR), the California Consumer Privacy Act (CCPA), and India&apos;s Digital Personal Data Protection Act (DPDP Act 2023). We extend these comprehensive privacy protections universally to all our guests, regardless of where in the world you reside.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ink-black font-medium">
              2. Information We Collect
            </h2>
            <p>
              To curate, book, and execute private luxury travel across India, we collect only the personal information strictly necessary to fulfill your journey:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
              <li>
                <strong className="text-ink-black">Identity & Contact Details:</strong> Full legal names, titles, email addresses, telephone/WhatsApp contact numbers, country of residence, and billing details.
              </li>
              <li>
                <strong className="text-ink-black">Travel Logistics & Regulatory Documentation:</strong> Passport copies, nationality, date of birth, and visa details. In India, these are legally required by government authorities for:
                <ul className="list-circle pl-6 pt-1 space-y-1 text-xs sm:text-sm">
                  <li>Mandatory hotel guest registration (Government of India Form C for foreign nationals).</li>
                  <li>State Forest Department entry permits for national tiger safari reserves (e.g., Ranthambore).</li>
                  <li>Domestic flight ticketing and luxury heritage train reservations.</li>
                </ul>
              </li>
              <li>
                <strong className="text-ink-black">Wellness & Culinary Preferences:</strong> Dietary restrictions, allergies, bedding preferences, special celebration milestones (anniversaries, birthdays), and mobility needs to ensure your palace suites and excursions are tailored to your comfort.
              </li>
              <li>
                <strong className="text-ink-black">Technical & Site Interaction Data:</strong> Anonymized browser type, IP address, general geographic location, and interaction logs to ensure our digital platform operates securely and efficiently.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ink-black font-medium">
              3. Lawful Grounds & Purposes of Processing
            </h2>
            <p>We process your personal information under the following recognized lawful grounds:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 border border-silk-border bg-cream-container rounded-lg space-y-2">
                <span className="font-label-caps text-xs tracking-wider uppercase text-ink-black font-semibold block">
                  Performance of Contract
                </span>
                <p className="text-xs sm:text-sm">
                  To design custom travel proposals, confirm 5-star palace and resort reservations, coordinate private chauffeured transfers, and provide 24/7 on-ground concierge support throughout your journey.
                </p>
              </div>

              <div className="p-5 border border-silk-border bg-cream-container rounded-lg space-y-2">
                <span className="font-label-caps text-xs tracking-wider uppercase text-ink-black font-semibold block">
                  Legal & Regulatory Compliance
                </span>
                <p className="text-xs sm:text-sm">
                  To satisfy mandatory Indian civil aviation security, national park wildlife sanctuary protocols, foreign national registration laws, and accounting/tax reporting regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ink-black font-medium">
              4. Strict Zero-Selling Policy & Third-Party Disclosure
            </h2>
            <div className="p-6 bg-ink-black text-alabaster-cream rounded-lg space-y-2">
              <span className="text-secondary-container font-serif font-semibold text-base block">
                Our Absolute Guarantee
              </span>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                ABC Travels <strong>never</strong> sells, rents, leases, or trades your personal information to third-party data brokers, marketing firms, or external advertising networks.
              </p>
            </div>
            <p className="pt-2">
              Your information is disclosed strictly on a confidential, need-to-know basis to verified partners directly involved in fulfilling your itinerary:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm">
              <li>Handpicked luxury palace and resort partners (e.g., Oberoi Hotels & Resorts, Taj Heritage Palaces).</li>
              <li>Aviation carriers and transport authorities for private transfers.</li>
              <li>State Forest and Wildlife Departments for restricted tiger reserve entry passes.</li>
              <li>Dedicated, vetted private chauffeurs and licensed academic historians.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ink-black font-medium">
              5. Cookies & Analytics
            </h2>
            <p>
              Our website uses standard, non-invasive cookies and analytics identifiers to ensure core site functionality, remember your regional currency preference (USD/INR), and analyze aggregate website performance. We do not use third-party behavioral advertising trackers. You can adjust or disable cookies at any time through your browser settings.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ink-black font-medium">
              6. Data Security & Retention
            </h2>
            <p>
              All data transmitted to ABC Travels is protected by 256-bit SSL (Secure Sockets Layer) encryption. We maintain strict physical, administrative, and electronic controls to safeguard your information against unauthorized access, loss, or alteration.
            </p>
            <p>
              We retain personal data only for as long as necessary to complete your travel arrangements and satisfy mandatory tax, accounting, and legal audit requirements. Sensitive travel identification (such as passport copies used for safari permits) is securely purged following the conclusion of your journey.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ink-black font-medium">
              7. Universal Privacy Rights for All Guests
            </h2>
            <p>
              Regardless of your citizenship or home country, ABC Travels grants comprehensive data privacy rights to all travelers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
              <div className="p-4 border border-silk-border rounded-lg bg-cream-container">
                <strong className="text-ink-black block pb-1">Right to Access</strong>
                Request a copy of the personal data we hold about you.
              </div>
              <div className="p-4 border border-silk-border rounded-lg bg-cream-container">
                <strong className="text-ink-black block pb-1">Right to Rectification</strong>
                Request correction of any inaccurate or incomplete details.
              </div>
              <div className="p-4 border border-silk-border rounded-lg bg-cream-container">
                <strong className="text-ink-black block pb-1">Right to Erasure (&ldquo;To Be Forgotten&rdquo;)</strong>
                Request deletion of your data once legal retention periods expire.
              </div>
              <div className="p-4 border border-silk-border rounded-lg bg-cream-container">
                <strong className="text-ink-black block pb-1">Right to Withdraw Consent</strong>
                Opt-out of any marketing or newsletter communications at any time.
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-ink-black font-medium">
              8. Protection of Minors & Family Travel
            </h2>
            <p>
              When families travel with us, we collect personal information of minors (under 18 years of age) solely with explicit parental or legal guardian consent to arrange appropriate family accommodations, flight ticketing, and wildlife permits. We do not knowingly collect personal data directly from children without guardian involvement.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3 pt-4 border-t border-silk-border">
            <h2 className="font-serif text-xl sm:text-2xl text-ink-black font-medium">
              9. Contact Our Data Governance & Concierge Desk
            </h2>
            <p>
              For any questions regarding this Privacy Policy, data access requests, or privacy inquiries, please contact our New Delhi Senior Concierge Desk directly:
            </p>

            <div className="p-6 border border-silk-border bg-cream-container rounded-lg space-y-2 text-xs sm:text-sm text-ink-black">
              <p>
                <strong>ABC Travels Private Limited</strong>
              </p>
              <p className="text-slate-taupe">
                Headquarters: Janpath, Connaught Place, New Delhi 110001, India
              </p>
              <p className="text-slate-taupe">
                Email:{' '}
                <a href="mailto:concierge@abctravels.com" className="text-ink-black underline">
                  concierge@abctravels.com
                </a>
              </p>
              <p className="text-slate-taupe">
                Phone:{' '}
                <a href="tel:+918700406415" className="text-ink-black underline">
                  +91 87004 06415
                </a>{' '}
                (24/7 Concierge Desk)
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
