import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Strict check: disable on touch devices OR small screens (tablets/phones)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 1024;
    
    if (isTouch || isSmallScreen) {
      setIsActive(false);
      return;
    }

    setIsActive(true);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (cursorRef.current) {
        cursorRef.current.animate({
          left: `${clientX}px`,
          top: `${clientY}px`
        }, { duration: 100, fill: "forwards" });
      }
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  if (!isActive) return null;

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body { cursor: none; }
          a, button { cursor: none; }
        }
      `}</style>
      
      <div 
        ref={cursorRef}
        className={`
            fixed top-0 left-0 pointer-events-none z-[9999] -ml-2 -mt-2
            w-4 h-4 rounded-full
            bg-white border border-black/10 shadow-md
            transition-transform duration-150 ease-out
            ${clicking ? 'scale-75' : 'scale-100'}
        `}
      />
    </>
  );
};

export default CustomCursor;