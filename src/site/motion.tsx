import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const query = '(prefers-reduced-motion: reduce)';

/** Starts false on the server and on first client render so hydration matches, then syncs. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

interface Motion {
  lenis: Lenis | null;
  /** True when motion should be minimal: the OS setting, or the visitor turned it off on the site. */
  reduced: boolean;
  /** The OS asks for reduced motion (the site toggle can't override that). */
  system: boolean;
  setMotion: (on: boolean) => void;
}
const MotionContext = createContext<Motion>({ lenis: null, reduced: true, system: false, setMotion: () => {} });

/** The visitor's own choice, stored per browser. index.html applies the `motion-off` class before first paint. */
const STORE = 'motion';
function useUserMotionOff() {
  const [off, setOff] = useState(false);
  useEffect(() => { try { setOff(localStorage.getItem(STORE) === 'off'); } catch { /* storage blocked: motion stays on */ } }, []);
  useEffect(() => { document.documentElement.classList.toggle('motion-off', off); }, [off]);
  const set = (on: boolean) => {
    setOff(!on);
    try { if (on) localStorage.removeItem(STORE); else localStorage.setItem(STORE, 'off'); } catch { /* ignore */ }
  };
  return [off, set] as const;
}
export const useMotion = () => useContext(MotionContext);

/**
 * One Lenis instance for the whole site, driven by the GSAP ticker so ScrollTrigger
 * and smooth scrolling share a frame (per the Lenis README). Disabled for reduced motion,
 * in which case the browser's native scrolling is used everywhere.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const system = useReducedMotion();
  const [userOff, setMotion] = useUserMotionOff();
  const reduced = system || userOff;
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduced) { setLenis(null); return; }
    const l = new Lenis({ autoRaf: false });
    l.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    return () => { gsap.ticker.remove(tick); l.destroy(); setLenis(null); };
  }, [reduced]);

  // Switching motion off at runtime changes the layout (the reel stacks), so re-measure afterwards.
  useEffect(() => { const id = requestAnimationFrame(() => ScrollTrigger.refresh()); return () => cancelAnimationFrame(id); }, [reduced]);

  return <MotionContext.Provider value={{ lenis, reduced, system, setMotion }}>{children}</MotionContext.Provider>;
}

/** Scroll to an element (or the top) using Lenis when active, native scrolling otherwise. */
export function scrollToTarget(lenis: Lenis | null, target: HTMLElement | number, immediate = false) {
  // A pinned section moves while pinned; its GSAP pin-spacer wrapper keeps the real document position.
  if (typeof target !== 'number' && target.parentElement?.classList.contains('pin-spacer')) target = target.parentElement;
  if (lenis) lenis.scrollTo(target, { immediate, offset: 0, force: true, duration: 1.1 });
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'instant' as ScrollBehavior });
  else target.scrollIntoView({ block: 'start', behavior: immediate ? ('instant' as ScrollBehavior) : 'smooth' });
}

export { gsap, ScrollTrigger };
