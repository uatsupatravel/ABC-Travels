export type NoteStatus = 
  | 'open'                 // Action Required
  | 'in_progress'          // In Progress
  | 'waiting_external'     // Blocked: External Dependency
  | 'resolved'             // Resolved
  | 'archived';            // Archived

export type NoteCategory = 
  | 'ai_asset'             // AI Asset & License
  | 'warning'              // Compliance & Legal
  | 'editorial'            // Editorial & Fact-Check
  | 'bug'                  // Design & Polish
  | 'feature_idea';        // Future Enhancement

export type NotePriority = 'urgent' | 'medium' | 'low';

export type ExternalDependencyType = 
  | 'licensing_purchase'
  | 'photographer_delivery'
  | 'client_approval'
  | 'developer_task'
  | 'content_creation'
  | 'other';

export interface ExternalDependency {
  required: boolean;
  type: ExternalDependencyType;
  details: string;
  owner_contact?: string;
}

export interface NoteChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface SiteNote {
  id: string;
  title: string;
  category: NoteCategory;
  priority: NotePriority;
  status: NoteStatus;
  
  external_dependency?: ExternalDependency;

  page_path: string;
  page_label: string;
  asset_path?: string;
  
  content: string;
  action_checklist?: NoteChecklistItem[];
  
  created_at: string;
  updated_at: string;
}

export interface PagePreset {
  path: string;
  label: string;
  group: 'Core Portals' | 'Destinations' | 'Curated Portfolios' | 'Sections';
}