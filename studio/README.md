# Eastrims Sanity Studio (standalone)

This is the content management studio for the Eastrims site, kept **separate**
from the Next.js web app so the site's server bundle stays small (the Studio is
large and should not ship in an edge Worker).

## Setup

```bash
cd studio
npm install
cp .env.example .env      # set SANITY_STUDIO_PROJECT_ID
npm run dev               # local studio at http://localhost:3333
```

## Deploy

Host the studio on Sanity's free managed hosting (gets a `*.sanity.studio` URL):

```bash
npm run deploy
```

The schema (`schemas/`) and config (`sanity.config.ts`) define the full content
model (products, categories, materials, marketing videos, blog posts, quote
leads, hero config, site settings).
