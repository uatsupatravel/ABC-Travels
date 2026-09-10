import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendInquiryNotificationEmail } from '@/lib/email';
import { Inquiry } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const isIsoDate =
      typeof payload.departure_date === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(payload.departure_date);

    const dbDepartureDate = isIsoDate ? payload.departure_date : null;
    const cleanSpecialRequests =
      payload.special_requests && payload.special_requests.trim().length > 0
        ? payload.special_requests.trim()
        : null;

    const isUuid =
      typeof payload.tour_id === 'string' &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(payload.tour_id);
    const dbTourId = isUuid ? payload.tour_id : null;

    // Use the Service Role Key to bypass RLS, because this is an unauthenticated public submission
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          tour_id: dbTourId,
          tour_title: payload.tour_title || 'Custom India Tailormade Journey',
          traveler_name: payload.traveler_name,
          email: payload.email,
          phone: payload.phone || null,
          country: payload.country,
          departure_date: dbDepartureDate,
          duration_days: Number(payload.duration_days) || 7,
          guests_count: Number(payload.guests_count) || 2,
          budget_tier: payload.budget_tier || 'Premium Luxury',
          travel_styles: payload.travel_styles || [],
          special_requests: cleanSpecialRequests,
          status: 'NEW',
          admin_notes: !isUuid && payload.tour_id ? `Catalog Tour: ${payload.tour_id}` : null,
        },
      ])
      .select();

    if (error || !data || data.length === 0) {
      console.error('[Supabase Insert Error]:', error);
      return NextResponse.json(
        { success: false, message: 'Database insertion failed', details: error },
        { status: 500 }
      );
    }

    const createdInquiry = {
      ...data[0],
      preferred_contact: payload.preferred_contact || 'WhatsApp',
      departure_date: payload.departure_date || data[0].departure_date,
    } as Inquiry;

    // Trigger automatic SMTP email notification in background
    try {
      await sendInquiryNotificationEmail(createdInquiry);
    } catch (mailErr) {
      console.error('[Email Notification Error]:', mailErr);
    }

    return NextResponse.json({ success: true, inquiry: createdInquiry });
  } catch (error: any) {
    console.error('[API Inquiries Handler Error]:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
