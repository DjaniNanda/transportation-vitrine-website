# D&TE Translogistics — Site Guide

This started as a generic "vitrine" (showcase site) template and has since
been customized for D&TE Translogistics and Services Inc., including a
navbar, About section, service-comparison checklist, and footer ported
from a second reference site ("Lovely Serenity"). It's still built so a
future rebrand (new business, new content) is mostly a config edit.

## How it's organized

- **`src/config/siteConfig.ts`** — the single source of truth. Business
  name, contact info, nav labels, hero copy, services, about text,
  checklist data, testimonials, footer, SEO text, and brand colors.
- **`src/theme.ts`** — applies `siteConfig.theme` as CSS custom properties
  at runtime, and syncs the page `<title>`/meta description/theme-color.
  You never need to touch this file for a rebrand.
- **`src/components/*.tsx`** — all components read from `siteConfig`. No
  business-specific text or images are hardcoded in components.
- **`src/**/*.css`** — brand colors are `var(--color-primary)`,
  `var(--color-accent)`, etc. Changing `siteConfig.theme` repaints the
  whole site. Neutral grays/whites and a few one-off utility colors
  (star ratings, error states) were left as literals since they're not
  brand-specific.
- **`index.html`** — mostly static (title/description/theme-color are
  overwritten at runtime by `theme.ts`). A handful of things here are
  genuinely per-client and can't be templated safely — marked `TODO`:
  Google Analytics tag ID, Search Console/Bing verification tokens,
  JSON-LD structured data, canonical/`og:url`/`twitter:url` URLs,
  favicon/manifest files in `/public`.

## Page sections (in order)

1. **Header** — fixed navbar, dark background, no CTA buttons (nav
   links only). Ported from the Lovely Serenity reference site.
2. **Hero**
3. **Services** — 3 divisions (Moving, Tire Export, Vehicle Export)
4. **About** — circular image + heading + 2 paragraphs + CTA button.
   Ported from Lovely Serenity's About section design.
5. **Checklist** — service-comparison table (`siteConfig.checklist`),
   ported from Lovely Serenity's "cleaning checklist" design. Columns
   are the 3 divisions; rows are grouped by capability.
6. **Testimonials/Reviews** — live Google reviews via an embedded
   Shapo.io widget (see "Reviews section" below), plus a "Leave a
   Review" CTA linking to your Google Business Profile.
7. **Contact**
8. **Footer** — 4 columns (services, quick links, contact info, social
   + WhatsApp CTA) + copyright bar. Ported from Lovely Serenity.

There is intentionally **no "Our Operations"/team gallery section** —
it was removed at the client's request.

## Updating content

1. **Edit `src/config/siteConfig.ts`** — every field is documented
   inline, and every placeholder is marked `// TODO`. Search the file
   for `TODO` before launch (contact info, live-reviews setup, image
   paths, theme colors if they change, SEO URLs).
2. **Drop images into `/public`** and update the paths referenced in
   `siteConfig.ts` (`hero.backgroundImage`, `services.items[].image`,
   `about.image`, `business.logo`, etc.). Images are **not** included
   in this zip — only the paths are referenced.
3. **Update `index.html`** for the TODO items listed above.
4. **Run `npm install && npm run dev`** to preview locally, then
   `npm run build` before deploying.
5. Deploy (e.g. to Vercel) as usual.

## Notes on the checklist section

`siteConfig.checklist.columns` are the 3 divisions being compared;
`checklist.categories[].tasks[].values` is a boolean (or short string,
e.g. `"Add-on"`) per column, in the same order as `columns`. Add a row
by adding a `task` with one value per column; add a whole new division
by adding to `columns` and giving every existing task's `values` array
one more entry.

## Notes on the reviews section

Reviews are **not** hardcoded — they're pulled live from Google via an
embedded [Shapo.io](https://shapo.io) widget, so they stay current
without editing code. To finish setting this up:

1. Create/claim a **Google Business Profile** for D&TE (if not done
   already), which gives you a Place ID and a "write a review" link.
2. Sign up at **shapo.io**, connect that Google Business Profile, and
   configure a Testimonials/Wall-of-Love widget to show your 4 most
   recent reviews.
3. Copy the embed snippet Shapo gives you and paste it into
   `siteConfig.ts` as `testimonials.shapoEmbedCode` (a raw HTML/script
   string).
4. Set `testimonials.googleReviewUrl` to your real Google review link
   (from the Business Profile app: "Ask for reviews" → copy link, or
   `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`).

Until both are filled in, the Reviews section shows a placeholder
message instead of fake data, and the "Leave a Review" button falls
back to opening WhatsApp.

## Other things worth knowing

- `services.items[].icon` accepts `wrench`, `car`, `gauge`, `zap`,
  `settings`, `shield`, `truck`, `package`, `globe` — wired up in the
  `ICONS` map in `Services.tsx`. To add another, import it from
  `lucide-react` there and extend the `ServiceItem['icon']` union type
  in `siteConfig.ts`.
- WhatsApp is the only contact CTA wired up (`contact.whatsappNumber`).
  It's used in `Hero.tsx`, `Services.tsx`, `About.tsx`,
  `Testimonials.tsx`, `Contact.tsx`, and `Footer.tsx`.
- `contact.socials` (Facebook/Instagram/Twitter/LinkedIn) — leave a URL
  empty to hide that icon in the footer.
