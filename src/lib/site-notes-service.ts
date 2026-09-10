import { SiteNote, PagePreset } from '@/types/site-notes';

export const PAGE_PRESETS: PagePreset[] = [
  // Core Public Portals
  { path: '/', label: 'Homepage', group: 'Core Portals' },
  { path: '/about', label: 'Our Story & Philosophy', group: 'Core Portals' },
  { path: '/plan-your-trip', label: 'Custom Itinerary Planning Wizard', group: 'Core Portals' },
  { path: '/contact', label: 'Concierge Direct Channel', group: 'Core Portals' },
  { path: '/destinations', label: 'Subcontinent Destinations Directory', group: 'Core Portals' },
  { path: '/tours', label: 'Curated Portfolios Directory', group: 'Core Portals' },

  // Homepage Architectural Sections
  { path: '/#hero', label: 'Homepage > Cinematic Hero Monograph', group: 'Sections' },
  { path: '/#welcome-section', label: 'Homepage > Sensory Welcome & Asymmetric Parallax', group: 'Sections' },
  { path: '/#realms', label: 'Homepage > The Four Geographic Realms', group: 'Sections' },
  { path: '/#portfolios', label: 'Homepage > Signature Curated Departures', group: 'Sections' },
  { path: '/#reviews', label: 'Homepage > Guest Reflections Editorial Slider', group: 'Sections' },

  // Destination Monograph Guides
  { path: '/destinations/rajasthan', label: 'Destination: Rajasthan & Golden Triangle', group: 'Destinations' },
  { path: '/destinations/kerala', label: 'Destination: Kerala & The Spice Coast', group: 'Destinations' },
  { path: '/destinations/ladakh', label: 'Destination: Ladakh & The High Himalayas', group: 'Destinations' },
  { path: '/destinations/varanasi', label: 'Destination: Varanasi & The Sacred Ganges', group: 'Destinations' },
  { path: '/destinations/ranthambore', label: 'Destination: Ranthambore & Royal Tiger Wilds', group: 'Destinations' },
  { path: '/destinations/goa', label: 'Destination: Goa & Portuguese Heritage Coast', group: 'Destinations' },

  // Curated Portfolio Expeditions
  { path: '/tours/golden-triangle-royal-palaces', label: 'Portfolio: The Royal Odyssey (Rajasthan)', group: 'Curated Portfolios' },
  { path: '/tours/kerala-backwaters-ayurveda-sanctuary', label: 'Portfolio: Kerala Sanctuary (Backwaters & Ayurveda)', group: 'Curated Portfolios' },
  { path: '/tours/ladakh-high-himalayas-expedition', label: 'Portfolio: Himalayan High Passes (Ladakh)', group: 'Curated Portfolios' },
  { path: '/tours/ranthambore-tiger-safari-expedition', label: 'Portfolio: The Sovereign Wild (Tiger Reserves)', group: 'Curated Portfolios' },
  { path: '/tours/varanasi-sacred-ganges-spiritual', label: 'Portfolio: Sacred Ganges & Timeless Varanasi', group: 'Curated Portfolios' },
];

const LOCAL_STORAGE_KEY = 'abc_travels_site_notes_v2';

export const SEED_NOTES: SiteNote[] = [
  {
    id: 'note-seed-1',
    title: 'Asset Verification: Taj Balcony Sunrise Monograph',
    category: 'ai_asset',
    priority: 'urgent',
    status: 'waiting_external',
    page_path: '/#welcome-section',
    page_label: 'Homepage > Sensory Welcome & Asymmetric Parallax',
    asset_path: '/images/welcome/taj-balcony-sunrise.jpg',
    content: 'Current asset is an AI-generated conceptual composition depicting a private sunrise view of the Taj Mahal. Requires replacement with high-resolution authentic editorial photography commissioned from the Oberoi Amarvilas estate.',
    external_dependency: {
      required: true,
      type: 'photographer_delivery',
      details: 'Awaiting high-resolution RAW captures from commissioned Agra estate photographer.',
      owner_contact: 'Vikram Chawla (Lead Photographer, Agra Studio)',
    },
    action_checklist: [
      { id: 'c1', text: 'Document generation prompt and source orientation', done: true },
      { id: 'c2', text: 'Dispatch brief to Agra estate photographer for dawn shoot', done: true },
      { id: 'c3', text: 'Inspect RAW plates for color temperature and shadow fidelity', done: false },
      { id: 'c4', text: 'Deploy final master photo to /images/welcome/taj-balcony-sunrise.jpg', done: false },
    ],
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'note-seed-2',
    title: 'Compliance Review: Ladakh Aerial Survey & Drone Permissions',
    category: 'warning',
    priority: 'urgent',
    status: 'open',
    page_path: '/destinations/ladakh',
    page_label: 'Destination: Ladakh & The High Himalayas',
    asset_path: '/images/destinations/ladakh/hero.jpg',
    content: 'Confirm that all high-altitude landscape captures of Pangong Tso and Khardung La adhere to civil aviation permissions and UT Ladakh sensitive border photography regulations.',
    external_dependency: {
      required: true,
      type: 'licensing_purchase',
      details: 'Awaiting commercial license certificate and border clearance dispatch from Leh tourism authorities.',
      owner_contact: 'Leh District Liaison & Cultural Heritage Officer',
    },
    action_checklist: [
      { id: 'c5', text: 'Audit commercial license deed with expedition photographer', done: false },
      { id: 'c6', text: 'Add formal photo credits in footer catalog registry if required', done: false },
    ],
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'note-seed-3',
    title: 'Historical Fact-Check: Lake Palace Udaipur Monograph',
    category: 'editorial',
    priority: 'medium',
    status: 'in_progress',
    page_path: '/tours/golden-triangle-royal-palaces',
    page_label: 'Portfolio: The Royal Odyssey (Rajasthan)',
    content: 'Review the Day 7 itinerary narrative detailing Maharana Jagat Singh II and the 1746 foundation of Jag Niwas. Ensure genealogical nomenclature aligns with the City Palace Museum scholarly archives.',
    action_checklist: [
      { id: 'c7', text: 'Consult Mewar historical society publication archives', done: true },
      { id: 'c8', text: 'Refine Day 7 royal barge narrative prose for understated luxury tone', done: false },
    ],
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getSiteNotes(): Promise<SiteNote[]> {
  try {
    const res = await fetch('/api/admin/notes', { cache: 'no-store' });
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.data));
      }
      return json.data;
    }
  } catch (err) {
    console.warn('API fetch failed, reading from local cache:', err);
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // parsing error
      }
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SEED_NOTES));
  }

  return SEED_NOTES;
}

export async function saveSiteNote(note: SiteNote): Promise<SiteNote> {
  const isNew = !note.id || note.id.startsWith('new-');
  const finalNote: SiteNote = {
    ...note,
    id: isNew ? 'note-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7) : note.id,
    created_at: note.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    const method = isNew ? 'POST' : 'PUT';
    await fetch('/api/admin/notes', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalNote),
    });
  } catch (e) {
    console.warn('Could not sync to DB directly, persisting to local storage:', e);
  }

  if (typeof window !== 'undefined') {
    const existing = await getSiteNotes();
    let updated: SiteNote[];
    if (isNew) {
      updated = [finalNote, ...existing];
    } else {
      updated = existing.map((n) => (n.id === finalNote.id ? finalNote : n));
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }

  return finalNote;
}

export async function deleteSiteNote(id: string): Promise<boolean> {
  try {
    await fetch(`/api/admin/notes?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (e) {
    console.warn('Could not delete from DB, deleting from local storage:', e);
  }

  if (typeof window !== 'undefined') {
    const existing = await getSiteNotes();
    const updated = existing.filter((n) => n.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }

  return true;
}

export function exportNotesToJson(notes: SiteNote[]): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(notes, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `abc_travels_site_ledger_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}