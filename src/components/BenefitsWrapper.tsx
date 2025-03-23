'use client';

import React, { useState, useRef, useEffect } from 'react';
import ConstellationNetwork from './ConstellationNetwork';

interface BenefitWrapperProps {
  ref: React.RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}

// A wrapper component that attaches ref and mouse events
const BenefitWrapper = React.forwardRef<HTMLDivElement, BenefitWrapperProps>(
  ({ onMouseEnter, onMouseLeave, children }, ref) => {
    return (
      <div 
        ref={ref}
        className="p-1 rounded-xl relative h-full Constellation Effect"
        data-card-type="Constellation Effect"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* No GlowingEffect for Constellation Effect, only constellation network */}
        <div className="relative flex items-start p-4 gap-4 overflow-hidden rounded-lg border-[0.75px] bg-gray-900 shadow-sm benefit-content">
          {children}
        </div>
      </div>
    );
  }
);

BenefitWrapper.displayName = 'BenefitWrapper';

interface BenefitsWrapperProps {
  children: React.ReactNode;
  columns?: number;
}

export default function BenefitsWrapper({ children, columns = 2 }: BenefitsWrapperProps) {
  const childrenArray = React.Children.toArray(children);
  
  // Create refs array for the wrapper divs
  const cardRefs = React.useMemo(() => {
    return Array(childrenArray.length).fill(null).map(() => React.createRef<HTMLDivElement>());
  }, [childrenArray.length]);
  
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  
  // Reference for the main grid
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Function to equalize heights of all cards
  const equalizeCardHeights = () => {
    if (gridRef.current) {
      // Find all benefit content containers within the grid
      const cards = gridRef.current.querySelectorAll('.benefit-content');
      
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
        const cards = gridRef.current.querySelectorAll('.benefit-content');
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
      {/* Constellation network overlay */}
      <ConstellationNetwork cardRefs={cardRefs} activeCardIndex={activeCardIndex} />
      
      {/* Benefits grid with equal heights */}
      <div ref={gridRef} className={`grid grid-cols-1 md:grid-cols-${columns} gap-8 relative z-20`}>
        {childrenArray.map((child, index) => (
          <BenefitWrapper
            key={index}
            ref={cardRefs[index]}
            onMouseEnter={() => setActiveCardIndex(index)}
            onMouseLeave={() => setActiveCardIndex(null)}
          >
            {child}
          </BenefitWrapper>
        ))}
      </div>
    </div>
  );
}
