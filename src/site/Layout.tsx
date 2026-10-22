import { useEffect, useRef, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { person, seoFor } from '../data/content';
import { ScrollTrigger, scrollToTarget, useMotion } from './motion';

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
  el.content = content;
}

/** Handles title/meta, scroll position and focus on every client-side navigation. */
function useRouteEffects(mainRef: React.RefObject<HTMLElement | null>) {
  const location = useLocation();
  const { lenis } = useMotion();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const handled = useRef<string | null>(null);

  // Runs once per navigation (location.key changes even when the same hash link is clicked twice).
  useEffect(() => {
    const lenis = lenisRef.current;
    const seo = seoFor(location.pathname);
    document.title = seo.title;
    setMeta('description', seo.description);
    setMeta('og:title', seo.title, 'property');
    setMeta('og:description', seo.description, 'property');

    // First load (or StrictMode's repeat of it) keeps the browser's own focus and scroll position.
    const isFirst = handled.current === null || handled.current === location.key;
    handled.current = location.key;
    // Wait a frame so the new route has rendered and pinned sections have measured.
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const id = decodeURIComponent(location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target) {
        scrollToTarget(lenis, target, isFirst);
        target.focus({ preventScroll: true });
      } else if (!isFirst) {
        scrollToTarget(lenis, 0, true);
        mainRef.current?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [location.key]);
}

/** Lets visitors turn the site's motion off (smooth scroll, pinned reel, the eye) without changing their OS setting. */
function MotionToggle() {
  const { reduced, system, setMotion } = useMotion();
  if (system) return <span className="cc-foot__motion">Motion: off (system setting)</span>;
  return (
    <button type="button" className="cc-foot__motion" aria-pressed={!reduced} onClick={() => setMotion(reduced)}>
      Motion: {reduced ? 'off' : 'on'}
    </button>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  useRouteEffects(mainRef);

  return (
    <div className="cc">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="cc-top">
        <Link to="/" className="cc-top__name" aria-label="Tejas Joshi, home">Tejas Joshi</Link>
        <nav aria-label="Primary">
          <Link to="/#work">Work</Link>
          <Link to="/#about">About</Link>
          <Link to="/#contact">Contact</Link>
        </nav>
      </header>
      <main id="main" ref={mainRef} tabIndex={-1}>{children}</main>
      <footer className="cc-foot">
        <span>© 2026 {person.name}</span>
        <span className="cc-foot__links">
          <a href={person.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${person.email}`}>Email</a>
          <MotionToggle />
        </span>
        <p className="cc-foot__colophon">
          Built with React, GSAP and Lenis. The eye is about 130 lines of Canvas 2D, no WebGL. Set in Bricolage Grotesque and Geist.
          Prerendered, so it reads fine without JavaScript, and it respects reduced-motion settings.
        </p>
      </footer>
    </div>
  );
}
