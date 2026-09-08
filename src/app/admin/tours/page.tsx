'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTours } from '@/lib/data-service';
import { Tour, ItineraryDay, TransitType } from '@/types';
import { formatUSD, formatINR } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import {
  ExternalLink,
  Edit,
  Plus,
  Trash2,
  Check,
  X,
  MapPin,
  Car,
  Plane,
  Ship,
  Train,
  Footprints,
  Compass,
  Bed,
  Utensils,
  DollarSign,
  Calendar,
  Layers,
  Save,
} from 'lucide-react';

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'basics' | 'highlights' | 'itinerary'>('basics');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    getTours().then(setTours);
  }, []);

  const handleOpenEdit = (tour: Tour) => {
    // Deep clone tour
    setEditingTour(JSON.parse(JSON.stringify(tour)));
    setIsCreatingNew(false);
    setActiveTab('basics');
    setSaveSuccess(false);
  };

  const handleOpenCreate = () => {
    const newTour: Tour = {
      id: 'tour-' + Date.now(),
      slug: 'new-luxury-journey-' + Date.now().toString().slice(-4),
      title: 'New Luxury Curated Journey',
      subtitle: 'A bespoke private expedition through iconic heritage palaces and sanctuaries.',
      destination_name: 'Rajasthan',
      duration_days: 8,
      duration_nights: 7,
      price_usd: 3500,
      price_inr: 290000,
      activity_level: 'Leisurely',
      travel_style: 'Heritage & Palaces',
      group_type: '100% Private Custom',
      is_featured: false,
      hero_image: '/images/tours/royal-odyssey/hero.jpg',
      gallery: [
        '/images/tours/royal-odyssey/hero.jpg',
      ],
      overview: 'Bespoke private luxury expedition crafted with white-glove logistics, legend palace hotels, and private scholar access.',
      highlights: [
        'VIP private sunrise monument access with senior historian',
        'Stay in premier 5-star legend palace suites',
        'Private chauffeur executive luxury sedan transfers',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Grand Welcome',
          location: 'Delhi',
          description: 'VIP meet and greet at the aerobridge with private chauffeur transfer to your palace hotel.',
          stay: 'The Imperial, New Delhi',
          meals: 'Dinner Included',
          highlights: ['VIP Aerobridge Fast-Track'],
          transit: { type: 'none' },
        },
      ],
      inclusions: [
        'Luxury palace accommodations',
        'Private chauffeur and executive vehicle',
        'All monument entrances and VIP express passes',
      ],
      exclusions: ['International airfare', 'Personal discretionary gratuities'],
      accommodations: [],
    };
    setEditingTour(newTour);
    setIsCreatingNew(true);
    setActiveTab('basics');
    setSaveSuccess(false);
  };

  const handleSaveTour = () => {
    if (!editingTour) return;

    if (isCreatingNew) {
      setTours((prev) => [editingTour, ...prev]);
    } else {
      setTours((prev) => prev.map((t) => (t.id === editingTour.id ? editingTour : t)));
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setEditingTour(null);
    }, 1200);
  };

  // Helper to add day
  const handleAddDay = () => {
    if (!editingTour) return;
    const currentDays = editingTour.itinerary || [];
    const nextDayNum = currentDays.length + 1;
    const prevLocation = currentDays[currentDays.length - 1]?.location || 'Delhi';

    const newDay: ItineraryDay = {
      day: nextDayNum,
      title: 'Day ' + nextDayNum + ' Exploration',
      location: prevLocation,
      description: 'Private guided cultural excursions, bespoke culinary tastings, and unhurried palace relaxation.',
      stay: currentDays[currentDays.length - 1]?.stay || 'Legend Palace Suite',
      meals: 'Breakfast Included',
      highlights: ['Private Sightseeing'],
      transit: { type: 'none' },
    };

    setEditingTour({
      ...editingTour,
      duration_days: Math.max(editingTour.duration_days, nextDayNum),
      itinerary: [...currentDays, newDay],
    });
  };

  // Helper to remove day
  const handleRemoveDay = (dayIdx: number) => {
    if (!editingTour) return;
    const updated = (editingTour.itinerary || []).filter((_, idx) => idx !== dayIdx);
    // Re-index days
    const reindexed = updated.map((d, i) => ({ ...d, day: i + 1 }));
    setEditingTour({
      ...editingTour,
      itinerary: reindexed,
      duration_days: reindexed.length,
      duration_nights: Math.max(0, reindexed.length - 1),
    });
  };

  // Helper to update specific day
  const handleUpdateDay = (dayIdx: number, field: keyof ItineraryDay, value: any) => {
    if (!editingTour) return;
    const updated = [...(editingTour.itinerary || [])];
    updated[dayIdx] = { ...updated[dayIdx], [field]: value };
    setEditingTour({ ...editingTour, itinerary: updated });
  };

  // Helper to update day transit
  const handleUpdateDayTransit = (dayIdx: number, transitUpdate: any) => {
    if (!editingTour) return;
    const updated = [...(editingTour.itinerary || [])];
    const currentTransit = updated[dayIdx].transit || { type: 'none' };
    updated[dayIdx] = {
      ...updated[dayIdx],
      transit: { ...currentTransit, ...transitUpdate },
    };
    setEditingTour({ ...editingTour, itinerary: updated });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-accent block mb-0.5">
            Content Management System (Upgrade D)
          </span>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Tour Packages Catalog CMS & Price Editor
          </h1>
          <p className="text-muted-foreground text-xs mt-1">
            Edit live pricing (USD/INR), adjust seasonal duration, add bespoke stops, and refine intercity transit legs.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          size="sm"
          className="text-xs font-semibold gap-1.5 shrink-0 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Curated Tour</span>
        </Button>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card
            key={tour.id}
            className="overflow-hidden flex flex-col justify-between border-border shadow-sm hover:border-foreground/40 transition-colors"
          >
            <div className="relative h-44 w-full bg-muted">
              <Image
                src={tour.hero_image}
                alt={tour.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <Badge variant="secondary" className="bg-black/70 text-white border-0 text-[10px] backdrop-blur-sm">
                  {tour.travel_style}
                </Badge>
                {tour.is_featured && (
                  <Badge variant="default" className="text-[10px] bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-xs flex items-center justify-between font-medium">
                <span>{tour.duration_days} Days / {tour.duration_nights} Nights</span>
                <span>{tour.destination_name}</span>
              </div>
            </div>

            <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-bold text-foreground line-clamp-1 mb-1">
                  {tour.title}
                </h3>
                <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                  {tour.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold">
                    Starting From
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif font-bold text-foreground text-lg">
                      {formatUSD(tour.price_usd)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">/ person</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground block">
                    approx. {formatINR(tour.price_inr)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEdit(tour)}
                    className="text-xs h-8 gap-1 font-semibold"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Tour</span>
                  </Button>

                  <Link href={'/tours/' + tour.slug} target="_blank">
                    <Button variant="ghost" size="sm" className="text-xs h-8 px-2 text-muted-foreground hover:text-foreground">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* EDIT / CREATE TOUR MODAL */}
      {/* ========================================================================= */}
      {editingTour && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between">
            {/* Modal Header */}
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-accent block">
                  {isCreatingNew ? 'Create New Journey' : 'Tour Package CMS Editor'}
                </span>
                <h3 className="font-serif text-xl font-bold text-foreground line-clamp-1">
                  {editingTour.title}
                </h3>
              </div>

              <button
                onClick={() => setEditingTour(null)}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="px-5 pt-3 border-b border-border flex items-center gap-2 bg-muted/10">
              <button
                onClick={() => setActiveTab('basics')}
                className={'px-3.5 py-2 text-xs font-semibold rounded-t-md border-b-2 transition-colors ' + (
                  activeTab === 'basics'
                    ? 'border-foreground text-foreground bg-card'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                1. Basics & Pricing (USD/INR)
              </button>

              <button
                onClick={() => setActiveTab('highlights')}
                className={'px-3.5 py-2 text-xs font-semibold rounded-t-md border-b-2 transition-colors ' + (
                  activeTab === 'highlights'
                    ? 'border-foreground text-foreground bg-card'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                2. Overview & Highlights
              </button>

              <button
                onClick={() => setActiveTab('itinerary')}
                className={'px-3.5 py-2 text-xs font-semibold rounded-t-md border-b-2 transition-colors flex items-center gap-1.5 ' + (
                  activeTab === 'itinerary'
                    ? 'border-foreground text-foreground bg-card'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                <span>3. Day-by-Day & Transit Legs</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {editingTour.itinerary?.length || 0}
                </Badge>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto max-h-[58vh] space-y-5">
              {/* TAB 1: BASICS & PRICING */}
              {activeTab === 'basics' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Tour Title</label>
                      <Input
                        value={editingTour.title}
                        onChange={(e) => setEditingTour({ ...editingTour, title: e.target.value })}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">URL Slug</label>
                      <Input
                        value={editingTour.slug}
                        onChange={(e) => setEditingTour({ ...editingTour, slug: e.target.value })}
                        className="text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Subtitle / Monograph Tagline</label>
                    <Input
                      value={editingTour.subtitle}
                      onChange={(e) => setEditingTour({ ...editingTour, subtitle: e.target.value })}
                      className="text-xs"
                    />
                  </div>

                  {/* Pricing & Duration Grid */}
                  <div className="p-4 rounded-lg bg-muted/40 border border-border grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-accent" />
                        <span>Price (USD $)</span>
                      </label>
                      <Input
                        type="number"
                        value={editingTour.price_usd}
                        onChange={(e) => {
                          const usd = Number(e.target.value);
                          setEditingTour({
                            ...editingTour,
                            price_usd: usd,
                            price_inr: Math.round(usd * 83.5),
                          });
                        }}
                        className="text-xs font-bold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Price (Approx INR ₹)</label>
                      <Input
                        type="number"
                        value={editingTour.price_inr}
                        onChange={(e) => setEditingTour({ ...editingTour, price_inr: Number(e.target.value) })}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Duration (Days)</label>
                      <Input
                        type="number"
                        value={editingTour.duration_days}
                        onChange={(e) => {
                          const days = Number(e.target.value);
                          setEditingTour({
                            ...editingTour,
                            duration_days: days,
                            duration_nights: Math.max(0, days - 1),
                          });
                        }}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Duration (Nights)</label>
                      <Input
                        type="number"
                        value={editingTour.duration_nights}
                        onChange={(e) => setEditingTour({ ...editingTour, duration_nights: Number(e.target.value) })}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  {/* Region & Classification */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Destination / Region</label>
                      <Input
                        value={editingTour.destination_name || ''}
                        onChange={(e) => setEditingTour({ ...editingTour, destination_name: e.target.value })}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Travel Style</label>
                      <select
                        value={editingTour.travel_style}
                        onChange={(e) => setEditingTour({ ...editingTour, travel_style: e.target.value as any })}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      >
                        <option value="Heritage & Palaces">Heritage & Palaces</option>
                        <option value="Wildlife Safari">Wildlife Safari</option>
                        <option value="Himalayan Exploration">Himalayan Exploration</option>
                        <option value="Spiritual & Wellness">Spiritual & Wellness</option>
                        <option value="Culinary & Culture">Culinary & Culture</option>
                        <option value="Coastal & Luxury Stays">Coastal & Luxury Stays</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Activity Level</label>
                      <select
                        value={editingTour.activity_level}
                        onChange={(e) => setEditingTour({ ...editingTour, activity_level: e.target.value as any })}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      >
                        <option value="Leisurely">Leisurely</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Active Adventure">Active Adventure</option>
                        <option value="Challenging">Challenging</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Hero Image URL</label>
                    <Input
                      value={editingTour.hero_image}
                      onChange={(e) => setEditingTour({ ...editingTour, hero_image: e.target.value })}
                      className="text-xs font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isFeaturedToggle"
                      checked={editingTour.is_featured}
                      onChange={(e) => setEditingTour({ ...editingTour, is_featured: e.target.checked })}
                      className="rounded border-input text-foreground focus:ring-ring"
                    />
                    <label htmlFor="isFeaturedToggle" className="text-xs font-medium text-foreground cursor-pointer">
                      Feature on Homepage & Spotlight Carousels
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: OVERVIEW & HIGHLIGHTS */}
              {activeTab === 'highlights' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Editorial Journey Overview</label>
                    <Textarea
                      rows={4}
                      value={editingTour.overview}
                      onChange={(e) => setEditingTour({ ...editingTour, overview: e.target.value })}
                      className="text-xs leading-relaxed"
                    />
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-foreground">Signature Highlights</label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setEditingTour({
                            ...editingTour,
                            highlights: [...(editingTour.highlights || []), 'New bespoke signature highlight'],
                          })
                        }
                        className="text-xs h-7 gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Highlight</span>
                      </Button>
                    </div>

                    {(editingTour.highlights || []).map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          value={h}
                          onChange={(e) => {
                            const updated = [...editingTour.highlights];
                            updated[idx] = e.target.value;
                            setEditingTour({ ...editingTour, highlights: updated });
                          }}
                          className="text-xs"
                        />
                        <button
                          onClick={() => {
                            const updated = editingTour.highlights.filter((_, i) => i !== idx);
                            setEditingTour({ ...editingTour, highlights: updated });
                          }}
                          className="p-2 text-muted-foreground hover:text-red-500 rounded-md"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: DAY-BY-DAY & TRANSIT LEGS */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-foreground">
                        Day-by-Day Schedule & Intercity Transit Logistics
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Define location hubs, palace stays, and whether a day includes an intercity transfer.
                      </p>
                    </div>

                    <Button size="sm" onClick={handleAddDay} className="text-xs h-8 gap-1 font-semibold">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Day</span>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {(editingTour.itinerary || []).map((day, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-border bg-muted/20 space-y-3 relative group"
                      >
                        {/* Day Header Row */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-foreground text-background font-serif text-xs font-bold flex items-center justify-center">
                              {day.day}
                            </span>
                            <Input
                              value={day.title}
                              onChange={(e) => handleUpdateDay(idx, 'title', e.target.value)}
                              placeholder="Day Title"
                              className="text-xs font-semibold h-8 w-64 sm:w-80"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-accent" />
                              <Input
                                value={day.location}
                                onChange={(e) => handleUpdateDay(idx, 'location', e.target.value)}
                                placeholder="City"
                                className="text-xs h-8 w-28"
                              />
                            </div>

                            <button
                              onClick={() => handleRemoveDay(idx)}
                              className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md"
                              title="Delete Day"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        <Textarea
                          rows={2}
                          value={day.description}
                          onChange={(e) => handleUpdateDay(idx, 'description', e.target.value)}
                          placeholder="Describe the day's experiences, monument visits, and private scholar tours..."
                          className="text-xs leading-relaxed"
                        />

                        {/* Palace Stay & Dining */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <Bed className="w-3.5 h-3.5 text-accent shrink-0" />
                            <Input
                              value={day.stay || ''}
                              onChange={(e) => handleUpdateDay(idx, 'stay', e.target.value)}
                              placeholder="Palace Hotel (e.g. Oberoi Amarvilas)"
                              className="text-xs h-8"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <Utensils className="w-3.5 h-3.5 text-accent shrink-0" />
                            <Input
                              value={day.meals || ''}
                              onChange={(e) => handleUpdateDay(idx, 'meals', e.target.value)}
                              placeholder="Dining (e.g. Breakfast Included)"
                              className="text-xs h-8"
                            />
                          </div>
                        </div>

                        {/* INTERCITY TRANSIT SETTINGS FOR THIS STAGE */}
                        <div className="pt-2 border-t border-border/60 p-3 rounded-lg bg-background/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">
                              Intercity Transit:
                            </span>

                            <select
                              value={day.transit?.type || 'none'}
                              onChange={(e) =>
                                handleUpdateDayTransit(idx, { type: e.target.value as TransitType })
                              }
                              className="h-7 rounded border border-input bg-background px-2 text-xs font-semibold text-foreground focus:outline-none"
                            >
                              <option value="none">None (Local City Stay & Leisure)</option>
                              <option value="drive">🚘 Private Chauffeur Drive</option>
                              <option value="flight">✈️ Domestic Flight</option>
                              <option value="boat">🛥️ Private Boat / Houseboat</option>
                              <option value="train">🚆 Express Rail</option>
                              <option value="safari">🐾 4x4 Jeep Safari</option>
                            </select>
                          </div>

                          {day.transit?.type && day.transit.type !== 'none' && (
                            <div className="flex items-center gap-2">
                              <Input
                                value={day.transit?.duration || ''}
                                onChange={(e) => handleUpdateDayTransit(idx, { duration: e.target.value })}
                                placeholder="Duration (e.g. 3.5 hrs)"
                                className="text-xs h-7 w-28"
                              />
                              <Input
                                value={day.transit?.route_notes || ''}
                                onChange={(e) => handleUpdateDayTransit(idx, { route_notes: e.target.value })}
                                placeholder="Route (e.g. Yamuna Expressway)"
                                className="text-xs h-7 w-44"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                {saveSuccess && (
                  <span className="text-xs text-green-600 font-semibold flex items-center gap-1 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Package changes saved!</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingTour(null)}
                  className="text-xs h-8"
                >
                  Cancel
                </Button>

                <Button
                  size="sm"
                  onClick={handleSaveTour}
                  className="text-xs h-8 font-semibold gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Package Changes</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
