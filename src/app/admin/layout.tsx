'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Compass,
  LayoutDashboard,
  Inbox,
  Palmtree,
  MapPin,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      router.push('/admin/login');
    }
  };

  const navItems = [
    { name: 'Overview Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Inquiries CRM', href: '/admin/inquiries', icon: Inbox },
    { name: 'Tour Catalog CMS', href: '/admin/tours', icon: Palmtree },
    { name: 'Destinations CMS', href: '/admin/destinations', icon: MapPin },
    { name: 'Site Audit & Notes', href: '/admin/notes', icon: Layers },
  ];

  return (
    <div className="h-screen w-full overflow-hidden bg-muted/30 text-foreground flex flex-col lg:flex-row">
      {/* Sidebar Desktop (Permanently Fixed h-screen) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-card border-r border-border p-6 justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-muted text-foreground">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-base font-bold tracking-tight block">
                ABC <span className="font-normal text-xs uppercase tracking-widest opacity-80">Portal</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground block">
                Staff Concierge
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-border space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded">↗</span>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <header className="lg:hidden bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5" />
          <span className="font-serif font-bold text-sm">ABC Admin</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 text-foreground hover:bg-muted rounded-md"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-serif text-base font-bold">Admin Navigation</span>
              <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold ${
                      isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-border space-y-2">
            <Link href="/" target="_blank" className="block">
              <Button variant="outline" size="sm" className="w-full text-xs uppercase tracking-wider">
                Live Website ↗
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
              className="w-full text-xs uppercase tracking-wider"
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}

      {/* Main Admin Content Body */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="bg-card border-b border-border px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-foreground" />
            <span>Authenticated Session • Role: <strong>Senior Concierge</strong></span>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <div className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-full text-[10px] font-semibold text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Inbound Leads Live</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex-grow">{children}</div>
      </main>
    </div>
  );
}
