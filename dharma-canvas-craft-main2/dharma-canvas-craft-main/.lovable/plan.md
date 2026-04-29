## Shifting Into Awareness (SIA) — Production Build Plan

A complete, Awwwards-caliber spiritual platform for Jake Light. Sacred aesthetics meet modern motion design, built on this project's TanStack Start + Tailwind v4 stack (functionally equivalent to your React 18 + React Router brief).

---

### Stack notes (adapted to this project)
- **Routing**: TanStack Router file-based routes in `src/routes/` (instead of React Router v6) — same UX, type-safe, SSR-ready, per-page SEO meta.
- **Styling**: Tailwind v4 via `src/styles.css` with your full color/typography/spacing tokens added as CSS variables.
- **Motion**: Framer Motion + GSAP/ScrollTrigger + Lenis (the maintained `lenis` package) — full spec.
- **Other libs**: React Hook Form, Swiper, Lucide React, react-player, Google Fonts (Cormorant Garamond + DM Sans).
- **Forms**: validate, animate, and show success states — no persistence (per your choice).
- **Accessibility**: all motion respects `prefers-reduced-motion`; custom cursor desktop-only.

---

### Design system
Wired into `src/styles.css` as global tokens:
- **Palette**: cream `#F9F5E9`, peach `#FFD1BF`, purple `#43006B`, purple-light `#7B3FA0`, purple-pale `#F3E8FB`, gold `#C9A84C`, text-dark `#1A0A2E`, text-mid `#4A3060`.
- **Typography**: Cormorant Garamond (display/headings, italic hero variant) + DM Sans (body/UI), with the full size scale from your brief (Display 64 → Caption 13).
- **Spacing/Radius**: 4px base unit, radii 4/8/16/999.
- **Section rule**: odd = cream, even = peach, cards = white with soft shadow.
- **Decorative SVGs**: hand-built lotus, mandala, and gold divider components reused site-wide.

---

### Global motion layer
- **Lenis** smooth scroll initialized in root layout, easing `easeInOutCubic`, duration 1.4.
- **GSAP + ScrollTrigger** reveal hook (`useScrollReveal`) — opacity 0→1 + translateY 40→0, stagger 0.12s, trigger `top 85%`.
- **Framer Motion** page transitions (slide + fade, 0.5s) + card hovers (scale 1.03, shadow lift).
- **Parallax** hero backgrounds at 0.4x scroll.
- **Custom cursor**: small circle + trailing dot in `#43006B`, desktop-only, hidden under reduced-motion.
- **Floating lotus petals** in hero (CSS keyframes, 3–4 drifting petals).
- **Animated SVG lotus dividers** between sections in gold.

---

### Global components
- **Navbar**: fixed, glass-morphism cream bg + backdrop blur, shrinks 80→64px on scroll, animated active underline, full-screen mobile overlay with staggered links, "Join Satsang" CTA.
- **Footer**: deep purple bg, 4 columns (logo+tagline / quick links / social / newsletter), animated social icons, faint lotus watermark, tagline *"The Pathless Path · Shifting Into Awareness"*.
- **Reusables**: Button, Card, Tag, Modal/Drawer, Divider, Loader, AnimatedCounter, SectionHeading.

---

### Pages

**1. Home (`/`)**
- Parallax hero with mandala overlay, italic Cormorant headline *"Awakening the Light Within"*, dual CTAs, oval-framed portrait with glow, drifting lotus petals, animated scroll-down indicator.
- About teaser (peach) — Jake's portrait in gold frame + decorative pull-quote.
- Auto-scrolling gallery strip (Swiper, 6 spiritual practice images, grayscale→color hover).
- Live webinars — 3 white cards with Register Now CTAs.
- Featured courses — horizontal Swiper with hover-zoom thumbnails.

**2. SIA (`/sia`)** — sub-tab nav with sliding `#43006B` pill indicator and Framer Motion layout transitions
- **About SIA**: org story + animated milestone timeline + large italic pull-quote.
- **Jake Light**: parallax portrait, two-column bio, yoga-path badge cards (Kundalini / Bhakti / Raj / Gyana), "What Jake Teaches" grid.
- **Our Mission**: bold mission statement + Vision/Values/Approach 3-col grid.
- **Activities**: 6-card grid (Satsangs, Webinars, Retreats, Courses, Blog, Community).

**3. Events (`/events`)**
- Hero *"Gather. Seek. Awaken."* with lotus background.
- Sticky filter chips (All / Free Satsang / Webinars / Retreats) with AnimatePresence transitions.
- 3-col event card grid: type badge, date/time, location, price or "FREE", color-coded CTAs, past events grayscale + "Completed" overlay.
- Free Satsang spotlight (peach): recurring schedule table, embedded YouTube via react-player, inline registration form.
- Retreats: full-width photo cards with overlay info + gold "Limited Seats" badges.

**4. Courses (`/courses`)**
- Hero *"Transform From Within"* + breadcrumb filters.
- Two animated tabs: **SIA Practices** (Kundalini, meditation, pranayama, yoga) + **Scriptures** (Vedic texts, Upanishads, Gita, Yoga Sutras with parchment top accent).
- Course cards: 16:9 thumb, badge, title, description, duration + lessons, price, star rating, full-width Enroll CTA, hover lift + image zoom.
- Course detail drawer: full description, curriculum accordion, instructor bio, video preview.

**5. About (`/about`)**
- Hero *"The Source of Our Work"* with lotus watermark.
- Alternating left-right pillar sections.
- Animated counters: 500+ Seekers, 100+ Satsangs, 12+ Retreats.
- Parallax philosophy quote section with gold divider.
- 3-col approach grid.
- "Stay Connected" — large social buttons (Instagram, YouTube, Facebook, WhatsApp) with brand-color hover, follower counts, embedded Instagram-style 6-image grid, YouTube subscribe CTA.

**6. Blog (`/blog` + `/blog/$slug`)**
- **Listing**: hero *"Wisdom Writings"* + search, category filter tags, featured post hero card, 3-col grid (image hover zoom, category tag, title, excerpt, author block, read time, animated underline link), Load More.
- **Detail**: max-w-720 reading layout, parallax hero image, sticky table of contents (desktop), top progress bar in `#43006B`, pull-quotes with purple left border, react-player video embeds, floating share buttons (WhatsApp/X/Facebook/copy), related posts row.

**7. Contact (`/contact`)** — 60/40 split
- **Left**: heading *"We'd Love to Hear From You"*, contact details, social row, large faint lotus illustration.
- **Right**: React Hook Form with floating labels — Name*, Email*, Subject dropdown, Message* — inline validation with shake animation, submit → spinner → animated checkmark success state.

---

### Responsive & a11y
- Mobile-first: 1-col mobile → 2-col tablet → 3-col desktop, 48px tap targets, hamburger overlay nav.
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), ARIA labels, visible `#43006B` focus rings, 4.5:1 contrast minimum.
- All images lazy-loaded with explicit dimensions and alt text.
- Per-route SEO meta (title, description, og:title, og:description) on every page.

---

### File layout (in `src/`)
- `routes/` — `__root.tsx`, `index.tsx`, `sia.tsx` + sub-tabs, `events.tsx`, `courses.tsx`, `about.tsx`, `blog.tsx`, `blog.$slug.tsx`, `contact.tsx`
- `components/common/` — Navbar, Footer, Button, Card, Modal, Tag, Divider, Loader, CustomCursor, LotusPetals, MandalaBg
- `components/home|sia|events|courses|about|blog|contact/` — section components per your brief
- `hooks/` — `useScrollReveal`, `useSmoothScroll`, `useCounterAnimation`, `useMediaQuery`, `useReducedMotion`
- `lib/` — `animations.ts`, `constants.ts` (course/event/blog seed data), `helpers.ts`
- `styles.css` — design tokens + global animations

After approval I'll install dependencies, set up the design system + motion layer, then build all routes.