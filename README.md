# Eastrims — Premium Garment Trims Website

A premium, immersive B2B website for **Eastrims**, a full-service garment-trims
manufacturer (woven labels, hang tags, patches, packaging, accessories). Built
for an Apple/Nike/Tesla-level feel: live 3D, cinematic video, scroll
storytelling, an interactive product viewer, and an AI-powered quote assistant.

## Tech stack

- **Next.js 16** (App Router, RSC) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn/ui** (dark luxury + gold design tokens)
- **Three.js** + **React Three Fiber** + **Drei** + **postprocessing** (live 3D)
- **Remotion** + **@remotion/player** (cinematic compositions, multi-platform)
- **GSAP** + **Framer Motion** + **Lenis** (animation & smooth scroll)
- **Sanity v3** (headless CMS, embedded studio)
- **Vercel Analytics**, **Anthropic SDK** (AI assistant), **Resend** (email)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in at least the Sanity project id
npm run dev                  # http://localhost:3000
```

Studio (CMS) at `/studio`. Marketing preview tool at `/marketing`.

### Environment

See [`.env.example`](.env.example). Minimum to build/run: `NEXT_PUBLIC_SANITY_PROJECT_ID`.
To unlock persistence, AI, and email, add the corresponding keys (all optional —
the site degrades gracefully without them).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` / `_API_VERSION` | Sanity read (required) |
| `SANITY_API_READ_TOKEN` | Draft preview |
| `SANITY_API_WRITE_TOKEN` | Quote-lead persistence |
| `SANITY_REVALIDATE_SECRET` | Webhook revalidation secret |
| `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL` | AI quote assistant (NL mode) |
| `RESEND_API_KEY` / `CONTACT_FROM_EMAIL` / `SALES_EMAIL` | Lead email |
| `NEXT_PUBLIC_SITE_URL` | SEO (sitemap, robots, JSON-LD) |

### Scripts

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # serve production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run test       # vitest
```

## Architecture

**Hybrid rendering** (spec §2): live R3F for interactive moments (hero, product
viewer, supply globe), Remotion video for cinematic sequences, GSAP/Framer for
DOM animation. Next.js Server Components render SEO-critical HTML; heavy 3D
loads as isolated client *islands* behind a capability gate (tiered fallback to
2D/video/static for low-power devices). Remotion compositions play in-browser
via `@remotion/player` — no per-visit render cost.

Content lives in **Sanity** (non-technical team owns it). Pages fetch via cached
GROQ reads (`lib/sanity/fetch.ts`) and revalidate on webhook (`/api/revalidate`).
Pages render graceful empty/fallback states until content is published.

```
app/            routes (home, products, materials, about, factory, blog, quote, contact, studio, marketing)
components/     UI (layout, home sections, three/, remotion/, quote/, products/)
lib/sanity/     client, fetch, image, queries, types, writeClient
lib/quote/      lead persistence + email + types
lib/remotion/   platform configs
lib/i18n/       locale config
sanity/         studio config + schemas (documents + objects)
remotion/       compositions + Root (render registry)
```

## Content model (Sanity)

Documents: `product`, `category`, `material`, `marketingVideo`, `blogPost`,
`quoteLead`, plus singletons `heroConfig` (`hero-config-main`) and `siteSettings`
(`site-settings-main`). Objects: `productVariant`, `hotspot`, `shippingRoute`,
`stat`. All editable via the embedded Studio at `/studio`.

## Key features by phase

- **Phase 0 — Foundation:** scaffold, design tokens, fonts, shadcn/ui, Sanity
  studio + full schema, base layout, CI.
- **Phase 1 — Core site:** homepage, catalog (category filter), product detail,
  materials, about, factory, blog, quote/contact, SEO (sitemap/robots/JSON-LD).
- **Phase 2 — 3D & interactivity:** R3F hero (metallic woven label + particles +
  bloom), interactive product viewer (orbit/zoom, GLB or placeholder), stylized
  supply globe; capability-gated with 2D fallbacks.
- **Phase 3 — Cinematic video:** Remotion `ProductReveal` composition via Player
  on product pages, GSAP loading screen (thread-weave wordmark), Lenis smooth
  scroll, craftsmanship scroll-story section.
- **Phase 4 — AI quote assistant:** guided wizard + Anthropic tool-use NL
  extraction, live product suggestions, lead persistence (Sanity) + email
  (Resend) — all degrade gracefully without keys.
- **Phase 5 — Marketing video:** multi-platform compositions (16:9 / 9:16 / 1:1
  × durations), live `/marketing` preview tool, Remotion render Root + webhook
  integration point (Lambda-ready).
- **Phase 6 — Polish:** viewport/theme-color, Vercel Analytics, i18n locale
  foundation + switcher, documentation.

## Asset pipeline (3D)

- **Hero products:** commission a 3D artist → Blender → optimized GLB (<2MB) →
  upload to the product's `model3d` field. The viewer loads it via `useGLTF`.
- **Catalog:** procedural placeholder renders in the viewer until a GLB exists.
- **Materials:** PBR shader config in the `material.shaderConfig` field.

## Marketing render pipeline

Compositions in `remotion/` are shared across all platforms (`lib/remotion/platforms.ts`).
Preview live at `/marketing`. For server-side MP4 rendering, deploy **Remotion
Lambda** (or `@remotion/renderer` on a host with headless Chrome) and point the
Sanity `marketingVideo` webhook at `/api/render-video`; on completion, PATCH the
document's `cdnUrl` + `renderStatus`.

## Performance & accessibility

Desktop-primary with tiered mobile fallback (`lib/capability.ts`). Targets:
LCP <2.5s, CLS <0.1, 60fps desktop / 30fps tier-2. WCAG AA contrast, keyboard
nav with visible focus, `prefers-reduced-motion` respected (3D/particles/scroll
animations disable). Every 3D scene has an accessible static fallback.

## Deployment

Deploy to **Vercel** (Next.js native). Set the env vars, connect the Sanity
project, and configure webhooks: content publish → `/api/revalidate?secret=…`,
and (optionally) `marketingVideo` → `/api/render-video?secret=…`.

---

Design spec: `docs/superpowers/specs/2026-06-26-eastrims-website-design.md` ·
Phase 0 plan: `docs/superpowers/plans/2026-06-26-phase0-foundation.md`.
