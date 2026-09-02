'use client';

import React, { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus } from '@/lib/data-service';
import { Inquiry, InquiryStatus } from '@/types';
import { formatDate, formatUSD, formatINR } from '@/lib/utils';
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
  Download,
  MessageCircle,
  Copy,
  Check,
  Send,
  FileText,
  Crown,
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Proposal Generator State
  const [modalTab, setModalTab] = useState<'details' | 'proposal'>('details');
  const [quotePricePerPersonUSD, setQuotePricePerPersonUSD] = useState<number>(3800);
  const [quoteHotelPicks, setQuoteHotelPicks] = useState<string>(
    'The Oberoi Amarvilas (Agra) • Taj Lake Palace (Udaipur) • Rambagh Palace (Jaipur)'
  );
  const [quoteHighlights, setQuoteHighlights] = useState<string>(
    'Private Sunrise Taj Mahal Access • Royal Lake Pichola Boat Charter • Guided Amber Fort Excursion with Senior Historian'
  );
  const [quoteInclusions, setQuoteInclusions] = useState<string>(
    'Private Chauffeured Executive SUV throughout • VIP Airport Meet & Greet • 24/7 Dedicated Concierge Host • All Heritage Monument Passes & Luxury Taxes'
  );
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [showStatusPrompt, setShowStatusPrompt] = useState<boolean>(false);

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
    setModalTab('details');
    setShowStatusPrompt(false);

    // Smart default pricing based on tier
    let defaultPrice = 3800;
    if (inq.budget_tier?.includes('Luxury') || inq.budget_tier?.includes('$$$')) {
      defaultPrice = 6500;
    } else if (inq.budget_tier?.includes('Budget') || inq.budget_tier?.includes('$')) {
      defaultPrice = 2200;
    }
    setQuotePricePerPersonUSD(defaultPrice);

    // Smart defaults based on journey requested
    if (inq.tour_title?.toLowerCase().includes('kerala')) {
      setQuoteHotelPicks('Kumarakom Lake Resort • Brunton Boatyard (Kochi) • Spice Village (Thekkady)');
      setQuoteHighlights('Private Luxury Houseboat Cruise • Kathakali Performance • Sunset Arabian Sea Sail');
    } else if (inq.tour_title?.toLowerCase().includes('ladakh')) {
      setQuoteHotelPicks('The Grand Dragon Ladakh • Chamba Camp Thiksey • Luxury Yurts in Nubra');
      setQuoteHighlights('Pangong Tso Private Expedition • Hemis & Thiksey Monasteries • Nubra Valley Camels');
    } else {
      setQuoteHotelPicks('The Oberoi Amarvilas (Agra) • Taj Lake Palace (Udaipur) • Rambagh Palace (Jaipur)');
      setQuoteHighlights('Private Sunrise Taj Mahal Access • Royal Lake Pichola Boat Charter • Guided Amber Fort Excursion');
    }
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

  // Export to CSV Function
  const exportToCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries available to export.');
      return;
    }

    const dataToExport = filteredInquiries.length > 0 ? filteredInquiries : inquiries;

    const headers = [
      'Inquiry ID',
      'Date Submitted',
      'Status',
      'Traveler Name',
      'Email',
      'Phone',
      'Country',
      'Requested Journey',
      'Departure Date',
      'Duration (Days)',
      'Guests Count',
      'Budget Tier',
      'Travel Styles',
      'Special Requests',
      'Admin Notes',
    ];

    const csvRows = [
      headers.join(','),
      ...dataToExport.map((inq) => {
        const escapeCSV = (field: any) => {
          if (field === null || field === undefined) return '""';
          const stringified = String(field).replace(/"/g, '""');
          return `"${stringified}"`;
        };

        return [
          escapeCSV(inq.id),
          escapeCSV(inq.created_at ? new Date(inq.created_at).toISOString().split('T')[0] : ''),
          escapeCSV(inq.status),
          escapeCSV(inq.traveler_name),
          escapeCSV(inq.email),
          escapeCSV(inq.phone || 'N/A'),
          escapeCSV(inq.country),
          escapeCSV(inq.tour_title || 'Custom Itinerary'),
          escapeCSV(inq.departure_date || 'Flexible'),
          escapeCSV(inq.duration_days || ''),
          escapeCSV(inq.guests_count || ''),
          escapeCSV(inq.budget_tier || ''),
          escapeCSV(Array.isArray(inq.travel_styles) ? inq.travel_styles.join('; ') : ''),
          escapeCSV(inq.special_requests || ''),
          escapeCSV(inq.admin_notes || ''),
        ].join(',');
      }),
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `abc-travels-leads-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate WhatsApp Proposal String
  const generateWhatsAppProposal = () => {
    if (!selectedInquiry) return '';
    const guests = selectedInquiry.guests_count || 2;
    const totalUSD = quotePricePerPersonUSD * guests;
    const totalINR = totalUSD * 83;

    return `*NAMASTE & GREETINGS FROM ABC TRAVELS INDIA* 🇮🇳

Dear ${selectedInquiry.traveler_name},

Thank you for contacting our New Delhi Concierge Desk. It is our absolute pleasure to present your curated private proposal for:

🏛️ *Journey:* ${selectedInquiry.tour_title || 'Bespoke India Custom Tour'}
⏳ *Duration:* ${selectedInquiry.duration_days || 10} Days / ${(selectedInquiry.duration_days || 10) - 1} Nights
👥 *Party:* ${guests} Travelers (${selectedInquiry.country})
📅 *Proposed Departure:* ${selectedInquiry.departure_date ? formatDate(selectedInquiry.departure_date) : 'Flexible Dates / Season of Choice'}

━━━━━━━━━━━━━━━━━━━━
🏨 *CURATED PALACE & SANCTUARY STAYS:*
${quoteHotelPicks}

🗺️ *SIGNATURE HIGHLIGHTS:*
${quoteHighlights}

💎 *VIP INCLUSIONS:*
${quoteInclusions}

━━━━━━━━━━━━━━━━━━━━
💳 *INVESTMENT SUMMARY:*
• *USD $${quotePricePerPersonUSD.toLocaleString()}* per guest (approx. ₹${(quotePricePerPersonUSD * 83).toLocaleString()})
• *Total Private Tour Investment:* *USD $${totalUSD.toLocaleString()}* (approx. ₹${totalINR.toLocaleString()} for ${guests} guests)
• _All private chauffeur transfers, taxes, permits & senior guides included._

We would be delighted to refine any aspect of this itinerary to match your exact rhythm.

Warmest regards,
*Senior Concierge Team*
ABC Travels Private Limited • New Delhi
WhatsApp: +91 87004 06415
Email: concierge@abctravels.com`;
  };

  // Generate Email Proposal String
  const generateEmailProposal = () => {
    if (!selectedInquiry) return '';
    const guests = selectedInquiry.guests_count || 2;
    const totalUSD = quotePricePerPersonUSD * guests;

    return `Dear ${selectedInquiry.traveler_name},

Greetings from ABC Travels New Delhi.

Following your recent travel inquiry, our Senior Concierge has crafted a personalized bespoke proposal for your upcoming journey across India.

==================================================
JOURNEY OVERVIEW: ${selectedInquiry.tour_title || 'Bespoke Tailormade Journey'}
==================================================
• Duration: ${selectedInquiry.duration_days || 10} Days
• Guests: ${guests} Travelers
• Target Departure: ${selectedInquiry.departure_date ? formatDate(selectedInquiry.departure_date) : 'Custom Schedule'}

HANDPICKED ACCOMMODATIONS:
${quoteHotelPicks}

EXPERIENCE HIGHLIGHTS:
${quoteHighlights}

VIP INCLUSIONS:
${quoteInclusions}

INVESTMENT:
• Rate per person: $${quotePricePerPersonUSD.toLocaleString()} USD
• Total private arrangement: $${totalUSD.toLocaleString()} USD (All luxury taxes & private transport included)

Please let us know if you would like to adjust the pace, add specific palace properties, or schedule a phone consultation.

With warm regards,

The Executive Concierge Desk
ABC Travels Private Limited
New Delhi 110001, India
Direct / WhatsApp: +91 87004 06415
Email: concierge@abctravels.com`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(type);
    setTimeout(() => setIsCopied(null), 3000);
  };

  const handleSendWhatsAppProposal = () => {
    if (!selectedInquiry) return;
    const text = generateWhatsAppProposal();
    const phoneClean = (selectedInquiry.phone || '').replace(/[^0-9]/g, '');
    const url = `https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
    setShowStatusPrompt(true);
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

  const tabs = [
    { id: 'ALL', label: 'All Leads', count: inquiries.length },
    { id: 'NEW', label: 'New', count: inquiries.filter((i) => i.status === 'NEW').length },
    { id: 'CONTACTED', label: 'Contacted', count: inquiries.filter((i) => i.status === 'CONTACTED').length },
    { id: 'PROPOSAL_SENT', label: 'Proposals', count: inquiries.filter((i) => i.status === 'PROPOSAL_SENT').length },
    { id: 'CONFIRMED', label: 'Confirmed', count: inquiries.filter((i) => i.status === 'CONFIRMED').length },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Inbound Inquiries & Lead CRM
          </h1>
          <p className="text-muted-foreground text-xs mt-1">
            Manage incoming traveler inquiries, generate custom quotes, and update lead pipeline status.
          </p>
        </div>

        <Button
          onClick={exportToCSV}
          variant="outline"
          size="sm"
          className="text-xs uppercase tracking-wider font-semibold gap-2 border-border"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export to CSV ({filteredInquiries.length})</span>
        </Button>
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
            placeholder="Search by name, country, email..."
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
                      <div className="flex items-center justify-end gap-1.5">
                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.traveler_name)}%2C%20thank%20you%20for%20contacting%20ABC%20Travels.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded border border-border hover:bg-muted text-[#25D366] transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openInquiryModal(inq)}
                          className="text-xs h-8 gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </Button>
                      </div>
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

      {/* Detailed Lead Modal with Integrated 1-Click Proposal Generator */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedInquiry(null)} />

          <div className="min-h-full flex items-center justify-center p-4">
            <Card
              className="relative bg-card text-card-foreground rounded-lg max-w-3xl w-full p-6 sm:p-8 border-border shadow-2xl space-y-6 my-8 animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                    Lead ID: #{selectedInquiry.id}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {selectedInquiry.traveler_name}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Tabs Navigation */}
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <Button
                  variant={modalTab === 'details' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setModalTab('details')}
                  className="text-xs gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Lead Details & Notes</span>
                </Button>

                <Button
                  variant={modalTab === 'proposal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setModalTab('proposal')}
                  className="text-xs gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>1-Click Proposal Generator</span>
                </Button>
              </div>

              {/* TAB 1: LEAD DETAILS & NOTES */}
              {modalTab === 'details' && (
                <div className="space-y-5">
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
                    <div className="bg-muted/30 p-3.5 rounded-md border border-border space-y-2">
                      <span className="text-muted-foreground uppercase tracking-wider text-[10px] block font-semibold">
                        Direct Contact Channels
                      </span>
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <a href={`mailto:${selectedInquiry.email}`} className="hover:underline">
                          {selectedInquiry.email}
                        </a>
                      </div>
                      {selectedInquiry.phone && (
                        <div className="flex items-center gap-2 text-foreground pt-1">
                          <a
                            href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedInquiry.traveler_name)}%2C%20thank%20you%20for%20contacting%20ABC%20Travels.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 px-2.5 py-1.5 rounded text-xs font-semibold"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp: {selectedInquiry.phone}</span>
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="bg-muted/30 p-3.5 rounded-md border border-border space-y-1">
                      <span className="text-muted-foreground uppercase tracking-wider text-[10px] block font-semibold">
                        Travel Parameters
                      </span>
                      <div><strong>Country:</strong> {selectedInquiry.country}</div>
                      <div><strong>Departure:</strong> {selectedInquiry.departure_date ? formatDate(selectedInquiry.departure_date) : 'Flexible Dates'}</div>
                      <div><strong>Party:</strong> {selectedInquiry.guests_count} Guests • {selectedInquiry.duration_days} Days</div>
                    </div>
                  </div>

                  {/* Requested Journey */}
                  <div className="bg-muted/30 p-3.5 rounded-md border border-border text-xs space-y-1">
                    <span className="text-muted-foreground uppercase tracking-wider text-[10px] block font-semibold">
                      Requested Itinerary & Tier
                    </span>
                    <div className="font-serif font-bold text-foreground text-sm">
                      {selectedInquiry.tour_title || 'Custom India Tailormade Journey'}
                    </div>
                    <div className="text-muted-foreground">
                      Preference: {selectedInquiry.budget_tier}
                    </div>
                  </div>

                  {/* Special Requests */}
                  {selectedInquiry.special_requests && (
                    <div className="bg-muted/30 p-3.5 rounded-md border border-border text-xs space-y-1">
                      <span className="text-muted-foreground uppercase tracking-wider text-[10px] block font-semibold">
                        Client Notes & Special Requests
                      </span>
                      <p className="text-foreground italic leading-relaxed whitespace-pre-line">
                        &ldquo;{selectedInquiry.special_requests}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Internal Notes */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Internal Concierge Staff Notes
                    </label>
                    <Textarea
                      rows={3}
                      value={adminNoteInput}
                      onChange={(e) => setAdminNoteInput(e.target.value)}
                      placeholder="Record quote proposals, customized hotel preferences, follow-up dates..."
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
                </div>
              )}

              {/* TAB 2: 1-CLICK BESPOKE PROPOSAL GENERATOR */}
              {modalTab === 'proposal' && (
                <div className="space-y-5 text-xs">
                  {/* Proposal Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border border-border">
                    <div>
                      <label className="block font-semibold text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                        Price Per Guest (USD $)
                      </label>
                      <Input
                        type="number"
                        value={quotePricePerPersonUSD}
                        onChange={(e) => setQuotePricePerPersonUSD(Number(e.target.value))}
                        className="text-xs h-9 font-semibold"
                      />
                      <span className="text-[10px] text-muted-foreground mt-1 block">
                        Total Party ({selectedInquiry.guests_count || 2} guests):{' '}
                        <strong className="text-foreground">
                          ${((selectedInquiry.guests_count || 2) * quotePricePerPersonUSD).toLocaleString()} USD
                        </strong>{' '}
                        (approx. ₹{((selectedInquiry.guests_count || 2) * quotePricePerPersonUSD * 83).toLocaleString()})
                      </span>
                    </div>

                    <div>
                      <label className="block font-semibold text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                        Selected Palace & Luxury Stays
                      </label>
                      <Input
                        type="text"
                        value={quoteHotelPicks}
                        onChange={(e) => setQuoteHotelPicks(e.target.value)}
                        className="text-xs h-9"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                        Key Itinerary Highlights
                      </label>
                      <Input
                        type="text"
                        value={quoteHighlights}
                        onChange={(e) => setQuoteHighlights(e.target.value)}
                        className="text-xs h-9"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Monograph Preview */}
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Formatted WhatsApp Proposal (Ready to Send)</span>
                      </span>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(generateWhatsAppProposal(), 'whatsapp')}
                          className="text-xs h-8 px-3 gap-1.5 whitespace-nowrap"
                        >
                          {isCopied === 'whatsapp' ? <Check className="w-3.5 h-3.5 text-foreground" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied === 'whatsapp' ? 'Copied' : 'Copy Text'}</span>
                        </Button>

                        {selectedInquiry.phone && (
                          <Button
                            size="sm"
                            onClick={handleSendWhatsAppProposal}
                            className="text-xs h-8 px-4 gap-2 whitespace-nowrap bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold shadow-sm border-0"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Launch WhatsApp Chat</span>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Interactive Post-Launch Confirmation Banner */}
                    {showStatusPrompt && selectedInquiry.status !== 'PROPOSAL_SENT' && (
                      <div className="bg-muted/50 border border-border p-3.5 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
                        <div className="text-xs text-foreground">
                          WhatsApp opened for <strong>{selectedInquiry.traveler_name}</strong>. Advance lead status to &ldquo;Proposal Sent&rdquo;?
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            size="sm"
                            onClick={async () => {
                              await handleStatusUpdate(selectedInquiry.id, 'PROPOSAL_SENT');
                              setShowStatusPrompt(false);
                            }}
                            className="h-7 text-xs gap-1.5 whitespace-nowrap"
                          >
                            <Check className="w-3 h-3" />
                            <span>Mark Proposal Sent</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowStatusPrompt(false)}
                            className="h-7 text-xs text-muted-foreground hover:text-foreground whitespace-nowrap"
                          >
                            Keep Current Status
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="bg-muted/20 border border-border p-4 rounded-lg font-mono text-[11px] leading-relaxed text-muted-foreground max-h-52 overflow-y-auto whitespace-pre-wrap">
                      {generateWhatsAppProposal()}
                    </div>
                  </div>

                  {/* Email Monograph Preview */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>Formal Email Proposal Monograph</span>
                      </span>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generateEmailProposal(), 'email')}
                        className="text-xs h-8 gap-1.5"
                      >
                        {isCopied === 'email' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied === 'email' ? 'Copied!' : 'Copy Email'}</span>
                      </Button>
                    </div>

                    <div className="bg-background border border-border p-4 rounded-lg font-mono text-[11px] leading-relaxed text-muted-foreground max-h-40 overflow-y-auto whitespace-pre-wrap">
                      {generateEmailProposal()}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
