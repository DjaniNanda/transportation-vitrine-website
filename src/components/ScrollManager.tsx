import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { scrollToSectionId } from '../hooks/useSectionNav';

/**
 * Scroll behaviour for client-side navigation:
 *  - new page            -> jump to the top (instantly, not animated)
 *  - "/#section" link    -> scroll to that section once it exists
 *  - back / forward      -> do nothing, the browser restores the old position
 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === 'POP') return;

    if (hash) {
      // Wait one frame so the destination page has rendered its sections.
      const frame = requestAnimationFrame(() => {
        scrollToSectionId(decodeURIComponent(hash.slice(1)));
      });
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash, navType]);

  return null;
};

export default ScrollManager;
