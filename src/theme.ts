import { siteConfig } from './config/siteConfig';

/**
 * Applies the color palette defined in siteConfig.theme to CSS custom
 * properties on :root. Every component stylesheet reads colors via
 * var(--color-*), so changing siteConfig.theme is enough to re-skin the
 * whole site — no CSS edits required for a standard rebrand.
 *
 * Also applies the document title/meta description from siteConfig.seo,
 * so index.html only needs a one-time generic fallback.
 */
export function applyTheme(): void {
  const root = document.documentElement;
  const { theme } = siteConfig;

  const tokens: Record<string, string> = {
    '--color-primary': theme.primary,
    '--color-primary-dark': theme.primaryDark,
    '--color-primary-light': theme.primaryLight,
    '--color-primary-pale': theme.primaryPale,
    '--color-secondary': theme.secondary,
    '--color-accent': theme.accent,
    '--color-accent-dark': theme.accentDark,
    '--color-accent-light': theme.accentLight,
    '--color-accent-lighter': theme.accentLighter,
    '--color-accent-pale': theme.accentPale,
    '--color-teal': theme.teal,
    '--color-cyan': theme.cyan,
    '--color-mint': theme.mint,
    '--color-whatsapp': theme.whatsapp,
    '--color-success': theme.success,
  };

  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  // Keep the document title / meta description in sync with the config
  // so client sites don't ship with placeholder SEO text.
  document.title = siteConfig.seo.title;

  const setMeta = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', siteConfig.seo.description);
  setMeta('meta[property="og:title"]', 'content', siteConfig.seo.title);
  setMeta('meta[property="og:description"]', 'content', siteConfig.seo.description);
  setMeta('meta[property="twitter:title"]', 'content', siteConfig.seo.title);
  setMeta('meta[property="twitter:description"]', 'content', siteConfig.seo.description);
  setMeta('meta[name="theme-color"]', 'content', theme.primary);
  setMeta('meta[name="msapplication-TileColor"]', 'content', theme.primary);
}
