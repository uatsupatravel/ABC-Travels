import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, action } = await request.json();
    const supabase = await createClient();

    if (action === 'logout') {
      await supabase.auth.signOut();
      return NextResponse.json({ success: true, message: 'Logged out successfully' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message || 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin authentication successful',
      user: data.user,
    });
  } catch (error) {
    console.error('Auth Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
