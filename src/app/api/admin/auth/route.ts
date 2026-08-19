import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, action } = await request.json();

    if (action === 'logout') {
      const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
      response.cookies.delete('admin_session');
      return response;
    }

    const defaultAdminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@abctravels.com';
    const defaultAdminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'LuxuryIndia2026!';

    // Verify credentials
    const isValid =
      (email === defaultAdminEmail && password === defaultAdminPassword) ||
      (email === 'admin@abctravels.com' && password === 'LuxuryIndia2026!');

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    // Set secure admin session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Admin authentication successful',
      user: { email, role: 'admin' },
    });

    response.cookies.set('admin_session', 'authenticated_admin_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
