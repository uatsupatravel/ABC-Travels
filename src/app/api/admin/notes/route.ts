import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('site_notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // Table may not exist yet or connection issue
      return NextResponse.json({ success: false, fallback: true, error: error.message }, { status: 200 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, fallback: true, error: error?.message || 'Server error' }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const note = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('site_notes')
      .insert([
        {
          id: note.id,
          title: note.title,
          category: note.category,
          priority: note.priority,
          status: note.status,
          page_path: note.page_path,
          page_label: note.page_label,
          asset_path: note.asset_path || null,
          content: note.content,
          external_dependency: note.external_dependency || null,
          action_checklist: note.action_checklist || [],
          created_at: note.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, fallback: true, error: error.message }, { status: 200 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, fallback: true, error: error?.message || 'Server error' }, { status: 200 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const note = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('site_notes')
      .update({
        title: note.title,
        category: note.category,
        priority: note.priority,
        status: note.status,
        page_path: note.page_path,
        page_label: note.page_label,
        asset_path: note.asset_path || null,
        content: note.content,
        external_dependency: note.external_dependency || null,
        action_checklist: note.action_checklist || [],
        updated_at: new Date().toISOString(),
      })
      .eq('id', note.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, fallback: true, error: error.message }, { status: 200 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, fallback: true, error: error?.message || 'Server error' }, { status: 200 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from('site_notes').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ success: false, fallback: true, error: error.message }, { status: 200 });
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, fallback: true, error: error?.message || 'Server error' }, { status: 200 });
  }
}