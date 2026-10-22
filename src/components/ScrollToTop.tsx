import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import './ScrollToTop.css';

/** Scroll distance (px) after which the button appears. */
const SHOW_AFTER = 400;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setVisible(window.scrollY > SHOW_AFTER);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = window.scrollY;
    if (reduce || start === 0) {
      window.scrollTo(0, 0);
      return;
    }

    // Drive the scroll ourselves (fixed duration, ease-out) instead of the
    // browser's native smooth scroll, which can tear/mis-paint on a very long
    // page with 3D and sticky layers while it travels thousands of pixels.
    const duration = 600;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      window.scrollTo(0, Math.round(start * (1 - eased)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <button
      type="button"
      className={`scroll-to-top${visible ? ' is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <ArrowUp aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
