import React, { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const pointerRef = useRef(null);
  const auraRef = useRef(null);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const auraPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isClicked = useRef(false);
  const isVisible = useRef(false);
  const animFrameId = useRef(null);

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      setIsDesktop(window.innerWidth > 768 && hasFinePointer);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const pointer = pointerRef.current;
    const aura = auraRef.current;
    if (!pointer || !aura) return;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible.current) {
        isVisible.current = true;
        pointer.style.opacity = '1';
        aura.style.opacity = '1';
      }

      // Check if hovering over clickable elements
      const target = e.target;
      const clickable = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, .tech-marquee-pill, .skill-badge, [data-cursor="pointer"]');
      
      if (clickable && !isHovered.current) {
        isHovered.current = true;
        aura.classList.add('aura-hover');
        pointer.classList.add('pointer-hover');
      } else if (!clickable && isHovered.current) {
        isHovered.current = false;
        aura.classList.remove('aura-hover');
        pointer.classList.remove('pointer-hover');
      }
    };

    const onMouseDown = () => {
      isClicked.current = true;
      pointer.classList.add('pointer-clicked');
      aura.classList.add('aura-clicked');
    };

    const onMouseUp = () => {
      isClicked.current = false;
      pointer.classList.remove('pointer-clicked');
      aura.classList.remove('aura-clicked');
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (pointer && aura) {
        pointer.style.opacity = '0';
        aura.style.opacity = '0';
      }
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (pointer && aura) {
        pointer.style.opacity = '1';
        aura.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // High performance animation loop
    const render = () => {
      const lerpFactor = 0.15;
      auraPos.current.x += (mousePos.current.x - auraPos.current.x) * lerpFactor;
      auraPos.current.y += (mousePos.current.y - auraPos.current.y) * lerpFactor;

      // Pointer follows mouse exactly at the tip (0, 0) - NEVER moves or jumps away
      pointer.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      
      // Aura centered on mouse with smooth trailing delay
      aura.style.transform = `translate3d(${auraPos.current.x}px, ${auraPos.current.y}px, 0) translate(-50%, -50%)`;

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <style>{`
        /* Hide system cursor on desktop */
        @media (min-width: 769px) and (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }

        /* Modern Crisp Arrow Pointer Container */
        .custom-arrow-container {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 999999;
          opacity: 0;
          transition: opacity 0.2s ease;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4));
        }

        /* Inner SVG for scaling and effects without breaking translate position */
        .custom-arrow-svg {
          transform-origin: 0 0;
          transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), filter 0.15s ease;
        }

        .custom-arrow-container.pointer-hover .custom-arrow-svg {
          transform: scale(1.12);
          filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.8));
        }

        .custom-arrow-container.pointer-clicked .custom-arrow-svg {
          transform: scale(0.9);
        }

        /* Trailing Ambient Aura Ring */
        .custom-cursor-aura {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid rgba(99, 102, 241, 0.45);
          background-color: rgba(99, 102, 241, 0.06);
          pointer-events: none;
          z-index: 999998;
          opacity: 0;
          transition: opacity 0.2s ease, width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
        }

        .custom-cursor-aura.aura-hover {
          width: 48px;
          height: 48px;
          border-color: rgba(168, 85, 247, 0.8);
          background-color: rgba(168, 85, 247, 0.14);
          box-shadow: 0 0 22px rgba(168, 85, 247, 0.3);
        }

        .custom-cursor-aura.aura-clicked {
          width: 24px;
          height: 24px;
          border-color: rgba(99, 102, 241, 0.9);
          background-color: rgba(99, 102, 241, 0.25);
        }
      `}</style>

      {/* Trailing Ambient Glow Aura */}
      <div ref={auraRef} className="custom-cursor-aura" />

      {/* Modern High-Precision Arrow Pointer */}
      <div ref={pointerRef} className="custom-arrow-container">
        <svg
          className="custom-arrow-svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 2L18.5 9.5L11.5 11.5L9.5 18.5L3 2Z"
            fill="#6366f1"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}
