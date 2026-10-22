import { useEffect, useRef } from 'react';

/**
 * A procedural Canvas 2D eye that tracks the pointer (or keyboard focus), blinks and dilates when the
 * visitor hovers a link: the Warden from The Room That Fights Back. Left alone, it glances at the page
 * instead of staring.
 * Renders only while on screen and the tab is visible; draws a single still frame for reduced motion.
 */
export default function WatcherEye({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let w = 0, h = 0, raf = 0, visible = true;
    const look = { x: 0, y: 0, tx: 0, ty: 0 };
    let dilate = 0, dilateTarget = 0, blink = 0, nextBlink = performance.now() + 2500;
    let lastInput = -Infinity, nextGlance = performance.now() + 1800;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(performance.now());
    };

    const lookAt = (x: number, y: number) => {
      const r = canvas.getBoundingClientRect();
      const dx = x - (r.left + r.width / 2), dy = y - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 500);
      look.tx = (dx / d) * k; look.ty = (dy / d) * k;
    };
    const onMove = (e: PointerEvent) => {
      lookAt(e.clientX, e.clientY);
      lastInput = performance.now();
      dilateTarget = (e.target as Element)?.closest?.('a, button') ? 1 : 0;
    };
    // Keyboard users get watched too: the gaze follows focus.
    const onFocus = (e: FocusEvent) => {
      const el = e.target as Element;
      if (!el?.getBoundingClientRect) return;
      const b = el.getBoundingClientRect();
      lookAt(b.left + b.width / 2, b.top + b.height / 2);
      lastInput = performance.now();
      dilateTarget = el.closest('a, button') ? 1 : 0;
    };
    // Idle: glance at something on the page (the headline, a button) or just off to the side, never a fixed stare.
    const glance = () => {
      const picks = [...document.querySelectorAll<HTMLElement>('.cc-hero__title, .cc-hero .cc-btn, .cc-panel h3')]
        .map((el) => el.getBoundingClientRect()).filter((b) => b.bottom > 0 && b.top < innerHeight);
      const b = picks.length && Math.random() < 0.7 ? picks[Math.floor(Math.random() * picks.length)] : null;
      if (b) lookAt(b.left + Math.random() * b.width, b.top + b.height / 2);
      else { look.tx = (Math.random() - 0.5) * 1.2; look.ty = (Math.random() - 0.5) * 0.6; }
      dilateTarget = 0;
    };

    function draw(t: number) {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, R = Math.min(w * 0.46, h * 0.9);
      if (!reduced) {
        look.x += (look.tx - look.x) * 0.08; look.y += (look.ty - look.y) * 0.08;
        dilate += (dilateTarget - dilate) * 0.1;
        if (t > nextBlink) { blink = 1; nextBlink = t + 3000 + Math.random() * 4000; }
        if (t - lastInput > 2500 && t > nextGlance) { glance(); nextGlance = t + 1800 + Math.random() * 2200; }
        blink = Math.max(0, blink - 0.07);
      }
      const open = 1 - Math.sin(Math.min(1, blink) * Math.PI) * 0.95;
      const lid = R * 0.42 * open;

      // almond-shaped aperture
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx - R, cy);
      ctx.quadraticCurveTo(cx, cy - lid * 2, cx + R, cy);
      ctx.quadraticCurveTo(cx, cy + lid * 2, cx - R, cy);
      ctx.closePath();
      const sclera = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R);
      sclera.addColorStop(0, '#2a2622'); sclera.addColorStop(1, '#0b0b0d');
      ctx.fillStyle = sclera; ctx.fill();
      ctx.strokeStyle = 'rgba(233,228,218,.35)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.clip();

      const ix = cx + look.x * R * 0.42, iy = cy + look.y * lid * 0.5;
      const ir = R * 0.34;
      const iris = ctx.createRadialGradient(ix, iy, ir * 0.2, ix, iy, ir);
      // Honey-amber, not fire: warm enough to match the ember accent, calm enough not to read as menacing.
      iris.addColorStop(0, '#f1d59a'); iris.addColorStop(0.55, '#a8793c'); iris.addColorStop(1, '#2c2117');
      ctx.fillStyle = iris; ctx.beginPath(); ctx.arc(ix, iy, ir, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(207,225,255,.22)'; ctx.lineWidth = 1; ctx.stroke();
      // iris striations
      ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1;
      for (let a = 0; a < 64; a++) {
        const ang = (a / 64) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(ix + Math.cos(ang) * ir * 0.42, iy + Math.sin(ang) * ir * 0.42);
        ctx.lineTo(ix + Math.cos(ang) * ir * 0.97, iy + Math.sin(ang) * ir * 0.97);
        ctx.stroke();
      }
      const pr = ir * (0.3 + dilate * 0.22 + Math.sin(t / 900) * (reduced ? 0 : 0.015));
      ctx.fillStyle = '#050505'; ctx.beginPath(); ctx.arc(ix, iy, pr, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.beginPath(); ctx.arc(ix - pr * 0.45, iy - pr * 0.5, pr * 0.18, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    const loop = (t: number) => { draw(t); raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0; };
    const start = () => { if (!reduced && !raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };

    resize();
    window.addEventListener('resize', resize);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); });
    io.observe(canvas);
    const onVis = () => start();
    document.addEventListener('visibilitychange', onVis);
    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onMove, { passive: true });
      document.addEventListener('focusin', onFocus);
      start();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('visibilitychange', onVis);
      io.disconnect();
    };
  }, [reduced]);

  return <canvas ref={ref} className="cc-eye" aria-hidden="true" />;
}
