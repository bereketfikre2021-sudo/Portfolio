import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef    = useRef(null);
  const followerRef  = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth <= 768) return;

    const cursor   = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Position cursor off-screen until first move so it doesn't flash at 0,0
    let mouseX = -200, mouseY = -200;
    let cx = -200, cy = -200;
    let fx = -200, fy = -200;
    let rafId;
    let isScaled = false;

    // Use transform instead of left/top — GPU composited, no layout reflow
    cursor.style.cssText   += ';position:fixed;pointer-events:none;will-change:transform;';
    follower.style.cssText += ';position:fixed;pointer-events:none;will-change:transform;';

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      // Faster lerp factors — 0.25/0.12 vs old 0.15/0.08
      // Prevents visible lag under load
      cx += (mouseX - cx) * 0.25;
      cy += (mouseY - cy) * 0.25;
      fx += (mouseX - fx) * 0.12;
      fy += (mouseY - fy) * 0.12;

      const scale = isScaled ? 1.5 : 1;
      cursor.style.transform   = `translate(${cx - 10}px, ${cy - 10}px) scale(${scale})`;
      follower.style.transform = `translate(${fx - 20}px, ${fy - 20}px) scale(${scale})`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });

    // Event delegation — covers all elements including lazy-loaded ones
    const INTERACTIVE = 'a, button, [data-service], [data-project], [role="button"]';

    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE)) isScaled = true;
    };

    const onOut = (e) => {
      const from = e.target.closest(INTERACTIVE);
      const to   = e.relatedTarget?.closest?.(INTERACTIVE);
      if (from && !to) isScaled = false;
    };

    // Safety reset — if mouse leaves window entirely, always reset
    const onLeave = () => { isScaled = false; };

    document.addEventListener('mouseover',  onOver,  { passive: true });
    document.addEventListener('mouseout',   onOut,   { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef}   className="custom-cursor"   aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
