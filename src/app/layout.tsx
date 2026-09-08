import type { Metadata } from 'next';
import { Bodoni_Moda, Hanken_Grotesk } from 'next/font/google';
import './globals.css';

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ABC Travels | Luxury & Adventure Tailormade Journeys Across India',
  description:
    'Experience the majesty of India. Tailormade luxury itineraries, private palace stays, royal tiger safaris, Himalayan glamping, and tranquil Kerala backwater cruises for international travelers.',
  keywords: [
    'Luxury Travel India',
    'Tailormade India Itineraries',
    'Taj Lake Palace Udaipur',
    'Ranthambore Tiger Safari',
    'Kerala Luxury Houseboat',
    'Ladakh Glamping',
    'Golden Triangle Luxury Tour',
    'Inbound Travel Agency India',
  ],
  authors: [{ name: 'ABC Travels Concierge' }],
  openGraph: {
    title: 'ABC Travels | Luxury Inbound Journeys in India',
    description: 'Curated luxury adventures, private heritage palaces, and tailormade journeys for discerning travelers.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ABC Travels',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bodoniModa.variable} ${hankenGrotesk.variable}`}>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen flex flex-col bg-alabaster-cream text-ink-black font-body-base"
      >
        {children}
      </body>
    </html>
  );
}
