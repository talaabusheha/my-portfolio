import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#06b6d4',
            fontFamily: 'monospace',
            textShadow: '0 0 8px rgba(6, 182, 212, 0.6)',
          }}
        >
          {'{}'}
        </div>
      </div>
    </>
  );
}