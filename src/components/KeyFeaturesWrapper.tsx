'use client';

import React, { useRef, useState } from 'react';
import ConstellationNetwork from './ConstellationNetwork';

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
        className={className || "bg-gray-900 p-6 rounded-lg shadow-md"}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
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
  const cardRefs = childrenArray.map(() => useRef<HTMLDivElement>(null));
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  
  return (
    <div className="relative">
      {/* Constellation network overlay */}
      <ConstellationNetwork cardRefs={cardRefs} activeCardIndex={activeCardIndex} />
      
      {/* Feature cards grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8 relative z-20`}>
        {childrenArray.map((child, index) => (
          <CardWrapper
            key={index}
            ref={cardRefs[index]}
            onMouseEnter={() => setActiveCardIndex(index)}
            onMouseLeave={() => setActiveCardIndex(null)}
          >
            {child}
          </CardWrapper>
        ))}
      </div>
    </div>
  );
}
