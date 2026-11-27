# Apex Stone Art — reusable business website

A Next.js App Router starter for a product catalogue and customer enquiries, designed for static Cloudflare Pages hosting. No server, database or paid website builder is required for this scope.

## 1. Run locally

Use Node.js 22 LTS or newer supported LTS. From this folder:

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Check Home, About, Products, Gallery, Contact and Privacy. The default mode is a design preview. npm install creates a package-lock.json; commit it after a successful build. Before deployment review installed versions for security updates.

## 2. Personalize the website

- `config/business.ts`: approved company name, phone, email, WhatsApp number (country code + number, digits only), address, map URL and hero photograph.
- `config/gallery.ts`: single source of truth for the nine confirmed collections and customer-approved artwork photos. `config/products.ts` only defines the shared product type.
- `public/images/`: add optimized customer-owned WebP/AVIF files and reference them in the above config files.
- `styles/tokens.css`: all design colors, typography and theme values.
- `app/about/page.tsx`, `app/page.tsx`, `app/privacy/page.tsx`: approve or replace draft marketing and privacy copy before launch. Replace the decorative About swatch with an approved photo if desired.
- `components/`: reusable navbar, hero, product card, gallery visual, contact form, WhatsApp link and footer.

The logo treatment, color palette, product names and descriptions are illustrative decisions, not verified facts or an approved brand identity. Do not publish until they are approved. The user-provided phone/WhatsApp number is configured. The contact page displays clearly labelled sample email/address only until real details are approved.

## 3. Enable real customer enquiries

Create a Web3Forms access key using the customer's approved inbox at https://web3forms.com/. Use the key as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local`. This is a browser-public form identifier, not a secret. Do not put private credentials in a NEXT_PUBLIC variable. The form posts directly to Web3Forms, with browser validation, consent, a honeypot, timeout, disabled sending state and success/error feedback. The honeypot is basic protection; assess provider-side spam controls and stronger challenge protection before launch. Confirm current free-tier quota and privacy terms. Do not use real customer data in tests.

Set `NEXT_PUBLIC_SITE_READY=true` only after approving the real content, privacy notice, phone and email. For a local test, use a dedicated test inbox or approved business inbox and send a single clearly labeled test enquiry. Confirm actual receipt, not just the on-screen success message. If the submission key is absent, the form stays disabled. Direct call and WhatsApp buttons are already configured for the user-provided number; verify with the owner before publication. The sample email/address are display-only and not clickable. The preview is noindex, not password protected; do not include confidential content.

## 4. Local acceptance checks

```sh
npm run typecheck
npm run build
npm run preview
```

Open the local preview URL printed by the last command. Verify with Chrome DevTools (or Chrome DevTools MCP in your coding agent):

- Desktop 1440px, tablet 768px, mobile 390px: no horizontal scrolling, text clipping or broken navigation.
- All routes load; mobile menu opens/closes; active page is marked; browser back works.
- Product quotation link opens the corresponding preselected contact form (or WhatsApp when configured).
- Empty required fields (name, email, phone, product, message) and invalid email are rejected; consent is required; no request when preview mode is active.
- Using a mock fetch, check sending, API success, API failure and timeout feedback. Do one real approved submission only after configuration.
- Check console errors, failed network requests and screenshot evidence at the three widths.
- `out/` contains each route and static assets; no Next.js server is needed.

## 5. Cloudflare Pages deployment (after local checks)

Create a GitHub repository and push the approved source including package-lock.json. In Cloudflare Workers & Pages, create a Pages application and import the repository. Use the Next.js (Static HTML Export) preset, build command `npm run build`, output directory `out`, Node.js 22 or newer supported LTS. Set the required NEXT_PUBLIC environment variables for the desired build environment. Deploy to the generated `*.pages.dev` address and verify first. Do not attach the live domain during preview. The existing GoDaddy domain can be connected when approved; for the apex domain, Cloudflare Pages requires a Cloudflare zone with delegated nameservers. Copy and verify the entire existing DNS zone including mail MX, SPF, DKIM and DMARC records before changing nameservers. Keep a rollback record and never cancel the current website prematurely. See https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/ and https://developers.cloudflare.com/pages/configuration/custom-domains/.

## Verification status at delivery

Source syntax and local imports checked with the available TypeScript compiler API. Full build, typecheck with dependencies, Chrome DevTools MCP browser testing and real enquiry delivery remain unverified: npm registry DNS was unavailable in the authoring environment. No hosting accounts, DNS, or GitHub repository were created or modified. No paid calls were made. The next step is npm install and local verification.

## Contact page revision
Approved modern-classic reference: two-column layout, contact cards, illustrative stone artwork cropped from the generated reference, quotation form and instant contact links. Form privacy link removed; consent retained, privacy page linked from the footer. Call/WhatsApp links open the configured phone number; users must press Send in WhatsApp. Email submission remains gated until approved Web3Forms configuration. Sample email/address are intentionally not delivery targets.

### Interactive gallery

Open `/gallery/`. Use arrows, slide indicators or horizontal touch swipes for featured materials. Filter by collection, select a card to open its large preview, and navigate with thumbnails, arrow keys or swipes. Escape closes the dialog. Motion respects reduced-motion settings. `config/gallery.ts` owns the collection names and artwork entries; add approved local photo paths to its `approved` array. Preview studies are clearly labelled. No third-party photographs or new packages are included.

### Craft-focused homepage

The homepage now has a full-bleed craft hero, human-paced looping text and a seamless horizontally scrolling artwork showcase. Use the pause controls independently; hovering/focusing the showcase pauses it and OS reduced-motion preferences disable continuous motion. Six local WebP concept studies were AI-generated using the approved visual reference (no reference screenshot crops or external URLs). They are not customer work. `config/craft.ts` derives its artwork showcase from `config/gallery.ts`. Add confirmed items to the gallery `approved` array with `sample:false` and set `business.heroImage` to an approved local artisan photograph. The generated examples are not rendered when `NEXT_PUBLIC_SITE_READY=true`; remove unused sample asset files from the production release too. The enquiry delivery settings are unchanged. Confirm the actual manufacturing process and marketing copy before launch.

Check all four typing phrases, pause/resume, reduced-motion preference, showcase looping without a visible seam, gallery sample badges and image loading in Chrome DevTools MCP at 390/768/1440px. Verify the approved-mode build does not display generated samples. Do not enable live form delivery merely to test visual changes.

### Editorial theme
The home hero uses `craftHeroScenes` in `config/craft.ts`; inner page mastheads reuse `components/uic-page-intro.tsx`. Adjust colors and spacing in `styles/tokens.css`. Approved photos and business data are required before enabling publication.

### Confirmed collections across the site (current)
`config/gallery.ts` is the single source of truth for nine customer-confirmed collections and eleven AI-generated preview artwork images. Products displays all eleven designs in collection order; Gallery shows nine covers with per-collection image navigation; the home showcase uses the same images; Contact offers the nine collection names plus Other / not sure. Generic material products have been removed. The artisan workshop study remains a hero image only. All image assets are included locally in `public/images/craft/` and `public/images/collections/`.

To add real photos, place approved WebP files in `public/images/collections/` and add a unique GalleryItem to `approved` in `config/gallery.ts` (id, name, category, description, texture, collection, image, featured, sample:false). Use the exact confirmed collection name. Multiple photographs per collection are supported. The generated studies are shown only while `NEXT_PUBLIC_SITE_READY=false`; when ready mode is enabled, only approved photos render and unphotographed collections remain available for enquiries. Remove unused generated assets from the production release. Do not publish with dummy contact details or an unapproved privacy notice.

Test `/products/`, `/gallery/`, `/contact/`, and `/` at your actual dev port. Verify all nine collection labels, all eleven preview images, gallery filters/lightbox, collection-specific enquiry links, no old materials, and no AI studies rendered in ready mode. No new dependencies or services.
