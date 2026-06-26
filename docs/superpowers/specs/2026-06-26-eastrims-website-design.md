# Eastrims Premium B2B Website — Design Specification

**Date:** 2026-06-26
**Project:** Eastrims premium immersive B2B website (garment trims + packaging + accessories)
**Goal:** Full specification & architecture for phased implementation
**Status:** Draft — pending user review

---

## Executive Summary

This document specifies a premium, immersive B2B website for Eastrims — a full-service garment trim manufacturer (woven labels, hang tags, patches, packaging, accessories). The target experience is Apple/Nike/Tesla-level premium: cinematic storytelling, 3D product immersion, interactive viewers, and an AI-powered quote assistant.

**Key decisions:**
- **Rendering approach:** Hybrid (R3F live 3D for interactive moments + Remotion video for cinematic sequences)
- **CMS:** Sanity (hosted, collaborative, image CDN)
- **Stack:** Next.js 15 App Router (RSC) + React 19 + TypeScript + Tailwind + shadcn/ui + Three.js/R3F/Drei + Remotion + GSAP + Framer Motion + Lenis + Sanity
- **Hosting:** Vercel (edge SSR, ISR, image opt, previews)
- **AI assistant:** Guided wizard + LLM (Claude/GPT-4) with structured tool-use → lead capture (Sanity + Resend MVP)
- **Performance:** Desktop-primary, mobile graceful degradation (capability tiers)
- **Accessibility:** WCAG AA target
- **Assets:** Commissioned 3D for hero products + procedural fallback for catalog + shader library for materials
- **Team:** Mixed (CMS-first content for marketing staff, dev for 3D/features)

---

## 1. Architecture Overview

### 1.1 System architecture (layers)

```
┌─────────────────────────────────────────────────────────┐
│  CONTENT LAYER      Sanity (hosted CMS)                  │
│                     catalog • products • hero config     │
│                     marketing videos • materials • blog  │
└───────────────┬─────────────────────────────────────────┘
                │  GROQ / cached reads, live preview, webhook revalidation
┌───────────────▼─────────────────────────────────────────┐
│  PRESENTATION LAYER  Next.js 15 App Router (React 19)    │
│                      RSC for SEO + fast first paint      │
│                      Client "islands" for heavy 3D/video │
└──┬───────────┬───────────┬───────────┬─────────────┬────┘
   │           │           │           │             │
┌──▼──┐   ┌───▼───┐   ┌───▼───┐   ┌───▼───┐    ┌───▼────┐
│ 3D  │   │ VIDEO │   │ ANIM  │   │ UI/UI │    │BACKEND │
│ R3F │   │Remotion│   │GSAP/  │   │Tailwind│   │ Route  │
│+Drei│   │ (VOD) │   │Framer/│   │+shadcn│    │Handlers│
│+post│   │CDN    │   │Lenis  │   │       │    │AI+lead │
└─────┘   └───────┘   └───────┘   └───────┘    └───┬────┘
                                                  │
                                    ┌─────────────▼────────────┐
                                    │  MVP: email + DB (Resend)│
                                    │  Later: ERP/CRM adapter  │
                                    └──────────────────────────┘
                │
┌───────────────▼─────────────────────────────────────────┐
│  PERFORMANCE LAYER   capability detection • LOD • lazy   │
│                      mobile fallbacks • Suspense • ISR   │
└─────────────────────────────────────────────────────────┘
                │
┌───────────────▼─────────────────────────────────────────┐
│  HOSTING    Vercel (edge SSR, image opt, analytics)      │
│             Sanity CDN (images/video)  •  Vercel/external│
│             CDN for Remotion renders                     │
└─────────────────────────────────────────────────────────┘
```

**Why this shape:** Content lives in Sanity (non-technical team owns it). Next.js Server Components render SEO-critical HTML server-side, so heavy 3D never blocks first paint or search ranking. The expensive experiences load as isolated client *islands* with capability checks — if a device can't run them, users get graceful fallbacks. Remotion renders to video *once*, then plays as cheap `<video>` — no real-time cost per visit.

### 1.2 Tech stack (confirmed)

| Concern | Choice | Role |
|---|---|---|
| Framework | Next.js 15 App Router, React 19 | SSR/RSC, routing, islands |
| Language | TypeScript (strict) | end-to-end types from Sanity schema |
| Styling | Tailwind CSS + shadcn/ui | brand design system, primitives |
| UI motion | Framer Motion | micro-interactions, transitions |
| Scroll/timeline | GSAP + ScrollTrigger | scroll storytelling, sequence control |
| Smooth scroll | Lenis | buttery scroll tied to GSAP |
| Live 3D | Three.js + R3F + Drei | hero, product viewer, globe, materials |
| 3D post-FX | @react-three/postprocessing | bloom, DOF, chromatic — premium sheen |
| Cinematic video | Remotion (+ motion-blur, transition-series) | MPC reveals, storytelling, marketing |
| CMS | Sanity (studio embedded in app) | catalog + all editable content |
| Backend | Next.js Route Handlers | AI assistant, lead capture, render webhooks |
| Email (MVP) | Resend | quote-request delivery to sales |
| Hosting | Vercel | edge SSR, image opt, analytics, previews |
| Blog | MDX in repo + (optional) Sanity | content marketing |

**Deferred (add when feature demands):**
- Motion One — overlaps Framer Motion
- React Three Rapier (physics) — no requirement for real physics
- Spline — R3F + commissioned/Drei models covers 3D

### 1.3 Route map

```
/                       Landing  (loading → hero → scroll story → stats → featured → factory → globe → gallery → CTA)
/products               Catalog browser (filter: trims / packaging / accessories)
/products/[slug]        Product page (MPC reveal → interactive 3D viewer → specs → material → compare → related → quote CTA)
/materials              Material library (interactive swatches)
/compare                Split-screen product comparison (drag slider)
/about                  Company story, stats, global supply narrative
/factory                (or anchor section) factory process timeline
/blog                   MDX content marketing
/quote  (and /contact)  AI Quote Assistant + contact form
/studio                 Sanity Studio (embedded, auth-gated)
```

### 1.4 Experience flow

Matches the brief's narrative sequence:

```
Loading(weave E→EASTRIMS) → Hero(3D woven label floating) → Camera-into-fabric →
Label-woven-live → Hang-tag-appears → Paper-transform → Patch-stitches →
Embroidery-animation → Featured-products → Gallery → Factory(conveyor) →
Global-map(shipping routes) → Stats(thread-winds-numbers) → Contact(box-folds-open) → Footer
```

---

## 2. Rendering & Animation Subsystems

**Core principle:** If users *interact with camera or state* in real-time → R3F. If it's *a fixed cinematic sequence* → Remotion. If it's *DOM-level* → GSAP/Framer.

### 2.1 Division of labor

| Experience | Subsystem | Why |
|---|---|---|
| Hero (woven label floating, mouse-reactive) | **R3F live** | Real-time mouse parallax, camera orbit, interactive particles |
| Interactive product viewer (rotate/zoom/material switch) | **R3F live** | User controls camera and material state |
| Material library swatches (hover texture change) | **R3F live (mini)** | Hover changes shader state |
| Supply globe (pins, routes, hover info) | **R3F live** | Drag-to-rotate, hover tooltips, animated arcs |
| MPC-style product reveal | **Remotion video** | Non-interactive, pre-render to 4K |
| Scroll storytelling | **Remotion video + GSAP sync** | Cinematic footage; scroll controls playback |
| Factory timeline | **Remotion video + GSAP sync** | Fixed sequence — video |
| Statistics (thread winds numbers) | **GSAP + SVG** | DOM animation |
| Loading screen (thread weave E→EASTRIMS) | **GSAP + SVG** | DOM animation |
| Gallery hover (lift/rotate/shadow) | **Framer Motion** | 100+ items — CSS/Framer efficient |
| Contact box (folds/open) | **GSAP + SVG** | DOM animation |
| Ambient particles (hero dust, CTA confetti) | **R3F (hero)** + **CSS/SVG (CTA)** | Hero tied to 3D; CTA one-shot |

### 2.2 R3F scenes

#### Hero scene (`components/3d/HeroScene.tsx`)

```
Canvas (R3F)
├── Environment (HDR studio lighting — Drei)
├── WovenLabel (GLTF + custom metallic-thread shader)
│   ├── auto-rotation + mouse-reactive rotation offset
├── DepthOfField + Bloom (postprocessing)
├── Particles (InstancedMesh: dust/fibers, mouse-attract)
└── Camera rig (parallax from cursor)
```

Capability gate: `<WebGLCheck>` → fallback `<HeroVideoLoop>` (Remotion-rendered 1080p loop).

#### Product viewer (`components/3d/ProductViewer.tsx`)

```
Canvas (R3F, lazy-loaded)
├── Environment (preset: studio/daylight/dramatic/dark)
├── ProductModel (GLTF by slug)
│   ├── OrbitControls (rotate, zoom)
│   ├── hotspots (click → detail zoom)
│   └── material variants (switchable)
└── UI overlay: [Rotate] [Zoom] [Material] [Lighting] [Finish]
```

Fallback: `<ProductGallery>` (static images + zoom).

#### Material library (`components/3d/MaterialSwatch.tsx`)

Small canvas per swatch, hover triggers shader time uniform + reflectivity shift. Alternative: Canvas 2D shaders for grid efficiency. Fallback: static swatch images.

#### Supply globe (`components/3d/SupplyGlobe.tsx`)

```
Canvas (R3F)
├── Earth (sphere + texture or Drei Globe)
├── Pins (InstancedMesh: China, Vietnam, Bangladesh, Indonesia, Turkey, USA, EU)
│   └── hover → tooltip
├── Routes (animated arcs: origin → destination)
└── OrbitControls (drag rotate)
```

Fallback: `<SupplyMapSVG>` (CSS-animated pins + routes).

### 2.3 Remotion compositions

#### MPC reveal (`remotion/compositions/ProductReveal.tsx`)

```
Sequence: Black → LightStreak → Logo → Explode → Reassemble → Orbit → Macro → Specs → CTA
Duration: 8-12s, 4K desktop / 1080p mobile
Triggered on product publish → Vercel render → CDN upload
```

#### Scroll storytelling (`remotion/compositions/ScrollStory.tsx`)

```
TransitionSeries: CameraIntoFabric → LabelWeave → HangTag → PaperTransform → PatchStitch → Embroidery
Stitched into one video, scroll position → video.currentTime (GSAP ScrollTrigger)
```

#### Factory timeline (`remotion/compositions/FactoryTimeline.tsx`)

```
Sequence: Artwork → Sampling → Printing → Cutting → QC → Packing → Shipping
Scroll-synced or autoplay. Fallback: SVG icons + CSS progress.
```

#### Marketing videos (multi-platform)

Same compositions rendered for:
- Homepage hero (16:9, 10-15s loop)
- Instagram Reel / TikTok / YouTube Shorts (9:16, 30-60s)
- LinkedIn promo (1:1 or 16:9, 30s)
- Trade show loop (16:9, 30s-2min)

Sanity `marketingVideo` schema stores platform, aspect, duration → webhook triggers render.

### 2.4 Scroll orchestration

```ts
// Lenis smooth scroll + GSAP ScrollTrigger master timeline
lenis.on('scroll', ScrollTrigger.update)
ScrollTrigger.create({
  trigger: '#chapter-label-weave',
  onUpdate: (self) => videoEl.currentTime = self.progress * videoEl.duration
})
```

Statistics: GSAP timeline — number animates 0→target, SVG thread path wraps around.

Gallery hover: Framer Motion `whileHover={{ y: -10, rotateX: 5, rotateY: 5, scale: 1.05 }}`.

Contact box: GSAP SVG timeline — flaps fold on scroll, lid opens on click.

### 2.5 Capability detection & fallbacks

```ts
const tier = useMemo(() => {
  const gl = canvas.getContext('webgl2')
  if (!gl) return 3
  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
  const isLowEnd = /mobile|intel hd|mali|adreno 5/i.test(renderer)
  const isSmallScreen = window.innerWidth < 768
  if (isSmallScreen || isLowEnd) return 2
  return 1
}, [])
```

| Tier | Hero | Product Viewer | Globe | Storytelling | Particles |
|---|---|---|---|---|---|
| 1 (desktop, WebGL2, good GPU) | Full R3F | Full R3F | Full R3F | Remotion 4K + scroll-sync | Full |
| 2 (mobile/weak GPU) | Simplified R3F | Simplified | Static image | Remotion 1080p | Reduced |
| 3 (no WebGL) | Hero video loop | Static gallery | SVG map | Remotion 1080p autoplay | None |

### 2.6 Asset loading

- Hero GLTF: preload on app load, ~1-2MB
- Product GLTFs: lazy-load via `useGLTF.preload(slug)` on route enter
- Remotion renders: on-demand webhook → CDN (Sanity or Vercel blob)
- HDR environments: Drei presets or custom EXR

---

## 3. Content, Data Model & CMS (Sanity)

### 3.1 Schema overview

```
sanity/schemas/
├── documents/
│   ├── product.ts          (core product)
│   ├── category.ts         (trims / packaging / accessories)
│   ├── material.ts         (cotton, satin, damask...)
│   ├── heroConfig.ts       (landing hero config)
│   ├── marketingVideo.ts   (Remotion render configs)
│   ├── blogPost.ts         (MDX content)
│   ├── siteSettings.ts     (global: logo, colors, stats, routes)
│   └── quoteLead.ts        (captured quote requests)
├── objects/
│   ├── productVariant.ts   (size, finish, thread options)
│   ├── hotspot.ts          (3D viewer click zones)
│   ├── shippingRoute.ts    (globe route)
│   └── stat.ts             (statistics entry)
```

### 3.2 Core schemas

#### `product.ts`

Fields: title, slug, sku, category (ref), description (portable text), heroImage (hotspot), gallery, model3d (GLB file), materials (refs), variants, specifications, features, applications, minOrderQuantity, leadTime, priceRange, relatedProducts (refs), revealVideo (ref), hotspots, seo (object), featured (bool), publishedAt.

#### `category.ts`

Title, slug, description, heroImage, order, parent (optional nesting). Categories: Trims → (Woven Labels, Printed Labels, Hang Tags, Patches, Buttons, Zippers, Metal Hardware); Packaging → (Poly Bags, Boxes, Hangers, Tissue Paper, Brand Cards); Accessories → (Security Tags, RFID).

#### `material.ts`

Title, slug, description, texturePreview (image), shaderConfig (object: baseColor, roughness, metallic, anisotropicStrength), properties, applications.

#### `heroConfig.ts`

Single document (`_id: 'hero-config-main'`): title, subtitle, ctaText, ctaLink, heroModel (GLB), heroVideo (ref), particleConfig (object), lightingPreset, backgroundGradient.

#### `marketingVideo.ts`

Title, composition (productReveal/heroLoop/scrollStory/factoryTimeline/marketingShort), product (ref), platform, aspectRatio, durationSeconds, resolution, renderStatus, cdnUrl, thumbnailUrl, lastRenderedAt.

#### `siteSettings.ts`

Single document (`_id: 'site-settings-main'`): title, description, logo (image), favicon, brandColors (object: primary, secondary, accent, background, text), socialLinks, contactInfo, stats (array), shippingRoutes (array).

#### `quoteLead.ts`

createdAt, status, contactName, contactEmail, company, phone, productInterest (ref), trimType, garmentType, washCareRequired, estimatedQuantity, preferredMaterial, targetDeliveryDate, additionalNotes, aiSummary, suggestedProducts (refs).

### 3.3 Studio structure

```ts
S.list().items([
  S.listItem().title('Products').child(S.documentTypeList('product')),
  S.listItem().title('Categories').child(S.documentTypeList('category')),
  S.listItem().title('Materials').child(S.documentTypeList('material')),
  S.listItem().title('Marketing Videos').child(S.documentTypeList('marketingVideo')),
  S.listItem().title('Blog Posts').child(S.documentTypeList('blogPost')),
  S.listItem().title('Quote Leads').child(S.documentTypeList('quoteLead')),
  S.divider(),
  S.listItem().title('Hero Config').child(S.document().id('hero-config-main')),
  S.listItem().title('Site Settings').child(S.document().id('site-settings-main')),
])
```

### 3.4 GROQ queries (key)

```ts
// Featured products (landing gallery)
groq`*[_type == "product" && featured == true] | order(publishedAt desc) { title, slug, heroImage, model3dUrl, leadTime, category->{title} }`

// Product by slug (product page)
groq`*[_type == "product" && slug.current == $slug][0] { title, description, model3dUrl, materials[]->{shaderConfig}, variants, specifications, revealVideo->{cdnUrl}, hotspots }`

// Hero config
groq`*[_id == "hero-config-main"][0] { title, subtitle, heroModelUrl, heroVideo->{cdnUrl}, particleConfig, lightingPreset }`

// Site settings
groq`*[_id == "site-settings-main"][0] { logoUrl, brandColors, stats, shippingRoutes }`
```

### 3.5 Preview & draft mode

Sanity preview secret → `/api/draft/enable` → Next.js draft mode → live preview with real-time updates. Staff sees changes instantly without publish.

### 3.6 i18n readiness

MVP: English-only. Schema structured for `i18n` plugin addition (Phase 6): localized fields per language, GROQ filter by lang, Next.js middleware routes `/en/`, `/zh/`, `/vi/` etc.

---

## 4. UI/UX Design System

### 4.1 Landing pattern

**Storytelling-Driven + Hero-Centric + Trust & Authority (B2B).** CTAs repeated after each narrative beat.

```
Hero → Scroll Story → Stats → Featured → Interactive showcase → Factory → Globe → Gallery → Comparison → Quote CTA → Contact → Footer
```

### 4.2 UI styles

| Style | Role |
|---|---|
| Dark Mode (OLED) | Primary theme — luxury black |
| 3D Product Preview | Product pages — interactive viewer |
| 3D & Hyperrealism | Hero, MPC reveals — immersive |
| Liquid Glass | Cards, nav, panels — premium feel |
| Parallax Storytelling | Landing chapters — scroll-driven |
| Skeuomorphism (accents) | Metallic thread, materials — realistic |

### 4.3 Color tokens (map to brand at implementation)

```css
--color-bg-base:        #0A0A0B;  /* near-black OLED */
--color-bg-elevated:    #111114;  /* panel */
--color-surface:        #1A1A1F;  /* card */
--color-surface-hover:  #25252B;
--color-border:         rgba(255,255,255,0.08);
--color-text-primary:   #F5F5F7;
--color-text-muted:     #A1A1AA;  /* ≥4.5:1 contrast */
--color-accent-gold:    #C9A961;  /* metallic thread primary */
--color-accent-gold-bright: #D4AF37;  /* CTA hover */
--color-accent-bronze:  #8B7355;  /* secondary */
--color-cta-bg:         linear-gradient(135deg, #C9A961, #D4AF37);
```

Light mode available (warm white base, charcoal text, gold CTA preserved).

### 4.4 Typography

```css
--font-display:  "Space Grotesk", sans-serif;  /* headings — geometric, precision */
--font-body:     "Inter", sans-serif;           /* body — optimal legibility */
--font-mono:     "JetBrains Mono", monospace;   /* specs, SKUs */
```

Headings: weights 500-700, tight tracking, scale 2.5rem→5rem. Body: 400/500, 1rem (16px min), line-height 1.6. Luxury-editorial alternative: Cormorant Garamond (display) + Inter (body).

### 4.5 Layout system

- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Floating navbar: `fixed top-4 left-4 right-4 z-30`
- Grid: 12-col desktop → single-col mobile
- Breakpoints: 375 / 768 / 1024 / 1440 / 1920
- z-index: 10 content · 20 sticky · 30 nav · 40 modals · 50 overlays

### 4.6 Effects

- Soft layered shadows (depth)
- Transitions 150-300ms (micro), 400-600ms (scenes)
- Hover: color/opacity/shadow only — **no layout shift**
- Bloom + DOF (3D)
- Glass: `backdrop-blur-xl bg-white/5 border-white/10`
- Gold gradient accents (subtle)

### 4.7 Anti-patterns (avoid)

- ❌ Emoji icons → Lucide/Heroicons SVG
- ❌ Neon colors, AI purple-pink gradients
- ❌ Jarring animations >500ms
- ❌ Layout-shifting hovers
- ❌ `border-white/10` on light mode
- ❌ Missing `cursor-pointer`
- ❌ Gray-400 body text (fails contrast)

### 4.8 Pre-delivery checklist

- [ ] No emojis as icons — SVG (Lucide)
- [ ] `cursor-pointer` on all clickables
- [ ] Hover 150-300ms, no layout shift
- [ ] Text contrast ≥4.5:1 (WCAG AA)
- [ ] Visible focus rings
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive 375/768/1024/1440
- [ ] Alt text, labeled forms, color not sole indicator

---

## 5. AI Quote Assistant & Backend

### 5.1 Conversation flow (guided wizard)

```
1. "What trim are you looking for?"          → trimType
2. "What garment will it be used on?"        → garmentType
3. "Do you need wash-care compliance?"       → washCareRequired (bool)
4. "Estimated order quantity?"               → estimatedQuantity
5. "Preferred material?"                     → preferredMaterial
6. "Target delivery date?"                   → targetDeliveryDate
7. Contact capture (name, email, company, phone)
8. AI suggests products, prepares summary
9. Submit → quoteLead doc + Resend email
```

Quick-reply chips at each step. Skip allowed; graceful handling.

### 5.2 Architecture

```
Client (chat UI) → /api/quote-assistant
                         ↓
                   LLM (Claude Sonnet 4-class) with tool-use
                         ↓
                   tools: suggestProducts(query), estimateLeadTime(material, qty), saveLead(data), sendEmail(lead)
```

LLM routes conversation, wizard constrains to structured fields.

### 5.3 API routes

```
POST /api/quote-assistant
  → { reply, nextStep, updatedData, suggestedProducts }

POST /api/quote-assistant/submit
  → saves quoteLead + emails sales (Resend)

GET /api/render-video (Sanity webhook)
  → Remotion Lambda render → CDN upload

POST /api/revalidate
  → Next.js cache revalidation
```

### 5.4 Lead handoff (hybrid)

**MVP:** quoteLead doc + Resend email to sales@eastrims.com with AI summary + Sanity link.

**Later:** ERP webhook (Salesforce/HubSpot), self-serve pricing tool using rules table.

---

## 6. Asset Creation Pipeline

### 6.1 3D models

| Tier | Method |
|---|---|
| Hero products (5-10 flagship) | Commissioned 3D artist (Blender → GLB, <2MB) |
| Core catalog | Procedural woven-mesh generator (Three.js custom geometry + shader) |
| Materials | Shader library (GLSL + texture maps) |

Pipeline: Artist → Blender → optimize → GLB → Sanity → product.model3d → lazy-load.

Procedural fallback: `lib/woven-mesh-generator.ts` — builds woven label mesh from params (weave density, thread count, logo SVG → displacement).

### 6.2 Textures / HDRI

HDR environments: Drei presets or custom EXR (Poly Haven). Material textures: PBR maps from commercial/libre sources. Brand textures: commissioned fabric scans.

### 6.3 Remotion pipeline

Composition + product data (Sanity) + assets → Remotion Lambda render → MP4 → Sanity CDN → marketingVideo.cdnUrl update → revalidate.

### 6.4 Brand assets (needed at implementation)

- Logo: SVG (vector)
- Brand colors: hex codes
- Typography: web font files/licenses
- Brand guidelines PDF

All in Sanity `siteSettings`.

---

## 7. Performance, Accessibility, Ops

### 7.1 Performance budgets

| Metric | Target |
|---|---|
| LCP | <2.5s |
| CLS | <0.1 |
| INP | <200ms |
| FPS (3D) | 60fps desktop / 30fps tier-2 |
| JS bundle (initial) | <200KB gzipped |
| Lighthouse | 90+ all |

### 7.2 Capability detection

Tier 1/2/3 based on WebGL2, GPU tier, screen size. Mobile defaults to tier 2/3.

### 7.3 Accessibility (WCAG AA)

- Keyboard nav, focus rings (`ring-accent-gold`)
- ARIA labels, landmark roles, alt text
- `prefers-reduced-motion`: disables 3D/particles, static fallback
- Contrast ≥4.5:1
- Forms labeled, error messages
- 3D fallbacks: accessible static equivalent for every scene

### 7.4 SEO

- SSR/RSC for all content (3D never blocks crawl)
- Per-page meta from Sanity
- JSON-LD: Product, Organization, BreadcrumbList
- sitemap.xml, robots.txt auto-generated
- Canonical URLs, OG, Twitter cards
- Next.js `<Image>` + Sanity CDN (WebP, srcset)

### 7.5 Hosting & CI/CD

- Vercel: edge SSR, ISR, image opt, analytics, preview deploys
- Sanity: managed CMS + CDN
- Remotion Lambda: serverless render
- CI: GitHub Actions → lint, type-check, build, Lighthouse CI → Vercel

### 7.6 Monitoring & security

- Vercel Analytics + Speed Insights
- Sentry (error tracking, WebGL exceptions)
- Rate-limit APIs
- Zod validation on routes
- CSP headers, scoped Sanity tokens

---

## 8. Implementation Roadmap

| Phase | Scope | Outcome |
|---|---|---|
| **0. Foundation** | Next.js + TS + Tailwind + shadcn, Sanity studio + schema, design tokens, git/CI | Skeleton live |
| **1. Core site** | Landing (static hero), catalog, product pages (SSR), contact, blog, SEO, a11y | Production B2B site (no 3D) |
| **2. 3D & interactivity** | R3F hero, product viewer, material library, globe, particles, capability tiers | Immersive desktop |
| **3. Cinematic video** | Remotion compositions (MPC, scroll story, factory), scroll-sync, loading screen | Cinematic storytelling |
| **4. AI Quote Assistant** | Guided wizard, LLM tool-use, lead capture + Resend | Conversion feature |
| **5. Marketing video gen** | Multi-platform renders (Reels/TikTok/Shorts/LinkedIn/tradeshow), webhook pipeline | Marketing engine |
| **6. Polish & scale** | i18n, ERP/pricing integration, performance tuning, analytics, A/B | Full vision |

---

## Appendix: Decisions Log

| Question | Answer |
|---|---|
| Immediate goal | Full specification & architecture (A) |
| Existing 3D assets | None (D) → asset strategy included |
| Product catalog scope | Full trim + packaging + accessories (C) |
| Brand assets | Established brand (A) → brand files at implementation |
| CMS | Sanity (A) |
| AI assistant handoff | Hybrid: email MVP → ERP later (D) |
| Team/maintenance | Mixed: CMS-first content, dev for features (D) |
| Deployment | Vercel (assumed) |
| Mobile/desktop | Desktop-primary, mobile graceful degradation (A) |
| Rendering approach | Hybrid: R3F live + Remotion video (Approach 2) |

---

**Next step:** User reviews spec → invoke `writing-plans` skill to create implementation plan.