'use client';

import React, { useState, useEffect } from 'react';
import {
  SiteNote,
  NoteCategory,
  NotePriority,
  NoteStatus,
  ExternalDependencyType,
  NoteChecklistItem,
} from '@/types/site-notes';
import { PAGE_PRESETS } from '@/lib/site-notes-service';
import { Button } from '@/components/ui/Button';
import { X, Trash2, Plus, Clock, ExternalLink } from 'lucide-react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: SiteNote) => Promise<void>;
  noteToEdit?: SiteNote | null;
}

export default function NoteModal({
  isOpen,
  onClose,
  onSave,
  noteToEdit,
}: NoteModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NoteCategory>('ai_asset');
  const [priority, setPriority] = useState<NotePriority>('medium');
  const [status, setStatus] = useState<NoteStatus>('open');
  const [selectedPresetPath, setSelectedPresetPath] = useState('/');
  const [isCustomPath, setIsCustomPath] = useState(false);
  const [customPath, setCustomPath] = useState('');
  const [customLabel, setCustomLabel] = useState('');
  const [assetPath, setAssetPath] = useState('');
  const [content, setContent] = useState('');

  // External dependency fields
  const [hasExternalDep, setHasExternalDep] = useState(false);
  const [depType, setDepType] = useState<ExternalDependencyType>('photographer_delivery');
  const [depDetails, setDepDetails] = useState('');
  const [depContact, setDepContact] = useState('');

  // Checklist
  const [checklist, setChecklist] = useState<NoteChecklistItem[]>([]);
  const [newChecklistText, setNewChecklistText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setCategory(noteToEdit.category);
      setPriority(noteToEdit.priority);
      setStatus(noteToEdit.status);

      const matchingPreset = PAGE_PRESETS.find((p) => p.path === noteToEdit.page_path);
      if (matchingPreset) {
        setSelectedPresetPath(matchingPreset.path);
        setIsCustomPath(false);
      } else {
        setIsCustomPath(true);
        setCustomPath(noteToEdit.page_path);
        setCustomLabel(noteToEdit.page_label);
      }

      setAssetPath(noteToEdit.asset_path || '');
      setContent(noteToEdit.content || '');

      if (noteToEdit.external_dependency && noteToEdit.external_dependency.required) {
        setHasExternalDep(true);
        setDepType(noteToEdit.external_dependency.type || 'other');
        setDepDetails(noteToEdit.external_dependency.details || '');
        setDepContact(noteToEdit.external_dependency.owner_contact || '');
      } else {
        setHasExternalDep(noteToEdit.status === 'waiting_external');
        setDepDetails('');
        setDepContact('');
      }

      setChecklist(noteToEdit.action_checklist || []);
    } else {
      setTitle('');
      setCategory('ai_asset');
      setPriority('medium');
      setStatus('open');
      setSelectedPresetPath('/');
      setIsCustomPath(false);
      setCustomPath('');
      setCustomLabel('');
      setAssetPath('');
      setContent('');
      setHasExternalDep(false);
      setDepType('photographer_delivery');
      setDepDetails('');
      setDepContact('');
      setChecklist([
        { id: 'item-1', text: 'Document source prompt & reference photography', done: false },
        { id: 'item-2', text: 'Commission replacement plate / acquire commercial license', done: false },
      ]);
    }
  }, [noteToEdit, isOpen]);

  const handleStatusChange = (newStatus: NoteStatus) => {
    setStatus(newStatus);
    if (newStatus === 'waiting_external') {
      setHasExternalDep(true);
    }
  };

  const handleAddChecklistItem = () => {
    if (!newChecklistText.trim()) return;
    setChecklist([
      ...checklist,
      { id: 'c-' + Date.now(), text: newChecklistText.trim(), done: false },
    ]);
    setNewChecklistText('');
  };

  const handleRemoveChecklistItem = (id: string) => {
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSaving(true);
    try {
      let pagePath = selectedPresetPath;
      let pageLabel = PAGE_PRESETS.find((p) => p.path === selectedPresetPath)?.label || 'Custom Location';

      if (isCustomPath) {
        pagePath = customPath.trim() || '/';
        pageLabel = customLabel.trim() || pagePath;
      }

      const noteData: SiteNote = {
        id: noteToEdit ? noteToEdit.id : '',
        title: title.trim(),
        category,
        priority,
        status,
        page_path: pagePath,
        page_label: pageLabel,
        asset_path: assetPath.trim() || undefined,
        content: content.trim(),
        action_checklist: checklist,
        external_dependency: hasExternalDep || status === 'waiting_external'
          ? {
              required: true,
              type: depType,
              details: depDetails.trim() || 'Awaiting external stakeholder delivery / clearance',
              owner_contact: depContact.trim() || undefined,
            }
          : undefined,
        created_at: noteToEdit ? noteToEdit.created_at : new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await onSave(noteData);
      onClose();
    } catch (err) {
      console.error('Error saving ledger note:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-alabaster-cream border border-silk-border rounded-xl shadow-2xl flex flex-col overflow-hidden text-ink-black">
        {/* Editorial Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-silk-border bg-alabaster-cream">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-5 h-px bg-bronze-hover" />
              <span className="font-label-caps text-[10px] tracking-[0.3em] uppercase text-bronze-hover">
                {noteToEdit ? 'Ledger Entry Update' : 'New Operational Monograph'}
              </span>
            </div>
            <h2 className="font-serif text-2xl font-normal text-ink-black tracking-tight">
              {noteToEdit ? 'Revise Ledger Entry' : 'Log Website Monograph & Asset Entry'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-taupe hover:text-ink-black hover:bg-cream-container rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="font-label-caps text-[10px] tracking-[0.25em] uppercase font-semibold text-slate-taupe">
              Entry Subject *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Asset Verification: Taj Balcony Sunrise Monograph"
              className="w-full px-3.5 py-2.5 bg-white border border-silk-border rounded text-xs text-ink-black focus:outline-none focus:border-ink-black transition-colors"
            />
          </div>

          {/* 3-Column Categorization Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="font-label-caps text-[10px] tracking-[0.25em] uppercase font-semibold text-slate-taupe">
                Classification
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NoteCategory)}
                className="w-full px-3 py-2 bg-white border border-silk-border rounded text-xs text-ink-black focus:outline-none focus:border-ink-black cursor-pointer"
              >
                <option value="ai_asset">AI Asset & Imagery</option>
                <option value="warning">Compliance & Legal</option>
                <option value="editorial">Editorial & Fact-Check</option>
                <option value="bug">Design & Polish</option>
                <option value="feature_idea">Custom Concept</option>
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-1.5">
              <label className="font-label-caps text-[10px] tracking-[0.25em] uppercase font-semibold text-slate-taupe">
                Urgency Tier
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as NotePriority)}
                className="w-full px-3 py-2 bg-white border border-silk-border rounded text-xs text-ink-black focus:outline-none focus:border-ink-black cursor-pointer"
              >
                <option value="urgent">Urgent Attention</option>
                <option value="medium">Standard Registry</option>
                <option value="low">Catalog Backlog</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="font-label-caps text-[10px] tracking-[0.25em] uppercase font-semibold text-slate-taupe">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as NoteStatus)}
                className="w-full px-3 py-2 bg-white border border-silk-border rounded text-xs text-ink-black focus:outline-none focus:border-ink-black cursor-pointer"
              >
                <option value="open">Action Required</option>
                <option value="in_progress">Under Review</option>
                <option value="waiting_external">Blocked: External Dependency</option>
                <option value="resolved">Resolved & Cleared</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Location Pinpointer */}
          <div className="p-4 rounded-lg bg-cream-container border border-silk-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-[10px] tracking-[0.25em] uppercase font-semibold text-slate-taupe">
                Target Architectural Location *
              </span>
              <button
                type="button"
                onClick={() => setIsCustomPath(!isCustomPath)}
                className="text-[10px] font-label-caps uppercase tracking-wider text-bronze-hover hover:text-ink-black transition-colors"
              >
                {isCustomPath ? '← Select from Catalog Directory' : '+ Enter Custom Route'}
              </button>
            </div>

            {!isCustomPath ? (
              <select
                value={selectedPresetPath}
                onChange={(e) => setSelectedPresetPath(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-silk-border rounded text-xs text-ink-black focus:outline-none focus:border-ink-black cursor-pointer"
              >
                {['Core Portals', 'Sections', 'Destinations', 'Curated Portfolios'].map((groupName) => (
                  <optgroup key={groupName} label={groupName}>
                    {PAGE_PRESETS.filter((p) => p.group === groupName).map((p) => (
                      <option key={p.path} value={p.path}>
                        {p.label} ({p.path})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="URL Path (e.g. /tours/royal-odyssey)"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                  className="px-3 py-2 bg-white border border-silk-border rounded text-xs text-ink-black focus:outline-none focus:border-ink-black"
                />
                <input
                  type="text"
                  placeholder="Descriptive Monograph Label"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  className="px-3 py-2 bg-white border border-silk-border rounded text-xs text-ink-black focus:outline-none focus:border-ink-black"
                />
              </div>
            )}

            {/* Asset / File Path (Optional) */}
            <div className="pt-2 border-t border-silk-border">
              <label className="font-label-caps text-[10px] tracking-[0.2em] uppercase font-semibold text-slate-taupe block mb-1">
                Associated Asset / Image File Path (Optional)
              </label>
              <input
                type="text"
                value={assetPath}
                onChange={(e) => setAssetPath(e.target.value)}
                placeholder="/images/welcome/taj-balcony-sunrise.jpg"
                className="w-full px-3 py-2 bg-white border border-silk-border rounded text-xs font-mono text-ink-black focus:outline-none focus:border-ink-black"
              />
            </div>
          </div>

          {/* External Dependency Panel (Restrained Luxury Callout) */}
          {(hasExternalDep || status === 'waiting_external') && (
            <div className="p-4 rounded-lg bg-cream-container border-l-2 border-l-bronze-hover border-y border-r border-silk-border space-y-3">
              <div className="flex items-center gap-2 text-ink-black">
                <Clock className="w-3.5 h-3.5 text-bronze-hover" />
                <span className="font-serif text-sm font-semibold tracking-tight">
                  External Dependency & Third-Party Blocker
                </span>
              </div>
              <p className="text-[11px] text-slate-taupe leading-relaxed">
                Record the third-party stakeholder, supplier, or licensing agent whose delivery is required before this action item can be completed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-label-caps uppercase tracking-wider font-semibold text-slate-taupe">
                    Dependency Nature
                  </label>
                  <select
                    value={depType}
                    onChange={(e) => setDepType(e.target.value as ExternalDependencyType)}
                    className="w-full px-3 py-2 bg-white border border-silk-border rounded text-xs text-ink-black cursor-pointer"
                  >
                    <option value="photographer_delivery">Commissioned Photography Delivery</option>
                    <option value="licensing_purchase">Commercial Rights & Licensing Acquisition</option>
                    <option value="client_approval">Client / Estate Stakeholder Clearance</option>
                    <option value="content_creation">Academic Historian / Scholar Input</option>
                    <option value="developer_task">Engineering & Architecture Task</option>
                    <option value="other">General Third-Party Prerequisite</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-label-caps uppercase tracking-wider font-semibold text-slate-taupe">
                    Contact / Agency Liaison (Optional)
                  </label>
                  <input
                    type="text"
                    value={depContact}
                    onChange={(e) => setDepContact(e.target.value)}
                    placeholder="e.g. Vikram Chawla (Agra Studio Studio Lead)"
                    className="w-full px-3 py-2 bg-white border border-silk-border rounded text-xs text-ink-black"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-label-caps uppercase tracking-wider font-semibold text-slate-taupe">
                  Specific Blocker Description & Next Milestones *
                </label>
                <input
                  type="text"
                  value={depDetails}
                  onChange={(e) => setDepDetails(e.target.value)}
                  placeholder="e.g. Awaiting delivery of high-res master RAW files from dawn photoshoot"
                  className="w-full px-3 py-2 bg-white border border-silk-border rounded text-xs text-ink-black"
                />
              </div>
            </div>
          )}

          {/* Detailed Observations / Monograph Notes */}
          <div className="space-y-1.5">
            <label className="font-label-caps text-[10px] tracking-[0.25em] uppercase font-semibold text-slate-taupe">
              Monograph Observations & Technical Directive
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Record exact prompt formulations, lighting specifications, license parameters, historical references, or instructions for future iterations..."
              className="w-full px-3.5 py-2.5 bg-white border border-silk-border rounded text-xs text-ink-black focus:outline-none focus:border-ink-black leading-relaxed"
            />
          </div>

          {/* Action Checklist Builder */}
          <div className="space-y-2 pt-2 border-t border-silk-border">
            <label className="font-label-caps text-[10px] tracking-[0.25em] uppercase font-semibold text-slate-taupe block">
              Execution Milestones
            </label>

            <div className="space-y-1.5">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 p-2.5 rounded bg-white border border-silk-border text-xs"
                >
                  <label className="flex items-center gap-2.5 cursor-pointer flex-grow">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() =>
                        setChecklist(
                          checklist.map((c) => (c.id === item.id ? { ...c, done: !c.done } : c))
                        )
                      }
                      className="rounded border-silk-border text-ink-black focus:ring-0"
                    />
                    <span className={item.done ? 'line-through text-slate-taupe' : 'text-ink-black font-medium'}>
                      {item.text}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveChecklistItem(item.id)}
                    className="text-slate-taupe hover:text-ink-black p-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newChecklistText}
                onChange={(e) => setNewChecklistText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddChecklistItem();
                  }
                }}
                placeholder="+ Add execution milestone (e.g. Inspect color balance, Update folder)"
                className="flex-grow px-3 py-2 bg-white border border-silk-border rounded text-xs text-ink-black"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddChecklistItem}
                className="text-xs border-silk-border"
              >
                Add
              </Button>
            </div>
          </div>
        </form>

        {/* Editorial Footer */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-silk-border bg-alabaster-cream">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isSaving} className="border-silk-border">
            Dismiss
          </Button>
          <Button variant="default" size="sm" onClick={handleSubmit} disabled={isSaving} className="shadow-sm">
            {isSaving ? 'Recording...' : noteToEdit ? 'Update Entry' : 'Record Ledger Entry'}
          </Button>
        </div>
      </div>
    </div>
  );
}