'use client';

import React, { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus } from '@/lib/data-service';
import { Inquiry, InquiryStatus } from '@/types';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import {
  Inbox,
  Search,
  Eye,
  X,
  PhoneCall,
  Mail,
  Save,
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  const loadData = async () => {
    const data = await getInquiries();
    setInquiries(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusUpdate = async (id: string, status: InquiryStatus) => {
    await updateInquiryStatus(id, status);
    loadData();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setIsSavingNote(true);
    try {
      const updated = await updateInquiryStatus(
        selectedInquiry.id,
        selectedInquiry.status,
        adminNoteInput
      );
      if (updated) {
        setSelectedInquiry(updated);
        loadData();
      }
    } finally {
      setIsSavingNote(false);
    }
  };

  const openInquiryModal = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setAdminNoteInput(inq.admin_notes || '');
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (activeTab !== 'ALL' && inq.status !== activeTab) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = inq.traveler_name.toLowerCase().includes(q);
      const matchEmail = inq.email.toLowerCase().includes(q);
      const matchCountry = inq.country.toLowerCase().includes(q);
      const matchTour = inq.tour_title?.toLowerCase().includes(q) ?? false;
      if (!matchName && !matchEmail && !matchCountry && !matchTour) return false;
    }
    return true;
  });

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

  const tabs = [
    { id: 'ALL', label: 'All Leads', count: inquiries.length },
    { id: 'NEW', label: 'New', count: inquiries.filter((i) => i.status === 'NEW').length },
    { id: 'CONTACTED', label: 'Contacted', count: inquiries.filter((i) => i.status === 'CONTACTED').length },
    { id: 'PROPOSAL_SENT', label: 'Proposals', count: inquiries.filter((i) => i.status === 'PROPOSAL_SENT').length },
    { id: 'CONFIRMED', label: 'Confirmed', count: inquiries.filter((i) => i.status === 'CONFIRMED').length },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          Inbound Inquiries & Lead CRM
        </h1>
        <p className="text-muted-foreground text-xs mt-1">
          Manage incoming traveler inquiries, record quotes, and update lead pipeline status.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <Card className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="text-xs uppercase tracking-wider gap-1.5"
            >
              <span>{tab.label}</span>
              <span className="text-[10px] opacity-70">
                ({tab.count})
              </span>
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Input
            type="text"
            placeholder="Search by name, country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-xs h-9"
          />
          <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-3" />
        </div>
      </Card>

      {/* Inquiries Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground uppercase tracking-wider text-[10px] border-b border-border">
              <tr>
                <th className="py-3 px-5 font-semibold">Traveler Details</th>
                <th className="py-3 px-4 font-semibold">Journey Requested</th>
                <th className="py-3 px-4 font-semibold">Departure / Guests</th>
                <th className="py-3 px-4 font-semibold">Budget Tier</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-foreground text-xs">{inq.traveler_name}</div>
                      <div className="text-muted-foreground text-[11px] flex items-center gap-1.5 mt-0.5">
                        <span className="text-foreground">{inq.country}</span>
                        <span>•</span>
                        <span>{inq.email}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-foreground line-clamp-1 max-w-xs">
                        {inq.tour_title || 'Custom India Tailormade Journey'}
                      </div>
                      <span className="text-muted-foreground text-[10px]">
                        Inquired {formatDate(inq.created_at)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-foreground">{inq.departure_date ? formatDate(inq.departure_date) : 'Flexible Dates'}</div>
                      <div className="text-muted-foreground text-[10px]">
                        {inq.duration_days} Days • {inq.guests_count} Guests
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-muted-foreground font-medium text-[11px]">
                        {inq.budget_tier}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">{getStatusBadge(inq.status)}</td>

                    <td className="py-3.5 px-5 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openInquiryModal(inq)}
                        className="text-xs h-8 gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-muted-foreground">
                    No leads found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detailed Lead Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedInquiry(null)} />

          <div className="min-h-full flex items-center justify-center p-4">
            <Card
              className="relative bg-card text-card-foreground rounded-lg max-w-2xl w-full p-6 sm:p-8 border-border shadow-xl space-y-5 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                    Lead ID: #{selectedInquiry.id}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {selectedInquiry.traveler_name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Update Bar */}
              <div className="bg-muted/40 p-3 rounded-md border border-border flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Pipeline Status:
                </span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusUpdate(selectedInquiry.id, e.target.value as InquiryStatus)}
                  className="h-8 rounded-md border border-input bg-background px-2.5 text-xs font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="NEW">New Lead</option>
                  <option value="CONTACTED">Contacted Traveler</option>
                  <option value="PROPOSAL_SENT">Proposal / Quote Sent</option>
                  <option value="CONFIRMED">Confirmed / Booked</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-muted/30 p-3 rounded-md border border-border space-y-1">
                  <span className="text-muted-foreground uppercase tracking-wider text-[10px] block font-semibold">
                    Contact Channels
                  </span>
                  <div className="flex items-center gap-1.5 text-foreground">
                    <Mail className="w-3 h-3 text-muted-foreground shrink-0" />
                    <a href={`mailto:${selectedInquiry.email}`} className="hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                  {selectedInquiry.phone && (
                    <div className="flex items-center gap-1.5 text-foreground pt-0.5">
                      <PhoneCall className="w-3 h-3 text-muted-foreground shrink-0" />
                      <a
                        href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {selectedInquiry.phone} (WhatsApp)
                      </a>
                    </div>
                  )}
                </div>

                <div className="bg-muted/30 p-3 rounded-md border border-border space-y-1">
                  <span className="text-muted-foreground uppercase tracking-wider text-[10px] block font-semibold">
                    Travel Parameters
                  </span>
                  <div><strong>Country:</strong> {selectedInquiry.country}</div>
                  <div><strong>Departure:</strong> {selectedInquiry.departure_date ? formatDate(selectedInquiry.departure_date) : 'Flexible'}</div>
                  <div><strong>Party:</strong> {selectedInquiry.guests_count} Guests • {selectedInquiry.duration_days} Days</div>
                </div>
              </div>

              {/* Requested Journey */}
              <div className="bg-muted/30 p-3 rounded-md border border-border text-xs space-y-1">
                <span className="text-muted-foreground uppercase tracking-wider text-[10px] block font-semibold">
                  Requested Itinerary
                </span>
                <div className="font-serif font-bold text-foreground text-sm">
                  {selectedInquiry.tour_title || 'Custom India Tailormade Journey'}
                </div>
                <div className="text-muted-foreground">
                  Tier: {selectedInquiry.budget_tier}
                </div>
              </div>

              {/* Special Requests */}
              {selectedInquiry.special_requests && (
                <div className="bg-muted/30 p-3 rounded-md border border-border text-xs space-y-1">
                  <span className="text-muted-foreground uppercase tracking-wider text-[10px] block font-semibold">
                    Special Requests
                  </span>
                  <p className="text-foreground italic leading-relaxed">
                    &ldquo;{selectedInquiry.special_requests}&rdquo;
                  </p>
                </div>
              )}

              {/* Internal Notes */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Internal Staff Notes
                </label>
                <Textarea
                  rows={3}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="Record quote proposals, hotel confirmations..."
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveNotes}
                    disabled={isSavingNote}
                    size="sm"
                    className="text-xs gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSavingNote ? 'Saving...' : 'Save Notes'}</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
