import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // تحقق إذا الـ device جوال أم desktop
    const checkDeviceType = () => {
      setIsDesktop(window.innerWidth > 768); // tablet وفوق = desktop
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // اختفي لما الماوس يطلع من الصفحة
      if (
        e.clientX < 0 || 
        e.clientX > window.innerWidth || 
        e.clientY < 0 || 
        e.clientY > window.innerHeight
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isDesktop]);

  useEffect(() => {
    if (isDesktop) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto';
    }
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isDesktop]);

  // لا تظهر على الجوال
  if (!isDesktop || !isVisible) return null;

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }

        @media (min-width: 769px) {
          * {
            cursor: none !important;
          }
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
