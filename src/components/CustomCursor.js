import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;

      if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
      }
      if (follower) {
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseEnter = () => {
      if (cursor) cursor.style.transform = 'scale(1.5)';
      if (follower) follower.style.transform = 'scale(1.5)';
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.transform = 'scale(1)';
      if (follower) follower.style.transform = 'scale(1)';
    };

    const interactiveElements = document.querySelectorAll('a, button, [data-service], [data-project]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
    </>
  );
};

export default CustomCursor;





