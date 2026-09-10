import nodemailer from 'nodemailer';
import { Inquiry } from '@/types';

/**
 * Creates and returns a nodemailer transporter based on environment variables.
 * Works with standard Gmail (smtp.gmail.com, port 465) and Hostinger (smtp.hostinger.com, port 465).
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE !== 'false';

  if (!host || !user || !pass || host.includes('placeholder') || pass.includes('placeholder')) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends an instant branded email notification to your concierge inbox whenever a new lead arrives.
 */
export async function sendInquiryNotificationEmail(inquiry: Inquiry): Promise<boolean> {
  const transporter = getTransporter();

  if (!transporter) {
    console.log(
      `[SMTP Notice]: Inquiry #${inquiry.id} received for "${inquiry.traveler_name}". (SMTP credentials not yet configured in .env.local; skipping automatic email).`
    );
    return false;
  }

  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER;
  const cleanPhone = inquiry.phone ? inquiry.phone.replace(/[^0-9+]/g, '') : '';
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.replace('+', '')}`
    : `mailto:${inquiry.email}`;

  const preferredContact = inquiry.preferred_contact || 'WhatsApp';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f7f5; margin: 0; padding: 24px; color: #111; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e0; border-radius: 8px; overflow: hidden; }
          .header { background-color: #1a1a18; color: #ffffff; padding: 24px 28px; text-align: left; }
          .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; font-family: Georgia, serif; }
          .header p { margin: 4px 0 0 0; font-size: 11px; opacity: 0.8; text-transform: uppercase; letter-spacing: 1.5px; }
          .content { padding: 28px; }
          .badge { display: inline-block; background-color: #f0ede6; color: #5a5448; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; margin-bottom: 16px; }
          .grid { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .grid td { padding: 10px 0; border-bottom: 1px solid #f0f0ec; font-size: 13px; vertical-align: top; }
          .grid td.label { width: 38%; color: #666; font-weight: 600; text-transform: uppercase; font-size: 11px; }
          .grid td.val { color: #111; font-weight: 500; }
          .notes { background-color: #fbfbfa; border: 1px solid #ecece8; padding: 14px; border-radius: 6px; font-style: italic; font-size: 13px; color: #333; margin-top: 12px; }
          .btn-container { text-align: center; margin-top: 24px; }
          .contact-pref-box { background-color: #f7f7f5; border: 1px solid #e5e5e0; padding: 10px 14px; border-radius: 6px; font-size: 12px; margin-bottom: 16px; text-align: center; }
          .btn { display: inline-block; background-color: #1a1a18; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
          .footer { padding: 16px 28px; background-color: #fafafa; border-top: 1px solid #f0f0ec; text-align: center; font-size: 11px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ABC Travels: Concierge Desk</h1>
            <p>New Inbound Custom Lead Captured</p>
          </div>
          <div class="content">
            <div class="badge">Inquiry ID: #${inquiry.id.slice(0, 8)}</div>
            
            <table class="grid">
              <tr>
                <td class="label">Traveler Name</td>
                <td class="val"><strong>${inquiry.traveler_name}</strong></td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="val"><a href="mailto:${inquiry.email}" style="color: #111;">${inquiry.email}</a></td>
              </tr>
              <tr>
                <td class="label">Phone / WhatsApp</td>
                <td class="val">${inquiry.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td class="label">Country of Origin</td>
                <td class="val">${inquiry.country}</td>
              </tr>
              <tr>
                <td class="label">Preferred Contact</td>
                <td class="val"><strong>${preferredContact}</strong></td>
              </tr>
              <tr>
                <td class="label">Requested Itinerary</td>
                <td class="val"><strong>${inquiry.tour_title || 'Custom Tailormade Route'}</strong></td>
              </tr>
              <tr>
                <td class="label">Departure Timing</td>
                <td class="val">${inquiry.departure_date || 'Flexible / Open'}</td>
              </tr>
              <tr>
                <td class="label">Duration & Guests</td>
                <td class="val">${inquiry.duration_days} Days &bull; ${inquiry.guests_count} Guests</td>
              </tr>
              <tr>
                <td class="label">Experience Tier</td>
                <td class="val">${inquiry.budget_tier || 'Premium Luxury'}</td>
              </tr>
            </table>

            ${
              inquiry.special_requests && inquiry.special_requests.trim().length > 0
                ? `
                <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #666; margin-top: 16px;">Traveler's Special Requests:</div>
                <div class="notes">&ldquo;${inquiry.special_requests}&rdquo;</div>
              `
                : ''
            }

            <div class="btn-container">
              <div class="contact-pref-box">
                Traveler prefers contact via: <strong>${preferredContact}</strong>
              </div>

              ${
                inquiry.phone
                  ? `<a href="${whatsappUrl}" target="_blank" class="btn" style="background-color: #059669; color: #ffffff;">Chat on WhatsApp VIP Desk</a>`
                  : `<a href="mailto:${inquiry.email}" class="btn">Reply via Email</a>`
              }
            </div>
          </div>
          <div class="footer">
            ABC Travels Inbound Concierge System &bull; Lead logged to Supabase CRM
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"ABC Travels Concierge" <${process.env.SMTP_USER}>`,
      to: recipient,
      subject: `🚨 New Luxury Travel Inquiry: ${inquiry.traveler_name} (${inquiry.country}) | ${inquiry.tour_title || 'Custom Route'}`,
      html: htmlContent,
    });
    console.log(`[SMTP Success]: Notification email sent to ${recipient} for inquiry #${inquiry.id}`);
    return true;
  } catch (error) {
    console.error('[SMTP Error]: Failed to send notification email:', error);
    return false;
  }
}
