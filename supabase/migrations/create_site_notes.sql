-- Create site_notes table for Admin Site Ledger & Audit
CREATE TABLE IF NOT EXISTS public.site_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('ai_asset', 'warning', 'editorial', 'bug', 'feature_idea')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('urgent', 'medium', 'low')),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_external', 'resolved', 'archived')),
    page_path TEXT NOT NULL DEFAULT '/',
    page_label TEXT NOT NULL DEFAULT 'Homepage',
    asset_path TEXT,
    content TEXT NOT NULL,
    external_dependency JSONB,
    action_checklist JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast status and category queries
CREATE INDEX IF NOT EXISTS idx_site_notes_status ON public.site_notes(status);
CREATE INDEX IF NOT EXISTS idx_site_notes_category ON public.site_notes(category);
CREATE INDEX IF NOT EXISTS idx_site_notes_created_at ON public.site_notes(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.site_notes ENABLE ROW LEVEL SECURITY;

-- Allow all operations for staff/anon for now (secured behind admin route)
CREATE POLICY "Allow public read/write for site_notes" ON public.site_notes
    FOR ALL
    USING (true)
    WITH CHECK (true);