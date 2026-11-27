# Architecture
Next.js App Router + TypeScript, Tailwind CSS v4 and shared CSS tokens. Static export to out/; Cloudflare Pages can host static assets. All product and business configuration lives in config/. Browser contact form sends directly to Web3Forms only when enabled. No server secrets or database. Public WhatsApp link uses validated international digits. Reusable components live in components/; route composition lives in app/. Do not add server-only Next.js features while static export is required.

Presentation motion uses CSS and one client-only ScrollReveal observer, mounted by the root layout. It rebinds on pathname changes and respects reduced-motion preferences; no runtime server or animation library is required.

Contact page composes shared-config direct links and the existing client enquiry form. Preview-only email/address values are not delivery targets. No new service or package; the site-ready/access-key gate remains unchanged.

Gallery route uses a server-rendered page shell and client gallery controller, with featured carousel, filters, card and native dialog components. Gallery data derives from config/gallery.ts (local images only); no external image requests, API, new dependencies or backend. Manual navigation, touch swipes and keyboard/lightbox controls are client-side; CSS handles motion with reduced-motion support.

Craft homepage uses client Hero/TypingText and CraftShowcase components; timers are cleaned up on dependency changes and unmount, CSS handles zoom and a duplicated equal-width marquee track. `config/gallery.ts` selects preview studies vs approved artwork using the existing public build flag. `config/craft.ts` derives its showcase from gallery items; the artisan study is separate from the catalogue. All study assets are local WebP; no runtime image provider or new dependencies.

## Editorial presentation
Navbar renders in the home Hero or as the shared standalone header on other routes. PageIntro supplies reusable server-rendered route mastheads. Hero scenes derive from craft configuration with preview-only assets excluded from ready mode. Products, Gallery, the homepage showcase and enquiry selector use the same nine confirmed collection names and gallery artwork data. Products and Gallery use neutral pending-photo states when no approved image exists; sample cards use enquiry wording, not confirmed availability. Existing gallery, static export and email integration remain.
