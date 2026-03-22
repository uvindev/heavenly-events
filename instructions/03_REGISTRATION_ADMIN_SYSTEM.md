# HEAVENLY EVENTS — REGISTRATION SYSTEM, EXHIBITOR FORMS & ADMIN ROLES
## Developer Instruction File 03
### Authored by UVIN VINDULA (IAMUVIN)

---

> **This file specifies the complete dual registration system (Visitor + Exhibitor), per-event customizable form architecture, admin user roles, access control hierarchy, and backend management specifications.**

---

## TABLE OF CONTENTS

1. [Dual Registration System Overview](#1-dual-registration-system-overview)
2. [Visitor Registration — Full Spec](#2-visitor-registration--full-spec)
3. [Exhibitor Registration — Full Spec](#3-exhibitor-registration--full-spec)
4. [Per-Event Custom Form Builder](#4-per-event-custom-form-builder)
5. [QR Code System — Full Flow](#5-qr-code-system--full-flow)
6. [Email Templates — Both Registration Types](#6-email-templates--both-registration-types)
7. [Admin User Roles & Access Control](#7-admin-user-roles--access-control)
8. [Admin Panel — Complete Feature Specification](#8-admin-panel--complete-feature-specification)
9. [Database Schema — Registration Extensions](#9-database-schema--registration-extensions)
10. [API Endpoints — Full Reference](#10-api-endpoints--full-reference)
11. [Check-in System — Gate Management](#11-check-in-system--gate-management)
12. [Data Export & Reporting](#12-data-export--reporting)
13. [Security Rules for Admin System](#13-security-rules-for-admin-system)

---

## 1. DUAL REGISTRATION SYSTEM OVERVIEW

Every event on the Heavenly Events platform supports **two distinct registration types**:

```
┌─────────────────────────────────────────────────────────────────┐
│                    HEAVENLY EVENTS REGISTRATION                  │
├─────────────────────────────┬───────────────────────────────────┤
│     VISITOR REGISTRATION    │    EXHIBITOR REGISTRATION         │
│         (Free Entry)        │       (Booth / Stall)             │
├─────────────────────────────┼───────────────────────────────────┤
│ For: General public,        │ For: Companies, institutions,     │
│ students, shoppers,         │ brands, service providers         │
│ attendees                   │ who want to exhibit               │
├─────────────────────────────┼───────────────────────────────────┤
│ Process: Instant confirm    │ Process: Admin review required    │
│ QR ticket: Immediate        │ QR ticket: After admin approval   │
│ Email: Auto                 │ Email: Confirmation + follow-up   │
│ Status: CONFIRMED           │ Status: PENDING → APPROVED        │
├─────────────────────────────┼───────────────────────────────────┤
│ Fields: Name, Phone, Email  │ Fields: Company, Contact, Type,   │
│ + event-specific extras     │ Booth size + event-specific extras│
└─────────────────────────────┴───────────────────────────────────┘
```

### UX Placement on Event Page

```
Event Page Layout:
  ┌────────────────────────────────────────────┐
  │         [EVENT HERO IMAGE]                 │
  │         Event Title                        │
  │         Date · Venue                       │
  ├──────────────────────┬─────────────────────┤
  │  EVENT DETAILS       │  REGISTRATION PANEL  │
  │  (left 65%)          │  (right 35%, sticky) │
  │                      │                     │
  │  Description         │  [Tab: VISITOR]      │
  │  Schedule            │  [Tab: EXHIBITOR]    │
  │  Sponsors            │                     │
  │  Gallery             │  [Active Form]       │
  │  Map                 │                     │
  └──────────────────────┴─────────────────────┘

Mobile:
  ┌────────────────────────────────┐
  │         [EVENT HERO]           │
  │         Event Details          │
  │         (full width scroll)    │
  ├────────────────────────────────┤
  │  [STICKY BOTTOM BAR]           │
  │  [Register as Visitor →]       │
  │  [Register as Exhibitor →]     │
  └────────────────────────────────┘
  → Opens full-screen bottom sheet with tabs
```

---

## 2. VISITOR REGISTRATION — FULL SPEC

### 2.1 Base Form Fields (All Events)

```typescript
// These fields appear on EVERY visitor registration form
const visitorBaseFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    required: true,
    validation: { min: 2, max: 255 },
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "07X XXX XXXX",
    prefix: "+94",
    required: true,
    validation: { pattern: /^(\+94|0)[0-9]{9}$/ },
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "your@email.com",
    required: true,
    validation: { format: "email" },
  },
  // Below: event-specific extras appended dynamically
]
```

### 2.2 Visitor Form UX Design

```
DESKTOP (sticky sidebar panel):

  ┌─────────────────────────────────┐
  │  Register as Visitor            │
  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
  │  ✓ FREE ENTRY                   │
  │  ✓ QR Ticket via Email          │
  │  ✓ Instant Confirmation         │
  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
  │  Full Name*                     │
  │  [                           ]  │
  │  Phone Number*                  │
  │  [+94 ] [                    ]  │
  │  Email Address*                 │
  │  [                           ]  │
  │  [Event-specific extras here]   │
  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
  │  [  Register Free Now  →  ]     │
  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
  │  127 people already registered  │
  └─────────────────────────────────┘

SUCCESS STATE (inline — no page reload):
  ┌─────────────────────────────────┐
  │           🎉                    │
  │  You're on the list!            │
  │                                 │
  │  Check your email for your      │
  │  QR entry ticket.               │
  │                                 │
  │  [View Your Ticket]             │
  │  [Share This Event]             │
  └─────────────────────────────────┘
```

### 2.3 Registration Flow Logic

```typescript
// Visitor Registration Flow:

// Step 1: Client validates form with Zod
// Step 2: Capture UTM params, fbclid, gclid from URL/sessionStorage
// Step 3: POST /api/register/visitor
// Step 4: Server validates event exists and is PUBLISHED
// Step 5: Check duplicate (same email + eventId) → return existing ticketId if found
// Step 6: Check capacity (if maxCapacity set)
// Step 7: Create Registration record (status: CONFIRMED immediately)
// Step 8: Generate unique ticketId (cuid)
// Step 9: Generate QR code PNG (base64)
// Step 10: Save QR to registration record
// Step 11: Increment event.registrationCount
// Step 12: Fire sendVisitorConfirmationEmail() — async, non-blocking
// Step 13: Return { success: true, ticketId, message }
// Step 14: Client fires Meta Pixel "Lead" + GA4 "generate_lead"
// Step 15: Show inline success state
```

---

## 3. EXHIBITOR REGISTRATION — FULL SPEC

### 3.1 Base Exhibitor Form Fields (All Events)

```typescript
const exhibitorBaseFields = [
  // Contact Person
  {
    name: "contactName",
    label: "Contact Person Name",
    type: "text",
    required: true,
  },
  {
    name: "contactPhone",
    label: "Contact Phone",
    type: "tel",
    prefix: "+94",
    required: true,
  },
  {
    name: "contactEmail",
    label: "Business Email",
    type: "email",
    required: true,
  },
  // Company Details
  {
    name: "companyName",
    label: "Company / Brand Name",
    type: "text",
    required: true,
  },
  {
    name: "companyPhone",
    label: "Company Phone (if different)",
    type: "tel",
    required: false,
  },
  {
    name: "companyWebsite",
    label: "Website or Social Media Page",
    type: "url",
    placeholder: "https://",
    required: false,
  },
  // Booth
  {
    name: "boothSize",
    label: "Preferred Booth / Space Size",
    type: "select",
    options: ["Single Table", "3×3m", "3×6m", "6×6m", "Custom — I will discuss"],
    required: true,
  },
  {
    name: "message",
    label: "Tell us about your business and what you plan to exhibit",
    type: "textarea",
    minLength: 30,
    required: true,
  },
  // Below: event-specific category fields appended dynamically
]
```

### 3.2 Exhibitor Registration UX

```
EXHIBITOR TAB (same registration panel, different tab):

  ┌─────────────────────────────────┐
  │  Exhibit at This Event          │
  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
  │  ⚠ Exhibitor slots are limited  │
  │  Submit your interest and our   │
  │  team will contact you.         │
  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
  │  Contact Person Name*           │
  │  [                           ]  │
  │  Contact Phone*                 │
  │  [                           ]  │
  │  Business Email*                │
  │  [                           ]  │
  │  Company Name*                  │
  │  [                           ]  │
  │  Business Category*             │
  │  [ Select category      ▾ ]     │
  │  Booth Size*                    │
  │  [ Select size          ▾ ]     │
  │  About Your Business*           │
  │  [                           ]  │
  │  [                           ]  │
  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
  │  [  Submit Exhibitor Interest]  │
  └─────────────────────────────────┘

POST-SUBMIT SUCCESS:
  "Thank you for your exhibitor interest!
   Our team will contact you within 48 hours.
   For faster response: 📞 (+94) 77 777 6357"
```

### 3.3 Exhibitor Flow Logic

```
Exhibitor registration DIFFERS from visitor in these ways:

1. Status starts as: PENDING (not CONFIRMED)
2. No QR code generated immediately
3. Email sent: "Interest Received — We'll contact you"
4. Admin receives notification email: "New Exhibitor Interest for [Event]"
5. Admin reviews in backend → Approves or Rejects
6. On APPROVE:
   - Status → APPROVED
   - QR code generated
   - Exhibitor confirmation email sent WITH QR
7. On REJECT:
   - Status → REJECTED
   - Polite rejection email sent with "contact us to discuss further"
```

---

## 4. PER-EVENT CUSTOM FORM BUILDER

> **This is a core admin feature. Only UVIN (Super Admin) can modify form schemas.**

### 4.1 How It Works

Each event in the database has a `formSchema` JSON field that defines additional fields beyond the base fields. The frontend dynamically renders these fields.

### 4.2 Database Field

```prisma
// Add to Event model in schema.prisma:
model Event {
  // ... existing fields ...

  // Custom form fields (JSON array)
  visitorFormSchema  Json?  @map("visitor_form_schema")
  exhibitorFormSchema Json? @map("exhibitor_form_schema")
}
```

### 4.3 Form Schema JSON Structure

```typescript
// Example: Colombo Wedding Show visitor form extra fields
const weddingShowVisitorSchema = [
  {
    id: "weddingDate",
    label: "Approximate Wedding Date",
    type: "date",          // text | email | tel | date | select | radio | checkbox | textarea
    required: false,
    placeholder: "",
    options: [],           // For select/radio only
    helpText: "Optional — helps us personalize recommendations",
    displayOrder: 1,
  },
  {
    id: "partnerName",
    label: "Partner's Name",
    type: "text",
    required: false,
    placeholder: "Optional",
    options: [],
    helpText: "",
    displayOrder: 2,
  }
]

// Example: Education Fair visitor form
const eduFairVisitorSchema = [
  {
    id: "currentGrade",
    label: "Current Academic Level",
    type: "select",
    required: true,
    options: [
      "O/L Student",
      "A/L Student",
      "Diploma Level",
      "Degree Level",
      "Working Professional",
      "Parent / Guardian"
    ],
    helpText: "",
    displayOrder: 1,
  },
  {
    id: "subjectStream",
    label: "Subject Stream",
    type: "select",
    required: false,
    options: ["Science", "Commerce", "Arts", "Technology", "Other"],
    helpText: "",
    displayOrder: 2,
  },
  {
    id: "interestedField",
    label: "Interested Field of Study",
    type: "text",
    required: false,
    placeholder: "e.g., Medicine, Engineering, Business...",
    options: [],
    helpText: "",
    displayOrder: 3,
  }
]
```

### 4.4 Frontend Dynamic Form Renderer

```typescript
// components/events/DynamicFormFields.tsx

interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'radio' | 'checkbox' | 'textarea'
  required: boolean
  placeholder?: string
  options?: string[]
  helpText?: string
  displayOrder: number
}

interface Props {
  schema: FormField[]
  register: UseFormRegister<any>
  errors: FieldErrors
}

export function DynamicFormFields({ schema, register, errors }: Props) {
  const sortedFields = [...schema].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <>
      {sortedFields.map((field) => (
        <FormFieldRenderer
          key={field.id}
          field={field}
          register={register}
          error={errors[field.id]}
        />
      ))}
    </>
  )
}
```

### 4.5 Admin Form Builder Interface

```
LOCATION: /admin/events/[id]/form-builder

VISITOR FORM TAB:
  [+ Add Field] button
  
  Existing fields (drag to reorder):
  ┌─────────────────────────────────────────────────┐
  │ ⠿  Full Name       [text]   [Required] [–]      │
  │ ⠿  Phone Number    [tel]    [Required] [–]      │
  │ ⠿  Email Address   [email]  [Required] [–]      │
  │ ─ ─ ─ ─ ─ ─ ─ ─ (custom fields below) ─ ─ ─ ─ │
  │ ⠿  Wedding Date    [date]   [Optional] [Edit][✕]│
  │ ⠿  Partner Name    [text]   [Optional] [Edit][✕]│
  └─────────────────────────────────────────────────┘
  
  [Add Field Modal]:
    Field Label:     [                    ]
    Field Type:      [select field type ▾]
    Required?:       [Yes] [No]
    Placeholder:     [                    ]
    Options (if select/radio):
      [Option 1]  [Option 2]  [+ Add]
    Help Text:       [                    ]
    [Save Field]

EXHIBITOR FORM TAB:
  Same interface for exhibitor-specific fields.

IMPORTANT: Base fields (Name, Phone, Email / Company, Contact, Booth) 
           CANNOT be removed — they are locked.
           Only extra fields can be added/removed/reordered.

ACCESS: Only UVIN (Super Admin) can modify form schemas.
        Admin and Editor roles can VIEW but cannot edit forms.
```

---

## 5. QR CODE SYSTEM — FULL FLOW

### 5.1 QR Code Data Payload

```typescript
// What gets encoded in each QR code:
interface QRPayload {
  t: string    // ticketId (cuid)
  e: number    // eventId
  r: 'V' | 'X' // registration type: V = Visitor, X = eXhibitor
  v: number    // version (for future schema changes)
}

// Example encoded string:
const payload = JSON.stringify({
  t: "clx8k2m3n0000abc123",
  e: 42,
  r: "V",
  v: 1
})
// Result QR encodes: {"t":"clx8k2m3n0000abc123","e":42,"r":"V","v":1}
```

### 5.2 QR Code Visual Specification

```typescript
// lib/qr.ts
import QRCode from 'qrcode'

export async function generateTicketQR(payload: string): Promise<string> {
  return QRCode.toDataURL(payload, {
    type: 'image/png',
    width: 500,           // High resolution for printing
    margin: 3,
    errorCorrectionLevel: 'H',   // H = 30% damage recovery
    color: {
      dark:  '#070708',   // Near black (brand)
      light: '#FFFFFF',
    }
  })
}
```

### 5.3 Ticket Page Specification (`/ticket/[ticketId]`)

```
URL: /ticket/[ticketId]

This page must:
1. Fetch registration details by ticketId (server-side)
2. Display clean, print-friendly ticket
3. Work fully offline once loaded (critical for venues with poor wifi)
4. Be mobile-first (most users open on phone at gate)

PAGE STRUCTURE:
─────────────────────────────────────────────────
[Heavenly Events Logo — centered, 140px wide]
[3px Rainbow bar]
─────────────────────────────────────────────────
   🎉 YOU'RE ON THE LIST!

   [EVENT NAME — Cormorant, large, event primary color]
   
   📅  [Full Date & Time]
   📍  [Venue Name] — [City]
─────────────────────────────────────────────────
   REGISTRATION TYPE BADGE:
   [VISITOR ENTRY] or [EXHIBITOR]  ← colored badge
─────────────────────────────────────────────────
   [QR CODE — 280px × 280px, centered]
   
   TICKET ID
   [clx8k2m3n0000abc123 — monospace font]
─────────────────────────────────────────────────
   Name:   Kasun Perera
   Email:  kasun@example.com
   Phone:  +94 77 xxx xxxx (partially masked)
─────────────────────────────────────────────────
   ⚠ Please present this QR code at the gate.
   No printout required — your phone is your ticket.
─────────────────────────────────────────────────
   [Add to Google Calendar]  [Add to Apple Calendar]
─────────────────────────────────────────────────
   SPONSORED BY
   [Sponsor logos — small row]
─────────────────────────────────────────────────
   Questions? Contact us:
   📞 (+94) 77 777 6357
   ✉️ info@heavenlyevents.lk
─────────────────────────────────────────────────

PRINT BUTTON: [🖨 Print Ticket] — triggers window.print()
CSS: @media print { hide nav, hide footer, show ticket only }
```

---

## 6. EMAIL TEMPLATES — BOTH REGISTRATION TYPES

### 6.1 Visitor Confirmation Email

```
SUBJECT: "🎉 You're on the list! Your QR ticket for [Event Name]"

FROM: noreply@heavenlyevents.lk
FROM NAME: Heavenly Events

─────────────────────────────────────────── [600px max-width]
[Heavenly Events Logo — centered, on dark #070708 bg]
[3px rainbow gradient bar]

  Hi [First Name],

  You're officially on the list for:

─────────────────────────────────────────────────────────────
  [EVENT COVER IMAGE or EVENT LOGO — full width, max 600px]
─────────────────────────────────────────────────────────────

  [EVENT NAME — large, event primary color]

  📅  [Full Event Date & Day]
  ⏰  [Start Time] — Doors open [Doors Open Time, if set]
  📍  [Venue Name], [City]

─────────────────────────────────────────────────────────────
  YOUR ENTRY QR CODE
  Show this at the gate. No printing needed.

  [QR CODE PNG — 250×250px, embedded as base64 img]

  TICKET ID:  [clx8k2m3n0000abc123]
  TYPE:       Visitor Entry
─────────────────────────────────────────────────────────────

  [ADD TO GOOGLE CALENDAR]   [ADD TO APPLE CALENDAR]

─────────────────────────────────────────────────────────────
  EVENT SPONSORS
  [Sponsor logos — max height 60px, inline, centered]
─────────────────────────────────────────────────────────────

  See you there! 🎊
  — The Heavenly Events Team

  Questions? We're here:
  📞 (+94) 77 777 6357 | ✉️ info@heavenlyevents.lk
  [Facebook] [WhatsApp]

─────────────────────────────────────────────────────────────
  Heavenly Events | No. 190, Royal Pearl Garden, Wattala
  © 2025 Heavenly Events. All rights reserved.
  [Unsubscribe from event updates]
─────────────────────────────────────────────────────────────
```

### 6.2 Exhibitor Interest Received Email

```
SUBJECT: "Your Exhibitor Application for [Event Name] — Received"

─────────────────────────────────────────────────────────────
  Hi [Contact Name],

  Thank you for your interest in exhibiting at
  [Event Name].

  We have received your application from [Company Name]
  and our team is reviewing it now.

  WHAT HAPPENS NEXT:
  ① Our team reviews your application (within 48 hours)
  ② We'll contact you to discuss booth requirements
  ③ On confirmation, you'll receive your Exhibitor QR pass

  YOUR APPLICATION SUMMARY:
  ─────────────────────────────
  Company:   [Company Name]
  Contact:   [Contact Name]
  Category:  [Selected Category]
  Booth:     [Selected Booth Size]
  ─────────────────────────────

  For faster response:
  📞 (+94) 77 777 6357
  ✉️ info@heavenlyevents.lk
  💬 WhatsApp: wa.me/94777776357
─────────────────────────────────────────────────────────────
```

### 6.3 Exhibitor Approval Email

```
SUBJECT: "✅ Confirmed! Your Exhibitor Pass for [Event Name]"

─────────────────────────────────────────────────────────────
  Hi [Contact Name],

  Great news — [Company Name] has been confirmed
  as an exhibitor at [Event Name]!

  [EVENT DETAILS]

  YOUR EXHIBITOR QR PASS:
  [QR CODE — 250×250px]
  TICKET ID: [ticketId]
  TYPE: Exhibitor

  This QR pass is for authorized personnel
  entry and booth setup access.

  For any queries: info@heavenlyevents.lk
─────────────────────────────────────────────────────────────
```

### 6.4 Event Reminder Email (24 Hours Before)

```
SUBJECT: "⏰ Tomorrow! [Event Name] — Your QR Ticket Inside"

─────────────────────────────────────────────────────────────
  Hi [First Name],

  Just a reminder — [Event Name] is TOMORROW!

  📅 [Date]
  ⏰ [Time] (Doors open: [Doors Time])
  📍 [Venue], [City]

  [YOUR QR CODE — 250×250px]

  [Get Directions →] — links to Google Maps
─────────────────────────────────────────────────────────────
```

### 6.5 Email Technical Requirements

```
HTML Email Rules:
  ✅ All CSS inline (Gmail compatibility)
  ✅ Max width: 600px
  ✅ QR: embedded as data:image/png;base64 (no external URL needed)
  ✅ Dark header: #070708
  ✅ Body background: #F8F5F0
  ✅ Font stack: -apple-system, 'Helvetica Neue', Arial, sans-serif
  ✅ Font size: 16px body, 24px event name
  ✅ Mobile responsive with <style> media queries
  ✅ Tested: Gmail app, Outlook, Apple Mail, iPhone, Android

Sending Rules:
  ✅ From: noreply@heavenlyevents.lk
  ✅ Reply-To: info@heavenlyevents.lk
  ✅ DMARC / DKIM: Configure via Hostinger email settings
  ✅ Unsubscribe link: Required in footer (CAN-SPAM compliance)
  ✅ Sending: async — never blocks the API response
  ✅ Retry: 3 attempts with 5-minute spacing on failure
```

---

## 7. ADMIN USER ROLES & ACCESS CONTROL

### 7.1 Role Hierarchy

```
┌──────────────────────────────────────────────────────────────┐
│                    ROLE HIERARCHY                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  👑 SUPER_ADMIN — UVIN (IAMUVIN)                            │
│     Username: uvin@heavenlyevents.lk                         │
│     ─────────────────────────────────────                    │
│     • Full access to everything                              │
│     • Can create/delete admin accounts                       │
│     • Can modify form schemas                                │
│     • Can change site settings (GTM, Pixel, phone, etc.)     │
│     • Can delete events, registrations, data                 │
│     • Cannot be deleted by other admins                      │
│     • Master password change: only from Super Admin panel    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  🔧 ADMIN — User 2 (e.g., Amila / Office Manager)           │
│     Username: admin@heavenlyevents.lk                        │
│     ─────────────────────────────────────                    │
│     • Create and edit events                                 │
│     • Publish / unpublish events                             │
│     • View and manage registrations                          │
│     • Approve/reject exhibitor registrations                 │
│     • Upload gallery photos                                  │
│     • Manage sponsors                                        │
│     • View inquiries                                         │
│     • Access check-in mode                                   │
│     • Export registration CSV                                │
│     ✗ CANNOT: Modify form schemas                            │
│     ✗ CANNOT: Change site settings (analytics, SMTP)         │
│     ✗ CANNOT: Create or delete admin accounts                │
│     ✗ CANNOT: Delete events with existing registrations      │
│     ✗ CANNOT: Access billing/hosting settings                │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  📝 EDITOR — User 3 (e.g., Marketing / Event Staff)         │
│     Username: editor@heavenlyevents.lk                       │
│     ─────────────────────────────────────                    │
│     • Create and edit DRAFT events                           │
│     • View registrations (read-only, no export)              │
│     • Upload gallery photos                                  │
│     • View inquiries (read-only)                             │
│     • Access check-in mode (scan QR at gate)                 │
│     ✗ CANNOT: Publish events (ADMIN must publish)            │
│     ✗ CANNOT: Approve exhibitors                             │
│     ✗ CANNOT: Delete anything                                │
│     ✗ CANNOT: Export data                                    │
│     ✗ CANNOT: Modify sponsors                                │
│     ✗ CANNOT: View financial or contact data                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 7.2 Default Admin Accounts (Seeded at Deployment)

```typescript
// prisma/seed.ts — Admin users
const adminUsers = [
  {
    email:        "uvin@heavenlyevents.lk",
    fullName:     "Uvin Vindula",
    role:         "SUPER_ADMIN",
    // Password: SET SECURELY ON FIRST LOGIN — see deployment doc
    // Default temporary password provided in separate secure channel
  },
  {
    email:        "admin@heavenlyevents.lk",
    fullName:     "Office Admin",
    role:         "ADMIN",
    // Password: Provided by Uvin directly
  },
  {
    email:        "editor@heavenlyevents.lk",
    fullName:     "Events Editor",
    role:         "EDITOR",
    // Password: Provided by Uvin directly
  }
]
```

> **🔒 SECURITY CRITICAL:** Default passwords must be changed on first login. Implement `mustChangePassword: Boolean` flag. Force password change screen if this flag is `true`.

### 7.3 Permission Matrix

```typescript
type Permission =
  | 'events:create'    | 'events:edit'     | 'events:delete'
  | 'events:publish'   | 'events:formEdit'
  | 'registrations:view' | 'registrations:export' | 'registrations:delete'
  | 'registrations:approve'
  | 'gallery:upload'   | 'gallery:delete'
  | 'sponsors:manage'
  | 'inquiries:view'   | 'inquiries:delete'
  | 'checkin:access'
  | 'settings:view'    | 'settings:edit'
  | 'admins:manage'
  | 'blog:create'      | 'blog:edit'       | 'blog:delete'

const permissions: Record<AdminRole, Permission[]> = {
  SUPER_ADMIN: ['*'],   // All permissions

  ADMIN: [
    'events:create', 'events:edit', 'events:publish',
    'registrations:view', 'registrations:export', 'registrations:approve',
    'gallery:upload', 'gallery:delete',
    'sponsors:manage',
    'inquiries:view',
    'checkin:access',
    'blog:create', 'blog:edit',
    'settings:view',
  ],

  EDITOR: [
    'events:create', 'events:edit',         // create DRAFT only
    'registrations:view',                   // read-only
    'gallery:upload',
    'inquiries:view',
    'checkin:access',
    'blog:create', 'blog:edit',
  ],
}
```

### 7.4 Frontend Permission Guard

```typescript
// hooks/usePermission.ts
import { useAdminStore } from '@/store/adminStore'

export function usePermission(permission: Permission): boolean {
  const { currentUser } = useAdminStore()
  if (!currentUser) return false
  if (currentUser.role === 'SUPER_ADMIN') return true
  return permissions[currentUser.role]?.includes(permission) ?? false
}

// Usage in component:
const canPublish = usePermission('events:publish')
{canPublish && <PublishButton />}
```

---

## 8. ADMIN PANEL — COMPLETE FEATURE SPECIFICATION

### 8.1 Admin Login Page

```
URL: /admin/login
Design: Minimal, centered card on dark background
Logo: Heavenly Events logo
Title: "Admin Access"
Subtitle: "Heavenly Events Management System"

Form:
  Email:    [input, type="email"]
  Password: [input, type="password", toggle visibility]
  [Sign In →]

Security:
  ✅ Rate limited: 5 failed attempts → 15 min lockout
  ✅ Lockout message: "Too many attempts. Try again in [X] minutes."
  ✅ No "Forgot Password" link visible (prevents enumeration)
  ✅ Password reset: via Super Admin only (or secure CLI command)
  ✅ JWT stored in HttpOnly, Secure, SameSite=Strict cookie
  ✅ Session expires: 8 hours (configurable)
  ✅ /admin/login NOT linked from public website
  ✅ /admin/login NOT indexed by Google (noindex meta)
```

### 8.2 Dashboard Overview Page

```
URL: /admin/dashboard

HEADER: "Good [morning/afternoon/evening], [Admin Name] 👋"

TOP STAT CARDS ROW:
┌──────────┬──────────┬──────────┬──────────┐
│  TOTAL   │REGISTERED│ EXHIBITOR│ PENDING  │
│  EVENTS  │  TODAY   │INQUIRIES │ APPROVAL │
│   [12]   │  [47]    │   [8]    │   [3]    │
└──────────┴──────────┴──────────┴──────────┘

UPCOMING EVENTS (quick view):
  Table: Event | Date | Registrations | Status | [Manage]

RECENT REGISTRATIONS (last 10):
  Table: Name | Event | Type | Time | Status

EXHIBITOR APPROVALS NEEDED:
  If any pending: Banner with count + [Review Now] button

SYSTEM HEALTH:
  • Last email sent: [timestamp]
  • Database: Connected ✅
  • Storage: [X]MB used / [Y]MB total
```

### 8.3 Events Management

```
URL: /admin/events
PERMISSION: events:create, events:edit (all roles)

LIST VIEW:
  Columns: Title | Category | Date | Registrations | Status | Actions
  Actions: [Edit] [View Page ↗] [Check-in] [Duplicate] [Delete]
  
  Status badges:
    DRAFT → Gray
    PUBLISHED → Green
    COMPLETED → Blue
    CANCELLED → Red

  Quick toggle: Publish/Unpublish (ADMIN+ only)
  Filter: By Status | Category | Date
  Search: Title

  [+ Create New Event] button → /admin/events/new

─────────────────────────────────────────────────────
EVENT EDITOR: /admin/events/[id]

TABS:
  [Basic Info] [Date & Location] [Theme & Media] [Form Builder] [Schedule] [SEO]

─────────────────────────────────────────────────────
TAB 1: Basic Info
  • Event Title*
  • Slug (auto-generated, editable)
  • Short Description* (max 500 chars, with char counter)
  • Full Description* (Tiptap rich text editor)
  • Category* (dropdown: all EventCategory enum values)
  • Is Client Event? (toggle)
    → If YES: Client Name field appears
  • Status (DRAFT/PUBLISHED/CANCELLED/COMPLETED)
  • Facebook Page URL

TAB 2: Date & Location
  • Event Date* (datetime picker)
  • Event End Date (datetime picker)
  • Doors Open Time (time picker)
  • Registration Deadline (datetime picker)
  • Max Capacity (number, blank = unlimited)
  • Requires Exhibitor Approval? (toggle)
  • Venue Name*
  • Venue Address*
  • City*
  • Google Maps URL (standard link for directions)
  • Google Maps Embed URL (iframe src — for display on page)
    [Test Embed] button preview

TAB 3: Theme & Media
  • Cover Image (drag & drop, accepts JPG/PNG/WEBP, max 10MB)
    → Shows preview + crop tool
    → Generates WebP + thumbnail automatically on upload
  • OG Share Image (separate, 1200×630px recommended)
  • Event Primary Color (color picker + hex input)
  • Event Secondary Color (color picker + hex input)
  • Event Accent Color (color picker + hex input)
  → Live preview: shows how card will look with selected colors
  • Facebook Page URL

TAB 4: Form Builder
  [SUPER ADMIN ONLY — locked for ADMIN and EDITOR]
  See Section 4.5 for full spec

TAB 5: Schedule
  • Add schedule items: [+ Add Item]
  • Each item: Time (text) | Title | Description | Sort Order
  • Drag to reorder
  • Example:
    "6:30 PM | Doors Open | Registration and arrival"
    "7:00 PM | Welcome Address | Opening remarks"
    "7:30 PM | Main Exhibition Opens | All stalls open"

TAB 6: SEO
  • Meta Title (max 70 chars, with counter)
  • Meta Description (max 160 chars, with counter)
  • OG Image (reuse from Tab 3 or upload separate)
  → Preview: shows how it looks on Google + Facebook share

SAVE: Auto-saves every 30s (draft) + manual Save button
PUBLISH: Separate button (ADMIN+ only) with confirmation modal:
  "Are you sure you want to publish [Event Name]?
  This will make it visible to the public."
```

### 8.4 Registrations Management

```
URL: /admin/registrations
PERMISSION: registrations:view (all roles)

FILTERS ROW:
  [Event ▾] [Type: Visitor/Exhibitor ▾] [Status ▾] [Date Range] [Search: name/email]

TABLE COLUMNS (Visitor):
  # | Name | Email | Phone | Event | Registered | Status | Checked In | Actions

TABLE COLUMNS (Exhibitor):
  # | Company | Contact | Email | Event | Category | Booth | Submitted | Status | Actions

ACTIONS:
  • View Full Details (modal/drawer)
  • Resend Confirmation Email
  • Mark as Checked In (manual)
  [ADMIN+] Approve Exhibitor
  [ADMIN+] Reject Exhibitor
  [SUPER_ADMIN] Delete Registration

TOP BAR ACTIONS [ADMIN+]:
  [Export CSV ↓]  [Export Excel ↓]  [Send Reminder to All]

─────────────────────────────────────────────────
EXHIBITOR APPROVAL QUEUE:
  Filter: Status = PENDING
  
  Each row:
  Company Name | Contact | Event | Category | Booth | Applied At
  [View Details] [✅ Approve] [❌ Reject]
  
  On Approve → confirmation modal → sends approval email + QR
  On Reject  → reason field (optional) → sends rejection email

─────────────────────────────────────────────────
REGISTRATION DETAIL MODAL:
  Full name, email, phone
  Event name + date
  Registration type (Visitor/Exhibitor)
  Ticket ID
  QR Code preview
  Status
  Check-in status + timestamp
  Custom form answers (event-specific fields)
  UTM source / medium / campaign
  Referrer URL
  IP address [SUPER_ADMIN only]
  Registered at timestamp
  
  Actions:
  [Resend Email] [View Ticket Page ↗] [Change Status] [Delete]
```

### 8.5 Gallery Management

```
URL: /admin/gallery
PERMISSION: gallery:upload (EDITOR+)

UPLOAD AREA:
  Drag & drop or click to upload
  Supports: JPG, JPEG, PNG, WEBP
  Max size: 10MB per file
  Batch upload: Up to 20 files at once

PROCESSING (auto on upload):
  → Resize to max 2000px wide (maintain aspect ratio)
  → Convert to WebP (quality 85)
  → Generate thumbnail (400×300 WebP, quality 75)
  → Generate blur placeholder (8×6 JPEG → base64)
  → Extract dimensions
  → Save to /public/uploads/gallery/
  → Create GalleryItem record in DB

GALLERY GRID:
  Displays all uploaded images
  Each card shows:
    • Thumbnail
    • Alt text (editable inline)
    • Category badge
    • Featured toggle (star icon)
    • Sort order number
    • [Edit] [Delete] buttons

EDIT MODAL:
  • Alt Text*
  • Caption
  • Category* (dropdown)
  • Event (optional — link to specific event)
  • Featured (toggle — shows on homepage)
  • Sort Order

BULK ACTIONS:
  Select multiple → [Set Category] [Set Featured] [Delete Selected]

FILTER: By Category | By Event | Featured only
```

### 8.6 Sponsor Management

```
URL: /admin/sponsors
PERMISSION: sponsors:manage (ADMIN+)

SPONSOR LIST:
  Columns: Logo | Name | Tier | Website | Active | Sort | Actions

ADD SPONSOR:
  • Name*
  • Logo Upload* (PNG/SVG preferred, transparent background)
  • Logo Alt Text*
  • Website URL
  • Description (short)
  • Tier*: PLATINUM | GOLD | SILVER | STANDARD
  • Active: toggle
  • Sort Order: number

EVENT SPONSOR LINKING:
  In Event Editor → Sponsors tab:
  [+ Add Sponsor to This Event]
  Dropdown: All active sponsors
  Set tier for this specific event
  
  This allows same sponsor at different tiers for different events.
```

### 8.7 Blog / News Management

```
URL: /admin/blog
PERMISSION: blog:create (EDITOR+)

LIST:
  Columns: Title | Category | Published At | Status | Actions

EDITOR:
  • Title*
  • Slug (auto-generated)
  • Cover Image
  • Category (dropdown)
  • Tags (comma-separated)
  • Body (Tiptap rich text with image upload)
  • Excerpt (auto-generated from first 160 chars, or custom)
  • Author (defaults to logged-in user name)
  • Published At (schedulable)
  • Status: DRAFT / PUBLISHED
  • SEO: meta title, meta desc

PUBLISH: ADMIN+ only
DELETE: ADMIN+ only
```

### 8.8 Site Settings (Super Admin Only)

```
URL: /admin/settings
PERMISSION: settings:edit (SUPER_ADMIN only)

SECTIONS:

① General
  • Site Name
  • Tagline
  • Phone 1 (shows on website)
  • Phone 2
  • General Email
  • Office Address
  • WhatsApp Number

② Analytics & Tracking
  • Google Tag Manager ID (GTM-XXXXXX)
  • Google Analytics 4 Measurement ID (G-XXXXXXXXXX)
  • Meta Pixel ID
  • Google Search Console Verification Code

③ Email / SMTP Settings
  • SMTP Host
  • SMTP Port
  • SMTP Username
  • SMTP Password (masked, show/hide toggle)
  • From Name
  • From Email
  [Test Email] button → sends test to admin email

④ Social Media Links
  • Facebook URL
  • Instagram URL
  • YouTube URL
  • WhatsApp Number

⑤ Admin Account Management
  • List of all admin accounts
  • [Change Password] for any account
  • [Deactivate Account]
  • [Create New Admin Account]
    → Email, Full Name, Role, Temporary Password
  → SUPER_ADMIN account itself cannot be deactivated from this panel

⑥ Danger Zone (SUPER_ADMIN only, red UI)
  • Clear old registrations (by date range + event)
  • Rebuild sitemap
  • Clear image cache
  • Export all data (full backup JSON)
```

---

## 9. DATABASE SCHEMA — REGISTRATION EXTENSIONS

```prisma
// Add these to schema.prisma

// Enhanced Registration model
model Registration {
  // ... existing fields from File 01 ...

  // Registration type
  registrationType  RegistrationType  @default(VISITOR) @map("registration_type")

  // Exhibitor-specific fields (null for visitors)
  companyName       String?           @db.VarChar(255) @map("company_name")
  companyPhone      String?           @db.VarChar(20)  @map("company_phone")
  companyWebsite    String?           @db.VarChar(500) @map("company_website")
  businessCategory  String?           @db.VarChar(100) @map("business_category")
  boothSize         String?           @db.VarChar(50)  @map("booth_size")
  exhibitorMessage  String?           @db.Text         @map("exhibitor_message")

  // Custom form field responses (JSON)
  formResponses     Json?             @map("form_responses")
  // Example: {"currentGrade": "A/L Student", "subjectStream": "Science"}

  // Admin action tracking
  reviewedBy        Int?              @map("reviewed_by")  // adminUserId
  reviewedAt        DateTime?         @map("reviewed_at")
  reviewNotes       String?           @db.VarChar(500) @map("review_notes")
}

enum RegistrationType {
  VISITOR
  EXHIBITOR
}
```

---

## 10. API ENDPOINTS — FULL REFERENCE

### Public Endpoints

```
GET  /api/events                    → List published events
GET  /api/events/upcoming           → Upcoming events (date > now)
GET  /api/events/[slug]             → Single event by slug
GET  /api/gallery                   → Gallery items (with filter params)
GET  /api/sponsors                  → Active sponsors (with tier grouping)
GET  /api/ticket/[ticketId]         → Validate + return ticket data

POST /api/register/visitor          → Visitor registration
POST /api/register/exhibitor        → Exhibitor registration
POST /api/contact                   → Contact form submission
```

### Admin Endpoints (All require JWT cookie)

```
POST /api/admin/auth/login          → Login (returns JWT cookie)
POST /api/admin/auth/logout         → Logout (clears cookie)
GET  /api/admin/auth/me             → Current admin user

GET  /api/admin/events              → All events (incl. drafts)
POST /api/admin/events              → Create event
GET  /api/admin/events/[id]         → Single event (full data)
PUT  /api/admin/events/[id]         → Update event
DELETE /api/admin/events/[id]       → Delete event [SUPER_ADMIN]
POST /api/admin/events/[id]/publish → Publish event [ADMIN+]

GET  /api/admin/registrations               → All registrations (filterable)
GET  /api/admin/registrations/[id]          → Single registration
PUT  /api/admin/registrations/[id]/approve  → Approve exhibitor [ADMIN+]
PUT  /api/admin/registrations/[id]/reject   → Reject exhibitor [ADMIN+]
POST /api/admin/registrations/checkin       → Check in by QR scan
POST /api/admin/registrations/[id]/resend   → Resend confirmation email
GET  /api/admin/registrations/export        → Export CSV [ADMIN+]
DELETE /api/admin/registrations/[id]        → Delete [SUPER_ADMIN]

POST /api/admin/gallery/upload      → Upload images [EDITOR+]
DELETE /api/admin/gallery/[id]      → Delete image [ADMIN+]
PUT  /api/admin/gallery/[id]        → Update alt/category

GET  /api/admin/sponsors            → All sponsors [ADMIN+]
POST /api/admin/sponsors            → Create sponsor [ADMIN+]
PUT  /api/admin/sponsors/[id]       → Update sponsor [ADMIN+]
DELETE /api/admin/sponsors/[id]     → Delete sponsor [SUPER_ADMIN]

GET  /api/admin/inquiries           → Contact form submissions [ADMIN+]
PUT  /api/admin/inquiries/[id]      → Update status [ADMIN+]

GET  /api/admin/settings            → Get site settings [SUPER_ADMIN]
PUT  /api/admin/settings            → Update settings [SUPER_ADMIN]

GET  /api/admin/dashboard/stats     → Dashboard statistics
```

---

## 11. CHECK-IN SYSTEM — GATE MANAGEMENT

### 11.1 Check-in Interface

```
URL: /admin/checkin/[eventId]
PERMISSION: checkin:access (all roles)

Optimized for: Mobile phone (event staff use this on their phones at the gate)

SCREEN LAYOUT:
┌─────────────────────────────────┐
│  HEAVENLY EVENTS                │
│  Colombo Wedding Show 2026      │
│  ─────────────────────────────  │
│  CHECKED IN: 127 / 500          │
│  ████████████░░░░░░░  25%       │
│  ─────────────────────────────  │
│                                 │
│        [ 📷 SCAN QR ]           │
│                                 │
│   OR ENTER TICKET ID MANUALLY:  │
│   [ clx8k2m...    ] [Check In]  │
│                                 │
│  ─────────────────────────────  │
│  RECENT CHECK-INS:              │
│  ✅ Kasun Perera   9:47 AM      │
│  ✅ Nimal Silva    9:45 AM      │
│  ✅ Amara Peris    9:43 AM      │
└─────────────────────────────────┘

SCAN RESULT:
  SUCCESS (green full-screen flash):
  ┌─────────────────────────────────┐
  │           ✅                    │
  │                                 │
  │  WELCOME!                       │
  │  Kasun Perera                   │
  │  VISITOR — Colombo Wedding Show │
  │                                 │
  │  [TAP TO SCAN NEXT]             │
  └─────────────────────────────────┘

  ALREADY CHECKED IN (orange flash):
  ┌─────────────────────────────────┐
  │           ⚠                    │
  │  ALREADY CHECKED IN             │
  │  Kasun Perera                   │
  │  Checked in at 9:47 AM          │
  │  [TAP TO SCAN NEXT]             │
  └─────────────────────────────────┘

  INVALID TICKET (red flash):
  ┌─────────────────────────────────┐
  │           ❌                    │
  │  INVALID TICKET                 │
  │  This QR code is not valid      │
  │  for this event.                │
  │  [TAP TO SCAN NEXT]             │
  └─────────────────────────────────┘
```

### 11.2 QR Scanner Implementation

```typescript
// Use @zxing/browser for QR scanning (no native app required)
// Or use native camera with MediaStream API

import { BrowserMultiFormatReader } from '@zxing/browser'

const codeReader = new BrowserMultiFormatReader()

// Start scanning from back camera (mobile)
codeReader.decodeFromVideoDevice(
  undefined,     // undefined = use default/back camera
  videoElement,
  (result, error) => {
    if (result) {
      handleQRScan(result.getText())
    }
  }
)
```

### 11.3 Check-in API

```typescript
// POST /api/admin/checkin
// Body: { ticketId: string, eventId: number }

// Server validates:
// 1. JWT cookie (admin authenticated)
// 2. ticketId exists in registrations
// 3. Registration belongs to eventId
// 4. Registration status is CONFIRMED or APPROVED
// 5. NOT already checked in

// On success:
//   → Set checkedIn = true, checkedInAt = now()
//   → Return: { success: true, name, registrationType }

// On already checked in:
//   → Return: { success: false, reason: 'ALREADY_CHECKED_IN', name, checkedInAt }

// On invalid:
//   → Return: { success: false, reason: 'INVALID_TICKET' }
```

---

## 12. DATA EXPORT & REPORTING

### 12.1 CSV Export Format

```
File name: heavenly-events_[EventName]_registrations_[Date].csv

VISITOR CSV COLUMNS:
Registration ID, Ticket ID, Full Name, Email, Phone, Event Name, Event Date,
Registration Type, Status, Checked In, Checked In At, Registered At,
UTM Source, UTM Medium, UTM Campaign, Referrer, [Custom Form Fields...]

EXHIBITOR CSV COLUMNS:
Registration ID, Ticket ID, Contact Name, Company Name, Email, Phone,
Company Website, Category, Booth Size, Message, Event Name, Event Date,
Status, Reviewed By, Reviewed At, Submitted At,
UTM Source, UTM Medium, UTM Campaign

ACCESS: ADMIN+ only
FORMAT: UTF-8 BOM (for Excel compatibility with Unicode/Sinhala characters)
```

### 12.2 Dashboard Analytics

```
ADMIN DASHBOARD shows:
  • Total registrations per event (visitor + exhibitor separate)
  • Daily registration chart (last 30 days)
  • Registration source breakdown (UTM sources)
  • Check-in rate per event (checked in / total registered × 100%)
  • Top events by registration count
  • Exhibitor approval queue count
  • Pending inquiries count
```

---

## 13. SECURITY RULES FOR ADMIN SYSTEM

```
✅ All admin routes protected by middleware.ts JWT check
✅ JWT stored HttpOnly cookie — not accessible via JS
✅ JWT expiry: 8 hours — requires re-login
✅ bcrypt password hashing — 12 salt rounds minimum
✅ Rate limiting on /api/admin/auth/login: 5 attempts / 15 min
✅ Login lockout stored server-side (DB or in-memory cache)
✅ Admin panel not indexed by search engines (noindex header)
✅ Admin login URL not linked from public website
✅ All CRUD actions logged with admin user ID and timestamp
✅ Soft delete pattern for critical data (mark deleted, don't drop)
✅ File uploads: UUID rename, whitelist type check, max size enforced
✅ CSRF protection: SameSite=Strict cookie + origin check
✅ SQL injection: Prevented by Prisma ORM (parameterized queries only)
✅ XSS prevention: All user content sanitized before storage/display
✅ Role-based checks both on frontend (UI) AND backend (API)
   — Never trust frontend role checks alone
✅ Super Admin operations: Additional confirmation dialogs
✅ Password change: Requires current password verification
✅ Audit log: Record every admin action (create/edit/delete/approve)
   stored in AdminAuditLog table
```

---

*Document Version: 1.0 | For Heavenly Events Development Team*
*Authored by UVIN VINDULA — IAMUVIN | iamuvin.com*
*Classification: Confidential — Admin Credentials in Separate Secure Channel*
