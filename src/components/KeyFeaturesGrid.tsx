'use client';

import React, { useState } from 'react';
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
  
  // Create grid column classes based on the number of columns
  const gridColsClass = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8 relative z-20`;
  
  return (
    <div className="relative">
      {/* Constellation network overlay */}
      <ConstellationNetwork cardRefs={cardRefs} activeCardIndex={activeCardIndex} />
      
      {/* Feature cards grid */}
      <div className={gridColsClass}>
        {childrenArray.map((child, index) => (
          <div 
            key={index}
            ref={cardRefs[index]}
            className="Bordered Service Cards"
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
