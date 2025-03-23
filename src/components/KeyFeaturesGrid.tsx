'use client';

import React, { useState, useEffect, useRef } from 'react';
import ConstellationNetwork from './ConstellationNetwork';

interface KeyFeaturesGridProps {
  children: React.ReactNode;
  columns?: number; // Default will be 3
}

export default function KeyFeaturesGrid({ children, columns = 3 }: KeyFeaturesGridProps) {
  // Get the children array
  const childrenArray = React.Children.toArray(children);
  
  // Create refs array for the wrapper divs
  const cardRefs = React.useMemo(() => {
    return Array(childrenArray.length).fill(null).map(() => React.createRef<HTMLDivElement>());
  }, [childrenArray.length]);
  
  // Track which card is active (being hovered)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  
  // Reference for the entire grid
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Function to equalize heights of all cards
  const equalizeCardHeights = () => {
    if (gridRef.current) {
      // Find all cards in this grid
      const cards = gridRef.current.querySelectorAll('[data-card-type="Bordered Service Cards"]');
      
      if (cards.length > 1) {
        let maxHeight = 0;
        
        // First, reset heights to get natural heights
        cards.forEach((card) => {
          const cardElement = card as HTMLElement;
          cardElement.style.height = 'auto';
          
          const height = cardElement.getBoundingClientRect().height;
          maxHeight = Math.max(maxHeight, height);
        });
        
        // Then set all cards to the same height
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
      // Reset heights first
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('[data-card-type="Bordered Service Cards"]');
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
  
  // Create grid column classes based on the number of columns
  const gridColsClass = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8 relative z-20`;
  
  return (
    <div className="relative">
      {/* Constellation network overlay */}
      <ConstellationNetwork cardRefs={cardRefs} activeCardIndex={activeCardIndex} />
      
      {/* Feature cards grid with equal heights */}
      <div ref={gridRef} className={gridColsClass}>
        {childrenArray.map((child, index) => (
          <div 
            key={index}
            ref={cardRefs[index]}
            className="Bordered Service Cards h-full"
            data-card-type="Bordered Service Cards"
            onMouseEnter={() => setActiveCardIndex(index)}
            onMouseLeave={() => setActiveCardIndex(null)}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
