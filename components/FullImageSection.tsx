
import React, { useEffect, useRef } from 'react';

const FullImageSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (sectionRef.current && imgWrapperRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const height = window.innerHeight;
        
        // Calculate progress: 0 when top enters bottom of screen, 1 when bottom leaves top
        // Optimized check to only animate when in/near viewport
        if (rect.top < height && rect.bottom > 0) {
            
            // Calculate a scale factor based on position
            // Center of viewport = neutral
            const progress = (height - rect.top) / (height + rect.height);
            
            // Start larger (1.25) and scale down to 1.0 as you scroll past
            // This creates a "settling" effect
            const rawScale = 1.25 - (progress * 0.25); 
            const newScale = Math.max(1, Math.min(1.25, rawScale));
            
            rafId = requestAnimationFrame(() => {
               if(imgWrapperRef.current) {
                 imgWrapperRef.current.style.transform = `scale(${newScale})`;
               }
            });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
        if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-[#F5F5F7]">
      <div 
        ref={imgWrapperRef}
        className="w-full h-full will-change-transform"
        style={{ transform: 'scale(1.25)' }} // Initial state matches JS logic start
      >
        <img 
            src="https://i.imgur.com/ay5UUWQ.jpeg" 
            alt="West Home Interior" 
            className="w-full h-full object-cover"
        />
      </div>
      
      {/* Top Gradient Overlay for text protection if previous section flows in */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent opacity-50"></div>
      
      {/* Bottom Gradient Overlay for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent opacity-80"></div>
    </section>
  );
};

export default FullImageSection;
