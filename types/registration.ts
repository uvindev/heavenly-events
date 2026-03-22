export const RegistrationType = {
  VISITOR: 'VISITOR',
  EXHIBITOR: 'EXHIBITOR',
} as const;

export type RegistrationType = (typeof RegistrationType)[keyof typeof RegistrationType];

export const RegistrationStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
} as const;

export type RegistrationStatus = (typeof RegistrationStatus)[keyof typeof RegistrationStatus];

export interface Registration {
  id: number;
  ticketId: string;
  qrCode: string | null;
  registrationType: RegistrationType;
  fullName: string;
  email: string;
  phone: string;
  additionalNotes: string | null;
  companyName: string | null;
  companyPhone: string | null;
  companyWebsite: string | null;
  businessCategory: string | null;
  boothSize: string | null;
  exhibitorMessage: string | null;
  formResponses: Record<string, unknown> | null;
  status: RegistrationStatus;
  checkedIn: boolean;
  checkedInAt: Date | null;
  emailSent: boolean;
  emailSentAt: Date | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  fbclid: string | null;
  gclid: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  referrer: string | null;
  reviewedBy: number | null;
  reviewedAt: Date | null;
  reviewNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
  eventId: number;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date';
  required: boolean;
  placeholder?: string;
  options?: string[];
  helpText?: string;
  displayOrder: number;
}

export interface VisitorRegistrationInput {
  fullName: string;
  email: string;
  phone: string;
  additionalNotes?: string;
  formResponses?: Record<string, unknown>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  fbclid?: string;
  gclid?: string;
}

export interface ExhibitorRegistrationInput {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  companyPhone?: string;
  companyWebsite?: string;
  businessCategory?: string;
  boothSize?: string;
  exhibitorMessage?: string;
  additionalNotes?: string;
  formResponses?: Record<string, unknown>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  fbclid?: string;
  gclid?: string;
}
