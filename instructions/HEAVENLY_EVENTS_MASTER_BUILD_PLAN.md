# HEAVENLY EVENTS — WORLD-CLASS WEBSITE REBUILD
## Master Development Blueprint v1.0
### Architected by UVIN VINDULA (IAMUVIN)
### Technology Founder · Systems Architect · AI-Driven Product Innovator

---

> **"We are not building a website. We are building the digital soul of Sri Lanka's premier event company."**
> — UVIN VINDULA (IAMUVIN)

---

## TABLE OF CONTENTS

1. [Project Vision & Philosophy](#1-project-vision--philosophy)
2. [Logo & Brand Analysis](#2-logo--brand-analysis)
3. [Design System — Color, Typography & Identity](#3-design-system--color-typography--identity)
4. [IAMUVIN Signature Design Language](#4-iamuvin-signature-design-language)
5. [Website Architecture & Sitemap](#5-website-architecture--sitemap)
6. [Page-by-Page Design Specifications](#6-page-by-page-design-specifications)
7. [Technical Stack & Architecture](#7-technical-stack--architecture)
8. [Database Schema Design](#8-database-schema-design)
9. [Backend API Architecture](#9-backend-api-architecture)
10. [Event Registration System + QR Code Engine](#10-event-registration-system--qr-code-engine)
11. [Email System & Transactional Emails](#11-email-system--transactional-emails)
12. [Admin Dashboard (CMS Backend)](#12-admin-dashboard-cms-backend)
13. [Event-Themed Dynamic Color System](#13-event-themed-dynamic-color-system)
14. [Photo Gallery System](#14-photo-gallery-system)
15. [Sponsor Management System](#15-sponsor-management-system)
16. [Maps Integration](#16-maps-integration)
17. [Analytics & Marketing Tracking](#17-analytics--marketing-tracking)
18. [Performance Optimization (PageSpeed 100)](#18-performance-optimization-pagespeed-100)
19. [SEO Architecture](#19-seo-architecture)
20. [Animation & Interaction System](#20-animation--interaction-system)
21. [Hostinger Deployment Architecture](#21-hostinger-deployment-architecture)
22. [Folder Structure](#22-folder-structure)
23. [Security Architecture](#23-security-architecture)
24. [Mobile-First Implementation Guide](#24-mobile-first-implementation-guide)
25. [Development Phases & Timeline](#25-development-phases--timeline)
26. [Post-Launch Monitoring](#26-post-launch-monitoring)
27. [Developer Checklist](#27-developer-checklist)

---

## 1. PROJECT VISION & PHILOSOPHY

### 1.1 Core Mission

Heavenly Events has 18 years of excellence in event management across Sri Lanka. This website must reflect that heritage while positioning it as a **world-class, digitally-native, mobile-first event experience platform** — not just a company website.

Inspiration: **lu.ma (Luma Events)** — the web-app feeling, the ultra-clean mobile UX, the event-centric page design, the instant registration experience. We take that spirit and infuse it with the warmth, color, and cultural richness of Sri Lanka.

### 1.2 What This Website Must Achieve

| Goal | Metric |
|------|--------|
| Google PageSpeed (Mobile) | **100 / 100** |
| Google PageSpeed (Desktop) | **100 / 100** |
| Core Web Vitals | All GREEN |
| LCP | < 1.5s |
| FID / INP | < 100ms |
| CLS | < 0.05 |
| Mobile-first design | Primary viewport: 375px |
| SEO Authority | #1 for "event management Sri Lanka" |
| Conversion Target | ≥ 12% visitor-to-registration rate |

### 1.3 Target Audience Personas

**Persona 1 — The Event Attendee (Primary)**
- Age: 18–40, mobile-first user
- Needs: Fast event discovery, instant free registration, event details (date, location, dress code)
- Behavior: Arrives via Instagram/Facebook link, registers in under 60 seconds, expects a confirmation + QR immediately
- Device: Smartphone (Android or iOS)

**Persona 2 — The Corporate Client (Secondary)**
- Age: 30–55, decision-maker
- Needs: Portfolio proof, 18 years credibility, case studies, clear service packages, contact form
- Behavior: Desktop research, compares competitors, wants a premium brand feel
- Device: Laptop/Desktop

**Persona 3 — The Couple / Family (Tertiary)**
- Age: 25–45, planning weddings, birthdays, anniversaries
- Needs: Gallery inspiration, testimonials, transparent process
- Device: Mixed

### 1.4 Competitive Landscape (Sri Lanka)

After deep research into Sri Lankan event management competitors, the market gaps are:
- No competitor has a Luma-style real-time event registration system
- No competitor has per-event dynamic theming
- No competitor has a clean QR-based check-in workflow
- No competitor has a dedicated sponsor ecosystem section
- Most competitors have 2010-era designs with poor mobile UX

**This website will be the only one that operates like a modern web app.**

---

## 2. LOGO & BRAND ANALYSIS

### 2.1 Logo Observations

From the Heavenly Events logo:
- **Monogram**: "HE" formed by vertical gradient bars — representing stages, spotlights, and event energy
- **Color palette in logo**: Full rainbow spectrum — blue (navy) → magenta/pink → orange → yellow-green → purple → red-orange
- **Typography**: "HEAVENLY" in bold, condensed black — strong, authoritative
- **Typography**: "EVENTS" in elegant serif with a deep crimson/maroon treatment — luxury, prestige
- **Separator line**: Rainbow gradient horizontal rule — the "stage curtain" metaphor

### 2.2 Brand Personality

| Attribute | Expression |
|-----------|-----------|
| Energy | High — celebratory, vibrant |
| Prestige | Premium — 18 years, proven track record |
| Warmth | Human — Sri Lankan hospitality |
| Innovation | Forward-looking — modern digital experience |
| Trust | Reliable — QR systems, professional processes |

---

## 3. DESIGN SYSTEM — COLOR, TYPOGRAPHY & IDENTITY

### 3.1 Primary Color Architecture

```css
:root {
  /* ── BRAND CORE ── */
  --color-crimson:        #8B0045;   /* Primary — from EVENTS text */
  --color-deep-black:     #070708;   /* Background — near absolute black */
  --color-off-white:      #F8F5F0;   /* Light background / card base */
  --color-pure-white:     #FFFFFF;

  /* ── RAINBOW ACCENT SYSTEM (from logo) ── */
  --color-spectrum-1:     #1A1AFF;   /* Deep blue */
  --color-spectrum-2:     #D4006A;   /* Magenta/Hot pink */
  --color-spectrum-3:     #FF6B00;   /* Orange */
  --color-spectrum-4:     #C8E000;   /* Yellow-green */
  --color-spectrum-5:     #7B00E0;   /* Violet */
  --color-spectrum-6:     #FF2200;   /* Red */

  /* ── SIGNATURE GRADIENT (logo rainbow bar) ── */
  --gradient-rainbow: linear-gradient(
    90deg,
    #1A1AFF 0%,
    #D4006A 20%,
    #FF6B00 40%,
    #C8E000 55%,
    #7B00E0 75%,
    #FF2200 100%
  );

  /* ── NEUTRAL SYSTEM ── */
  --color-gray-100:       #F0EDE8;
  --color-gray-200:       #D6D2CC;
  --color-gray-400:       #9A9490;
  --color-gray-600:       #5C5854;
  --color-gray-800:       #2A2724;
  --color-gray-900:       #141210;

  /* ── GLASS / BLUR SURFACES ── */
  --glass-bg:             rgba(255, 255, 255, 0.06);
  --glass-border:         rgba(255, 255, 255, 0.12);
  --glass-bg-light:       rgba(255, 255, 255, 0.75);
  --glass-border-light:   rgba(0, 0, 0, 0.08);

  /* ── SHADOWS ── */
  --shadow-sm:            0 2px 8px rgba(0,0,0,0.08);
  --shadow-md:            0 8px 32px rgba(0,0,0,0.16);
  --shadow-lg:            0 24px 64px rgba(0,0,0,0.24);
  --shadow-crimson:       0 8px 32px rgba(139,0,69,0.32);
  --shadow-glow:          0 0 48px rgba(139,0,69,0.20);

  /* ── SPACING SCALE ── */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;  --space-6: 24px;
  --space-8: 32px;  --space-10: 40px; --space-12: 48px;
  --space-16: 64px; --space-20: 80px; --space-24: 96px;

  /* ── BORDER RADIUS ── */
  --radius-sm:  6px;
  --radius-md:  12px;
  --radius-lg:  20px;
  --radius-xl:  32px;
  --radius-full: 9999px;

  /* ── TRANSITIONS ── */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out:    cubic-bezier(0.0, 0, 0.2, 1);
  --duration-fast:   150ms;
  --duration-normal: 300ms;
  --duration-slow:   600ms;
}
```

### 3.2 Theme Modes

The website supports **Dark Mode (primary)** and **Light Mode (secondary)**:

**Dark Mode** (default — for events):
- Background: `#070708`
- Surface cards: Glass morphism on dark
- Text: `#F8F5F0` primary, `#9A9490` secondary
- Energy level: High — celebratory, electric

**Light Mode** (corporate/services section):
- Background: `#F8F5F0`
- Surface cards: Pure white with subtle shadow
- Text: `#141210` primary, `#5C5854` secondary
- Energy level: Clean, trustworthy, professional

### 3.3 Typography System

```css
/* ── TYPEFACE SELECTION ── */

/* Display / Hero Headlines */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=swap');
/* Use for: Hero titles, event names, section headings */
/* Feel: Luxury, editorial, timeless */

/* UI Headings / Strong Text */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&display=swap');
/* Use for: Subheadings, navigation, labels, CTAs */
/* Feel: Modern, architectural, strong */

/* Body / UI Text */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
/* Use for: Body copy, descriptions, form labels, metadata */
/* Feel: Clean, readable, warm */

/* Monospace (QR codes, ticket IDs) */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

```css
/* ── TYPE SCALE ── */
:root {
  --font-display:   'Cormorant Garamond', Georgia, serif;
  --font-ui:        'Syne', sans-serif;
  --font-body:      'DM Sans', system-ui, sans-serif;
  --font-mono:      'JetBrains Mono', monospace;

  /* Fluid type scale (clamp for mobile-first) */
  --text-hero:   clamp(3rem, 8vw, 7rem);
  --text-h1:     clamp(2.25rem, 5vw, 4rem);
  --text-h2:     clamp(1.75rem, 3.5vw, 2.75rem);
  --text-h3:     clamp(1.25rem, 2.5vw, 1.75rem);
  --text-lg:     clamp(1.05rem, 1.5vw, 1.2rem);
  --text-base:   1rem;
  --text-sm:     0.875rem;
  --text-xs:     0.75rem;

  /* Line heights */
  --leading-tight:  1.1;
  --leading-snug:   1.3;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;

  /* Letter spacing */
  --tracking-tight:  -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.06em;
  --tracking-wider:   0.12em;
}
```

### 3.4 Iconography

**CRITICAL: NO AI-generated icons. NO generic icon packs that look auto-generated.**

Use **Lucide Icons** (open source, hand-crafted SVG icons — clean, human-made):
```bash
npm install lucide-react
```

For custom event category icons, commission SVG illustrations manually or use **Phosphor Icons** as a secondary set.

**NEVER use**: Flaticon generic sets, Font Awesome in its default styling, Material Icons (too generic), or any AI image for icons.

---

## 4. IAMUVIN SIGNATURE DESIGN LANGUAGE

> This is the non-negotiable design signature of UVIN VINDULA. Every element here must appear in the final website.

### 4.1 The "Living Stage" Design Concept

The conceptual foundation: **A website that feels like standing at the threshold of an event venue — you feel the energy, the lights, the anticipation.** Every scroll is like moving deeper into the event experience.

### 4.2 Signature Elements

**① The Rainbow Accent Bar**
- A 3px gradient line (using `--gradient-rainbow`) appears:
  - At the very top of the viewport (full width)
  - Under the logo in the navbar
  - As section dividers (not everywhere — strategic placement)
  - As the bottom border of event cards on hover

**② The "Spotlight" Hero Effect**
- Large, soft radial gradient behind hero text — like a stage spotlight
- `background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,0,69,0.25) 0%, transparent 70%)`
- Subtle animated pulse on this spotlight (CSS `@keyframes`, 4s loop)
- No JavaScript required — pure CSS

**③ Glass Morphism Event Cards**
- `backdrop-filter: blur(20px) saturate(180%)`
- `background: rgba(255,255,255,0.07)`
- `border: 1px solid rgba(255,255,255,0.12)`
- `border-radius: var(--radius-xl)`
- Hover: Card lifts `transform: translateY(-6px)`, border brightens, rainbow bottom bar appears

**④ The Noise Texture Layer**
- A subtle SVG noise texture overlaid on section backgrounds at 3–5% opacity
- Creates analog warmth — feels photographed, not rendered
- `background-image: url("data:image/svg+xml,<svg...noise...")` (inline SVG filter)

**⑤ Fluid Number Counters**
- "18 Years" | "500+ Events" | "10,000+ Guests" | "50+ Sponsors"
- Animated counting up when scrolled into view (Intersection Observer API — no library)
- Font: `--font-display`, enormous size, gradient text fill

**⑥ The "Curtain Reveal" Scroll Animation**
- Section headings: Text slides up and opacity fades in (staggered children)
- Implementation: CSS classes + Intersection Observer (zero library overhead)
- Timing: `animation: slideUp 0.7s var(--ease-spring) both`

**⑦ Magnetic Hover Buttons**
- Primary CTAs have a subtle "magnetic" pull effect on hover (JavaScript — 20 lines max)
- The button slightly follows the cursor within a defined radius
- Adds personality without being gimmicky

**⑧ Event Countdown Timer**
- For each upcoming event: Real-time countdown (Days | Hours | Minutes | Seconds)
- Styled like a film countdown — monospace font, ticking animation on seconds
- Pure React state with `setInterval` — no library

**⑨ The "HE" Watermark Motif**
- Extremely subtle (3–5% opacity) large "HE" letterform appears in hero section backgrounds
- Not visible at first — discovered on closer inspection (signature Easter egg)
- SVG element, CSS opacity + mix-blend-mode

**⑩ The IAMUVIN Credit**
- In the footer: `"Designed & Architected by UVIN VINDULA — IAMUVIN"`
- With a subtle rainbow underline on "IAMUVIN"
- This is the artist's signature on the canvas

---

## 5. WEBSITE ARCHITECTURE & SITEMAP

### 5.1 Site Structure

```
heavenlyevents.lk/
│
├── / (Home)
├── /events (All Events — Public Listing)
│   └── /events/[slug] (Individual Event Page + Registration)
├── /gallery (Photo Gallery)
│   └── /gallery/[category] (Filtered Gallery)
├── /services
│   ├── /services/corporate-events
│   ├── /services/weddings
│   ├── /services/birthdays-private
│   ├── /services/concerts-shows
│   └── /services/client-events (Client-Managed Events)
├── /about (18 Years Story, Team, Values)
├── /sponsors (Sponsor Showcase)
├── /testimonials
├── /contact
├── /blog (Optional Phase 2)
│
├── /register/[eventId] (Quick Registration — Luma-style)
├── /ticket/[ticketId] (Ticket + QR Page)
│
└── /admin (Protected Admin Panel)
    ├── /admin/dashboard
    ├── /admin/events (Create/Edit Events)
    ├── /admin/registrations (View + Export)
    ├── /admin/gallery (Upload/Manage)
    ├── /admin/sponsors (Manage Sponsors)
    ├── /admin/client-events (Client Event Management)
    └── /admin/analytics
```

### 5.2 Navigation Architecture

**Primary Navigation** (sticky, glass morphism):
```
[HE Logo] | Events | Gallery | Services | About | Sponsors | Contact | [Register CTA Button]
```

**Mobile Navigation** (full-screen overlay):
- Smooth slide animation
- Large touch targets (minimum 48px height)
- Current page indicator (rainbow underline)
- Social links at bottom

---

## 6. PAGE-BY-PAGE DESIGN SPECIFICATIONS

### 6.1 HOME PAGE

**Section 1: Hero (Full Viewport)**
```
Layout: Full-screen dark background
Effect: Spotlight radial gradient (animated pulse)
Content:
  - "HE" watermark (5% opacity, giant)
  - Eyebrow text: "SRI LANKA'S PREMIER EVENT COMPANY"
    Font: Syne, 0.75rem, tracking-wider, gradient text
  - H1: "We Create Events That Live Forever"
    Font: Cormorant Garamond, --text-hero, color: #F8F5F0
  - Subtext: "18 years. 500+ events. Memories that transcend time."
    Font: DM Sans, text-lg, color: gray-400
  - CTA Buttons:
    Primary: "Explore Upcoming Events" → /events (crimson bg, magnetic hover)
    Secondary: "Plan Your Event" → /contact (ghost button, rainbow border on hover)
  - Rainbow bar: 3px gradient line at very top of viewport
  - Scroll indicator: Animated chevron down (fade in/out loop)

Background elements:
  - 3–5 soft, blurred color orbs (CSS, absolute positioned, slow float animation)
  - Colors: Spectrum colors at 15% opacity
  - Noise texture overlay (SVG inline, 4% opacity)
```

**Section 2: Stats Bar**
```
4 counters, horizontal row (2x2 on mobile):
  [18+]          [500+]         [10,000+]       [50+]
  Years          Events         Happy Guests    Sponsors

Style:
  - Number: Cormorant Garamond, 4rem, gradient text fill
  - Label: DM Sans, text-sm, tracking-wider, uppercase, gray-400
  - Separator: Vertical line, 1px, rgba(255,255,255,0.15)
  - Animation: Count-up on scroll into view
```

**Section 3: Upcoming Events (Luma-style)**
```
Heading: "What's Happening in Sri Lanka"
Subheading: "Register free for our upcoming events"

Event cards grid:
  - Desktop: 3 columns
  - Tablet: 2 columns
  - Mobile: 1 column (full width, swipeable carousel feel)

Event Card design:
  - Full-width cover image (16:9 ratio, lazy loaded)
  - Event-themed color accent (top border strip, 4px)
  - Glass morphism card body
  - Event badge: Category label (Wedding | Corporate | Concert | etc.)
  - Event name: Syne, font-bold, 1.25rem
  - Date/Time: DM Sans, text-sm, with Lucide Calendar icon
  - Location: DM Sans, text-sm, with Lucide MapPin icon
  - Attendee count: "X people registered" (live count)
  - CTA: "Register Free →" button (event color themed)
  - Countdown timer: Days:Hrs:Min (bottom of card)

Hover state:
  - Card lifts: translateY(-6px)
  - Rainbow border bottom (4px) slides up
  - Soft crimson glow shadow
  - "Register" button fills with color

"View All Events →" link at bottom (rainbow underline)
```

**Section 4: Our Services**
```
Heading: "Every Celebration Deserves Perfection"

Service items (alternating left/right layout — NOT a grid):
  - Corporate Events: image left, text right
  - Weddings & Engagements: image right, text left
  - Birthdays & Private: image left, text right
  - Concerts & Shows: image right, text left
  - Client Events: Full-width banner (different treatment)

Each item:
  - Real photography (NO stock, NO AI images)
  - Service name: Cormorant, h2 size
  - Description: 2–3 sentences
  - "Explore →" link (underline hover animation)
  - Accent: A spectrum color orb behind the image
```

**Section 5: Gallery Teaser**
```
Heading: "Moments We've Made Magic"

Masonry-style grid (CSS Grid, no JS library):
  - Show 9 best photos (mix of event types)
  - Hover: slight scale(1.03) + brightness increase
  - Click: Opens full gallery

"View Full Gallery →" CTA
```

**Section 6: Social Proof — Numbers + Testimonials**
```
Background: Off-white (#F8F5F0) — contrast switch from dark
Heading: "Trusted by Sri Lanka's Best"

Testimonial carousel:
  - 3 testimonials visible on desktop
  - 1 on mobile (swipeable)
  - Client photo (real, circular, bordered)
  - Stars (5/5)
  - Quote: Cormorant, italic, 1.25rem
  - Name + event type: DM Sans, text-sm
  - Auto-advance: Every 6 seconds (pause on hover)
```

**Section 7: Sponsors Strip**
```
Heading: "Our Trusted Partners"

Infinite scroll logo strip (CSS animation — no JS):
  - 2 rows on desktop, 1 on mobile
  - Grayscale on rest state → Full color on hover
  - Smooth loop with CSS animation
  - Speed: 30s linear infinite
  - "Become a Sponsor →" link
```

**Section 8: Contact / CTA Section**
```
Dark background, centered
Heading: "Let's Create Something Extraordinary"
Subheading: "18 years of experience. Ready to make your event perfect."
CTA: "Start Planning →" (large, crimson, magnetic)
Contact info: Phone, Email, WhatsApp link (WhatsApp icon → direct link)
```

**Footer**
```
4 column layout (1 column mobile):

Column 1: Logo + tagline + social icons
Column 2: Quick Links (Events, Gallery, Services, About, Contact)
Column 3: Services (Corporate, Weddings, Birthdays, Concerts)
Column 4: Contact info + Map mini preview

Bottom bar:
  - Left: "© 2025 Heavenly Events. All rights reserved."
  - Center: Rainbow separator line
  - Right: "Designed & Architected by UVIN VINDULA — IAMUVIN"
```

---

### 6.2 EVENTS LISTING PAGE (`/events`)

```
Layout: Full-width, dark theme

Hero: Short — "Upcoming Events in Sri Lanka"
Filter bar (sticky):
  [ All ] [ Corporate ] [ Weddings ] [ Birthdays ] [ Concerts ] [ Private ]
  [ Date: Upcoming ▾ ]  [ Location ▾ ]

Events grid:
  - Desktop: 3 column
  - Mobile: 1 column cards (full bleed image tops)
  - Each card: Same spec as homepage cards
  - Empty state: "No events in this category right now. Check back soon."

Pagination: Load more button (not infinite scroll — better for PageSpeed)
```

---

### 6.3 INDIVIDUAL EVENT PAGE (`/events/[slug]`)

> This is the most important page — Luma-style experience

```
Layout: Max-width 720px centered (content), full-width hero image

Hero:
  - Full-width event cover image (custom per event)
  - Event-themed background color overlay (dynamic from admin)
  - Countdown timer: Large, centered, monospace

Event Details (left column, 65%):
  - Event title: Cormorant, h1 size
  - Date/Time: With calendar icon, prominent
  - Venue name + Address (clickable → Google Maps)
  - Event description (rich text)
  - Schedule/Timeline (if provided)
  - Photo gallery preview (from past similar events)
  - Share buttons: WhatsApp, Facebook, Copy Link

Registration Panel (right column, sticky, 35%):
  [Card — glass morphism, light]
    "Register for Free"
    ─────────────────
    Name: [Input]
    Phone: [Input, +94 prefix]
    Email: [Input]
    [Register Now →] — crimson button

    ─────────────────
    ✓ Free Registration
    ✓ QR Code via Email
    ✓ Instant Confirmation
    X people already registered

Mobile: Registration panel collapses to bottom sticky CTA button:
  "Register Free →" → opens bottom sheet modal with form

Post-registration:
  - Inline success state (no page reload)
  - "Check your email for your QR ticket!"
  - Share prompt: "Tell your friends about this event"

Sponsor logos for this specific event (below fold)
```

---

### 6.4 ADMIN DASHBOARD (Protected)

See Section 12 for full admin spec.

---

## 7. TECHNICAL STACK & ARCHITECTURE

### 7.1 Architecture Decision: Hostinger VPS Required

**CRITICAL NOTICE FOR DEVELOPERS:**

This website requires:
- Server-side database (MySQL)
- Email sending (SMTP/Nodemailer)
- QR code generation API
- Admin authentication
- Server-side tracking pixel firing

**Hostinger Shared Hosting CANNOT support this.** API routes in Next.js require a running Node.js process.

**Required Hosting Plan:**
```
Hostinger VPS — KVM 2 (Recommended)
  CPU: 2 vCPU
  RAM: 8 GB
  Storage: 100 GB NVMe SSD
  Bandwidth: Unlimited
  OS: Ubuntu 24.04 LTS
  ~$7–12 USD/month

Minimum acceptable:
  Hostinger VPS — KVM 1
  CPU: 1 vCPU
  RAM: 4 GB
  Storage: 50 GB NVMe SSD
  ~$4–7 USD/month
```

### 7.2 Technology Stack

```yaml
FRONTEND:
  Framework:        Next.js 15 (App Router)
  Language:         TypeScript (strict mode)
  Styling:          Tailwind CSS v4 + CSS Custom Properties
  Animation:        Framer Motion (selective use — only for key components)
                    + CSS animations for static/repeated elements
  Icons:            Lucide React (tree-shakeable)
  Forms:            React Hook Form + Zod validation
  State:            Zustand (lightweight global state)
  QR Display:       react-qr-code (client-side rendering)
  Map:              Google Maps Embed API (zero JS overhead method)
  Gallery:          Custom lightbox (vanilla JS, no library)
  Rich Text:        Tiptap (for admin editor) / Display: dangerouslySetInnerHTML
  HTTP Client:      Native fetch with custom hooks
  Date:             date-fns (tree-shakeable)
  Font Loading:     next/font/google (subset + display=swap)

BACKEND:
  Runtime:          Node.js 20 LTS
  Framework:        Express.js 5 (minimal, fast) or Next.js API Routes
  Language:         TypeScript
  Auth (Admin):     JWT + bcrypt + HttpOnly cookies
  Email:            Nodemailer + Hostinger SMTP
  QR Generation:    qrcode (Node.js library → generates PNG buffer)
  File Upload:      Multer → stored in /public/uploads
  Validation:       Zod (shared with frontend)
  Rate Limiting:    express-rate-limit

DATABASE:
  Primary:          MySQL 8.0 (Hostinger includes this)
  ORM:              Prisma (type-safe, migrations, seeding)
  Caching:          In-memory cache (node-cache) for event lists

DEVOPS:
  Process Manager:  PM2 (keeps Node.js alive on VPS)
  Reverse Proxy:    Nginx (handles SSL termination, static files)
  SSL:              Hostinger SSL or Let's Encrypt (Certbot)
  CI/CD:            GitHub Actions → SSH deploy to VPS
  Monitoring:       PM2 dashboard + UptimeRobot (free external monitoring)

ANALYTICS:
  Google Analytics: GA4 (via gtag.js — loaded after interaction)
  Meta Pixel:       Facebook Pixel (non-blocking load)
  Google Tag Manager: GTM container (manages all tags)
```

### 7.3 Next.js Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Full SSR on VPS — not static export
  // This enables API routes, server components, etc.

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year
  },

  compress: true,

  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()'
        },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https:",
            "frame-src https://www.google.com", // for maps
          ].join('; ')
        }
      ]
    },
    {
      // Cache static assets 1 year
      source: '/_next/static/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    }
  ],

  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
  }
}

export default nextConfig
```

---

## 8. DATABASE SCHEMA DESIGN

### 8.1 Complete Prisma Schema

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// ── EVENTS ──────────────────────────────────────────

model Event {
  id              Int               @id @default(autoincrement())
  slug            String            @unique @db.VarChar(255)
  title           String            @db.VarChar(255)
  description     String            @db.LongText
  shortDesc       String?           @db.VarChar(500) @map("short_desc")
  category        EventCategory
  status          EventStatus       @default(DRAFT)
  isPublic        Boolean           @default(true) @map("is_public")
  isClientEvent   Boolean           @default(false) @map("is_client_event")
  clientName      String?           @db.VarChar(255) @map("client_name")

  // Dates & Timing
  eventDate       DateTime          @map("event_date")
  eventEndDate    DateTime?         @map("event_end_date")
  doorsOpenTime   DateTime?         @map("doors_open_time")
  registrationDeadline DateTime?    @map("registration_deadline")

  // Location
  venueName       String            @db.VarChar(255) @map("venue_name")
  venueAddress    String            @db.VarChar(500) @map("venue_address")
  venueCity       String            @db.VarChar(100) @map("venue_city")
  googleMapsUrl   String?           @db.VarChar(1000) @map("google_maps_url")
  googleMapsEmbed String?           @db.VarChar(2000) @map("google_maps_embed")
  latitude        Decimal?          @db.Decimal(10, 8)
  longitude       Decimal?          @db.Decimal(11, 8)

  // Media
  coverImage      String?           @db.VarChar(500) @map("cover_image")
  coverImageAlt   String?           @db.VarChar(255) @map("cover_image_alt")

  // Theme (per-event color theming)
  primaryColor    String?           @db.VarChar(7) @map("primary_color")    // e.g. #D4006A
  secondaryColor  String?           @db.VarChar(7) @map("secondary_color")
  accentColor     String?           @db.VarChar(7) @map("accent_color")

  // Registration
  maxCapacity     Int?              @map("max_capacity")
  registrationCount Int            @default(0) @map("registration_count")
  requiresApproval Boolean         @default(false) @map("requires_approval")

  // SEO
  metaTitle       String?           @db.VarChar(70) @map("meta_title")
  metaDesc        String?           @db.VarChar(160) @map("meta_desc")
  ogImage         String?           @db.VarChar(500) @map("og_image")

  // Timestamps
  createdAt       DateTime          @default(now()) @map("created_at")
  updatedAt       DateTime          @updatedAt @map("updated_at")
  publishedAt     DateTime?         @map("published_at")

  // Relations
  registrations   Registration[]
  galleryItems    GalleryItem[]
  eventSponsors   EventSponsor[]
  schedule        EventSchedule[]

  @@map("events")
}

enum EventCategory {
  CORPORATE
  WEDDING
  BIRTHDAY
  CONCERT
  PRIVATE
  GALA
  CONFERENCE
  CULTURAL
  CLIENT_EVENT
  OTHER
}

enum EventStatus {
  DRAFT
  PUBLISHED
  CANCELLED
  COMPLETED
}

// ── REGISTRATIONS ────────────────────────────────────

model Registration {
  id              Int               @id @default(autoincrement())
  ticketId        String            @unique @default(cuid()) @map("ticket_id")
  qrCode          String?           @db.Text @map("qr_code") // base64 QR image

  // Attendee Info
  fullName        String            @db.VarChar(255) @map("full_name")
  email           String            @db.VarChar(255)
  phone           String            @db.VarChar(20)
  additionalNotes String?           @db.Text @map("additional_notes")

  // Status
  status          RegistrationStatus @default(PENDING)
  checkedIn       Boolean           @default(false) @map("checked_in")
  checkedInAt     DateTime?         @map("checked_in_at")

  // Email
  emailSent       Boolean           @default(false) @map("email_sent")
  emailSentAt     DateTime?         @map("email_sent_at")

  // Tracking (for Meta/Google campaigns)
  utmSource       String?           @db.VarChar(100) @map("utm_source")
  utmMedium       String?           @db.VarChar(100) @map("utm_medium")
  utmCampaign     String?           @db.VarChar(100) @map("utm_campaign")
  fbclid          String?           @db.VarChar(255) // Facebook Click ID
  gclid           String?           @db.VarChar(255) // Google Click ID
  ipAddress       String?           @db.VarChar(45) @map("ip_address")
  userAgent       String?           @db.VarChar(500) @map("user_agent")
  referrer        String?           @db.VarChar(500)

  // Timestamps
  createdAt       DateTime          @default(now()) @map("created_at")
  updatedAt       DateTime          @updatedAt @map("updated_at")

  // Relations
  eventId         Int               @map("event_id")
  event           Event             @relation(fields: [eventId], references: [id])

  @@index([eventId])
  @@index([email])
  @@index([ticketId])
  @@map("registrations")
}

enum RegistrationStatus {
  PENDING
  CONFIRMED
  APPROVED
  REJECTED
  CANCELLED
}

// ── GALLERY ──────────────────────────────────────────

model GalleryItem {
  id              Int               @id @default(autoincrement())
  filename        String            @db.VarChar(500)
  altText         String            @db.VarChar(255) @map("alt_text")
  caption         String?           @db.VarChar(500)
  category        GalleryCategory
  featured        Boolean           @default(false)
  sortOrder       Int               @default(0) @map("sort_order")
  width           Int?
  height          Int?
  blurDataUrl     String?           @db.Text @map("blur_data_url") // for Next.js blur placeholder

  createdAt       DateTime          @default(now()) @map("created_at")

  // Relations (optional — can be linked to specific event)
  eventId         Int?              @map("event_id")
  event           Event?            @relation(fields: [eventId], references: [id])

  @@map("gallery_items")
}

enum GalleryCategory {
  CORPORATE
  WEDDING
  BIRTHDAY
  CONCERT
  PRIVATE
  GALA
  BEHIND_SCENES
}

// ── SPONSORS ─────────────────────────────────────────

model Sponsor {
  id              Int               @id @default(autoincrement())
  name            String            @db.VarChar(255)
  logoUrl         String            @db.VarChar(500) @map("logo_url")
  logoAlt         String            @db.VarChar(255) @map("logo_alt")
  websiteUrl      String?           @db.VarChar(500) @map("website_url")
  tier            SponsorTier       @default(STANDARD)
  isActive        Boolean           @default(true) @map("is_active")
  sortOrder       Int               @default(0) @map("sort_order")
  description     String?           @db.VarChar(500)

  createdAt       DateTime          @default(now()) @map("created_at")

  eventSponsors   EventSponsor[]

  @@map("sponsors")
}

model EventSponsor {
  id              Int               @id @default(autoincrement())
  eventId         Int               @map("event_id")
  sponsorId       Int               @map("sponsor_id")
  tier            SponsorTier       @default(STANDARD)

  event           Event             @relation(fields: [eventId], references: [id])
  sponsor         Sponsor           @relation(fields: [sponsorId], references: [id])

  @@unique([eventId, sponsorId])
  @@map("event_sponsors")
}

enum SponsorTier {
  PLATINUM
  GOLD
  SILVER
  STANDARD
}

// ── ADMIN USERS ──────────────────────────────────────

model AdminUser {
  id              Int               @id @default(autoincrement())
  email           String            @unique @db.VarChar(255)
  passwordHash    String            @db.VarChar(255) @map("password_hash")
  fullName        String            @db.VarChar(255) @map("full_name")
  role            AdminRole         @default(EDITOR)
  isActive        Boolean           @default(true) @map("is_active")
  lastLoginAt     DateTime?         @map("last_login_at")
  createdAt       DateTime          @default(now()) @map("created_at")

  @@map("admin_users")
}

enum AdminRole {
  SUPER_ADMIN
  ADMIN
  EDITOR
}

// ── EVENT SCHEDULE ────────────────────────────────────

model EventSchedule {
  id              Int               @id @default(autoincrement())
  eventId         Int               @map("event_id")
  time            String            @db.VarChar(20) // "7:00 PM"
  title           String            @db.VarChar(255)
  description     String?           @db.VarChar(500)
  sortOrder       Int               @default(0) @map("sort_order")

  event           Event             @relation(fields: [eventId], references: [id])

  @@map("event_schedule")
}

// ── CONTACT INQUIRIES ─────────────────────────────────

model Inquiry {
  id              Int               @id @default(autoincrement())
  name            String            @db.VarChar(255)
  email           String            @db.VarChar(255)
  phone           String?           @db.VarChar(20)
  eventType       String?           @db.VarChar(100) @map("event_type")
  eventDate       DateTime?         @map("event_date")
  guestCount      Int?              @map("guest_count")
  budget          String?           @db.VarChar(100)
  message         String            @db.Text
  status          InquiryStatus     @default(NEW)
  createdAt       DateTime          @default(now()) @map("created_at")

  @@map("inquiries")
}

enum InquiryStatus {
  NEW
  CONTACTED
  QUOTED
  CONFIRMED
  CLOSED
}
```

---

## 9. BACKEND API ARCHITECTURE

### 9.1 API Routes (Next.js App Router)

```
app/
└── api/
    ├── events/
    │   ├── route.ts              GET  /api/events       → List published events
    │   ├── [slug]/
    │   │   └── route.ts          GET  /api/events/[slug] → Single event
    │   └── upcoming/
    │       └── route.ts          GET  /api/events/upcoming
    │
    ├── register/
    │   └── route.ts              POST /api/register     → Submit registration
    │
    ├── ticket/
    │   └── [ticketId]/
    │       └── route.ts          GET  /api/ticket/[id]  → Verify QR ticket
    │
    ├── gallery/
    │   └── route.ts              GET  /api/gallery       → Gallery items
    │
    ├── sponsors/
    │   └── route.ts              GET  /api/sponsors      → Active sponsors
    │
    ├── contact/
    │   └── route.ts              POST /api/contact       → Contact form
    │
    └── admin/ (all protected by middleware)
        ├── auth/
        │   ├── login/route.ts    POST  Admin login
        │   └── logout/route.ts   POST  Admin logout
        ├── events/
        │   ├── route.ts          GET/POST Events CRUD
        │   └── [id]/route.ts     PUT/DELETE Single event
        ├── registrations/
        │   ├── route.ts          GET  List registrations
        │   ├── [id]/route.ts     PUT  Update status
        │   ├── checkin/route.ts  POST Check-in by QR scan
        │   └── export/route.ts   GET  Export CSV
        ├── gallery/
        │   ├── route.ts          GET/POST Gallery items
        │   └── [id]/route.ts     DELETE Single item
        └── sponsors/
            ├── route.ts          GET/POST Sponsors CRUD
            └── [id]/route.ts     PUT/DELETE Single sponsor
```

### 9.2 Registration API Handler

```typescript
// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { generateQRCode } from '@/lib/qr'
import { sendRegistrationEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rateLimit'

const RegistrationSchema = z.object({
  eventId:    z.number().int().positive(),
  fullName:   z.string().min(2).max(255).trim(),
  email:      z.string().email().toLowerCase().trim(),
  phone:      z.string().regex(/^(\+94|0)[0-9]{9}$/).trim(),
  // Campaign tracking (sent from client)
  utmSource:  z.string().optional(),
  utmMedium:  z.string().optional(),
  utmCampaign: z.string().optional(),
  fbclid:     z.string().optional(),
  gclid:      z.string().optional(),
})

export async function POST(req: NextRequest) {
  // 1. Rate limiting (5 requests per IP per 10 minutes)
  const limited = await rateLimit(req)
  if (limited) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const data = RegistrationSchema.parse(body)

    // 2. Validate event exists and is open
    const event = await prisma.event.findUnique({
      where: { id: data.eventId, status: 'PUBLISHED' }
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // 3. Check capacity
    if (event.maxCapacity && event.registrationCount >= event.maxCapacity) {
      return NextResponse.json({ error: 'Event is full' }, { status: 409 })
    }

    // 4. Check duplicate registration (same email + event)
    const existing = await prisma.registration.findFirst({
      where: { eventId: data.eventId, email: data.email }
    })

    if (existing) {
      return NextResponse.json({
        error: 'You are already registered for this event',
        ticketId: existing.ticketId
      }, { status: 409 })
    }

    // 5. Create registration (get ticketId)
    const registration = await prisma.registration.create({
      data: {
        eventId:    data.eventId,
        fullName:   data.fullName,
        email:      data.email,
        phone:      data.phone,
        status:     event.requiresApproval ? 'PENDING' : 'CONFIRMED',
        utmSource:  data.utmSource,
        utmMedium:  data.utmMedium,
        utmCampaign: data.utmCampaign,
        fbclid:     data.fbclid,
        gclid:      data.gclid,
        ipAddress:  req.ip || req.headers.get('x-forwarded-for') || '',
        userAgent:  req.headers.get('user-agent') || '',
        referrer:   req.headers.get('referer') || '',
      }
    })

    // 6. Generate QR code (contains the ticketId + eventId)
    const qrPayload = JSON.stringify({
      ticketId: registration.ticketId,
      eventId: data.eventId,
      name: data.fullName,
    })
    const qrCodeBase64 = await generateQRCode(qrPayload)

    // 7. Save QR code to registration
    await prisma.registration.update({
      where: { id: registration.id },
      data: { qrCode: qrCodeBase64 }
    })

    // 8. Update event registration count
    await prisma.event.update({
      where: { id: data.eventId },
      data: { registrationCount: { increment: 1 } }
    })

    // 9. Send confirmation email (async — don't await blocking)
    sendRegistrationEmail(registration, event, qrCodeBase64).catch(console.error)

    // 10. Return success
    return NextResponse.json({
      success: true,
      ticketId: registration.ticketId,
      message: 'Registration successful! Check your email for your QR ticket.',
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Invalid data',
        details: error.flatten().fieldErrors
      }, { status: 400 })
    }

    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

## 10. EVENT REGISTRATION SYSTEM + QR CODE ENGINE

### 10.1 QR Code Generation Library

```typescript
// lib/qr.ts
import QRCode from 'qrcode'

export async function generateQRCode(data: string): Promise<string> {
  return QRCode.toDataURL(data, {
    type: 'image/png',
    width: 400,
    margin: 2,
    errorCorrectionLevel: 'H', // High error correction (logo overlay possible)
    color: {
      dark:  '#070708',  // Brand black
      light: '#FFFFFF',  // White background
    }
  })
}
```

### 10.2 QR Code in Email (as embedded PNG)

```typescript
// The QR code is:
// 1. Generated as base64 PNG (data:image/png;base64,...)
// 2. Stored in DB (registration.qrCode column)
// 3. Embedded directly in the HTML email as <img src="data:image/png..." />
// 4. Also available at: /ticket/[ticketId] (web page)
```

### 10.3 QR Ticket Content

Each QR code encodes:
```json
{
  "ticketId": "clx8k2m3n0000abc123",
  "eventId": 42,
  "name": "Kasun Perera",
  "v": 1
}
```

### 10.4 Gate Check-in Scanner App

For event check-in at the gate, the admin uses:
- **Admin Dashboard → Check-in Mode** (mobile-optimized page)
- Tap "Scan QR" → opens device camera (via `@zxing/library` or native input `capture`)
- Reads QR → calls `POST /api/admin/registrations/checkin`
- Server validates ticketId, marks `checkedIn: true`, `checkedInAt: now()`
- Response: ✅ "Welcome, Kasun Perera!" or ❌ "Already checked in" or ❌ "Invalid ticket"
- Admin sees: Green flash (valid) or Red flash (invalid/duplicate)
- Works offline with service worker cache (tickets pre-loaded for that event)

### 10.5 Ticket Page `/ticket/[ticketId]`

```
Layout: Mobile-first card (max-width 440px, centered)

─────────────────────────────────
[Heavenly Events Logo]
─────────────────────────────────
🎉 YOU'RE REGISTERED!

[Event Name in Cormorant]
[Event Date & Time]
[Venue Name]

─────────────────────────────────
[Large QR Code — 250×250px]

TICKET ID: clx8k2m3n0000abc123
─────────────────────────────────

Name:  Kasun Perera
Email: kasun@example.com

Present this QR at the gate.
─────────────────────────────────
[Add to Calendar] [Share Event]
─────────────────────────────────
[Event sponsor logos — small]
─────────────────────────────────
```

---

## 11. EMAIL SYSTEM & TRANSACTIONAL EMAILS

### 11.1 SMTP Configuration (Hostinger)

```typescript
// lib/email.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,     // mail.heavenlyevents.lk (Hostinger)
  port:   465,
  secure: true,                       // SSL
  auth: {
    user: process.env.SMTP_USER,     // noreply@heavenlyevents.lk
    pass: process.env.SMTP_PASS,
  }
})
```

### 11.2 Registration Confirmation Email HTML

The email must feel **premium, event-ready, human-crafted**:

```
Email Subject: "🎉 You're In! Your ticket for [Event Name]"

────────────────────────────────────────────
[Heavenly Events Logo — centered]
[3px rainbow gradient bar]

Hi [First Name],

You're officially on the list. 🎊

──────────────────────────────────
[Event Cover Image — full width]

[EVENT NAME — large, bold]
[Date] · [Time] · [Venue]

──────────────────────────────────

YOUR ENTRY QR CODE
Show this at the gate — no printout needed.

[QR Code Image — 250×250px, embedded]
[Ticket ID: XXXXX]

──────────────────────────────────

EVENT DETAILS
📅 Date:     [Full Date]
⏰ Time:     [Time] — Doors open [Doors Time]
📍 Venue:    [Venue Name]
             [Full Address]

──────────────────────────────────

[Add to Google Calendar] [Add to Apple Calendar]

──────────────────────────────────

SPONSORED BY
[Sponsor logos — inline, 80px height]

──────────────────────────────────

See you at the event!
— The Heavenly Events Team

Contact: info@heavenlyevents.lk | +94 XX XXX XXXX

[Facebook] [Instagram] [WhatsApp]

Heavenly Events | 18 Years of Excellence
Sri Lanka's #1 Event Management Company

────────────────────────────────────────────
```

**Email HTML must be:**
- Inline CSS only (Gmail compatibility)
- Max width: 600px
- Background: #070708 (dark) or #F8F5F0 (light version)
- QR embedded as base64 `<img>` tag
- Mobile-responsive with media queries in `<style>` block
- Tested in: Gmail, Outlook, Apple Mail, mobile Gmail app

### 11.3 Other Transactional Emails

| Email | Trigger |
|-------|---------|
| Registration Confirmation | Immediately on registration |
| Registration Reminder | 24 hours before event |
| Event Cancelled | If event is cancelled |
| Thank You | 1 day after event |
| Contact Form Acknowledgement | On contact submission |
| Admin Notification | On new registration (to admin) |

---

## 12. ADMIN DASHBOARD (CMS BACKEND)

### 12.1 Admin Login

```
URL: /admin/login (NOT linked from public site)
Protected by:
  - JWT stored in HttpOnly cookie
  - bcrypt password hashing (12 salt rounds)
  - Rate limiting: 5 failed attempts → 15-minute lockout
  - HTTPS enforced

Design: Minimal, clean, dark theme
  - Heavenly Events logo
  - Email + Password fields
  - "Sign In" button
  - No "Register" link (admin accounts created via CLI/seed)
```

### 12.2 Admin Dashboard Layout

```
Sidebar (collapsible on mobile):
  [HE Logo]
  ─────────
  📊 Dashboard
  🎪 Events
  👥 Registrations
  📸 Gallery
  🤝 Sponsors
  💼 Client Events
  📨 Inquiries
  ⚙️ Settings
  ─────────
  [Admin Name]
  [Logout]

Main Content Area:
  - Dashboard: Stats cards + recent registrations + upcoming events
  - Events: Table with create/edit/delete + status toggle
  - Event Editor: Full form with image upload, color picker, schedule builder
  - Registrations: Table with search/filter + CSV export + check-in status
  - Gallery: Drag-and-drop image upload + category assign + reorder
  - Sponsors: Logo upload + tier assign + active toggle + sort order
  - Client Events: Same as events but marked as client-managed
  - Inquiries: View contact form submissions + mark status
```

### 12.3 Event Editor (Admin)

Key fields in the event creation form:
```
Basic Info:
  [ Event Title ]
  [ Slug (auto-generated, editable) ]
  [ Category: dropdown ]
  [ Status: Draft / Published / Cancelled ]
  [ Is Client Event: toggle ]
  [ Client Name (if client event) ]

Date & Time:
  [ Event Date ]
  [ Event End Date ]
  [ Doors Open Time ]
  [ Registration Deadline ]

Location:
  [ Venue Name ]
  [ Venue Address ]
  [ City ]
  [ Google Maps URL ]
  [ Google Maps Embed Code ]

Media:
  [ Cover Image: drag & drop upload ]
  [ OG Share Image ]

Event Theme Colors:
  [ Primary Color: #color picker ]
  [ Secondary Color: #color picker ]
  [ Accent Color: #color picker ]
  — These drive the per-event dynamic color system

Registration:
  [ Max Capacity (blank = unlimited) ]
  [ Requires Approval: toggle ]

Description:
  [ Rich text editor (Tiptap) ]

Schedule:
  [ + Add Schedule Item: Time | Title | Description ]

SEO:
  [ Meta Title ]
  [ Meta Description ]
```

### 12.4 Check-in Interface

```
URL: /admin/checkin/[eventId]

Mobile-optimized fullscreen interface:
  - Large event name at top
  - "Scan QR" button (opens camera)
  - Or: Manual ticket ID input field
  - Result: Full-screen green ✅ or red ❌
  - Sound: Beep on success (Web Audio API)
  - Real-time counter: "X / Y checked in"
  - List of recently checked-in names
```

### 12.5 Registrations Management

```
Table columns:
  #  |  Name  |  Email  |  Phone  |  Registered At  |  Status  |  Checked In  |  Actions

Actions per row:
  - View full details
  - Send email again
  - Mark approved/rejected
  - Check in manually

Top bar:
  [ Search: name/email ]  [ Filter: status ]  [ Export CSV ]

Export CSV columns:
  ID, Ticket ID, Name, Email, Phone, Event, Registered At, Status,
  Checked In, Checked In At, UTM Source, UTM Campaign, Referrer, IP
```

---

## 13. EVENT-THEMED DYNAMIC COLOR SYSTEM

### 13.1 How It Works

Each event in the database has three color fields:
```
primaryColor:   "#D4006A"   (main event color)
secondaryColor: "#FF6B00"   (supporting color)
accentColor:    "#1A1AFF"   (highlights/borders)
```

These are set by admin when creating an event.

### 13.2 Implementation

```typescript
// Event page reads the event's colors and applies CSS custom properties:

// In the event page component:
const eventStyles = {
  '--event-primary':   event.primaryColor   || '#8B0045',
  '--event-secondary': event.secondaryColor || '#FF6B00',
  '--event-accent':    event.accentColor    || '#1A1AFF',
  '--event-gradient':  `linear-gradient(135deg, ${event.primaryColor}, ${event.secondaryColor})`,
} as React.CSSProperties

// Apply to the page wrapper:
<div style={eventStyles}>
  {/* All event page content */}
</div>
```

### 13.3 Suggested Event Color Palettes

| Event Type | Primary | Secondary | Accent |
|-----------|---------|-----------|--------|
| Wedding | #C9A84C (Gold) | #F8F0E3 | #8B0045 (Crimson) |
| Corporate | #1A2744 (Navy) | #2E5BFF (Blue) | #00D4AA (Teal) |
| Concert | #FF2200 (Red) | #FF6B00 (Orange) | #FFE000 (Yellow) |
| Birthday | #D4006A (Magenta) | #7B00E0 (Purple) | #FF6B00 (Orange) |
| Gala | #1A1A1A (Black) | #C9A84C (Gold) | #FFFFFF |
| Cultural | #FF6B00 (Orange) | #C8E000 (Yellow) | #D4006A (Pink) |
| Private | #2E2E2E (Charcoal) | #8B0045 (Crimson) | #F8F5F0 |

---

## 14. PHOTO GALLERY SYSTEM

### 14.1 Gallery Architecture

```
Database: GalleryItem model (see schema above)
Storage: /public/uploads/gallery/ on Hostinger VPS
Image processing: sharp (on upload — generates WebP + thumbnail)
Display: Custom lightbox (ZERO library dependencies)
```

### 14.2 Image Upload Pipeline

```typescript
// When admin uploads image:
// 1. Multer receives file
// 2. sharp processes:
//    - Original: saved as WebP (quality 85)
//    - Thumbnail: 400×300 WebP (quality 75)
//    - Blur placeholder: tiny 8×6 JPEG → base64 (for Next.js blur)
// 3. Dimensions (width/height) stored in DB
// 4. blurDataUrl stored in DB
// 5. Filename stored in DB

// On frontend:
<Image
  src={`/uploads/gallery/${item.filename}`}
  alt={item.altText}
  width={item.width}
  height={item.height}
  placeholder="blur"
  blurDataURL={item.blurDataUrl}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 14.3 Gallery Page Layout

```
URL: /gallery

Hero: Short ("18 Years of Unforgettable Moments")

Filter tabs (category):
  [ All ] [ Corporate ] [ Weddings ] [ Birthdays ] [ Concerts ] [ Private ]

Layout: CSS Masonry Grid (CSS `columns` property — no JS)
  - Desktop: 4 columns
  - Tablet: 3 columns
  - Mobile: 2 columns

Hover: Scale 1.03 + brightness 1.1 + caption overlay slides up

Click: Custom lightbox opens
  - Full-screen dark overlay
  - Image centered (object-fit: contain)
  - Previous / Next navigation (keyboard + swipe on mobile)
  - Caption + event name
  - Close button (X) or click outside
  - Image preloading (prefetch next/prev)
  - No external library — pure JS (< 50 lines)

Load more: Paginated (24 images per load)
```

---

## 15. SPONSOR MANAGEMENT SYSTEM

### 15.1 Sponsor Display Tiers

**Platinum Sponsors**: Large logos, featured section, individual description
**Gold Sponsors**: Medium logos, grouped row
**Silver/Standard Sponsors**: Smaller logos, scroll strip

### 15.2 Sponsors Page (`/sponsors`)

```
Hero: "Our Valued Partners"
Subtext: "The brands that make our events extraordinary"

Platinum Section:
  - 2-column grid (1 on mobile)
  - Sponsor card: Logo (large) + Name + Description + Website link
  - Card: White background, shadow, hover lift

Gold Section:
  - 3-column grid (2 on mobile)
  - Logo + Name + Website link

Silver/Standard Section:
  - Infinite scroll strip (auto-scrolling)

CTA Section:
  "Interested in sponsoring an event?"
  [Become a Sponsor →] → /contact?type=sponsor
```

### 15.3 Sponsor Strip Component

```css
/* Infinite auto-scroll — NO JavaScript */
.sponsor-strip {
  display: flex;
  gap: 48px;
  animation: sponsorScroll 30s linear infinite;
}

.sponsor-strip:hover {
  animation-play-state: paused;
}

@keyframes sponsorScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Duplicate logos for seamless loop */
/* Logos: grayscale(100%) by default, color on hover */
```

---

## 16. MAPS INTEGRATION

### 16.1 No JavaScript Maps Library

**CRITICAL: Use Google Maps Embed API (iframe) — NOT the JavaScript API.**
Reason: JS Maps API adds 200KB+ JS, destroying PageSpeed score.

```html
<!-- Event page — venue map -->
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!...&q=[VENUE_ADDRESS]"
  width="100%"
  height="300"
  style="border:0; border-radius: 12px;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Event venue location"
></iframe>
```

The Google Maps URL is stored in the database per event (admin fills in the embed URL).

**"Get Directions" button:**
```html
<a
  href="https://www.google.com/maps/dir/?api=1&destination=[VENUE_ADDRESS]"
  target="_blank"
  rel="noopener noreferrer"
  class="btn-directions"
>
  Get Directions →
</a>
```

### 16.2 Contact Page Map

For the main contact page, show Heavenly Events' office location:
```
Same iframe embed approach
City: [Heavenly Events' actual city]
```

---

## 17. ANALYTICS & MARKETING TRACKING

### 17.1 Implementation Strategy

**Rule: Analytics must NEVER block page rendering.**

All tracking scripts load via:
1. `next/script` with `strategy="afterInteractive"` (loads after page is interactive)
2. Or `strategy="lazyOnload"` (loads when browser is idle)

### 17.2 Google Tag Manager

```typescript
// app/layout.tsx
import Script from 'next/script'

// GTM: loads after interactive
<Script
  id="gtm"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-XXXXXXX');
    `
  }}
/>
```

### 17.3 Meta Pixel (Facebook)

```typescript
// strategy="afterInteractive" — does NOT block LCP/FID
<Script
  id="meta-pixel"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s){...}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'PIXEL_ID_HERE');
      fbq('track', 'PageView');
    `
  }}
/>
```

### 17.4 Conversion Tracking Events

| Event | Where Fired | Purpose |
|-------|-------------|---------|
| `PageView` | All pages | Standard page tracking |
| `ViewContent` | Event detail page | Event page view |
| `InitiateCheckout` | Registration form opens | Form engagement |
| `Lead` | Successful registration | Primary conversion |
| `Contact` | Contact form submitted | Lead generation |

```typescript
// lib/tracking.ts
export const trackRegistration = (eventData: {
  eventId: number
  eventName: string
  ticketId: string
}) => {
  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: eventData.eventName,
      content_ids: [eventData.eventId],
      content_type: 'product',
    })
  }

  // GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'registration',
      event_label: eventData.eventName,
      value: 1,
    })
  }
}
```

### 17.5 UTM Parameter Capture

On registration page load, capture UTM params from URL and store in localStorage, then submit with registration form:

```typescript
// hooks/useUTMCapture.ts
export function useUTMCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utmData = {
      utmSource:   params.get('utm_source'),
      utmMedium:   params.get('utm_medium'),
      utmCampaign: params.get('utm_campaign'),
      fbclid:      params.get('fbclid'),
      gclid:       params.get('gclid'),
    }
    // Store for submission
    if (Object.values(utmData).some(Boolean)) {
      sessionStorage.setItem('utm_data', JSON.stringify(utmData))
    }
  }, [])
}

// On form submit, read from sessionStorage and include in API call
```

---

## 18. PERFORMANCE OPTIMIZATION (PAGESPEED 100)

### 18.1 The 100/100 Guarantee — Core Rules

**Rule 1: Every image uses `next/image` with explicit width/height**
```typescript
// NEVER:
<img src="/photo.jpg" />

// ALWAYS:
<Image src="/photo.jpg" alt="Description" width={800} height={600} />
```

**Rule 2: All images served as AVIF/WebP with fallbacks**
```
next.config.ts → images.formats: ['image/avif', 'image/webp']
```

**Rule 3: Custom fonts loaded via `next/font/google` — NEVER via `<link>`**
```typescript
import { Cormorant_Garamond, Syne, DM_Sans } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
})
```

**Rule 4: Third-party scripts use `strategy="afterInteractive"` or `"lazyOnload"`**
```
Never: <script src="..."> in HTML
Always: Next.js <Script> component with correct strategy
```

**Rule 5: CSS — Tailwind purges unused styles automatically**
No unused CSS in production build.

**Rule 6: No render-blocking resources**
- CSS: All critical CSS inlined by Next.js automatically
- Fonts: `display: swap` ensures text visible before font loads

**Rule 7: Framer Motion — code split, only loaded on client for specific components**
```typescript
// Only import Framer Motion for components that actually animate
// Use dynamic import with ssr: false for heavy animation components
const AnimatedCounter = dynamic(() => import('./AnimatedCounter'), { ssr: false })
```

**Rule 8: Event Gallery — lazy loaded, virtualized for large galleries**

**Rule 9: API responses cached with proper headers**
```typescript
// In Next.js route handlers:
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
  }
})
```

**Rule 10: Nginx gzip + Brotli compression for all text assets**

### 18.2 Nginx Configuration for Performance

```nginx
# /etc/nginx/sites-available/heavenlyevents.lk
server {
    listen 443 ssl http2;
    server_name heavenlyevents.lk www.heavenlyevents.lk;

    ssl_certificate     /etc/letsencrypt/live/heavenlyevents.lk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/heavenlyevents.lk/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:SSL:10m;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json
               application/javascript text/javascript image/svg+xml;

    brotli on;
    brotli_comp_level 6;
    brotli_types text/plain text/css text/xml application/json application/javascript;

    # Cache static assets
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache uploaded images
    location /uploads/ {
        alias /var/www/heavenlyevents/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
        add_header Vary Accept;
    }

    # Next.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name heavenlyevents.lk www.heavenlyevents.lk;
    return 301 https://$server_name$request_uri;
}
```

### 18.3 Core Web Vitals Targets

| Metric | Target | How to Achieve |
|--------|--------|----------------|
| LCP (Largest Contentful Paint) | < 1.5s | Hero image preloaded, priority=true on hero Image |
| FID/INP | < 100ms | Defer all non-critical JS, no heavy main-thread work |
| CLS (Cumulative Layout Shift) | < 0.05 | All images have explicit width/height, fonts use display=swap with size-adjust |
| TTFB | < 400ms | Server-side caching, Nginx, fast VPS |
| FCP | < 1.2s | Critical CSS inline, preconnect to font CDN |

```typescript
// Hero image: always use priority={true}
<Image
  src="/hero.webp"
  alt="Heavenly Events"
  fill
  priority          // Preloads — eliminates LCP penalty
  quality={85}
/>
```

---

## 19. SEO ARCHITECTURE

### 19.1 Metadata Per Page

```typescript
// app/events/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug(params.slug)

  return {
    title: `${event.title} | Heavenly Events`,
    description: event.metaDesc || event.shortDesc,
    keywords: [event.title, event.category, 'events in Sri Lanka', 'heavenly events'],
    openGraph: {
      title: event.title,
      description: event.shortDesc,
      images: [{ url: event.ogImage || event.coverImage, width: 1200, height: 630 }],
      type: 'event',
      locale: 'en_LK',
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.shortDesc,
      images: [event.ogImage || event.coverImage],
    },
    alternates: {
      canonical: `https://heavenlyevents.lk/events/${event.slug}`,
    }
  }
}
```

### 19.2 JSON-LD Structured Data

```typescript
// Event page structured data (Event schema)
const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.title,
  description: event.description,
  startDate: event.eventDate.toISOString(),
  endDate: event.eventEndDate?.toISOString(),
  location: {
    '@type': 'Place',
    name: event.venueName,
    address: {
      '@type': 'PostalAddress',
      streetAddress: event.venueAddress,
      addressLocality: event.venueCity,
      addressCountry: 'LK',
    }
  },
  organizer: {
    '@type': 'Organization',
    name: 'Heavenly Events',
    url: 'https://heavenlyevents.lk',
  },
  image: event.coverImage,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'LKR',
    availability: 'https://schema.org/InStock',
    url: `https://heavenlyevents.lk/events/${event.slug}`,
  }
}
```

### 19.3 Technical SEO Requirements

```
✅ sitemap.xml — auto-generated (dynamic, includes all events)
✅ robots.txt — allows all, disallows /admin
✅ Canonical URLs — all pages
✅ hreflang — en (English only for now)
✅ 301 redirects — www → non-www (or vice versa, be consistent)
✅ HTTPS — enforced at Nginx level
✅ Mobile-friendly — verified with Google Search Console
✅ Page speed — Core Web Vitals all passing
✅ Structured data — Event, Organization, BreadcrumbList schemas
✅ Alt text — all images
✅ Heading hierarchy — H1 once per page, H2/H3 logical structure
```

### 19.4 Auto-Generated Sitemap

```typescript
// app/sitemap.ts
import { prisma } from '@/lib/prisma'

export default async function sitemap() {
  const events = await prisma.event.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true }
  })

  return [
    { url: 'https://heavenlyevents.lk', lastModified: new Date() },
    { url: 'https://heavenlyevents.lk/events', lastModified: new Date() },
    { url: 'https://heavenlyevents.lk/gallery', lastModified: new Date() },
    { url: 'https://heavenlyevents.lk/services', lastModified: new Date() },
    { url: 'https://heavenlyevents.lk/about', lastModified: new Date() },
    { url: 'https://heavenlyevents.lk/sponsors', lastModified: new Date() },
    { url: 'https://heavenlyevents.lk/contact', lastModified: new Date() },
    ...events.map(event => ({
      url: `https://heavenlyevents.lk/events/${event.slug}`,
      lastModified: event.updatedAt,
    }))
  ]
}
```

---

## 20. ANIMATION & INTERACTION SYSTEM

### 20.1 Animation Philosophy

**"Intention over decoration."**
Every animation must serve a purpose:
- **Reveal**: Content enters when scrolled into view (Intersection Observer)
- **Response**: UI responds to user interaction (hover, click, focus)
- **Orientation**: Transitions communicate state changes
- **Delight**: 1–2 signature moments of unexpected beauty

### 20.2 Scroll Reveal System (Pure CSS + Intersection Observer)

```css
/* Base state — hidden */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
}

/* Staggered children */
.reveal > * { transition-delay: calc(var(--index, 0) * 80ms); }

/* Revealed state */
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

```typescript
// hooks/useScrollReveal.ts
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target) // Fire once
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
```

### 20.3 Magnetic Button Effect

```typescript
// components/MagneticButton.tsx
'use client'
import { useRef, MouseEvent } from 'react'

export function MagneticButton({ children, className, ...props }) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    const btn = ref.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const strength = 0.3
    btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = ''
      ref.current.style.transition = 'transform 0.5s var(--ease-spring)'
    }
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}
```

### 20.4 Counter Animation

```typescript
// components/AnimatedCounter.tsx
'use client'
import { useEffect, useRef, useState } from 'react'

interface Props { target: number; suffix?: string; duration?: number }

export function AnimatedCounter({ target, suffix = '', duration = 2000 }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true
        const start = performance.now()
        const animate = (now: number) => {
          const elapsed = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - elapsed, 3) // ease-out-cubic
          setCount(Math.round(eased * target))
          if (elapsed < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}
```

### 20.5 Spotlight Hero Animation

```css
/* Animated radial spotlight in hero — pure CSS */
@keyframes spotlightPulse {
  0%, 100% { opacity: 0.20; transform: scale(1); }
  50%       { opacity: 0.30; transform: scale(1.05); }
}

.hero-spotlight {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 55% at 50% 40%,
    rgba(139, 0, 69, 0.25) 0%,
    rgba(212, 0, 106, 0.10) 40%,
    transparent 70%
  );
  animation: spotlightPulse 4s ease-in-out infinite;
  pointer-events: none;
}
```

### 20.6 Color Orbs (Floating Background Elements)

```css
/* Floating color orbs — pure CSS, no JS */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  animation: orbFloat 8s ease-in-out infinite;
}

.orb-1 {
  width: 400px; height: 400px;
  background: rgba(212, 0, 106, 0.12);
  top: -100px; left: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px; height: 300px;
  background: rgba(123, 0, 224, 0.10);
  top: 50%; right: -50px;
  animation-delay: -3s;
}

.orb-3 {
  width: 350px; height: 350px;
  background: rgba(26, 26, 255, 0.08);
  bottom: -80px; left: 30%;
  animation-delay: -6s;
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  33%       { transform: translateY(-20px) scale(1.03); }
  66%       { transform: translateY(15px) scale(0.97); }
}
```

---

## 21. HOSTINGER DEPLOYMENT ARCHITECTURE

### 21.1 VPS Setup Guide (Step by Step)

```bash
# 1. SSH into VPS
ssh root@YOUR_VPS_IP

# 2. Update system
apt update && apt upgrade -y

# 3. Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 4. Install PM2 (process manager)
npm install -g pm2

# 5. Install Nginx
apt install -y nginx

# 6. Install Certbot for SSL
apt install -y certbot python3-certbot-nginx

# 7. Install MySQL
apt install -y mysql-server
mysql_secure_installation

# 8. Create database and user
mysql -u root -p
CREATE DATABASE heavenly_events CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'he_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON heavenly_events.* TO 'he_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 9. Create app directory
mkdir -p /var/www/heavenlyevents
cd /var/www/heavenlyevents

# 10. Clone repository
git clone https://github.com/YOUR_ORG/heavenly-events.git .

# 11. Install dependencies
npm install --production=false

# 12. Set up environment
cp .env.example .env.production
nano .env.production   # Fill in all values

# 13. Run Prisma migrations
npx prisma migrate deploy
npx prisma db seed   # Seed initial admin user

# 14. Build Next.js
npm run build

# 15. Start with PM2
pm2 start npm --name "heavenly-events" -- start
pm2 save
pm2 startup   # Follow the command it outputs

# 16. Configure Nginx
nano /etc/nginx/sites-available/heavenlyevents.lk
# (paste the nginx config from Section 18.2)

ln -s /etc/nginx/sites-available/heavenlyevents.lk \
      /etc/nginx/sites-enabled/
nginx -t && nginx -s reload

# 17. SSL certificate
certbot --nginx -d heavenlyevents.lk -d www.heavenlyevents.lk

# 18. Set up auto-renewal
crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 21.2 Environment Variables

```bash
# .env.production
# App
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://heavenlyevents.lk

# Database
DATABASE_URL="mysql://he_user:PASSWORD@localhost:3306/heavenly_events"

# Authentication
JWT_SECRET=GENERATE_64_CHAR_RANDOM_STRING_HERE
JWT_EXPIRY=7d

# Email (Hostinger SMTP)
SMTP_HOST=mail.heavenlyevents.lk
SMTP_PORT=465
SMTP_USER=noreply@heavenlyevents.lk
SMTP_PASS=YOUR_EMAIL_PASSWORD
SMTP_FROM_NAME=Heavenly Events
SMTP_FROM_EMAIL=noreply@heavenlyevents.lk

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE

# Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXXX

# File Uploads
UPLOAD_DIR=/var/www/heavenlyevents/public/uploads
MAX_FILE_SIZE=10485760   # 10MB

# Rate Limiting
RATE_LIMIT_WINDOW_MS=600000   # 10 minutes
RATE_LIMIT_MAX_REQUESTS=5
```

### 21.3 Deployment Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Hostinger VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Deploy to VPS
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/heavenlyevents
            git pull origin main
            npm ci
            npx prisma migrate deploy
            npm run build
            pm2 restart heavenly-events
```

### 21.4 Backup Strategy

```bash
# Daily database backup (cron)
0 2 * * * mysqldump -u he_user -p'PASSWORD' heavenly_events | gzip > /backups/db_$(date +%Y%m%d).sql.gz

# Weekly cleanup (keep 30 days)
0 3 * * 0 find /backups -name "*.sql.gz" -mtime +30 -delete

# Upload storage backup — sync to external (Hostinger Object Storage or rclone to Google Drive)
0 4 * * * rclone sync /var/www/heavenlyevents/public/uploads remote:heavenly-events-backups/uploads
```

---

## 22. FOLDER STRUCTURE

```
heavenly-events/
│
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (fonts, metadata, scripts)
│   ├── page.tsx                      # Home page
│   ├── globals.css                   # Global styles + CSS variables
│   │
│   ├── events/
│   │   ├── page.tsx                  # Events listing
│   │   └── [slug]/
│   │       ├── page.tsx              # Event detail + registration
│   │       └── loading.tsx           # Skeleton loading state
│   │
│   ├── gallery/
│   │   └── page.tsx
│   │
│   ├── services/
│   │   ├── page.tsx
│   │   └── [service]/page.tsx
│   │
│   ├── about/page.tsx
│   ├── sponsors/page.tsx
│   ├── contact/page.tsx
│   ├── ticket/[ticketId]/page.tsx    # Ticket display page
│   │
│   ├── admin/                        # Protected admin area
│   │   ├── layout.tsx                # Admin layout (auth check)
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── events/
│   │   │   ├── page.tsx              # Events list
│   │   │   ├── new/page.tsx          # Create event
│   │   │   └── [id]/page.tsx         # Edit event
│   │   ├── registrations/page.tsx
│   │   ├── checkin/[eventId]/page.tsx
│   │   ├── gallery/page.tsx
│   │   └── sponsors/page.tsx
│   │
│   ├── api/                          # API Routes
│   │   ├── events/route.ts
│   │   ├── events/[slug]/route.ts
│   │   ├── register/route.ts
│   │   ├── ticket/[ticketId]/route.ts
│   │   ├── gallery/route.ts
│   │   ├── sponsors/route.ts
│   │   ├── contact/route.ts
│   │   └── admin/                    # Protected admin API
│   │       ├── auth/login/route.ts
│   │       ├── auth/logout/route.ts
│   │       ├── events/route.ts
│   │       ├── events/[id]/route.ts
│   │       ├── registrations/route.ts
│   │       ├── registrations/[id]/route.ts
│   │       ├── registrations/checkin/route.ts
│   │       ├── registrations/export/route.ts
│   │       ├── gallery/route.ts
│   │       └── sponsors/route.ts
│   │
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/                       # Shared components
│   ├── ui/                           # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   └── Skeleton.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── AdminSidebar.tsx
│   │
│   ├── events/
│   │   ├── EventCard.tsx
│   │   ├── EventGrid.tsx
│   │   ├── EventHero.tsx
│   │   ├── EventDetails.tsx
│   │   ├── RegistrationForm.tsx
│   │   ├── CountdownTimer.tsx
│   │   └── EventSchedule.tsx
│   │
│   ├── gallery/
│   │   ├── GalleryGrid.tsx
│   │   ├── GalleryLightbox.tsx
│   │   └── GalleryFilters.tsx
│   │
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── StatsBar.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── SponsorsStrip.tsx
│   │
│   └── shared/
│       ├── AnimatedCounter.tsx
│       ├── MagneticButton.tsx
│       ├── RainbowBar.tsx
│       ├── SectionHeading.tsx
│       ├── QRCode.tsx
│       └── TicketCard.tsx
│
├── lib/                              # Utilities & services
│   ├── prisma.ts                     # Prisma client singleton
│   ├── auth.ts                       # JWT auth helpers
│   ├── email.ts                      # Nodemailer + email templates
│   ├── qr.ts                         # QR code generation
│   ├── rateLimit.ts                  # Rate limiting
│   ├── imageProcess.ts               # sharp image processing
│   ├── tracking.ts                   # Analytics event helpers
│   └── utils.ts                      # General utilities
│
├── hooks/                            # Custom React hooks
│   ├── useScrollReveal.ts
│   ├── useUTMCapture.ts
│   ├── useCountdown.ts
│   ├── useMediaQuery.ts
│   └── useEventTheme.ts
│
├── types/                            # TypeScript types
│   ├── event.ts
│   ├── registration.ts
│   ├── gallery.ts
│   └── admin.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── public/
│   ├── uploads/                      # User-uploaded images (gitignored)
│   │   ├── events/
│   │   ├── gallery/
│   │   └── sponsors/
│   ├── images/                       # Static brand images
│   │   ├── logo.svg                  # SVG version of logo
│   │   ├── logo-white.svg
│   │   └── og-default.jpg
│   └── fonts/                        # Self-hosted fallback fonts (if needed)
│
├── middleware.ts                     # Auth middleware for /admin routes
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── .env.production                   # gitignored
├── .gitignore
├── ecosystem.config.js               # PM2 config
└── package.json
```

---

## 23. SECURITY ARCHITECTURE

### 23.1 Authentication Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value

    if (!token || !verifyJWT(token)) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Protect /api/admin routes
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth')) {
    const token = request.cookies.get('admin_token')?.value

    if (!token || !verifyJWT(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}
```

### 23.2 Security Checklist

```
INPUT SECURITY:
✅ All user inputs validated with Zod (server-side)
✅ Email addresses sanitized and normalized
✅ No raw SQL — Prisma ORM only (prevents SQL injection)
✅ Rich text from admin sanitized with DOMPurify before DB
✅ File uploads: type check (whitelist: jpg, jpeg, png, webp only), size limit (10MB)
✅ File names: UUID rename on upload (never use original filename)

AUTH SECURITY:
✅ Passwords: bcrypt with 12 salt rounds
✅ JWT: stored in HttpOnly, Secure, SameSite=Strict cookie
✅ JWT secret: 64+ character random string (environment variable)
✅ Login rate limiting: 5 attempts per 15 minutes per IP
✅ No admin registration endpoint (CLI only)

API SECURITY:
✅ Rate limiting on all public POST endpoints
✅ CORS configured (allow only heavenlyevents.lk)
✅ All admin endpoints require valid JWT
✅ Request size limits (1MB max body)
✅ IP address logged for registrations

INFRASTRUCTURE SECURITY:
✅ HTTPS enforced at Nginx level
✅ Security headers (see next.config.ts Section 7.3)
✅ Database user has minimum required permissions
✅ Database NOT exposed to internet (localhost only)
✅ SSH: key-based auth only (disable password auth)
✅ UFW firewall: only ports 80, 443, 22 open
✅ Regular backups (daily DB + weekly storage)
```

---

## 24. MOBILE-FIRST IMPLEMENTATION GUIDE

### 24.1 Breakpoints

```css
/* Tailwind custom breakpoints (tailwind.config.ts) */
screens: {
  'xs':  '375px',   /* Small phones */
  'sm':  '640px',   /* Large phones / small tablets */
  'md':  '768px',   /* Tablets */
  'lg':  '1024px',  /* Laptops */
  'xl':  '1280px',  /* Desktops */
  '2xl': '1536px',  /* Large desktops */
}
```

### 24.2 Mobile-Specific Rules

```
NAVIGATION:
  ✅ Mobile: Full-screen overlay menu (not small sidebar)
  ✅ Touch targets: Minimum 48×48px (WCAG 2.5.5)
  ✅ Hamburger icon: 24×24px icon, 48×48px touch area
  ✅ Logo: Scaled down on mobile (120px wide)

HERO:
  ✅ Text: Use fluid clamp() values — never breaks on small screens
  ✅ Buttons: Full-width on mobile, auto on desktop
  ✅ Hero image: Separate mobile crop via <source> in <picture> if needed

EVENT CARDS:
  ✅ Mobile: Full-width (single column), top image + bottom content
  ✅ Desktop: 3-column with 16:9 image top
  ✅ Swipe gesture on mobile carousel: Use CSS scroll-snap

REGISTRATION FORM (Event Page):
  ✅ Desktop: Sticky sidebar panel (35% width)
  ✅ Mobile: Bottom sticky CTA → opens bottom sheet modal
  ✅ Bottom sheet: slides up from bottom (CSS transform animation)
  ✅ Form fields: Large text size (16px minimum — prevents iOS zoom!)
  ✅ Input type="tel" for phone (triggers number keyboard)
  ✅ Input type="email" (triggers email keyboard)

GALLERY:
  ✅ Mobile: 2-column masonry
  ✅ Lightbox: Full-screen, swipe left/right to navigate
  ✅ Image loading: skeleton shimmer placeholder

FOOTER:
  ✅ Desktop: 4-column grid
  ✅ Mobile: Single column, accordion-style sections

PERFORMANCE — MOBILE SPECIFIC:
  ✅ Images: Use mobile-optimized sizes attribute
  ✅ Fonts: Subset to Latin characters only
  ✅ Animations: prefers-reduced-motion media query respected
  ✅ Touch scroll: -webkit-overflow-scrolling: touch
```

### 24.3 Bottom Sheet Component (Mobile Registration)

```typescript
// components/events/RegistrationBottomSheet.tsx
// Opens from bottom on mobile when "Register Free" CTA is tapped

// CSS:
// .bottom-sheet { transform: translateY(100%); transition: transform 0.4s ease; }
// .bottom-sheet.open { transform: translateY(0); }
// Backdrop: fixed inset-0 bg-black/60 backdrop-blur-sm
```

---

## 25. DEVELOPMENT PHASES & TIMELINE

### Phase 1 — Foundation (Week 1–2)
```
□ VPS setup (Nginx, Node.js, MySQL, PM2)
□ Next.js project setup (TypeScript, Tailwind v4, Prisma)
□ Design system implementation (CSS variables, fonts, colors)
□ Database schema + migrations
□ Prisma seed (admin user, sample data)
□ Authentication system (JWT, admin login)
□ Navbar + Footer components
□ Deployment pipeline (GitHub Actions)
```

### Phase 2 — Core Pages (Week 3–4)
```
□ Home page (all sections)
□ Events listing page
□ Individual event page (detail view)
□ Registration API + QR generation
□ Email system (confirmation email)
□ Ticket page (/ticket/[id])
```

### Phase 3 — Content Pages (Week 5)
```
□ Gallery page + lightbox
□ Services pages
□ About page
□ Sponsors page
□ Contact page
```

### Phase 4 — Admin Panel (Week 6–7)
```
□ Admin dashboard
□ Event CRUD (create/edit/delete)
□ Rich text editor (Tiptap)
□ Image upload system (Multer + sharp)
□ Registrations management + export
□ Check-in interface
□ Gallery management
□ Sponsor management
□ Inquiries view
```

### Phase 5 — Performance & SEO (Week 8)
```
□ PageSpeed audit + fixes (target 100/100)
□ SEO metadata for all pages
□ JSON-LD structured data
□ Sitemap + robots.txt
□ Open Graph images
□ Analytics integration (GTM, GA4, Meta Pixel)
□ UTM tracking implementation
```

### Phase 6 — Testing & Launch (Week 9)
```
□ Cross-browser testing (Chrome, Firefox, Safari, Edge)
□ Device testing (iPhone, Android, iPad, Desktop)
□ Security testing (headers, inputs, auth)
□ Performance testing (PageSpeed, WebPageTest)
□ Content review + proofreading
□ DNS configuration (domain → VPS)
□ SSL certificate installation
□ 301 redirects (old URLs if applicable)
□ Staging → Production deployment
□ Post-launch smoke testing
□ UptimeRobot monitoring setup
```

---

## 26. POST-LAUNCH MONITORING

### 26.1 Monitoring Stack

| Tool | Purpose | Cost |
|------|---------|------|
| PM2 Dashboard | Node.js process health | Free |
| UptimeRobot | Uptime monitoring, SMS alerts | Free (5 min checks) |
| Google Search Console | SEO, indexing, Core Web Vitals | Free |
| Google Analytics 4 | Traffic, conversions, user behavior | Free |
| Meta Events Manager | Pixel events, ad campaign tracking | Free |
| Sentry (optional) | Error tracking | Free tier |

### 26.2 KPIs to Monitor Weekly

```
PERFORMANCE:
  □ PageSpeed score (mobile + desktop) — must stay at 100
  □ Core Web Vitals report (Google Search Console)
  □ Server response time (< 400ms TTFB)
  □ Uptime (target: 99.9%)

BUSINESS:
  □ Event registrations per event
  □ Registration conversion rate per event page
  □ Email delivery rate (> 98%)
  □ QR check-in rate at events

MARKETING:
  □ Organic traffic growth
  □ Meta Pixel event counts (Leads, PageViews)
  □ UTM source breakdown (which campaigns driving registrations)
  □ Top landing pages

SEO:
  □ Google ranking for "event management Sri Lanka"
  □ Indexed pages count
  □ No crawl errors
```

---

## 27. DEVELOPER CHECKLIST

### Pre-Development
- [ ] Read this entire document before writing a single line of code
- [ ] Set up development environment (Node.js 20, MySQL local)
- [ ] Clone repo, install dependencies, run Prisma migrations
- [ ] Verify all environment variables configured
- [ ] Review design system — all CSS variables in globals.css

### Development Standards
- [ ] TypeScript strict mode — no `any` types
- [ ] All images use `next/image` component — no raw `<img>` tags
- [ ] All forms use React Hook Form + Zod validation
- [ ] No `console.log` in production (use proper error logging)
- [ ] All API endpoints have proper error handling and status codes
- [ ] All user-facing text is accessible (color contrast ≥ 4.5:1)
- [ ] All interactive elements have focus styles
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Font size minimum 16px for all input fields (prevents iOS zoom)
- [ ] Touch targets minimum 48px

### Before Each Feature PR
- [ ] `npm run type-check` passes (zero TypeScript errors)
- [ ] `npm run lint` passes (zero ESLint errors)
- [ ] Feature tested on iPhone and Android (BrowserStack or real device)
- [ ] Feature tested on desktop (Chrome, Firefox, Safari)
- [ ] No new render-blocking resources added
- [ ] API endpoints tested with valid and invalid inputs
- [ ] No security vulnerabilities (no direct user input in queries)

### Pre-Launch Checklist
- [ ] PageSpeed Insights: 100/100 mobile AND desktop (verified at pagespeed.web.dev)
- [ ] All Core Web Vitals: GREEN status
- [ ] SSL certificate active and HTTPS enforced
- [ ] All environment variables set in production
- [ ] Database backed up before launch
- [ ] Error monitoring active (PM2 logs checked)
- [ ] Google Search Console: Site submitted, no errors
- [ ] Meta Pixel: Verified firing on PageView and Lead events
- [ ] GA4: Data flowing, goals configured
- [ ] Email delivery tested: Registration email received with QR
- [ ] QR code: Tested at check-in endpoint (valid + invalid scenarios)
- [ ] Admin panel: Login, create event, view registrations — all functional
- [ ] All 404 pages are graceful and branded
- [ ] robots.txt: /admin disallowed ✓, all public pages allowed ✓
- [ ] sitemap.xml: All pages included, submitted to GSC
- [ ] Social sharing: OG tags verified with Facebook Debugger
- [ ] WhatsApp link: Opens correctly on mobile
- [ ] Google Maps Embed: Loads and shows correct location
- [ ] UptimeRobot: Monitoring active, alert email configured

---

## CLOSING NOTE

> This is not just a website brief. This is a **product blueprint** — designed for a company that has spent 18 years building something real, now given a digital presence that matches their legacy.
>
> Every pixel, every interaction, every animation, every database field — designed with intention. Built like a world-class product company would build it.
>
> **The IAMUVIN signature is not in a footer credit. It is in the thinking, the architecture, and the experience.**

---

**Designed & Architected by:**
**UVIN VINDULA — IAMUVIN**
Technology Founder · Systems Architect · AI-Driven Product Innovator
`iamuvin.com`

---

*Document Version: 1.0 | March 2025*
*Classification: Confidential — For Development Team Use Only*
