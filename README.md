# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
# biodata
# biodata
# biodata

## Editor design

The editor uses a warm paper background with forest actions and restrained ochre highlights. Brand name, logo slot, tagline, and document wording live in `app/config/product.ts`. Editor palette and font tokens are in the final `@theme static` block in `app/assets/css/main.css`; scoped layout rules are in `app/assets/css/editor.css`. Nuxt UI control defaults live in `app/app.config.ts`.

The existing English interface accepts Bengali content. Editor text uses local Hind Siliguri font files; headings use Georgia with a Bengali fallback. This does not introduce an interface translation system.

PDF templates and pagination remain independent of editor styling. PreviewPane mounts a separate fixed-width, unscaled capture copy. Never put editor styles or zoom transforms on that copy. Check English and Bengali exports when changing preview markup or fonts.

Manual regression checklist: enter details, use Next/Back and the step drawer, cancel Start over, reload to check the draft, open Preview, select each layout, zoom and pan, and download. Inspect the exported pages for missing glyphs, line splits, and unexpected blank pages. Check widths 360, 390, 768, 1024, and 1440px, plus a real phone keyboard.


## Publish on GitHub Pages

This is a Nuxt application, not a standalone Vite app. The workflow in `.github/workflows/deploy.yml` runs `npm ci` and `npm run generate` on Node 24, then publishes `.output/public` (not `dist`).

1. In the GitHub repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Commit and push the project changes, including `.github/workflows/deploy.yml`, to `main`.
3. Open **Actions → Deploy Nuxt to GitHub Pages**. It runs on each push; **Run workflow** also starts it manually.
4. Once deployment succeeds, open the URL in the deployment job. For `ami-nai/biodata`, the normal URL is `https://ami-nai.github.io/biodata/`.

The workflow obtains the base path from GitHub Pages configuration, so repository subpaths and configured custom domains are supported without editing a Vite config. Locally the base path remains `/`. To verify the repository path locally, run `NUXT_APP_BASE_URL=/biodata/ npm run generate`.

Only generated public files are uploaded. Drafts remain in visitors' browser storage. Icons use the public Iconify API because Pages provides no Node server; fonts and icons that use external services require network access.
