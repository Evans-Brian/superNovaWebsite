'use client';

import React, { useRef, useState } from 'react';
import ConstellationNetwork from './ConstellationNetwork';

interface KeyFeaturesGridProps {
  children: React.ReactNode;
  columns?: number; // Default will be 3
}

export default function KeyFeaturesGrid({ children, columns = 3 }: KeyFeaturesGridProps) {
  // Create individual refs for each feature card
  const childrenArray = React.Children.toArray(children);
  const cardRefs = childrenArray.map(() => useRef<HTMLDivElement>(null));
  
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
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              key: index,
              ref: cardRefs[index],
              onMouseEnter: () => setActiveCardIndex(index),
              onMouseLeave: () => setActiveCardIndex(null)
            });
          }
          return child;
        })}
      </div>
    </div>
  );
}
