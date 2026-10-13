import type { Plugin } from 'vite';
import { siteConfig } from './src/config/siteConfig';

/**
 * Builds the <head> SEO / social / analytics tags from src/config/siteConfig.ts
 * and injects them into index.html at build time (and in the dev server).
 *
 * Why at build time and not in React? Google, WhatsApp, Facebook, LinkedIn...
 * read the raw HTML and do NOT run JavaScript, so the tags must already be in
 * the file that gets served. This plugin gives you that while keeping
 * siteConfig.ts as the ONE file you edit.
 *
 * index.html contains two things this plugin fills in:
 *   - <html lang="...">          → from siteConfig.seo.locale
 *   - <!-- SITE_HEAD -->          → replaced by everything generated below
 *
 * After editing siteConfig.ts, Vite restarts the dev server automatically
 * (it watches this file's imports). Run `npm run build` to bake it into the
 * production files.
 */

const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** True when a URL has been filled in with a real value (not empty / example.com). */
const isReal = (url: string): boolean => !!url && !/example\.com/i.test(url);

const absolute = (path: string, base: string): string => {
  if (/^https?:\/\//i.test(path)) return path;
  return base.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '');
};

function buildJsonLd(): string {
  const { business, contact, seo } = siteConfig;
  const sd = seo.structuredData;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': sd.type,
    name: business.name,
    description: seo.description,
    slogan: business.tagline,
    serviceType: siteConfig.services.items.map((s) => s.title),
  };

  if (isReal(seo.siteUrl)) data.url = seo.siteUrl;
  if (isReal(seo.ogImage) && (isReal(seo.siteUrl) || /^https?:\/\//i.test(seo.ogImage))) {
    data.image = absolute(seo.ogImage, seo.siteUrl);
  }

  // Social profiles that have been filled in
  const sameAs = Object.values(contact.socials).filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;

  // Contact details are only published once the client confirms they're real
  // (seo.structuredData.includeContact) so placeholders never reach Google.
  if (sd.includeContact) {
    if (contact.phones[0]?.number) data.telephone = contact.phones[0].number;
    if (contact.email) data.email = contact.email;
    data.address = {
      '@type': 'PostalAddress',
      streetAddress: contact.address.line1,
      addressLocality: contact.address.line2,
      ...(contact.address.postal ? { postalCode: contact.address.postal } : {}),
    };
    if (sd.openingHours.length) data.openingHours = sd.openingHours;
  }

  // "<" is escaped so the JSON can never close the <script> tag early.
  return JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
}

function buildHead(isDevServer: boolean): string {
  const { business, seo, theme } = siteConfig;
  const lines: string[] = [];
  const meta = (attr: 'name' | 'property', key: string, value: string) =>
    lines.push(`<meta ${attr}="${key}" content="${esc(value)}" />`);

  const hasUrl = isReal(seo.siteUrl);
  // A relative ogImage ('/og-image.png') needs a real siteUrl to become a full URL.
  const hasImage = isReal(seo.ogImage) && (hasUrl || /^https?:\/\//i.test(seo.ogImage));

  // --- Core SEO -------------------------------------------------------
  lines.push(`<title>${esc(seo.title)}</title>`);
  meta('name', 'description', seo.description);
  if (seo.keywords.length) meta('name', 'keywords', seo.keywords.join(', '));
  meta('name', 'author', business.name);
  meta('name', 'robots', 'index, follow');
  if (hasUrl) lines.push(`<link rel="canonical" href="${esc(seo.siteUrl)}" />`);

  // --- Site verification ----------------------------------------------
  if (seo.googleSiteVerification) meta('name', 'google-site-verification', seo.googleSiteVerification);
  if (seo.bingSiteVerification) meta('name', 'msvalidate.01', seo.bingSiteVerification);

  // --- Open Graph (Facebook, WhatsApp, LinkedIn) ------------------------
  meta('property', 'og:type', 'website');
  meta('property', 'og:title', seo.title);
  meta('property', 'og:description', seo.description);
  meta('property', 'og:locale', seo.locale);
  meta('property', 'og:site_name', business.name);
  if (hasUrl) meta('property', 'og:url', seo.siteUrl);
  if (hasImage) meta('property', 'og:image', absolute(seo.ogImage, seo.siteUrl));

  // --- Twitter / X ------------------------------------------------------
  meta('name', 'twitter:card', hasImage ? 'summary_large_image' : 'summary');
  meta('name', 'twitter:title', seo.title);
  meta('name', 'twitter:description', seo.description);
  if (hasUrl) meta('name', 'twitter:url', seo.siteUrl);
  if (hasImage) meta('name', 'twitter:image', absolute(seo.ogImage, seo.siteUrl));

  // --- Browser colors ---------------------------------------------------
  meta('name', 'theme-color', theme.primary);
  meta('name', 'msapplication-TileColor', theme.primary);

  // --- Structured data --------------------------------------------------
  lines.push(`<script type="application/ld+json">\n${buildJsonLd()}\n</script>`);

  // --- Google tag (skipped in the dev server so local testing isn't tracked)
  if (seo.googleAnalyticsId && !isDevServer) {
    const id = esc(seo.googleAnalyticsId);
    lines.push(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>`,
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');</script>`,
    );
  }

  return lines.map((line) => '    ' + line).join('\n');
}

export default function siteHead(): Plugin {
  return {
    name: 'site-head-from-site-config',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const lang = siteConfig.seo.locale.split(/[_-]/)[0] || 'en';
        return html
          .replace(/<html\s+lang="[^"]*"/i, `<html lang="${esc(lang)}"`)
          .replace('<!-- SITE_HEAD -->', () => buildHead(!!ctx.server).trimStart());
      },
    },
  };
}
