# riffmusic

Website for [Riff](https://github.com/rootscripts/riff), live at [riff.hs.vc](https://riff.hs.vc).

Next.js with static export. Download counts, stars, Telegram subscribers and release links are fetched at build time, and the Deploy workflow rebuilds the site every 6 hours to keep them fresh.

## Run locally

```bash
npm install
npm run dev
```

`npm run check` runs lint, types, tests and a production build. The static site lands in `out/`.

## Deploy

GitHub Pages, through `.github/workflows/deploy.yml`. In the repo settings, Pages source must be set to "GitHub Actions". `public/CNAME` keeps the custom domain.

## Where things live

- `src/components/lib/content.ts` holds all text, links and image URLs
- `src/components/sections/` has one file per page section
- `src/components/tiles/` holds the feature cards
- `src/components/motion/` covers smooth scroll, scroll scenes and the color wash
- `src/components/styles/tokens.css` defines colors for light and dark themes
