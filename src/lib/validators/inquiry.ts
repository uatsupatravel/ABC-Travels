import { z } from 'zod';

export const inquirySchema = z.object({
  tour_id: z.string().optional(),
  tour_title: z.string().min(2, 'Please select or enter your desired destination'),
  traveler_name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter your phone/WhatsApp number'),
  country: z.string().min(2, 'Please specify your country of residence'),
  departure_date: z.string().min(1, 'Please select an estimated travel date or month'),
  duration_days: z.coerce.number().min(3, 'Minimum duration is 3 days').max(60, 'Maximum duration is 60 days').default(7),
  guests_count: z.coerce.number().min(1, 'At least 1 traveler required').max(30).default(2),
  group_type: z.string().default('Couple'),
  budget_tier: z.string().min(1, 'Please select your preferred budget tier'),
  travel_styles: z.array(z.string()).default([]),
  preferred_contact: z.string().default('WhatsApp'),
  special_requests: z.string().optional(),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid admin email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;
