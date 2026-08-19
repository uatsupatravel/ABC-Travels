import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
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
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="antialiased min-h-screen flex flex-col selection:bg-luxury-gold/30 selection:text-luxury-navy">
        {children}
      </body>
    </html>
  );
}
