'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  SiteNote,
  NoteCategory,
  NoteStatus,
  NotePriority,
} from '@/types/site-notes';
import {
  getSiteNotes,
  saveSiteNote,
  deleteSiteNote,
  exportNotesToJson,
  PAGE_PRESETS,
} from '@/lib/site-notes-service';
import NoteModal from '@/components/admin/NoteModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  Clock,
  Download,
  Copy,
  Check,
  ArrowUpRight,
  Layers,
  Compass,
} from 'lucide-react';

export default function AdminNotesPage() {
  const [notes, setNotes] = useState<SiteNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPageFilter, setSelectedPageFilter] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<SiteNote | null>(null);

  // Copied feedback helper
  const [copiedAssetId, setCopiedAssetId] = useState<string | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setIsLoading(true);
    try {
      const data = await getSiteNotes();
      setNotes(data);
    } catch (e) {
      console.error('Failed to load ledger notes:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = async (savedNote: SiteNote) => {
    const updated = await saveSiteNote(savedNote);
    setNotes((prev) => {
      const exists = prev.find((n) => n.id === updated.id);
      if (exists) {
        return prev.map((n) => (n.id === updated.id ? updated : n));
      }
      return [updated, ...prev];
    });
  };

  const handleDeleteNote = async (id: string) => {
    if (confirm('Permanently remove this entry from the operational ledger?')) {
      await deleteSiteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const handleToggleChecklist = async (noteId: string, itemId: string) => {
    const targetNote = notes.find((n) => n.id === noteId);
    if (!targetNote || !targetNote.action_checklist) return;

    const updatedChecklist = targetNote.action_checklist.map((item) =>
      item.id === itemId ? { ...item, done: !item.done } : item
    );

    const updatedNote: SiteNote = {
      ...targetNote,
      action_checklist: updatedChecklist,
      updated_at: new Date().toISOString(),
    };

    setNotes((prev) => prev.map((n) => (n.id === noteId ? updatedNote : n)));
    await saveSiteNote(updatedNote);
  };

  const handleQuickStatusChange = async (noteId: string, newStatus: NoteStatus) => {
    const targetNote = notes.find((n) => n.id === noteId);
    if (!targetNote) return;

    const updatedNote: SiteNote = {
      ...targetNote,
      status: newStatus,
      updated_at: new Date().toISOString(),
    };

    setNotes((prev) => prev.map((n) => (n.id === noteId ? updatedNote : n)));
    await saveSiteNote(updatedNote);
  };

  const handleCopyAssetPath = (path: string, id: string) => {
    navigator.clipboard.writeText(path);
    setCopiedAssetId(id);
    setTimeout(() => setCopiedAssetId(null), 2000);
  };

  // Stats
  const stats = useMemo(() => {
    const total = notes.length;
    const open = notes.filter((n) => n.status === 'open').length;
    const inProgress = notes.filter((n) => n.status === 'in_progress').length;
    const waitingExternal = notes.filter((n) => n.status === 'waiting_external').length;
    const aiAssets = notes.filter((n) => n.category === 'ai_asset').length;
    const resolved = notes.filter((n) => n.status === 'resolved').length;
    return { total, open, inProgress, waitingExternal, aiAssets, resolved };
  }, [notes]);

  // Filtered Notes
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (selectedCategory !== 'all' && note.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== 'all' && note.status !== selectedStatus) {
        return false;
      }
      if (selectedPageFilter !== 'all' && note.page_path !== selectedPageFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = note.title.toLowerCase().includes(query);
        const matchContent = note.content.toLowerCase().includes(query);
        const matchPage = note.page_label.toLowerCase().includes(query) || note.page_path.toLowerCase().includes(query);
        const matchAsset = note.asset_path ? note.asset_path.toLowerCase().includes(query) : false;
        const matchExternal = note.external_dependency ? note.external_dependency.details.toLowerCase().includes(query) : false;
        return matchTitle || matchContent || matchPage || matchAsset || matchExternal;
      }
      return true;
    });
  }, [notes, selectedCategory, selectedStatus, selectedPageFilter, searchQuery]);

  const getCategoryTitle = (category: NoteCategory) => {
    switch (category) {
      case 'ai_asset':
        return 'AI Asset & Imagery';
      case 'warning':
        return 'Compliance & Legal';
      case 'editorial':
        return 'Editorial Polish';
      case 'bug':
        return 'Design Fidelity';
      case 'feature_idea':
        return 'Bespoke Concept';
    }
  };

  const getStatusDisplay = (status: NoteStatus) => {
    switch (status) {
      case 'open':
        return (
          <span className="font-label-caps text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded bg-ink-black text-alabaster-cream font-semibold">
            Action Required
          </span>
        );
      case 'in_progress':
        return (
          <span className="font-label-caps text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded bg-cream-container text-ink-black border border-silk-border font-semibold">
            Under Review
          </span>
        );
      case 'waiting_external':
        return (
          <span className="font-label-caps text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded bg-[#FAF6EE] text-secondary border border-bronze-hover/40 font-semibold flex items-center gap-1">
            Blocked: External
          </span>
        );
      case 'resolved':
        return (
          <span className="font-label-caps text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded bg-white text-slate-taupe border border-silk-border font-medium">
            Resolved & Cleared
          </span>
        );
      case 'archived':
        return (
          <span className="font-label-caps text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded bg-white text-slate-taupe/60 border border-silk-border/60">
            Archived
          </span>
        );
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 text-ink-black">
      {/* Editorial Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-silk-border">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-px bg-bronze-hover" />
            <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-bronze-hover">
              Operational Ledger & Quality Control
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-ink-black">
            Site Ledger & Asset Registry
          </h1>
          <p className="font-body-base text-slate-taupe text-xs sm:text-sm leading-relaxed max-w-2xl">
            A private operational ledger to track visual assets, verify licensing and commissioned photography, coordinate third-party prerequisites, and uphold bespoke aesthetic fidelity across the platform.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportNotesToJson(notes)}
            className="text-xs border-silk-border gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Registry</span>
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setNoteToEdit(null);
              setIsModalOpen(true);
            }}
            className="text-xs gap-2 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record Entry</span>
          </Button>
        </div>
      </div>

      {/* 5-Metric Editorial Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div
          onClick={() => { setSelectedStatus('all'); setSelectedCategory('all'); }}
          className="p-5 rounded-lg bg-white border border-silk-border cursor-pointer hover:border-ink-black transition-colors shadow-xs"
        >
          <span className="font-label-caps text-[9px] tracking-[0.25em] uppercase text-slate-taupe block">
            Total Entries
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-ink-black block mt-2">
            {stats.total}
          </span>
        </div>

        <div
          onClick={() => setSelectedStatus('open')}
          className={`p-5 rounded-lg bg-white border transition-colors cursor-pointer shadow-xs ${
            selectedStatus === 'open' ? 'border-ink-black ring-1 ring-ink-black/20' : 'border-silk-border hover:border-ink-black'
          }`}
        >
          <span className="font-label-caps text-[9px] tracking-[0.25em] uppercase text-ink-black font-semibold block">
            Action Required
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-ink-black block mt-2">
            {stats.open}
          </span>
        </div>

        <div
          onClick={() => setSelectedStatus('waiting_external')}
          className={`p-5 rounded-lg bg-white border transition-colors cursor-pointer shadow-xs ${
            selectedStatus === 'waiting_external' ? 'border-bronze-hover ring-1 ring-bronze-hover/30' : 'border-silk-border hover:border-bronze-hover'
          }`}
        >
          <span className="font-label-caps text-[9px] tracking-[0.25em] uppercase text-secondary font-semibold block">
            Blocked: External
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-secondary block mt-2">
            {stats.waitingExternal}
          </span>
        </div>

        <div
          onClick={() => setSelectedCategory('ai_asset')}
          className={`p-5 rounded-lg bg-white border transition-colors cursor-pointer shadow-xs ${
            selectedCategory === 'ai_asset' ? 'border-bronze-hover ring-1 ring-bronze-hover/30' : 'border-silk-border hover:border-bronze-hover'
          }`}
        >
          <span className="font-label-caps text-[9px] tracking-[0.25em] uppercase text-slate-taupe block">
            AI Assets Logged
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-ink-black block mt-2">
            {stats.aiAssets}
          </span>
        </div>

        <div
          onClick={() => setSelectedStatus('resolved')}
          className={`p-5 rounded-lg bg-white border transition-colors cursor-pointer shadow-xs ${
            selectedStatus === 'resolved' ? 'border-ink-black ring-1 ring-ink-black/20' : 'border-silk-border hover:border-ink-black'
          }`}
        >
          <span className="font-label-caps text-[9px] tracking-[0.25em] uppercase text-slate-taupe block">
            Resolved & Cleared
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-ink-black block mt-2">
            {stats.resolved}
          </span>
        </div>
      </div>

      {/* Structured Ledger Filter Bar */}
      <div className="p-6 rounded-xl bg-white border border-silk-border space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-taupe" />
            <input
              type="text"
              placeholder="Search by title, prompt, location, or blocker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-cream-container border border-silk-border rounded text-xs text-ink-black focus:outline-none focus:border-ink-black placeholder:text-slate-taupe"
            />
          </div>

          {/* Location Filter Dropdown */}
          <div className="w-full md:w-80">
            <select
              value={selectedPageFilter}
              onChange={(e) => setSelectedPageFilter(e.target.value)}
              className="w-full px-3 py-2 bg-cream-container border border-silk-border rounded text-xs text-ink-black focus:outline-none focus:border-ink-black cursor-pointer"
            >
              <option value="all">All Architectural Locations ({notes.length})</option>
              {PAGE_PRESETS.map((p) => {
                const count = notes.filter((n) => n.page_path === p.path).length;
                return (
                  <option key={p.path} value={p.path}>
                    {p.label} {count > 0 ? `(${count})` : ''}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Category & Status Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-silk-border">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-label-caps text-[9px] tracking-[0.25em] uppercase text-slate-taupe mr-1">Classification:</span>
            {[
              { id: 'all', label: 'All Entries' },
              { id: 'ai_asset', label: 'AI Assets' },
              { id: 'warning', label: 'Compliance' },
              { id: 'editorial', label: 'Editorial' },
              { id: 'bug', label: 'Design Polish' },
              { id: 'feature_idea', label: 'Concepts' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded font-label-caps text-[10px] tracking-wider uppercase transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-ink-black text-alabaster-cream font-semibold'
                    : 'bg-cream-container hover:bg-silk-border/60 text-slate-taupe hover:text-ink-black'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-label-caps text-[9px] tracking-[0.25em] uppercase text-slate-taupe mr-1">Status:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'open', label: 'Action Required' },
              { id: 'in_progress', label: 'Under Review' },
              { id: 'waiting_external', label: 'Blocked: External' },
              { id: 'resolved', label: 'Resolved' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id)}
                className={`px-3 py-1 rounded font-label-caps text-[10px] tracking-wider uppercase transition-colors ${
                  selectedStatus === st.id
                    ? 'border border-ink-black bg-ink-black text-white font-semibold'
                    : 'bg-cream-container hover:bg-silk-border/60 text-slate-taupe hover:text-ink-black'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ledger Cards Grid */}
      {filteredNotes.length === 0 ? (
        <div className="p-16 text-center space-y-3 bg-white border border-silk-border rounded-xl">
          <Compass className="w-8 h-8 text-bronze-hover mx-auto opacity-70" />
          <h3 className="font-serif text-xl font-medium text-ink-black">
            No entries match your criteria
          </h3>
          <p className="font-body-base text-xs text-slate-taupe max-w-sm mx-auto leading-relaxed">
            Adjust the search criteria or classification filter above, or record a new entry in the operational ledger.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedStatus('all');
              setSelectedPageFilter('all');
            }}
            className="text-xs border-silk-border mt-2"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredNotes.map((note) => {
            const hasChecklist = note.action_checklist && note.action_checklist.length > 0;
            const completedCount = hasChecklist
              ? note.action_checklist!.filter((c) => c.done).length
              : 0;
            const totalCount = hasChecklist ? note.action_checklist!.length : 0;

            return (
              <div
                key={note.id}
                className="p-6 sm:p-7 bg-white border border-silk-border rounded-xl space-y-5 shadow-xs hover:border-ink-black/40 transition-all"
              >
                {/* Meta Row: Classification, Status, Priority, Quick Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-silk-border">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-label-caps text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded bg-cream-container text-ink-black border border-silk-border font-semibold">
                      {getCategoryTitle(note.category)}
                    </span>

                    {getStatusDisplay(note.status)}

                    {note.priority === 'urgent' && (
                      <span className="font-label-caps text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded text-secondary border border-bronze-hover/40 font-bold bg-[#FAF6EE]">
                        Priority: Urgent
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {/* Inline Quick Status Switcher */}
                    <select
                      value={note.status}
                      onChange={(e) => handleQuickStatusChange(note.id, e.target.value as NoteStatus)}
                      className="px-2.5 py-1 bg-cream-container border border-silk-border rounded text-[11px] font-medium text-ink-black focus:outline-none cursor-pointer"
                    >
                      <option value="open">Action Required</option>
                      <option value="in_progress">Under Review</option>
                      <option value="waiting_external">Blocked: External</option>
                      <option value="resolved">Resolved & Cleared</option>
                      <option value="archived">Archived</option>
                    </select>

                    <button
                      onClick={() => {
                        setNoteToEdit(note);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-slate-taupe hover:text-ink-black hover:bg-cream-container rounded transition-colors"
                      title="Edit Entry"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1.5 text-slate-taupe hover:text-ink-black hover:bg-cream-container rounded transition-colors"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content Header & Narrative */}
                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl text-ink-black font-normal leading-snug">
                    {note.title}
                  </h3>

                  {note.content && (
                    <p className="font-body-base text-xs sm:text-sm text-slate-taupe leading-relaxed whitespace-pre-line">
                      {note.content}
                    </p>
                  )}
                </div>

                {/* External Dependency Callout (Understated Aristocratic Box) */}
                {note.external_dependency && note.external_dependency.required && (
                  <div className="p-4 rounded-lg bg-cream-container border-l-2 border-l-bronze-hover border-y border-r border-silk-border space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-serif font-semibold text-ink-black">
                        <Clock className="w-3.5 h-3.5 text-bronze-hover" />
                        <span>External Prerequisite / Blocker:</span>
                      </div>
                      {note.external_dependency.owner_contact && (
                        <span className="font-label-caps text-[10px] tracking-wider uppercase text-slate-taupe">
                          Liaison: {note.external_dependency.owner_contact}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink-black leading-relaxed pl-5 font-medium">
                      {note.external_dependency.details}
                    </p>
                  </div>
                )}

                {/* Architectural Pinpointer & Live Inspection Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-cream-container rounded-lg border border-silk-border text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-label-caps text-[9px] tracking-[0.2em] uppercase text-slate-taupe">
                      Target Monograph:
                    </span>
                    <span className="font-serif font-semibold text-ink-black text-sm">
                      {note.page_label}
                    </span>
                    <span className="text-slate-taupe font-mono text-[11px]">
                      ({note.page_path})
                    </span>
                  </div>

                  <Link
                    href={note.page_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-label-caps text-[10px] tracking-widest uppercase text-ink-black hover:text-bronze-hover font-semibold transition-colors"
                  >
                    <span>Inspect Live Location</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Asset Path Indicator */}
                {note.asset_path && (
                  <div className="flex items-center justify-between gap-2 px-3.5 py-2 bg-alabaster-cream rounded border border-silk-border text-xs font-mono">
                    <span className="text-slate-taupe truncate">
                      File Path: <strong className="text-ink-black font-semibold">{note.asset_path}</strong>
                    </span>
                    <button
                      onClick={() => handleCopyAssetPath(note.asset_path!, note.id)}
                      className="p-1 hover:text-ink-black text-slate-taupe flex items-center gap-1 shrink-0 font-label-caps text-[9px] uppercase tracking-wider transition-colors"
                      title="Copy asset path"
                    >
                      {copiedAssetId === note.id ? (
                        <>
                          <Check className="w-3 h-3 text-bronze-hover" />
                          <span className="text-bronze-hover font-sans font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="font-sans">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Execution Milestones Checklist */}
                {hasChecklist && (
                  <div className="pt-3 border-t border-silk-border space-y-2.5">
                    <div className="flex items-center justify-between font-label-caps text-[10px] tracking-[0.2em] uppercase text-slate-taupe">
                      <span>Execution Milestones</span>
                      <span>
                        {completedCount} of {totalCount} Cleared
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {note.action_checklist!.map((item) => (
                        <label
                          key={item.id}
                          className="flex items-center gap-2.5 p-2.5 rounded bg-cream-container border border-silk-border text-xs cursor-pointer hover:border-ink-black/40 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => handleToggleChecklist(note.id, item.id)}
                            className="rounded border-silk-border text-ink-black focus:ring-0 cursor-pointer"
                          />
                          <span className={item.done ? 'line-through text-slate-taupe' : 'text-ink-black font-medium'}>
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamp Archival Footer */}
                <div className="pt-2 flex items-center justify-between text-[9px] text-slate-taupe font-label-caps tracking-[0.25em] uppercase border-t border-silk-border/60">
                  <span>Recorded: {new Date(note.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>Revision: {new Date(note.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Note Edit/Create Modal */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNoteToEdit(null);
        }}
        onSave={handleSaveNote}
        noteToEdit={noteToEdit}
      />
    </div>
  );
}