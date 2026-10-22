import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TeamMember } from '../config/siteConfig';
import './TeamCarousel.css';

interface Props {
  members: TeamMember[];
  autoPlayMs?: number;
}

const MIN_SLOTS = 8; // slots on the ring; members are repeated to fill it
const SWIPE_THRESHOLD = 40;
const mod = (a: number, n: number) => ((a % n) + n) % n;

/**
 * Cards sit on a cylinder and the whole ring rotates, so every card keeps
 * moving along the same circular path (no jump when looping).
 */
const TeamCarousel: React.FC<Props> = ({ members, autoPlayMs = 3200 }) => {
  const count = members.length;
  const slots = count * Math.ceil(MIN_SLOTS / Math.max(count, 1));
  const step = 360 / slots;
  // Radius (in card widths) so that neighbouring cards on the ring just touch
  const k = (0.5 / Math.tan(Math.PI / slots)) * 1.12;

  // `current` is unbounded on purpose: the ring keeps turning in one direction.
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStartX = useRef<number | null>(null);

  const go = useCallback((delta: number) => setCurrent((c) => c + delta), []);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => go(1), autoPlayMs);
    return () => window.clearInterval(id);
  }, [paused, count, autoPlayMs, go]);

  if (count === 0) return null;

  const half = Math.floor(slots / 2);
  const offsetOf = (slot: number) => mod(slot - current + half, slots) - half;
  const active = mod(current, count);
  const activeMember = members[active];

  const goToMember = (k2: number) => {
    let d = mod(k2 - active, count);
    if (d > count / 2) d -= count;
    go(d);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  return (
    <div
      className="team-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our team"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="team-stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragStartX.current = null)}
      >
        <div
          className="team-ring"
          style={{
            transform: `translateZ(calc(var(--card-w) * ${-k})) rotateY(${-current * step}deg)`,
          }}
        >
          {Array.from({ length: slots }, (_, slot) => {
            const member = members[slot % count];
            const off = offsetOf(slot);
            const abs = Math.abs(off);
            return (
              <button
                type="button"
                key={slot}
                className={`team-card${off === 0 ? ' is-active' : ''}`}
                style={{
                  transform: `rotateY(${slot * step}deg) translateZ(calc(var(--card-w) * ${k}))`,
                  opacity: abs === 0 ? 1 : abs === 1 ? 0.85 : abs === 2 ? 0.5 : 0,
                  pointerEvents: abs <= 2 ? 'auto' : 'none',
                }}
                aria-label={member.name}
                aria-current={off === 0}
                tabIndex={-1}
                onClick={() => off !== 0 && go(off)}
              >
                <img src={member.image} alt={member.alt} draggable={false} loading="lazy" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="team-caption" aria-live="polite">
        <strong>{activeMember.name}</strong>
        <span>{activeMember.role}</span>
      </div>

      <div className="team-controls">
        <button type="button" className="team-arrow" onClick={() => go(-1)} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <div className="team-dots">
          {members.map((m, i) => (
            <button
              type="button"
              key={i}
              className={`team-dot${i === active ? ' active' : ''}`}
              onClick={() => goToMember(i)}
              aria-label={`Show ${m.name}`}
            />
          ))}
        </div>
        <button type="button" className="team-arrow" onClick={() => go(1)} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TeamCarousel;