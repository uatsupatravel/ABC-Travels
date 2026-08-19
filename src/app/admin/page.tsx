'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getInquiries, updateInquiryStatus, getAdminStats } from '@/lib/data-service';
import { Inquiry, InquiryStatus } from '@/types';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Inbox,
  CheckCircle2,
  FileText,
  ArrowRight,
  Sparkles,
  Palmtree,
  MapPin,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<any>(null);

  const loadData = async () => {
    try {
      const [inqData, statsData] = await Promise.all([getInquiries(), getAdminStats()]);
      setInquiries(inqData);
      setStats(statsData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    await updateInquiryStatus(id, newStatus);
    loadData();
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'NEW':
        return <Badge variant="default" className="text-[10px]">New Lead</Badge>;
      case 'CONTACTED':
        return <Badge variant="secondary" className="text-[10px]">Contacted</Badge>;
      case 'PROPOSAL_SENT':
        return <Badge variant="outline" className="text-[10px]">Proposal Sent</Badge>;
      case 'CONFIRMED':
        return <Badge variant="accent" className="text-[10px]">Confirmed</Badge>;
      case 'ARCHIVED':
        return <Badge variant="secondary" className="text-[10px]">Archived</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Concierge Management Dashboard
          </h1>
          <p className="text-muted-foreground text-xs mt-1">
            Real-time inbound leads, custom proposal tracking, and catalog overview.
          </p>
        </div>

        <Link href="/admin/inquiries">
          <Button size="sm" className="text-xs uppercase tracking-wider font-semibold gap-2">
            <Inbox className="w-3.5 h-3.5" />
            <span>Full Lead Pipeline</span>
          </Button>
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              Total Inquiries
            </span>
            <Inbox className="w-4 h-4" />
          </div>
          <div className="font-serif text-2xl font-bold text-foreground">
            {stats?.totalInquiries ?? inquiries.length}
          </div>
          <span className="text-[11px] text-muted-foreground block">Inbound international leads</span>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              New Leads
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="font-serif text-2xl font-bold text-foreground">
            {stats?.newLeads ?? 0}
          </div>
          <span className="text-[11px] text-muted-foreground block">Pending outreach</span>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              Proposals Sent
            </span>
            <FileText className="w-4 h-4" />
          </div>
          <div className="font-serif text-2xl font-bold text-foreground">
            {stats?.proposals ?? 0}
          </div>
          <span className="text-[11px] text-muted-foreground block">Active custom quotes</span>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              Confirmed Bookings
            </span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="font-serif text-2xl font-bold text-foreground">
            {stats?.confirmed ?? 0}
          </div>
          <span className="text-[11px] text-muted-foreground block">Deposits confirmed</span>
        </Card>
      </div>

      {/* Recent Inquiries Table */}
      <Card className="p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Inbox className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-serif text-base font-bold text-foreground">
              Recent Lead Inflow
            </h2>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs text-foreground hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-semibold">Traveler / Contact</th>
                <th className="pb-3 font-semibold">Requested Journey</th>
                <th className="pb-3 font-semibold">Date & Duration</th>
                <th className="pb-3 font-semibold">Budget Tier</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inquiries.slice(0, 5).map((inq) => (
                <tr key={inq.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3.5">
                    <div className="font-semibold text-foreground text-xs">{inq.traveler_name}</div>
                    <div className="text-muted-foreground text-[11px] flex items-center gap-1.5 mt-0.5">
                      <span>{inq.country}</span>
                      <span>•</span>
                      <span>{inq.email}</span>
                    </div>
                  </td>

                  <td className="py-3.5">
                    <div className="font-medium text-foreground line-clamp-1 max-w-xs">
                      {inq.tour_title || 'Custom Tailormade Route'}
                    </div>
                    <div className="text-muted-foreground text-[10px]">
                      {inq.guests_count} Guests
                    </div>
                  </td>

                  <td className="py-3.5">
                    <div className="text-foreground">{inq.departure_date ? formatDate(inq.departure_date) : 'Flexible'}</div>
                    <div className="text-muted-foreground text-[10px]">{inq.duration_days} Days</div>
                  </td>

                  <td className="py-3.5">
                    <span className="text-muted-foreground text-[11px]">{inq.budget_tier}</span>
                  </td>

                  <td className="py-3.5">{getStatusBadge(inq.status)}</td>

                  <td className="py-3.5 text-right">
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                      className="h-8 rounded-md border border-input bg-background px-2 text-[11px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="PROPOSAL_SENT">Proposal Sent</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/tours">
          <Card className="p-5 space-y-2 hover:border-foreground/30 transition-colors">
            <div className="flex items-center justify-between">
              <Palmtree className="w-5 h-5 text-muted-foreground" />
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-base font-bold text-foreground">Tour Catalog CMS</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Review live packages, duration, pricing in USD/INR, and daily itineraries.
            </p>
          </Card>
        </Link>

        <Link href="/admin/destinations">
          <Card className="p-5 space-y-2 hover:border-foreground/30 transition-colors">
            <div className="flex items-center justify-between">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-base font-bold text-foreground">Destinations CMS</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              View destination guide pages (Rajasthan, Kerala, Ladakh, Varanasi, Goa, Ranthambore).
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
