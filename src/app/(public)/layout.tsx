import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-luxury-ivory text-luxury-navy">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
