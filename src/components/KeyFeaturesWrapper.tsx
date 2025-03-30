'use client';

import React, { useRef, useEffect } from 'react';
import { GlowingEffect } from '../../components/ui/glowing-effect';

interface CardWrapperProps {
  className?: string;
  ref: React.RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}

// A wrapper component that attaches ref and mouse events
const CardWrapper = React.forwardRef<HTMLDivElement, CardWrapperProps>(
  ({ className, onMouseEnter, onMouseLeave, children }, ref) => {
    return (
      <div 
        ref={ref}
        className="p-1 rounded-xl relative Bordered Service Cards"
        data-card-type="Bordered Service Cards"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div 
          className={`relative flex flex-col p-6 gap-4 overflow-hidden rounded-lg border-[0.75px] shadow-md card-content ${className}`}
          style={{ 
            backgroundColor: '#e6eeff',
            backgroundImage: `
              radial-gradient(circle at 40% 40%, rgba(102, 57, 218, 0.08), transparent 60%),
              radial-gradient(circle at 60% 60%, rgba(66, 153, 225, 0.06), transparent 50%)
            `
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

CardWrapper.displayName = 'CardWrapper';

interface KeyFeaturesWrapperProps {
  children: React.ReactNode;
  columns?: number;
}

export default function KeyFeaturesWrapper({ children, columns = 3 }: KeyFeaturesWrapperProps) {
  const childrenArray = React.Children.toArray(children);
  
  // Use useMemo to create refs array to avoid rules of hooks violation
  const cardRefs = React.useMemo(() => {
    return Array(childrenArray.length).fill(null).map(() => React.createRef<HTMLDivElement>());
  }, [childrenArray.length]);
  
  // Reference for the main grid
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Function to equalize heights of all cards
  const equalizeCardHeights = () => {
    if (gridRef.current) {
      // Find all card content containers within the grid
      const cards = gridRef.current.querySelectorAll('.card-content');
      
      if (cards.length > 1) {
        let maxHeight = 0;
        
        // First pass: get maximum natural height
        cards.forEach((card) => {
          const cardElement = card as HTMLElement;
          const originalHeight = cardElement.style.height;
          cardElement.style.height = 'auto';
          
          const height = cardElement.getBoundingClientRect().height;
          maxHeight = Math.max(maxHeight, height);
          
          // Restore original height
          cardElement.style.height = originalHeight;
        });
        
        // Second pass: set all to maximum height
        if (maxHeight > 0) {
          cards.forEach((card) => {
            (card as HTMLElement).style.height = `${maxHeight}px`;
          });
        }
      }
    }
  };
  
  // Apply height equalization after render and on resize
  useEffect(() => {
    // Ensure this code only runs on the client side, not during server-side rendering
    if (typeof window === 'undefined') return;
    
    // Initial equalization
    equalizeCardHeights();
    
    // Re-equalize on window resize
    const handleResize = () => {
      // Reset heights to auto first
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.card-content');
        cards.forEach((card) => {
          (card as HTMLElement).style.height = 'auto';
        });
      }
      
      // Small delay to ensure DOM updates
      setTimeout(equalizeCardHeights, 100);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', equalizeCardHeights);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', equalizeCardHeights);
    };
  }, [childrenArray]);
  
  return (
    <div className="relative">
      {/* Feature cards grid */}
      <div ref={gridRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8 relative z-20`}>
        {childrenArray.map((child, index) => (
          <CardWrapper
            key={index}
            ref={cardRefs[index]}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          >
            {child}
          </CardWrapper>
        ))}
      </div>
    </div>
  );
}
