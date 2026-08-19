import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
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

    let createdInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      ...payload,
      departure_date: payload.departure_date || undefined,
      preferred_contact: payload.preferred_contact || 'WhatsApp',
      special_requests: cleanSpecialRequests || undefined,
      status: 'NEW',
      created_at: new Date().toISOString(),
    };

    // 1. Try to persist to Supabase if configured
    try {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('inquiries')
          .insert([
            {
              tour_id: payload.tour_id || null,
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
            },
          ])
          .select();

        if (!error && data && data.length > 0) {
          createdInquiry = {
            ...data[0],
            preferred_contact: payload.preferred_contact || 'WhatsApp',
            departure_date: payload.departure_date || data[0].departure_date,
          } as Inquiry;
        } else if (error) {
          console.error('[Supabase Insert Error]:', error);
        }
      }
    } catch (dbErr) {
      console.error('[Database Error]:', dbErr);
    }

    // 2. Trigger automatic SMTP email notification in background
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
