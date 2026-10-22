import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HEADER_HEIGHT = 77; // matches --nav-height in Header.css

/**
 * Smooth-scrolls to a section, leaving room for the fixed navbar.
 * (Not scrollIntoView: index.css sets BOTH scroll-padding-top on <html> and
 * scroll-margin-top on <section>, which would apply the offset twice.)
 */
export function scrollToSectionId(id: string): void {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - HEADER_HEIGHT, behavior: 'smooth' });
}

/**
 * Returns a function that brings a homepage section into view from ANY page:
 *  - on the homepage it smooth-scrolls to the section;
 *  - elsewhere (e.g. a service page) it navigates to "/#<id>", and
 *    <ScrollManager /> finishes the scroll once the homepage has rendered.
 */
export function useSectionNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (id: string) => {
      if (pathname !== '/') {
        navigate({ pathname: '/', hash: `#${id}` });
        return;
      }
      scrollToSectionId(id);
    },
    [pathname, navigate],
  );
}
