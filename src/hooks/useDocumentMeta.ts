import { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

/**
 * Sets the tab title and meta description while a page is mounted, then
 * restores the site defaults. (Client-side only: crawlers that don't run JS
 * see the defaults from index.html — see the note about prerendering.)
 */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]');
    document.title = title;
    meta?.setAttribute('content', description);

    return () => {
      document.title = siteConfig.seo.title;
      meta?.setAttribute('content', siteConfig.seo.description);
    };
  }, [title, description]);
}
